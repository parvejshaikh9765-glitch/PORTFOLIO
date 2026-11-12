import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.resolve(DATA_DIR, 'db.json');

export interface AdminUser {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: 'superadmin' | 'admin';
  updatedAt: string;
}

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
  category: string;
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
  impactMetrics?: string[];
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
  score?: string;
  academicFocus: string;
  description: string;
  courses: string[];
  order: number;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: { name: string; level?: string; description?: string }[];
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
  status: 'unread' | 'read' | 'archived';
  createdAt: string;
}

export interface SeoMetadata {
  siteTitle: string;
  metaDescription: string;
  keywords: string;
  ogImage: string;
  canonicalUrl: string;
}

export interface DatabaseSchema {
  admin: AdminUser;
  profile: Profile;
  areasOfInterest: AreaOfInterest[];
  projects: Project[];
  publications: Publication[];
  experience: Experience[];
  positionsOfResponsibility: PositionOfResponsibility[];
  certifications: Certification[];
  customPages: CustomPage[];
  education: Education[];
  skillCategories: SkillCategory[];
  mediaFiles: MediaFile[];
  contactSubmissions: ContactSubmission[];
  seo: SeoMetadata;
}

const defaultAdminPasswordHash = bcrypt.hashSync('admin123#password', 10);

export const seedDatabase: DatabaseSchema = {
  admin: {
    id: 'admin_super_1',
    email: 'parvejshaikh9765@gmail.com',
    passwordHash: defaultAdminPasswordHash,
    name: 'Pravesh Shaikh',
    role: 'superadmin',
    updatedAt: new Date().toISOString()
  },
  profile: {
    name: 'Pravesh Shaikh',
    headline: 'Exploring the intersections of Development, Policy, Sustainability and People.',
    shortBio: "Master's in Development Studies at the Tata Institute of Social Sciences (TISS), Mumbai (7.37 CGPA). Experienced in programme consulting, field research on urban precarity and livelihoods, GI-tag artisan empowerment, and data analytics using Python, Power BI, STATA, and QGIS.",
    fullBio: "Pravesh Shaikh is a postgraduate researcher and development practitioner pursuing an M.A. in Development Studies at the Tata Institute of Social Sciences (TISS), Mumbai. His academic background bridges an undergraduate degree in Geography and History from Dr. Babasaheb Ambedkar Marathwada University with rigorous contemporary socio-economic research methodologies.\n\nHis practical portfolio spans impactful engagements across renowned development institutions: from remote programme consultancy with the Swiss Academy for Leadership and Sustainability (designing a 100-programme portfolio across 10 sustainability clusters and mapping 54 institutions across Mumbai and Pune) to primary field research with the Indian Council of Social Science Research (ICSSR), conducting 100+ interviews with migrant taxi, auto-rickshaw, and gig drivers in Mumbai regarding urban precarity and social protection.\n\nAt the Digital Empowerment Foundation (DEF), Pravesh coordinated ground operations for 300+ Solapuri (GI) Tag Chaddar artisans, delivering digital adoption workshops and documenting cultural heritage. At MySocially Impact Hub, he led baseline surveys, root cause analyses, and Power BI KPI dashboards for rural water access in Shahapur Taluka.\n\nCommitted to evidence-driven governance, Pravesh combines quantitative analytics (Python, Power BI, STATA, QGIS, Excel) with qualitative field methods, institutional analysis, and participatory development.",
    academicBackground: "M.A. Development Studies (TISS Mumbai, 7.37 CGPA) | B.A. Geography & History (BAMU, 6.9 CGPA)",
    location: "Mumbai, Maharashtra, India",
    email: "parvejshaikh9765@gmail.com",
    phone: "7972246347",
    linkedin: "https://linkedin.com/in/pravesh-shaikh-b1386930a",
    github: "https://github.com/parvejshaikh9765-glitch",
    academicAffiliation: "Tata Institute of Social Sciences (TISS), Mumbai",
    cvUrl: "/assets/documents/Pravesh_Shaikh_CV.pdf",
    portraitUrl: "/assets/aistudio/IMG_20260527_130121.jpg_fed4a925.jpeg",
    heroBackgroundUrl: "/src/assets/images/tiss_mumbai_campus_1794261204401.jpg",
    targetRoles: [
      "Development & Public Policy Consultant",
      "Monitoring, Evaluation & Learning (MEL) Specialist",
      "ESG & Sustainability Analyst",
      "Research & Data Analytics Associate"
    ],
    availability: "Available for Placement, Fellowships & Full-Time Roles (Immediate / 2027)",
    preferredLocations: "Mumbai, Pune, Delhi NCR, Remote & Hybrid",
    coreCompetencies: [
      "Primary Field Research & Qualitative Interviews (100+ Drivers, ICSSR)",
      "Digital Empowerment & Grassroots Capacity Building (300+ Artisans, DEF)",
      "Data Analytics & Dashboarding (Python, Power BI, STATA, QGIS)",
      "Programme Strategy & Institutional Mapping (100 Courses & 54 Partners, SALS)",
      "Corporate Liaisoning & Recruitment Coordination (68 TISS Students)"
    ]
  },
  areasOfInterest: [
    {
      id: 'area_1',
      title: 'Programme & Sustainability Strategy',
      description: 'Designing market-entry roadmaps, benchmarking sustainability curricula across institutions, and structuring multi-cluster programme frameworks.',
      iconName: 'Building2',
      order: 1
    },
    {
      id: 'area_2',
      title: 'Urban Precarity & Social Protection',
      description: 'Investigating migrant workers, informal transport drivers, spatial livelihoods, and institutional welfare access across metropolitan Mumbai.',
      iconName: 'Users',
      order: 2
    },
    {
      id: 'area_3',
      title: 'Digital Inclusion & Traditional Artisans',
      description: 'Strengthening capacity building, direct e-commerce adoption, and heritage documentation for Solapuri GI Tag Chaddar craft clusters.',
      iconName: 'ShieldCheck',
      order: 3
    },
    {
      id: 'area_4',
      title: 'Rural Water & Infrastructure Assessment',
      description: 'Executing baseline surveys, root-cause analyses, NGO partnership mapping, and Power BI KPI dashboards for rural water access.',
      iconName: 'Sprout',
      order: 4
    },
    {
      id: 'area_5',
      title: 'Digital Behaviour & Algorithmic Influence',
      description: 'Analyzing social media consumption patterns, algorithmically curated feeds, and youth purchasing behavior in semi-urban India.',
      iconName: 'BarChart3',
      order: 5
    },
    {
      id: 'area_6',
      title: 'ESG, CSR & Environmental Frameworks',
      description: 'Applying World Bank ESF Fundamentals, Environmental & Social Frameworks, and sustainable governance standards.',
      iconName: 'Leaf',
      order: 6
    },
    {
      id: 'area_7',
      title: 'Data Analytics & Spatial Visualization',
      description: 'Building end-to-end analytical pipelines with Python, Excel, Power BI, STATA, and QGIS for policy mapping and impact monitoring.',
      iconName: 'BarChart3',
      order: 7
    },
    {
      id: 'area_8',
      title: 'Institutional Coordination & Placement Leadership',
      description: 'Managing corporate liaisoning, alumni engagement platforms, and recruitment logistics for 68+ postgraduate students at TISS.',
      iconName: 'CheckCircle2',
      order: 8
    }
  ],
  projects: [
    {
      id: 'proj_3',
      title: 'Digital Inclusion & Heritage Documentation of Solapuri GI Tag Chaddar Artisans',
      slug: 'def-solapuri-chaddar-artisan-empowerment',
      category: 'Digital Inclusion & Artisans',
      organisation: 'Digital Empowerment Foundation (DEF) & TISS Mumbai',
      duration: 'May 2026 — June 2026',
      year: 2026,
      typeLabel: 'Internship',
      coverImage: '/assets/aistudio/_DSC0957_ecba3fd6.JPG',
      summary: 'Field internship report and multi-method study for Digital Empowerment Foundation (DEF) in Solapur, covering KoBoToolbox baseline survey with 330+ households, digital literacy for 150+ artisans, heritage coffee-table book chapter authoring, and organic product photography training.',
      context: 'Supervised by Mohd. Irfan Khan (DEF Solapur) and Assistant Professor Aditi Bhardwaj (TISS Mumbai), this 4-week field internship examined digital inclusion, GI-tag preservation, and socio-economic realities across traditional handloom and powerloom weaver clusters in Solapur, Maharashtra.',
      problemStatement: 'Despite holding a Geographical Indication (GI) tag, Solapur Chaddar weavers face severe market disintermediation, lack of direct e-commerce skills, yarn cost inflation, and low awareness of GI protection rights.',
      objectives: [
        'Deploy and refine a KoBoToolbox mobile baseline survey across 330+ weaver households in Solapur.',
        'Deliver hands-on digital literacy and UPI/e-commerce onboarding for 150+ artisans across 3 cluster locations.',
        'Co-author 9 chapters of a heritage coffee-table book documenting Solapur textile traditions and motif evolution.'
      ],
      role: 'Field Intern & Researcher',
      methodology: 'Mixed-methods field research: quantitative KoBoToolbox household surveys (330+ respondents), participatory community workshops, loom site visits, and mobile photography modules.',
      toolsAndApproaches: [
        'KoBoToolbox',
        'Digital Literacy Workshops',
        'Mobile Photography',
        'Heritage Archival',
        'GI Tag Rights Awareness'
      ],
      activities: [
        'Redesigned baseline survey tool in KoBoToolbox for multi-earner weaver households and conducted 330+ field interviews.',
        'Facilitated 3 digital literacy workshops for 150+ artisans on UPI payments and digital catalogues.',
        'Co-authored 9 chapters of DEF Solapur Heritage Coffee Table Book.'
      ],
      findings: 'Baseline survey revealed only 40% awareness of GI tag rights among weavers, concentrated in elders (45+ years). While 70% owned smartphones, fewer than 15% utilized them for commercial transactions prior to DEF interventions.',
      keyOutcome: 'Co-authored 9 publication chapters & trained 150+ artisans in digital payment safety and e-commerce.',
      outcomes: [
        'Published official TISS Internship Field Report.',
        'Directly trained 150+ artisans in digital payment platforms and smartphone product photography.'
      ],
      gallery: [
        '/assets/aistudio/_DSC1049_252a219f.JPG',
        '/assets/aistudio/_DSC1045_7106dce8.JPG',
        '/assets/aistudio/_DSC0957_ecba3fd6.JPG',
        '/assets/aistudio/_DSC1056_fbd7c275.JPG',
        '/assets/aistudio/_DSC0952_6eb5c7f5.JPG',
        '/assets/aistudio/_DSC0950_764e865c.JPG',
        '/assets/aistudio/_DSC1019_50f05902.JPG',
        '/assets/aistudio/IMG20260508111226_ac2f2734.jpg'
      ],
      documentUrl: '/assets/aistudio/Internship_Repor2_d5d18d7d.pdf',
      externalLink: 'https://github.com/parvejshaikh9765-glitch/def-solapuri-chaddar-study',
      isFeatured: true,
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'proj_alumni_path',
      title: 'AlumniPath — Development Studies Career Trajectory & Placement Intelligence Platform',
      slug: 'development-studies-alumni-path',
      category: 'Institutional Tech & Analytics',
      organisation: 'Tata Institute of Social Sciences (TISS), Mumbai',
      duration: 'Aug 2025 — Present',
      year: 2025,
      typeLabel: 'Institutional Tech',
      coverImage: '',
      summary: 'Built an end-to-end web platform and intelligence dashboard tracking 20+ batches of TISS Development Studies graduates, featuring sector distribution, salary benchmarking, alumni directory, and AI placement analytics.',
      context: 'As Elected Alumni Outreach Coordinator at TISS Mumbai, Pravesh identified the need for a central, data-driven platform to track graduate career progression, facilitate mentorship, and provide actionable placement insights.',
      problemStatement: 'Scattered alumni records across 20+ graduating batches made it difficult for students to identify sector-specific mentors or benchmark salaries across consultancies, UN bodies, think tanks, and policy organizations.',
      objectives: [
        'Design and deploy a full-stack digital web platform (AlumniPath) to consolidate 20+ batches of TISS Development Studies graduate data.',
        'Build interactive placement intelligence dashboards categorizing career outcomes into Consultancies, CSR Foundations, Think Tanks, and UN Agencies.',
        'Provide a searchable Alumni Directory with sector filters and direct mentorship channels.'
      ],
      role: 'Author & Lead Developer',
      methodology: 'Full-stack web architecture, React, Express API, data transformation, batch cohort aggregation, sector mapping, interactive charts, and administrative data management.',
      toolsAndApproaches: [
        'React & TypeScript',
        'Express.js & REST API',
        'Tailwind CSS',
        'Gemini AI Analytics',
        'Data Dashboards'
      ],
      activities: [
        'Engineered full-stack web architecture with interactive career analytics, filtering, and placement dashboards.',
        'Aggregated and structured historical career data across 20+ graduating batches of Development Studies postgraduates.',
        'Implemented SuperAdmin Console for CSV batch uploads, profile verification, and automated analytics generation.'
      ],
      findings: 'Demonstrated that Development Studies graduates actively occupy leadership roles across 6 primary sectors—Development Consultancies (32%), Think Tanks & Policy Research (24%), International NGOs/UN (18%), Corporate CSR (14%), and Government Policy Units (12%).',
      keyOutcome: 'Deploys placement analytics tracking 20+ graduate batches & connecting 68+ postgraduates with senior mentors.',
      outcomes: [
        'Successfully deployed the AlumniPath career tracker platform for TISS Development Studies.',
        'Strengthened alumni engagement network connecting 68+ current postgraduates with senior sector mentors.'
      ],
      gallery: [],
      documentUrl: '',
      externalLink: 'https://github.com/parvejshaikh9765-glitch/DEVELOPMENT-STUDIES-ALUMNI-PATH',
      isFeatured: true,
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'proj_maharashtra_gis',
      title: 'Spatial Patterns of Demography & Work in Maharashtra: A GIS & Spatial Econometrics Analysis',
      slug: 'maharashtra-gis-spatial-econometrics',
      category: 'Geospatial & Spatial Econometrics',
      organisation: 'Tata Institute of Social Sciences (TISS), Mumbai',
      duration: 'Oct 2025 — Nov 2025',
      year: 2025,
      typeLabel: 'Coursework',
      coverImage: '/src/assets/images/maharashtra_gis_map_1794395611656.jpg',
      summary: 'District-level spatial econometric analysis across 35 districts of Maharashtra using Census data, incorporating QGIS choropleth mapping, R statistical correlation, and GeoDa spatial autocorrelation (Moran\'s I, LISA clusters, Spatial Error models).',
      context: 'Submitted to Prof. Abdul Shaban at TISS Mumbai (Course: DS 27 - GIS and Spatial Econometrics in Development Research). State-level averages obscure acute intra-state demographic disparities between metropolitan Konkan, agrarian Marathwada, and forested Vidarbha.',
      problemStatement: 'Testing whether district-level demographic and work participation indicators are spatially autocorrelated across Maharashtra, and modeling how urbanization, household size, and literacy impact total work participation while controlling for spatial error structure.',
      objectives: [
        'Construct a 35-district GIS polygon layer in QGIS and map 9 key demographic indicators using Natural Breaks classification.',
        'Measure global spatial autocorrelation (Moran\'s I) and identify local spatial clusters (LISA High-High, Low-Low) using GeoDa spatial weights.',
        'Fit OLS, Spatial Lag, and Spatial Error regression models to evaluate the relationship between urbanization and total work participation rate.'
      ],
      role: 'Author (Individual)',
      methodology: 'Spatial GIS vector analysis in QGIS, correlation matrix and grid mapping in R, GeoDa spatial weights matrix construction, Global Moran\'s I permutation testing, LISA cluster mapping, and Spatial Error regression.',
      toolsAndApproaches: [
        'QGIS',
        'GeoDa',
        'R',
        'Moran\'s I',
        'LISA Clusters',
        'Spatial Regression'
      ],
      activities: [
        'Joined Census district indicators to Maharashtra spatial boundary polygons in QGIS.',
        'Constructed Queen contiguity spatial weight matrices in GeoDa for 35 districts.',
        'Fitted Spatial Error Model demonstrating lower AIC (158.24 vs 170.14 OLS) and significant spatial autoregressive error.'
      ],
      findings: 'Total WPR is overwhelmingly driven by female WPR (r = 0.94). Urbanization exhibits a strong negative spatial association with female WPR (r = -0.82) and total WPR (-0.65). Spatial Error Model (AIC = 158.24) significantly out-performed standard OLS (AIC = 170.14), proving unobserved spatial dependence.',
      keyOutcome: 'Proved spatial error dependence across 35 districts and mapped female work participation trends.',
      outcomes: [
        'Authored official TISS academic research paper for DS 27 GIS & Spatial Econometrics course.',
        'Published reproducible spatial econometric models and district cluster maps.'
      ],
      gallery: [
        '/src/assets/images/maharashtra_gis_map_1794395611656.jpg'
      ],
      documentUrl: '/assets/aistudio/Maharashtra_GIS_Spatial_Econometrics_c0f683bc.pdf',
      externalLink: 'https://github.com/parvejshaikh9765-glitch/maharashtra-gis-spatial-econometrics',
      isFeatured: true,
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'proj_digital_adaptation_nss',
      title: 'Digital Adaptation & Disadvantage in India: NSS 80th Round (CMS-T 2025) Econometric Evaluation',
      slug: 'digital-adaptation-india-nss80',
      category: 'Quantitative Policy & Econometrics',
      organisation: 'Tata Institute of Social Sciences (TISS), Mumbai',
      duration: 'Jan 2025 — Mar 2025',
      year: 2025,
      typeLabel: 'Coursework',
      coverImage: '',
      summary: 'Econometric evaluation of National Sample Survey (NSS 80th Round CMS-T 2025) microdata covering 34,950 households and 142,065 individuals across India, assessing device access, personal phone ownership, and functional digital capabilities.',
      context: 'Conducted for Environment, Climate Change and Development studies at TISS Mumbai. Evaluates whether high household connectivity translates into personal autonomy and transactional/productive digital capability.',
      problemStatement: 'Policy discussions frequently focus on household connectivity (86.3%), masking acute individual divides in phone ownership (70.2%) and complex functional capabilities (e.g. 13.1% word processing, 48.9% online banking), with severe compounding disadvantages for rural women.',
      objectives: [
        'Deconstruct digital adaptation into 3 linked dimensions: access, usage, and self-reported capability.',
        'Audit all-India estimates across 270 indicator cells from published NSO telecom tables.',
        'Calculate percentage-point gender and rural-urban gaps, parity ratios, and odds ratios.'
      ],
      role: 'Author (Individual)',
      methodology: 'Microdata workbook auditing, pseudo-weight verification, design effect standard error estimation, interaction contrast modeling, and Spearman rank correlation.',
      toolsAndApproaches: [
        'NSS 80th Microdata',
        'R',
        'Econometrics',
        'Excel',
        'Intersectionality',
        'Capability Approach'
      ],
      activities: [
        'Audited 13 validation checks across all-India NSS telecom sample (34,950 households, 142,065 enumerated individuals).',
        'Quantified the ownership gap: 27.7 percentage points for adults 15+ (83.9% men vs 56.2% women).',
        'Mapped compounding disadvantage: rural women (48.4% ownership) trail urban men (90.0%) by 41.6 percentage points.'
      ],
      findings: 'Individual phone ownership (70.2%) severely lags household connectivity (86.3%). Gender gaps are widest in personal ownership (27.7 pp) and online banking (23.5 pp). Rural women suffer the largest compounding gap (trailing urban men by 41.6 pp in ownership and 43.2 pp in online banking).',
      keyOutcome: 'Quantified 27.7 pp gender gap in phone ownership & 41.6 pp compounding gap for rural women.',
      outcomes: [
        'Authored 27-page TISS Individual Policy Research Report.',
        'Formulated policy action items for PMGDISHA and NSO data release protocols.'
      ],
      gallery: [],
      documentUrl: '/assets/aistudio/Digital_Adaptation_India__6aa5731b.pdf',
      externalLink: 'https://github.com/parvejshaikh9765-glitch/digital-adaptation-india-nss80',
      isFeatured: true,
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'proj_mumbai_spatial',
      title: 'Mumbai Ward-Level Spatial Analysis: Built-Up Density & Green Space Vulnerability',
      slug: 'mumbai-ward-level-spatial-analysis',
      category: 'Geospatial & Urban Analysis',
      organisation: 'Tata Institute of Social Sciences (TISS), Mumbai',
      duration: 'Jan 2025 — Feb 2025',
      year: 2025,
      typeLabel: 'Coursework',
      coverImage: '/uploads/mumbai_builtup_density_map.png',
      summary: 'Dual ward-level spatial study across Municipal Corporation of Greater Mumbai (MCGM) analyzing OpenStreetMap building footprint density and 10m ESA WorldCover satellite remote sensing data with Census population indicators in QGIS.',
      context: 'Understanding spatial patterns of urban growth, physical building density, and green space accessibility is vital for transit-oriented development and urban environmental policy in metropolitan Mumbai.',
      problemStatement: 'Lack of integrated ward-level cartographic assessments evaluating structural density gradients alongside per-capita green space vulnerability across all 24 municipal wards in Mumbai.',
      objectives: [
        'Reproject OpenStreetMap building footprint polygons to UTM Zone 43N (EPSG:32643) and compute ward built-up density ratios.',
        'Extract 10m resolution ESA WorldCover satellite imagery vegetation layers and compute ward zonal statistics.',
        'Construct a 5-tier composite Green Space Vulnerability Index (Very Low to Very High).'
      ],
      role: 'Author (Individual)',
      methodology: 'Spatial GIS vector analysis, satellite remote sensing raster reclassification, zonal statistics extraction, min-max normalization, and cartographic thematic mapping.',
      toolsAndApproaches: [
        'QGIS',
        'ESA WorldCover',
        'OpenStreetMap',
        'Zonal Statistics',
        'Spatial Normalization',
        'UTM 43N'
      ],
      activities: [
        'Processed OSM building footprints and 10m ESA WorldCover raster imagery across MCGM ward boundaries.',
        'Derived ward-level built-up density ratios and composite green space vulnerability indices.',
        'Exported publication-ready spatial cartographic maps and GeoPackage layers.'
      ],
      findings: 'Identified compact high-density development in historical South Mumbai wards alongside severe green space vulnerability clustering in dense suburban informal settlements.',
      keyOutcome: 'Mapped MCGM ward built-up density gradients & 5-tier green space vulnerability index.',
      outcomes: [
        'Published ward-level built-up density and green space vulnerability cartographic maps.',
        'Created open spatial GeoPackage layers for municipal urban planning.'
      ],
      gallery: [
        '/uploads/mumbai_builtup_density_map.png',
        '/uploads/mumbai_greenspace_vulnerability_map.png'
      ],
      documentUrl: '',
      externalLink: 'https://github.com/parvejshaikh9765-glitch/mumbai-builtup-density-analysis',
      isFeatured: true,
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'proj_shahapur',
      title: 'Shahapur Power BI Rural Water Infrastructure & Scarcity Dashboard',
      slug: 'mysocially-shahapur-water-access-dashboard',
      category: 'Data Analytics & Rural Infrastructure',
      organisation: 'MySocially Impact Hub',
      duration: 'Dec 2025 — Feb 2026',
      year: 2025,
      typeLabel: 'Internship',
      coverImage: '',
      summary: 'Field baseline research report and interactive Power BI KPI dashboard examining rural water scarcity across 42 hamlets (12,683 affected villagers) in Shahapur Taluka, Thane; mapped 12+ NGO/CSR funding partners and Cluster A1 tribal water distress.',
      context: 'Conducted for MySocially Impact Hub. Examines severe drinking water scarcity in Shahapur Taluka despite hosting major freshwater dams supplying Mumbai. Features detailed baseline mapping across Katkari, Warli, and Thakur indigenous tribal hamlets.',
      problemStatement: 'Despite proximity to 4 major municipal reservoirs, 42 rural hamlets face severe tanker dependence, seasonal handpump failures, and gendered water-hauling burdens of 2–4 km daily.',
      objectives: [
        'Execute household baseline surveys and root cause analyses across 42 water-scarce hamlets in Shahapur.',
        'Map 12+ active regional NGOs and CSR foundations for collaborative local execution.',
        'Build interactive Power BI dashboards to analyze household water security and track infrastructure KPIs.'
      ],
      role: 'Project Management Intern',
      methodology: 'Quantitative household sampling, root-cause tree analysis, stakeholder mapping, and Power BI KPI dashboarding.',
      toolsAndApproaches: [
        'Power BI',
        'Data Cleaning',
        'Root Cause Analysis',
        'NGO Mapping',
        'M&E Dashboards'
      ],
      activities: [
        'Conducted village-level baseline surveys assessing daily water haul times and pipeline breakdowns.',
        'Mapped active non-profit organisations in Thane district to evaluate co-funding and execution capability.',
        'Designed interactive Power BI visualizations allowing project leaders to filter water access KPIs.'
      ],
      findings: 'Identified Cluster A1 (Fugale-Aghai belt) as the most critical intervention zone (2,840 affected Katkari/Warli tribal residents). Mapped 12+ active NGO and CSR funding partners to structure sustainable solar-powered borehole solutions.',
      keyOutcome: 'Mapped 42 water-scarce hamlets & 12+ NGO/CSR partners to prioritize Cluster A1 tribal relief.',
      outcomes: [
        'Authored 14-page official Shahapur Water Scarcity Baseline Report.',
        'Deployed interactive Power BI KPI dashboard tracking water access metrics.'
      ],
      gallery: [],
      documentUrl: '/assets/aistudio/Shahpur_f1664d21.pdf',
      externalLink: 'https://mysocially.org',
      isFeatured: true,
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'proj_esg_dashboard',
      title: 'GreenTech Solutions ESG Performance Dashboard (Power BI)',
      slug: 'esg-performance-dashboard-powerbi',
      category: 'Data Analytics & ESG',
      organisation: 'GreenTech Solutions',
      duration: 'Jan 2026',
      year: 2026,
      typeLabel: 'Field Research',
      coverImage: '',
      summary: 'Built an interactive Power BI ESG Performance Dashboard tracking emissions, energy usage, workforce diversity, and employee training indicators with real-time automated data refresh.',
      context: 'Developed for GreenTech Solutions to centralize key Environmental, Social, and Governance (ESG) indicators into a real-time monitoring suite.',
      problemStatement: 'Corporate ESG tracking often suffers from fragmented data silos, manual reporting lags, and lack of time-series visibility into carbon emission spikes.',
      objectives: [
        'Build an interactive dashboard tracking emissions (86.99 MT), energy use (95K kWh), workforce (625 total employees), and training hours (1,155 hours).',
        'Create KPI visuals and conduct trend and time-series analysis across monthly operational cycles.',
        'Set up automated data refresh for real-time monitoring and executive reporting.'
      ],
      role: 'ESG Data Analyst',
      methodology: 'Power BI Desktop modeling, DAX metric calculations, time-series forecasting, monthly slicer filtering, and cloud automated data refresh pipeline configuration.',
      toolsAndApproaches: [
        'Power BI Desktop',
        'DAX',
        'Time-Series Analysis',
        'ESG Metrics',
        'Automated Refresh'
      ],
      activities: [
        'Ingested multi-departmental datasets tracking monthly electricity consumption (kWh), GHG emissions (MT), gender distribution, and training hours.',
        'Designed high-impact KPI summary cards (86.99 Total Emissions, 625 Total Employees, 95K Electricity kWh, 1155 Training Hours).',
        'Engineered monthly time-series line charts identifying peak emission and energy cycles in mid-year months.'
      ],
      findings: 'Identified strong correlation between mid-year production peaks and electricity consumption (peaking at 9.5K kWh in June/July with 8.9 MT emissions), while staff training hours steadily scaled to 120+ hours per month.',
      keyOutcome: 'Deployed operational dashboard tracking 86.99 MT emissions, 95K kWh energy use & 1,155 training hours.',
      outcomes: [
        'Successfully deployed the GreenTech Solutions ESG Performance Dashboard.',
        'Streamlined executive ESG reporting with real-time monthly slicer controls.'
      ],
      gallery: [],
      documentUrl: '/assets/aistudio/ESG_Dashboard_c6726ecf.pdf',
      externalLink: '',
      isFeatured: true,
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ],
  publications: [
    {
      id: 'pub_dissertation',
      title: 'Social Media, Algorithmic Influence and Digital Behaviour Among College Students in Jalna Town, Maharashtra',
      category: 'Dissertation',
      institution: 'Tata Institute of Social Sciences (TISS), Mumbai',
      year: 2026,
      date: 'Ongoing M.A. Thesis Research (2025–2026)',
      authors: ['Pravesh Shaikh'],
      abstract: 'Investigates how algorithmic content curation and social media platforms shape everyday digital practices, information consumption, online engagement, and purchasing behaviour among college students in semi-urban Maharashtra. Synthesises empirical survey data with critical digital media sociology.',
      coverImage: '/src/assets/images/esg_policy_brief_cover_1794261205369.jpg',
      documentUrl: '',
      externalUrl: 'https://tiss.edu/research/development-studies',
      status: 'published',
      createdAt: new Date().toISOString()
    },
    {
      id: 'pub_1',
      title: 'ESG and CSR Policy Integration in Local Governance: A Strategic Blueprint for Sustainable Community Outcomes',
      category: 'Policy Brief',
      institution: 'Tata Institute of Social Sciences (TISS), Mumbai',
      year: 2025,
      date: 'January 2025',
      authors: ['Pravesh Shaikh'],
      abstract: 'Corporate Social Responsibility (CSR) and Environmental, Social, and Governance (ESG) frameworks are frequently executed as top-down philanthropic initiatives disconnected from local municipal priorities. This policy brief proposes an alignment framework bridging corporate ESG commitments with Gram Panchayat and urban municipal development plans.',
      coverImage: '/src/assets/images/esg_policy_brief_cover_1794261205369.jpg',
      documentUrl: '',
      externalUrl: 'https://tiss.edu/research/development-studies',
      status: 'published',
      createdAt: new Date().toISOString()
    },
    {
      id: 'pub_2',
      title: 'Urban Precarity & Migrant Transport Labor in Metropolitan Mumbai: A Qualitative Appraisal',
      category: 'Research Paper',
      institution: 'Indian Council of Social Science Research (ICSSR) & TISS',
      year: 2025,
      date: 'July 2025',
      authors: ['Pravesh Shaikh'],
      abstract: 'Examines migration trajectories, housing insecurity, and institutional welfare voids among 100+ migrant auto-rickshaw and cab drivers operating in Mumbai. Outlines actionable policy interventions for gig worker social protection and emergency health access.',
      coverImage: '/assets/aistudio/WhatsApp_Image_2026-11-11_at_16.59.00_848ca65c.jpeg',
      documentUrl: '',
      externalUrl: 'https://icssr.org',
      status: 'published',
      createdAt: new Date().toISOString()
    }
  ],
  experience: [
    {
      id: 'exp_def',
      designation: 'Programme Management & Research Intern',
      organisation: 'DEF (Digital Empowerment Foundation)',
      duration: 'May 2026 — Jun 2026',
      location: 'Solapur, Maharashtra · On site',
      type: 'On site',
      description: 'Coordinated field logistics, stakeholder consultations and community mobilisation for the DigiKargha project with 300+ Solapuri Chadar GI (Geographical Indication) artisans.',
      responsibilities: [
        'Coordinated field logistics, stakeholder consultations and community mobilisation for the DigiKargha project with 300+ Solapuri Chadar GI (Geographical Indication) artisans.',
        'Ran a mixed-methods baseline assessment of artisan livelihoods and digital inclusion.',
        'Delivered digital literacy and payment safety training to 150+ community members; produced monitoring reports and a KPI tracker for team leads.',
        'Co-authored 9 chapters of a publication on Solapur’s GI textile heritage.'
      ],
      keyContributions: [
        'Organised DigiKargha artisan mobilisation across Solapur textile clusters.',
        'Authored 9 chapters of Solapur GI textile heritage publication.'
      ],
      impactMetrics: [
        '300+ GI Artisans Mobilised',
        '150+ Digital Workshop Graduates',
        '9 Publication Chapters Co-Authored'
      ],
      documentUrl: '/assets/aistudio/Internship_Repor2_d5d18d7d.pdf',
      websiteUrl: 'https://defindia.co/',
      order: 1
    },
    {
      id: 'exp_sals',
      designation: 'Program Consultant Intern',
      organisation: 'Swiss Academy for Leadership and Sustainability (Geneva-based Think Tank)',
      duration: 'Aug 2025 — Oct 2025',
      location: 'Geneva, Switzerland · Remote',
      type: 'Remote',
      description: 'Curated an extensive sustainability programme framework across 10 clusters and conducted comprehensive institutional market benchmarking.',
      responsibilities: [
        'Curated a 100-course sustainability framework across 10 clusters, translating market trends into a structured development roadmap.',
        'Designed sustainability curricula and benchmarked pricing and delivery models across 50+ institutions to inform market-entry strategy.',
        'Mapped 54 institutions across Mumbai and Pune, identifying key stakeholders and strategic partnership opportunities.',
        'Maintained the organisation\'s WordPress website (Luna theme & page builder) and wrote web pages, course descriptions, and blog posts for the site.'
      ],
      keyContributions: [
        'Created a strategic 10-cluster sustainability curriculum blueprint.',
        'Established outreach dataset of 54 premier institutions across Western India.'
      ],
      impactMetrics: [
        '100-Course Framework Curated',
        '54 Institutional Partners Mapped',
        'WordPress & Web Content Management'
      ],
      documentUrl: '/assets/aistudio/SALS_India_Market_Entry_Report_6fe0b332.pdf',
      websiteUrl: 'https://sals.academy/',
      order: 2
    },
    {
      id: 'exp_icssr',
      designation: 'Field Research Assistant',
      organisation: 'ICSSR',
      duration: 'Jun 2025 — Jul 2025',
      location: 'Mumbai, Maharashtra · On site',
      type: 'On site',
      description: 'Indian Council of Social Science Research (ICSSR), project "Urban Insecurity, Migration and Social Protection: Mumbai"',
      responsibilities: [
        'Conducted 100+ semi-structured interviews with migrant taxi, auto-rickshaw and app-based drivers across Mumbai, using purposive and snowball sampling.',
        'Synthesised qualitative evidence on migration, urban precarity and social protection into analytical reports.'
      ],
      keyContributions: [
        'Gathered 100+ empirical field narratives across Mumbai transit nodes.',
        'Authored analytical research reports on driver debt traps and social security exclusions.'
      ],
      impactMetrics: [
        '100+ Primary Field Interviews',
        'Urban Precarity Policy Report',
        'Purposive & Snowball Sampling'
      ],
      websiteUrl: 'https://icssr.org/',
      order: 3
    },
    {
      id: 'exp_mysocially',
      designation: 'Programme Management & Research Intern',
      organisation: 'My Socially Impact Hub',
      duration: 'Dec 2025 — Feb 2026',
      location: 'Thane & Mumbai · Hybrid',
      type: 'Hybrid',
      description: 'Synthesised qualitative and quantitative data on rural water and infrastructure conditions in Shahapur, Thane into baseline documentation for M&E reporting.',
      responsibilities: [
        'Synthesised qualitative and quantitative data on rural water and infrastructure conditions in Shahapur, Thane into baseline documentation for M&E (monitoring and evaluation) reporting.',
        'Prepared concept notes, stakeholder presentations and programme briefs for programme teams.'
      ],
      keyContributions: [
        'Engineered baseline documentation for rural water infrastructure M&E reporting.',
        'Authored stakeholder presentation briefs adopted for funder engagement.'
      ],
      impactMetrics: [
        'Power BI & M&E Baseline Report',
        'Shahapur Water Infrastructure Data',
        'Stakeholder Concept Notes'
      ],
      documentUrl: '/assets/aistudio/Shahpur_f1664d21.pdf',
      websiteUrl: 'https://www.mysocially.com/',
      order: 4
    },
    {
      id: 'exp_dhan',
      designation: 'Programme & Strategy Intern',
      organisation: 'DHAN Foundation (HELP Programme)',
      duration: 'May 2024 — Jul 2024',
      location: 'Field Operations · Hybrid',
      type: 'On site',
      description: 'Synthesised field data from 2,200+ beneficiaries across 111 community learning centres into findings on foundational literacy and numeracy gaps and digital inclusion barriers.',
      responsibilities: [
        'Synthesised field data from 2,200+ beneficiaries across 111 community learning centres into findings on foundational literacy and numeracy gaps and digital inclusion barriers; consolidated KPIs and prepared progress reports for team leads.'
      ],
      keyContributions: [
        'Consolidated field KPIs across 111 community learning centres.',
        'Reported foundational learning & digital inclusion barriers.'
      ],
      impactMetrics: [
        '2,200+ Beneficiaries Assessed',
        '111 Community Learning Centres',
        'KPI Progress Reporting'
      ],
      websiteUrl: 'https://dhan.org/',
      order: 5
    }
  ],
  positionsOfResponsibility: [
    {
      id: 'por_placement',
      role: 'Placement Committee Member',
      institution: 'Tata Institute of Social Sciences (TISS), Mumbai',
      duration: 'July 2026 — Present',
      points: [
        'Coordinate end-to-end placement processes for 68 students, liaising with 20+ corporate partners and managing recruitment logistics.',
        'Facilitate employer engagement sessions, pre-placement talks, and student interview scheduling across development consultancies, CSR foundations, and research think tanks.'
      ],
      order: 1
    },
    {
      id: 'por_alumni',
      role: 'Alumni Outreach Coordinator',
      institution: 'Tata Institute of Social Sciences (TISS), Mumbai',
      duration: 'Aug 2025 — July 2026',
      points: [
        'Built a digital alumni management platform using Python and JavaScript, streamlining alumni profiles, career information and professional updates.',
        'Led alumni outreach and coordinated engagement sessions to foster mentorship, networking and alumni–student collaboration.'
      ],
      order: 2
    }
  ],
  certifications: [
    {
      id: 'cert_ibm',
      title: 'IBM Data Analytics Professional Certificate',
      issuer: 'IBM',
      year: '2025',
      url: '',
      order: 1
    },
    {
      id: 'cert_worldbank',
      title: 'Environmental and Social Framework (ESF) Fundamentals',
      issuer: 'World Bank Group',
      year: '2025',
      url: '',
      order: 2
    }
  ],
  customPages: [],
  education: [
    {
      id: 'edu_tiss',
      degree: 'M.A. in Development Studies',
      institution: 'Tata Institute of Social Sciences (TISS)',
      location: 'Mumbai, Maharashtra, India',
      duration: '2025 — 2027',
      year: 2027,
      score: '7.37 CGPA',
      academicFocus: 'Urban Precarity, Public Policy, Digital Behaviour, Sustainable Livelihoods, MEL & ESG',
      description: 'Premier postgraduate programme at India’s foremost social science institute. Rigorous interdisciplinary coursework encompassing quantitative statistics, qualitative ethnography, macroeconomic policy, and field practice.',
      courses: [
        'Development Theory & Macroeconomic Policy',
        'Urban Precarity & Spatial Governance',
        'Quantitative Analysis & Econometrics (STATA / Python)',
        'Qualitative Field Methodologies & Ethics',
        'Monitoring, Evaluation and Learning (MEL)',
        'Environmental & Social Governance (ESG)'
      ],
      order: 1
    },
    {
      id: 'edu_bamu',
      degree: 'B.A. (Hons) in Geography and History',
      institution: 'Dr. Babasaheb Ambedkar Marathwada University',
      location: 'Maharashtra, India',
      duration: '2019 — 2022',
      year: 2022,
      score: '6.9 CGPA',
      academicFocus: 'Spatial Cartography, Human Geography, Economic History & Regional Agrarian Systems',
      description: 'Undergraduate double major synthesizing spatial geographic analysis, cartographic principles, and modern economic and social history.',
      courses: [
        'Spatial Analysis & Cartography',
        'Geomorphology & Resource Geography',
        'Economic & Social History of India',
        'Agrarian Systems & Regional Planning',
        'Research Methodologies'
      ],
      order: 2
    }
  ],
  skillCategories: [
    {
      id: 'cat_digital',
      name: 'Digital & Analytics',
      skills: [
        { name: 'Python', level: 'Intermediate', description: 'Data analysis, script automation, and web platforms' },
        { name: 'Excel (Advanced)', level: 'Advanced', description: 'Formulas, pivot tables, data modelling, cross-tabulations' },
        { name: 'Power BI', level: 'Advanced', description: 'Interactive KPI dashboards, data transformation, DAX' },
        { name: 'STATA', level: 'Intermediate', description: 'Statistical modelling, regression, and survey analysis' },
        { name: 'QGIS', level: 'Intermediate', description: 'Spatial analysis, buffer mapping, vector overlays' },
        { name: 'Web Development', level: 'Intermediate', description: 'JavaScript, React, Full-stack web platforms' },
        { name: 'Data Cleaning & Visualisation', level: 'Advanced', description: 'Data pipeline preparation and insight dashboards' }
      ],
      order: 1
    },
    {
      id: 'cat_prog',
      name: 'Programme & Execution',
      skills: [
        { name: 'Programme Development', level: 'Advanced', description: 'Multi-cluster curriculum design, market-entry roadmaps' },
        { name: 'Project Coordination', level: 'Advanced', description: 'Cross-functional delivery, milestone tracking, logistics' },
        { name: 'Field Operations', level: 'Advanced', description: 'On-site surveys, team leadership, ground logistics' },
        { name: 'Stakeholder Engagement', level: 'Advanced', description: 'Artisan cooperatives, NGOs, corporate partners, academic institutions' },
        { name: 'Partnership Mapping', level: 'Advanced', description: 'Institutional benchmarking and strategic partner outreach' }
      ],
      order: 2
    },
    {
      id: 'cat_research',
      name: 'Research & Analysis',
      skills: [
        { name: 'Secondary Research & Synthesis', level: 'Advanced', description: 'Documentary reviews, market benchmarking' },
        { name: 'Literature Review', level: 'Advanced', description: 'Academic paper synthesis and theoretical framing' },
        { name: 'Policy Mapping', level: 'Advanced', description: 'Welfare schemes, social protection frameworks' },
        { name: 'Institutional Analysis', level: 'Advanced', description: 'Organizational structures and governance bottlenecks' },
        { name: 'Qualitative Research', level: 'Advanced', description: '100+ semi-structured interviews, focus groups, thematic coding' }
      ],
      order: 3
    },
    {
      id: 'cat_comm',
      name: 'Communication & Documentation',
      skills: [
        { name: 'Research Report Writing', level: 'Advanced', description: 'Analytical policy briefs and technical monographs' },
        { name: 'Presentation Development', level: 'Advanced', description: 'High-impact slide decks for funders and institutional leaders' },
        { name: 'Documentation & Archiving', level: 'Advanced', description: 'Heritage books, coffee-table publications, case logs' },
        { name: 'Stakeholder Communication', level: 'Advanced', description: 'Liaisoning with 20+ corporate recruiters, faculty, and grassroots communities' }
      ],
      order: 4
    }
  ],
  mediaFiles: [
    {
      id: 'med_cv_pdf',
      filename: 'Pravesh_Shaikh_CV.pdf',
      originalName: 'PRAVESH_CV__1__7ce1ec4c.pdf',
      mimeType: 'application/pdf',
      size: 154200,
      url: '/assets/documents/Pravesh_Shaikh_CV.pdf',
      altText: 'Official CV of Pravesh Shaikh (TISS Mumbai)',
      folder: 'Documents',
      createdAt: new Date().toISOString()
    },
    {
      id: 'med_1',
      filename: 'hero_portrait_pravesh.jpg',
      originalName: 'hero_portrait_pravesh.jpg',
      mimeType: 'image/jpeg',
      size: 458920,
      url: '/src/assets/images/hero_portrait_pravesh_1794261203775.jpg',
      altText: 'Pravesh Shaikh Portrait',
      folder: 'Portraits',
      createdAt: new Date().toISOString()
    },
    {
      id: 'med_2',
      filename: 'solapur_textile_fieldwork.jpg',
      originalName: 'solapur_textile_fieldwork.jpg',
      mimeType: 'image/jpeg',
      size: 612400,
      url: '/src/assets/images/solapur_textile_fieldwork_1794261204858.jpg',
      altText: 'Solapur Textile Weavers Digital Literacy Workshop',
      folder: 'Fieldwork',
      createdAt: new Date().toISOString()
    },
    {
      id: 'med_3',
      filename: 'tiss_mumbai_campus.jpg',
      originalName: 'tiss_mumbai_campus.jpg',
      mimeType: 'image/jpeg',
      size: 789120,
      url: '/src/assets/images/tiss_mumbai_campus_1794261204401.jpg',
      altText: 'TISS Mumbai Campus Library Lawn',
      folder: 'Campus',
      createdAt: new Date().toISOString()
    },
    {
      id: 'med_4',
      filename: 'urban_sustainability_project.jpg',
      originalName: 'urban_sustainability_project.jpg',
      mimeType: 'image/jpeg',
      size: 654300,
      url: '/src/assets/images/urban_sustainability_project_1794261205664.jpg',
      altText: 'Sustainable Urban Planning Initiative',
      folder: 'Projects',
      createdAt: new Date().toISOString()
    },
    {
      id: 'med_5',
      filename: 'rural_livelihoods_research.jpg',
      originalName: 'rural_livelihoods_research.jpg',
      mimeType: 'image/jpeg',
      size: 712000,
      url: '/src/assets/images/rural_livelihoods_research_1794261207159.jpg',
      altText: 'Rural Women Self-Help Group Meeting',
      folder: 'Projects',
      createdAt: new Date().toISOString()
    },
    {
      id: 'med_6',
      filename: 'esg_policy_brief_cover.jpg',
      originalName: 'esg_policy_brief_cover.jpg',
      mimeType: 'image/jpeg',
      size: 389000,
      url: '/src/assets/images/esg_policy_brief_cover_1794261205369.jpg',
      altText: 'ESG & CSR Policy Brief Cover',
      folder: 'Publications',
      createdAt: new Date().toISOString()
    }
  ],
  contactSubmissions: [
    {
      id: 'cnt_1',
      name: 'Dr. Ananya Roy',
      email: 'ananya.roy@urbanresearch.org',
      organisation: 'Center for Urban Policy Studies',
      subject: 'Collaborative Research on Migrant Transport Precarity in Mumbai',
      message: 'Dear Pravesh, I have followed your recent ICSSR fieldwork and policy insights on Mumbai transport gig workers. Our center is currently drafting a multi-city urban precarity study and would be delighted to discuss potential research collaboration.',
      status: 'unread',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
    }
  ],
  seo: {
    siteTitle: 'Pravesh Shaikh — Development Studies, Research & Sustainability Portfolio',
    metaDescription: 'Personal portfolio, research repository and curriculum vitae of Pravesh Shaikh, M.A. Development Studies Scholar at TISS Mumbai (7.37 CGPA). Specializing in urban precarity, digital inclusion, programme management, and data analytics.',
    keywords: 'Pravesh Shaikh, TISS Mumbai, Development Studies, Swiss Academy, ICSSR, Solapur Weavers, DEF, MySocially, Power BI, Python, QGIS, STATA, Research Portfolio',
    ogImage: '/src/assets/images/hero_portrait_pravesh_1794261203775.jpg',
    canonicalUrl: 'https://praveshshaikh.com'
  }
};

export class Database {
  private data: DatabaseSchema;

  constructor() {
    this.ensureDataDir();
    this.data = this.loadData();
  }

  private ensureDataDir() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const uploadsDir = path.resolve(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    const docsDir = path.resolve(process.cwd(), 'public', 'assets', 'documents');
    if (!fs.existsSync(docsDir)) {
      fs.mkdirSync(docsDir, { recursive: true });
    }
  }

  private loadData(): DatabaseSchema {
    if (fs.existsSync(DB_FILE)) {
      try {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        return {
          ...seedDatabase,
          ...parsed,
          profile: { ...seedDatabase.profile, ...(parsed.profile || {}) },
          positionsOfResponsibility: parsed.positionsOfResponsibility || seedDatabase.positionsOfResponsibility,
          certifications: parsed.certifications || seedDatabase.certifications,
          customPages: parsed.customPages || seedDatabase.customPages || []
        };
      } catch (err) {
        console.error('Error loading db.json, re-seeding:', err);
        this.saveData(seedDatabase);
        return seedDatabase;
      }
    } else {
      this.saveData(seedDatabase);
      return seedDatabase;
    }
  }

  public saveData(newData?: DatabaseSchema) {
    if (newData) {
      this.data = newData;
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
  }

  public get(): DatabaseSchema {
    return this.data;
  }
}

export const db = new Database();
