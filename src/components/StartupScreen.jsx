import React from 'react';

/**
 * StartupScreen
 * Displays an initialization splash while app dependencies load.
 * Props: progress (0-100), step (string), error (string|null), onRetry (fn)
 */
const StartupScreen = ({ progress, step, error, onRetry }) => {
  return (
    <div className="min-h-screen relative flex items-center justify-center bg-cyber-black overflow-hidden px-6">
      {/* Ambient visuals */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[32rem] h-[32rem] rounded-full bg-cyber-accent/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[36rem] h-[36rem] rounded-full bg-cyber-glow/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(14,165,233,0.08),transparent_60%)]" />
      </div>

      <div className="w-full max-w-md relative">
        <div className="backdrop-blur-xl bg-cyber-darker/80 border border-cyber-light/15 rounded-2xl shadow-cyber-sm px-8 pt-10 pb-8 relative overflow-hidden">
          <div className="absolute inset-0 rounded-2xl border border-cyber-light/10 pointer-events-none" />

          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 flex items-center justify-center">
              <img src="/PraveaLogo.png" alt="Logo" className="w-18 h-18 object-contain select-none" draggable="false" />
            </div>
          </div>

          <div className="text-center mb-6">
            <h1 className="text-xl font-semibold tracking-tight text-gray-200">Initializing Console</h1>
            <p className="mt-1 text-xs text-cyber-light/60">Preparing secure environment…</p>
          </div>

          {!error && (
            <>
              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-cyber-dark/70 overflow-hidden mb-3 border border-cyber-light/10">
                <div
                  className="h-full bg-gradient-to-r from-cyber-accent to-cyber-glow transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between text-[10px] tracking-wide text-cyber-light/50 mb-6">
                <span>{progress}%</span>
                <span className="truncate max-w-[70%]">{step || 'Starting…'}</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-cyber-light/50 text-xs">
                <i className="fas fa-shield-alt fa-spin text-cyber-accent/70" />
                <span>Loading core modules</span>
              </div>
            </>
          )}

          {error && (
            <div className="space-y-4">
              <div className="rounded-md border border-cyber-danger/40 bg-cyber-danger/10 px-4 py-3">
                <div className="flex items-start space-x-2">
                  <i className="fas fa-exclamation-triangle text-cyber-danger text-sm mt-0.5" />
                  <div className="text-left">
                    <p className="text-xs font-semibold text-cyber-danger/90 mb-1">Initialization Failed</p>
                    <p className="text-[10px] leading-snug text-cyber-danger/80">{error}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={onRetry}
                className="w-full text-xs font-medium rounded-md bg-cyber-accent/90 hover:bg-cyber-accent text-white py-2 transition-colors flex items-center justify-center space-x-2"
              >
                <i className="fas fa-sync-alt text-[10px]" />
                <span>Retry Initialization</span>
              </button>
            </div>
          )}
        </div>
  <p className="mt-6 text-center text-[10px] tracking-wide text-cyber-light/40">© 2025 Pravea Console</p>
      </div>
    </div>
  );
};

export default StartupScreen;
