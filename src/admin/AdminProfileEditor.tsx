import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Save, CheckCircle2, AlertCircle, Upload, FileDown, Shield, FileText } from 'lucide-react';

export const AdminProfileEditor: React.FC = () => {
  const { data, token, reloadPublicData } = usePortfolio();
  const [profile, setProfile] = useState(data?.profile || {
    name: 'Pravesh Shaikh',
    headline: '',
    shortBio: '',
    fullBio: '',
    academicBackground: '',
    location: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    academicAffiliation: '',
    cvUrl: '',
    portraitUrl: '',
    heroBackgroundUrl: ''
  });

  const [saving, setSaving] = useState(false);
  const [cvUploading, setCvUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleCvFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setCvUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('cvFile', e.target.files[0]);

    try {
      const res = await fetch('/api/admin/upload-cv', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to upload CV');

      setProfile(prev => ({ ...prev, cvUrl: json.cvUrl }));
      await reloadPublicData();
      alert('CV uploaded and linked throughout the website successfully!');
    } catch (err: any) {
      setError(err.message || 'Error uploading CV file');
    } finally {
      setCvUploading(false);
      e.target.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setError('');

    try {
      const res = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(profile)
      });

      if (!res.ok) throw new Error('Failed to update profile');

      await reloadPublicData();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err: any) {
      setError(err.message || 'Error updating profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-semibold text-[#1C1917] dark:text-[#F3F4F6]">
          Profile, Biography & CV Integration
        </h1>
        <p className="text-xs text-[#78716C] dark:text-[#9CA3AF] mt-1">
          Superadmin control over personal bio, headline, phone number, contact details, and downloadable resume file.
        </p>
      </div>

      {/* CV Document Integration Card */}
      <div className="p-6 rounded-xl bg-white dark:bg-[#1A1D24] border border-[#EBE6DF] dark:border-[#272A30] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EBE6DF] dark:border-[#272A30]">
          <div>
            <h2 className="font-serif text-lg font-semibold text-[#1C1917] dark:text-[#F3F4F6] flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#2D4A3E] dark:text-[#6E9E88]" />
              Official Resume / CV Integration
            </h2>
            <p className="text-xs text-[#57534E] dark:text-[#A1A1AA] mt-0.5">
              Current active CV: <span className="font-mono text-[#2D4A3E] dark:text-[#6E9E88] font-semibold">{profile.cvUrl || '/assets/documents/Pravesh_Shaikh_CV.pdf'}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={profile.cvUrl || '/assets/documents/Pravesh_Shaikh_CV.pdf'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border border-[#EBE6DF] dark:border-[#272A30] hover:bg-[#FAF8F5] dark:hover:bg-[#232730]"
            >
              <FileDown className="w-3.5 h-3.5 text-[#2D4A3E] dark:text-[#6E9E88]" />
              <span>Preview Live CV</span>
            </a>

            <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase text-white bg-[#2D4A3E] hover:bg-[#233A31] rounded-md transition-colors shadow-xs">
              <Upload className="w-3.5 h-3.5" />
              <span>{cvUploading ? 'Uploading...' : 'Replace & Upload New CV'}</span>
              <input type="file" accept=".pdf,.doc,.docx" onChange={handleCvFileUpload} className="hidden" disabled={cvUploading} />
            </label>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8 rounded-xl bg-white dark:bg-[#1A1D24] border border-[#EBE6DF] dark:border-[#272A30] space-y-6 shadow-xs">
        
        {/* Full Name & Affiliation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] dark:text-[#D1D5DB] mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 text-sm bg-[#FAF8F5] dark:bg-[#232730] border border-[#EBE6DF] dark:border-[#2A2E38] rounded-md text-[#1C1917] dark:text-[#F3F4F6]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] dark:text-[#D1D5DB] mb-1.5">
              Academic Affiliation
            </label>
            <input
              type="text"
              name="academicAffiliation"
              value={profile.academicAffiliation}
              onChange={handleChange}
              className="w-full px-4 py-2 text-sm bg-[#FAF8F5] dark:bg-[#232730] border border-[#EBE6DF] dark:border-[#2A2E38] rounded-md text-[#1C1917] dark:text-[#F3F4F6]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] dark:text-[#D1D5DB] mb-1.5">
            Hero Headline
          </label>
          <input
            type="text"
            name="headline"
            value={profile.headline}
            onChange={handleChange}
            className="w-full px-4 py-2 text-sm bg-[#FAF8F5] dark:bg-[#232730] border border-[#EBE6DF] dark:border-[#2A2E38] rounded-md text-[#1C1917] dark:text-[#F3F4F6]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] dark:text-[#D1D5DB] mb-1.5">
            Short Introductory Summary
          </label>
          <textarea
            name="shortBio"
            rows={3}
            value={profile.shortBio}
            onChange={handleChange}
            className="w-full px-4 py-2 text-sm bg-[#FAF8F5] dark:bg-[#232730] border border-[#EBE6DF] dark:border-[#2A2E38] rounded-md text-[#1C1917] dark:text-[#F3F4F6]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] dark:text-[#D1D5DB] mb-1.5">
            Full Detailed Biography (About Page)
          </label>
          <textarea
            name="fullBio"
            rows={6}
            value={profile.fullBio}
            onChange={handleChange}
            className="w-full px-4 py-2 text-sm bg-[#FAF8F5] dark:bg-[#232730] border border-[#EBE6DF] dark:border-[#2A2E38] rounded-md text-[#1C1917] dark:text-[#F3F4F6]"
          />
        </div>

        {/* Contact Info from CV */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4 border-t border-[#EBE6DF] dark:border-[#272A30]">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] dark:text-[#D1D5DB] mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full px-4 py-2 text-sm bg-[#FAF8F5] dark:bg-[#232730] border border-[#EBE6DF] dark:border-[#2A2E38] rounded-md text-[#1C1917] dark:text-[#F3F4F6]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] dark:text-[#D1D5DB] mb-1.5">
              Phone Number (from CV)
            </label>
            <input
              type="text"
              name="phone"
              value={profile.phone || ''}
              onChange={handleChange}
              placeholder="7972246347"
              className="w-full px-4 py-2 text-sm bg-[#FAF8F5] dark:bg-[#232730] border border-[#EBE6DF] dark:border-[#2A2E38] rounded-md text-[#1C1917] dark:text-[#F3F4F6]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] dark:text-[#D1D5DB] mb-1.5">
              LinkedIn URL
            </label>
            <input
              type="text"
              name="linkedin"
              value={profile.linkedin}
              onChange={handleChange}
              className="w-full px-4 py-2 text-sm bg-[#FAF8F5] dark:bg-[#232730] border border-[#EBE6DF] dark:border-[#2A2E38] rounded-md text-[#1C1917] dark:text-[#F3F4F6]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] dark:text-[#D1D5DB] mb-1.5">
              GitHub URL
            </label>
            <input
              type="text"
              name="github"
              value={profile.github || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 text-sm bg-[#FAF8F5] dark:bg-[#232730] border border-[#EBE6DF] dark:border-[#2A2E38] rounded-md text-[#1C1917] dark:text-[#F3F4F6]"
            />
          </div>
        </div>

        {/* Media URLs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#EBE6DF] dark:border-[#272A30]">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] dark:text-[#D1D5DB] mb-1.5">
              Portrait Image Path / URL
            </label>
            <input
              type="text"
              name="portraitUrl"
              value={profile.portraitUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 text-sm bg-[#FAF8F5] dark:bg-[#232730] border border-[#EBE6DF] dark:border-[#2A2E38] rounded-md text-[#1C1917] dark:text-[#F3F4F6]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] dark:text-[#D1D5DB] mb-1.5">
              Downloadable CV Document URL
            </label>
            <input
              type="text"
              name="cvUrl"
              value={profile.cvUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 text-sm bg-[#FAF8F5] dark:bg-[#232730] border border-[#EBE6DF] dark:border-[#2A2E38] rounded-md text-[#1C1917] dark:text-[#F3F4F6]"
            />
          </div>
        </div>

        {success && (
          <div className="p-4 rounded-md bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 text-xs text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Profile and biography updated successfully! Changes reflected immediately across the site.</span>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-md bg-red-50 dark:bg-red-950/30 border border-red-200 text-xs text-red-700 dark:text-red-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="pt-4 border-t border-[#EBE6DF] dark:border-[#272A30] flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#2D4A3E] hover:bg-[#233A31] rounded-md shadow-xs transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Profile Changes'}</span>
          </button>
        </div>

      </form>
    </div>
  );
};
