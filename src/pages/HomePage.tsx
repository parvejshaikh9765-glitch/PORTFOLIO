import React, { useState } from 'react';
import { EditorialHero } from '../components/ui/EditorialHero';
import { RecruiterJumpBar } from '../components/ui/RecruiterJumpBar';
import { RecruiterValuePropSection } from '../components/ui/RecruiterValuePropSection';
import { RecruiterFastTrackModal } from '../components/ui/RecruiterFastTrackModal';
import { VerifiedReportVaultSection } from '../components/ui/VerifiedReportVaultSection';
import { FieldworkMapExplorer } from '../components/ui/FieldworkMapExplorer';
import { KpiDashboardWidget } from '../components/ui/KpiDashboardWidget';
import { FieldworkMediaGalleryModal } from '../components/ui/FieldworkMediaGalleryModal';
import { AreasOfInterestSection } from '../components/ui/AreasOfInterestSection';
import { EducationSection } from '../components/ui/EducationSection';
import { ExperienceSection } from '../components/ui/ExperienceSection';
import { InternshipsSection } from '../components/ui/InternshipsSection';
import { SelectedProjectsSection } from '../components/ui/SelectedProjectsSection';
import { PositionsOfResponsibilitySection } from '../components/ui/PositionsOfResponsibilitySection';
import { SkillsSection } from '../components/ui/SkillsSection';
import { AchievementsSection } from '../components/ui/AchievementsSection';
import { ContactSection } from '../components/ui/ContactSection';
import { usePortfolio } from '../context/PortfolioContext';

export const HomePage: React.FC = () => {
  const [isFastTrackOpen, setIsFastTrackOpen] = useState(false);
  const { navigate } = usePortfolio();

  return (
    <div className="space-y-0">
      {/* 1. Profile Overview: Intro, summary, key skills & scan metrics */}
      <EditorialHero onOpenFastTrack={() => setIsFastTrackOpen(true)} />
      
      {/* Recruiter 1-Click Jump Index Bar */}
      <RecruiterJumpBar />

      <RecruiterValuePropSection onOpenFastTrack={() => setIsFastTrackOpen(true)} />
      <AreasOfInterestSection />

      {/* 2. Education */}
      <EducationSection />

      {/* 3. Work Experience */}
      <ExperienceSection />

      {/* 4. Internships */}
      <InternshipsSection />

      {/* 5. Projects */}
      <SelectedProjectsSection />

      {/* Verified PDF Research Reports & Feasibility Studies Vault */}
      <VerifiedReportVaultSection />

      {/* 6. Positions of Responsibility */}
      <PositionsOfResponsibilitySection />

      {/* 7. Skills & Certifications */}
      <SkillsSection />

      {/* 8. Achievements & Impact */}
      <AchievementsSection />

      {/* Interactive GIS Map & Power BI Widgets */}
      <FieldworkMapExplorer />
      <KpiDashboardWidget />
      <FieldworkMediaGalleryModal />

      {/* Contact Section */}
      <ContactSection />

      {/* Fast Track Modal */}
      <RecruiterFastTrackModal
        isOpen={isFastTrackOpen}
        onClose={() => setIsFastTrackOpen(false)}
        onOpenContact={() => navigate('/contact')}
      />
    </div>
  );
};
