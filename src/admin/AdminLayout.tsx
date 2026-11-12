import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { AdminLogin } from './AdminLogin';
import { AdminOverview } from './AdminOverview';
import { AdminProfileEditor } from './AdminProfileEditor';
import { AdminProjectsManager } from './AdminProjectsManager';
import { AdminResearchManager } from './AdminResearchManager';
import { AdminExperienceManager } from './AdminExperienceManager';
import { AdminLeadershipCertManager } from './AdminLeadershipCertManager';
import { AdminPagesManager } from './AdminPagesManager';
import { AdminMediaLibrary } from './AdminMediaLibrary';
import { AdminContactInbox } from './AdminContactInbox';
import { AdminSettings } from './AdminSettings';
import { LayoutDashboard, User, FolderGit2, BookOpen, Briefcase, Award, FileText, Image as ImageIcon, Mail, Settings, LogOut, ExternalLink, Shield, Layers } from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { token, adminUser, logout, navigate } = usePortfolio();
  const [activeTab, setActiveTab] = useState<'overview' | 'profile' | 'projects' | 'research' | 'experience' | 'leadership' | 'pages' | 'media' | 'contacts' | 'settings'>('overview');

  if (!token || !adminUser) {
    return <AdminLogin />;
  }

  const sidebarLinks = [
    { id: 'overview', label: 'Dashboard Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'profile', label: 'Profile & CV Integration', icon: <User className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects & Case Studies', icon: <FolderGit2 className="w-4 h-4" /> },
    { id: 'research', label: 'Research & Dissertation', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'experience', label: 'Experience Timeline', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'leadership', label: 'Leadership & Certifications', icon: <Award className="w-4 h-4" /> },
    { id: 'pages', label: 'Custom Pages & Builder', icon: <Layers className="w-4 h-4" /> },
    { id: 'media', label: 'Media Library & Storage', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'contacts', label: 'Contact Messages Inbox', icon: <Mail className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings & Database Backup', icon: <Settings className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#121417] flex flex-col md:flex-row">
      
      {/* Sidebar */}
      <aside className="w-full md:w-68 bg-white dark:bg-[#1A1D24] border-r border-[#EBE6DF] dark:border-[#272A30] flex flex-col justify-between shrink-0 shadow-xs">
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-[#EBE6DF] dark:border-[#272A30] space-y-3">
            <button
              onClick={() => navigate('/')}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold uppercase tracking-wider text-white bg-[#2D4A3E] hover:bg-[#233A31] dark:bg-[#6E9E88] dark:hover:bg-[#5A8772] dark:text-[#121417] rounded-lg transition-colors shadow-2xs cursor-pointer"
            >
              <span>← Back to Main Page</span>
            </button>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#2D4A3E] dark:text-[#6E9E88]" />
                <span className="font-serif text-lg font-bold text-[#1C1917] dark:text-[#F3F4F6]">
                  Pravesh Admin
                </span>
              </div>
              <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300 px-2 py-0.5 rounded-md">
                Superadmin
              </span>
            </div>
            <p className="text-[11px] text-[#78716C] dark:text-[#9CA3AF]">
              Full Unrestricted CRUD Access
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {sidebarLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id as any)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-[#2D4A3E] text-white shadow-xs font-semibold'
                      : 'text-[#57534E] dark:text-[#D1D5DB] hover:bg-[#FAF8F5] dark:hover:bg-[#232730] hover:text-[#1C1917]'
                  }`}
                >
                  {link.icon}
                  <span className="truncate">{link.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* User profile info & action */}
        <div className="p-4 border-t border-[#EBE6DF] dark:border-[#272A30] space-y-3">
          <div className="flex items-center justify-between text-xs text-[#78716C] dark:text-[#9CA3AF]">
            <span className="truncate max-w-[140px] font-medium">{adminUser.email}</span>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2D4A3E] dark:text-[#6E9E88] hover:underline flex items-center gap-1 text-[11px] font-semibold"
              title="View Public Live Portfolio"
            >
              Live Site <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 rounded-md transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content View */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        {activeTab === 'overview' && <AdminOverview onTabChange={(t) => setActiveTab(t as any)} />}
        {activeTab === 'profile' && <AdminProfileEditor />}
        {activeTab === 'projects' && <AdminProjectsManager />}
        {activeTab === 'research' && <AdminResearchManager />}
        {activeTab === 'experience' && <AdminExperienceManager />}
        {activeTab === 'leadership' && <AdminLeadershipCertManager />}
        {activeTab === 'pages' && <AdminPagesManager />}
        {activeTab === 'media' && <AdminMediaLibrary />}
        {activeTab === 'contacts' && <AdminContactInbox />}
        {activeTab === 'settings' && <AdminSettings />}
      </main>

    </div>
  );
};
