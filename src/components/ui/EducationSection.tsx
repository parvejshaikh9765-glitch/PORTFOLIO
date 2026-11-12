import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { GraduationCap, MapPin, Calendar, BookOpen } from 'lucide-react';

export const EducationSection: React.FC = () => {
  const { data } = usePortfolio();
  const educationList = data?.education || [];

  return (
    <section id="education" className="py-20 bg-[#FAF8F5] dark:bg-[#121417] border-t border-[#EBE6DF] dark:border-[#272A30]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-[#EBE6DF] dark:border-[#272A30]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#78716C] dark:text-[#9CA3AF]">
              02 · Academic Qualifications
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1C1917] dark:text-[#F3F4F6] mt-2">
              Education & Academic Achievements
            </h2>
          </div>
          <p className="text-sm text-[#78716C] dark:text-[#9CA3AF] max-w-md mt-4 md:mt-0">
            Postgraduate specialization in Development Studies alongside foundational interdisciplinary grounding in Geography & History.
          </p>
        </div>

        {/* Education Timeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {educationList.map((item) => (
            <div
              key={item.id}
              className="p-8 rounded-2xl bg-white dark:bg-[#1A1D24] border border-[#EBE6DF] dark:border-[#272A30] space-y-6 shadow-xs hover:border-[#2D4A3E]/40 transition-all"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#EBE6DF] dark:border-[#272A30]">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-[#2D4A3E]/10 dark:bg-[#6E9E88]/15 text-[#2D4A3E] dark:text-[#6E9E88]">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  {item.score && (
                    <span className="text-xs font-bold text-[#2D4A3E] dark:text-[#6E9E88] bg-[#2D4A3E]/10 dark:bg-[#6E9E88]/15 px-3 py-1 rounded-md">
                      Score: {item.score}
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-[#2D4A3E] dark:text-[#6E9E88] block">
                    {item.duration}
                  </span>
                  <span className="text-[11px] text-[#78716C] dark:text-[#9CA3AF]">
                    {item.location}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-semibold text-[#1C1917] dark:text-[#F3F4F6]">
                  {item.degree}
                </h3>
                <div className="text-sm font-semibold text-[#57534E] dark:text-[#D1D5DB] mt-1">
                  {item.institution}
                </div>
                <div className="text-xs font-medium text-[#2D4A3E] dark:text-[#6E9E88] mt-2 italic">
                  Focus: {item.academicFocus}
                </div>
              </div>

              <p className="text-xs text-[#57534E] dark:text-[#A1A1AA] leading-relaxed">
                {item.description}
              </p>

              {item.courses && item.courses.length > 0 && (
                <div className="pt-4 border-t border-[#EBE6DF] dark:border-[#272A30]">
                  <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[#78716C] dark:text-[#9CA3AF] mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    Key Academic Coursework
                  </h4>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#57534E] dark:text-[#D1D5DB]">
                    {item.courses.map((course, cIdx) => (
                      <React.Fragment key={cIdx}>
                        <span>{course}</span>
                        {cIdx < item.courses.length - 1 && <span aria-hidden="true" className="text-[#A1A1AA]">·</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
