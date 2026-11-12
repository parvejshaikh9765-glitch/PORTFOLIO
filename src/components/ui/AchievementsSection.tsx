import React from 'react';
import { Award, Trophy, CheckCircle, FileText, Users, Building, Sparkles, Star } from 'lucide-react';

export const AchievementsSection: React.FC = () => {
  const achievements = [
    {
      title: '7.37 CGPA Postgraduate Scholar',
      institution: 'Tata Institute of Social Sciences (TISS), Mumbai',
      description: 'Maintained high academic standing in M.A. Development Studies across quantitative econometrics, qualitative field research, and public policy coursework.',
      icon: <Trophy className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
      badge: 'Academic Distinction'
    },
    {
      title: '28-Page International Market Feasibility Study',
      institution: 'Swiss Academy for Leadership and Sustainability (SALS Geneva)',
      description: 'Authored an extensive 28-page market entry report for Western India, curating 100 sustainability courses and mapping 54 higher education & corporate partners.',
      icon: <FileText className="w-5 h-5 text-[#2D4A3E] dark:text-[#6E9E88]" />,
      badge: 'Strategic Publication'
    },
    {
      title: '100+ Primary Field Intercept Interviews',
      institution: 'Indian Council of Social Science Research (ICSSR)',
      description: 'Executed extensive qualitative field research across Mumbai transit nodes investigating urban precarity, housing, and social protection gaps among migrant drivers.',
      icon: <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      badge: 'Field Research Excellence'
    },
    {
      title: '330+ KoBoToolbox Household Baseline Surveys',
      institution: 'Digital Empowerment Foundation (DEF Solapur)',
      description: 'Led mobile baseline survey operations across 3 Solapur weaver clusters, delivered digital literacy to 150+ GI-tag artisans, and co-authored 9 chapters of heritage book.',
      icon: <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      badge: 'Grassroots Impact'
    },
    {
      title: 'Elected Placement Committee & Alumni Coordinator',
      institution: 'TISS Mumbai Postgraduate Body',
      description: 'Elected to represent 68 Development Studies students, managing corporate recruiter liaisoning and engineering the AlumniPath career platform tracking 20+ batches.',
      icon: <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
      badge: 'Institutional Leadership'
    },
    {
      title: 'Certified Data Analytics & World Bank ESF Specialist',
      institution: 'IBM & World Bank Group',
      description: 'Earned IBM Data Analytics Professional Certificate and World Bank Environmental & Social Framework (ESF) Fundamentals credentials.',
      icon: <Star className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      badge: 'Professional Certifications'
    }
  ];

  return (
    <section id="achievements" className="py-20 bg-white dark:bg-[#16181D] border-t border-[#EBE6DF] dark:border-[#272A30]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-[#EBE6DF] dark:border-[#272A30]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#78716C] dark:text-[#9CA3AF]">
              09 · Achievements & Key Milestones
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1C1917] dark:text-[#F3F4F6] mt-2">
              Achievements & Notable Accomplishments
            </h2>
          </div>
          <p className="text-sm text-[#78716C] dark:text-[#9CA3AF] max-w-md mt-4 md:mt-0">
            Demonstrated track record of academic rigor, field execution, institutional leadership, and certified technical capabilities.
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#FAF8F5] dark:bg-[#1A1D24] border border-[#EBE6DF] dark:border-[#272A30] space-y-4 hover:border-[#2D4A3E]/30 transition-all shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-[#232730] border border-[#EBE6DF] dark:border-[#2A2E38]">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D4A3E] dark:text-[#6E9E88] bg-[#2D4A3E]/10 dark:bg-[#6E9E88]/15 px-2.5 py-1 rounded-md">
                    {item.badge}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-semibold text-[#1C1917] dark:text-[#F3F4F6] leading-snug">
                  {item.title}
                </h3>
                <div className="text-xs font-semibold text-[#57534E] dark:text-[#D1D5DB]">
                  {item.institution}
                </div>
                <p className="text-xs text-[#57534E] dark:text-[#A1A1AA] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
