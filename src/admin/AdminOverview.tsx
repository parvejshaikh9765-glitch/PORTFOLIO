import React, { useEffect, useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { FolderGit2, BookOpen, Briefcase, Image, Mail, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface StatsData {
  totalProjects: number;
  publishedProjects: number;
  draftProjects: number;
  totalPublications: number;
  totalExperience: number;
  totalMedia: number;
  unreadMessages: number;
}

export const AdminOverview: React.FC<{ onTabChange: (tab: string) => void }> = ({ onTabChange }) => {
  const { token } = usePortfolio();
  const [stats, setStats] = useState<StatsData | null>(null);
  const [recentSubmissions, setRecentSubmissions] = useState<any[]>([]);

  useEffect(() => {
    if (token) {
      fetch('/api/admin/overview', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          setStats(data.stats);
          setRecentSubmissions(data.recentSubmissions || []);
        })
        .catch(console.error);
    }
  }, [token]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-semibold text-[#1C1917] dark:text-[#F3F4F6]">
          Admin Dashboard Overview
        </h1>
        <p className="text-xs text-[#78716C] dark:text-[#9CA3AF] mt-1">
          Real-time metrics and system management for Pravesh Shaikh's Personal Portfolio
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          onClick={() => onTabChange('projects')}
          className="cursor-pointer p-6 rounded-xl bg-white dark:bg-[#1A1D24] border border-[#EBE6DF] dark:border-[#272A30] hover:border-[#2D4A3E]/40 transition-all shadow-xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#78716C] dark:text-[#9CA3AF]">
              Projects
            </span>
            <div className="p-2 rounded-lg bg-[#2D4A3E]/10 dark:bg-[#6E9E88]/15 text-[#2D4A3E] dark:text-[#6E9E88]">
              <FolderGit2 className="w-5 h-5" />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-[#1C1917] dark:text-[#F3F4F6] mt-3">
            {stats?.totalProjects || 0}
          </div>
          <div className="text-[11px] text-[#78716C] dark:text-[#9CA3AF] mt-1">
            {stats?.publishedProjects || 0} Published · {stats?.draftProjects || 0} Drafts
          </div>
        </div>

        <div
          onClick={() => onTabChange('research')}
          className="cursor-pointer p-6 rounded-xl bg-white dark:bg-[#1A1D24] border border-[#EBE6DF] dark:border-[#272A30] hover:border-[#2D4A3E]/40 transition-all shadow-xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#78716C] dark:text-[#9CA3AF]">
              Publications
            </span>
            <div className="p-2 rounded-lg bg-[#2D4A3E]/10 dark:bg-[#6E9E88]/15 text-[#2D4A3E] dark:text-[#6E9E88]">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-[#1C1917] dark:text-[#F3F4F6] mt-3">
            {stats?.totalPublications || 0}
          </div>
          <div className="text-[11px] text-[#78716C] dark:text-[#9CA3AF] mt-1">
            Policy briefs & research papers
          </div>
        </div>

        <div
          onClick={() => onTabChange('media')}
          className="cursor-pointer p-6 rounded-xl bg-white dark:bg-[#1A1D24] border border-[#EBE6DF] dark:border-[#272A30] hover:border-[#2D4A3E]/40 transition-all shadow-xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#78716C] dark:text-[#9CA3AF]">
              Media Files
            </span>
            <div className="p-2 rounded-lg bg-[#2D4A3E]/10 dark:bg-[#6E9E88]/15 text-[#2D4A3E] dark:text-[#6E9E88]">
              <Image className="w-5 h-5" />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-[#1C1917] dark:text-[#F3F4F6] mt-3">
            {stats?.totalMedia || 0}
          </div>
          <div className="text-[11px] text-[#78716C] dark:text-[#9CA3AF] mt-1">
            Uploaded images & PDF reports
          </div>
        </div>

        <div
          onClick={() => onTabChange('contacts')}
          className="cursor-pointer p-6 rounded-xl bg-white dark:bg-[#1A1D24] border border-[#EBE6DF] dark:border-[#272A30] hover:border-[#2D4A3E]/40 transition-all shadow-xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#78716C] dark:text-[#9CA3AF]">
              Messages Inbox
            </span>
            <div className="p-2 rounded-lg bg-[#2D4A3E]/10 dark:bg-[#6E9E88]/15 text-[#2D4A3E] dark:text-[#6E9E88]">
              <Mail className="w-5 h-5" />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-[#1C1917] dark:text-[#F3F4F6] mt-3">
            {stats?.unreadMessages || 0}
          </div>
          <div className="text-[11px] text-[#78716C] dark:text-[#9CA3AF] mt-1">
            Unread contact inquiries
          </div>
        </div>
      </div>

      {/* Recent Contact Submissions Inbox Preview */}
      <div className="p-6 rounded-xl bg-white dark:bg-[#1A1D24] border border-[#EBE6DF] dark:border-[#272A30] space-y-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#EBE6DF] dark:border-[#272A30]">
          <h3 className="font-serif text-lg font-semibold text-[#1C1917] dark:text-[#F3F4F6]">
            Recent Contact Form Inquiries
          </h3>
          <button
            onClick={() => onTabChange('contacts')}
            className="text-xs font-semibold text-[#2D4A3E] dark:text-[#6E9E88] hover:underline inline-flex items-center gap-1"
          >
            <span>View All Inbox</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {recentSubmissions.length > 0 ? (
          <div className="space-y-3">
            {recentSubmissions.map((sub: any) => (
              <div
                key={sub.id}
                className="p-4 rounded-lg bg-[#FAF8F5] dark:bg-[#232730] border border-[#EBE6DF] dark:border-[#272A30] flex items-start justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#1C1917] dark:text-[#F3F4F6]">
                    <span>{sub.name}</span>
                    {sub.organisation && <span className="text-[#78716C] dark:text-[#9CA3AF]">({sub.organisation})</span>}
                    <span className="text-[10px] text-[#78716C] font-normal">· {sub.email}</span>
                  </div>
                  <div className="text-xs font-medium text-[#2D4A3E] dark:text-[#6E9E88] mt-1">
                    Subject: {sub.subject}
                  </div>
                  <p className="text-xs text-[#57534E] dark:text-[#A1A1AA] mt-1 line-clamp-2">
                    {sub.message}
                  </p>
                </div>

                <span className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded-md shrink-0 ${
                  sub.status === 'unread' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300' : 'bg-stone-100 text-stone-600'
                }`}>
                  {sub.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-[#78716C] dark:text-[#9CA3AF]">No messages in inbox.</p>
        )}
      </div>

    </div>
  );
};
