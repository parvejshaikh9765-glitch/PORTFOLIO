import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { FileText, Download, ExternalLink, BookOpen, Eye } from 'lucide-react';
import { Publication } from '../../types';

export const ResearchSection: React.FC = () => {
  const { data, navigate } = usePortfolio();
  const publications = (data?.publications || []).filter(p => p.status === 'published');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalPub, setActiveModalPub] = useState<Publication | null>(null);

  const categories = ['All', 'Policy Brief', 'Working Paper', 'Research Paper'];

  const filteredPublications = selectedCategory === 'All'
    ? publications
    : publications.filter(p => p.category === selectedCategory);

  return (
    <section className="py-20 bg-[#FAF8F5] dark:bg-[#121417]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#EBE6DF] dark:border-[#272A30]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#78716C] dark:text-[#9CA3AF]">
              04 · Academic Repository & Policy Papers
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1C1917] dark:text-[#F3F4F6] mt-2">
              Research & Publications
            </h2>
          </div>

          {/* Interactive Category Filter Buttons */}
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0 p-1 bg-white dark:bg-[#1A1D24] rounded-lg border border-[#EBE6DF] dark:border-[#272A30]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#2D4A3E] text-white shadow-xs'
                    : 'text-[#57534E] dark:text-[#9CA3AF] hover:text-[#1C1917] dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Publications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPublications.map((pub) => (
            <div
              key={pub.id}
              className="group rounded-xl bg-white dark:bg-[#1A1D24] border border-[#EBE6DF] dark:border-[#272A30] p-6 flex flex-col justify-between hover:border-[#2D4A3E]/40 dark:hover:border-[#6E9E88]/40 transition-all duration-300 shadow-xs"
            >
              <div>
                {/* Meta kicker */}
                <div className="flex items-center justify-between text-xs text-[#78716C] dark:text-[#9CA3AF] mb-3">
                  <span className="font-semibold uppercase tracking-wider text-[#2D4A3E] dark:text-[#6E9E88]">
                    {pub.category}
                  </span>
                  <span>{pub.year}</span>
                </div>

                <h3 className="font-serif text-xl font-semibold text-[#1C1917] dark:text-[#F3F4F6] mb-3 leading-snug group-hover:text-[#2D4A3E] dark:group-hover:text-[#6E9E88] transition-colors">
                  {pub.title}
                </h3>

                <div className="text-xs font-medium text-[#78716C] dark:text-[#9CA3AF] mb-4">
                  {pub.institution} · Authors: {pub.authors.join(', ')}
                </div>

                <p className="text-xs text-[#57534E] dark:text-[#A1A1AA] leading-relaxed line-clamp-4 mb-6">
                  {pub.abstract}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#EBE6DF] dark:border-[#272A30] flex items-center justify-between gap-2 text-xs">
                <button
                  onClick={() => setActiveModalPub(pub)}
                  className="inline-flex items-center gap-1.5 font-semibold text-[#2D4A3E] dark:text-[#6E9E88] hover:underline"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Read Abstract
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate(`/contact`)}
                    className="p-1.5 rounded-md text-[#78716C] hover:text-[#2D4A3E] dark:text-[#9CA3AF] dark:hover:text-[#6E9E88] bg-[#FAF8F5] dark:bg-[#232730] hover:bg-[#EBE6DF] transition-colors flex items-center gap-1 text-[11px] font-medium"
                    title="Request Full Working Draft from Author"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Request Draft</span>
                  </button>
                  {pub.documentUrl && (
                    <a
                      href={pub.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-md text-[#78716C] hover:text-[#1C1917] dark:text-[#9CA3AF] dark:hover:text-white bg-[#FAF8F5] dark:bg-[#232730] hover:bg-[#EBE6DF] transition-colors"
                      title="Download Verified Profile & Research Brief (PDF)"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {pub.externalUrl && (
                    <a
                      href={pub.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-md text-[#78716C] hover:text-[#1C1917] dark:text-[#9CA3AF] dark:hover:text-white bg-[#FAF8F5] dark:bg-[#232730] hover:bg-[#EBE6DF] transition-colors"
                      title="External Institution Link"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Viewer for Abstract */}
        {activeModalPub && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="relative w-full max-w-2xl bg-white dark:bg-[#1A1D24] rounded-2xl p-8 border border-[#EBE6DF] dark:border-[#272A30] shadow-2xl max-h-[90vh] overflow-y-auto">
              
              <div className="flex items-center justify-between pb-4 border-b border-[#EBE6DF] dark:border-[#272A30]">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#2D4A3E] dark:text-[#6E9E88]">
                  {activeModalPub.category} · {activeModalPub.year}
                </span>
                <button
                  onClick={() => setActiveModalPub(null)}
                  className="text-[#78716C] hover:text-[#1C1917] dark:text-[#9CA3AF] dark:hover:text-white text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              <h3 className="font-serif text-2xl font-semibold text-[#1C1917] dark:text-[#F3F4F6] mt-4 mb-2">
                {activeModalPub.title}
              </h3>

              <div className="text-xs text-[#78716C] dark:text-[#9CA3AF] mb-6">
                Institution: {activeModalPub.institution} | Authors: {activeModalPub.authors.join(', ')}
              </div>

              <div className="space-y-4 text-sm text-[#44403C] dark:text-[#D1D5DB] leading-relaxed">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#78716C] dark:text-[#9CA3AF]">
                  Abstract & Key Policy Implications
                </h4>
                <p>{activeModalPub.abstract}</p>
              </div>

              <div className="pt-6 mt-8 border-t border-[#EBE6DF] dark:border-[#272A30] flex items-center justify-end gap-3">
                <button
                  onClick={() => {
                    setActiveModalPub(null);
                    navigate('/contact');
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#2D4A3E] dark:text-[#6E9E88] bg-[#2D4A3E]/10 dark:bg-[#6E9E88]/15 rounded-md hover:bg-[#2D4A3E]/20"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Request Full Draft from Author
                </button>
                {activeModalPub.documentUrl && (
                  <a
                    href={activeModalPub.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#2D4A3E] rounded-md shadow-xs hover:bg-[#233A31]"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download Profile & Research Brief
                  </a>
                )}
                <button
                  onClick={() => setActiveModalPub(null)}
                  className="px-4 py-2 text-xs font-medium text-[#78716C] dark:text-[#9CA3AF] bg-[#FAF8F5] dark:bg-[#232730] rounded-md hover:bg-[#EBE6DF]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
