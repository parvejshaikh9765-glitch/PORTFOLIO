import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { MediaFile } from '../types';
import { Upload, Trash2, Copy, Check, Search, FileText, Image as ImageIcon, Folder } from 'lucide-react';

export const AdminMediaLibrary: React.FC = () => {
  const { token, reloadPublicData } = usePortfolio();
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('All');

  const fetchMedia = async () => {
    try {
      const res = await fetch('/api/admin/media', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setMediaFiles(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [token]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);

    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('altText', e.target.files[0].name);
    formData.append('folder', selectedFolder === 'All' ? 'General' : selectedFolder);

    try {
      const res = await fetch('/api/admin/media/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      if (res.ok) {
        await fetchMedia();
        await reloadPublicData();
      }
    } catch (err) {
      console.error('File upload error:', err);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeleteMedia = async (id: string) => {
    if (!confirm('Are you sure you want to delete this media file?')) return;
    try {
      await fetch(`/api/admin/media/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchMedia();
      await reloadPublicData();
    } catch (e) {
      console.error(e);
    }
  };

  const folders = ['All', ...Array.from(new Set(mediaFiles.map(m => m.folder || 'General')))];

  const filteredMedia = mediaFiles.filter(m => {
    const matchesFolder = selectedFolder === 'All' || (m.folder || 'General') === selectedFolder;
    const matchesSearch = m.originalName.toLowerCase().includes(search.toLowerCase()) ||
                          m.altText.toLowerCase().includes(search.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-[#1C1917] dark:text-[#F3F4F6]">
            Media Library & Storage Manager
          </h1>
          <p className="text-xs text-[#78716C] dark:text-[#9CA3AF] mt-1">
            Upload, manage, copy URL links, and reuse high-resolution photos & PDF documents.
          </p>
        </div>

        <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#2D4A3E] hover:bg-[#233A31] rounded-md shadow-xs transition-all">
          <Upload className="w-4 h-4" />
          <span>{uploading ? 'Uploading File...' : 'Upload Media File'}</span>
          <input type="file" onChange={handleFileUpload} className="hidden" disabled={uploading} />
        </label>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-[#1A1D24] border border-[#EBE6DF] dark:border-[#272A30]">
        
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#78716C]" />
          <input
            type="text"
            placeholder="Search media files..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#FAF8F5] dark:bg-[#232730] border rounded-md"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {folders.map(f => (
            <button
              key={f}
              onClick={() => setSelectedFolder(f)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap ${
                selectedFolder === f ? 'bg-[#2D4A3E] text-white' : 'bg-[#FAF8F5] text-[#57534E]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMedia.map((media) => {
          const isPdf = media.mimeType === 'application/pdf' || media.url.endsWith('.pdf');

          return (
            <div
              key={media.id}
              className="group rounded-xl bg-white dark:bg-[#1A1D24] border border-[#EBE6DF] dark:border-[#272A30] overflow-hidden flex flex-col justify-between p-3 space-y-3 shadow-xs"
            >
              <div className="relative h-40 rounded-lg overflow-hidden bg-[#FAF8F5] dark:bg-[#232730] flex items-center justify-center">
                {isPdf ? (
                  <div className="text-center p-4">
                    <FileText className="w-10 h-10 text-[#2D4A3E] mx-auto mb-2" />
                    <span className="text-[10px] font-semibold text-[#1C1917] dark:text-[#F3F4F6] block truncate max-w-[140px]">
                      {media.originalName}
                    </span>
                  </div>
                ) : (
                  <img
                    src={media.url}
                    alt={media.altText}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                )}
              </div>

              <div className="space-y-1 text-xs">
                <div className="font-semibold text-[#1C1917] dark:text-[#F3F4F6] truncate" title={media.originalName}>
                  {media.originalName}
                </div>
                <div className="text-[10px] text-[#78716C]">
                  Folder: {media.folder || 'General'} · {(media.size / 1024).toFixed(0)} KB
                </div>
              </div>

              <div className="pt-2 border-t flex items-center justify-between text-xs">
                <button
                  onClick={() => handleCopyUrl(media.url, media.id)}
                  className="inline-flex items-center gap-1 text-[#2D4A3E] dark:text-[#6E9E88] font-semibold text-[11px]"
                >
                  {copiedId === media.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === media.id ? 'URL Copied!' : 'Copy URL'}</span>
                </button>

                <button
                  onClick={() => handleDeleteMedia(media.id)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded-md"
                  title="Delete Media File"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
