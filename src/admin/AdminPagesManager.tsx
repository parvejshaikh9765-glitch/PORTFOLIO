import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { CustomPage } from '../types';
import { Plus, Edit, Trash2, Globe, Save, X, Eye } from 'lucide-react';

export const AdminPagesManager: React.FC = () => {
  const { token, reloadPublicData, navigate } = usePortfolio();
  const [pages, setPages] = useState<CustomPage[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<Partial<CustomPage>>({});
  const [isEditing, setIsEditing] = useState(false);

  const fetchPages = async () => {
    try {
      const res = await fetch('/api/admin/pages', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setPages(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchPages();
  }, [token]);

  const handleOpenAdd = () => {
    setCurrentPage({
      title: '',
      slug: '',
      subtitle: '',
      content: '',
      status: 'published'
    });
    setIsEditing(false);
    setModalOpen(true);
  };

  const handleOpenEdit = (page: CustomPage) => {
    setCurrentPage({ ...page });
    setIsEditing(true);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this custom page?')) return;
    try {
      await fetch(`/api/admin/pages/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchPages();
      await reloadPublicData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = isEditing ? `/api/admin/pages/${currentPage.id}` : '/api/admin/pages';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(currentPage)
      });
      if (res.ok) {
        setModalOpen(false);
        await fetchPages();
        await reloadPublicData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-[#1C1917] dark:text-[#F3F4F6]">
            Custom Page Builder & Management
          </h1>
          <p className="text-xs text-[#78716C] dark:text-[#9CA3AF] mt-1">
            Create new custom pages, essay showcases, policy monographs, or collaboration briefs.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#2D4A3E] hover:bg-[#233A31] rounded-md shadow-xs transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Page</span>
        </button>
      </div>

      <div className="bg-white dark:bg-[#1A1D24] rounded-xl border border-[#EBE6DF] dark:border-[#272A30] overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#FAF8F5] dark:bg-[#232730] border-b border-[#EBE6DF] dark:border-[#272A30] text-[#78716C] dark:text-[#9CA3AF] font-semibold uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4">Page Title</th>
              <th className="py-3 px-4">Route Path</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Last Updated</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EBE6DF] dark:divide-[#272A30] text-[#1C1917] dark:text-[#F3F4F6]">
            {pages.map((page) => (
              <tr key={page.id} className="hover:bg-[#FAF8F5]/50">
                <td className="py-3 px-4 font-semibold">{page.title}</td>
                <td className="py-3 px-4 font-mono text-[#2D4A3E] dark:text-[#6E9E88]">/pages/{page.slug}</td>
                <td className="py-3 px-4">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md uppercase ${
                    page.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-600'
                  }`}>
                    {page.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-[#78716C]">{new Date(page.updatedAt).toLocaleDateString()}</td>
                <td className="py-3 px-4 text-right space-x-2">
                  <button
                    onClick={() => navigate(`/pages/${page.slug}`)}
                    className="p-1.5 text-stone-600 hover:bg-stone-100 rounded-md"
                    title="View Page"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleOpenEdit(page)}
                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md"
                    title="Edit Page"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(page.id)}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-md"
                    title="Delete Page"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {pages.length === 0 && (
          <div className="p-8 text-center text-xs text-[#78716C]">
            No custom pages created yet. Click "Create New Page" to publish standalone pages.
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-white dark:bg-[#1A1D24] p-6 rounded-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b">
              <h3 className="font-serif text-lg font-semibold">{isEditing ? 'Edit' : 'Create'} Custom Page</h3>
              <button onClick={() => setModalOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Page Title</label>
                  <input
                    type="text"
                    value={currentPage.title || ''}
                    onChange={e => setCurrentPage({ ...currentPage, title: e.target.value })}
                    required
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Slug URL Identifier</label>
                  <input
                    type="text"
                    value={currentPage.slug || ''}
                    onChange={e => setCurrentPage({ ...currentPage, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
                    required
                    placeholder="e.g. policy-brief-archive"
                    className="w-full p-2 border rounded-md font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Subtitle / Summary</label>
                <input
                  type="text"
                  value={currentPage.subtitle || ''}
                  onChange={e => setCurrentPage({ ...currentPage, subtitle: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Page Body Content</label>
                <textarea
                  rows={8}
                  value={currentPage.content || ''}
                  onChange={e => setCurrentPage({ ...currentPage, content: e.target.value })}
                  required
                  placeholder="Write full page content here..."
                  className="w-full p-2 border rounded-md font-sans"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 border rounded-md">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#2D4A3E] text-white rounded-md font-semibold">Save Page</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
