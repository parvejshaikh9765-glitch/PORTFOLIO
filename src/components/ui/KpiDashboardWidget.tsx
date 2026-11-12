import React, { useState } from 'react';
import { BarChart3, Filter, PieChart, TrendingUp, CheckCircle, Database, Layers, FileSpreadsheet } from 'lucide-react';

export const KpiDashboardWidget: React.FC = () => {
  const [activeDataset, setActiveDataset] = useState<'esg' | 'water' | 'precarity'>('esg');

  const esgMetrics = {
    title: 'GreenTech Solutions ESG Performance Dashboard',
    partner: 'GreenTech Solutions · Power BI Corporate Sustainability Dashboard (Jan 2026)',
    villagesAssessed: '625 Employees',
    totalBeneficiaries: '86.99 MT Emissions',
    waterQualityPass: '95K kWh Power',
    schemesMonitored: '1,155 Training Hrs',
    pdfUrl: '/assets/aistudio/ESG_Dashboard_c6726ecf.pdf',
    breakdown: [
      { category: 'GHG Emissions (MT)', percentage: 87, count: '86.99 MT Total', status: 'July Peak 8.9 MT' },
      { category: 'Electricity Usage (kWh)', percentage: 95, count: '95.0K kWh Total', status: 'June Peak 9.5K kWh' },
      { category: 'Employee ESG Training', percentage: 78, count: '1,155 Total Hours', status: 'Safety & Compliance' },
      { category: 'Workforce Gender Inclusion', percentage: 22, count: '22 Women / 625 Total', status: 'Monthly Tracker' }
    ],
    kpis: [
      { label: 'Emissions Trend Peak', value: '8.9 MT GHG', change: 'Monitored across 12 months' },
      { label: 'Data Refresh Setup', value: 'Automated', change: 'Real-time Power BI integration' },
      { label: 'Original BI Dashboard', value: 'Power BI Desktop', change: 'PDF Document Verified' }
    ]
  };

  const waterMetrics = {
    title: 'Shahapur Rural Water Infrastructure Dashboard',
    partner: 'MySocially Impact Hub · Jal Jeevan Mission Monitoring',
    villagesAssessed: '52 Gram Panchayats',
    totalBeneficiaries: '12,480 Rural Households',
    waterQualityPass: '78.4%',
    schemesMonitored: '4 Water Supply Schemes',
    pdfUrl: '/assets/aistudio/Shahpur_f1664d21.pdf',
    breakdown: [
      { category: 'Piped Tap Connections', percentage: 64, count: '7,980 HHs', status: 'Operational' },
      { category: 'Handpumps & Borewells', percentage: 22, count: '2,740 HHs', status: 'Seasonal Shortage' },
      { category: 'Tanker Water Dependency', percentage: 14, count: '1,760 HHs', status: 'High Precarity' }
    ],
    kpis: [
      { label: 'Avg Distance to Source', value: '180m', change: '-45m improvement' },
      { label: 'Contamination Incidence', value: '8.2%', change: '-3.1% YoY' },
      { label: 'NGO Partners Mapped', value: '14 Active', change: 'Cross-functional' }
    ]
  };

  const precarityMetrics = {
    title: 'ICSSR Urban Transport Precarity & Gig Worker Dataset',
    partner: 'Indian Council of Social Science Research (ICSSR) · Mumbai Fieldwork',
    villagesAssessed: '100+ Driver Interviews',
    totalBeneficiaries: 'Informal & App Drivers',
    waterQualityPass: '68.2%',
    schemesMonitored: 'Social Protection Void',
    pdfUrl: undefined,
    breakdown: [
      { category: 'Auto-Rickshaw Drivers', percentage: 48, count: '48 Drivers', status: 'High Debt Ratio' },
      { category: 'App-Based Cab Drivers', percentage: 34, count: '34 Drivers', status: 'Platform Penalty' },
      { category: 'Traditional Kali-Peeli Taxis', percentage: 18, count: '18 Drivers', status: 'Income Decline' }
    ],
    kpis: [
      { label: 'Avg Shift Duration', value: '13.8 Hours', change: 'High fatigue risk' },
      { label: 'Lack Health Insurance', value: '82.5%', change: 'Critical vulnerability' },
      { label: 'Avg Monthly Net Income', value: '₹14,200', change: 'After fuel & EMIs' }
    ]
  };

  const current = activeDataset === 'esg' ? esgMetrics : activeDataset === 'water' ? waterMetrics : precarityMetrics;

  return (
    <section className="py-12 md:py-16 bg-[#F5F4EE] dark:bg-[#121417]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Frame */}
        <div className="bg-white dark:bg-[#1A1D24] rounded-[32px] border border-[#E5E4DD] dark:border-[#272A30] shadow-xs p-8 lg:p-12 space-y-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-[#E5E4DD] dark:border-[#272A30]">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#2D4A3E] dark:text-[#6E9E88] mb-2 flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5" />
                Data Analytics & Power BI Demonstration
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1C1917] dark:text-[#F3F4F6]">
                Interactive KPI Monitoring Dashboard
              </h2>
            </div>

            {/* Dataset Switcher Buttons */}
            <div className="flex flex-wrap items-center gap-2 mt-4 md:mt-0 p-1 bg-[#F5F4EE] dark:bg-[#232730] rounded-xl border border-[#E5E4DD] dark:border-[#272A30]">
              <button
                onClick={() => setActiveDataset('esg')}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                  activeDataset === 'esg'
                    ? 'bg-[#2D4A3E] text-white shadow-2xs'
                    : 'text-[#57534E] dark:text-[#9CA3AF] hover:text-[#1C1917]'
                }`}
              >
                ESG Power BI (Jan 2026)
              </button>
              <button
                onClick={() => setActiveDataset('water')}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                  activeDataset === 'water'
                    ? 'bg-[#2D4A3E] text-white shadow-2xs'
                    : 'text-[#57534E] dark:text-[#9CA3AF] hover:text-[#1C1917]'
                }`}
              >
                Rural Water Survey
              </button>
              <button
                onClick={() => setActiveDataset('precarity')}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                  activeDataset === 'precarity'
                    ? 'bg-[#2D4A3E] text-white shadow-2xs'
                    : 'text-[#57534E] dark:text-[#9CA3AF] hover:text-[#1C1917]'
                }`}
              >
                ICSSR Precarity (STATA)
              </button>
            </div>
          </div>

          {/* Dataset Title & Meta */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#F5F4EE] dark:bg-[#232730] border border-[#E5E4DD] dark:border-[#272A30]">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#C8102E] dark:text-[#6E9E88] block">
                Active Analytical Dataset:
              </span>
              <h3 className="font-serif text-xl font-bold text-[#1C1917] dark:text-[#F3F4F6] mt-0.5">
                {current.title}
              </h3>
              <div className="text-xs text-[#78716C] dark:text-[#9CA3AF] mt-1">
                {current.partner}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {current.pdfUrl && (
                <a
                  href={current.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2D4A3E] dark:text-[#6E9E88] bg-white dark:bg-[#1A1D24] px-3 py-1.5 rounded-lg border border-[#E5E4DD] dark:border-[#272A30] hover:bg-[#2D4A3E] hover:text-white transition-all shadow-2xs shrink-0"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>View Full PDF Report</span>
                </a>
              )}
              <div className="flex items-center gap-2 text-xs font-semibold text-[#2D4A3E] dark:text-[#6E9E88] bg-white dark:bg-[#1A1D24] px-3 py-1.5 rounded-lg border border-[#E5E4DD] dark:border-[#272A30] shrink-0">
                <Database className="w-3.5 h-3.5" />
                <span>Verified Data</span>
              </div>
            </div>
          </div>

          {/* KPI Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-[#1A1D24] border border-[#E5E4DD] dark:border-[#272A30]">
              <span className="text-[11px] font-semibold text-[#78716C] dark:text-[#9CA3AF] block">Sample / Workforce</span>
              <span className="font-serif text-xl font-bold text-[#1C1917] dark:text-[#F3F4F6] mt-1 block">{current.villagesAssessed}</span>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-[#1A1D24] border border-[#E5E4DD] dark:border-[#272A30]">
              <span className="text-[11px] font-semibold text-[#78716C] dark:text-[#9CA3AF] block">Total Carbon / Impact</span>
              <span className="font-serif text-xl font-bold text-[#1C1917] dark:text-[#F3F4F6] mt-1 block">{current.totalBeneficiaries}</span>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-[#1A1D24] border border-[#E5E4DD] dark:border-[#272A30]">
              <span className="text-[11px] font-semibold text-[#78716C] dark:text-[#9CA3AF] block">Energy / Benchmark</span>
              <span className="font-serif text-xl font-bold text-[#2D4A3E] dark:text-[#6E9E88] mt-1 block">{current.waterQualityPass}</span>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-[#1A1D24] border border-[#E5E4DD] dark:border-[#272A30]">
              <span className="text-[11px] font-semibold text-[#78716C] dark:text-[#9CA3AF] block">ESG Training / Status</span>
              <span className="font-serif text-xl font-bold text-[#C8102E] dark:text-[#6E9E88] mt-1 block">{current.schemesMonitored}</span>
            </div>
          </div>

          {/* Visual Data Breakdown Bars */}
          <div className="p-6 rounded-2xl bg-[#F5F4EE] dark:bg-[#232730] border border-[#E5E4DD] dark:border-[#272A30] space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#78716C] dark:text-[#9CA3AF] flex items-center justify-between">
              <span>Categorical Indicator Breakdown</span>
              <span>Proportional Metric Volume</span>
            </h4>

            <div className="space-y-3">
              {current.breakdown.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#1C1917] dark:text-[#F3F4F6]">
                    <div className="flex items-center gap-2">
                      <span>{item.category}</span>
                      <span className="text-[10px] font-mono text-[#2D4A3E] dark:text-[#6E9E88] bg-white dark:bg-[#1A1D24] px-2 py-0.5 rounded border border-[#E5E4DD] dark:border-[#272A30]">
                        {item.count}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-[#78716C] dark:text-[#9CA3AF]">{item.status}</span>
                  </div>

                  {/* Bar */}
                  <div className="w-full h-3 bg-white dark:bg-[#1A1D24] rounded-full overflow-hidden border border-[#E5E4DD] dark:border-[#272A30] p-0.5">
                    <div
                      className="h-full bg-[#2D4A3E] dark:bg-[#6E9E88] rounded-full transition-all duration-700"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Secondary Analytical Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {current.kpis.map((kpi, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white dark:bg-[#1A1D24] border border-[#E5E4DD] dark:border-[#272A30] space-y-1"
              >
                <span className="text-[11px] font-semibold text-[#78716C] dark:text-[#9CA3AF] block">{kpi.label}</span>
                <div className="font-serif text-lg font-bold text-[#1C1917] dark:text-[#F3F4F6]">{kpi.value}</div>
                <div className="text-[10px] font-medium text-[#2D4A3E] dark:text-[#6E9E88]">{kpi.change}</div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

