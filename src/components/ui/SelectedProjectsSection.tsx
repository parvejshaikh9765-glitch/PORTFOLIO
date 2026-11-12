import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ArrowUpRight, FolderGit2, Download, Layers, CheckCircle2, Tag, BookOpen, Wrench } from 'lucide-react';

export const SelectedProjectsSection: React.FC = () => {
  const { data, navigate } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  const allProjects = (data?.projects || []).filter(p => p.status === 'published');
  
  const categories = ['All', 'Digital Inclusion & Artisans', 'Geospatial & Urban Analysis', 'Quantitative Policy & Econometrics', 'Data Analytics & Infrastructure', 'Institutional Tech'];

  const filteredProjects = selectedCategory === 'All' 
    ? allProjects 
    : allProjects.filter(p => 
        p.category.toLowerCase().includes(selectedCategory.toLowerCase().slice(0, 8)) ||
        (p.typeLabel && p.typeLabel.toLowerCase().includes(selectedCategory.toLowerCase().slice(0, 8)))
      );

  const handleProjectClick = (id: string, slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/projects/${slug || id}`);
  };

  const isMapProject = (id: string, slug: string) => {
    return id.includes('gis') || id.includes('mumbai_spatial') || slug.includes('gis') || slug.includes('mumbai');
  };

  return (
    <section id="projects" className="py-16 md:py-24 bg-[#FAF8F5] dark:bg-[#121417]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-[#EBE6DF] dark:border-[#272A30] gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#2D4A3E] dark:text-[#6E9E88] mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              05 · Selected Projects & Empirical Case Studies
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1917] dark:text-[#F3F4F6]">
              Selected Projects & Empirical Case Studies
            </h2>
            <p className="mt-2 text-sm text-[#78716C] dark:text-[#9CA3AF]">
              Empirical field studies, spatial econometrics, and policy data analytics across India.
            </p>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#2D4A3E] text-white border-[#2D4A3E] shadow-2xs dark:bg-[#6E9E88] dark:text-[#121417] dark:border-[#6E9E88]'
                  : 'bg-white text-[#57534E] border-[#EBE6DF] dark:bg-[#1A1D24] dark:text-[#9CA3AF] dark:border-[#272A30] hover:border-[#2D4A3E]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(filteredProjects.length > 0 ? filteredProjects : allProjects).map((project) => {
            const isMap = isMapProject(project.id, project.slug);
            const hasCover = Boolean(project.coverImage && project.coverImage.trim() !== '');
            const typeBadge = project.typeLabel || (project.category.includes('Coursework') ? 'Coursework' : 'Field Research');

            return (
              <div
                key={project.id}
                onClick={(e) => handleProjectClick(project.id, project.slug, e)}
                className="group cursor-pointer rounded-2xl bg-white dark:bg-[#1A1D24] border border-[#EBE6DF] dark:border-[#272A30] overflow-hidden hover:shadow-xl hover:border-[#2D4A3E]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Cover Header Container */}
                  {hasCover ? (
                    <div className={`relative h-60 sm:h-64 overflow-hidden ${isMap ? 'bg-[#1C1917] p-3' : 'bg-[#F5F4EE] dark:bg-[#232730]'}`}>
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        className={`w-full h-full ${isMap ? 'object-contain' : 'object-cover group-hover:scale-105'} transition-transform duration-700`}
                      />
                      <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white bg-[#1C1917]/85 backdrop-blur-md rounded-md">
                          {typeBadge}
                        </span>
                        <span className="px-2.5 py-1 text-[10px] font-semibold text-white/90 bg-[#2D4A3E]/85 backdrop-blur-md rounded-md">
                          {project.category}
                        </span>
                      </div>
                      
                      <div className="absolute top-4 right-4">
                        <span className="px-2 py-0.5 text-[10px] font-medium text-white/75 bg-black/50 backdrop-blur-md rounded-xs">
                          {isMap ? 'Spatial Map Output' : 'Illustrative image'}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative h-48 sm:h-52 p-6 bg-gradient-to-br from-[#2D4A3E]/10 via-[#FAF8F5] to-amber-500/5 dark:from-[#2D4A3E]/20 dark:via-[#1A1D24] dark:to-emerald-950/20 border-b border-[#EBE6DF] dark:border-[#272A30] flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#2D4A3E] dark:text-[#6E9E88] bg-white dark:bg-[#232730] border border-[#EBE6DF] dark:border-[#272A30] rounded-md shadow-2xs">
                          {typeBadge}
                        </span>
                        <span className="text-[11px] font-semibold text-[#78716C] dark:text-[#9CA3AF]">
                          {project.organisation}
                        </span>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#78716C] dark:text-[#9CA3AF] mb-1">
                          {project.category}
                        </div>
                        <h4 className="font-serif text-lg font-bold text-[#1C1917] dark:text-[#F3F4F6] line-clamp-2">
                          {project.title}
                        </h4>
                      </div>
                    </div>
                  )}

                  {/* Card Content */}
                  <div className="p-6 lg:p-7 space-y-4">
                    {/* Meta info */}
                    <div className="flex flex-wrap items-center justify-between text-xs text-[#78716C] dark:text-[#9CA3AF] gap-2">
                      <span className="font-semibold text-[#2D4A3E] dark:text-[#6E9E88]">{project.role}</span>
                      <span>{project.duration || project.year}</span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917] dark:text-[#F3F4F6] group-hover:text-[#2D4A3E] dark:group-hover:text-[#6E9E88] transition-colors leading-snug">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#57534E] dark:text-[#A1A1AA] leading-relaxed line-clamp-3">
                      {project.summary}
                    </p>

                    {/* Tool Tags */}
                    {project.toolsAndApproaches && project.toolsAndApproaches.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#78716C] dark:text-[#9CA3AF] flex items-center gap-1">
                          <Wrench className="w-3 h-3 text-[#2D4A3E] dark:text-[#6E9E88]" />
                          <span>Tools & Methods</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {project.toolsAndApproaches.slice(0, 5).map((tool, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 text-[11px] font-medium bg-[#F5F4EE] dark:bg-[#232730] text-[#44403C] dark:text-[#D1D5DB] rounded-md border border-[#EBE6DF] dark:border-[#272A30]"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Key Outcome Highlight Box */}
                    <div className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#232730] border border-[#EBE6DF] dark:border-[#272A30] text-xs text-[#44403C] dark:text-[#D1D5DB]">
                      <div className="font-bold text-[#2D4A3E] dark:text-[#6E9E88] uppercase tracking-wider text-[10px] flex items-center gap-1 mb-1">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>Key Outcome & Impact</span>
                      </div>
                      <p className="font-medium leading-relaxed">{project.keyOutcome || project.findings}</p>
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-6 lg:p-7 pt-0 space-y-4">
                  <div className="pt-4 border-t border-[#EBE6DF] dark:border-[#272A30] flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      {project.externalLink && (
                        <a
                          href={project.externalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-[#1C1917] dark:text-[#F3F4F6] bg-[#FAF8F5] dark:bg-[#232730] hover:bg-[#2D4A3E] hover:text-white rounded-lg border border-[#EBE6DF] dark:border-[#272A30] transition-all shadow-2xs"
                        >
                          <FolderGit2 className="w-3.5 h-3.5 text-[#2D4A3E] dark:text-[#6E9E88]" />
                          <span>Repository</span>
                        </a>
                      )}

                      {project.documentUrl && project.documentUrl.trim() !== '' && (
                        <a
                          href={project.documentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#2D4A3E] hover:bg-[#233A31] dark:bg-[#6E9E88] dark:hover:bg-[#5A8772] dark:text-[#121417] rounded-lg transition-all shadow-2xs"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Report PDF</span>
                        </a>
                      )}
                    </div>

                    <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#2D4A3E] dark:text-[#6E9E88] group-hover:translate-x-1 transition-transform">
                      Read Case Study <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
