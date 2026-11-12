import React, { useState } from 'react';
import { MapPin, Navigation, Building2, Users, BarChart3, ArrowRight, Layers, Sparkles } from 'lucide-react';

interface FieldLocation {
  id: string;
  name: string;
  region: string;
  coordinates: string;
  lat: number;
  lng: number;
  projectTitle: string;
  partner: string;
  metrics: string;
  summary: string;
  tools: string[];
  xPercent: number; // For SVG map plotting
  yPercent: number;
}

export const FieldworkMapExplorer: React.FC = () => {
  const locations: FieldLocation[] = [
    {
      id: 'mumbai',
      name: 'Mumbai Metropolitan Region',
      region: 'Urban Maharashtra',
      coordinates: '19.0760° N, 72.8777° E',
      lat: 19.0760,
      lng: 72.8777,
      projectTitle: 'ICSSR Urban Precarity & Migrant Transport Labor Study',
      partner: 'Indian Council of Social Science Research (ICSSR)',
      metrics: '100+ Primary Field Interviews · 14.2h Avg. Shift Length',
      summary: 'Primary qualitative field research across Dadar, Kurla, Bandra, and Andheri transport hubs evaluating social protection deficits among auto, taxi, and gig drivers.',
      tools: ['Fieldwork', 'Qualitative Coding', 'Policy Mapping', 'STATA'],
      xPercent: 28,
      yPercent: 48
    },
    {
      id: 'solapur',
      name: 'Solapur Craft Cluster',
      region: 'Southern Maharashtra',
      coordinates: '17.6599° N, 75.9064° E',
      lat: 17.6599,
      lng: 75.9064,
      projectTitle: 'DEF GI Tag Solapuri Chaddar Heritage & Digital Capacity',
      partner: 'Digital Empowerment Foundation (DEF)',
      metrics: '300+ Artisans Trained · 1 Heritage Coffee-Table Book',
      summary: 'Ground field operations, artisan cooperative capacity building, and textile heritage documentation for Geographical Indication (GI) tagged weaving communities.',
      tools: ['Field Operations', 'Heritage Archiving', 'Digital Literacy', 'Stakeholder Outreach'],
      xPercent: 78,
      yPercent: 82
    },
    {
      id: 'shahapur',
      name: 'Shahapur Rural Water Belt',
      region: 'Thane District, Maharashtra',
      coordinates: '19.4500° N, 73.3333° E',
      lat: 19.4500,
      lng: 73.3333,
      projectTitle: 'Rural Water Infrastructure Survey & Power BI KPI Dashboard',
      partner: 'MySocially Impact Hub',
      metrics: '52 Villages Assessed · Power BI Interactive Dashboard Built',
      summary: 'Baseline survey and root-cause analysis on drinking water access, mapping local Jal Jeevan Mission schemes and building automated KPI monitoring dashboards.',
      tools: ['Power BI', 'Excel Advanced', 'Root-Cause Analysis', 'Baseline Surveys'],
      xPercent: 36,
      yPercent: 35
    },
    {
      id: 'pune',
      name: 'Pune & Mumbai Academic Corridor',
      region: 'Educational Hubs',
      coordinates: '18.5204° N, 73.8567° E',
      lat: 18.5204,
      lng: 73.8567,
      projectTitle: 'SALS Sustainability Portfolio & Institutional Benchmarking',
      partner: 'Swiss Academy for Leadership and Sustainability (SALS)',
      metrics: '54 Institutions Mapped · 100-Programme Portfolio Designed',
      summary: 'Curriculum benchmarking across 50+ higher education institutions and strategic stakeholder mapping to build a 10-cluster sustainability learning roadmap.',
      tools: ['Programme Strategy', 'Institutional Benchmarking', 'Curriculum Design'],
      xPercent: 45,
      yPercent: 62
    }
  ];

  const [activeLoc, setActiveLoc] = useState<FieldLocation>(locations[0]);

  return (
    <section className="py-12 md:py-16 bg-[#F5F4EE] dark:bg-[#121417]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Container */}
        <div className="bg-white dark:bg-[#1A1D24] rounded-[32px] border border-[#E5E4DD] dark:border-[#272A30] shadow-xs p-8 lg:p-12 space-y-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-[#E5E4DD] dark:border-[#272A30]">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#C8102E] dark:text-[#6E9E88] mb-2 flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5" />
                Geospatial Fieldwork & Research Locations
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1C1917] dark:text-[#F3F4F6]">
                Interactive Impact & Field Research Map
              </h2>
            </div>
            <p className="text-xs text-[#78716C] dark:text-[#9CA3AF] max-w-md mt-3 md:mt-0">
              Explore ground-level primary research sites, artisan clusters, and infrastructure monitoring sites across Maharashtra.
            </p>
          </div>

          {/* Interactive Split Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left: Map Visualization Container */}
            <div className="lg:col-span-7 bg-[#F5F4EE] dark:bg-[#232730] rounded-2xl border border-[#E5E4DD] dark:border-[#272A30] p-6 relative min-h-[380px] flex flex-col justify-between overflow-hidden">
              
              {/* Top Controls Overlay */}
              <div className="flex items-center justify-between text-xs text-[#78716C] dark:text-[#9CA3AF] z-10">
                <span className="font-semibold uppercase tracking-wider text-[#2D4A3E] dark:text-[#6E9E88] flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5" />
                  State of Maharashtra, India
                </span>
                <span className="font-mono text-[11px] bg-white dark:bg-[#1A1D24] px-2.5 py-1 rounded-md border border-[#E5E4DD] dark:border-[#272A30]">
                  {activeLoc.coordinates}
                </span>
              </div>

              {/* Stylized SVG Map Graphics Backdrop */}
              <div className="absolute inset-0 flex items-center justify-center opacity-30 dark:opacity-20 pointer-events-none p-8">
                <svg className="w-full h-full text-[#2D4A3E]" viewBox="0 0 500 350" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M 50,150 Q 100,80 200,90 T 350,120 T 450,220 T 380,310 T 220,300 T 120,240 Z" fill="rgba(45,74,62,0.05)" />
                  <path d="M 120,240 Q 150,180 280,180 T 420,200" strokeDasharray="4,4" />
                </svg>
              </div>

              {/* Interactive Location Pins */}
              <div className="relative w-full h-[280px]">
                {locations.map((loc) => {
                  const isSelected = activeLoc.id === loc.id;
                  return (
                    <button
                      key={loc.id}
                      onClick={() => setActiveLoc(loc)}
                      style={{ left: `${loc.xPercent}%`, top: `${loc.yPercent}%` }}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all group focus:outline-none ${
                        isSelected ? 'z-30 scale-110' : 'z-20 hover:scale-105'
                      }`}
                    >
                      <div className="relative flex items-center justify-center">
                        {isSelected && (
                          <span className="absolute w-8 h-8 rounded-full bg-[#C8102E]/20 dark:bg-[#6E9E88]/30 animate-ping" />
                        )}
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center border shadow-md transition-all ${
                            isSelected
                              ? 'bg-[#C8102E] text-white border-white dark:bg-[#6E9E88]'
                              : 'bg-white text-[#2D4A3E] dark:bg-[#1A1D24] dark:text-[#6E9E88] border-[#E5E4DD] dark:border-[#272A30]'
                          }`}
                        >
                          <MapPin className="w-4 h-4" />
                        </div>
                      </div>
                      <span
                        className={`mt-1 text-[11px] font-bold px-2 py-0.5 rounded-md whitespace-nowrap shadow-xs block ${
                          isSelected
                            ? 'bg-[#1C1917] text-white dark:bg-white dark:text-[#1C1917]'
                            : 'bg-white/90 text-[#44403C] dark:bg-[#1A1D24]/90 dark:text-[#D1D5DB] border border-[#E5E4DD] dark:border-[#272A30]'
                        }`}
                      >
                        {loc.name.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Map Footer Selector Buttons */}
              <div className="flex flex-wrap items-center gap-2 z-10 pt-2 border-t border-[#E5E4DD] dark:border-[#272A30]">
                {locations.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => setActiveLoc(loc)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      activeLoc.id === loc.id
                        ? 'bg-[#2D4A3E] text-white shadow-2xs'
                        : 'bg-white dark:bg-[#1A1D24] text-[#57534E] dark:text-[#9CA3AF] border border-[#E5E4DD] dark:border-[#272A30] hover:bg-[#EBEADF]'
                    }`}
                  >
                    {loc.name}
                  </button>
                ))}
              </div>

            </div>

            {/* Right: Active Site Card Details */}
            <div className="lg:col-span-5 p-6 md:p-8 rounded-2xl bg-[#F5F4EE] dark:bg-[#232730] border border-[#E5E4DD] dark:border-[#272A30] flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C8102E] dark:text-[#6E9E88] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {activeLoc.region}
                  </span>
                  <span className="text-[11px] font-mono text-[#78716C] dark:text-[#9CA3AF]">
                    {activeLoc.coordinates}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-semibold text-[#1C1917] dark:text-[#F3F4F6] leading-snug">
                  {activeLoc.projectTitle}
                </h3>

                <div className="text-xs font-semibold text-[#2D4A3E] dark:text-[#6E9E88]">
                  Partner: {activeLoc.partner}
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-[#1A1D24] border border-[#E5E4DD] dark:border-[#272A30] text-xs font-semibold text-[#1C1917] dark:text-[#F3F4F6]">
                  {activeLoc.metrics}
                </div>

                <p className="text-xs text-[#57534E] dark:text-[#A1A1AA] leading-relaxed">
                  {activeLoc.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5E4DD] dark:border-[#272A30] space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#78716C] dark:text-[#9CA3AF] block">
                  Methodologies & Analytical Tools Applied:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeLoc.tools.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-[11px] font-medium bg-white dark:bg-[#1A1D24] text-[#2D4A3E] dark:text-[#6E9E88] border border-[#E5E4DD] dark:border-[#272A30] rounded-md"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
