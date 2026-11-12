import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Mail, Trash2, CheckCircle2, Building, Calendar, Reply, Shield } from 'lucide-react';
import { ContactSubmission } from '../types';

export const AdminContactsManager: React.FC = () => {
  const { token } = usePortfolio();
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    try {
      const res = await fetch('/api/admin/contacts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setContacts(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [token]);

  const handleUpdateStatus = async (id: string, status: 'unread' | 'read' | 'replied') => {
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setContacts(contacts.map(c => c.id === id ? { ...c, status } : c));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this contact message permanently?')) return;
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setContacts(contacts.filter(c => c.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-xs text-[#78716C]">Loading contact submissions...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#E5E4DD] dark:border-[#272A30]">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#1C1917] dark:text-[#F3F4F6]">
            Recruiter & Inquiry Messages Inbox
          </h2>
          <p className="text-xs text-[#78716C] dark:text-[#9CA3AF] mt-1">
            Manage inquiries submitted by recruiters, researchers, and institutional partners.
          </p>
        </div>
        <span className="text-xs font-semibold text-[#2D4A3E] dark:text-[#6E9E88] bg-[#2D4A3E]/10 dark:bg-[#6E9E88]/15 px-3 py-1 rounded-full">
          Total: {contacts.length} Messages
        </span>
      </div>

      <div className="space-y-4">
        {contacts.map((c) => (
          <div
            key={c.id}
            className={`p-6 rounded-2xl border space-y-4 shadow-xs transition-all ${
              c.status === 'unread'
                ? 'bg-white dark:bg-[#1A1D24] border-[#C8102E]/40 dark:border-[#6E9E88]/40'
                : 'bg-[#F5F4EE] dark:bg-[#232730] border-[#E5E4DD] dark:border-[#272A30]'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2D4A3E] text-white flex items-center justify-center font-bold text-sm">
                  {c.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-serif text-base font-bold text-[#1C1917] dark:text-[#F3F4F6]">
                    {c.name}
                  </div>
                  <div className="text-xs text-[#78716C] dark:text-[#9CA3AF] flex items-center gap-2">
                    <a href={`mailto:${c.email}`} className="hover:underline font-medium text-[#2D4A3E] dark:text-[#6E9E88]">
                      {c.email}
                    </a>
                    {c.organisation && <span>· {c.organisation}</span>}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={c.status}
                  onChange={(e) => handleUpdateStatus(c.id, e.target.value as any)}
                  className="px-2.5 py-1 text-xs font-semibold bg-white dark:bg-[#1A1D24] border border-[#E5E4DD] dark:border-[#272A30] rounded-md text-[#1C1917] dark:text-[#F3F4F6]"
                >
                  <option value="unread">Unread</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                </select>

                <a
                  href={`mailto:${c.email}?subject=Re: ${encodeURIComponent(c.subject)}`}
                  className="p-1.5 rounded-md text-[#2D4A3E] hover:bg-emerald-50 dark:text-[#6E9E88]"
                  title="Reply via Email"
                >
                  <Reply className="w-4 h-4" />
                </a>

                <button
                  onClick={() => handleDelete(c.id)}
                  className="p-1.5 rounded-md text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                  title="Delete message"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E5E4DD] dark:border-[#272A30] space-y-2">
              <div className="text-xs font-bold text-[#1C1917] dark:text-[#F3F4F6]">
                Subject: {c.subject}
              </div>
              <p className="text-xs text-[#57534E] dark:text-[#D1D5DB] leading-relaxed whitespace-pre-wrap">
                {c.message}
              </p>
              <div className="text-[10px] text-[#78716C] dark:text-[#9CA3AF] pt-1">
                Received: {new Date(c.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        ))}

        {contacts.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-[#1A1D24] rounded-2xl border border-[#E5E4DD] dark:border-[#272A30]">
            <p className="text-xs text-[#78716C] dark:text-[#9CA3AF]">
              No contact inquiries recorded yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
