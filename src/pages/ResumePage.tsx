import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { FileDown, Printer, Mail, MapPin, Linkedin, GraduationCap, Briefcase, Award, CheckCircle, Phone, BookOpen, Users } from 'lucide-react';

export const ResumePage: React.FC = () => {
  const { data } = usePortfolio();
  const profile = data?.profile;
  const experience = data?.experience || [];
  const education = data?.education || [];
  const publications = data?.publications || [];
  const skillCategories = data?.skillCategories || [];
  const positions = data?.positionsOfResponsibility || [];
  const certifications = data?.certifications || [];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-12 bg-[#FAF8F5] dark:bg-[#121417] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EBE6DF] dark:border-[#272A30] print:hidden">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#78716C] dark:text-[#9CA3AF]">
              Integrated Curriculum Vitae
            </span>
            <h1 className="font-serif text-3xl font-semibold text-[#1C1917] dark:text-[#F3F4F6] mt-1">
              Pravesh Shaikh — Official CV
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-[#44403C] dark:text-[#D1D5DB] bg-white dark:bg-[#1A1D24] border border-[#EBE6DF] dark:border-[#272A30] rounded-md hover:bg-[#FAF8F5]"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Resume</span>
            </button>
            <a
              href={profile?.cvUrl || '/assets/documents/Pravesh_Shaikh_CV.pdf'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#2D4A3E] hover:bg-[#233A31] rounded-md shadow-xs"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Download PDF File</span>
            </a>
          </div>
        </div>

        {/* Printable Resume Sheet Styled to Match Original Document */}
        <div className="bg-white dark:bg-[#1A1D24] p-8 sm:p-12 rounded-2xl border border-[#EBE6DF] dark:border-[#272A30] shadow-sm space-y-8 text-[#1C1917] dark:text-[#F3F4F6]">
          
          {/* Header Block with Links & Phone */}
          <div className="pb-6 border-b border-[#EBE6DF] dark:border-[#272A30] space-y-2 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
                  Pravesh Shaikh
                </h2>
                <div className="text-sm font-semibold text-[#2D4A3E] dark:text-[#6E9E88] mt-1">
                  M.A. Development Studies Scholar · TISS Mumbai
                </div>
              </div>

              {/* Verified Contact Details from CV */}
              <div className="text-xs text-[#57534E] dark:text-[#A1A1AA] space-y-1 text-center sm:text-right">
                <div className="flex items-center sm:justify-end gap-1.5 font-medium">
                  <Phone className="w-3.5 h-3.5 text-[#2D4A3E] dark:text-[#6E9E88]" />
                  <span>+91 7972246347</span>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#2D4A3E] dark:text-[#6E9E88]" />
                  <a href={`mailto:${profile?.email}`} className="hover:underline">{profile?.email}</a>
                </div>
                <div className="flex items-center sm:justify-end gap-2 text-[11px] pt-1">
                  {profile?.linkedin && (
                    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#2D4A3E] dark:text-[#6E9E88] font-semibold hover:underline">
                      LinkedIn
                    </a>
                  )}
                  <span>·</span>
                  {profile?.github && (
                    <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-[#2D4A3E] dark:text-[#6E9E88] font-semibold hover:underline">
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ACADEMIC PROFILE TABLE */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#2D4A3E] dark:text-[#6E9E88] border-b-2 border-[#2D4A3E] pb-1">
              Academic Profile
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-[#EBE6DF] dark:border-[#272A30]">
                <thead className="bg-[#FAF8F5] dark:bg-[#232730] font-semibold text-[#1C1917] dark:text-[#F3F4F6]">
                  <tr>
                    <th className="p-2.5 border-b border-r border-[#EBE6DF] dark:border-[#272A30]">Degree</th>
                    <th className="p-2.5 border-b border-r border-[#EBE6DF] dark:border-[#272A30]">Institution</th>
                    <th className="p-2.5 border-b border-r border-[#EBE6DF] dark:border-[#272A30]">Score</th>
                    <th className="p-2.5 border-b border-[#EBE6DF] dark:border-[#272A30]">Year</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EBE6DF] dark:divide-[#272A30]">
                  {education.map((edu) => (
                    <tr key={edu.id}>
                      <td className="p-2.5 font-semibold border-r border-[#EBE6DF] dark:border-[#272A30]">{edu.degree}</td>
                      <td className="p-2.5 border-r border-[#EBE6DF] dark:border-[#272A30]">{edu.institution}</td>
                      <td className="p-2.5 font-bold text-[#2D4A3E] dark:text-[#6E9E88] border-r border-[#EBE6DF] dark:border-[#272A30]">{edu.score || 'N/A'}</td>
                      <td className="p-2.5">{edu.year}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* EXPERIENCE */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#2D4A3E] dark:text-[#6E9E88] border-b-2 border-[#2D4A3E] pb-1">
              Professional & Field Experience
            </h3>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs">
                    <div>
                      <span className="font-bold text-sm text-[#1C1917] dark:text-[#F3F4F6]">{exp.designation}</span>
                      <span className="text-[#57534E] dark:text-[#A1A1AA] font-medium"> — {exp.organisation} ({exp.type})</span>
                    </div>
                    <span className="font-mono text-[#78716C] dark:text-[#9CA3AF] text-[11px] shrink-0">{exp.duration}</span>
                  </div>
                  {exp.responsibilities && (
                    <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-[#44403C] dark:text-[#D1D5DB] leading-relaxed">
                      {exp.responsibilities.map((resp, rIdx) => (
                        <li key={rIdx}>{resp}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* POSITION OF RESPONSIBILITY */}
          {positions.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#2D4A3E] dark:text-[#6E9E88] border-b-2 border-[#2D4A3E] pb-1">
                Position of Responsibility
              </h3>
              <div className="space-y-4">
                {positions.map((pos) => (
                  <div key={pos.id} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span>{pos.role} — {pos.institution}</span>
                      <span className="font-mono text-[#78716C] font-normal text-[11px]">{pos.duration}</span>
                    </div>
                    <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-[#44403C] dark:text-[#D1D5DB] leading-relaxed">
                      {pos.points.map((pt, pIdx) => (
                        <li key={pIdx}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DISSERTATION & RESEARCH */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#2D4A3E] dark:text-[#6E9E88] border-b-2 border-[#2D4A3E] pb-1">
              Dissertation & Research
            </h3>
            <div className="p-4 rounded-lg bg-[#FAF8F5] dark:bg-[#232730] border border-[#EBE6DF] dark:border-[#272A30] space-y-2 text-xs">
              <div className="font-bold text-sm text-[#1C1917] dark:text-[#F3F4F6]">
                Digitalisation & Digital Behaviour · TISS Mumbai
              </div>
              <div className="font-semibold text-[#2D4A3E] dark:text-[#6E9E88]">
                "Social Media, Algorithmic Influence and Digital Behaviour Among College Students in Jalna Town, Maharashtra"
              </div>
              <p className="text-[#57534E] dark:text-[#D1D5DB] leading-relaxed">
                Examines social media usage patterns, platform choice, algorithmically curated content, online engagement, and purchasing behaviour among college students.
              </p>
            </div>
          </div>

          {/* SKILLS TABLE */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#2D4A3E] dark:text-[#6E9E88] border-b-2 border-[#2D4A3E] pb-1">
              Technical & Professional Skills
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-[#EBE6DF] dark:border-[#272A30]">
                <tbody className="divide-y divide-[#EBE6DF] dark:divide-[#272A30]">
                  {skillCategories.map((cat) => (
                    <tr key={cat.id}>
                      <td className="p-2.5 font-bold w-48 bg-[#FAF8F5] dark:bg-[#232730] border-r border-[#EBE6DF] dark:border-[#272A30] text-[#1C1917] dark:text-[#F3F4F6]">
                        {cat.name}
                      </td>
                      <td className="p-2.5 text-[#44403C] dark:text-[#D1D5DB]">
                        {cat.skills.map((s) => s.name).join(', ')}
                      </td>
                    </tr>
                  ))}
                  {certifications.length > 0 && (
                    <tr>
                      <td className="p-2.5 font-bold w-48 bg-[#FAF8F5] dark:bg-[#232730] border-r border-[#EBE6DF] dark:border-[#272A30] text-[#1C1917] dark:text-[#F3F4F6]">
                        Certifications
                      </td>
                      <td className="p-2.5 text-[#44403C] dark:text-[#D1D5DB]">
                        {certifications.map((c) => `${c.title} (${c.issuer})`).join(' · ')}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
