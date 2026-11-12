import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import { db, Project, Publication, Experience, Education, SkillCategory, ContactSubmission, MediaFile, PositionOfResponsibility, Certification, CustomPage } from './server/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'pravesh-shaikh-portfolio-secret-key-2026';
const PORT = 3000;

const app = express();
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Set up Multer for media uploads
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const uploadPath = path.resolve(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const nameWithoutExt = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9]/g, '_');
    cb(null, `${nameWithoutExt}_${uniqueSuffix}${ext}`);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 30 * 1024 * 1024 } // 30MB max
});

// Middleware for authenticating JWT admin token
function authenticateAdmin(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication token required' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string };
    const currentDb = db.get();
    if (decoded.id !== currentDb.admin.id && decoded.email !== currentDb.admin.email) {
      return res.status(403).json({ error: 'Invalid or revoked token' });
    }
    (req as any).admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired session. Please log in again.' });
  }
}

// -------------------------------------------------------------
// PUBLIC API ENDPOINTS
// -------------------------------------------------------------

// Get all public portfolio content
app.get('/api/public/data', (_req: Request, res: Response) => {
  const data = db.get();
  const publicProjects = data.projects
    .filter(p => p.status === 'published')
    .sort((a, b) => b.year - a.year);
  const publicPublications = data.publications
    .filter(p => p.status === 'published')
    .sort((a, b) => b.year - a.year);
  const sortedExperience = [...data.experience].sort((a, b) => a.order - b.order);
  const sortedEducation = [...data.education].sort((a, b) => a.order - b.order);
  const sortedSkills = [...data.skillCategories].sort((a, b) => a.order - b.order);
  const sortedAreas = [...data.areasOfInterest].sort((a, b) => a.order - b.order);
  const sortedPositions = [...(data.positionsOfResponsibility || [])].sort((a, b) => a.order - b.order);
  const sortedCertifications = [...(data.certifications || [])].sort((a, b) => a.order - b.order);
  const publishedCustomPages = (data.customPages || []).filter(p => p.status === 'published');

  res.json({
    profile: data.profile,
    areasOfInterest: sortedAreas,
    projects: publicProjects,
    publications: publicPublications,
    experience: sortedExperience,
    positionsOfResponsibility: sortedPositions,
    certifications: sortedCertifications,
    customPages: publishedCustomPages,
    education: sortedEducation,
    skillCategories: sortedSkills,
    seo: data.seo
  });
});

// Get single project by slug or ID
app.get('/api/public/projects/:identifier', (req: Request, res: Response) => {
  const { identifier } = req.params;
  const data = db.get();
  const project = data.projects.find(p => p.slug === identifier || p.id === identifier);
  if (!project || project.status !== 'published') {
    return res.status(404).json({ error: 'Project not found' });
  }
  res.json(project);
});

// Submit public contact form
app.post('/api/public/contact', (req: Request, res: Response) => {
  const { name, email, organisation, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Name, email, subject, and message are required' });
  }

  const data = db.get();
  const newSubmission: ContactSubmission = {
    id: 'cnt_' + Date.now(),
    name: name.trim(),
    email: email.trim(),
    organisation: organisation ? organisation.trim() : '',
    subject: subject.trim(),
    message: message.trim(),
    status: 'unread',
    createdAt: new Date().toISOString()
  };

  data.contactSubmissions.unshift(newSubmission);
  db.saveData(data);

  res.json({
    success: true,
    message: 'Thank you for your message. Pravesh Shaikh will review your inquiry shortly.'
  });
});

// -------------------------------------------------------------
// AUTHENTICATION API ENDPOINTS
// -------------------------------------------------------------

app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const data = db.get();
  const { admin } = data;

  if (email.toLowerCase().trim() !== admin.email.toLowerCase()) {
    return res.status(401).json({ error: 'Invalid administrator email or password' });
  }

  const passwordValid = bcrypt.compareSync(password, admin.passwordHash);
  if (!passwordValid) {
    return res.status(401).json({ error: 'Invalid administrator email or password' });
  }

  const token = jwt.sign(
    { id: admin.id, email: admin.email, name: admin.name, role: admin.role || 'superadmin' },
    JWT_SECRET,
    { expiresIn: '14d' }
  );

  res.json({
    token,
    user: {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role || 'superadmin'
    }
  });
});

app.get('/api/auth/me', authenticateAdmin, (req: Request, res: Response) => {
  const data = db.get();
  res.json({
    id: data.admin.id,
    email: data.admin.email,
    name: data.admin.name,
    role: data.admin.role || 'superadmin'
  });
});

app.post('/api/auth/change-password', authenticateAdmin, (req: Request, res: Response) => {
  const { currentPassword, newPassword, newEmail, newName } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Current and new password are required' });
  }
  if (newPassword.length < 6) {
    return res.status(400).json({ error: 'New password must be at least 6 characters long' });
  }

  const data = db.get();
  const passwordValid = bcrypt.compareSync(currentPassword, data.admin.passwordHash);
  if (!passwordValid) {
    return res.status(400).json({ error: 'Current password is incorrect' });
  }

  data.admin.passwordHash = bcrypt.hashSync(newPassword, 10);
  if (newEmail && newEmail.trim()) {
    data.admin.email = newEmail.trim().toLowerCase();
  }
  if (newName && newName.trim()) {
    data.admin.name = newName.trim();
  }
  data.admin.updatedAt = new Date().toISOString();
  db.saveData(data);

  res.json({ success: true, message: 'Administrator credentials updated successfully' });
});

// -------------------------------------------------------------
// ADMIN CMS & MANAGEMENT ENDPOINTS (FULL UNRESTRICTED CRUD)
// -------------------------------------------------------------

// Admin Dashboard Overview Statistics
app.get('/api/admin/overview', authenticateAdmin, (_req: Request, res: Response) => {
  const data = db.get();
  const totalProjects = data.projects.length;
  const publishedProjects = data.projects.filter(p => p.status === 'published').length;
  const draftProjects = data.projects.filter(p => p.status === 'draft').length;
  const totalPublications = data.publications.length;
  const totalExperience = data.experience.length;
  const totalPositions = (data.positionsOfResponsibility || []).length;
  const totalCertifications = (data.certifications || []).length;
  const totalCustomPages = (data.customPages || []).length;
  const totalMedia = data.mediaFiles.length;
  const unreadMessages = data.contactSubmissions.filter(c => c.status === 'unread').length;

  res.json({
    stats: {
      totalProjects,
      publishedProjects,
      draftProjects,
      totalPublications,
      totalExperience,
      totalPositions,
      totalCertifications,
      totalCustomPages,
      totalMedia,
      unreadMessages
    },
    recentSubmissions: data.contactSubmissions.slice(0, 5),
    profile: data.profile
  });
});

// Update Profile & Personal Info
app.put('/api/admin/profile', authenticateAdmin, (req: Request, res: Response) => {
  const data = db.get();
  data.profile = { ...data.profile, ...req.body };
  db.saveData(data);
  res.json({ success: true, profile: data.profile });
});

// AREAS OF INTEREST CRUD
app.get('/api/admin/areas-of-interest', authenticateAdmin, (_req: Request, res: Response) => {
  const data = db.get();
  res.json(data.areasOfInterest);
});

app.put('/api/admin/areas-of-interest', authenticateAdmin, (req: Request, res: Response) => {
  const data = db.get();
  data.areasOfInterest = req.body;
  db.saveData(data);
  res.json({ success: true, areasOfInterest: data.areasOfInterest });
});

// PROJECTS CRUD
app.get('/api/admin/projects', authenticateAdmin, (_req: Request, res: Response) => {
  const data = db.get();
  res.json(data.projects);
});

app.post('/api/admin/projects', authenticateAdmin, (req: Request, res: Response) => {
  const data = db.get();
  const newProject: Project = {
    id: 'proj_' + Date.now(),
    title: req.body.title || 'Untitled Project',
    slug: (req.body.title || 'project-' + Date.now()).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    category: req.body.category || 'General Development',
    organisation: req.body.organisation || '',
    duration: req.body.duration || '',
    year: Number(req.body.year) || new Date().getFullYear(),
    coverImage: req.body.coverImage || '/src/assets/images/solapur_textile_fieldwork_1794261204858.jpg',
    summary: req.body.summary || '',
    context: req.body.context || '',
    problemStatement: req.body.problemStatement || '',
    objectives: Array.isArray(req.body.objectives) ? req.body.objectives : [],
    role: req.body.role || '',
    methodology: req.body.methodology || '',
    toolsAndApproaches: Array.isArray(req.body.toolsAndApproaches) ? req.body.toolsAndApproaches : [],
    activities: Array.isArray(req.body.activities) ? req.body.activities : [],
    findings: req.body.findings || '',
    outcomes: Array.isArray(req.body.outcomes) ? req.body.outcomes : [],
    gallery: Array.isArray(req.body.gallery) ? req.body.gallery : [],
    documentUrl: req.body.documentUrl || '',
    externalLink: req.body.externalLink || '',
    isFeatured: Boolean(req.body.isFeatured),
    status: req.body.status || 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  data.projects.unshift(newProject);
  db.saveData(data);
  res.json(newProject);
});

app.put('/api/admin/projects/:id', authenticateAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const data = db.get();
  const index = data.projects.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Project not found' });
  }

  data.projects[index] = {
    ...data.projects[index],
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  db.saveData(data);
  res.json(data.projects[index]);
});

app.delete('/api/admin/projects/:id', authenticateAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const data = db.get();
  data.projects = data.projects.filter(p => p.id !== id);
  db.saveData(data);
  res.json({ success: true });
});

// PUBLICATIONS CRUD
app.get('/api/admin/publications', authenticateAdmin, (_req: Request, res: Response) => {
  const data = db.get();
  res.json(data.publications);
});

app.post('/api/admin/publications', authenticateAdmin, (req: Request, res: Response) => {
  const data = db.get();
  const newPub: Publication = {
    id: 'pub_' + Date.now(),
    title: req.body.title || 'Untitled Publication',
    category: req.body.category || 'Research Paper',
    institution: req.body.institution || 'TISS Mumbai',
    year: Number(req.body.year) || new Date().getFullYear(),
    date: req.body.date || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    authors: Array.isArray(req.body.authors) ? req.body.authors : ['Pravesh Shaikh'],
    abstract: req.body.abstract || '',
    coverImage: req.body.coverImage || '',
    documentUrl: req.body.documentUrl || '',
    externalUrl: req.body.externalUrl || '',
    status: req.body.status || 'published',
    createdAt: new Date().toISOString()
  };
  data.publications.unshift(newPub);
  db.saveData(data);
  res.json(newPub);
});

app.put('/api/admin/publications/:id', authenticateAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const data = db.get();
  const index = data.publications.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: 'Publication not found' });
  data.publications[index] = { ...data.publications[index], ...req.body };
  db.saveData(data);
  res.json(data.publications[index]);
});

app.delete('/api/admin/publications/:id', authenticateAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const data = db.get();
  data.publications = data.publications.filter(p => p.id !== id);
  db.saveData(data);
  res.json({ success: true });
});

// EXPERIENCE CRUD
app.get('/api/admin/experience', authenticateAdmin, (_req: Request, res: Response) => {
  const data = db.get();
  res.json(data.experience);
});

app.post('/api/admin/experience', authenticateAdmin, (req: Request, res: Response) => {
  const data = db.get();
  const newExp: Experience = {
    id: 'exp_' + Date.now(),
    designation: req.body.designation || 'Role',
    organisation: req.body.organisation || 'Organisation',
    duration: req.body.duration || '2026',
    location: req.body.location || 'Mumbai',
    type: req.body.type || 'On site',
    description: req.body.description || '',
    responsibilities: Array.isArray(req.body.responsibilities) ? req.body.responsibilities : [],
    keyContributions: Array.isArray(req.body.keyContributions) ? req.body.keyContributions : [],
    logoUrl: req.body.logoUrl || '',
    documentUrl: req.body.documentUrl || '',
    order: data.experience.length + 1
  };
  data.experience.push(newExp);
  db.saveData(data);
  res.json(newExp);
});

app.put('/api/admin/experience/:id', authenticateAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const data = db.get();
  const index = data.experience.findIndex(e => e.id === id);
  if (index === -1) return res.status(404).json({ error: 'Experience not found' });
  data.experience[index] = { ...data.experience[index], ...req.body };
  db.saveData(data);
  res.json(data.experience[index]);
});

app.delete('/api/admin/experience/:id', authenticateAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const data = db.get();
  data.experience = data.experience.filter(e => e.id !== id);
  db.saveData(data);
  res.json({ success: true });
});

// POSITIONS OF RESPONSIBILITY CRUD
app.get('/api/admin/positions', authenticateAdmin, (_req: Request, res: Response) => {
  const data = db.get();
  res.json(data.positionsOfResponsibility || []);
});

app.post('/api/admin/positions', authenticateAdmin, (req: Request, res: Response) => {
  const data = db.get();
  if (!data.positionsOfResponsibility) data.positionsOfResponsibility = [];
  const newPos: PositionOfResponsibility = {
    id: 'por_' + Date.now(),
    role: req.body.role || 'Position Title',
    institution: req.body.institution || 'TISS, Mumbai',
    duration: req.body.duration || '2026 — Present',
    points: Array.isArray(req.body.points) ? req.body.points : [req.body.points || ''],
    order: data.positionsOfResponsibility.length + 1
  };
  data.positionsOfResponsibility.push(newPos);
  db.saveData(data);
  res.json(newPos);
});

app.put('/api/admin/positions/:id', authenticateAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const data = db.get();
  if (!data.positionsOfResponsibility) data.positionsOfResponsibility = [];
  const idx = data.positionsOfResponsibility.findIndex(p => p.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Position not found' });
  data.positionsOfResponsibility[idx] = { ...data.positionsOfResponsibility[idx], ...req.body };
  db.saveData(data);
  res.json(data.positionsOfResponsibility[idx]);
});

app.delete('/api/admin/positions/:id', authenticateAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const data = db.get();
  if (data.positionsOfResponsibility) {
    data.positionsOfResponsibility = data.positionsOfResponsibility.filter(p => p.id !== id);
    db.saveData(data);
  }
  res.json({ success: true });
});

// CERTIFICATIONS CRUD
app.get('/api/admin/certifications', authenticateAdmin, (_req: Request, res: Response) => {
  const data = db.get();
  res.json(data.certifications || []);
});

app.post('/api/admin/certifications', authenticateAdmin, (req: Request, res: Response) => {
  const data = db.get();
  if (!data.certifications) data.certifications = [];
  const newCert: Certification = {
    id: 'cert_' + Date.now(),
    title: req.body.title || 'Certification Title',
    issuer: req.body.issuer || 'Issuing Organization',
    year: req.body.year || '2026',
    url: req.body.url || '',
    order: data.certifications.length + 1
  };
  data.certifications.push(newCert);
  db.saveData(data);
  res.json(newCert);
});

app.put('/api/admin/certifications/:id', authenticateAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const data = db.get();
  if (!data.certifications) data.certifications = [];
  const idx = data.certifications.findIndex(c => c.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Certification not found' });
  data.certifications[idx] = { ...data.certifications[idx], ...req.body };
  db.saveData(data);
  res.json(data.certifications[idx]);
});

app.delete('/api/admin/certifications/:id', authenticateAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const data = db.get();
  if (data.certifications) {
    data.certifications = data.certifications.filter(c => c.id !== id);
    db.saveData(data);
  }
  res.json({ success: true });
});

// CUSTOM PAGES CRUD (Create, Edit, Delete custom pages)
app.get('/api/admin/pages', authenticateAdmin, (_req: Request, res: Response) => {
  const data = db.get();
  res.json(data.customPages || []);
});

app.post('/api/admin/pages', authenticateAdmin, (req: Request, res: Response) => {
  const data = db.get();
  if (!data.customPages) data.customPages = [];
  const newPage: CustomPage = {
    id: 'page_' + Date.now(),
    title: req.body.title || 'New Page',
    slug: (req.body.title || 'page-' + Date.now()).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    subtitle: req.body.subtitle || '',
    content: req.body.content || '',
    status: req.body.status || 'published',
    order: data.customPages.length + 1,
    updatedAt: new Date().toISOString()
  };
  data.customPages.push(newPage);
  db.saveData(data);
  res.json(newPage);
});

app.put('/api/admin/pages/:id', authenticateAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const data = db.get();
  if (!data.customPages) data.customPages = [];
  const idx = data.customPages.findIndex(p => p.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Page not found' });
  data.customPages[idx] = {
    ...data.customPages[idx],
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  db.saveData(data);
  res.json(data.customPages[idx]);
});

app.delete('/api/admin/pages/:id', authenticateAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const data = db.get();
  if (data.customPages) {
    data.customPages = data.customPages.filter(p => p.id !== id);
    db.saveData(data);
  }
  res.json({ success: true });
});

// EDUCATION CRUD
app.get('/api/admin/education', authenticateAdmin, (_req: Request, res: Response) => {
  const data = db.get();
  res.json(data.education);
});

app.post('/api/admin/education', authenticateAdmin, (req: Request, res: Response) => {
  const data = db.get();
  const newEdu: Education = {
    id: 'edu_' + Date.now(),
    degree: req.body.degree || 'Degree Title',
    institution: req.body.institution || 'University Name',
    location: req.body.location || 'City, Country',
    duration: req.body.duration || '2024 - 2026',
    year: Number(req.body.year) || new Date().getFullYear(),
    score: req.body.score || '',
    academicFocus: req.body.academicFocus || '',
    description: req.body.description || '',
    courses: Array.isArray(req.body.courses) ? req.body.courses : [],
    order: data.education.length + 1
  };
  data.education.push(newEdu);
  db.saveData(data);
  res.json(newEdu);
});

app.put('/api/admin/education/:id', authenticateAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const data = db.get();
  const index = data.education.findIndex(e => e.id === id);
  if (index === -1) return res.status(404).json({ error: 'Education entry not found' });
  data.education[index] = { ...data.education[index], ...req.body };
  db.saveData(data);
  res.json(data.education[index]);
});

app.delete('/api/admin/education/:id', authenticateAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const data = db.get();
  data.education = data.education.filter(e => e.id !== id);
  db.saveData(data);
  res.json({ success: true });
});

// SKILLS CRUD
app.get('/api/admin/skills', authenticateAdmin, (_req: Request, res: Response) => {
  const data = db.get();
  res.json(data.skillCategories);
});

app.put('/api/admin/skills', authenticateAdmin, (req: Request, res: Response) => {
  const data = db.get();
  data.skillCategories = req.body;
  db.saveData(data);
  res.json({ success: true, skillCategories: data.skillCategories });
});

// CV DOCUMENT UPLOAD ENDPOINT
app.post('/api/admin/upload-cv', authenticateAdmin, upload.single('cvFile'), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No CV document file provided' });
  }

  const cvUrl = `/uploads/${req.file.filename}`;
  const data = db.get();
  data.profile.cvUrl = cvUrl;

  // Also add to media files
  const newMedia: MediaFile = {
    id: 'med_' + Date.now(),
    filename: req.file.filename,
    originalName: req.file.originalname,
    mimeType: req.file.mimetype,
    size: req.file.size,
    url: cvUrl,
    altText: `Official CV of ${data.profile.name}`,
    folder: 'Documents',
    createdAt: new Date().toISOString()
  };
  data.mediaFiles.unshift(newMedia);

  db.saveData(data);
  res.json({ success: true, cvUrl, message: 'CV uploaded and integrated successfully' });
});

// MEDIA LIBRARY ENDPOINTS
app.get('/api/admin/media', authenticateAdmin, (_req: Request, res: Response) => {
  const data = db.get();
  res.json(data.mediaFiles);
});

app.post('/api/admin/media/upload', authenticateAdmin, upload.single('file'), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const fileUrl = `/uploads/${req.file.filename}`;
  const data = db.get();

  const newMedia: MediaFile = {
    id: 'med_' + Date.now(),
    filename: req.file.filename,
    originalName: req.file.originalname,
    mimeType: req.file.mimetype,
    size: req.file.size,
    url: fileUrl,
    altText: req.body.altText || req.file.originalname,
    folder: req.body.folder || 'General',
    createdAt: new Date().toISOString()
  };

  data.mediaFiles.unshift(newMedia);
  db.saveData(data);
  res.json(newMedia);
});

app.delete('/api/admin/media/:id', authenticateAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const data = db.get();
  const media = data.mediaFiles.find(m => m.id === id);
  if (media && media.url.startsWith('/uploads/')) {
    const filePath = path.resolve(process.cwd(), 'public', media.url.replace(/^\//, ''));
    if (fs.existsSync(filePath)) {
      try { fs.unlinkSync(filePath); } catch (e) { console.error('Failed to delete file from disk:', e); }
    }
  }
  data.mediaFiles = data.mediaFiles.filter(m => m.id !== id);
  db.saveData(data);
  res.json({ success: true });
});

// CONTACT INBOX ENDPOINTS
app.get('/api/admin/contacts', authenticateAdmin, (_req: Request, res: Response) => {
  const data = db.get();
  res.json(data.contactSubmissions);
});

app.put('/api/admin/contacts/:id', authenticateAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const data = db.get();
  const index = data.contactSubmissions.findIndex(c => c.id === id);
  if (index === -1) return res.status(404).json({ error: 'Submission not found' });
  data.contactSubmissions[index] = { ...data.contactSubmissions[index], ...req.body };
  db.saveData(data);
  res.json(data.contactSubmissions[index]);
});

app.delete('/api/admin/contacts/:id', authenticateAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const data = db.get();
  data.contactSubmissions = data.contactSubmissions.filter(c => c.id !== id);
  db.saveData(data);
  res.json({ success: true });
});

// SEO MANAGEMENT
app.put('/api/admin/seo', authenticateAdmin, (req: Request, res: Response) => {
  const data = db.get();
  data.seo = { ...data.seo, ...req.body };
  db.saveData(data);
  res.json({ success: true, seo: data.seo });
});

// DATABASE BACKUP EXPORT & RESTORE
app.get('/api/admin/backup/export', authenticateAdmin, (_req: Request, res: Response) => {
  const data = db.get();
  const exportCopy = JSON.parse(JSON.stringify(data));
  delete exportCopy.admin.passwordHash;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', 'attachment; filename=pravesh_shaikh_portfolio_backup.json');
  res.send(JSON.stringify(exportCopy, null, 2));
});

app.post('/api/admin/backup/restore', authenticateAdmin, (req: Request, res: Response) => {
  try {
    const importedData = req.body;
    if (!importedData.profile || !importedData.projects) {
      return res.status(400).json({ error: 'Invalid backup file structure' });
    }
    const currentDb = db.get();
    importedData.admin = {
      ...importedData.admin,
      passwordHash: currentDb.admin.passwordHash
    };
    db.saveData(importedData);
    res.json({ success: true, message: 'Database restored successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to restore database backup' });
  }
});

// -------------------------------------------------------------
// SERVE STATIC ASSETS AND VITE MIDDLEWARE
// -------------------------------------------------------------
const publicDir = path.resolve(process.cwd(), 'public');
app.use(express.static(publicDir));

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
