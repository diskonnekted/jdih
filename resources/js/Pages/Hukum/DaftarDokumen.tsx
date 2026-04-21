import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import SearchForm, { SearchValues } from '@/Components/SearchForm';
import { Eye, Download, ChevronLeft, ChevronRight } from 'lucide-react';

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
            number: `${num}`,
            nomor: `${num}`,
            title: `${tpl.prefix} Nomor ${num} Tahun ${year} Tentang ${topic}`,
            titleShort: `Tentang ${topic}`,
            year,
            subject: topic.split(' ').slice(0, 2).join(' ').toUpperCase(),
            date: `${year}-${String(Math.floor(i % 12) + 1).padStart(2, '0')}-15`,
            status: i % 7 === 0 ? 'Dicabut' : i % 5 === 0 ? 'Diubah' : 'Berlaku',
        };
    });
}

const TYPE_COLORS: Record<string, string> = {
    PERDA: '#0d9488', PERBUP: '#1e293b', KEPBUP: '#f59e0b', INBUP: '#6366f1',
    KEPSDA: '#ec4899', SE: '#8b5cf6', NA: '#0d9488', RPD: '#1e293b',
    DHT: '#6366f1', DHL: '#f59e0b', AEH: '#ec4899', RNH: '#0d9488',
    RR: '#1e293b', ABH: '#6366f1', PPD: '#f59e0b', KTL: '#0d9488',
};

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
    Berlaku:     { bg: '#dcfce7', text: '#166534' },
    Dicabut:     { bg: '#fee2e2', text: '#991b1b' },
    Diubah:      { bg: '#fef3c7', text: '#92400e' },
    'Tidak Berlaku': { bg: '#f1f5f9', text: '#475569' },
};

function fmtDate(d: string) {
    return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

const PER_PAGE = 10;

interface Props {
    kategori: string;
    title: string;
    code: string;
}

export default function DaftarDokumen({ kategori, title, code }: Props) {
    const allDocs = generateDocs(code);
    const badgeColor = TYPE_COLORS[code] ?? '#0d9488';

    const [filters, setFilters] = useState<SearchValues>({
        namaDokumen: '',
        jenisDokumen: title,
        nomor: '',
        tahun: '',
        status: '',
    });
    const [page, setPage] = useState(1);

    function handleSearch(values: SearchValues) {
        setFilters(values);
        setPage(1);
    }

    const filtered = allDocs.filter((doc) => {
        const q = filters.namaDokumen.toLowerCase();
        const matchName   = !q || doc.title.toLowerCase().includes(q);
        const matchNomor  = !filters.nomor  || doc.nomor.includes(filters.nomor);
        const matchYear   = !filters.tahun  || String(doc.year) === filters.tahun;
        const matchStatus = !filters.status || doc.status === filters.status;
        return matchName && matchNomor && matchYear && matchStatus;
    });

    const totalPages = Math.ceil(filtered.length / PER_PAGE);
    const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

    // Reset to page 1 when filters change
    useEffect(() => { setPage(1); }, [filters]);

    return (
        <PublicLayout>
            <Head title={`${title} – JDIH Banjarnegara`} />
            <PageHeader
                title={title}
                subtitle={`Daftar ${title} Kabupaten Banjarnegara`}
                breadcrumbs={[{ label: 'Inventarisasi Hukum' }, { label: title }]}
            />

            <section className="py-8 px-6 bg-slate-50">
                <div className="max-w-6xl mx-auto space-y-6">

                    {/* ── Form Pencarian Standar JDIH ── */}
                    <SearchForm
                        mode="compact"
                        initialValues={filters}
                        onSearch={handleSearch}
                        hideJenis={true}
                        jenisDokumenDefault={title}
                    />

                    {/* ── Counter ── */}
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-500">
                            Menampilkan{' '}
                            <strong className="text-[#1e293b]">{paged.length}</strong> dari{' '}
                            <strong className="text-[#1e293b]">{filtered.length}</strong> dokumen
                        </p>
                        <span className="text-xs text-slate-400">
                            Hal. {page} / {Math.max(1, totalPages)}
                        </span>
                    </div>

                    {/* ── List ── */}
                    <div className="space-y-3">
                        {paged.map((doc, idx) => {
                            const statusStyle = STATUS_COLORS[doc.status] ?? STATUS_COLORS['Berlaku'];
                            return (
                                <div
                                    key={doc.id}
                                    className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-[#0d9488] hover:shadow-sm transition-all group"
                                >
                                    {/* No */}
                                    <div className="hidden sm:flex h-9 w-9 bg-slate-100 rounded items-center justify-center text-slate-400 font-mono text-xs shrink-0">
                                        {String((page - 1) * PER_PAGE + idx + 1).padStart(2, '0')}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                            <span
                                                className="text-xs font-bold px-2 py-0.5 rounded text-white"
                                                style={{ backgroundColor: badgeColor }}
                                            >
                                                {code}
                                            </span>
                                            <span className="text-xs text-slate-400">{fmtDate(doc.date)}</span>
                                            <span
                                                className="text-xs font-semibold px-2 py-0.5 rounded"
                                                style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}
                                            >
                                                {doc.status}
                                            </span>
                                        </div>
                                        <p className="font-semibold text-[#1e293b] text-sm group-hover:text-[#0d9488] transition-colors leading-snug">
                                            {doc.title}
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2 shrink-0">
                                        <Link
                                            href={`/${kategori}/${doc.id}`}
                                            className="flex items-center gap-1.5 px-3 py-2 bg-[#1e293b] text-white text-xs font-bold rounded hover:bg-slate-700 transition-colors"
                                        >
                                            <Eye className="h-3.5 w-3.5" /> Detail
                                        </Link>
                                        <button className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 text-slate-600 text-xs font-bold rounded hover:border-[#0d9488] hover:text-[#0d9488] transition-colors">
                                            <Download className="h-3.5 w-3.5" /> PDF
                                        </button>
                                    </div>
                                </div>
                            );
                        })}

                        {paged.length === 0 && (
                            <div className="bg-white border border-slate-200 rounded-lg p-12 text-center text-slate-400">
                                <p className="font-medium text-base mb-1">Tidak ada dokumen ditemukan</p>
                                <p className="text-sm">Coba ubah kata kunci atau parameter pencarian.</p>
                            </div>
                        )}
                    </div>

                    {/* ── Pagination ── */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 pt-2">
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="h-9 w-9 flex items-center justify-center border border-slate-200 rounded hover:border-[#0d9488] hover:text-[#0d9488] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                            {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                                const pg = i + 1;
                                return (
                                    <button
                                        key={pg}
                                        onClick={() => setPage(pg)}
                                        className={`h-9 w-9 flex items-center justify-center border rounded text-sm font-medium transition-colors
                                            ${page === pg ? 'border-[#0d9488] bg-[#0d9488] text-white' : 'border-slate-200 hover:border-[#0d9488] hover:text-[#0d9488]'}`}
                                    >
                                        {pg}
                                    </button>
                                );
                            })}
                            <button
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className="h-9 w-9 flex items-center justify-center border border-slate-200 rounded hover:border-[#0d9488] hover:text-[#0d9488] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
