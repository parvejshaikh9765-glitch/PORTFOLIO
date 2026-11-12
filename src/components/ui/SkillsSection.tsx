import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

export const SkillsSection: React.FC = () => {
  const { data } = usePortfolio();
  const categories = data?.skillCategories || [];

  const certs = data?.certifications || [];

  return (
    <section id="skills" className="py-20 bg-white dark:bg-[#16181D] border-y border-[#EBE6DF] dark:border-[#272A30]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-[#EBE6DF] dark:border-[#272A30]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#78716C] dark:text-[#9CA3AF]">
              08 · Skills & Analytical Capabilities
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1C1917] dark:text-[#F3F4F6] mt-2">
              Skills & Professional Certifications
            </h2>
          </div>
          <p className="text-sm text-[#78716C] dark:text-[#9CA3AF] max-w-md mt-4 md:mt-0">
            Proven proficiencies in quantitative and qualitative research, spatial GIS tools, policy frameworks, and certified development capabilities.
          </p>
        </div>

        {/* 4-column matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, idx) => (
            <div
              key={cat.id || idx}
              className="p-6 rounded-xl bg-[#FAF8F5] dark:bg-[#1A1D24] border border-[#EBE6DF] dark:border-[#272A30] space-y-6"
            >
              <div className="pb-4 border-b border-[#EBE6DF] dark:border-[#272A30]">
                <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#2D4A3E] dark:text-[#6E9E88]">
                  Category 0{idx + 1}
                </span>
                <h3 className="font-serif text-xl font-semibold text-[#1C1917] dark:text-[#F3F4F6] mt-1">
                  {cat.name}
                </h3>
              </div>

              <div className="space-y-4">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#1C1917] dark:text-[#F3F4F6]">
                      <span>{skill.name}</span>
                      {skill.level && (
                        <span className="text-[11px] font-medium text-[#2D4A3E] dark:text-[#6E9E88]">
                          {skill.level}
                        </span>
                      )}
                    </div>
                    {skill.description && (
                      <p className="text-[11px] text-[#78716C] dark:text-[#A1A1AA] leading-tight">
                        {skill.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications Row */}
        {certs.length > 0 && (
          <div className="pt-8 border-t border-[#EBE6DF] dark:border-[#272A30] space-y-4">
            <h3 className="font-serif text-xl font-semibold text-[#1C1917] dark:text-[#F3F4F6]">
              Verified Professional Certifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certs.map((cert) => (
                <div key={cert.id} className="p-5 rounded-xl bg-[#FAF8F5] dark:bg-[#1A1D24] border border-[#EBE6DF] dark:border-[#272A30] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#1C1917] dark:text-[#F3F4F6] block">{cert.title}</span>
                    <span className="text-xs text-[#78716C] dark:text-[#9CA3AF]">{cert.issuer}</span>
                  </div>
                  {cert.year && (
                    <span className="text-xs font-semibold text-[#2D4A3E] dark:text-[#6E9E88] bg-[#2D4A3E]/10 dark:bg-[#6E9E88]/15 px-3 py-1 rounded-md">
                      {cert.year}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
