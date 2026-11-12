import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Briefcase, Calendar, MapPin, CheckCircle, Award, Users, Download, ExternalLink } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const { data } = usePortfolio();
  const experienceList = data?.experience || [];
  const positions = data?.positionsOfResponsibility || [];

  return (
    <section id="experience" className="py-20 bg-white dark:bg-[#16181D] border-y border-[#EBE6DF] dark:border-[#272A30]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Main Experience Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-[#EBE6DF] dark:border-[#272A30]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#78716C] dark:text-[#9CA3AF]">
              03 · Professional & Practical Fieldwork
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1C1917] dark:text-[#F3F4F6] mt-2">
              Experience & Engagements
            </h2>
          </div>
          <p className="text-sm text-[#78716C] dark:text-[#9CA3AF] max-w-md mt-4 md:mt-0">
            Professional trajectory spanning programme consulting with Swiss Academy, primary urban research with ICSSR, and field operations with DEF, DHAN, and MySocially.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="relative border-l-2 border-[#EBE6DF] dark:border-[#272A30] ml-4 md:ml-6 space-y-12">
          {experienceList.map((item) => (
            <div key={item.id} className="relative pl-6 md:pl-10 group">
              
              {/* Node Bullet */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-[#16181D] border-2 border-[#2D4A3E] dark:border-[#6E9E88] group-hover:scale-125 transition-transform" />

              <div className="p-6 md:p-8 rounded-xl bg-[#FAF8F5] dark:bg-[#1A1D24] border border-[#EBE6DF] dark:border-[#272A30] hover:border-[#2D4A3E]/30 transition-all shadow-xs">
                
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3 text-xs text-[#78716C] dark:text-[#9CA3AF]">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold uppercase tracking-wider text-[#2D4A3E] dark:text-[#6E9E88]">
                      {item.type}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{item.duration}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.location}</span>
                  </div>
                </div>

                {/* Designation & Organisation */}
                <h3 className="font-serif text-2xl font-semibold text-[#1C1917] dark:text-[#F3F4F6]">
                  {item.designation}
                </h3>
                <div className="flex items-center gap-2 text-sm font-semibold text-[#57534E] dark:text-[#D1D5DB] mt-1 mb-4">
                  <span>{item.organisation}</span>
                  {item.websiteUrl && (
                    <a
                      href={item.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[#2D4A3E] dark:text-[#6E9E88] hover:underline"
                      title="Visit Official Website"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-[#44403C] dark:text-[#A1A1AA] leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Responsibilities list */}
                {item.responsibilities && item.responsibilities.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#78716C] dark:text-[#9CA3AF]">
                      Core Deliverables & Contributions
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-[#57534E] dark:text-[#D1D5DB]">
                      {item.responsibilities.map((resp, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-[#2D4A3E] dark:text-[#6E9E88] shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Buttons: Report PDF & Official Website */}
                {(item.documentUrl || item.websiteUrl) && (
                  <div className="pt-4 mt-6 border-t border-[#EBE6DF] dark:border-[#272A30] flex flex-wrap items-center gap-3">
                    {item.documentUrl && (
                      <a
                        href={item.documentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#2D4A3E] hover:bg-[#233A31] rounded-md transition-colors shadow-xs"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Report PDF</span>
                      </a>
                    )}
                    {item.websiteUrl && (
                      <a
                        href={item.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#1C1917] dark:text-[#F3F4F6] bg-white dark:bg-[#232730] border border-[#EBE6DF] dark:border-[#272A30] hover:border-[#2D4A3E] rounded-md transition-colors shadow-2xs"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-[#2D4A3E] dark:text-[#6E9E88]" />
                        <span>Official Website</span>
                      </a>
                    )}
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>

        {/* Positions of Responsibility Section from CV */}
        {positions.length > 0 && (
          <div className="pt-8 border-t border-[#EBE6DF] dark:border-[#272A30] space-y-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#78716C] dark:text-[#9CA3AF]">
                Leadership & Institutional Service
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1C1917] dark:text-[#F3F4F6] mt-1">
                Positions of Responsibility
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {positions.map((pos) => (
                <div
                  key={pos.id}
                  className="p-6 rounded-xl bg-[#FAF8F5] dark:bg-[#1A1D24] border border-[#EBE6DF] dark:border-[#272A30] space-y-4 shadow-xs"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-[#EBE6DF] dark:border-[#272A30]">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-[#2D4A3E]/10 dark:bg-[#6E9E88]/15 text-[#2D4A3E] dark:text-[#6E9E88]">
                        <Users className="w-4 h-4" />
                      </div>
                      <span className="font-serif text-lg font-semibold text-[#1C1917] dark:text-[#F3F4F6]">
                        {pos.role}
                      </span>
                    </div>
                    <span className="text-xs text-[#78716C] dark:text-[#9CA3AF] font-medium">
                      {pos.duration}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-[#2D4A3E] dark:text-[#6E9E88]">
                    {pos.institution}
                  </div>

                  <ul className="space-y-2 text-xs text-[#57534E] dark:text-[#D1D5DB]">
                    {pos.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-[#2D4A3E] dark:text-[#6E9E88] shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
