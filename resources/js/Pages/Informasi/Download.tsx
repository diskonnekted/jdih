import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import { Download, Search, FileText, FileSpreadsheet, Presentation } from 'lucide-react';

const DOWNLOAD_DATA = [
    { id: 1, nama: 'Formulir Permohonan Informasi Hukum', kategori: 'Formulir', size: '245 KB', tipe: 'PDF', tanggal: '2025-01-15' },
    { id: 2, nama: 'Rekapitulasi Produk Hukum Daerah 2024', kategori: 'Laporan', size: '1.2 MB', tipe: 'XLSX', tanggal: '2025-01-10' },
    { id: 3, nama: 'Pedoman Pengajuan Permohonan Bantuan Hukum', kategori: 'Panduan', size: '560 KB', tipe: 'PDF', tanggal: '2024-12-20' },
    { id: 4, nama: 'Presentasi Sosialisasi Perda Pajak 2025', kategori: 'Presentasi', size: '3.4 MB', tipe: 'PPTX', tanggal: '2024-12-15' },
    { id: 5, nama: 'Laporan Tahunan JDIH Kabupaten Banjarnegara 2024', kategori: 'Laporan', size: '2.8 MB', tipe: 'PDF', tanggal: '2024-12-01' },
    { id: 6, nama: 'Buku Saku Panduan JDIH', kategori: 'Panduan', size: '890 KB', tipe: 'PDF', tanggal: '2024-11-20' },
    { id: 7, nama: 'SOP Pelayanan Informasi Hukum', kategori: 'SOP', size: '420 KB', tipe: 'PDF', tanggal: '2024-10-10' },
    { id: 8, nama: 'Formulir Survei Kepuasan Layanan', kategori: 'Formulir', size: '180 KB', tipe: 'PDF', tanggal: '2024-09-05' },
];

const TIPE_ICONS: Record<string, any> = {
    PDF: FileText,
    XLSX: FileSpreadsheet,
    PPTX: Presentation,
};

const TIPE_COLORS: Record<string, string> = {
    PDF: '#ef4444',
    XLSX: '#16a34a',
    PPTX: '#f59e0b',
};

const KATEGORI_LIST = ['Semua', ...new Set(DOWNLOAD_DATA.map(d => d.kategori))];

function fmtDate(d: string) {
    return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function DownloadPage() {
    const [search, setSearch] = useState('');
    const [kategori, setKategori] = useState('Semua');

    const filtered = DOWNLOAD_DATA.filter(d => {
        const matchSearch = !search || d.nama.toLowerCase().includes(search.toLowerCase());
        const matchKat = kategori === 'Semua' || d.kategori === kategori;
        return matchSearch && matchKat;
    });

    return (
        <PublicLayout>
            <Head title="Download – JDIH Banjarnegara" />
            <PageHeader
                title="Download"
                subtitle="File dan dokumen yang dapat diunduh dari JDIH Kabupaten Banjarnegara"
                breadcrumbs={[{ label: 'Informasi' }, { label: 'Download' }]}
            />
            <section className="py-10 px-6">
                <div className="max-w-5xl mx-auto">
                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row gap-3 mb-6">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input type="text" placeholder="Cari file..." value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded text-sm focus:outline-none focus:border-[#0d9488]" />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {KATEGORI_LIST.map(k => (
                                <button key={k} onClick={() => setKategori(k)}
                                    className={`px-3 py-2 rounded text-xs font-medium transition-colors ${kategori === k ? 'bg-[#0d9488] text-white' : 'bg-white border border-slate-200 hover:border-[#0d9488] hover:text-[#0d9488]'}`}>
                                    {k}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                        <div className="bg-[#1e293b] px-5 py-3 flex items-center gap-3">
                            <Download className="h-5 w-5 text-[#0d9488]" />
                            <h2 className="text-white font-bold text-sm">{filtered.length} File Tersedia</h2>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {filtered.map((file) => {
                                const Icon = TIPE_ICONS[file.tipe] ?? FileText;
                                return (
                                    <div key={file.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 hover:bg-slate-50 transition-colors">
                                        <div className="h-10 w-10 flex items-center justify-center rounded shrink-0"
                                            style={{ backgroundColor: (TIPE_COLORS[file.tipe] ?? '#0d9488') + '18' }}>
                                            <Icon className="h-5 w-5" style={{ color: TIPE_COLORS[file.tipe] ?? '#0d9488' }} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-[#1e293b] text-sm">{file.nama}</p>
                                            <div className="flex flex-wrap gap-2 mt-1">
                                                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{file.kategori}</span>
                                                <span className="text-xs text-slate-400">{file.size}</span>
                                                <span className="text-xs text-slate-400">{fmtDate(file.tanggal)}</span>
                                            </div>
                                        </div>
                                        <button className="flex items-center gap-2 px-4 py-2 bg-[#0d9488] text-white rounded text-xs font-bold hover:bg-teal-600 transition-colors shrink-0">
                                            <Download className="h-3.5 w-3.5" />
                                            <span style={{ color: TIPE_COLORS[file.tipe] ?? 'white', backgroundColor: 'white', padding: '0 4px', borderRadius: '3px', fontWeight: 800 }}>
                                                {file.tipe}
                                            </span>
                                        </button>
                                    </div>
                                );
                            })}
                            {filtered.length === 0 && (
                                <div className="py-12 text-center text-slate-400">
                                    <Download className="h-10 w-10 mx-auto mb-3 opacity-30" />
                                    <p>Tidak ada file ditemukan.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
