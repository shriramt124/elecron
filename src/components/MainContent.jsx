
import React from 'react';

const MainContent = ({ activeTab, isCollapsed }) => {
  const getTabContent = () => {
    switch (activeTab) {
      case 'dashboards':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-100 mb-3">Security Dashboard</h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">Monitor and manage your cybersecurity infrastructure with real-time threat intelligence and analytics.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Active Threats', value: '12', change: '-3%', icon: 'fas fa-shield-alt', color: 'red', bg: 'from-red-600 to-red-700', status: 'critical' },
                { title: 'Protected Assets', value: '2,847', change: '+5%', icon: 'fas fa-server', color: 'emerald', bg: 'from-emerald-600 to-emerald-700', status: 'secure' },
                { title: 'Network Scans', value: '1,234', change: '+12%', icon: 'fas fa-search', color: 'cyan', bg: 'from-cyan-600 to-cyan-700', status: 'active' },
                { title: 'Security Score', value: '94%', change: '+2%', icon: 'fas fa-chart-line', color: 'blue', bg: 'from-blue-600 to-blue-700', status: 'good' }
              ].map((stat, index) => (
                <div key={index} className="group stat-card transition-all duration-300 hover:scale-105">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm font-medium text-slate-400 mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold text-slate-100">{stat.value}</p>
                    </div>
                    <div className={`p-3 bg-gradient-to-br ${stat.bg} rounded-xl shadow-lg group-hover:shadow-xl group-hover:shadow-${stat.color}-500/20 transition-all duration-300`}>
                      <i className={`${stat.icon} text-white text-xl`}></i>
                    </div>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className={`font-semibold px-2 py-1 rounded-full ${
                      stat.change.startsWith('+') ? 'text-emerald-400 bg-emerald-900/30' : 'text-red-400 bg-red-900/30'
                    }`}>{stat.change}</span>
                    <span className="text-slate-500 ml-2">from last scan</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-700/50 p-8">
              <h3 className="text-xl font-semibold text-slate-100 mb-6 text-center flex items-center justify-center">
                <i className="fas fa-bolt text-cyan-400 mr-2"></i>
                Security Operations Center
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: 'fas fa-shield-virus', label: 'Threat Detection', color: 'red' },
                  { icon: 'fas fa-chart-bar', label: 'Security Analytics', color: 'cyan' },
                  { icon: 'fas fa-file-alt', label: 'Incident Reports', color: 'blue' },
                  { icon: 'fas fa-cogs', label: 'Security Config', color: 'slate' }
                ].map((action, index) => (
                  <button key={index} className="action-button">
                    <i className={`${action.icon} text-2xl mb-2 group-hover:scale-110 transition-transform duration-300`}></i>
                    <p className="text-sm font-medium">{action.label}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'directory':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-slate-100 mb-2">Active Directory Management</h1>
              <p className="text-slate-400">Secure directory services and user management</p>
            </div>
            <div className="stat-card">
              <p className="text-slate-300">Directory services monitoring and management tools will be available here.</p>
            </div>
          </div>
        );
      
      case 'aws':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-slate-100 mb-2">AWS Security Management</h1>
              <p className="text-slate-400">Cloud security monitoring and compliance</p>
            </div>
            <div className="stat-card">
              <p className="text-slate-300">AWS security tools and monitoring dashboard will be available here.</p>
            </div>
          </div>
        );
      
      case 'azure':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-slate-100 mb-2">Azure Security Center</h1>
              <p className="text-slate-400">Microsoft Azure security and compliance management</p>
            </div>
            <div className="stat-card">
              <p className="text-slate-300">Azure security management tools will be available here.</p>
            </div>
          </div>
        );
      
      case 'forensics':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-slate-100 mb-2">Digital Forensics</h1>
              <p className="text-slate-400">Evidence collection and incident investigation</p>
            </div>
            <div className="stat-card">
              <p className="text-slate-300">Digital forensics tools and case management will be available here.</p>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="text-center py-16">
            <div className="text-6xl text-slate-600 mb-4">
              <i className="fas fa-shield-alt"></i>
            </div>
            <h3 className="text-xl font-semibold text-slate-300">Select a security module</h3>
            <p className="text-slate-500 mt-2">Choose from the navigation above to access different security tools</p>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-br from-cyber-black via-cyber-darker to-cyber-black min-h-screen w-full">
      <div className="p-8">
        <div className="w-full">
          {getTabContent()}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
