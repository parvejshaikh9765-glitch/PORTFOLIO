import React from 'react';
import { User, GraduationCap, Briefcase, Rocket, FolderGit2, Shield, Users, Wrench, Trophy, Mail, Sparkles } from 'lucide-react';

export const RecruiterJumpBar: React.FC = () => {
  const jumpLinks = [
    { id: 'overview', label: '1. Overview', icon: <User className="w-3.5 h-3.5" /> },
    { id: 'education', label: '2. Education', icon: <GraduationCap className="w-3.5 h-3.5" /> },
    { id: 'experience', label: '3. Experience', icon: <Briefcase className="w-3.5 h-3.5" /> },
    { id: 'internships', label: '4. Fieldwork', icon: <Rocket className="w-3.5 h-3.5" /> },
    { id: 'projects', label: '5. Projects', icon: <FolderGit2 className="w-3.5 h-3.5" /> },
    { id: 'reports', label: '6. Vault Reports', icon: <Shield className="w-3.5 h-3.5" /> },
    { id: 'leadership', label: '7. Leadership', icon: <Users className="w-3.5 h-3.5" /> },
    { id: 'skills', label: '8. Skills & Certs', icon: <Wrench className="w-3.5 h-3.5" /> },
    { id: 'achievements', label: '9. Achievements', icon: <Trophy className="w-3.5 h-3.5" /> },
    { id: 'contact', label: '10. Contact', icon: <Mail className="w-3.5 h-3.5" /> }
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-20 z-30 bg-white/95 dark:bg-[#1A1D24]/95 backdrop-blur-md border-y border-[#EBE6DF] dark:border-[#272A30] shadow-xs py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
        
        <div className="flex items-center gap-2 text-xs font-bold text-[#2D4A3E] dark:text-[#6E9E88] shrink-0 uppercase tracking-wider pr-2 border-r border-[#EBE6DF] dark:border-[#272A30]">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Recruiter Quick Index</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {jumpLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#FAF8F5] dark:bg-[#232730] text-[#44403C] dark:text-[#D1D5DB] hover:bg-[#2D4A3E] hover:text-white dark:hover:bg-[#6E9E88] dark:hover:text-black border border-[#EBE6DF] dark:border-[#2A2E38] transition-all whitespace-nowrap cursor-pointer"
            >
              {link.icon}
              <span>{link.label}</span>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};
