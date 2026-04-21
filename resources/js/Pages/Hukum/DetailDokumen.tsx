import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import { Download, ArrowLeft, Calendar, Tag } from 'lucide-react';

interface Props {
    kategori: string;
    title: string;
    code: string;
    id: string;
}

const TYPE_COLORS: Record<string, string> = {
    PERDA: '#0d9488', PERBUP: '#1e293b', KEPBUP: '#f59e0b', INBUP: '#6366f1',
    SE: '#8b5cf6', NA: '#0d9488',
};

export default function DetailDokumen({ kategori, title, code, id }: Props) {
    const badgeColor = TYPE_COLORS[code] ?? '#0d9488';

    // Mock data for this specific document
    const doc = {
        number: `${title} Nomor ${id} Tahun 2025`,
        title: 'Tentang Perubahan Atas Peraturan Daerah Kabupaten Banjarnegara',
        date: '2025-03-15',
        status: 'Berlaku',
        pages: 24,
        abstract: `Peraturan ini mengatur tentang perubahan atas kebijakan daerah Kabupaten Banjarnegara yang bertujuan untuk
        meningkatkan kualitas pelayanan publik dan tata kelola pemerintahan yang lebih baik. Dalam peraturan ini
        diatur berbagai aspek meliputi prosedur, kewenangan, dan tanggung jawab setiap perangkat daerah dalam
        pelaksanaan tugas dan fungsi masing-masing.`,
        documents: [
            { name: `${code}_${id}_th_2025.pdf`, size: '2.4 MB', type: 'Dokumen Utama' },
            { name: `${code}_${id}_th_2025_lampiran.pdf`, size: '1.1 MB', type: 'Lampiran' },
        ],
        related: [
            `${title} Nomor ${Number(id) + 1} Tahun 2024`,
            `${title} Nomor ${Number(id) + 2} Tahun 2023`,
        ]
    };

    const fmtDate = (d: string) => new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

    return (
        <PublicLayout>
            <Head title={`${doc.number} – JDIH Banjarnegara`} />
            <PageHeader
                title="Detail Dokumen"
                breadcrumbs={[
                    { label: 'Inventarisasi Hukum' },
                    { label: title, href: `/${kategori}` },
                    { label: `Nomor ${id}` },
                ]}
            />

            <section className="py-10 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-5">
                            {/* Header */}
                            <div className="bg-white border border-slate-200 rounded-lg p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-xs font-bold px-3 py-1 rounded text-white" style={{ backgroundColor: badgeColor }}>
                                        {code}
                                    </span>
                                    <span className="text-xs text-slate-400 flex items-center gap-1">
                                        <Calendar className="h-3.5 w-3.5" />
                                        {fmtDate(doc.date)}
                                    </span>
                                    <span className="text-xs px-2 py-0.5 bg-green-50 text-green-700 border border-green-200 rounded font-medium">
                                        {doc.status}
                                    </span>
                                </div>
                                <h1 className="text-xl font-bold text-[#1e293b] mb-1">{doc.number}</h1>
                                <p className="text-slate-600">{doc.title}</p>
                            </div>

                            {/* Abstract */}
                            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                                <div className="bg-[#1e293b] px-5 py-3">
                                    <h2 className="text-white font-bold text-sm">Abstrak / Ringkasan</h2>
                                </div>
                                <div className="p-5">
                                    <p className="text-slate-700 text-sm leading-relaxed">{doc.abstract}</p>
                                </div>
                            </div>

                            {/* Documents */}
                            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                                <div className="bg-[#0d9488] px-5 py-3">
                                    <h2 className="text-white font-bold text-sm">Dokumen Produk Hukum</h2>
                                </div>
                                <div className="p-5 space-y-3">
                                    {doc.documents.map((file) => (
                                        <div key={file.name} className="flex items-center justify-between p-3 border border-slate-200 rounded hover:border-[#0d9488] hover:bg-slate-50 transition-colors">
                                            <div>
                                                <p className="font-medium text-[#1e293b] text-sm">{file.name}</p>
                                                <p className="text-xs text-slate-400">{file.type} · {file.size}</p>
                                            </div>
                                            <button className="flex items-center gap-1.5 px-4 py-2 bg-[#1e293b] text-white text-xs font-bold rounded hover:bg-slate-700 transition-colors">
                                                <Download className="h-3.5 w-3.5" /> Unduh
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-5">
                            {/* Meta */}
                            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                                <div className="bg-[#1e293b] px-5 py-3">
                                    <h2 className="text-white font-bold text-sm">Informasi Dokumen</h2>
                                </div>
                                <div className="p-5 space-y-3 text-sm">
                                    {[
                                        ['Jenis', title],
                                        ['Kode', code],
                                        ['Status', doc.status],
                                        ['Tanggal', fmtDate(doc.date)],
                                        ['Jumlah Hal.', `${doc.pages} halaman`],
                                    ].map(([k, v]) => (
                                        <div key={k} className="flex justify-between items-start gap-2">
                                            <span className="text-slate-500 shrink-0">{k}</span>
                                            <span className="text-[#1e293b] font-medium text-right">{v}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Related */}
                            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                                <div className="bg-slate-50 border-b border-slate-200 px-5 py-3">
                                    <h2 className="text-[#1e293b] font-bold text-sm flex items-center gap-2">
                                        <Tag className="h-4 w-4 text-[#0d9488]" /> Dokumen Terkait
                                    </h2>
                                </div>
                                <div className="p-5 space-y-2">
                                    {doc.related.map((r) => (
                                        <a key={r} href="#" className="block text-sm text-[#0d9488] hover:text-teal-700 hover:underline transition-colors">{r}</a>
                                    ))}
                                </div>
                            </div>

                            {/* Back */}
                            <Link href={`/${kategori}`}
                                className="flex items-center gap-2 px-4 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium">
                                <ArrowLeft className="h-4 w-4" /> Kembali ke Daftar
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
