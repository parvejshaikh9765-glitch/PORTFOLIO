import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project } from '../types';
import { Plus, Edit, Trash2, Copy, Eye, Star, Save, X, Image as ImageIcon, CheckCircle2 } from 'lucide-react';

export const AdminProjectsManager: React.FC = () => {
  const { token, reloadPublicData } = usePortfolio();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<Project>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/admin/projects', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [token]);

  const handleOpenAdd = () => {
    setCurrentProject({
      title: '',
      category: 'Urban Development',
      organisation: 'TISS Mumbai',
      duration: '2025',
      year: new Date().getFullYear(),
      coverImage: '/src/assets/images/solapur_textile_fieldwork_1794261204858.jpg',
      summary: '',
      context: '',
      problemStatement: '',
      objectives: [''],
      role: 'Research Scholar',
      methodology: '',
      toolsAndApproaches: ['QGIS', 'Excel'],
      activities: [''],
      findings: '',
      outcomes: [''],
      gallery: [],
      isFeatured: false,
      status: 'published'
    });
    setIsEditing(false);
    setModalOpen(true);
  };

  const handleOpenEdit = (project: Project) => {
    setCurrentProject({ ...project });
    setIsEditing(true);
    setModalOpen(true);
  };

  const handleDuplicate = async (project: Project) => {
    const duplicated = {
      ...project,
      title: `${project.title} (Copy)`,
      slug: `${project.slug}-copy-${Date.now()}`
    };
    delete (duplicated as any).id;

    try {
      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(duplicated)
      });
      if (res.ok) {
        await fetchProjects();
        await reloadPublicData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        await fetchProjects();
        await reloadPublicData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = isEditing
        ? `/api/admin/projects/${currentProject.id}`
        : '/api/admin/projects';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(currentProject)
      });

      if (res.ok) {
        setModalOpen(false);
        await fetchProjects();
        await reloadPublicData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-[#1C1917] dark:text-[#F3F4F6]">
            Projects & Fieldwork CMS
          </h1>
          <p className="text-xs text-[#78716C] dark:text-[#9CA3AF] mt-1">
            Create, edit, feature, duplicate, and publish case studies for Pravesh Shaikh's portfolio.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#2D4A3E] hover:bg-[#233A31] rounded-md shadow-xs transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Projects List Table */}
      <div className="bg-white dark:bg-[#1A1D24] rounded-xl border border-[#EBE6DF] dark:border-[#272A30] overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#FAF8F5] dark:bg-[#232730] border-b border-[#EBE6DF] dark:border-[#272A30] text-[#78716C] dark:text-[#9CA3AF] font-semibold uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4">Project</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Organisation</th>
              <th className="py-3 px-4">Featured</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EBE6DF] dark:divide-[#272A30] text-[#1C1917] dark:text-[#F3F4F6]">
            {projects.map((proj) => (
              <tr key={proj.id} className="hover:bg-[#FAF8F5]/50 dark:hover:bg-[#232730]/50 transition-colors">
                <td className="py-3 px-4 flex items-center gap-3">
                  <img src={proj.coverImage} alt="" className="w-10 h-10 object-cover rounded-md border border-[#EBE6DF]" />
                  <div>
                    <span className="font-semibold block">{proj.title}</span>
                    <span className="text-[10px] text-[#78716C]">{proj.year}</span>
                  </div>
                </td>
                <td className="py-3 px-4 font-medium">{proj.category}</td>
                <td className="py-3 px-4">{proj.organisation}</td>
                <td className="py-3 px-4">
                  {proj.isFeatured ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-700 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> Featured
                    </span>
                  ) : (
                    <span className="text-[10px] text-[#78716C]">Standard</span>
                  )}
                </td>
                <td className="py-3 px-4">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md uppercase ${
                    proj.status === 'published' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300' : 'bg-stone-100 text-stone-600'
                  }`}>
                    {proj.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right space-x-2">
                  <button
                    onClick={() => handleOpenEdit(proj)}
                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md"
                    title="Edit Project"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDuplicate(proj)}
                    className="p-1.5 text-stone-600 hover:bg-stone-100 rounded-md"
                    title="Duplicate Project"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(proj.id)}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-md"
                    title="Delete Project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit / Add Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-white dark:bg-[#1A1D24] rounded-2xl p-8 border border-[#EBE6DF] dark:border-[#272A30] shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#EBE6DF] dark:border-[#272A30]">
              <h3 className="font-serif text-xl font-semibold text-[#1C1917] dark:text-[#F3F4F6]">
                {isEditing ? 'Edit Project Case Study' : 'Create New Project'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-[#78716C] hover:text-[#1C1917]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold uppercase text-[#78716C] mb-1">Project Title</label>
                  <input
                    type="text"
                    value={currentProject.title || ''}
                    onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                    required
                    className="w-full p-2 bg-[#FAF8F5] dark:bg-[#232730] border rounded-md"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase text-[#78716C] mb-1">Category</label>
                  <input
                    type="text"
                    value={currentProject.category || ''}
                    onChange={(e) => setCurrentProject({ ...currentProject, category: e.target.value })}
                    required
                    className="w-full p-2 bg-[#FAF8F5] dark:bg-[#232730] border rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold uppercase text-[#78716C] mb-1">Organisation</label>
                  <input
                    type="text"
                    value={currentProject.organisation || ''}
                    onChange={(e) => setCurrentProject({ ...currentProject, organisation: e.target.value })}
                    className="w-full p-2 bg-[#FAF8F5] dark:bg-[#232730] border rounded-md"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-[#78716C] mb-1">Duration</label>
                  <input
                    type="text"
                    value={currentProject.duration || ''}
                    onChange={(e) => setCurrentProject({ ...currentProject, duration: e.target.value })}
                    className="w-full p-2 bg-[#FAF8F5] dark:bg-[#232730] border rounded-md"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-[#78716C] mb-1">Role</label>
                  <input
                    type="text"
                    value={currentProject.role || ''}
                    onChange={(e) => setCurrentProject({ ...currentProject, role: e.target.value })}
                    className="w-full p-2 bg-[#FAF8F5] dark:bg-[#232730] border rounded-md"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase text-[#78716C] mb-1">Cover Image URL</label>
                <input
                  type="text"
                  value={currentProject.coverImage || ''}
                  onChange={(e) => setCurrentProject({ ...currentProject, coverImage: e.target.value })}
                  className="w-full p-2 bg-[#FAF8F5] dark:bg-[#232730] border rounded-md"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold uppercase text-[#78716C] mb-1">Project Link / GitHub Repository URL</label>
                  <input
                    type="text"
                    placeholder="https://github.com/..."
                    value={currentProject.externalLink || ''}
                    onChange={(e) => setCurrentProject({ ...currentProject, externalLink: e.target.value })}
                    className="w-full p-2 bg-[#FAF8F5] dark:bg-[#232730] border rounded-md"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase text-[#78716C] mb-1">Project PDF Report URL (Leave blank if none)</label>
                  <input
                    type="text"
                    placeholder="/assets/aistudio/..."
                    value={currentProject.documentUrl || ''}
                    onChange={(e) => setCurrentProject({ ...currentProject, documentUrl: e.target.value })}
                    className="w-full p-2 bg-[#FAF8F5] dark:bg-[#232730] border rounded-md"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase text-[#78716C] mb-1">Executive Summary</label>
                <textarea
                  rows={2}
                  value={currentProject.summary || ''}
                  onChange={(e) => setCurrentProject({ ...currentProject, summary: e.target.value })}
                  className="w-full p-2 bg-[#FAF8F5] dark:bg-[#232730] border rounded-md"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-[#78716C] mb-1">Problem Statement</label>
                <textarea
                  rows={3}
                  value={currentProject.problemStatement || ''}
                  onChange={(e) => setCurrentProject({ ...currentProject, problemStatement: e.target.value })}
                  className="w-full p-2 bg-[#FAF8F5] dark:bg-[#232730] border rounded-md"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-[#78716C] mb-1">Methodology</label>
                <textarea
                  rows={3}
                  value={currentProject.methodology || ''}
                  onChange={(e) => setCurrentProject({ ...currentProject, methodology: e.target.value })}
                  className="w-full p-2 bg-[#FAF8F5] dark:bg-[#232730] border rounded-md"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-[#78716C] mb-1">Findings & Empirical Insights</label>
                <textarea
                  rows={3}
                  value={currentProject.findings || ''}
                  onChange={(e) => setCurrentProject({ ...currentProject, findings: e.target.value })}
                  className="w-full p-2 bg-[#FAF8F5] dark:bg-[#232730] border rounded-md"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-semibold">
                  <input
                    type="checkbox"
                    checked={Boolean(currentProject.isFeatured)}
                    onChange={(e) => setCurrentProject({ ...currentProject, isFeatured: e.target.checked })}
                  />
                  <span>Feature on Homepage</span>
                </label>

                <div className="flex items-center gap-2">
                  <span className="font-semibold uppercase text-[#78716C]">Status:</span>
                  <select
                    value={currentProject.status || 'published'}
                    onChange={(e) => setCurrentProject({ ...currentProject, status: e.target.value as any })}
                    className="p-1.5 bg-[#FAF8F5] dark:bg-[#232730] border rounded-md"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-[#FAF8F5] rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 text-white bg-[#2D4A3E] rounded-md font-semibold"
                >
                  {saving ? 'Saving...' : 'Save Project'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
