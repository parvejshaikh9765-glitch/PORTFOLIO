import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Mail, Linkedin, Send, CheckCircle2, AlertCircle, Building, MapPin } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { data } = usePortfolio();
  const profile = data?.profile;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organisation: '',
    subject: '',
    message: '',
    honeypot: '' // Anti-spam trap
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return; // Silent discard for bot spam

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields (Name, Email, Subject, and Message).');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/public/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to submit message');

      setStatus('success');
      setFormData({ name: '', email: '', organisation: '', subject: '', message: '', honeypot: '' });
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'An error occurred while sending your message. Please try again.');
    }
  };

  return (
    <section className="py-20 bg-white dark:bg-[#16181D] border-t border-[#EBE6DF] dark:border-[#272A30]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#78716C] dark:text-[#9CA3AF]">
            10 · Professional Inquiries & Collaborations
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1C1917] dark:text-[#F3F4F6] mt-2">
            Get in Touch
          </h2>
          <p className="text-sm text-[#78716C] dark:text-[#9CA3AF] mt-3 leading-relaxed">
            Available for research consultations, policy advisory engagements, development program evaluations, and academic collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-2xl bg-[#FAF8F5] dark:bg-[#1A1D24] border border-[#EBE6DF] dark:border-[#272A30] space-y-6">
              
              <h3 className="font-serif text-xl font-semibold text-[#1C1917] dark:text-[#F3F4F6]">
                Direct Contacts & Profiles
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-md bg-white dark:bg-[#232730] border border-[#EBE6DF] dark:border-[#2A2E38] text-[#2D4A3E] dark:text-[#6E9E88]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#78716C] dark:text-[#9CA3AF] block">
                      Email Address
                    </span>
                    <a href={`mailto:${profile?.email}`} className="text-[#1C1917] dark:text-[#F3F4F6] font-medium hover:underline">
                      {profile?.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-md bg-white dark:bg-[#232730] border border-[#EBE6DF] dark:border-[#2A2E38] text-[#2D4A3E] dark:text-[#6E9E88]">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#78716C] dark:text-[#9CA3AF] block">
                      Academic Affiliation
                    </span>
                    <span className="text-[#1C1917] dark:text-[#F3F4F6] font-medium">
                      {profile?.academicAffiliation}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-md bg-white dark:bg-[#232730] border border-[#EBE6DF] dark:border-[#2A2E38] text-[#2D4A3E] dark:text-[#6E9E88]">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#78716C] dark:text-[#9CA3AF] block">
                      LinkedIn Network
                    </span>
                    <a href={profile?.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#1C1917] dark:text-[#F3F4F6] font-medium hover:underline">
                      {profile?.linkedin ? profile.linkedin.replace(/^https?:\/\/(www\.)?/, '') : 'linkedin.com/in/pravesh-shaikh-b1386930a'}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#EBE6DF] dark:border-[#272A30] text-xs text-[#78716C] dark:text-[#9CA3AF]">
                Messages submitted through this portal are directly stored in Pravesh Shaikh's secure administrator inbox.
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-[#FAF8F5] dark:bg-[#1A1D24] border border-[#EBE6DF] dark:border-[#272A30] space-y-6">
              
              {/* Anti-spam hidden field */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] dark:text-[#D1D5DB] mb-2">
                    Your Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Dr. Ananya Roy"
                    required
                    className="w-full px-4 py-2.5 text-sm bg-white dark:bg-[#232730] border border-[#EBE6DF] dark:border-[#2A2E38] rounded-md text-[#1C1917] dark:text-[#F3F4F6] focus:outline-none focus:border-[#2D4A3E] dark:focus:border-[#6E9E88]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] dark:text-[#D1D5DB] mb-2">
                    Email Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g., ananya@institution.org"
                    required
                    className="w-full px-4 py-2.5 text-sm bg-white dark:bg-[#232730] border border-[#EBE6DF] dark:border-[#2A2E38] rounded-md text-[#1C1917] dark:text-[#F3F4F6] focus:outline-none focus:border-[#2D4A3E] dark:focus:border-[#6E9E88]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] dark:text-[#D1D5DB] mb-2">
                    Organisation / Institution (Optional)
                  </label>
                  <input
                    type="text"
                    name="organisation"
                    value={formData.organisation}
                    onChange={handleChange}
                    placeholder="e.g., Urban Policy Institute"
                    className="w-full px-4 py-2.5 text-sm bg-white dark:bg-[#232730] border border-[#EBE6DF] dark:border-[#2A2E38] rounded-md text-[#1C1917] dark:text-[#F3F4F6] focus:outline-none focus:border-[#2D4A3E] dark:focus:border-[#6E9E88]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] dark:text-[#D1D5DB] mb-2">
                    Subject <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g., Research Collaboration Inquiry"
                    required
                    className="w-full px-4 py-2.5 text-sm bg-white dark:bg-[#232730] border border-[#EBE6DF] dark:border-[#2A2E38] rounded-md text-[#1C1917] dark:text-[#F3F4F6] focus:outline-none focus:border-[#2D4A3E] dark:focus:border-[#6E9E88]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] dark:text-[#D1D5DB] mb-2">
                  Message Details <span className="text-red-600">*</span>
                </label>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your inquiry, project scope, or research proposal..."
                  required
                  className="w-full px-4 py-2.5 text-sm bg-white dark:bg-[#232730] border border-[#EBE6DF] dark:border-[#2A2E38] rounded-md text-[#1C1917] dark:text-[#F3F4F6] focus:outline-none focus:border-[#2D4A3E] dark:focus:border-[#6E9E88]"
                />
              </div>

              {status === 'error' && (
                <div className="p-4 rounded-md bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-xs text-red-700 dark:text-red-400 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {status === 'success' && (
                <div className="p-4 rounded-md bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Thank you! Your message has been sent successfully to Pravesh Shaikh.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-6 text-sm font-semibold uppercase tracking-wider text-white bg-[#2D4A3E] hover:bg-[#233A31] dark:bg-[#385A4C] dark:hover:bg-[#2D4A3E] rounded-md shadow-xs transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{status === 'submitting' ? 'Sending Message...' : 'Send Inquiry Message'}</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
