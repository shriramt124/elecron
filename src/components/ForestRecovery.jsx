
import React, { useState } from 'react';

// Adjusted: removed outer full-screen background & margin; parent provides layout
const ForestRecovery = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [domainFilter, setDomainFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);

  const domainControllers = [
    {
      id: 1,
      type: 'Root',
      domain: 'company.local',
      domainSid: 'S-1-5-21-237783...',
      site: 'Default-First-Site-Name',
      samAccountName: 'DC01$',
      netBIOS: 'DC01',
      fqdn: 'dc01.company.local',
      isGC: true,
      isRO: false,
      ipv4Address: '10.0.0.1',
      status: 'Active'
    },
    {
      id: 2,
      type: 'Child',
      domain: 'sales.company.local',
      domainSid: 'S-1-5-21-445566...',
      site: 'Sales-Site',
      samAccountName: 'SALESDC$',
      netBIOS: 'SALESDC',
      fqdn: 'salesdc.sales.company.local',
      isGC: false,
      isRO: false,
      ipv4Address: '10.0.1.10',
      status: 'Warning'
    },
    {
      id: 3,
      type: 'Child',
      domain: 'dev.company.local',
      domainSid: 'S-1-5-21-778899...',
      site: 'Dev-Site',
      samAccountName: 'DEVDC$',
      netBIOS: 'DEVDC',
      fqdn: 'devdc.dev.company.local',
      isGC: false,
      isRO: false,
      ipv4Address: '10.0.2.10',
      status: 'Active'
    }
  ];

  const recentActivity = [
    { action: 'Domain Controller Updated', target: 'DC01.company.local', time: '4 min ago' },
    { action: 'User Group Created', target: 'Sales-Team', time: '15 min ago' },
    { action: 'Policy Warning', target: 'Password policy', time: '1 hour ago' },
    { action: 'Backup Completed', target: 'System state', time: '3 hours ago' }
  ];

  // Filter domain controllers based on search and filter criteria
  const filteredDomainControllers = domainControllers.filter(dc => {
    // Search filter
    const matchesSearch = !searchQuery || 
      dc.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dc.fqdn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dc.netBIOS.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dc.site.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dc.samAccountName.toLowerCase().includes(searchQuery.toLowerCase());

    // Domain type filter
    const matchesDomainFilter = domainFilter === 'all' || 
      (domainFilter === 'root' && dc.type === 'Root') ||
      (domainFilter === 'child' && dc.type === 'Child');

    // Status filter
    const matchesStatusFilter = statusFilter === 'all' || 
      dc.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesDomainFilter && matchesStatusFilter;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active':
        return <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>;
      case 'Warning':
        return <div className="w-2 h-2 bg-amber-400 rounded-full"></div>;
      case 'Error':
        return <div className="w-2 h-2 bg-red-400 rounded-full"></div>;
      default:
        return <div className="w-2 h-2 bg-gray-400 rounded-full"></div>;
    }
  };

  // Export filtered rows
  const handleExport = () => {
    const rowsToExport = filteredDomainControllers;
    const headers = ['Type','Domain','Domain SID','Site','SAM Account','NetBIOS','FQDN','GC','RO','IPv4 Address','Status'];
    const csvLines = [headers.join(',')];
    rowsToExport.forEach(dc => {
      const line = [
        dc.type,
        dc.domain,
        dc.domainSid,
        dc.site,
        dc.samAccountName,
        dc.netBIOS,
        dc.fqdn,
        dc.isGC ? 'Yes' : 'No',
        dc.isRO ? 'Yes' : 'No',
        dc.ipv4Address,
        dc.status
      ].map(val => `"${String(val).replace(/"/g,'""')}"`).join(',');
      csvLines.push(line);
    });
    const blob = new Blob([csvLines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const stamp = new Date().toISOString().replace(/[:T]/g,'-').split('.')[0];
    a.download = `domain_controllers_${stamp}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex min-h-[calc(100vh-7rem)] w-full overflow-hidden">{/* Constrained to viewport height; prevent horizontal overflow */}
      {/* Main Container */}
      <div className="flex flex-1 min-w-0">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header Section */}
          <div className="menu-surface-strong backdrop-blur-sm border-b ui-border px-6 py-5">
            <div className="flex items-center justify-between">
              {/* Left Side - Page Title */}
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <i className="fas fa-tree text-white text-lg"></i>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white mb-1">Active Directory Overview</h1>
                  <p className="text-sm text-gray-400">Recover and restore your Active Directory forest</p>
                </div>
              </div>
              
              {/* Right Side - intentionally left blank per request */}
              <div className="flex items-center space-x-3" />
            </div>
          </div>
          {/* Stats Row directly under header */}
          <div className="px-6 pt-4 pb-2 menu-panel border-b ui-border-sub flex-none">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl">
              {/* Active Directory Forest Card */}
              <div className="group relative overflow-hidden rounded-lg border ui-border-faint p-3 bg-gradient-to-br from-purple-600/20 to-purple-700/30 backdrop-blur-sm min-w-[200px]">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl font-bold text-white">1</div>
                  <div>
                    <div className="text-xs text-purple-100 font-medium">Active Directory Forest</div>
                    <div className="text-xs text-purple-200/70">In Isolation Environment</div>
                  </div>
                </div>
              </div>

              {/* Active Directory Domains Card */}
              <div className="group relative overflow-hidden rounded-lg border ui-border-faint p-3 bg-gradient-to-br from-indigo-600/20 to-indigo-700/30 backdrop-blur-sm min-w-[200px]">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl font-bold text-white">3</div>
                  <div>
                    <div className="text-xs text-indigo-100 font-medium">Active Directory Domains</div>
                    <div className="text-xs text-indigo-200/70">Defined in the Forest</div>
                  </div>
                </div>
              </div>

              {/* Domain Controllers Card */}
              <div className="group relative overflow-hidden rounded-lg border ui-border-faint p-3 bg-gradient-to-br from-violet-600/20 to-violet-700/30 backdrop-blur-sm min-w-[200px]">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl font-bold text-white">5</div>
                  <div>
                    <div className="text-xs text-violet-100 font-medium">Domain Controllers</div>
                    <div className="text-xs text-violet-200/70">Defined in the Forest</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Wrapper */}
          <div className="flex flex-1 overflow-hidden min-w-0">
            {/* Main Content */}
            <div className="flex-1 p-6 flex flex-col min-w-0">
              {/* Filters */}
              <div className="flex items-center space-x-4 mb-4 flex-none">
                <div className="relative flex-1 min-w-0 max-w-md">
                  <input
                    type="text"
                    placeholder="Search domains..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-600 rounded-lg bg-cyber-dark/70 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                  <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                </div>
                <select
                  value={domainFilter}
                  onChange={(e) => setDomainFilter(e.target.value)}
                  className="px-4 py-2.5 text-sm border border-gray-600 rounded-lg bg-cyber-dark/70 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  <option value="all">All Domains</option>
                  <option value="root">Root Domain</option>
                  <option value="child">Child Domains</option>
                </select>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2.5 text-sm border border-gray-600 rounded-lg bg-cyber-dark/70 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
                </select>
              </div>


              {/* Scrollable data region now given a fixed viewport height so table height doesn't grow/shrink when sidebar toggles */}
              <div className="flex-none h-[380px] flex flex-col">{/* reduced height (was 460px) */}
                <div className="menu-panel backdrop-blur-sm rounded-xl border ui-border flex-1 min-h-0 flex flex-col overflow-hidden shadow-[0_6px_18px_-8px_rgba(0,0,0,0.55)]">
                  <div className="px-6 py-4 menu-panel-alt border-b ui-border-sub flex-none flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">Domain Controllers</h3>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {/* future reload logic */}}
                        className="bg-brand-primary/80 hover:bg-brand-primary text-white px-3 py-2 rounded-md text-xs font-medium transition-colors shadow"
                        title="Refresh"
                        aria-label="Refresh domain controllers"
                      >
                        <i className="fas fa-sync-alt text-sm"></i>
                      </button>
                      <button
                        onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
            className={`px-3 py-2 rounded-md text-xs font-medium transition-colors flex items-center justify-center ${
                          isRightSidebarOpen
              ? 'bg-[color:var(--surface-3)]/55 text-brand-primary border border-brand-primary/40'
              : 'bg-[color:var(--surface-2)]/55 text-gray-300 border border-[color:var(--surface-border)]/35'
                        }`}
                        title={isRightSidebarOpen ? 'Hide details panel' : 'Show details panel'}
                        aria-label={isRightSidebarOpen ? 'Hide details panel' : 'Show details panel'}
                      >
                        <i className="fas fa-info-circle text-sm"></i>
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 min-h-0 overflow-auto">{/* vertical + horizontal scroll within fixed-height container */}
                    <div className="inline-block min-w-full align-top">
                      <table className="min-w-full text-sm whitespace-nowrap table-fixed">{/* table-fixed prevents reflow height jumps */}
                        <thead className="menu-panel-alt border-b ui-border-sub">
                          <tr>
                            <th className="text-left py-3 px-6 font-medium text-gray-300">Type</th>
                            <th className="text-left py-3 px-6 font-medium text-gray-300">Domain</th>
                            <th className="text-left py-3 px-6 font-medium text-gray-300">Domain SID</th>
                            <th className="text-left py-3 px-6 font-medium text-gray-300">Site</th>
                            <th className="text-left py-3 px-6 font-medium text-gray-300">SAM Account</th>
                            <th className="text-left py-3 px-6 font-medium text-gray-300">NetBIOS</th>
                            <th className="text-left py-3 px-6 font-medium text-gray-300">FQDN</th>
                            <th className="text-center py-3 px-6 font-medium text-gray-300">GC</th>
                            <th className="text-center py-3 px-6 font-medium text-gray-300">RO</th>
                            <th className="text-left py-3 px-6 font-medium text-gray-300">IPv4 Address</th>
                            <th className="text-left py-3 px-6 font-medium text-gray-300">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-cyber-light/10">
                          {filteredDomainControllers.map((dc) => (
                            <tr key={dc.id} className="hover:bg-[color:var(--surface-3)]/75 transition-colors">
                              <td className="py-3 px-6 text-gray-300">{dc.type}</td>
                              <td className="py-3 px-6">
                                <div className="flex items-center space-x-2">
                                  <i className="fas fa-sitemap text-blue-400 text-sm"></i>
                                  <span className="font-medium text-white">{dc.domain}</span>
                                </div>
                              </td>
                              <td className="py-3 px-6 text-gray-400 font-mono text-xs">{dc.domainSid}</td>
                              <td className="py-3 px-6 text-gray-300">{dc.site}</td>
                              <td className="py-3 px-6 text-gray-300">{dc.samAccountName}</td>
                              <td className="py-3 px-6 text-gray-300">{dc.netBIOS}</td>
                              <td className="py-3 px-6 text-gray-300">{dc.fqdn}</td>
                              <td className="py-3 px-6 text-center">{dc.isGC ? <i className="fas fa-check text-emerald-400"/> : <i className="fas fa-times text-red-400"/>}</td>
                              <td className="py-3 px-6 text-center">{dc.isRO ? <i className="fas fa-check text-emerald-400"/> : <i className="fas fa-times text-red-400"/>}</td>
                              <td className="py-3 px-6 text-gray-300 font-mono">{dc.ipv4Address}</td>
                              <td className="py-3 px-6">
                                <div className="flex items-center space-x-2">
                                  {getStatusIcon(dc.status)}
                                  <span className="text-gray-300">{dc.status}</span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* Export Button - fixed beneath table container */}
                <div className="mt-3 flex justify-between items-center">
                  <div className="text-xs text-gray-400 font-mono">
                    Showing {filteredDomainControllers.length} of {domainControllers.length} domain controllers
                  </div>
                  <button
                    onClick={handleExport}
                    className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium shadow transition-colors disabled:opacity-50"
                    title="Export filtered data"
                  >
                    <i className="fas fa-file-export mr-2"></i>
                    Export Data ({filteredDomainControllers.length})
                  </button>
                </div>
              </div>
            </div>

            {/* Right Sidebar (compact, full height, no internal cap) */}
            <div className={`menu-surface-strong backdrop-blur-sm border-l ui-border transition-all duration-300 ${
              isRightSidebarOpen ? 'w-72' : 'w-0 border-l-0'
            }`}>
              {isRightSidebarOpen && (
                <div className="w-72 p-3 space-y-3">
                  {/* Dependencies Section */}
                  <div className="menu-panel backdrop-blur-sm rounded-lg p-3 border ui-border-faint shadow">
                    <div className="flex items-center space-x-2 mb-2">
                      <i className="fas fa-link text-blue-400 text-[11px]"></i>
                      <h3 className="text-[12px] font-semibold text-white tracking-wide">Dependencies</h3>
                    </div>
                    <div className="divide-y divide-cyber-light/10">
                      {[
                        { name: 'DNS Services', status: 'active' },
                        { name: 'LDAP Connection', status: 'active' },
                        { name: 'Kerberos Auth', status: 'active' },
                        { name: 'Replication', status: 'active' }
                      ].map((dep, index) => (
                        <div key={index} className="flex items-center justify-between py-1 text-[11px] leading-tight">
                          <span className="text-gray-300">{dep.name}</span>
                          <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Activity Section */}
                  <div className="menu-panel backdrop-blur-sm rounded-lg p-3 border ui-border-faint shadow">
                    <div className="flex items-center space-x-2 mb-2">
                      <i className="fas fa-clock text-blue-400 text-[11px]"></i>
                      <h3 className="text-[12px] font-semibold text-white tracking-wide">Recent Activity</h3>
                    </div>
                    <div className="space-y-2.5">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1 flex-shrink-0"></div>
                          <div className="flex-1">
                            <div className="text-[11px] font-medium text-white leading-snug">{activity.action}</div>
                            <div className="text-[10px] text-gray-400 mt-0.5 leading-tight">{activity.target}</div>
                            <div className="text-[10px] text-gray-500 mt-0.5 leading-tight">{activity.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Status Summary */}
                  <div className="menu-panel backdrop-blur-sm rounded-lg p-3 border ui-border-faint shadow">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] text-gray-400 uppercase tracking-wide">Status</span>
                      <span className="text-[10px] text-emerald-400 font-medium">Ready</span>
                    </div>
                    <div className="text-[10px] text-gray-500 mb-2 leading-tight">Last refresh: 2:15 PM</div>
                    <div className="pt-2 border-t border-cyber-light/15">
                      <div className="flex items-center justify-between text-[10px]">
                        <div className="flex items-center space-x-1 text-amber-400">
                          <i className="fas fa-exclamation-triangle text-[10px]"></i>
                          <span>1 warning</span>
                        </div>
                        <button className="text-blue-400 hover:text-blue-300 transition-colors text-[10px]">Logs</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForestRecovery;
