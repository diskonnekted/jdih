import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import { Search, Eye, Download, ChevronLeft, ChevronRight, Filter } from 'lucide-react';

/* ------------------------------------------------------------------ */
/* MOCK DATA GENERATOR                                                  */
/* ------------------------------------------------------------------ */
function generateDocs(code: string, count = 30) {
    const templates: Record<string, { prefix: string; topics: string[] }> = {
        PERDA: {
            prefix: 'Peraturan Daerah',
            topics: ['Pajak Daerah dan Retribusi Daerah', 'Rencana Tata Ruang Wilayah', 'RPJMD 2025–2029', 'Fasilitasi Pengembangan Pesantren', 'Pemberian Insentif dan Kemudahan Investasi', 'Pertanggungjawaban Pelaksanaan APBD', 'Perubahan APBD', 'Pengelolaan Barang Milik Daerah', 'Cagar Budaya', 'Perangkat Daerah'],
        },
        PERBUP: {
            prefix: 'Peraturan Bupati',
            topics: ['Pedoman Pengadaan Barang/Jasa', 'Standar Biaya Kegiatan', 'Pengelolaan Keuangan Daerah', 'Tata Cara Pemungutan Pajak', 'Kedudukan dan Susunan Organisasi', 'Standar Pelayanan Minimal', 'Penggunaan Dana Desa', 'Pemberian Tunjangan ASN'],
        },
        KEPBUP: {
            prefix: 'Keputusan Bupati',
            topics: ['Penetapan Tim Koordinasi', 'Penunjukan Bendahara', 'Penetapan Lokasi Pembangunan', 'Pembentukan Panitia', 'Penetapan Tim Penegasan Batas', 'Pengesahan Rencana Kerja', 'Penetapan Standar Pelayanan'],
        },
        SE: {
            prefix: 'Surat Edaran',
            topics: ['Pelaksanaan Protokol Kesehatan', 'Penyelenggaraan Tertib Administrasi', 'Percepatan Serapan Anggaran', 'Penyampaian LHKASN', 'Pelaksanaan Apel Pagi'],
        },
        DEFAULT: {
            prefix: 'Dokumen',
            topics: ['Materi Hukum', 'Kebijakan Daerah', 'Regulasi Terkait', 'Pedoman Pelaksanaan'],
        },
    };

    const tpl = templates[code] ?? templates.DEFAULT;
    return Array.from({ length: count }, (_, i) => {
        const year = 2026 - Math.floor(i / 5);
        const num = (i % 8) + 1;
        const topic = tpl.topics[i % tpl.topics.length];
        return {
            id: i + 1,
            number: `${tpl.prefix} Nomor ${num} Tahun ${year}`,
            title: `Tentang ${topic}`,
            year,
            subject: topic.split(' ').slice(0, 2).join(' ').toUpperCase(),
            date: `${year}-${String(Math.floor(i % 12) + 1).padStart(2, '0')}-15`,
        };
    });
}

const TYPE_COLORS: Record<string, string> = {
    PERDA: '#0d9488', PERBUP: '#1e293b', KEPBUP: '#f59e0b', INBUP: '#6366f1',
    KEPSDA: '#ec4899', SE: '#8b5cf6', NA: '#0d9488', RPD: '#1e293b',
    DHT: '#6366f1', DHL: '#f59e0b', AEH: '#ec4899', RNH: '#0d9488',
    RR: '#1e293b', ABH: '#6366f1', PPD: '#f59e0b', KTL: '#0d9488',
};

function fmtDate(d: string) {
    return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

const PER_PAGE = 10;

/* ------------------------------------------------------------------ */
/* PAGE                                                                */
/* ------------------------------------------------------------------ */
interface Props {
    kategori: string;
    title: string;
    code: string;
}

export default function DaftarDokumen({ kategori, title, code }: Props) {
    const allDocs = generateDocs(code);
    const years = [...new Set(allDocs.map(d => d.year))].sort((a, b) => b - a);

    const [search, setSearch] = useState('');
    const [filterYear, setFilterYear] = useState('');
    const [page, setPage] = useState(1);

    const filtered = allDocs.filter(d => {
        const matchSearch = !search || d.title.toLowerCase().includes(search.toLowerCase()) || d.number.toLowerCase().includes(search.toLowerCase());
        const matchYear = !filterYear || String(d.year) === filterYear;
        return matchSearch && matchYear;
    });

    const totalPages = Math.ceil(filtered.length / PER_PAGE);
    const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
    const badgeColor = TYPE_COLORS[code] ?? '#0d9488';

    return (
        <PublicLayout>
            <Head title={`${title} – JDIH Banjarnegara`} />
            <PageHeader
                title={title}
                subtitle={`Daftar ${title} Kabupaten Banjarnegara`}
                breadcrumbs={[{ label: 'Inventarisasi Hukum' }, { label: title }]}
            />

            <section className="py-10 px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Filters */}
                    <div className="bg-white border border-slate-200 rounded-lg p-4 mb-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                        <Filter className="h-4 w-4 text-slate-400 shrink-0 hidden sm:block" />
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder={`Cari ${title}...`}
                                value={search}
                                onChange={e => { setSearch(e.target.value); setPage(1); }}
                                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded text-sm focus:outline-none focus:border-[#0d9488]"
                            />
                        </div>
                        <select
                            value={filterYear}
                            onChange={e => { setFilterYear(e.target.value); setPage(1); }}
                            className="px-3 py-2 border border-slate-200 rounded text-sm focus:outline-none focus:border-[#0d9488] bg-white"
                        >
                            <option value="">Semua Tahun</option>
                            {years.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                        {(search || filterYear) && (
                            <button onClick={() => { setSearch(''); setFilterYear(''); setPage(1); }}
                                className="px-3 py-2 bg-red-50 text-red-600 border border-red-200 rounded text-sm hover:bg-red-100 transition-colors whitespace-nowrap">
                                Reset
                            </button>
                        )}
                    </div>

                    {/* Counter */}
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-sm text-slate-500">
                            Menampilkan <strong className="text-[#1e293b]">{paged.length}</strong> dari <strong className="text-[#1e293b]">{filtered.length}</strong> dokumen
                        </p>
                        <span className="text-xs text-slate-400">Halaman {page} dari {totalPages}</span>
                    </div>

                    {/* List */}
                    <div className="space-y-3">
                        {paged.map((doc, idx) => (
                            <div key={doc.id}
                                className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-[#0d9488] hover:shadow-sm transition-all group">
                                {/* Number */}
                                <div className="hidden sm:flex h-9 w-9 bg-slate-100 rounded items-center justify-center text-slate-400 font-mono text-xs shrink-0">
                                    {String((page - 1) * PER_PAGE + idx + 1).padStart(2, '0')}
                                </div>
                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                        <span className="text-xs font-bold px-2 py-0.5 rounded text-white" style={{ backgroundColor: badgeColor }}>
                                            {code}
                                        </span>
                                        <span className="text-xs text-slate-400">{fmtDate(doc.date)}</span>
                                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{doc.subject}</span>
                                    </div>
                                    <p className="font-semibold text-[#1e293b] text-sm group-hover:text-[#0d9488] transition-colors leading-snug">
                                        {doc.number} {doc.title}
                                    </p>
                                </div>
                                {/* Actions */}
                                <div className="flex items-center gap-2 shrink-0">
                                    <Link href={`/${kategori}/${doc.id}`}
                                        className="flex items-center gap-1.5 px-3 py-2 bg-[#1e293b] text-white text-xs font-bold rounded hover:bg-slate-700 transition-colors">
                                        <Eye className="h-3.5 w-3.5" /> Detail
                                    </Link>
                                    <button className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 text-slate-600 text-xs font-bold rounded hover:border-[#0d9488] hover:text-[#0d9488] transition-colors">
                                        <Download className="h-3.5 w-3.5" /> PDF
                                    </button>
                                </div>
                            </div>
                        ))}

                        {paged.length === 0 && (
                            <div className="bg-white border border-slate-200 rounded-lg p-12 text-center text-slate-400">
                                <Search className="h-12 w-12 mx-auto mb-3 opacity-30" />
                                <p className="font-medium">Tidak ada dokumen ditemukan</p>
                                <p className="text-sm mt-1">Coba ubah kata kunci pencarian atau filter tahun.</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 mt-8">
                            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                                className="h-9 w-9 flex items-center justify-center border border-slate-200 rounded hover:border-[#0d9488] hover:text-[#0d9488] disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                            {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                                const pg = i + 1;
                                return (
                                    <button key={pg} onClick={() => setPage(pg)}
                                        className={`h-9 w-9 flex items-center justify-center border rounded text-sm font-medium transition-colors
                                            ${page === pg ? 'border-[#0d9488] bg-[#0d9488] text-white' : 'border-slate-200 hover:border-[#0d9488] hover:text-[#0d9488]'}`}>
                                        {pg}
                                    </button>
                                );
                            })}
                            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                                className="h-9 w-9 flex items-center justify-center border border-slate-200 rounded hover:border-[#0d9488] hover:text-[#0d9488] disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
