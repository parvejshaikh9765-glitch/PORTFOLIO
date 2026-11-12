import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Shield, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { login } = usePortfolio();
  const [email, setEmail] = useState('parvejshaikh9765@gmail.com');
  const [password, setPassword] = useState('admin123#password');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Authentication failed');

      login(json.token, json.user);
    } catch (err: any) {
      setError(err.message || 'Invalid administrator login credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#121417] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-[#1A1D24] p-8 rounded-2xl border border-[#EBE6DF] dark:border-[#272A30] shadow-xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-3 rounded-xl bg-[#2D4A3E]/10 dark:bg-[#6E9E88]/15 text-[#2D4A3E] dark:text-[#6E9E88]">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="font-serif text-2xl font-semibold text-[#1C1917] dark:text-[#F3F4F6]">
            Pravesh Shaikh Portfolio CMS
          </h1>
          <p className="text-xs text-[#78716C] dark:text-[#9CA3AF]">
            Secure Administrator Portal
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] dark:text-[#D1D5DB] mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 w-4 h-4 text-[#78716C] dark:text-[#9CA3AF]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-9 pr-4 py-2 text-sm bg-[#FAF8F5] dark:bg-[#232730] border border-[#EBE6DF] dark:border-[#2A2E38] rounded-md text-[#1C1917] dark:text-[#F3F4F6] focus:outline-none focus:border-[#2D4A3E]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] dark:text-[#D1D5DB] mb-1.5">
              Admin Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 w-4 h-4 text-[#78716C] dark:text-[#9CA3AF]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-9 pr-4 py-2 text-sm bg-[#FAF8F5] dark:bg-[#232730] border border-[#EBE6DF] dark:border-[#2A2E38] rounded-md text-[#1C1917] dark:text-[#F3F4F6] focus:outline-none focus:border-[#2D4A3E]"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-md bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-xs text-red-700 dark:text-red-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#2D4A3E] hover:bg-[#233A31] rounded-md shadow-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="p-3 rounded-md bg-[#FAF8F5] dark:bg-[#232730] text-[11px] text-[#78716C] dark:text-[#9CA3AF] text-center border border-[#EBE6DF] dark:border-[#272A30]">
          Default Credentials Pre-configured for Pravesh Shaikh:<br/>
          <span className="font-mono text-[#1C1917] dark:text-[#F3F4F6]">parvejshaikh9765@gmail.com</span> | <span className="font-mono text-[#1C1917] dark:text-[#F3F4F6]">admin123#password</span>
        </div>

      </div>
    </div>
  );
};
