import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import { Search, Eye, Download, ChevronLeft, ChevronRight } from 'lucide-react';

const PUTUSAN_DATA = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    nomor: `${i + 1}/Pid.Sus/${2026 - Math.floor(i / 8)}/PN.Bnr`,
    jenis: i % 3 === 0 ? 'Pidana Khusus' : i % 3 === 1 ? 'Perdata' : 'TUN',
    tanggal: `${2026 - Math.floor(i / 8)}-${String((i % 12) + 1).padStart(2, '0')}-15`,
    abstrak: 'Putusan pengadilan terkait perkara hukum di wilayah Kabupaten Banjarnegara.',
}));

const PER_PAGE = 10;

function fmtDate(d: string) {
    return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function Putusan() {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    const filtered = PUTUSAN_DATA.filter(p =>
        !search || p.nomor.toLowerCase().includes(search.toLowerCase())
    );
    const totalPages = Math.ceil(filtered.length / PER_PAGE);
    const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

    return (
        <PublicLayout>
            <Head title="Putusan – JDIH Banjarnegara" />
            <PageHeader
                title="Putusan"
                subtitle="Daftar putusan pengadilan yang berkaitan dengan hukum daerah Kabupaten Banjarnegara"
                breadcrumbs={[{ label: 'Putusan' }]}
            />
            <section className="py-10 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white border border-slate-200 rounded-lg p-4 mb-6 flex flex-col sm:flex-row gap-3">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input type="text" placeholder="Cari nomor putusan..." value={search}
                                onChange={e => { setSearch(e.target.value); setPage(1); }}
                                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded text-sm focus:outline-none focus:border-[#0d9488]" />
                        </div>
                    </div>

                    <div className="space-y-3">
                        {paged.map((p, idx) => (
                            <div key={p.id} className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-[#0d9488] hover:shadow-sm transition-all group">
                                <div className="hidden sm:flex h-9 w-9 bg-slate-100 rounded items-center justify-center text-slate-400 font-mono text-xs shrink-0">
                                    {String((page - 1) * PER_PAGE + idx + 1).padStart(2, '0')}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                        <span className="text-xs font-bold px-2 py-0.5 rounded text-white bg-[#1e293b]">{p.jenis}</span>
                                        <span className="text-xs text-slate-400">{fmtDate(p.tanggal)}</span>
                                    </div>
                                    <p className="font-semibold text-[#1e293b] text-sm group-hover:text-[#0d9488] transition-colors">
                                        Putusan Nomor {p.nomor}
                                    </p>
                                    <p className="text-xs text-slate-500 mt-0.5">{p.abstrak}</p>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <button className="flex items-center gap-1.5 px-3 py-2 bg-[#1e293b] text-white text-xs font-bold rounded hover:bg-slate-700 transition-colors">
                                        <Eye className="h-3.5 w-3.5" /> Detail
                                    </button>
                                    <button className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 text-xs font-bold rounded hover:border-[#0d9488] hover:text-[#0d9488] transition-colors">
                                        <Download className="h-3.5 w-3.5" /> PDF
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

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
