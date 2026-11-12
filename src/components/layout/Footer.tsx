import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ArrowUp, Linkedin, Github, Mail, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const { data, navigate } = usePortfolio();
  const profile = data?.profile;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <footer className="bg-[#1C1917] text-[#E7E5E4] pt-16 pb-12 border-t border-[#292524]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-[#292524]">
          
          {/* Col 1: Brand & Academic Statement */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-serif text-3xl font-semibold text-white tracking-tight">
              Pravesh Shaikh
            </span>
            <p className="text-sm text-[#A8A29E] leading-relaxed max-w-md">
              Postgraduate Scholar in Development Studies at the Tata Institute of Social Sciences (TISS), Mumbai. Bridging empirical social research, urban spatial governance, and community livelihoods.
            </p>
            <div className="flex items-center gap-4 pt-2">
              {profile?.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-[#A8A29E] hover:text-white bg-[#292524] hover:bg-[#383330] rounded-md transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {profile?.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-[#A8A29E] hover:text-white bg-[#292524] hover:bg-[#383330] rounded-md transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="p-2 text-[#A8A29E] hover:text-white bg-[#292524] hover:bg-[#383330] rounded-md transition-colors"
                  aria-label="Email Pravesh Shaikh"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#78716C]">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-[#D6D3D1]">
              <li>
                <a href="/" onClick={(e) => handleNavClick('/', e)} className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" onClick={(e) => handleNavClick('/about', e)} className="hover:text-white transition-colors">
                  About & Background
                </a>
              </li>
              <li>
                <a href="/experience" onClick={(e) => handleNavClick('/experience', e)} className="hover:text-white transition-colors">
                  Experience & Fieldwork
                </a>
              </li>
              <li>
                <a href="/projects" onClick={(e) => handleNavClick('/projects', e)} className="hover:text-white transition-colors">
                  Projects & Case Studies
                </a>
              </li>
              <li>
                <a href="/research" onClick={(e) => handleNavClick('/research', e)} className="hover:text-white transition-colors">
                  Research & Publications
                </a>
              </li>
              <li>
                <a href="/skills" onClick={(e) => handleNavClick('/skills', e)} className="hover:text-white transition-colors">
                  Skills & Competencies
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Research Themes & Administration */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#78716C]">
              Research Focus
            </h4>
            <div className="text-xs text-[#A8A29E] space-y-1.5">
              <p>· Urban Governance & Walkability</p>
              <p>· ESG & CSR Framework Alignment</p>
              <p>· Traditional Artisan Digital Empowerment</p>
              <p>· Sustainable Rural Livelihoods & MEL</p>
            </div>

            <div className="pt-4">
              <a
                href="/admin"
                onClick={(e) => handleNavClick('/admin', e)}
                className="inline-flex items-center gap-2 text-xs font-medium text-[#A8A29E] hover:text-white transition-colors"
              >
                <Shield className="w-3.5 h-3.5 text-[#6E9E88]" />
                Admin Dashboard & CMS Portal
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78716C]">
          <div>
            © {new Date().getFullYear()} Pravesh Shaikh. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Tata Institute of Social Sciences, Mumbai</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-[#A8A29E] hover:text-white transition-colors focus:outline-none"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
