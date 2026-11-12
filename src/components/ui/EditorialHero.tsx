import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ArrowRight, Sparkles, Building2, BookOpen, Layers } from 'lucide-react';

interface EditorialHeroProps {
  onOpenFastTrack?: () => void;
}

export const EditorialHero: React.FC<EditorialHeroProps> = ({ onOpenFastTrack }) => {
  const { data, navigate } = usePortfolio();
  const profile = data?.profile;

  const handleExploreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/projects');
  };

  return (
    <section id="overview" className="relative py-4 md:py-6 overflow-hidden bg-[#F5F4EE] dark:bg-[#121417]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Card Frame with Compact Viewport Height */}
        <div className="bg-white dark:bg-[#1A1D24] rounded-[28px] border border-[#E5E4DD] dark:border-[#272A30] shadow-xs p-6 lg:p-8 space-y-6">
          
          {/* Eyebrow line above headline */}
          <div className="text-xs font-bold uppercase tracking-widest text-[#2D4A3E] dark:text-[#6E9E88] flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#2D4A3E] dark:bg-[#6E9E88]" />
            <span>Development · Public Policy · Sustainability · Communities</span>
          </div>

          {/* Hero Split Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Typographic Impact & Narrative */}
            <div className="lg:col-span-7 space-y-4">
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1C1917] dark:text-[#F3F4F6] leading-[1.15]">
                I turn field <span className="font-serif italic text-[#C8102E] dark:text-[#E53E3E]">evidence</span> into policy-ready insight.
              </h1>

              {/* Single Sentence Paragraph */}
              <p className="text-base sm:text-lg text-[#292524] dark:text-[#E7E5E4] leading-relaxed max-w-2xl font-normal">
                Master's student in Development Studies at TISS Mumbai, combining field research, spatial analysis and dashboards to study livelihoods, urban precarity and sustainability.
              </p>

              {/* Three Small Proof Chips */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#2D4A3E]/10 text-[#2D4A3E] dark:bg-[#6E9E88]/15 dark:text-[#6E9E88] border border-[#2D4A3E]/20 dark:border-[#6E9E88]/30">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Swiss Academy (SALS)</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#C8102E]/10 text-[#C8102E] dark:bg-[#E53E3E]/15 dark:text-[#E53E3E] border border-[#C8102E]/20 dark:border-[#E53E3E]/30">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>ICSSR Fieldwork</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-900 dark:bg-amber-400/15 dark:text-amber-300 border border-amber-500/20 dark:border-amber-400/30">
                  <Layers className="w-3.5 h-3.5" />
                  <span>DEF Artisan Livelihoods</span>
                </span>
              </div>

              {/* Action Buttons: Explore Projects + 30-second overview */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="/projects"
                  onClick={handleExploreClick}
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#2D4A3E] hover:bg-[#233A31] dark:bg-[#6E9E88] dark:hover:bg-[#5A8772] dark:text-[#121417] rounded-full shadow-sm transition-all cursor-pointer"
                >
                  <span>Explore Projects</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                {onOpenFastTrack && (
                  <button
                    onClick={onOpenFastTrack}
                    className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#1C1917] dark:text-[#F3F4F6] bg-[#F5F4EE] dark:bg-[#232730] border border-[#E5E4DD] dark:border-[#272A30] hover:bg-[#EBEADF] dark:hover:bg-[#2D323E] rounded-full transition-all shadow-2xs cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-[#C8102E] dark:text-[#6E9E88]" />
                    <span>30-second overview</span>
                  </button>
                )}
              </div>

              {/* Toolkit Split: Tools vs Methods */}
              <div className="pt-4 border-t border-[#E5E4DD] dark:border-[#272A30] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold uppercase tracking-wider text-[#1C1917] dark:text-[#F3F4F6]">Tools:</span>
                  <div className="flex items-center gap-1.5 font-semibold text-[#1C1917] dark:text-[#F3F4F6]">
                    <span className="px-2 py-0.5 rounded bg-[#F5F4EE] dark:bg-[#232730] border border-[#E5E4DD] dark:border-[#272A30]">Python</span>
                    <span className="px-2 py-0.5 rounded bg-[#F5F4EE] dark:bg-[#232730] border border-[#E5E4DD] dark:border-[#272A30]">Power BI</span>
                    <span className="px-2 py-0.5 rounded bg-[#F5F4EE] dark:bg-[#232730] border border-[#E5E4DD] dark:border-[#272A30]">STATA</span>
                    <span className="px-2 py-0.5 rounded bg-[#F5F4EE] dark:bg-[#232730] border border-[#E5E4DD] dark:border-[#272A30]">QGIS</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-bold uppercase tracking-wider text-[#1C1917] dark:text-[#F3F4F6]">Methods:</span>
                  <div className="flex items-center gap-1.5 font-semibold text-[#1C1917] dark:text-[#F3F4F6]">
                    <span className="px-2 py-0.5 rounded bg-[#F5F4EE] dark:bg-[#232730] border border-[#E5E4DD] dark:border-[#272A30]">Field Research</span>
                    <span className="px-2 py-0.5 rounded bg-[#F5F4EE] dark:bg-[#232730] border border-[#E5E4DD] dark:border-[#272A30]">World Bank ESF</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Editorial Portrait */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm lg:max-w-none">
                <div className="overflow-hidden rounded-2xl border border-[#E5E4DD] dark:border-[#272A30] bg-[#F5F4EE] dark:bg-[#1A1D24] shadow-md">
                  <img
                    src={profile?.portraitUrl || '/src/assets/images/hero_portrait_pravesh_1794261203775.jpg'}
                    alt="Pravesh Shaikh Portrait"
                    referrerPolicy="no-referrer"
                    className="w-full h-[280px] sm:h-[320px] lg:h-[350px] object-cover object-top hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Photo Caption */}
                  <div className="p-3 bg-white dark:bg-[#1A1D24] border-t border-[#E5E4DD] dark:border-[#272A30] flex items-center justify-between text-xs text-[#78716C] dark:text-[#9CA3AF]">
                    <div>
                      <span className="font-serif italic font-semibold text-[#1C1917] dark:text-[#E5E7EB] block">Pravesh Shaikh</span>
                      <span className="text-[11px]">TISS Mumbai '27 · Development Studies</span>
                    </div>
                    <span className="text-[11px] font-semibold text-[#2D4A3E] dark:text-[#6E9E88] bg-[#2D4A3E]/10 dark:bg-[#6E9E88]/15 px-2.5 py-1 rounded-full">
                      Postgraduate Scholar
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

