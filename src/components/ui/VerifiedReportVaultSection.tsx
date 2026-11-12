import React from 'react';
import { FileText, Download, CheckCircle, ExternalLink, Shield, BookOpen, Layers } from 'lucide-react';

export const VerifiedReportVaultSection: React.FC = () => {
  const reports = [
    {
      id: 'rep_sals',
      title: 'SALS Geneva Indian Market Entry Feasibility & Curriculum Blueprint',
      pages: '28 Pages',
      institution: 'Swiss Academy for Leadership and Sustainability (Geneva-based Think Tank)',
      category: 'Strategic Feasibility & ESG',
      author: 'Pravesh Shaikh (Program Consultant)',
      url: '/assets/aistudio/SALS_India_Market_Entry_Report_6fe0b332.pdf',
      summary: 'Comprehensive 28-page market entry analysis mapping 54 higher education & corporate partners across Mumbai and Pune, curating a 100-course sustainability framework across 10 clusters.'
    },
    {
      id: 'rep_nss80',
      title: 'Digital Adaptation & Disadvantage in India: NSS 80th Round Econometric Evaluation',
      pages: '27 Pages',
      institution: 'Tata Institute of Social Sciences (TISS), Mumbai',
      category: 'Quantitative Policy Analysis',
      author: 'Pravesh Shaikh (Lead Researcher)',
      url: '/assets/aistudio/Digital_Adaptation_India__6aa5731b.pdf',
      summary: 'National microdata econometric study of 34,950 households and 142,065 individuals evaluating digital access, personal phone ownership, and gendered transactional capabilities.'
    },
    {
      id: 'rep_shahapur',
      title: 'Shahapur Rural Water Scarcity Baseline & NGO/CSR Partnership Mapping Report',
      pages: '14 Pages',
      institution: 'MySocially Impact Hub & TISS Mumbai',
      category: 'Rural Infrastructure & Power BI Analytics',
      author: 'Pravesh Shaikh (Project Management Intern)',
      url: '/assets/aistudio/Shahpur_f1664d21.pdf',
      summary: 'Baseline field research report examining water distress across 42 hamlets in Shahapur Taluka, detailing Katkari/Warli tribal precarity in Cluster A1 and mapping 12+ NGO/CSR funding partners.'
    },
    {
      id: 'rep_def',
      title: 'Solapuri GI Tag Chaddar Artisans Digital Empowerment Field Internship Monograph',
      pages: 'Field Monograph',
      institution: 'Digital Empowerment Foundation (DEF) & TISS Mumbai',
      category: 'Field Operations & Capacity Building',
      author: 'Pravesh Shaikh (M.A. Field Intern)',
      url: '/assets/aistudio/Internship_Repor2_d5d18d7d.pdf',
      summary: 'Official TISS M.A. field report covering KoBoToolbox baseline survey with 330+ weaver households, digital literacy workshops for 150+ artisans, and 9 heritage coffee table book chapters.'
    }
  ];

  return (
    <section id="reports" className="py-20 bg-[#FAF8F5] dark:bg-[#121417] border-t border-[#EBE6DF] dark:border-[#272A30]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-[#EBE6DF] dark:border-[#272A30]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#2D4A3E] dark:text-[#6E9E88] mb-1">
              <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>06 · Verified Primary Documents</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1C1917] dark:text-[#F3F4F6]">
              Research Reports & Document Vault
            </h2>
          </div>
          <p className="text-sm text-[#78716C] dark:text-[#9CA3AF] max-w-md mt-4 md:mt-0">
            Direct open-access download portal for Pravesh Shaikh's official policy papers, market entry feasibility studies, and fieldwork monographs.
          </p>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reports.map((doc) => (
            <div
              key={doc.id}
              className="p-8 rounded-2xl bg-white dark:bg-[#1A1D24] border border-[#EBE6DF] dark:border-[#272A30] space-y-5 hover:border-[#2D4A3E]/40 transition-all shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D4A3E] dark:text-[#6E9E88] bg-[#2D4A3E]/10 dark:bg-[#6E9E88]/15 px-3 py-1 rounded-md">
                    {doc.category}
                  </span>
                  <span className="text-xs font-semibold text-[#C8102E] dark:text-[#6E9E88] bg-[#C8102E]/10 dark:bg-[#6E9E88]/15 px-2.5 py-0.5 rounded-md">
                    {doc.pages}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-xl font-semibold text-[#1C1917] dark:text-[#F3F4F6] leading-snug">
                    {doc.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#57534E] dark:text-[#D1D5DB] mt-1">
                    {doc.institution}
                  </div>
                  <div className="text-[11px] font-medium text-[#78716C] dark:text-[#9CA3AF] mt-0.5">
                    {doc.author}
                  </div>
                </div>

                <p className="text-xs text-[#57534E] dark:text-[#A1A1AA] leading-relaxed">
                  {doc.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-[#EBE6DF] dark:border-[#272A30] flex items-center justify-between gap-3">
                <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Official PDF Report Attached</span>
                </div>

                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#2D4A3E] hover:bg-[#233A31] rounded-md shadow-xs transition-colors shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Report (PDF)</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
