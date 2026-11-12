import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Download, Upload, Shield, CheckCircle2, AlertCircle, RefreshCw, Database } from 'lucide-react';

export const AdminBackupManager: React.FC = () => {
  const { token, reloadPublicData } = usePortfolio();
  const [restoring, setRestoring] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleExport = () => {
    window.location.href = `/api/admin/backup/export`;
  };

  const handleRestoreFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setRestoring(true);
    setMessage(null);

    try {
      const text = await file.text();
      const json = JSON.parse(text);

      const res = await fetch('/api/admin/backup/restore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(json)
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed to restore backup');

      setMessage({ type: 'success', text: 'Database restored successfully! Reloading portfolio data...' });
      await reloadPublicData();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Invalid backup file or restore failed' });
    } finally {
      setRestoring(false);
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#E5E4DD] dark:border-[#272A30]">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#1C1917] dark:text-[#F3F4F6]">
            Database Backup & Migration
          </h2>
          <p className="text-xs text-[#78716C] dark:text-[#9CA3AF] mt-1">
            Export a full JSON snapshot of Pravesh Shaikh's portfolio data or restore from a previous backup file.
          </p>
        </div>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl border text-xs flex items-center gap-2 ${
            message.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900'
              : 'bg-red-50 text-red-800 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-900'
          }`}
        >
          {message.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
          <span>{message.text}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Export Backup Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1D24] border border-[#E5E4DD] dark:border-[#272A30] space-y-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-[#2D4A3E]/10 dark:bg-[#6E9E88]/15 text-[#2D4A3E] dark:text-[#6E9E88]">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#1C1917] dark:text-[#F3F4F6]">
                Export Portfolio Backup
              </h3>
              <p className="text-xs text-[#78716C] dark:text-[#9CA3AF]">
                Download a complete JSON file containing all projects, publications, experience entries, and settings.
              </p>
            </div>
          </div>

          <button
            onClick={handleExport}
            className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#2D4A3E] hover:bg-[#233A31] rounded-xl shadow-2xs transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download Full Backup (JSON)</span>
          </button>
        </div>

        {/* Restore Backup Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1D24] border border-[#E5E4DD] dark:border-[#272A30] space-y-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-[#C8102E]/10 dark:bg-[#6E9E88]/15 text-[#C8102E] dark:text-[#6E9E88]">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#1C1917] dark:text-[#F3F4F6]">
                Restore Database Backup
              </h3>
              <p className="text-xs text-[#78716C] dark:text-[#9CA3AF]">
                Upload a JSON backup file to overwrite current database records.
              </p>
            </div>
          </div>

          <label className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-[#1C1917] dark:text-[#F3F4F6] bg-[#F5F4EE] dark:bg-[#232730] border border-[#E5E4DD] dark:border-[#272A30] hover:bg-[#EBEADF] rounded-xl shadow-2xs transition-all cursor-pointer">
            {restoring ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            <span>{restoring ? 'Restoring Data...' : 'Upload & Restore Backup JSON'}</span>
            <input
              type="file"
              accept=".json"
              onChange={handleRestoreFile}
              disabled={restoring}
              className="hidden"
            />
          </label>
        </div>

      </div>
    </div>
  );
};
