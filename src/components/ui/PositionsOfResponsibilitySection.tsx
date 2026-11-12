import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Users, CheckCircle, ShieldCheck, Award } from 'lucide-react';

export const PositionsOfResponsibilitySection: React.FC = () => {
  const { data } = usePortfolio();
  const positions = data?.positionsOfResponsibility || [];

  return (
    <section id="leadership" className="py-20 bg-white dark:bg-[#16181D] border-t border-[#EBE6DF] dark:border-[#272A30]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-[#EBE6DF] dark:border-[#272A30]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#78716C] dark:text-[#9CA3AF]">
              07 · Leadership & Institutional Service
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1C1917] dark:text-[#F3F4F6] mt-2">
              Positions of Responsibility
            </h2>
          </div>
          <p className="text-sm text-[#78716C] dark:text-[#9CA3AF] max-w-md mt-4 md:mt-0">
            Elected postgraduate leadership managing recruitment logistics for 68 students and building institutional alumni engagement platforms.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {positions.map((pos) => (
            <div
              key={pos.id}
              className="p-8 rounded-2xl bg-[#FAF8F5] dark:bg-[#1A1D24] border border-[#EBE6DF] dark:border-[#272A30] space-y-6 shadow-xs hover:border-[#2D4A3E]/40 transition-all"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#EBE6DF] dark:border-[#272A30]">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-[#2D4A3E]/10 dark:bg-[#6E9E88]/15 text-[#2D4A3E] dark:text-[#6E9E88]">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-[#1C1917] dark:text-[#F3F4F6]">
                      {pos.role}
                    </h3>
                    <div className="text-xs font-semibold text-[#2D4A3E] dark:text-[#6E9E88] mt-0.5">
                      {pos.institution}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-[#78716C] dark:text-[#9CA3AF] font-medium bg-white dark:bg-[#232730] px-3 py-1 rounded-md border border-[#EBE6DF] dark:border-[#2A2E38]">
                  {pos.duration}
                </span>
              </div>

              <ul className="space-y-3 text-xs text-[#44403C] dark:text-[#D1D5DB]">
                {pos.points.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#2D4A3E] dark:text-[#6E9E88] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
