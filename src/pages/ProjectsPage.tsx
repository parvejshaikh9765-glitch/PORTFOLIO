import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Search, ArrowUpRight, FolderGit2, Download, CheckCircle2, Wrench } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const { data, navigate } = usePortfolio();
  const projects = (data?.projects || []).filter(p => p.status === 'published');

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

  const toolsList = ['All Tools', 'Power BI', 'Python', 'STATA', 'QGIS', 'KoBoToolbox', 'R', 'World Bank ESF'];
  const [selectedTool, setSelectedTool] = useState('All Tools');

  const filteredProjects = projects.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesTool = selectedTool === 'All Tools' ||
      p.methodology.toLowerCase().includes(selectedTool.toLowerCase()) ||
      p.summary.toLowerCase().includes(selectedTool.toLowerCase()) ||
      (p.toolsAndApproaches && p.toolsAndApproaches.some(t => t.toLowerCase().includes(selectedTool.toLowerCase())));
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.organisation.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesTool && matchesSearch;
  });

  const handleProjectClick = (id: string, slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/projects/${slug || id}`);
  };

  const isMapProject = (id: string, slug: string) => {
    return id.includes('gis') || id.includes('mumbai_spatial') || slug.includes('gis') || slug.includes('mumbai');
  };

  return (
    <div className="py-16 bg-[#F5F4EE] dark:bg-[#121417] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="pb-8 border-b border-[#E5E4DD] dark:border-[#272A30]">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#2D4A3E] dark:text-[#6E9E88]">
            05 · Selected Projects & Empirical Case Studies
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-[#1C1917] dark:text-[#F3F4F6] mt-2">
            Projects & Fieldwork Case Studies
          </h1>
          <p className="text-base text-[#44403C] dark:text-[#D1D5DB] mt-3 max-w-2xl leading-relaxed">
            Detailed case studies documenting ground-level research, spatial econometrics, digital empowerment programs, and policy evaluations.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1D24] border border-[#E5E4DD] dark:border-[#272A30] shadow-xs space-y-4">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#78716C] dark:text-[#9CA3AF]" />
              <input
                type="text"
                placeholder="Search projects by keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-[#F5F4EE] dark:bg-[#232730] border border-[#E5E4DD] dark:border-[#2A2E38] rounded-md text-[#1C1917] dark:text-[#F3F4F6] focus:outline-none focus:border-[#2D4A3E]"
              />
            </div>

            {/* Interactive Category Segmented Control */}
            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[#2D4A3E] text-white shadow-xs'
                      : 'text-[#57534E] dark:text-[#9CA3AF] hover:text-[#1C1917] dark:hover:text-white bg-[#F5F4EE] dark:bg-[#232730]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Hard Technical Tool Filter Chips */}
          <div className="pt-3 border-t border-[#E5E4DD] dark:border-[#272A30] flex flex-wrap items-center gap-2 text-xs">
            <span className="font-bold text-[#1C1917] dark:text-[#F3F4F6] shrink-0">Filter by Tool / Method:</span>
            {toolsList.map((tool) => (
              <button
                key={tool}
                onClick={() => setSelectedTool(tool)}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${
                  selectedTool === tool
                    ? 'bg-[#2D4A3E] text-white font-bold shadow-2xs dark:bg-[#6E9E88] dark:text-black'
                    : 'bg-[#F5F4EE] dark:bg-[#232730] text-[#57534E] dark:text-[#A1A1AA] hover:text-[#1C1917]'
                }`}
              >
                {tool}
              </button>
            ))}
          </div>

        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
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
                  {hasCover ? (
                    <div className={`relative h-56 overflow-hidden ${isMap ? 'bg-[#1C1917] p-3' : 'bg-[#F5F4EE] dark:bg-[#232730]'}`}>
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        className={`w-full h-full ${isMap ? 'object-contain' : 'object-cover group-hover:scale-105'} transition-transform duration-700`}
                      />
                      <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white bg-[#1C1917]/85 backdrop-blur-md rounded-md">
                          {typeBadge}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative h-48 p-5 bg-gradient-to-br from-[#2D4A3E]/10 via-[#FAF8F5] to-amber-500/5 dark:from-[#2D4A3E]/20 dark:via-[#1A1D24] dark:to-emerald-950/20 border-b border-[#EBE6DF] dark:border-[#272A30] flex flex-col justify-between">
                      <span className="px-2 py-0.5 w-max text-[10px] font-bold uppercase tracking-wider text-[#2D4A3E] dark:text-[#6E9E88] bg-white dark:bg-[#232730] border border-[#EBE6DF] dark:border-[#272A30] rounded-md shadow-2xs">
                        {typeBadge}
                      </span>
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#78716C] dark:text-[#9CA3AF] mb-1">
                          {project.category}
                        </div>
                        <h4 className="font-serif text-base font-bold text-[#1C1917] dark:text-[#F3F4F6] line-clamp-2">
                          {project.title}
                        </h4>
                      </div>
                    </div>
                  )}

                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between text-xs text-[#78716C] dark:text-[#9CA3AF]">
                      <span className="font-semibold text-[#2D4A3E] dark:text-[#6E9E88]">{project.role}</span>
                      <span>{project.year}</span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-[#1C1917] dark:text-[#F3F4F6] group-hover:text-[#2D4A3E] dark:group-hover:text-[#6E9E88] transition-colors leading-snug">
                      {project.title}
                    </h3>

                    <p className="text-xs text-[#57534E] dark:text-[#A1A1AA] leading-relaxed line-clamp-3">
                      {project.summary}
                    </p>

                    {/* Tools */}
                    {project.toolsAndApproaches && project.toolsAndApproaches.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {project.toolsAndApproaches.slice(0, 4).map((tool, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 text-[10px] font-medium bg-[#F5F4EE] dark:bg-[#232730] text-[#44403C] dark:text-[#D1D5DB] rounded border border-[#EBE6DF] dark:border-[#272A30]"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Key Outcome */}
                    <div className="p-3 rounded-lg bg-[#FAF8F5] dark:bg-[#232730] border border-[#EBE6DF] dark:border-[#272A30] text-xs text-[#44403C] dark:text-[#D1D5DB]">
                      <div className="font-bold text-[#2D4A3E] dark:text-[#6E9E88] uppercase tracking-wider text-[9px] flex items-center gap-1 mb-0.5">
                        <CheckCircle2 className="w-3 h-3 shrink-0" />
                        <span>Key Outcome</span>
                      </div>
                      <p className="font-medium text-[11px] leading-snug line-clamp-2">{project.keyOutcome || project.findings}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#EBE6DF] dark:border-[#272A30]">
                    <div className="flex items-center gap-2">
                      {project.externalLink && (
                        <a
                          href={project.externalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-[#1C1917] dark:text-[#F3F4F6] bg-[#F5F4EE] dark:bg-[#232730] hover:bg-[#2D4A3E] hover:text-white rounded-lg border border-[#E5E4DD] dark:border-[#2A2E38] transition-colors"
                        >
                          <FolderGit2 className="w-3 h-3 text-[#2D4A3E] dark:text-[#6E9E88]" />
                          <span>Link</span>
                        </a>
                      )}

                      {project.documentUrl && project.documentUrl.trim() !== '' && (
                        <a
                          href={project.documentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-white bg-[#2D4A3E] hover:bg-[#233A31] rounded-lg transition-colors"
                        >
                          <Download className="w-3 h-3" />
                          <span>Report PDF</span>
                        </a>
                      )}
                    </div>

                    <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#2D4A3E] dark:text-[#6E9E88] group-hover:translate-x-1 transition-transform">
                      Case Study <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-[#1A1D24] rounded-xl border border-[#EBE6DF] dark:border-[#272A30]">
            <p className="text-sm text-[#78716C] dark:text-[#9CA3AF]">
              No projects found matching your search criteria.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
