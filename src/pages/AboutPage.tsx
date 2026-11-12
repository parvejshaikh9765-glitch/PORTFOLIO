import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { BookOpen, GraduationCap, MapPin, Heart, Target, Award, Shield, FileDown } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { data } = usePortfolio();
  const profile = data?.profile;

  return (
    <div className="py-16 bg-[#FAF8F5] dark:bg-[#121417]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Header */}
        <div className="pb-8 border-b border-[#EBE6DF] dark:border-[#272A30]">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#78716C] dark:text-[#9CA3AF]">
            Biography & Academic Journey
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-[#1C1917] dark:text-[#F3F4F6] mt-2">
            About Pravesh Shaikh
          </h1>
          <p className="text-base text-[#44403C] dark:text-[#D1D5DB] mt-3 max-w-2xl leading-relaxed">
            M.A. Development Studies Scholar at the Tata Institute of Social Sciences (TISS), Mumbai (7.37 CGPA). Specializing in urban precarity, digital inclusion, ESG strategy, and quantitative data analytics.
          </p>
        </div>

        {/* Bio Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Biography Narrative */}
          <div className="lg:col-span-7 space-y-6 text-[#44403C] dark:text-[#D1D5DB] text-base leading-relaxed">
            <h2 className="font-serif text-2xl font-semibold text-[#1C1917] dark:text-[#F3F4F6]">
              Academic & Professional Trajectory
            </h2>
            
            <p>
              Pravesh Shaikh is a postgraduate researcher and development practitioner pursuing an M.A. in Development Studies at the Tata Institute of Social Sciences (TISS), Mumbai (7.37 CGPA). His academic foundation synthesizes a B.A. (Hons) in Geography and History from Dr. Babasaheb Ambedkar Marathwada University (6.9 CGPA) with rigorous contemporary socio-economic research methodologies.
            </p>

            <p>
              His practical portfolio spans impactful engagements across renowned development institutions: from remote programme consultancy with the <strong>Swiss Academy for Leadership and Sustainability (SALS Geneva)</strong> (authoring a 28-page market entry report, designing a 100-course sustainability framework, and mapping 54 institutions across Mumbai and Pune) to primary field research with the <strong>Indian Council of Social Science Research (ICSSR)</strong>, conducting 100+ interviews with migrant taxi, auto-rickshaw, and gig drivers in Mumbai regarding urban precarity and social protection.
            </p>

            <p>
              At the <strong>Digital Empowerment Foundation (DEF)</strong>, Pravesh coordinated ground operations for 300+ Solapuri (GI) Tag Chaddar artisans, administering KoBoToolbox baseline surveys across 330+ households, delivering digital literacy workshops to 150+ weavers, and co-authoring 9 chapters of a heritage coffee-table book. At <strong>MySocially Impact Hub</strong>, he led baseline surveys, root cause analyses, and Power BI KPI dashboards for rural water access across 42 hamlets in Shahapur Taluka.
            </p>

            <h3 className="font-serif text-xl font-semibold text-[#1C1917] dark:text-[#F3F4F6] pt-4">
              Research Philosophy & Analytical Methodologies
            </h3>
            <p>
              Pravesh combines quantitative econometrics and spatial GIS analytics (Python, Power BI, STATA, QGIS, Excel) with qualitative ethnographic field methods, institutional analysis, and participatory development frameworks (Sen's Capability Approach, World Bank ESF).
            </p>

            {/* Core Values Box */}
            <div className="p-6 rounded-xl bg-white dark:bg-[#1A1D24] border border-[#EBE6DF] dark:border-[#272A30] space-y-3 shadow-xs">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#2D4A3E] dark:text-[#6E9E88] flex items-center gap-2">
                <Target className="w-4 h-4" />
                Primary Practice Domains
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-[#1C1917] dark:text-[#F3F4F6]">
                <div className="p-2 rounded-md bg-[#FAF8F5] dark:bg-[#232730]">· Urban Precarity & Migrant Drivers</div>
                <div className="p-2 rounded-md bg-[#FAF8F5] dark:bg-[#232730]">· ESG & Sustainability Frameworks</div>
                <div className="p-2 rounded-md bg-[#FAF8F5] dark:bg-[#232730]">· Digital Inclusion & GI Artisans</div>
                <div className="p-2 rounded-md bg-[#FAF8F5] dark:bg-[#232730]">· Rural Infrastructure & Power BI</div>
              </div>
            </div>
          </div>

          {/* Right: Portrait & Affiliation Summary */}
          <div className="lg:col-span-5 space-y-8">
            <div className="rounded-2xl bg-white dark:bg-[#1A1D24] border border-[#EBE6DF] dark:border-[#272A30] overflow-hidden p-4 shadow-sm">
              <img
                src={profile?.portraitUrl || '/assets/aistudio/IMG_20260527_130121.jpg_fed4a925.jpeg'}
                alt="Pravesh Shaikh"
                referrerPolicy="no-referrer"
                className="w-full h-[400px] object-cover object-top rounded-xl"
              />
              <div className="pt-4 space-y-2 text-xs text-[#78716C] dark:text-[#9CA3AF]">
                <div className="font-serif text-lg font-semibold text-[#1C1917] dark:text-[#F3F4F6]">
                  Pravesh Shaikh
                </div>
                <div>Master's Scholar, Development Studies (7.37 CGPA)</div>
                <div>Tata Institute of Social Sciences (TISS), Mumbai</div>
                <div className="pt-2">
                  <a
                    href={profile?.cvUrl || '/assets/documents/Pravesh_Shaikh_CV.pdf'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#2D4A3E] hover:bg-[#233A31] rounded-md shadow-xs transition-colors w-full justify-center"
                  >
                    <FileDown className="w-4 h-4" />
                    <span>Download Official Verified CV (PDF)</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-[#1A1D24] border border-[#EBE6DF] dark:border-[#272A30] space-y-4 shadow-xs">
              <h3 className="font-serif text-lg font-semibold text-[#1C1917] dark:text-[#F3F4F6]">
                Key Institutional Engagements
              </h3>
              <div className="space-y-3 text-xs text-[#44403C] dark:text-[#D1D5DB]">
                <div className="flex items-start gap-2.5">
                  <GraduationCap className="w-4 h-4 text-[#2D4A3E] dark:text-[#6E9E88] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block">Tata Institute of Social Sciences (TISS), Mumbai</span>
                    <span>M.A. Development Studies (2025 — 2027) · 7.37 CGPA</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Award className="w-4 h-4 text-[#C8102E] dark:text-[#6E9E88] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block">Swiss Academy for Leadership and Sustainability</span>
                    <span>Program Consultant Intern, SALS Geneva (2025)</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <BookOpen className="w-4 h-4 text-[#2D4A3E] dark:text-[#6E9E88] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block">Digital Empowerment Foundation (DEF)</span>
                    <span>M.A. Fieldwork Intern & Researcher, Solapur (2026)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
