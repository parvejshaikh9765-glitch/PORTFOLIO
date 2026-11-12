import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Target, CheckCircle2, Award, BarChart3, Users, Briefcase, FileDown, ArrowRight, ShieldCheck } from 'lucide-react';

interface RecruiterValuePropProps {
  onOpenFastTrack: () => void;
}

export const RecruiterValuePropSection: React.FC<RecruiterValuePropProps> = ({ onOpenFastTrack }) => {
  const { data, navigate } = usePortfolio();
  const profile = data?.profile;

  const valuePillars = [
    {
      title: "Ground Fieldwork & Community Engagement",
      icon: <Users className="w-5 h-5 text-[#2D4A3E] dark:text-[#6E9E88]" />,
      metrics: "100+ Field Interviews · 2,200+ Beneficiaries Across 111 Centres",
      description: "Proven capacity to lead primary field research in high-precarity urban and rural environments. Executed 100+ driver interviews for ICSSR in Mumbai and trained 300+ weavers for DEF in Solapur."
    },
    {
      title: "Hard Technical & Spatial Analytics",
      icon: <BarChart3 className="w-5 h-5 text-[#2D4A3E] dark:text-[#6E9E88]" />,
      metrics: "Python · Power BI · STATA · QGIS · Excel",
      description: "Combines quantitative econometrics with spatial GIS mapping and interactive dashboarding. Built automated Power BI KPI monitoring dashboards for Shahapur rural water infrastructure."
    },
    {
      title: "Programme Strategy & Institutional Mapping",
      icon: <Briefcase className="w-5 h-5 text-[#2D4A3E] dark:text-[#6E9E88]" />,
      metrics: "100-Course Framework · 54 Partners Mapped",
      description: "Engineered a 10-cluster sustainability curriculum roadmap for the Swiss Academy for Leadership and Sustainability, benchmarking 50+ institutions and mapping 54 partner leads."
    },
    {
      title: "Corporate Liaisoning & Placement Leadership",
      icon: <Award className="w-5 h-5 text-[#2D4A3E] dark:text-[#6E9E88]" />,
      metrics: "68 TISS Students Coordinated · 20+ Corporate Partners",
      description: "Elected Placement Committee Member at TISS Mumbai, leading end-to-end recruitment logistics, corporate outreach, and developing an alumni management platform."
    }
  ];

  return (
    <section className="py-8 md:py-12 bg-[#F5F4EE] dark:bg-[#121417]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white dark:bg-[#1A1D24] rounded-[32px] border border-[#E5E4DD] dark:border-[#272A30] shadow-xs p-8 lg:p-12 space-y-10">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-[#E5E4DD] dark:border-[#272A30]">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#C8102E] dark:text-[#6E9E88] mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Recruiter & Hiring Manager Evaluation
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1C1917] dark:text-[#F3F4F6]">
                Target Roles & Value Proposition
              </h2>
            </div>

            <div className="flex items-center gap-3 mt-4 md:mt-0">
              <button
                onClick={onOpenFastTrack}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#C8102E] hover:bg-[#A80C24] dark:bg-[#385A4C] dark:hover:bg-[#2D4A3E] rounded-full shadow-xs transition-all cursor-pointer"
              >
                <span>Launch 30s Candidate Snapshot</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Target Roles */}
          <div className="p-6 rounded-2xl bg-[#F5F4EE] dark:bg-[#232730] border border-[#E5E4DD] dark:border-[#272A30] space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#78716C] dark:text-[#9CA3AF] block">
              Qualified Position Alignment:
            </span>
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
                  className="px-3.5 py-1.5 text-xs font-semibold bg-white dark:bg-[#1A1D24] text-[#1C1917] dark:text-[#F3F4F6] border border-[#E5E4DD] dark:border-[#272A30] rounded-xl shadow-2xs flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C8102E] dark:text-[#6E9E88]" />
                  {role}
                </span>
              ))}
            </div>
          </div>

          {/* 4 Core Value Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {valuePillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#F5F4EE] dark:bg-[#232730] border border-[#E5E4DD] dark:border-[#272A30] hover:border-[#2D4A3E]/40 transition-all space-y-3 shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-[#1A1D24] border border-[#E5E4DD] dark:border-[#272A30]">
                    {pillar.icon}
                  </div>
                  <span className="text-xs font-mono font-bold text-[#2D4A3E] dark:text-[#6E9E88] bg-white dark:bg-[#1A1D24] px-2.5 py-1 rounded-lg border border-[#E5E4DD] dark:border-[#272A30]">
                    {pillar.metrics}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-semibold text-[#1C1917] dark:text-[#F3F4F6]">
                  {pillar.title}
                </h3>

                <p className="text-xs text-[#57534E] dark:text-[#A1A1AA] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
