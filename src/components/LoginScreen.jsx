
import React, { useState } from 'react';

const LoginScreen = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showDemoDropdown, setShowDemoDropdown] = useState(false);

  // Mock user data
  const mockUsers = [
    { username: 'admin', password: 'admin123', name: 'Administrator' },
    { username: 'user', password: 'user123', name: 'John Doe' },
    { username: 'guest', password: 'guest123', name: 'Guest User' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setTimeout(() => {
      const user = mockUsers.find(u => u.username === credentials.username && u.password === credentials.password);
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        onLogin(user);
      } else {
        setError('Invalid username or password');
      }
      setIsLoading(false);
    }, 800);
  };

  const handleDemoSelect = (user) => {
    setCredentials({ username: user.username, password: user.password });
    setShowDemoDropdown(false);
    setError('');
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-8 bg-cyber-black overflow-hidden">
      {/* Ambient background visuals */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-cyber-accent/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] rounded-full bg-cyber-glow/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.07),transparent_60%)]" />
      </div>

      <div className="w-full max-w-md relative">
        {/* Panel */}
        <div className="backdrop-blur-xl bg-cyber-darker/80 border border-cyber-light/15 rounded-2xl shadow-cyber-sm px-8 pt-10 pb-7 relative overflow-hidden">
          {/* Glow ring */}
            <div className="absolute inset-0 rounded-2xl border border-cyber-light/10 pointer-events-none" />
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-cyber-accent/0 via-cyber-accent/0 to-cyber-accent/0 [mask:linear-gradient(#fff,transparent_65%)]" />

          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-xl bg-cyber-dark/60 border border-cyber-light/20 shadow-cyber-sm flex items-center justify-center overflow-hidden">
              <img src="/PraveaLogo.png" alt="Logo" className="w-14 h-14 object-contain select-none" draggable="false" />
            </div>
          </div>

          {/* Headings */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-cyber-accent to-cyber-glow bg-clip-text text-transparent">Sign in</h1>
            <p className="mt-1 text-sm text-cyber-light/70">Enter your credentials to continue</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            <div className="space-y-1.5">
              <label htmlFor="username" className="text-xs font-medium uppercase tracking-wide text-cyber-light/80">Username</label>
              <div className="relative group">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={credentials.username}
                  onChange={handleInputChange}
                  className="w-full bg-cyber-dark/70 border border-cyber-light/20 focus:border-cyber-accent/60 focus:ring-2 focus:ring-cyber-accent/30 text-gray-100 rounded-lg px-3 py-2 text-sm placeholder:text-cyber-light/40 outline-none transition-all"
                  placeholder="your.username"
                />
                <i className="fas fa-user text-cyber-light/40 absolute right-3 top-1/2 -translate-y-1/2 text-xs" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="text-xs font-medium uppercase tracking-wide text-cyber-light/80">Password</label>
              <div className="relative group">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={credentials.password}
                  onChange={handleInputChange}
                  className="w-full bg-cyber-dark/70 border border-cyber-light/20 focus:border-cyber-accent/60 focus:ring-2 focus:ring-cyber-accent/30 text-gray-100 rounded-lg px-3 py-2 text-sm placeholder:text-cyber-light/40 outline-none transition-all pr-9"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPassword(s => !s)} className="absolute right-2 top-1/2 -translate-y-1/2 text-cyber-light/50 hover:text-cyber-accent transition-colors text-xs">
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-start space-x-2 rounded-md border border-cyber-danger/40 bg-cyber-danger/10 px-3 py-2">
                <i className="fas fa-exclamation-triangle text-cyber-danger text-sm mt-0.5" />
                <span className="text-xs text-cyber-danger/90 leading-snug">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative overflow-hidden group rounded-lg bg-gradient-to-r from-cyber-accent to-cyber-glow focus:outline-none focus:ring-2 focus:ring-cyber-accent/40 text-white text-sm font-medium py-2.5 shadow-cyber-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                {isLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin text-xs" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <i className="fas fa-unlock text-xs" />
                    <span>Access Console</span>
                  </>
                )}
              </span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-cyber-glow/20 to-cyber-accent/30" />
            </button>
          </form>

          {/* Demo Accounts Dropdown */}
          <div className="mt-8">
            <div className="flex items-center mb-3">
              <div className="flex-1 h-px bg-cyber-light/10" />
              <span className="px-3 text-[10px] tracking-wider uppercase text-cyber-light/40">Demo Accounts</span>
              <div className="flex-1 h-px bg-cyber-light/10" />
            </div>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowDemoDropdown(!showDemoDropdown)}
                className="w-full flex items-center justify-between px-3 py-2.5 text-left rounded-lg border border-cyber-light/15 bg-cyber-dark/60 hover:border-cyber-accent/40 hover:bg-cyber-dark/80 transition-colors"
              >
                <div>
                  <div className="text-xs font-semibold text-gray-200">Select Demo Account</div>
                  <div className="text-[10px] text-cyber-light/50">Choose from available demo users</div>
                </div>
                <i className={`fas fa-chevron-down text-cyber-light/40 text-xs transition-transform ${showDemoDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {showDemoDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 z-50 rounded-lg border border-cyber-light/15 bg-cyber-dark/90 backdrop-blur-sm shadow-cyber-sm overflow-hidden">
                  {mockUsers.map((user, i) => (
                    <button
                      key={i}
                      onClick={() => handleDemoSelect(user)}
                      type="button"
                      className="group w-full text-left px-3 py-2.5 hover:bg-cyber-dark/80 transition-colors border-b border-cyber-light/10 last:border-b-0"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs font-semibold text-gray-200 group-hover:text-cyber-accent">{user.name}</div>
                          <div className="text-[10px] text-cyber-light/50 font-mono">{user.username} / {user.password}</div>
                        </div>
                        <i className="fas fa-arrow-right text-cyber-light/40 group-hover:text-cyber-accent text-xs" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Tiny Info */}
  <p className="mt-6 text-center text-[10px] tracking-wide text-cyber-light/40">© 2025 Pravea Console</p>
      </div>
    </div>
  );
};

export default LoginScreen;
