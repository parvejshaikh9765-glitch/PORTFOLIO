import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Lock, Download, Upload, CheckCircle2, AlertCircle, Shield, Globe } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { token, data, reloadPublicData } = usePortfolio();
  
  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState(data?.profile.email || '');
  const [pwdStatus, setPwdStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [pwdMsg, setPwdMsg] = useState('');

  // SEO state
  const [seo, setSeo] = useState(data?.seo || {
    siteTitle: 'Pravesh Shaikh — Portfolio',
    metaDescription: '',
    keywords: '',
    ogImage: '',
    canonicalUrl: ''
  });
  const [seoStatus, setSeoStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdStatus('idle');
    setPwdMsg('');

    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword, newPassword, newEmail })
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to update credentials');

      setPwdStatus('success');
      setPwdMsg('Administrator credentials updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
    } catch (err: any) {
      setPwdStatus('error');
      setPwdMsg(err.message || 'Error updating password');
    }
  };

  const handleSeoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSeoStatus('idle');

    try {
      const res = await fetch('/api/admin/seo', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(seo)
      });

      if (res.ok) {
        await reloadPublicData();
        setSeoStatus('success');
        setTimeout(() => setSeoStatus('idle'), 4000);
      }
    } catch (e) {
      console.error(e);
      setSeoStatus('error');
    }
  };

  const handleExportBackup = () => {
    window.open('/api/admin/backup/export', '_blank');
  };

  const handleRestoreBackup = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const jsonContent = JSON.parse(event.target?.result as string);
        const res = await fetch('/api/admin/backup/restore', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(jsonContent)
        });

        if (res.ok) {
          alert('Database restored successfully from backup!');
          await reloadPublicData();
        } else {
          alert('Failed to restore database backup');
        }
      } catch (err) {
        alert('Invalid JSON file format');
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-serif text-3xl font-semibold text-[#1C1917] dark:text-[#F3F4F6]">
          System Settings, Security & Data Ownership
        </h1>
        <p className="text-xs text-[#78716C] dark:text-[#9CA3AF] mt-1">
          Manage administrator credentials, SEO metadata tags, and execute database backup export/restoration procedures.
        </p>
      </div>

      {/* Security Credentials Card */}
      <form onSubmit={handlePasswordSubmit} className="p-8 rounded-xl bg-white dark:bg-[#1A1D24] border border-[#EBE6DF] dark:border-[#272A30] space-y-6 shadow-xs">
        <h2 className="font-serif text-xl font-semibold text-[#1C1917] dark:text-[#F3F4F6] flex items-center gap-2">
          <Shield className="w-5 h-5 text-[#2D4A3E] dark:text-[#6E9E88]" />
          Administrator Credentials & Password
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div>
            <label className="block font-semibold uppercase text-[#78716C] mb-1">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              required
              className="w-full p-2 bg-[#FAF8F5] dark:bg-[#232730] border rounded-md"
            />
          </div>

          <div>
            <label className="block font-semibold uppercase text-[#78716C] mb-1">New Admin Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
              minLength={6}
              className="w-full p-2 bg-[#FAF8F5] dark:bg-[#232730] border rounded-md"
            />
          </div>

          <div>
            <label className="block font-semibold uppercase text-[#78716C] mb-1">Admin Email Address</label>
            <input
              type="email"
              value={newEmail}
              onChange={e => setNewEmail(e.target.value)}
              required
              className="w-full p-2 bg-[#FAF8F5] dark:bg-[#232730] border rounded-md"
            />
          </div>
        </div>

        {pwdStatus === 'success' && (
          <div className="p-3 rounded-md bg-emerald-50 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{pwdMsg}</span>
          </div>
        )}

        {pwdStatus === 'error' && (
          <div className="p-3 rounded-md bg-red-50 text-red-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{pwdMsg}</span>
          </div>
        )}

        <div className="pt-2 border-t flex justify-end">
          <button type="submit" className="px-6 py-2 text-xs font-semibold text-white bg-[#2D4A3E] rounded-md">
            Update Administrator Credentials
          </button>
        </div>
      </form>

      {/* SEO Metadata Card */}
      <form onSubmit={handleSeoSubmit} className="p-8 rounded-xl bg-white dark:bg-[#1A1D24] border border-[#EBE6DF] dark:border-[#272A30] space-y-6 shadow-xs">
        <h2 className="font-serif text-xl font-semibold text-[#1C1917] dark:text-[#F3F4F6] flex items-center gap-2">
          <Globe className="w-5 h-5 text-[#2D4A3E] dark:text-[#6E9E88]" />
          Search Engine Optimization (SEO) & OpenGraph Metadata
        </h2>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold uppercase text-[#78716C] mb-1">Site Title Tag</label>
            <input
              type="text"
              value={seo.siteTitle}
              onChange={e => setSeo({ ...seo, siteTitle: e.target.value })}
              className="w-full p-2 bg-[#FAF8F5] dark:bg-[#232730] border rounded-md"
            />
          </div>

          <div>
            <label className="block font-semibold uppercase text-[#78716C] mb-1">Meta Description</label>
            <textarea
              rows={3}
              value={seo.metaDescription}
              onChange={e => setSeo({ ...seo, metaDescription: e.target.value })}
              className="w-full p-2 bg-[#FAF8F5] dark:bg-[#232730] border rounded-md"
            />
          </div>
        </div>

        {seoStatus === 'success' && (
          <div className="p-3 rounded-md bg-emerald-50 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>SEO metadata updated successfully!</span>
          </div>
        )}

        <div className="pt-2 border-t flex justify-end">
          <button type="submit" className="px-6 py-2 text-xs font-semibold text-white bg-[#2D4A3E] rounded-md">
            Save SEO Metadata
          </button>
        </div>
      </form>

      {/* Database Backup & Ownership Card */}
      <div className="p-8 rounded-xl bg-white dark:bg-[#1A1D24] border border-[#EBE6DF] dark:border-[#272A30] space-y-6 shadow-xs">
        <h2 className="font-serif text-xl font-semibold text-[#1C1917] dark:text-[#F3F4F6] flex items-center gap-2">
          <Download className="w-5 h-5 text-[#2D4A3E] dark:text-[#6E9E88]" />
          Database Backup & Full Ownership Export
        </h2>

        <p className="text-xs text-[#57534E] dark:text-[#A1A1AA] leading-relaxed">
          Download a complete snapshot of all portfolio content, project case studies, publication records, and experience entries as a portable JSON database backup. You can restore this file anytime.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            onClick={handleExportBackup}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#2D4A3E] hover:bg-[#233A31] rounded-md"
          >
            <Download className="w-4 h-4" />
            <span>Export Database Backup (.json)</span>
          </button>

          <label className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#1C1917] dark:text-[#F3F4F6] bg-[#FAF8F5] dark:bg-[#232730] border rounded-md">
            <Upload className="w-4 h-4 text-[#78716C]" />
            <span>Restore Backup JSON</span>
            <input type="file" accept=".json" onChange={handleRestoreBackup} className="hidden" />
          </label>
        </div>
      </div>

    </div>
  );
};
