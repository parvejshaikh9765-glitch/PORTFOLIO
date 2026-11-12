import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Briefcase, Calendar, MapPin, CheckCircle, Download, ExternalLink, Award, Sparkles, Building2 } from 'lucide-react';

export const InternshipsSection: React.FC = () => {
  const { data } = usePortfolio();
  const experienceList = data?.experience || [];

  return (
    <section id="internships" className="py-16 md:py-24 bg-[#FAF8F5] dark:bg-[#121417] border-t border-[#EBE6DF] dark:border-[#272A30]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-[#EBE6DF] dark:border-[#272A30] gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#2D4A3E] dark:text-[#6E9E88] mb-2 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" />
              04 · Hands-On Field & Programme Engagements
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1917] dark:text-[#F3F4F6]">
              Fieldwork & Institutional Engagements
            </h2>
          </div>
          <p className="text-sm text-[#78716C] dark:text-[#9CA3AF] max-w-md">
            Hands-on professional trajectory spanning international programme consulting, field research with traditional artisan clusters, urban gig worker surveys, and rural M&E analytics.
          </p>
        </div>

        {/* Enhanced Internship Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {experienceList.map((item) => (
            <div
              key={item.id}
              className="p-8 rounded-2xl bg-white dark:bg-[#1A1D24] border border-[#EBE6DF] dark:border-[#272A30] hover:border-[#2D4A3E]/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-5">
                {/* Meta Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#2D4A3E] dark:text-[#6E9E88] bg-[#2D4A3E]/10 dark:bg-[#6E9E88]/15 px-3 py-1 rounded-md border border-[#2D4A3E]/20 dark:border-[#6E9E88]/30">
                    {item.type}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-[#78716C] dark:text-[#9CA3AF] font-medium">
                    <Calendar className="w-3.5 h-3.5 text-[#2D4A3E] dark:text-[#6E9E88]" />
                    <span>{item.duration}</span>
                  </div>
                </div>

                {/* Designation & Organisation */}
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#1C1917] dark:text-[#F3F4F6] leading-snug">
                    {item.designation}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-[#57534E] dark:text-[#D1D5DB] mt-1.5">
                    <span>{item.organisation}</span>
                    {item.websiteUrl && (
                      <a
                        href={item.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-[#2D4A3E] dark:text-[#6E9E88] hover:underline bg-[#F5F4EE] dark:bg-[#232730] px-2 py-0.5 rounded border border-[#EBE6DF] dark:border-[#272A30]"
                        title="Visit Official Website"
                      >
                        <span>Visit Site</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <div className="text-xs text-[#78716C] dark:text-[#9CA3AF] mt-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#2D4A3E] dark:text-[#6E9E88]" />
                    <span>{item.location}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#44403C] dark:text-[#A1A1AA] leading-relaxed">
                  {item.description}
                </p>

                {/* Core Responsibilities */}
                {item.responsibilities && item.responsibilities.length > 0 && (
                  <div className="pt-4 border-t border-[#EBE6DF] dark:border-[#272A30] space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#78716C] dark:text-[#9CA3AF] block">
                      Core Responsibilities & Key Deliverables
                    </span>
                    <ul className="space-y-2 text-xs text-[#292524] dark:text-[#D1D5DB]">
                      {item.responsibilities.map((resp, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2 leading-relaxed">
                          <CheckCircle className="w-3.5 h-3.5 text-[#2D4A3E] dark:text-[#6E9E88] shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Action Buttons: Report PDF & Official Site */}
              {(item.documentUrl || item.websiteUrl) && (
                <div className="pt-4 border-t border-[#EBE6DF] dark:border-[#272A30] flex flex-wrap items-center gap-3">
                  {item.documentUrl && (
                    <a
                      href={item.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#2D4A3E] hover:bg-[#233A31] rounded-xl transition-all shadow-2xs"
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
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#1C1917] dark:text-[#F3F4F6] bg-[#FAF8F5] dark:bg-[#232730] border border-[#EBE6DF] dark:border-[#272A30] hover:border-[#2D4A3E] rounded-xl transition-all shadow-2xs"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#2D4A3E] dark:text-[#6E9E88]" />
                      <span>Official Website</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

