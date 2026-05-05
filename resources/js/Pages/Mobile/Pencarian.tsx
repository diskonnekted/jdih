import React, { useState } from 'react';
import MobileLayout from '@/Layouts/MobileLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Search, Filter, FileText, Download, ChevronRight, X } from 'lucide-react';

interface Document {
    id: number; type: string; code: string; slug: string;
    number: string; year: number; title: string; status: string; has_file: boolean;
}
interface Props {
    documents: { data: Document[]; current_page: number; last_page: number; total: number };
    categories: { id: number; name: string; slug: string; code: string }[];
    years: number[];
    filters: { q?: string; kategori?: string; tahun?: string };
}

export default function Pencarian({ documents, categories, years, filters }: Props) {
    const [search, setSearch] = useState(filters.q || '');
    const [kategori, setKategori] = useState(filters.kategori || '');
    const [tahun, setTahun] = useState(filters.tahun || '');
    const [showFilter, setShowFilter] = useState(!!(filters.kategori || filters.tahun));

    const doSearch = (e?: React.FormEvent) => {
        e?.preventDefault();
        router.get('/mobile/pencarian', { q: search || undefined, kategori: kategori || undefined, tahun: tahun || undefined }, { preserveState: false });
    };

    const clearAll = () => { setSearch(''); setKategori(''); setTahun(''); router.get('/mobile/pencarian'); };

    const statusBadge = (s: string) => {
        if (s === 'berlaku') return 'bg-emerald-100 text-emerald-700';
        if (s === 'dicabut') return 'bg-red-100 text-red-700';
        return 'bg-slate-100 text-slate-500';
    };

    const hasFilter = search || kategori || tahun;

    return (
        <MobileLayout>
            <Head title="Pencarian Dokumen — JDIH Banjarnegara" />

            {/* Sticky Search Bar */}
            <div className="sticky top-16 z-40 bg-white border-b border-slate-100 px-5 py-4 space-y-3">
                <form onSubmit={doSearch} className="flex gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                            value={search} onChange={e => setSearch(e.target.value)}
                            placeholder="Cari peraturan, nomor, topik..."
                            className="w-full pl-10 pr-9 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-400/30 focus:border-teal-400"
                        />
                        {search && <button type="button" onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2"><X className="h-3.5 w-3.5 text-slate-400" /></button>}
                    </div>
                    <button type="button" onClick={() => setShowFilter(v => !v)}
                        className={`px-3.5 rounded-2xl border transition-all ${showFilter || kategori || tahun ? 'bg-[#0d9488] border-[#0d9488] text-white' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                        <Filter className="h-4 w-4" />
                    </button>
                    <button type="submit" className="px-4 py-3 bg-[#0d9488] text-white rounded-2xl text-sm font-black active:scale-95 transition-all">Cari</button>
                </form>

                {showFilter && (
                    <div className="grid grid-cols-2 gap-2 animate-in slide-in-from-top-1 duration-200">
                        <select value={kategori} onChange={e => setKategori(e.target.value)}
                            className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400/30">
                            <option value="">Semua Kategori</option>
                            {categories.map(c => <option key={c.id} value={c.slug}>{c.name}</option>)}
                        </select>
                        <select value={tahun} onChange={e => setTahun(e.target.value)}
                            className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400/30">
                            <option value="">Semua Tahun</option>
                            {years.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                    </div>
                )}

                {hasFilter && (
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Aktif:</span>
                        {search && <span className="text-[9px] font-black bg-teal-50 text-teal-700 border border-teal-200 px-2 py-0.5 rounded-full">"{search}"</span>}
                        {kategori && <span className="text-[9px] font-black bg-teal-50 text-teal-700 border border-teal-200 px-2 py-0.5 rounded-full">{categories.find(c=>c.slug===kategori)?.name}</span>}
                        {tahun && <span className="text-[9px] font-black bg-teal-50 text-teal-700 border border-teal-200 px-2 py-0.5 rounded-full">{tahun}</span>}
                        <button onClick={clearAll} className="ml-auto text-[9px] font-black text-red-400 uppercase tracking-widest">Hapus Semua</button>
                    </div>
                )}
            </div>

            {/* Results */}
            <div className="px-5 pt-5 pb-6">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-black uppercase tracking-widest text-slate-400">
                        {documents.total > 0 ? `${documents.total.toLocaleString()} Dokumen` : 'Tidak ada hasil'}
                    </span>
                    {documents.last_page > 1 && (
                        <span className="text-[10px] font-bold text-slate-400">Hal {documents.current_page}/{documents.last_page}</span>
                    )}
                </div>

                {documents.data.length > 0 ? (
                    <>
                        <div className="space-y-3">
                            {documents.data.map(doc => (
                                <Link key={doc.id} href={`/mobile/dokumen/${doc.id}`}
                                    className="block p-4 bg-white border border-slate-100 rounded-3xl shadow-sm active:scale-[0.98] transition-all">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-[9px] font-black px-2.5 py-1 rounded-lg bg-[#0d9488] text-white uppercase tracking-wider">{doc.code || doc.type.slice(0,4)}</span>
                                        <span className="text-[9px] font-bold text-slate-400">{doc.year}</span>
                                        {doc.status && <span className={`ml-auto text-[9px] font-black px-2 py-0.5 rounded-lg capitalize ${statusBadge(doc.status)}`}>{doc.status}</span>}
                                    </div>
                                    <p className="text-sm font-bold text-slate-800 line-clamp-2 leading-snug mb-2">{doc.title}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-bold text-slate-400">No. {doc.number}</span>
                                        <div className="flex items-center gap-2">
                                            {doc.has_file && <span className="flex items-center gap-0.5 text-[9px] font-black text-[#0d9488]"><Download className="h-3 w-3" />PDF</span>}
                                            <ChevronRight className="h-4 w-4 text-slate-300" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination */}
                        {documents.last_page > 1 && (
                            <div className="flex gap-3 mt-6">
                                {documents.current_page > 1 && (
                                    <button onClick={() => router.get('/mobile/pencarian', { q: search||undefined, kategori: kategori||undefined, tahun: tahun||undefined, page: documents.current_page - 1 })}
                                        className="flex-1 py-3.5 bg-white border border-slate-200 text-slate-600 rounded-2xl text-sm font-black active:scale-95 transition-all">
                                        ← Sebelumnya
                                    </button>
                                )}
                                {documents.current_page < documents.last_page && (
                                    <button onClick={() => router.get('/mobile/pencarian', { q: search||undefined, kategori: kategori||undefined, tahun: tahun||undefined, page: documents.current_page + 1 })}
                                        className="flex-1 py-3.5 bg-[#0d9488] text-white rounded-2xl text-sm font-black active:scale-95 transition-all">
                                        Muat Lebih →
                                    </button>
                                )}
                            </div>
                        )}
                    </>
                ) : (
                    <div className="py-20 flex flex-col items-center gap-4">
                        <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center">
                            <FileText className="h-10 w-10 text-slate-300" />
                        </div>
                        <p className="text-sm font-black text-slate-400">Dokumen tidak ditemukan</p>
                        <p className="text-xs text-slate-300 text-center">Coba kata kunci lain atau hapus filter yang aktif</p>
                        {hasFilter && <button onClick={clearAll} className="mt-2 px-6 py-2.5 bg-[#0d9488] text-white rounded-2xl text-xs font-black active:scale-95 transition-all">Hapus Filter</button>}
                    </div>
                )}
            </div>
        </MobileLayout>
    );
}
