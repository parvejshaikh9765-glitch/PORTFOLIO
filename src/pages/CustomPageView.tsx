import React, { useEffect, useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { CustomPage } from '../types';
import { ArrowLeft, Calendar } from 'lucide-react';

export const CustomPageView: React.FC<{ slug: string }> = ({ slug }) => {
  const { data, navigate } = usePortfolio();
  const [page, setPage] = useState<CustomPage | null>(null);

  useEffect(() => {
    if (data?.customPages) {
      const found = data.customPages.find(p => p.slug === slug);
      if (found) setPage(found);
    }
  }, [data, slug]);

  if (!page) {
    return (
      <div className="py-24 max-w-4xl mx-auto px-4 text-center space-y-4">
        <h2 className="font-serif text-3xl font-bold text-[#1C1917] dark:text-[#F3F4F6]">
          Page Not Found
        </h2>
        <p className="text-sm text-[#78716C]">The requested page does not exist or is currently in draft.</p>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 text-xs font-semibold text-white bg-[#2D4A3E] rounded-md"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="py-16 bg-[#FAF8F5] dark:bg-[#121417] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#78716C] hover:text-[#1C1917] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="space-y-3 pb-6 border-b border-[#EBE6DF] dark:border-[#272A30]">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1C1917] dark:text-[#F3F4F6]">
            {page.title}
          </h1>
          {page.subtitle && (
            <p className="text-lg text-[#57534E] dark:text-[#D1D5DB] font-light leading-relaxed">
              {page.subtitle}
            </p>
          )}
          <div className="flex items-center gap-2 text-xs text-[#78716C] pt-2">
            <Calendar className="w-3.5 h-3.5 text-[#2D4A3E]" />
            <span>Updated {new Date(page.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="p-8 rounded-2xl bg-white dark:bg-[#1A1D24] border border-[#EBE6DF] dark:border-[#272A30] shadow-xs text-sm text-[#44403C] dark:text-[#D1D5DB] leading-relaxed whitespace-pre-line space-y-4 font-sans">
          {page.content}
        </div>
      </div>
    </div>
  );
};
