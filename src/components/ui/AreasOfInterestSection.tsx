import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Building2, Leaf, ShieldCheck, Landmark, Sprout, BarChart3, Users, CheckCircle2 } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 className="w-5 h-5 text-[#2D4A3E] dark:text-[#6E9E88]" />,
  Leaf: <Leaf className="w-5 h-5 text-[#2D4A3E] dark:text-[#6E9E88]" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-[#2D4A3E] dark:text-[#6E9E88]" />,
  Landmark: <Landmark className="w-5 h-5 text-[#2D4A3E] dark:text-[#6E9E88]" />,
  Sprout: <Sprout className="w-5 h-5 text-[#2D4A3E] dark:text-[#6E9E88]" />,
  BarChart3: <BarChart3 className="w-5 h-5 text-[#2D4A3E] dark:text-[#6E9E88]" />,
  Users: <Users className="w-5 h-5 text-[#2D4A3E] dark:text-[#6E9E88]" />,
  CheckCircle2: <CheckCircle2 className="w-5 h-5 text-[#2D4A3E] dark:text-[#6E9E88]" />
};

export const AreasOfInterestSection: React.FC = () => {
  const { data, navigate } = usePortfolio();
  const areas = data?.areasOfInterest || [];

  return (
    <section className="py-20 bg-white dark:bg-[#16181D] border-y border-[#EBE6DF] dark:border-[#272A30]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-6 border-b border-[#EBE6DF] dark:border-[#272A30]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#78716C] dark:text-[#9CA3AF]">
              01 · Academic & Professional Domains
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1C1917] dark:text-[#F3F4F6] mt-2">
              Areas of Interest & Competency
            </h2>
          </div>
          <p className="text-sm text-[#78716C] dark:text-[#9CA3AF] max-w-md mt-4 md:mt-0">
            Interdisciplinary focus areas combining theoretical rigor with ground-level field engagement across urban and rural South Asia.
          </p>
        </div>

        {/* 4x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {areas.map((area, index) => (
            <div
              key={area.id}
              className="p-6 rounded-xl bg-[#FAF8F5] dark:bg-[#1A1D24] border border-[#EBE6DF] dark:border-[#272A30] hover:border-[#2D4A3E]/40 dark:hover:border-[#6E9E88]/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-lg bg-white dark:bg-[#232730] border border-[#EBE6DF] dark:border-[#2A2E38] shadow-xs">
                    {iconMap[area.iconName] || <Building2 className="w-5 h-5 text-[#2D4A3E] dark:text-[#6E9E88]" />}
                  </div>
                  <span className="text-xs font-mono font-medium text-[#78716C] dark:text-[#9CA3AF]">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-semibold text-[#1C1917] dark:text-[#F3F4F6] mb-2 group-hover:text-[#2D4A3E] dark:group-hover:text-[#6E9E88] transition-colors">
                  {area.title}
                </h3>
                
                <p className="text-xs text-[#57534E] dark:text-[#A1A1AA] leading-relaxed">
                  {area.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#EBE6DF]/70 dark:border-[#272A30] flex items-center justify-between text-[11px] text-[#78716C] dark:text-[#9CA3AF]">
                <span>Pravesh Shaikh</span>
                <span className="font-medium text-[#2D4A3E] dark:text-[#6E9E88]">TISS Research</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
