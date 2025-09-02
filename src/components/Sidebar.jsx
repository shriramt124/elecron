import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Sidebar component
 * @param {boolean} isCollapsed - whether sidebar is collapsed (no longer used)
 * @param {Function} setIsCollapsed - toggle collapse (no longer used)
 * @param {Array} tabs - navigation tabs
 * @param {string} [logoImage] - optional logo image source path / URL
 * @param {string} [logoAlt] - alt text for logo image
 */
const Sidebar = ({ isCollapsed, setIsCollapsed, tabs, logoImage, logoAlt = 'Logo' }) => {
  // Toggle functionality removed as requested

  return (
    <div
  className="fixed left-0 top-0 bottom-0 menu-surface-strong backdrop-blur-xl border-r ui-border shadow-[0_6px_18px_-8px_rgba(0,0,0,0.55)] transition-all duration-300 z-30 flex flex-col w-14"
    >
      {/* Logo Section */}
  <div className="flex items-center p-3 border-b ui-border-sub flex-none">
        <div className="flex items-center">
          {logoImage ? (
            <img
              src={logoImage}
              alt={logoAlt}
              className="flex-shrink-0 w-10 h-10 object-contain select-none"
              draggable="false"
            />
          ) : (
            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
              <i className="fas fa-shield-alt text-cyber-accent text-xl"></i>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu (true even distribution using spacer) */}
      <nav className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col">
          <div className="flex-1 flex flex-col">
            <ul className="flex-1 flex flex-col justify-evenly px-1 py-4 overflow-hidden">
              {tabs.map((tab) => (
                <li key={tab.id} className="flex items-stretch">
                  <NavLink
                    to={`/${tab.id}`}
                    className={({ isActive }) => {
                      const base = "group flex flex-1 items-center justify-center rounded-md transition-colors select-none py-2 text-sm border border-transparent";
                      const active = 'menu-panel-alt text-brand-primary border-l-2 border-brand-primary/60';
                      const inactive = 'text-gray-400 hover:text-gray-200 hover:bg-[color:var(--surface-2)]/55';
                      return `${base} ${isActive ? active : inactive}`;
                    }}
                    title={tab.label}
                  >
                    <i className={`${tab.icon} text-base transition-colors`}></i>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      {/* Bottom Section */}
  <div className="p-3 border-t ui-border-sub flex-none">
        <div className="flex justify-center items-center transition-colors">
      <button className="text-gray-400 hover:text-brand-primary transition-colors focus-ring rounded-md px-1" title="Sign Out">
            <i className="fas fa-sign-out-alt text-sm"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;