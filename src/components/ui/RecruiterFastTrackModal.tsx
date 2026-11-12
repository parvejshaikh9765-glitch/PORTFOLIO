import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { FileDown, Mail, Phone, Linkedin, CheckCircle2, Award, Building, Sparkles, X, Briefcase, GraduationCap, MapPin } from 'lucide-react';

interface RecruiterFastTrackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export const RecruiterFastTrackModal: React.FC<RecruiterFastTrackModalProps> = ({
  isOpen,
  onClose,
  onOpenContact
}) => {
  const { data, navigate } = usePortfolio();
  const profile = data?.profile;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white dark:bg-[#1A1D24] rounded-2xl border border-[#EBE6DF] dark:border-[#272A30] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header Ribbon */}
        <div className="bg-[#2D4A3E] text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs">
              <Sparkles className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-200 block">
                Recruiter & HR Fast-Track
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white">
                30-Second Candidate Snapshot
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto text-[#1C1917] dark:text-[#F3F4F6] text-xs sm:text-sm">
          
          {/* Candidate Overview */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#232730] border border-[#EBE6DF] dark:border-[#272A30]">
            <div className="flex items-center gap-4">
              <img
                src={profile?.portraitUrl || '/src/assets/images/hero_portrait_pravesh_1794261203775.jpg'}
                alt="Pravesh Shaikh"
                className="w-14 h-14 rounded-full object-cover border-2 border-[#2D4A3E]"
              />
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1C1917] dark:text-[#F3F4F6]">
                  Pravesh Shaikh
                </h3>
                <div className="text-xs font-semibold text-[#2D4A3E] dark:text-[#6E9E88]">
                  M.A. Development Studies · TISS Mumbai (7.37 CGPA)
                </div>
                <div className="text-[11px] text-[#78716C] dark:text-[#9CA3AF] flex items-center gap-2 mt-0.5">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {profile?.location || 'Mumbai, India'}</span>
                  <span>·</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-medium">Available for Hiring</span>
                </div>
              </div>
            </div>

            <a
              href={profile?.cvUrl || '/assets/documents/Pravesh_Shaikh_CV.pdf'}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#2D4A3E] hover:bg-[#233A31] rounded-md shadow-xs transition-all shrink-0"
            >
              <FileDown className="w-4 h-4" />
              <span>Download CV (PDF)</span>
            </a>
          </div>

          {/* Target Roles Grid */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#78716C] dark:text-[#9CA3AF] flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-[#2D4A3E] dark:text-[#6E9E88]" />
              Target Position Roles
            </h4>
            <div className="flex flex-wrap gap-2">
              {(profile?.targetRoles || [
                "Programme Operations & Strategy Manager",
                "Development & Public Policy Consultant",
                "ESG & Sustainability Analyst",
                "Monitoring, Evaluation & Learning (MEL) Specialist",
                "Research & Data Analytics Associate"
              ]).map((role, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 text-xs font-semibold bg-white dark:bg-[#1A1D24] text-[#2D4A3E] dark:text-[#6E9E88] border border-[#2D4A3E]/30 rounded-md shadow-2xs"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>

          {/* Proven Key Metrics & Impact */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-lg bg-[#FAF8F5] dark:bg-[#232730] border border-[#EBE6DF] dark:border-[#272A30]">
              <div className="font-serif text-xl font-bold text-[#1C1917] dark:text-[#F3F4F6]">100+</div>
              <div className="text-[11px] text-[#78716C] dark:text-[#9CA3AF]">ICSSR Field Interviews</div>
            </div>
            <div className="p-3 rounded-lg bg-[#FAF8F5] dark:bg-[#232730] border border-[#EBE6DF] dark:border-[#272A30]">
              <div className="font-serif text-xl font-bold text-[#1C1917] dark:text-[#F3F4F6]">2,200+</div>
              <div className="text-[11px] text-[#78716C] dark:text-[#9CA3AF]">Beneficiaries · 111 Centres</div>
            </div>
            <div className="p-3 rounded-lg bg-[#FAF8F5] dark:bg-[#232730] border border-[#EBE6DF] dark:border-[#272A30]">
              <div className="font-serif text-xl font-bold text-[#1C1917] dark:text-[#F3F4F6]">54</div>
              <div className="text-[11px] text-[#78716C] dark:text-[#9CA3AF]">SALS Mapped Institutions</div>
            </div>
            <div className="p-3 rounded-lg bg-[#FAF8F5] dark:bg-[#232730] border border-[#EBE6DF] dark:border-[#272A30]">
              <div className="font-serif text-xl font-bold text-[#1C1917] dark:text-[#F3F4F6]">Power BI</div>
              <div className="text-[11px] text-[#78716C] dark:text-[#9CA3AF]">Deployed Dashboard</div>
            </div>
          </div>

          {/* Hard Technical Skills */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#78716C] dark:text-[#9CA3AF] flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#2D4A3E] dark:text-[#6E9E88]" />
              Core Technical Stack & Certifications
            </h4>
            <div className="p-4 rounded-xl bg-white dark:bg-[#1A1D24] border border-[#EBE6DF] dark:border-[#272A30] space-y-2 text-xs">
              <div><span className="font-semibold text-[#1C1917] dark:text-[#F3F4F6]">Analytics & Tools:</span> Python, Power BI, STATA, QGIS, Excel (Advanced), KoboToolbox, ODK</div>
              <div><span className="font-semibold text-[#1C1917] dark:text-[#F3F4F6]">Certifications:</span> IBM Data Analytics Professional Certificate · World Bank ESF Fundamentals</div>
              <div><span className="font-semibold text-[#1C1917] dark:text-[#F3F4F6]">Methodologies:</span> LogFrames, Theory of Change (ToC), Social Impact Assessment (SIA), Intercept Surveys</div>
            </div>
          </div>

        </div>

        {/* Modal Action Footer */}
        <div className="p-4 sm:p-6 bg-[#FAF8F5] dark:bg-[#232730] border-t border-[#EBE6DF] dark:border-[#272A30] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs font-medium">
            <a href={`mailto:${profile?.email || 'parvejshaikh9765@gmail.com'}`} className="inline-flex items-center gap-1 text-[#2D4A3E] dark:text-[#6E9E88] hover:underline font-semibold">
              <Mail className="w-4 h-4" />
              <span>Email Candidate</span>
            </a>
            <a href={`tel:${profile?.phone || '7972246347'}`} className="inline-flex items-center gap-1 text-[#2D4A3E] dark:text-[#6E9E88] hover:underline font-semibold">
              <Phone className="w-4 h-4" />
              <span>+91 7972246347</span>
            </a>
            {profile?.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#2D4A3E] dark:text-[#6E9E88] hover:underline font-semibold">
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                navigate('/resume');
              }}
              className="w-1/2 sm:w-auto px-4 py-2 text-xs font-semibold text-[#44403C] dark:text-[#D1D5DB] bg-white dark:bg-[#1A1D24] border rounded-md hover:bg-[#FAF8F5]"
            >
              View Full CV Page
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className="w-1/2 sm:w-auto px-5 py-2 text-xs font-semibold text-white bg-[#2D4A3E] hover:bg-[#233A31] rounded-md shadow-xs"
            >
              Schedule Interview
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
