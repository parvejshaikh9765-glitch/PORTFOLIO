export interface Profile {
  name: string;
  headline: string;
  shortBio: string;
  fullBio: string;
  academicBackground: string;
  location: string;
  email: string;
  phone?: string;
  linkedin: string;
  github?: string;
  twitter?: string;
  academicAffiliation: string;
  cvUrl: string;
  portraitUrl: string;
  heroBackgroundUrl: string;
  targetRoles?: string[];
  availability?: string;
  coreCompetencies?: string[];
  preferredLocations?: string;
}

export interface AreaOfInterest {
  id: string;
  title: string;
  description: string;
  iconName: string;
  order: number;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  organisation: string;
  duration: string;
  year: number;
  coverImage: string;
  summary: string;
  context: string;
  problemStatement: string;
  objectives: string[];
  role: string;
  methodology: string;
  toolsAndApproaches: string[];
  activities: string[];
  findings: string;
  outcomes: string[];
  gallery: string[];
  typeLabel?: 'Internship' | 'Coursework' | 'Field Research' | 'Institutional Tech';
  keyOutcome?: string;
  documentUrl?: string;
  externalLink?: string;
  isFeatured: boolean;
  status: 'published' | 'draft';
  createdAt: string;
  updatedAt: string;
}

export interface Publication {
  id: string;
  title: string;
  category: string; // 'Policy Brief' | 'Research Paper' | 'Working Paper' | 'Field Report' | 'Dissertation'
  institution: string;
  year: number;
  date: string;
  authors: string[];
  abstract: string;
  coverImage?: string;
  documentUrl?: string;
  externalUrl?: string;
  status: 'published' | 'draft';
  createdAt: string;
}

export interface Experience {
  id: string;
  designation: string;
  organisation: string;
  duration: string;
  location: string;
  type: 'Full-time' | 'Internship' | 'Academic' | 'Fellowship' | 'Remote' | 'On site' | 'Hybrid';
  description: string;
  responsibilities: string[];
  keyContributions: string[];
  impactMetrics?: string[]; // E.g. "100+ Field Interviews", "300+ Artisans Trained"
  logoUrl?: string;
  documentUrl?: string;
  websiteUrl?: string;
  order: number;
}

export interface PositionOfResponsibility {
  id: string;
  role: string;
  institution: string;
  duration: string;
  points: string[];
  order: number;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year?: string;
  url?: string;
  order: number;
}

export interface CustomPage {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  content: string;
  status: 'published' | 'draft';
  order: number;
  updatedAt: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  duration: string;
  year: number;
  score?: string; // e.g. 7.37 CGPA
  academicFocus: string;
  description: string;
  courses: string[];
  order: number;
}

export interface SkillItem {
  name: string;
  level?: string;
  description?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: SkillItem[];
  order: number;
}

export interface MediaFile {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  altText: string;
  folder: string;
  createdAt: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  organisation?: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'archived' | 'replied';
  createdAt: string;
}

export interface SeoMetadata {
  siteTitle: string;
  metaDescription: string;
  keywords: string;
  ogImage: string;
  canonicalUrl: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role?: string;
}

export interface PortfolioData {
  profile: Profile;
  areasOfInterest: AreaOfInterest[];
  projects: Project[];
  publications: Publication[];
  experience: Experience[];
  positionsOfResponsibility?: PositionOfResponsibility[];
  certifications?: Certification[];
  customPages?: CustomPage[];
  education: Education[];
  skillCategories: SkillCategory[];
  seo: SeoMetadata;
}
