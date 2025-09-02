
import React from 'react';

const ForensicsContent = () => (
  <div className="p-6">
    <div className="menu-panel border ui-border rounded-xl p-6 shadow-[0_6px_18px_-8px_rgba(0,0,0,0.55)]">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-10 h-10 rounded-lg bg-brand-primary/20 flex items-center justify-center text-brand-primary">
          <i className="fas fa-chart-bar text-lg"></i>
        </div>
        <div>
          <h1 className="text-xl font-semibold text-white">Digital Forensics</h1>
          <p className="text-sm text-gray-400 mt-1">Investigate and analyze digital evidence</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="menu-panel-alt border ui-border-faint rounded-lg p-4 hover:border-brand-primary/40 transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-md bg-brand-primary/15 flex items-center justify-center text-brand-primary">
              <i className="fas fa-search-plus text-sm"></i>
            </div>
            <h3 className="text-sm font-medium text-white">Evidence Search</h3>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">Search through digital evidence and forensic artifacts</p>
        </div>
        
        <div className="menu-panel-alt border ui-border-faint rounded-lg p-4 hover:border-brand-primary/40 transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-md bg-brand-primary/15 flex items-center justify-center text-brand-primary">
              <i className="fas fa-folder-plus text-sm"></i>
            </div>
            <h3 className="text-sm font-medium text-white">New Case</h3>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">Create new investigation case with evidence tracking</p>
        </div>
        
        <div className="menu-panel-alt border ui-border-faint rounded-lg p-4 hover:border-brand-primary/40 transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-md bg-brand-primary/15 flex items-center justify-center text-brand-primary">
              <i className="fas fa-file-alt text-sm"></i>
            </div>
            <h3 className="text-sm font-medium text-white">Generate Report</h3>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">Create comprehensive investigation reports</p>
        </div>
      </div>
    </div>
  </div>
);

export default ForensicsContent;
