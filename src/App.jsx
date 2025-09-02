import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import MainContent from './components/MainContent';
import ForestRecovery from './components/ForestRecovery';
import DirectoryContent from './components/DirectoryContent';
import AWSContent from './components/AWSContent';
import AzureContent from './components/AzureContent';
import ForensicsContent from './components/ForensicsContent';
import LoginScreen from './components/LoginScreen';
import Cleanup from './components/Cleanup';
import TestingPowerShell from './components/Testing_Powershell';

// Dashboard Components 
const NewDashboard = () => <div className="p-6"><h1 className="text-xl font-semibold">/dashboards/new</h1></div>;
const DashboardTemplates = () => <div className="p-6"><h1 className="text-xl font-semibold">/dashboards/templates</h1></div>;
const DashboardPreview = () => <div className="p-6"><h1 className="text-xl font-semibold">/dashboards/preview</h1></div>;
const DashboardExport = () => <div className="p-6"><h1 className="text-xl font-semibold">/dashboards/export</h1></div>;

// Directory Components
const DirectoryComputers = () => <div className="p-8"><h1 className="text-2xl font-bold">Directory Computers</h1></div>;
const ComputerPasswordReset = () => <div className="p-8"><h1 className="text-2xl font-bold">Computer Password Reset</h1></div>;
const DomainControllers = () => <div className="p-8"><h1 className="text-2xl font-bold">Domain Controllers</h1></div>;
const DirectoryServers = () => <div className="p-8"><h1 className="text-2xl font-bold">Directory Servers</h1></div>;
const DirectoryWorkstations = () => <div className="p-8"><h1 className="text-2xl font-bold">Directory Workstations</h1></div>;
const DirectoryIdentities = () => <div className="p-8"><h1 className="text-2xl font-bold">Directory Identities</h1></div>;
const AzureIsolation = () => <div className="p-8"><h1 className="text-2xl font-bold">Azure Isolation</h1></div>;
const DirectoryRestore = () => <div className="p-8"><h1 className="text-2xl font-bold">Directory Restore from Backup</h1></div>;

// AWS Components
const EC2Instances = () => <div className="p-8"><h1 className="text-2xl font-bold">EC2 Instances</h1></div>;
const S3Storage = () => <div className="p-8"><h1 className="text-2xl font-bold">S3 Storage</h1></div>;
const RDSDatabase = () => <div className="p-8"><h1 className="text-2xl font-bold">RDS Database</h1></div>;
const CloudWatch = () => <div className="p-8"><h1 className="text-2xl font-bold">CloudWatch</h1></div>;

// Azure Components
const VirtualMachines = () => <div className="p-8"><h1 className="text-2xl font-bold">Azure Virtual Machines</h1></div>;
const VirtualNetworks = () => <div className="p-8"><h1 className="text-2xl font-bold">Azure Virtual Networks</h1></div>;
const SecurityCenter = () => <div className="p-8"><h1 className="text-2xl font-bold">Azure Security Center</h1></div>;
const AzureBackup = () => <div className="p-8"><h1 className="text-2xl font-bold">Azure Backup & Restore</h1></div>;

// Forensics Components
const EvidenceSearch = () => <div className="p-8"><h1 className="text-2xl font-bold">Evidence Search</h1></div>;
const NewCase = () => <div className="p-8"><h1 className="text-2xl font-bold">New Forensics Case</h1></div>;
const GenerateReport = () => <div className="p-8"><h1 className="text-2xl font-bold">Generate Report</h1></div>;
const EvidenceCapture = () => <div className="p-8"><h1 className="text-2xl font-bold">Evidence Capture</h1></div>;


//testing component 


const App = () => {
  // Declare all state hooks at the top level to avoid conditional hook calls
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // existing auth check loading
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Check for existing session on app load
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setCurrentUser(user);
        setIsAuthenticated(true);
      } catch (e) {
        localStorage.removeItem('currentUser');
      }
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  // Show loading spinner while checking authentication
  if (isLoading) {
    return null; // main process splash showing
  }

  // All useState hooks are now called at the top level

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    console.log('Not authenticated, showing login screen');
    return <LoginScreen onLogin={handleLogin} />;
  }

  console.log('Authenticated, showing main application');

  return (
    <HashRouter>
  <div className="app-bg flex flex-col">
        <Header currentUser={currentUser} onLogout={handleLogout} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        {/* Unified main content area: handles left offset (sidebar) + top offset (header) */}
        <div
          className={`flex-1 text-white transition-all duration-300 ${isCollapsed ? 'ml-14' : 'ml-56'} pt-28 px-0 overflow-hidden`}
        >
          <div className="h-full w-full overflow-y-auto">{/* Scrollable route view */}
          <Routes>
          {/* Dashboard Routes */}
          <Route path="/" element={<Navigate to="/directory" />} />
          <Route path="/dashboards" element={<div className="p-6"><h1 className="text-xl font-semibold">Dashboard</h1></div>} />
          <Route path="/dashboards/new" element={<NewDashboard />} />
          <Route path="/dashboards/templates" element={<DashboardTemplates />} />
          <Route path="/dashboards/preview" element={<DashboardPreview />} />
          <Route path="/dashboards/export" element={<DashboardExport />} />

          {/* Directory Routes */}
          <Route path="/directory" element={<DirectoryContent isCollapsed={isCollapsed} />} />
          <Route path="/directory/forest-recovery" element={<ForestRecovery isCollapsed={isCollapsed} />} />
          <Route path="/directory/computers" element={<DirectoryComputers />} />
          <Route path="/directory/computers/password-reset" element={<ComputerPasswordReset />} />
          <Route path="/directory/computers/domain-controllers" element={<DomainControllers />} />
          <Route path="/directory/computers/servers" element={<DirectoryServers />} />
          <Route path="/directory/computers/workstations" element={<DirectoryWorkstations />} />
          <Route path="/directory/identities" element={<DirectoryIdentities />} />
          <Route path="/directory/azure-isolation" element={<AzureIsolation />} />
          <Route path="/directory/cleanup" element={<Cleanup />} />
          <Route path="/directory/restore" element={<DirectoryRestore />} />

          {/* AWS Routes */}
          <Route path="/aws" element={<AWSContent isCollapsed={isCollapsed} />} />
          <Route path="/aws/ec2" element={<EC2Instances />} />
          <Route path="/aws/s3" element={<S3Storage />} />
          <Route path="/aws/rds" element={<RDSDatabase />} />
          <Route path="/aws/cloudwatch" element={<CloudWatch />} />

          {/* Azure Routes */}
          <Route path="/azure" element={<AzureContent isCollapsed={isCollapsed} />} />
          <Route path="/azure/virtual-machines" element={<VirtualMachines />} />
          <Route path="/azure/virtual-networks" element={<VirtualNetworks />} />
          <Route path="/azure/security-center" element={<SecurityCenter />} />
          <Route path="/azure/backup" element={<AzureBackup />} />

          {/* Forensics Routes */}
          <Route path="/forensics" element={<ForensicsContent isCollapsed={isCollapsed} />} />
          <Route path="/forensics/evidence-search" element={<EvidenceSearch />} />
          <Route path="/forensics/new-case" element={<NewCase />} />
          <Route path="/forensics/generate-report" element={<GenerateReport />} />
          <Route path="/forensics/evidence-capture" element={<EvidenceCapture />} />


          {/* Testign powershell route */}
          <Route path="/testing" element={<TestingPowerShell />} />
        </Routes>
          </div>
        </div>
      </div>
    </HashRouter>
  );
};

export default App;