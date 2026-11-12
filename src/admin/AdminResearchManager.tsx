import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Publication } from '../types';
import { Plus, Edit, Trash2, BookOpen, Save, X } from 'lucide-react';

export const AdminResearchManager: React.FC = () => {
  const { token, reloadPublicData } = usePortfolio();
  const [pubs, setPubs] = useState<Publication[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPub, setCurrentPub] = useState<Partial<Publication>>({});
  const [isEditing, setIsEditing] = useState(false);

  const fetchPubs = async () => {
    try {
      const res = await fetch('/api/admin/publications', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setPubs(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchPubs();
  }, [token]);

  const handleOpenAdd = () => {
    setCurrentPub({
      title: '',
      category: 'Policy Brief',
      institution: 'TISS Mumbai',
      year: new Date().getFullYear(),
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      authors: ['Pravesh Shaikh'],
      abstract: '',
      documentUrl: '',
      externalUrl: '',
      status: 'published'
    });
    setIsEditing(false);
    setModalOpen(true);
  };

  const handleOpenEdit = (pub: Publication) => {
    setCurrentPub({ ...pub });
    setIsEditing(true);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete publication entry?')) return;
    try {
      await fetch(`/api/admin/publications/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchPubs();
      await reloadPublicData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = isEditing
      ? `/api/admin/publications/${currentPub.id}`
      : '/api/admin/publications';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(currentPub)
      });
      if (res.ok) {
        setModalOpen(false);
        await fetchPubs();
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
            Research & Publications CMS
          </h1>
          <p className="text-xs text-[#78716C] dark:text-[#9CA3AF] mt-1">
            Manage academic papers, policy briefs, and working papers.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase text-white bg-[#2D4A3E] rounded-md"
        >
          <Plus className="w-4 h-4" /> Add Publication
        </button>
      </div>

      <div className="bg-white dark:bg-[#1A1D24] rounded-xl border border-[#EBE6DF] dark:border-[#272A30] overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#FAF8F5] dark:bg-[#232730] border-b text-[#78716C] font-semibold uppercase">
            <tr>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Institution</th>
              <th className="py-3 px-4">Year</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EBE6DF] text-[#1C1917] dark:text-[#F3F4F6]">
            {pubs.map(pub => (
              <tr key={pub.id} className="hover:bg-[#FAF8F5]/50">
                <td className="py-3 px-4 font-semibold">{pub.title}</td>
                <td className="py-3 px-4">{pub.category}</td>
                <td className="py-3 px-4">{pub.institution}</td>
                <td className="py-3 px-4">{pub.year}</td>
                <td className="py-3 px-4 text-right space-x-2">
                  <button onClick={() => handleOpenEdit(pub)} className="p-1.5 text-blue-600">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(pub.id)} className="p-1.5 text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-xl bg-white dark:bg-[#1A1D24] p-6 rounded-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b">
              <h3 className="font-serif text-lg font-semibold">{isEditing ? 'Edit' : 'Add'} Publication</h3>
              <button onClick={() => setModalOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Title</label>
                <input
                  type="text"
                  value={currentPub.title || ''}
                  onChange={e => setCurrentPub({ ...currentPub, title: e.target.value })}
                  required
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Category</label>
                  <input
                    type="text"
                    value={currentPub.category || ''}
                    onChange={e => setCurrentPub({ ...currentPub, category: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Year</label>
                  <input
                    type="number"
                    value={currentPub.year || new Date().getFullYear()}
                    onChange={e => setCurrentPub({ ...currentPub, year: Number(e.target.value) })}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Abstract</label>
                <textarea
                  rows={4}
                  value={currentPub.abstract || ''}
                  onChange={e => setCurrentPub({ ...currentPub, abstract: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">PDF Document URL</label>
                <input
                  type="text"
                  value={currentPub.documentUrl || ''}
                  onChange={e => setCurrentPub({ ...currentPub, documentUrl: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 border rounded-md">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#2D4A3E] text-white rounded-md font-semibold">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
