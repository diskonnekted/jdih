import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import { Download as DownloadIcon, Search, FileText, FileDown } from 'lucide-react';

export default function DownloadPage({ files = [] }: { files?: any[] }) {
    const [search, setSearch] = useState('');
    const [kategori, setKategori] = useState('Semua');

    const FILES_DEFAULT = [
        { id: 1, title: 'Buku Standar JDIH 2024', category: 'Pedoman', file_path: 'docs/dummy.pdf', created_at: '2025-01-15' },
        { id: 2, title: 'Panduan Penggunaan Portal JDIH', category: 'Panduan', file_path: 'docs/dummy.pdf', created_at: '2025-01-10' },
        { id: 3, title: 'Formulir Permohonan Informasi', category: 'Formulir', file_path: 'docs/dummy.pdf', created_at: '2024-12-20' },
    ];

    const displayFiles = files.length > 0 ? files : FILES_DEFAULT;
    
    // Some files might not have category (KatalogDownload model)
    const KATEGORI_LIST = ['Semua', ...new Set(displayFiles.map(d => d.category || 'Umum'))];

    const filtered = displayFiles.filter(d => {
        const matchSearch = !search || (d.title && d.title.toLowerCase().includes(search.toLowerCase())) || (d.no && d.no.toLowerCase().includes(search.toLowerCase()));
        const itemCat = d.category || 'Umum';
        const matchKat = kategori === 'Semua' || itemCat === kategori;
        return matchSearch && matchKat;
    });

    const CATEGORY_COLORS: Record<string, string> = {
        'Pedoman': '#0d9488',
        'Panduan': '#1e293b',
        'Formulir': '#6366f1',
        'Umum': '#94a3b8',
    };

    function fmtDate(d: string) {
        try {
            return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
        } catch (e) {
            return d;
        }
    }

    return (
        <PublicLayout>
            <Head title="Pusat Unduhan – JDIH Banjarnegara" />
            <PageHeader
                title="Pusat Unduhan"
                subtitle="Unduh dokumen pendukung, formulir, dan panduan layanan JDIH Kabupaten Banjarnegara"
                breadcrumbs={[{ label: 'Informasi' }, { label: 'Unduh' }]}
            />
            
            <section className="py-12 px-6">
                <div className="max-w-5xl mx-auto">
                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input 
                                type="text" 
                                placeholder="Cari nama atau nomor file..." 
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488]" 
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {KATEGORI_LIST.map(k => (
                                <button 
                                    key={k} 
                                    onClick={() => setKategori(k)}
                                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${kategori === k ? 'bg-[#0d9488] text-white shadow-md' : 'bg-white border border-slate-200 text-slate-600 hover:border-[#0d9488] hover:text-[#0d9488]'}`}
                                >
                                    {k}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Table / List */}
                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                        <div className="bg-[#1e293b] px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <FileDown className="h-5 w-5 text-[#0d9488]" />
                                <h2 className="text-white font-bold text-sm">Daftar File ({filtered.length})</h2>
                            </div>
                        </div>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200">
                                        <th className="px-6 py-4 text-left text-[#1e293b] font-bold w-12 text-center">No</th>
                                        <th className="px-6 py-4 text-left text-[#1e293b] font-bold">Nama Dokumen</th>
                                        <th className="px-6 py-4 text-left text-[#1e293b] font-bold">Kategori</th>
                                        <th className="px-6 py-4 text-left text-[#1e293b] font-bold">Tanggal</th>
                                        <th className="px-6 py-4 text-center text-[#1e293b] font-bold w-32">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filtered.map((file: any, i: number) => (
                                        <tr key={file.id || i} className="hover:bg-slate-50/80 transition-colors">
                                            <td className="px-6 py-4 text-center text-slate-400 font-mono text-xs">
                                                {file.no || String(i + 1).padStart(2, '0')}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 bg-slate-100 rounded flex items-center justify-center shrink-0">
                                                        <FileText className="h-4 w-4 text-slate-400" />
                                                    </div>
                                                    <span className="font-semibold text-[#1e293b] line-clamp-1">{file.title}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span 
                                                    className="text-[10px] font-bold px-2.5 py-1 rounded-full text-white uppercase tracking-wider"
                                                    style={{ backgroundColor: CATEGORY_COLORS[file.category || 'Umum'] ?? '#94a3b8' }}
                                                >
                                                    {file.category || 'Umum'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-500 text-xs">
                                                {file.created_at ? fmtDate(file.created_at) : '-'}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <a 
                                                    href={file.file_path && file.file_path.startsWith('http') ? file.file_path : `/storage/${file.file_path}`}
                                                    download
                                                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#0d9488] text-white text-xs font-bold rounded-lg hover:bg-teal-700 transition-all shadow-sm active:scale-95"
                                                >
                                                    <DownloadIcon className="h-3.5 w-3.5" /> Unduh
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                    {filtered.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="py-20 text-center">
                                                <FileDown className="h-12 w-12 text-slate-200 mx-auto mb-4" />
                                                <p className="text-slate-400 font-medium">Tidak ada file yang ditemukan</p>
                                                <button 
                                                    onClick={() => {setSearch(''); setKategori('Semua');}}
                                                    className="mt-4 text-[#0d9488] text-xs font-bold hover:underline"
                                                >
                                                    Reset Pencarian
                                                </button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
