import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { PositionOfResponsibility, Certification } from '../types';
import { Plus, Edit, Trash2, Award, Users, Save, X, CheckCircle2 } from 'lucide-react';

export const AdminLeadershipCertManager: React.FC = () => {
  const { token, reloadPublicData } = usePortfolio();

  // Positions state
  const [positions, setPositions] = useState<PositionOfResponsibility[]>([]);
  const [posModalOpen, setPosModalOpen] = useState(false);
  const [currentPos, setCurrentPos] = useState<Partial<PositionOfResponsibility>>({});
  const [isEditingPos, setIsEditingPos] = useState(false);

  // Certifications state
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [currentCert, setCurrentCert] = useState<Partial<Certification>>({});
  const [isEditingCert, setIsEditingCert] = useState(false);

  const fetchData = async () => {
    try {
      const [pRes, cRes] = await Promise.all([
        fetch('/api/admin/positions', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/admin/certifications', { headers: { Authorization: `Bearer ${token}` } })
      ]);
      const pData = await pRes.json();
      const cData = await cRes.json();
      setPositions(pData);
      setCertifications(cData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  // Handle Position Save
  const handleSavePos = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = isEditingPos ? `/api/admin/positions/${currentPos.id}` : '/api/admin/positions';
    const method = isEditingPos ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(currentPos)
      });
      if (res.ok) {
        setPosModalOpen(false);
        await fetchData();
        await reloadPublicData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePos = async (id: string) => {
    if (!confirm('Delete this position of responsibility?')) return;
    try {
      await fetch(`/api/admin/positions/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchData();
      await reloadPublicData();
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Certification Save
  const handleSaveCert = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = isEditingCert ? `/api/admin/certifications/${currentCert.id}` : '/api/admin/certifications';
    const method = isEditingCert ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(currentCert)
      });
      if (res.ok) {
        setCertModalOpen(false);
        await fetchData();
        await reloadPublicData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCert = async (id: string) => {
    if (!confirm('Delete this certification record?')) return;
    try {
      await fetch(`/api/admin/certifications/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchData();
      await reloadPublicData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-serif text-3xl font-semibold text-[#1C1917] dark:text-[#F3F4F6]">
          Positions of Responsibility & Certifications CMS
        </h1>
        <p className="text-xs text-[#78716C] dark:text-[#9CA3AF] mt-1">
          Full CRUD access over institutional leadership roles (Placement Committee, Alumni Outreach) and professional credentials (IBM, World Bank).
        </p>
      </div>

      {/* POSITIONS OF RESPONSIBILITY BLOCK */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#EBE6DF] dark:border-[#272A30]">
          <h2 className="font-serif text-xl font-semibold text-[#1C1917] dark:text-[#F3F4F6] flex items-center gap-2">
            <Users className="w-5 h-5 text-[#2D4A3E] dark:text-[#6E9E88]" />
            Positions of Responsibility
          </h2>
          <button
            onClick={() => {
              setCurrentPos({ role: '', institution: 'Tata Institute of Social Sciences (TISS), Mumbai', duration: '2026 — Present', points: [''] });
              setIsEditingPos(false);
              setPosModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#2D4A3E] rounded-md"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Position</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {positions.map((pos) => (
            <div key={pos.id} className="p-5 rounded-xl bg-white dark:bg-[#1A1D24] border border-[#EBE6DF] dark:border-[#272A30] space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-base text-[#1C1917] dark:text-[#F3F4F6]">{pos.role}</span>
                <span className="text-xs font-mono text-[#78716C]">{pos.duration}</span>
              </div>
              <div className="text-xs font-semibold text-[#2D4A3E] dark:text-[#6E9E88]">{pos.institution}</div>
              <ul className="text-xs text-[#57534E] dark:text-[#D1D5DB] space-y-1 list-disc list-inside">
                {pos.points.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
              <div className="pt-2 border-t flex justify-end gap-2">
                <button
                  onClick={() => {
                    setCurrentPos(pos);
                    setIsEditingPos(true);
                    setPosModalOpen(true);
                  }}
                  className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleDeletePos(pos.id)} className="p-1 text-red-600 hover:bg-red-50 rounded">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CERTIFICATIONS BLOCK */}
      <div className="space-y-4 pt-4 border-t border-[#EBE6DF] dark:border-[#272A30]">
        <div className="flex items-center justify-between pb-3 border-b border-[#EBE6DF] dark:border-[#272A30]">
          <h2 className="font-serif text-xl font-semibold text-[#1C1917] dark:text-[#F3F4F6] flex items-center gap-2">
            <Award className="w-5 h-5 text-[#2D4A3E] dark:text-[#6E9E88]" />
            Professional Certifications
          </h2>
          <button
            onClick={() => {
              setCurrentCert({ title: '', issuer: '', year: '2026' });
              setIsEditingCert(false);
              setCertModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#2D4A3E] rounded-md"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Certification</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {certifications.map((c) => (
            <div key={c.id} className="p-4 rounded-xl bg-white dark:bg-[#1A1D24] border border-[#EBE6DF] dark:border-[#272A30] space-y-2 shadow-xs">
              <span className="font-serif font-bold text-sm text-[#1C1917] dark:text-[#F3F4F6] block">{c.title}</span>
              <span className="text-xs text-[#2D4A3E] dark:text-[#6E9E88] font-semibold">{c.issuer}</span>
              <span className="text-[11px] text-[#78716C] block">Issued: {c.year || 'N/A'}</span>
              <div className="pt-2 border-t flex justify-end gap-2">
                <button
                  onClick={() => {
                    setCurrentCert(c);
                    setIsEditingCert(true);
                    setCertModalOpen(true);
                  }}
                  className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleDeleteCert(c.id)} className="p-1 text-red-600 hover:bg-red-50 rounded">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Position Modal */}
      {posModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white dark:bg-[#1A1D24] p-6 rounded-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b">
              <h3 className="font-serif text-lg font-semibold">{isEditingPos ? 'Edit' : 'Add'} Position</h3>
              <button onClick={() => setPosModalOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSavePos} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Role Title</label>
                <input
                  type="text"
                  value={currentPos.role || ''}
                  onChange={e => setCurrentPos({ ...currentPos, role: e.target.value })}
                  required
                  placeholder="e.g. Placement Committee Member"
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Institution</label>
                <input
                  type="text"
                  value={currentPos.institution || ''}
                  onChange={e => setCurrentPos({ ...currentPos, institution: e.target.value })}
                  required
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Duration</label>
                <input
                  type="text"
                  value={currentPos.duration || ''}
                  onChange={e => setCurrentPos({ ...currentPos, duration: e.target.value })}
                  required
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Key Responsibilities (One per line)</label>
                <textarea
                  rows={4}
                  value={Array.isArray(currentPos.points) ? currentPos.points.join('\n') : ''}
                  onChange={e => setCurrentPos({ ...currentPos, points: e.target.value.split('\n').filter(p => p.trim()) })}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t">
                <button type="button" onClick={() => setPosModalOpen(false)} className="px-4 py-2 border rounded-md">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#2D4A3E] text-white rounded-md font-semibold">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Certification Modal */}
      {certModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-[#1A1D24] p-6 rounded-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b">
              <h3 className="font-serif text-lg font-semibold">{isEditingCert ? 'Edit' : 'Add'} Certification</h3>
              <button onClick={() => setCertModalOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveCert} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Certification Title</label>
                <input
                  type="text"
                  value={currentCert.title || ''}
                  onChange={e => setCurrentCert({ ...currentCert, title: e.target.value })}
                  required
                  placeholder="e.g. IBM Data Analytics"
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Issuing Authority</label>
                <input
                  type="text"
                  value={currentCert.issuer || ''}
                  onChange={e => setCurrentCert({ ...currentCert, issuer: e.target.value })}
                  required
                  placeholder="e.g. World Bank, IBM"
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Year</label>
                <input
                  type="text"
                  value={currentCert.year || ''}
                  onChange={e => setCurrentCert({ ...currentCert, year: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t">
                <button type="button" onClick={() => setCertModalOpen(false)} className="px-4 py-2 border rounded-md">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#2D4A3E] text-white rounded-md font-semibold">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
