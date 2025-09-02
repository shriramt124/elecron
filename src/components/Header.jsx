
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const Header = ({ currentUser, onLogout, isCollapsed, setIsCollapsed }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);
  const hoverTimeoutRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const tabs = [
    {
      id: 'dashboards',
      label: 'Dashboards',
      icon: 'fas fa-chart-line', // chart icon
      path: '/dashboards',
      items: [
        { icon: 'fas fa-plus-circle', label: 'New Dashboard', desc: 'Create a new dashboard from scratch', path: '/dashboards/new' },
        { icon: 'fas fa-palette', label: 'Templates', desc: 'Use pre-built dashboard templates', path: '/dashboards/templates' },
        { icon: 'fas fa-eye', label: 'Preview Mode', desc: 'Preview your dashboard', path: '/dashboards/preview' },
        { icon: 'fas fa-download', label: 'Export Data', desc: 'Export dashboard data', path: '/dashboards/export' },
        { icon: 'fas fa-download', label: 'Testing', desc: 'Testing', path: '/testing' }
      ]
    },
    {
      id: 'directory',
      label: 'Active Directory',
      icon: 'fas fa-database', // database icon
      path: '/directory',
      items: [
        {
          icon: 'fas fa-desktop',
          label: 'Computers',
          desc: 'Manage domain computers',
          path: '/directory/computers',
          submenu: [
            { icon: 'fas fa-key', label: 'Account Password Reset', desc: 'Reset computer accounts', path: '/directory/computers/password-reset' },
            { icon: 'fas fa-shield-alt', label: 'Domain Controllers', desc: 'Manage domain controllers', path: '/directory/computers/domain-controllers' },
            { icon: 'fas fa-server', label: 'Servers', desc: 'Manage domain servers', path: '/directory/computers/servers' },
            { icon: 'fas fa-laptop', label: 'Workstations', desc: 'Manage user workstations', path: '/directory/computers/workstations' }
          ]
        },
        { icon: 'fas fa-user-friends', label: 'Identities', desc: 'Manage user identities', path: '/directory/identities' },
        { icon: 'fas fa-cloud-upload-alt', label: 'Azure Isolation', desc: 'Azure AD integration', path: '/directory/azure-isolation' },
        { icon: 'fas fa-broom', label: 'Cleanup', desc: 'Perform AD cleanup operations', path: '/directory/cleanup' },
        { icon: 'fas fa-history', label: 'Restore from Backup', desc: 'Restore AD objects', path: '/directory/restore-backup' }
      ]
    },
    {
      id: 'aws',
      label: 'AWS',
      icon: 'fas fa-file', // file icon
      path: '/aws',
      items: [
        { icon: 'fas fa-server', label: 'EC2 Instances', desc: 'Manage virtual servers', path: '/aws/ec2' },
        { icon: 'fas fa-cube', label: 'S3 Storage', desc: 'Object storage service', path: '/aws/s3' },
        { icon: 'fas fa-database', label: 'RDS Database', desc: 'Relational database service', path: '/aws/rds' },
        { icon: 'fas fa-chart-line', label: 'CloudWatch', desc: 'Monitoring and logging', path: '/aws/cloudwatch' }
      ]
    },
    {
      id: 'azure',
      label: 'Azure',
      icon: 'fas fa-cog', // settings icon
      path: '/azure',
      items: [
        { icon: 'fas fa-server', label: 'Virtual Machines', desc: 'Create and manage VMs', path: '/azure/vms' },
        { icon: 'fas fa-network-wired', label: 'Virtual Networks', desc: 'Configure network topology', path: '/azure/vnets' },
        { icon: 'fas fa-shield-virus', label: 'Security Center', desc: 'Unified security management', path: '/azure/security-center' },
        { icon: 'fas fa-history', label: 'Backup & Restore', desc: 'Data backup solutions', path: '/azure/backup' }
      ]
    },
    {
      id: 'forensics',
      label: 'Digital Forensics',
      icon: 'fas fa-chart-bar', // reuse chart style icon for remaining tab
      path: '/forensics',
      items: [
        { icon: 'fas fa-search-plus', label: 'Evidence Search', desc: 'Search through digital evidence', path: '/forensics/search' },
        { icon: 'fas fa-folder-plus', label: 'New Case', desc: 'Create new investigation case', path: '/forensics/new-case' },
        { icon: 'fas fa-file-alt', label: 'Generate Report', desc: 'Create investigation report', path: '/forensics/report' },
        { icon: 'fas fa-camera', label: 'Evidence Capture', desc: 'Capture digital evidence', path: '/forensics/capture' }
      ]
    }
  ];

  // Get current active tab based on location
  const getCurrentTab = () => {
    const currentPath = location.pathname;
    if (currentPath === '/' || currentPath === '/dashboards') return 'dashboards';
    const matchedTab = tabs.find(tab => currentPath.startsWith(tab.path));
    if (matchedTab) return matchedTab.id;
    return null;
  };

  const activeTab = getCurrentTab();

  // Handle mouse enter with delay
  const handleMouseEnter = (tabId) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(tabId);
      setActiveSubmenu(null);
    }, 150);
  };

  // Handle mouse leave with delay
  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setActiveSubmenu(null);
    }, 200);
  };

  // Handle dropdown mouse enter (cancel close timeout)
  const handleDropdownMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  };

  // Handle submenu hover
  const handleSubmenuHover = (itemLabel) => {
    setActiveSubmenu(itemLabel);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const handleTabClick = (tab) => {
    navigate(tab.path);
    setActiveDropdown(null);
    setActiveSubmenu(null);
  };

  const currentTab = tabs.find(tab => tab.id === activeDropdown);

  return (
    <>
      {/* Sidebar with custom logo */}
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        tabs={tabs}
  // Public assets in Vite/Electron can be referenced directly from root
  logoImage={'/PraveaLogo.png'}
        logoAlt="Pravea"
      />
      
      {/* Main Header */}
      <div 
  className={`fixed top-0 right-0 menu-surface backdrop-blur-md border-b ui-border shadow-[0_4px_12px_-6px_rgba(0,0,0,0.55)] transition-all duration-300 z-20 ${isCollapsed ? 'left-14' : 'left-56'}`}
      >
        {/* Top Row: Search, Profile, Settings, Help */}
  <div className="px-6 py-2.5 flex items-center justify-end border-b ui-border-sub">
          

          {/* Right Side Icons */}
          <div className="flex items-center space-x-6 ml-6">
            {/* Settings */}
            <button className="text-gray-400 hover:text-brand-primary transition-colors focus-ring rounded-md px-1">
              <i className="fas fa-cog"></i>
            </button>
            
            {/* Notifications */}
            <div className="relative">
              <button className="text-gray-400 hover:text-brand-primary transition-colors focus-ring rounded-md px-1">
                <i className="fas fa-bell"></i>
                <span className="absolute -top-1 -right-1 bg-cyber-danger text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
              </button>
            </div>
            
            {/* Help */}
            <button className="text-gray-400 hover:text-brand-primary transition-colors focus-ring rounded-md px-1">
              <i className="fas fa-question-circle"></i>
            </button>
            
            {/* User Menu */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center text-sm font-medium text-gray-300 hover:text-white"
              >
                <div className="h-8 w-8 rounded-full bg-cyber-accent flex items-center justify-center text-white font-semibold">
                  {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                </div>
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-52 menu-surface-strong backdrop-blur-md border ui-border rounded-xl shadow-[0_8px_24px_-4px_rgba(0,0,0,0.6)] py-2 z-50">
                  <div className="px-4 py-2 border-b ui-border-sub">
                    <p className="text-sm font-medium text-white">{currentUser?.name || 'User'}</p>
                    <p className="text-xs text-gray-400">{currentUser?.username || 'user@example.com'}</p>
                  </div>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-[color:var(--surface-3)]/80 hover:text-brand-primary rounded-md mx-1">
                    <i className="fas fa-user-circle mr-2"></i> Profile Settings
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-[color:var(--surface-3)]/80 hover:text-brand-primary rounded-md mx-1">
                    <i className="fas fa-cog mr-2"></i> Account Settings
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-[color:var(--surface-3)]/80 hover:text-brand-primary rounded-md mx-1">
                    <i className="fas fa-bell mr-2"></i> Notifications
                  </a>
                  <div className="border-t ui-border-sub mt-2 mb-1"></div>
                  <button 
                    onClick={onLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-severity-danger hover:bg-[color:var(--surface-3)]/80 rounded-md mx-1"
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i> Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

      {/* Tab Navigation */}
      <div className="relative">
  <div className="flex items-center px-8 py-1.5 menu-panel backdrop-blur-md border-b ui-border-sub">
    <div className="flex items-center justify-evenly w-full">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className="relative"
                onMouseEnter={() => handleMouseEnter(tab.id)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => handleTabClick(tab)}
      className={`group relative px-4 py-2 text-sm font-medium transition-colors duration-200 flex items-center space-x-2 rounded-md ${
                    activeTab === tab.id
                      ? 'text-brand-primary menu-panel-alt border ui-border-faint'
                      : 'text-gray-300 hover:text-brand-primary hover:bg-[color:var(--surface-3)]/55 border border-transparent'
                  }`}
                >
                  <i className={`${tab.icon} text-sm transition-transform group-hover:scale-110`}></i>
                  <span className="font-medium">{tab.label}</span>
                  {tab.items && tab.items.length > 0 && (
                    <i className={`fas fa-chevron-down text-xs transition-all duration-200 ${
                      activeDropdown === tab.id ? 'rotate-180 opacity-100' : 'opacity-60'
                    }`}></i>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Refined Mega Dropdown */}
        {activeDropdown && currentTab && (
          <div
            className="absolute top-full left-0 right-0 z-50"
            onMouseEnter={handleDropdownMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative max-w-6xl mx-auto px-6">
              {/* Arrow pointer */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 menu-surface-strong border-t border-l ui-border"></div>
              <div className="overflow-hidden rounded-2xl backdrop-blur-xl menu-surface-strong border ui-border shadow-[0_12px_40px_-8px_rgba(0,0,0,0.7),0_4px_12px_-2px_rgba(0,0,0,0.5)] animate-[fadeIn_.25s_ease]">
                <div className="grid md:grid-cols-3 gap-8 p-8 relative">
                  {/* Primary Items */}
                  <div className="md:col-span-2 grid sm:grid-cols-2 gap-4">
                    {currentTab.items.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          if (item.path) {
                            navigate(item.path);
                            setActiveDropdown(null);
                          } else if (!item.submenu) {
                            setActiveDropdown(null);
                          }
                        }}
                        onMouseEnter={() => item.submenu && handleSubmenuHover(item.label)}
                        className="group text-left flex items-start gap-4 p-4 rounded-xl border ui-border-faint menu-panel hover:bg-[color:var(--surface-3)]/80 hover:border-brand-primary/35 transition-all duration-300 relative overflow-hidden"
                      >
                        <div className="relative flex-shrink-0">
                          <div className="w-10 h-10 rounded-lg bg-[color:var(--surface-3)]/60 flex items-center justify-center text-cyber-light/60 group-hover:text-brand-primary group-hover:bg-[color:var(--surface-3)]/90 transition-all">
                            <i className={`${item.icon} text-sm`}></i>
                          </div>
                          {item.submenu && (
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-md bg-cyber-accent/20 flex items-center justify-center text-cyber-accent/70 text-[10px]">
                              <i className="fas fa-ellipsis-v"></i>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold tracking-wide text-gray-200 group-hover:text-cyber-accent flex items-center gap-2">
                            {item.label}
                            {item.submenu && (
                              <i className="fas fa-chevron-right text-[10px] opacity-60 group-hover:translate-x-0.5 transition-transform" />
                            )}
                          </h4>
                          <p className="text-xs text-gray-400 leading-snug line-clamp-2">
                            {item.desc}
                          </p>
                          <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-cyber-accent/5 to-transparent" />
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Submenu Flyout Column */}
                  <div className="relative">
                    <div className="sticky top-0 space-y-3 min-h-full">
                      <div className="text-xs font-semibold tracking-wider text-cyber-light/50 uppercase">Details</div>
                      <div className="rounded-xl border ui-border-faint menu-panel p-4 min-h-[260px] flex flex-col">
                        {!activeSubmenu && (
                          <div className="flex-1 flex items-center justify-center text-cyber-light/40 text-xs">
                            Hover an item with ellipsis to view more
                          </div>
                        )}
                        {activeSubmenu && (
                          <div className="space-y-3 animate-[fadeIn_.25s_ease]">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-md bg-cyber-accent/20 flex items-center justify-center text-cyber-accent text-[11px]">
                                <i className="fas fa-layer-group" />
                              </div>
                              <h3 className="text-sm font-semibold text-gray-200">{activeSubmenu}</h3>
                            </div>
                            <div className="space-y-2">
                              {currentTab.items.find(i => i.label === activeSubmenu)?.submenu?.map((subItem, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => {
                                    if (subItem.path) {
                                      navigate(subItem.path);
                                      setActiveDropdown(null);
                                    } else {
                                      setActiveDropdown(null);
                                    }
                                  }}
                                  className="w-full flex items-start gap-3 p-3 rounded-lg menu-panel-alt hover:bg-[color:var(--surface-3)]/90 border ui-border-faint hover:border-brand-primary/40 transition-all group"
                                >
                                  <div className="w-8 h-8 rounded-md bg-[color:var(--surface-2)]/70 flex items-center justify-center text-cyber-light/60 group-hover:text-brand-primary">
                                    <i className={`${subItem.icon} text-xs`}></i>
                                  </div>
                                  <div className="flex-1 min-w-0 text-left">
                                    <h4 className="text-xs font-semibold text-gray-200 group-hover:text-cyber-accent leading-tight">
                                      {subItem.label}
                                    </h4>
                                    <p className="text-[10px] text-gray-400 leading-snug line-clamp-2">{subItem.desc}</p>
                                  </div>
                                  <i className="fas fa-arrow-right text-[10px] text-cyber-light/30 group-hover:text-cyber-accent" />
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-8 py-3 menu-panel border-t ui-border-sub flex items-center justify-between text-[10px] tracking-wide text-cyber-light/40">
                  <div className="flex items-center gap-2"><i className="fas fa-bolt text-cyber-accent/70" /><span>Quick navigation</span></div>
                  <span className="uppercase">Pravea Console</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Header;
