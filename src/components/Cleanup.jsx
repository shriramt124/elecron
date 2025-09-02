
import React, { useState } from 'react';

// Dark mode Active Directory cleanup console
// Matches cyber theme used across application (no full-screen wrapper; relies on parent layout)
const Cleanup = () => {
  const [cleanupOptions, setCleanupOptions] = useState({
    selectAll: false,
    authRestoreSysvol: false,
    cleanDNS: false,
    currentUserPasswordReset: false,
    domainControllerPasswordReset: false,
    metadataCleanup: false,
    removeCertificates: false,
    removeExternalTrusts: false,
    removeSecrets: false,
    resetAllComputerAccounts: false,
    resetAllUserPasswords: false,
    resetDSRMPassword: false,
    resetKrbtgtPassword: false,
    resetRID500Password: false,
    resetRODCRevealed: false,
    resetTierZeroPasswords: false,
    resetTrusts: false,
    seizeFSMORoles: false
  });

  const handleCleanupOption = (option) => {
    if (option === 'selectAll') {
      const newValue = !cleanupOptions.selectAll;
      const newOptions = Object.keys(cleanupOptions).reduce((acc, key) => {
        acc[key] = newValue;
        return acc;
      }, {});
      setCleanupOptions(newOptions);
    } else {
      const newOptions = {
        ...cleanupOptions,
        [option]: !cleanupOptions[option]
      };
      const otherOptions = Object.keys(newOptions).filter(key => key !== 'selectAll');
      const allSelected = otherOptions.every(key => newOptions[key]);
      newOptions.selectAll = allSelected;
      setCleanupOptions(newOptions);
    }
  };

  const cleanupItems = [
    { key: 'authRestoreSysvol', label: 'Auth Restore Sysvol' },
    { key: 'cleanDNS', label: 'Clean DNS' },
    { key: 'currentUserPasswordReset', label: 'Current User Password Reset' },
    { key: 'domainControllerPasswordReset', label: 'Domain Controller Password Reset' },
    { key: 'metadataCleanup', label: 'Metadata Cleanup' },
    { key: 'removeCertificates', label: 'Remove Certificates' },
    { key: 'removeExternalTrusts', label: 'Remove External Trusts' },
    { key: 'removeSecrets', label: 'Remove Secrets' },
    { key: 'resetAllComputerAccounts', label: 'Reset All Computer Accounts' },
    { key: 'resetAllUserPasswords', label: 'Reset All User Passwords' },
    { key: 'resetDSRMPassword', label: 'Reset DSRM Password' },
    { key: 'resetKrbtgtPassword', label: 'Reset Krbtgt Password' },
    { key: 'resetRID500Password', label: 'Reset RID 500 Password' },
    { key: 'resetRODCRevealed', label: 'Reset RODC Revealed' },
    { key: 'resetTierZeroPasswords', label: 'Reset Tier Zero Passwords' },
    { key: 'resetTrusts', label: 'Reset Trusts' },
    { key: 'seizeFSMORoles', label: 'Seize FSMO Roles' }
  ];

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Title & Intro */}
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-cyber-accent/30 to-cyber-accent/5 border border-cyber-accent/30 flex items-center justify-center text-cyber-accent shadow-cyber-sm">
              <i className="fas fa-broom text-lg"></i>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Active Directory Cleanup</h1>
              <p className="text-xs text-cyber-light/70 mt-1">Select and execute controlled remediation operations</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-cyber-light/50">
            <div className="flex items-center gap-1"><i className="fas fa-shield-alt text-cyber-accent/80" /><span>Privileged Mode</span></div>
            <div className="h-1 w-1 rounded-full bg-cyber-light/30" />
            <div className="flex items-center gap-1"><i className="fas fa-database text-cyber-accent/70" /><span>AD Connected</span></div>
          </div>
        </div>

        {/* Warning */}
        <div className="rounded-xl border border-cyber-warning/30 bg-cyber-warning/10 backdrop-blur-sm p-5 flex gap-4">
          <div className="w-10 h-10 rounded-lg bg-cyber-warning/20 flex items-center justify-center text-cyber-warning">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-cyber-warning tracking-wide">High Impact Operations</h3>
            <p className="text-xs leading-relaxed text-cyber-warning/90 max-w-3xl">
              These cleanup actions can significantly alter directory state. Ensure recent verified backups exist and proper change control approvals are in place before proceeding.
            </p>
          </div>
        </div>

        {/* Cleanup Panel */}
        <div className="rounded-2xl border border-cyber-light/15 bg-cyber-darker/70 backdrop-blur-xl shadow-cyber-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-cyber-light/15 flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-cyber-accent/15 flex items-center justify-center text-cyber-accent">
              <i className="fas fa-list-check"></i>
            </div>
            <h2 className="text-lg font-semibold">Cleanup Options</h2>
          </div>
          <div className="p-6 space-y-6">
            {/* Select All */}
            <div className="p-4 rounded-md border border-cyber-accent/25 bg-cyber-accent/10">
              <label className="flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={cleanupOptions.selectAll}
                  onChange={() => handleCleanupOption('selectAll')}
                  className="w-4 h-4 rounded border-cyber-light/30 bg-cyber-dark/70 text-cyber-accent focus:ring-cyber-accent/40 focus:ring-2"
                />
                <span className="ml-3 text-sm font-medium tracking-wide">Select All Options</span>
              </label>
            </div>
            {/* Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {cleanupItems.map(item => (
                <label
                  key={item.key}
                  className="group flex items-center p-3 rounded-md border border-cyber-light/10 bg-cyber-dark/50 hover:border-cyber-accent/40 hover:bg-cyber-dark/70 transition-colors cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={cleanupOptions[item.key]}
                    onChange={() => handleCleanupOption(item.key)}
                    className="w-4 h-4 rounded border-cyber-light/30 bg-cyber-darker text-cyber-accent focus:ring-cyber-accent/40 focus:ring-2"
                  />
                  <span className="ml-3 text-xs font-medium text-cyber-light/90 group-hover:text-gray-200 tracking-wide">{item.label}</span>
                </label>
              ))}
            </div>
            {/* Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-cyber-light/10">
              <div className="text-xs text-cyber-light/60 font-mono">
                {Object.values(cleanupOptions).filter(Boolean).length - (cleanupOptions.selectAll ? 1 : 0)} / {cleanupItems.length} selected
              </div>
              <div className="flex gap-3">
                <button className="px-5 py-2 rounded-md text-xs font-semibold tracking-wide bg-cyber-dark/60 hover:bg-cyber-dark/80 border border-cyber-light/20 text-cyber-light/80 hover:text-gray-100 transition-colors flex items-center gap-2">
                  <i className="fas fa-times text-[11px]"></i>
                  <span>Cancel</span>
                </button>
                <button className="px-5 py-2 rounded-md text-xs font-semibold tracking-wide bg-gradient-to-r from-cyber-accent to-cyber-glow hover:from-cyber-glow hover:to-cyber-accent text-white shadow-cyber-sm transition-colors flex items-center gap-2">
                  <i className="fas fa-play text-[11px]"></i>
                  <span>Start Cleanup</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="rounded-xl border border-cyber-light/15 bg-cyber-darker/70 backdrop-blur-xl p-6 flex items-center gap-4">
          <div className="w-3 h-3 rounded-full bg-cyber-success shadow-cyber-sm" />
          <div className="text-xs text-cyber-light/80">Ready to perform cleanup operations</div>
        </div>
      </div>
    </div>
  );
};

export default Cleanup;
