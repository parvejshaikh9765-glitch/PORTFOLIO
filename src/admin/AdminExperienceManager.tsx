import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Experience } from '../types';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

export const AdminExperienceManager: React.FC = () => {
  const { token, reloadPublicData } = usePortfolio();
  const [items, setItems] = useState<Experience[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Partial<Experience>>({});
  const [isEditing, setIsEditing] = useState(false);

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/admin/experience', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setItems(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [token]);

  const handleOpenAdd = () => {
    setCurrentItem({
      designation: '',
      organisation: '',
      duration: '2025',
      location: 'Mumbai',
      type: 'Academic',
      description: '',
      responsibilities: [''],
      keyContributions: ['']
    });
    setIsEditing(false);
    setModalOpen(true);
  };

  const handleOpenEdit = (item: Experience) => {
    setCurrentItem({ ...item });
    setIsEditing(true);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete experience entry?')) return;
    try {
      await fetch(`/api/admin/experience/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchItems();
      await reloadPublicData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = isEditing
      ? `/api/admin/experience/${currentItem.id}`
      : '/api/admin/experience';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(currentItem)
      });
      if (res.ok) {
        setModalOpen(false);
        await fetchItems();
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
            Experience & Fieldwork CMS
          </h1>
          <p className="text-xs text-[#78716C] dark:text-[#9CA3AF] mt-1">
            Manage professional positions, internships, and research assistantships.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase text-white bg-[#2D4A3E] rounded-md"
        >
          <Plus className="w-4 h-4" /> Add Experience
        </button>
      </div>

      <div className="bg-white dark:bg-[#1A1D24] rounded-xl border border-[#EBE6DF] dark:border-[#272A30] overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#FAF8F5] dark:bg-[#232730] border-b text-[#78716C] font-semibold uppercase">
            <tr>
              <th className="py-3 px-4">Designation</th>
              <th className="py-3 px-4">Organisation</th>
              <th className="py-3 px-4">Duration</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EBE6DF] text-[#1C1917] dark:text-[#F3F4F6]">
            {items.map(exp => (
              <tr key={exp.id} className="hover:bg-[#FAF8F5]/50">
                <td className="py-3 px-4 font-semibold">{exp.designation}</td>
                <td className="py-3 px-4">{exp.organisation}</td>
                <td className="py-3 px-4">{exp.duration}</td>
                <td className="py-3 px-4">{exp.type}</td>
                <td className="py-3 px-4 text-right space-x-2">
                  <button onClick={() => handleOpenEdit(exp)} className="p-1.5 text-blue-600">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(exp.id)} className="p-1.5 text-red-600">
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
          <div className="w-full max-w-lg bg-white dark:bg-[#1A1D24] p-6 rounded-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b">
              <h3 className="font-serif text-lg font-semibold">{isEditing ? 'Edit' : 'Add'} Experience</h3>
              <button onClick={() => setModalOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Designation</label>
                <input
                  type="text"
                  value={currentItem.designation || ''}
                  onChange={e => setCurrentItem({ ...currentItem, designation: e.target.value })}
                  required
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Organisation</label>
                <input
                  type="text"
                  value={currentItem.organisation || ''}
                  onChange={e => setCurrentItem({ ...currentItem, organisation: e.target.value })}
                  required
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Duration</label>
                  <input
                    type="text"
                    value={currentItem.duration || ''}
                    onChange={e => setCurrentItem({ ...currentItem, duration: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Location</label>
                  <input
                    type="text"
                    value={currentItem.location || ''}
                    onChange={e => setCurrentItem({ ...currentItem, location: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  value={currentItem.description || ''}
                  onChange={e => setCurrentItem({ ...currentItem, description: e.target.value })}
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
