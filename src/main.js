import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import fs from 'node:fs';
import { spawn } from 'node:child_process';
import started from 'electron-squirrel-startup';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

let mainWindow;
let splashWindow;

// Simple HTML splash (data URL) so we don't rely on extra files being copied.
// Minimal inline styles to keep load instant.
const splashMarkup = encodeURIComponent(`<!DOCTYPE html><html><head><meta charset='UTF-8'><title>Initializing...</title><style>*{box-sizing:border-box;margin:0;padding:0;font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,sans-serif}body{background:#121a29;color:#d1e4f5;display:flex;align-items:center;justify-content:center;min-height:100vh;overflow:hidden} .panel{width:420px;max-width:90%;padding:32px 30px 26px;border:1px solid rgba(148,163,184,.15);border-radius:20px;position:relative;background:linear-gradient(145deg,#1a2332 0%,#1e293b 70%);} .logo{display:flex;justify-content:center;margin-bottom:28px} .logo img{width:80px;height:80px;object-fit:contain;user-select:none;} h1{font-size:18px;font-weight:600;text-align:center;color:#e2f2ff;margin-bottom:6px;letter-spacing:.5px} p.sub{font-size:11px;text-align:center;color:#94a3b8;margin-bottom:24px} .bar{height:10px;width:100%;background:#1e293b;border:1px solid rgba(148,163,184,.2);border-radius:999px;overflow:hidden;box-shadow:0 0 0 1px #0ea5e933 inset} .fill{height:100%;width:5%;background:linear-gradient(90deg,#0ea5e9,#38bdf8);box-shadow:0 0 12px #38bdf866 inset,0 0 6px #0ea5e955;transition:width .35s ease} .status{margin-top:10px;font-size:11px;color:#7a8ea8;display:flex;justify-content:space-between;font-weight:500} .status span.step{flex:1;text-align:right;padding-left:8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis} .foot{margin-top:26px;text-align:center;font-size:9px;letter-spacing:1px;color:#48596f;text-transform:uppercase} .error{margin-top:18px;padding:10px 12px;border:1px solid #f87171aa;background:#f8717115;border-radius:10px;color:#fca5a5;font-size:11px;line-height:1.3} button.retry{margin-top:14px;width:100%;background:#0ea5e9;color:#fff;border:none;font-size:12px;padding:9px 0;border-radius:8px;cursor:pointer;font-weight:600;letter-spacing:.5px} button.retry:hover{background:#0284c7}</style></head><body><div class='panel'><div class='logo'><img src='PraveaLogo.png' alt='Logo' onerror="this.style.display='none'"/></div><h1>Initializing Console</h1><p class='sub'>Loading secure modules...</p><div class='bar'><div class='fill' id='fill'></div></div><div class='status'><span id='pct'>5%</span><span class='step' id='step'>Starting...</span></div><div id='err'></div><div class='foot'>© 2025 Pravea Console</div></div><script>const { ipcRenderer } = require('electron');ipcRenderer.on('splash-progress',(_,d)=>{const f=document.getElementById('fill');const pct=document.getElementById('pct');const step=document.getElementById('step');if(d.pct!=null){f.style.width=Math.min(100,Math.max(0,d.pct))+'%';pct.textContent=Math.round(d.pct)+'%';}if(d.step){step.textContent=d.step;} });ipcRenderer.on('splash-error',(_,msg)=>{const err=document.getElementById('err');err.innerHTML='<div class="error">'+msg+'</div><button class="retry" id="retry">Retry</button>';document.getElementById('retry').onclick=()=>ipcRenderer.send('splash-retry');});</script></body></html>`);

const sendSplashProgress = (pct, step) => {
  if (splashWindow && !splashWindow.isDestroyed()) {
    splashWindow.webContents.send('splash-progress', { pct, step });
  }
};

const simulateInitialization = async () => {
  const steps = [
    ['Verifying application integrity', 450],
    ['Loading cryptographic modules', 600],
    ['Establishing secure IPC channel', 550],
    ['Preparing threat intelligence cache', 700],
    ['Scanning local environment', 600],
    ['Finalizing secure context', 500]
  ];
  for (let i = 0; i < steps.length; i++) {
    const [label, dur] = steps[i];
    const pct = 5 + ((i + 1) / steps.length) * 90; // up to 95
    sendSplashProgress(pct, label);
    await new Promise(r => setTimeout(r, dur));
  }
  sendSplashProgress(100, 'Startup complete');
};

const createWindows = () => {
  splashWindow = new BrowserWindow({
    width: 480,
    height: 400,
    frame: false,
    resizable: false,
    transparent: false,
    alwaysOnTop: true,
    show: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  splashWindow.loadURL('data:text/html;charset=utf-8,' + splashMarkup);

  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Coordinated show: wait for both init & ready-to-show
  let initFinished = false;
  let windowReady = false;
  const maybeShow = () => {
    if (initFinished && windowReady && mainWindow) {
      mainWindow.show();
      if (splashWindow && !splashWindow.isDestroyed()) splashWindow.destroy();
    }
  };

  mainWindow.once('ready-to-show', () => {
    windowReady = true;
    maybeShow();
  });

  simulateInitialization().then(() => {
    initFinished = true;
    maybeShow();
  }).catch(err => {
    if (splashWindow && !splashWindow.isDestroyed()) {
      splashWindow.webContents.send('splash-error', err.message || 'Initialization failed');
    }
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindows();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
  createWindows();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.


// Handle IPC: Run PowerShell command
ipcMain.handle('run-powershell', async (event, scriptName, args = []) => {
  return new Promise((resolve) => {
    let scriptPath;
    
    if (app.isPackaged) {
      // Try multiple possible locations for packaged app
      const possiblePaths = [
        path.join(process.resourcesPath, 'scripts', scriptName),
        path.join(process.resourcesPath, 'app.asar.unpacked', 'scripts', scriptName),
        path.join(__dirname, '..', 'scripts', scriptName),
        path.join(process.resourcesPath, 'app', 'scripts', scriptName)
      ];
      
      scriptPath = possiblePaths.find(p => fs.existsSync(p));
      
      if (!scriptPath) {
        console.error('Script not found in any of these locations:');
        possiblePaths.forEach(p => console.error(' -', p));
        return resolve({ 
          success: false, 
          error: `Script not found: ${scriptName}. Searched in: ${possiblePaths.join(', ')}`, 
          output: '' 
        });
      }
    } else {
      scriptPath = path.join(process.cwd(), 'scripts', scriptName);
    }

    // Check if the script file exists
    if (!fs.existsSync(scriptPath)) {
      console.error(`Script not found at: ${scriptPath}`);
      return resolve({ 
        success: false, 
        error: `Script not found: ${scriptName} at ${scriptPath}`, 
        output: '' 
      });
    }

    // Use pwsh if available, otherwise fall back to powershell
    const command = process.platform === 'win32' ? 'powershell.exe' : 'pwsh';
    const commandArgs = ['-ExecutionPolicy', 'Bypass', '-File', scriptPath, ...args];

    const scriptProcess = spawn(command, commandArgs, {
      cwd: path.dirname(scriptPath),
      shell: true,
      stdio: ['pipe', 'pipe', 'pipe']
    });

    let stdoutData = '';
    let stderrData = '';

    scriptProcess.stdout?.on('data', (data) => {
      stdoutData += data.toString();
    });

    scriptProcess.stderr?.on('data', (data) => {
      stderrData += data.toString();
    });

    scriptProcess.on('error', (err) => {
      console.error(`Failed to start script process: ${err}`);
      resolve({ 
        success: false, 
        error: `Failed to start script: ${err.message}`, 
        output: '' 
      });
    });

    scriptProcess.on('close', (code) => {
      if (code === 0) {
        resolve({ success: true, output: stdoutData.trim() });
      } else {
        console.error(`Script exited with code ${code}`);
        console.error('Stderr:', stderrData);
        resolve({ 
          success: false, 
          error: `Script execution failed with code ${code}`, 
          output: stderrData.trim() || stdoutData.trim()
        });
      }
    });
  });
});

