import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ResearchPage } from './pages/ResearchPage';
import { ResumePage } from './pages/ResumePage';
import { ContactPage } from './pages/ContactPage';
import { CustomPageView } from './pages/CustomPageView';
import { AdminLayout } from './admin/AdminLayout';

const AppContent: React.FC = () => {
  const { currentPath, loading, error, navigate } = usePortfolio();

  // If path starts with /admin, render the admin dashboard directly
  if (currentPath.startsWith('/admin')) {
    return <AdminLayout />;
  }

  // Parse paths
  let pageComponent = <HomePage />;
  if (currentPath === '/about') {
    pageComponent = <AboutPage />;
  } else if (currentPath === '/experience') {
    pageComponent = <ExperiencePage />;
  } else if (currentPath === '/projects') {
    pageComponent = <ProjectsPage />;
  } else if (currentPath.startsWith('/projects/')) {
    const identifier = currentPath.replace('/projects/', '');
    pageComponent = <ProjectDetailPage identifier={identifier} />;
  } else if (currentPath === '/research') {
    pageComponent = <ResearchPage />;
  } else if (currentPath === '/resume') {
    pageComponent = <ResumePage />;
  } else if (currentPath === '/contact') {
    pageComponent = <ContactPage />;
  } else if (currentPath.startsWith('/pages/')) {
    const slug = currentPath.replace('/pages/', '');
    pageComponent = <CustomPageView slug={slug} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#121417] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#2D4A3E] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-serif text-lg font-semibold text-[#1C1917] dark:text-[#F3F4F6]">
            Loading Pravesh Shaikh Portfolio & CV...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#121417] flex items-center justify-center p-4">
        <div className="max-w-md bg-white dark:bg-[#1A1D24] p-8 rounded-2xl border border-red-200 text-center space-y-4">
          <h2 className="font-serif text-2xl font-semibold text-red-600">
            Error Loading Data
          </h2>
          <p className="text-xs text-[#57534E] leading-relaxed">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#2D4A3E] rounded-md"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  const isHomePage = currentPath === '/';

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] dark:bg-[#121417] text-[#1C1917] dark:text-[#F3F4F6] transition-colors">
      <Navbar />
      
      {/* Sticky Back to Main Page Bar for Subpages */}
      {!isHomePage && (
        <div className="bg-white/90 dark:bg-[#1A1D24]/90 backdrop-blur-md border-b border-[#E5E4DD] dark:border-[#272A30] py-2.5 px-4 sm:px-6 lg:px-8 sticky top-20 z-30 transition-all">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#2D4A3E] dark:text-[#6E9E88] bg-[#F5F4EE] hover:bg-[#2D4A3E] hover:text-white dark:bg-[#232730] dark:hover:bg-[#6E9E88] dark:hover:text-[#121417] rounded-lg transition-all shadow-2xs cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Main Page</span>
            </button>
            
            <span className="text-xs font-semibold text-[#78716C] dark:text-[#9CA3AF] hidden sm:inline-block">
              Section: <span className="text-[#1C1917] dark:text-[#F3F4F6] font-serif font-bold capitalize">{currentPath.replace('/', '').replace('-', ' ')}</span>
            </span>
          </div>
        </div>
      )}

      <main className="flex-1">
        {pageComponent}
      </main>
      <Footer />
    </div>
  );
};

export function App() {
  return (
    <PortfolioProvider>
      <AppContent />
    </PortfolioProvider>
  );
}

export default App;
