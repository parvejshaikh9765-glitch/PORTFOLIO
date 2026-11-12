import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { FileDown, Menu, X, Shield, Sun, Moon, LogOut, Lock } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentPath, navigate, theme, toggleTheme, data, token, adminUser, logout } = usePortfolio();
  const [menuOpen, setMenuOpen] = useState(false);

  const profile = data?.profile;

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Experience', path: '/experience' },
    { label: 'Projects', path: '/projects' },
    { label: 'Research', path: '/research' },
    { label: 'Skills', path: '/skills' },
    { label: 'Resume', path: '/resume' },
    { label: 'Contact', path: '/contact' }
  ];

  const handleNavClick = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 px-4 sm:px-6 lg:px-8 pt-2 bg-[#F5F4EE]/90 dark:bg-[#121417]/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto bg-white dark:bg-[#1A1D24] rounded-b-[28px] border-x border-b border-[#E5E4DD] dark:border-[#272A30] shadow-sm px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-20">
          
          {/* Zone 1: Wordmark Logo */}
          <div className="flex items-center shrink-0">
            <a
              href="/"
              onClick={(e) => handleNavClick('/', e)}
              className="group flex items-center gap-2.5 font-serif text-2xl font-bold tracking-tight text-[#1C1917] dark:text-[#F3F4F6] hover:text-[#2D4A3E] dark:hover:text-[#6E9E88] transition-colors whitespace-nowrap shrink-0 focus:outline-none"
            >
              <div className="w-8 h-8 rounded-lg bg-[#2D4A3E]/10 dark:bg-[#6E9E88]/15 border border-[#2D4A3E]/20 flex items-center justify-center text-[#2D4A3E] dark:text-[#6E9E88] font-serif font-bold text-base">
                P
              </div>
              <span>Pravesh Shaikh</span>
            </a>
          </div>

          {/* Zone 2: Navigation links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#44403C] dark:text-[#D1D5DB]">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
              return (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={(e) => handleNavClick(link.path, e)}
                  className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 text-[13px] ${
                    isActive
                      ? 'border-[#2D4A3E] text-[#2D4A3E] dark:border-[#6E9E88] dark:text-[#6E9E88] font-bold'
                      : 'border-transparent hover:text-[#1C1917] dark:hover:text-white hover:border-[#D6CEBE]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Actions + 3-line Hamburger Menu Button on Far Right */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Primary Action Button: Official CV */}
            <a
              href={profile?.cvUrl || '/assets/documents/Pravesh_Shaikh_CV.pdf'}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#C8102E] hover:bg-[#A80C24] dark:bg-[#2D4A3E] dark:hover:bg-[#233A31] rounded-full shadow-xs transition-all whitespace-nowrap shrink-0"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Official CV</span>
            </a>

            {/* 3-Line Menu Trigger Button (Right Side) */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2.5 rounded-xl border border-[#E5E4DD] dark:border-[#272A30] bg-[#F5F4EE] hover:bg-[#EBE6DF] dark:bg-[#232730] dark:hover:bg-[#2D323E] text-[#1C1917] dark:text-[#F3F4F6] transition-all flex items-center justify-center gap-2 focus:outline-none shadow-2xs"
              aria-label="Toggle navigation menu"
              title="Menu Options"
            >
              {menuOpen ? <X className="w-5 h-5 text-[#C8102E] dark:text-[#6E9E88]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3-Line Menu Panel (Right Side Dropdown Drawer) */}
      {menuOpen && (
        <div className="max-w-7xl mx-auto mt-2">
          <div className="bg-white dark:bg-[#1A1D24] rounded-2xl border border-[#E5E4DD] dark:border-[#272A30] shadow-xl p-6 space-y-6 transition-all animate-in fade-in slide-in-from-top-2">
            
            {/* Header of 3-line menu */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E5E4DD] dark:border-[#272A30]">
              <span className="text-xs font-bold uppercase tracking-widest text-[#78716C] dark:text-[#9CA3AF]">
                Portfolio Navigation & Controls
              </span>

              {/* Dark Mode Toggle inside 3-line menu */}
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-[#E5E4DD] dark:border-[#272A30] bg-[#F5F4EE] dark:bg-[#232730] text-xs font-semibold text-[#1C1917] dark:text-[#F3F4F6] hover:border-[#2D4A3E] dark:hover:border-[#6E9E88] transition-all"
              >
                {theme === 'light' ? (
                  <>
                    <Moon className="w-4 h-4 text-slate-700" />
                    <span>Dark Mode</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span>Light Mode</span>
                  </>
                )}
              </button>
            </div>

            {/* Admin Active Section inside 3-line menu */}
            <div className="p-4 rounded-xl bg-[#F5F4EE] dark:bg-[#232730] border border-[#E5E4DD] dark:border-[#272A30] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                  token ? 'bg-[#2D4A3E]/10 dark:bg-[#6E9E88]/15 text-[#2D4A3E] dark:text-[#6E9E88]' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                }`}>
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#1C1917] dark:text-[#F3F4F6] flex items-center gap-2">
                    <span>Admin Status</span>
                    {token ? (
                      <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 rounded-md">
                        Admin Active
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 rounded-md">
                        Visitor Mode
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[#78716C] dark:text-[#9CA3AF] mt-0.5">
                    {token ? `Logged in as ${adminUser?.name || 'Pravesh Shaikh'}` : 'Click to access administrative portfolio management'}
                  </div>
                </div>
              </div>

              {/* Action button inside Admin box */}
              {token ? (
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href="/admin"
                    onClick={(e) => handleNavClick('/admin', e)}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#2D4A3E] hover:bg-[#233A31] dark:bg-[#6E9E88] dark:hover:bg-[#5A8772] rounded-lg transition-all shadow-2xs flex items-center gap-1.5"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>Control Panel</span>
                  </a>
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="p-2 text-[#C8102E] hover:bg-[#C8102E]/10 rounded-lg transition-all"
                    title="Sign Out Admin"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <a
                  href="/admin"
                  onClick={(e) => handleNavClick('/admin', e)}
                  className="px-4 py-2 text-xs font-semibold text-[#1C1917] dark:text-[#F3F4F6] bg-white dark:bg-[#1A1D24] border border-[#E5E4DD] dark:border-[#272A30] hover:border-[#2D4A3E] dark:hover:border-[#6E9E88] rounded-lg transition-all shadow-2xs flex items-center gap-1.5 shrink-0"
                >
                  <Lock className="w-3.5 h-3.5 text-[#2D4A3E] dark:text-[#6E9E88]" />
                  <span>Admin Sign In</span>
                </a>
              )}
            </div>

            {/* Quick Links Grid */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#78716C] dark:text-[#9CA3AF] block mb-2">
                All Portfolio Sections
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {navLinks.map((link) => {
                  const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
                  return (
                    <a
                      key={link.path}
                      href={link.path}
                      onClick={(e) => handleNavClick(link.path, e)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                        isActive
                          ? 'bg-[#2D4A3E] text-white dark:bg-[#6E9E88] dark:text-[#121417]'
                          : 'bg-[#F5F4EE] text-[#1C1917] dark:bg-[#232730] dark:text-[#F3F4F6] hover:bg-[#EBE6DF] dark:hover:bg-[#2D323E]'
                      }`}
                    >
                      <span>{link.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Mobile CV Download button */}
            <div className="pt-2 sm:hidden border-t border-[#E5E4DD] dark:border-[#272A30]">
              <a
                href={profile?.cvUrl || '/assets/documents/Pravesh_Shaikh_CV.pdf'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#C8102E] rounded-xl shadow-sm"
              >
                <FileDown className="w-4 h-4" />
                <span>Download Official CV (PDF)</span>
              </a>
            </div>

          </div>
        </div>
      )}
    </header>
  );
};

