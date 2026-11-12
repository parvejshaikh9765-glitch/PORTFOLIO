import React, { useEffect, useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowLeft, Calendar, Building, CheckCircle, Download, ExternalLink, Tag, Wrench, Layers, FolderGit2 } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailPageProps {
  identifier: string;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ identifier }) => {
  const { data, navigate } = usePortfolio();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (data?.projects) {
      const found = data.projects.find(p => p.slug === identifier || p.id === identifier);
      if (found) setProject(found);
    }
  }, [data, identifier]);

  if (!project) {
    return (
      <div className="py-24 max-w-7xl mx-auto px-4 text-center">
        <h2 className="font-serif text-2xl font-semibold text-[#1C1917] dark:text-[#F3F4F6]">
          Loading Project Case Study...
        </h2>
      </div>
    );
  }

  const relatedProjects = (data?.projects || [])
    .filter(p => p.id !== project.id && p.status === 'published')
    .slice(0, 2);

  return (
    <div className="py-12 bg-[#FAF8F5] dark:bg-[#121417] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Back Navigation Bar */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white bg-[#2D4A3E] hover:bg-[#233A31] dark:bg-[#6E9E88] dark:hover:bg-[#5A8772] dark:text-[#121417] rounded-lg transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Main Page</span>
          </button>
          <button
            onClick={() => navigate('/projects')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1C1917] dark:text-[#F3F4F6] bg-[#F5F4EE] dark:bg-[#232730] border border-[#EBE6DF] dark:border-[#272A30] hover:border-[#2D4A3E] rounded-lg transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#2D4A3E] dark:text-[#6E9E88]" />
            <span>Back to Projects List</span>
          </button>
        </div>

        {/* Title Header Block */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#78716C] dark:text-[#9CA3AF]">
            <span className="font-semibold uppercase tracking-wider text-[#2D4A3E] dark:text-[#6E9E88] bg-[#2D4A3E]/10 dark:bg-[#6E9E88]/15 px-3 py-1 rounded-md">
              {project.category}
            </span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1 font-medium">
              <Building className="w-3.5 h-3.5 text-[#2D4A3E] dark:text-[#6E9E88]" />
              {project.organisation}
            </span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1 font-medium">
              <Calendar className="w-3.5 h-3.5 text-[#2D4A3E] dark:text-[#6E9E88]" />
              {project.duration}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1C1917] dark:text-[#F3F4F6] leading-tight">
            {project.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="text-sm font-semibold text-[#2D4A3E] dark:text-[#6E9E88]">
              Role: {project.role}
            </div>

            {/* Header Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              {project.externalLink && (
                <a
                  href={project.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#1C1917] dark:text-[#F3F4F6] bg-white dark:bg-[#1A1D24] hover:bg-[#FAF8F5] dark:hover:bg-[#232730] border border-[#E5E4DD] dark:border-[#272A30] rounded-md shadow-xs transition-colors"
                >
                  <FolderGit2 className="w-4 h-4 text-[#2D4A3E] dark:text-[#6E9E88]" />
                  <span>Project Repository / Link</span>
                  <ExternalLink className="w-3 h-3 text-[#78716C]" />
                </a>
              )}

              {project.documentUrl && project.documentUrl !== '/assets/documents/Pravesh_Shaikh_CV.pdf' && (
                <a
                  href={project.documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#2D4A3E] hover:bg-[#233A31] rounded-md shadow-xs transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Project PDF Report</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="rounded-2xl overflow-hidden border border-[#EBE6DF] dark:border-[#272A30] shadow-md max-h-[480px]">
          <img
            src={project.coverImage}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Executive Summary Callout */}
        <div className="p-8 rounded-2xl bg-white dark:bg-[#1A1D24] border border-[#EBE6DF] dark:border-[#272A30] space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[#78716C] dark:text-[#9CA3AF]">
            Executive Overview
          </h2>
          <p className="text-base text-[#1C1917] dark:text-[#F3F4F6] leading-relaxed font-serif italic">
            "{project.summary}"
          </p>
        </div>

        {/* Structured Case Study Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Narrative Column */}
          <div className="lg:col-span-8 space-y-10 text-[#44403C] dark:text-[#D1D5DB] text-sm leading-relaxed">
            
            {/* Background & Context */}
            {project.context && (
              <div className="space-y-3">
                <h3 className="font-serif text-2xl font-semibold text-[#1C1917] dark:text-[#F3F4F6]">
                  Background & Socio-Economic Context
                </h3>
                <p className="whitespace-pre-line leading-relaxed">{project.context}</p>
              </div>
            )}

            {/* Problem Statement */}
            {project.problemStatement && (
              <div className="space-y-3 p-6 rounded-xl bg-[#FAF8F5] dark:bg-[#16181D] border-l-4 border-[#2D4A3E] dark:border-[#6E9E88]">
                <h3 className="font-serif text-xl font-semibold text-[#1C1917] dark:text-[#F3F4F6]">
                  Problem Statement
                </h3>
                <p className="leading-relaxed">{project.problemStatement}</p>
              </div>
            )}

            {/* Objectives */}
            {project.objectives && project.objectives.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-serif text-2xl font-semibold text-[#1C1917] dark:text-[#F3F4F6]">
                  Core Project Objectives
                </h3>
                <ul className="space-y-2">
                  {project.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-[#2D4A3E] dark:text-[#6E9E88] shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Methodology */}
            {project.methodology && (
              <div className="space-y-3">
                <h3 className="font-serif text-2xl font-semibold text-[#1C1917] dark:text-[#F3F4F6]">
                  Research Methodology
                </h3>
                <p className="whitespace-pre-line leading-relaxed">{project.methodology}</p>
              </div>
            )}

            {/* Activities Undertaken */}
            {project.activities && project.activities.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-serif text-2xl font-semibold text-[#1C1917] dark:text-[#F3F4F6]">
                  Field Activities & Execution
                </h3>
                <ul className="space-y-2">
                  {project.activities.map((act, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Layers className="w-4 h-4 text-[#2D4A3E] dark:text-[#6E9E88] shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Findings & Key Insights */}
            {project.findings && (
              <div className="space-y-3 p-6 rounded-xl bg-white dark:bg-[#1A1D24] border border-[#EBE6DF] dark:border-[#272A30]">
                <h3 className="font-serif text-xl font-semibold text-[#1C1917] dark:text-[#F3F4F6]">
                  Empirical Findings & Key Insights
                </h3>
                <p className="leading-relaxed">{project.findings}</p>
              </div>
            )}

            {/* Measured Outcomes */}
            {project.outcomes && project.outcomes.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-serif text-2xl font-semibold text-[#1C1917] dark:text-[#F3F4F6]">
                  Project Outcomes & Impact
                </h3>
                <ul className="space-y-2">
                  {project.outcomes.map((out, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs font-semibold text-[#2D4A3E] dark:text-[#6E9E88]">
                      <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{out}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Photo Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="space-y-4 pt-4">
                <h3 className="font-serif text-2xl font-semibold text-[#1C1917] dark:text-[#F3F4F6]">
                  Fieldwork Photography & Visual Documentation
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.gallery.map((img, i) => (
                    <div key={i} className="rounded-xl overflow-hidden border border-[#EBE6DF] dark:border-[#272A30]">
                      <img
                        src={img}
                        alt={`Gallery ${i + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Sidebar Column */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Meta Specifications Card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1D24] border border-[#EBE6DF] dark:border-[#272A30] space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#78716C] dark:text-[#9CA3AF]">
                Project Specifications
              </h4>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[#78716C] dark:text-[#9CA3AF] block">Organisation</span>
                  <span className="font-semibold text-[#1C1917] dark:text-[#F3F4F6]">{project.organisation}</span>
                </div>
                <div>
                  <span className="text-[#78716C] dark:text-[#9CA3AF] block">Duration</span>
                  <span className="font-semibold text-[#1C1917] dark:text-[#F3F4F6]">{project.duration}</span>
                </div>
                <div>
                  <span className="text-[#78716C] dark:text-[#9CA3AF] block">My Designation</span>
                  <span className="font-semibold text-[#2D4A3E] dark:text-[#6E9E88]">{project.role}</span>
                </div>
              </div>

              {/* Tools and Approaches */}
              {project.toolsAndApproaches && project.toolsAndApproaches.length > 0 && (
                <div className="pt-4 border-t border-[#EBE6DF] dark:border-[#272A30]">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#78716C] dark:text-[#9CA3AF] block mb-2 flex items-center gap-1">
                    <Wrench className="w-3.5 h-3.5 text-[#2D4A3E] dark:text-[#6E9E88]" />
                    Tools & Methodological Approaches
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.toolsAndApproaches.map((tool, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] text-[#44403C] dark:text-[#D1D5DB] bg-[#FAF8F5] dark:bg-[#232730] px-2.5 py-1 rounded-md border border-[#EBE6DF] dark:border-[#272A30]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* External / Repository Link */}
              {project.externalLink && (
                <div className="pt-4 border-t border-[#EBE6DF] dark:border-[#272A30]">
                  <a
                    href={project.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-xs font-semibold text-[#1C1917] dark:text-[#F3F4F6] bg-[#FAF8F5] dark:bg-[#232730] hover:bg-[#EBE6DF] dark:hover:bg-[#2D323E] border border-[#EBE6DF] dark:border-[#272A30] rounded-md transition-colors"
                  >
                    <FolderGit2 className="w-4 h-4 text-[#2D4A3E] dark:text-[#6E9E88]" />
                    <span>View Project Link / Repository</span>
                    <ExternalLink className="w-3 h-3 text-[#78716C]" />
                  </a>
                </div>
              )}

              {/* Document Download Link */}
              {project.documentUrl && project.documentUrl !== '/assets/documents/Pravesh_Shaikh_CV.pdf' && (
                <div className="pt-4 border-t border-[#EBE6DF] dark:border-[#272A30]">
                  <a
                    href={project.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#2D4A3E] hover:bg-[#233A31] rounded-md transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Project PDF Report</span>
                  </a>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
