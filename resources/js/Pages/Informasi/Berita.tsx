import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import { Newspaper, Calendar, Tag, ChevronLeft, ChevronRight, Search } from 'lucide-react';

const BERITA = [
    { id: 1, slug: 'infografis-perda-8-2025', judul: 'Infografis Peraturan Daerah Nomor 8 Tahun 2025 Tentang Perubahan Atas Peraturan Daerah Nomor 8 Tahun 2023 Tentang Pajak Daerah Dan Retribusi Daerah', tanggal: '2025-12-15', kategori: 'Infografis' },
    { id: 2, slug: 'study-referensi-temanggung', judul: 'Study Referensi Pelaksanaan Tugas pada Bagian Hukum Sekretariat Daerah Kabupaten Temanggung', tanggal: '2025-11-20', kategori: 'Kegiatan' },
    { id: 3, slug: 'penandatanganan-mou-kejaksaan', judul: 'Penandatanganan MOU Dengan Kejaksaan Negeri Terkait Pelaksanaan Pidana Kerja Sosial', tanggal: '2025-10-05', kategori: 'Kerja Sama' },
    { id: 4, slug: 'forum-satu-data-banjarnegara', judul: 'Forum Satu Data Indonesia Kabupaten Banjarnegara "Perencanaan Berbasis Data"', tanggal: '2025-09-18', kategori: 'Forum' },
    { id: 5, slug: 'bimtek-legal-drafting-kpu', judul: 'Bimbingan Teknis Penyusunan Produk Hukum Legal Drafting Di Lingkungan KPU Kabupaten Banjarnegara Tahun 2025', tanggal: '2025-08-22', kategori: 'Bimtek' },
    { id: 6, slug: 'sosialisasi-perda-2025', judul: 'Sosialisasi Peraturan Daerah Kabupaten Banjarnegara Tahun 2025 Kepada Masyarakat', tanggal: '2025-07-10', kategori: 'Sosialisasi' },
    { id: 7, slug: 'rapat-propemperda-2026', judul: 'Rapat Pembahasan Program Pembentukan Peraturan Daerah (Propemperda) Tahun 2026', tanggal: '2025-06-15', kategori: 'Rapat' },
    { id: 8, slug: 'penghargaan-jdih-2025', judul: 'JDIH Kabupaten Banjarnegara Meraih Peringkat Terbaik dalam Evaluasi JDIH Nasional 2025', tanggal: '2025-05-30', kategori: 'Penghargaan' },
];

const KATEGORI_COLORS: Record<string, string> = {
    Infografis: '#0d9488', Kegiatan: '#1e293b', 'Kerja Sama': '#6366f1', Forum: '#f59e0b',
    Bimtek: '#ec4899', Sosialisasi: '#8b5cf6', Rapat: '#1e293b', Penghargaan: '#0d9488',
};

function fmtDate(d: string) {
    return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

const PER_PAGE = 6;

export default function Berita() {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    const filtered = BERITA.filter(b =>
        !search || b.judul.toLowerCase().includes(search.toLowerCase())
    );
    const totalPages = Math.ceil(filtered.length / PER_PAGE);
    const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

    return (
        <PublicLayout>
            <Head title="Berita – JDIH Banjarnegara" />
            <PageHeader
                title="Berita & Informasi"
                subtitle="Media informasi dan berita terkini JDIH Kabupaten Banjarnegara"
                breadcrumbs={[{ label: 'Informasi' }, { label: 'Berita' }]}
            />
            <section className="py-10 px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Search */}
                    <div className="mb-6 relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input type="text" placeholder="Cari berita..." value={search}
                            onChange={e => { setSearch(e.target.value); setPage(1); }}
                            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded text-sm focus:outline-none focus:border-[#0d9488]" />
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {paged.map((artikel) => (
                            <Link key={artikel.id} href={`/berita/${artikel.slug}`}
                                className="group bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-[#0d9488] hover:shadow-md transition-all">
                                <div className="h-40 bg-[#1e293b] flex items-center justify-center">
                                    <Newspaper className="h-12 w-12 text-[#0d9488]" />
                                </div>
                                <div className="p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded text-white"
                                            style={{ backgroundColor: KATEGORI_COLORS[artikel.kategori] ?? '#0d9488' }}>
                                            {artikel.kategori}
                                        </span>
                                        <span className="text-xs text-slate-400 flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {fmtDate(artikel.tanggal)}
                                        </span>
                                    </div>
                                    <p className="font-semibold text-[#1e293b] text-sm leading-snug group-hover:text-[#0d9488] transition-colors line-clamp-3">
                                        {artikel.judul}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {filtered.length === 0 && (
                        <div className="text-center text-slate-400 py-12">
                            <Newspaper className="h-12 w-12 mx-auto mb-3 opacity-30" />
                            <p>Tidak ada berita ditemukan.</p>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 mt-8">
                            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                                className="h-9 w-9 flex items-center justify-center border border-slate-200 rounded hover:border-[#0d9488] hover:text-[#0d9488] disabled:opacity-40 transition-colors">
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button key={i + 1} onClick={() => setPage(i + 1)}
                                    className={`h-9 w-9 flex items-center justify-center border rounded text-sm font-medium transition-colors ${page === i + 1 ? 'border-[#0d9488] bg-[#0d9488] text-white' : 'border-slate-200 hover:border-[#0d9488] hover:text-[#0d9488]'}`}>
                                    {i + 1}
                                </button>
                            ))}
                            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                                className="h-9 w-9 flex items-center justify-center border border-slate-200 rounded hover:border-[#0d9488] hover:text-[#0d9488] disabled:opacity-40 transition-colors">
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
