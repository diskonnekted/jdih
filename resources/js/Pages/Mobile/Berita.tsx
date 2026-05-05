import React, { useState } from 'react';
import MobileLayout from '@/Layouts/MobileLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Search, Newspaper, Clock, ChevronRight, X } from 'lucide-react';

interface NewsItem {
    id: number; slug: string; title: string; date: string | null;
    category: string; thumbnail: string | null; excerpt: string;
}
interface Props {
    news: { data: NewsItem[]; current_page: number; last_page: number; total: number };
    filters: { q?: string };
}

export default function Berita({ news, filters }: Props) {
    const [search, setSearch] = useState(filters.q || '');

    const doSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/mobile/berita', { q: search || undefined }, { preserveState: false });
    };

    const featured = news.data[0] || null;
    const rest = news.data.slice(1);

    return (
        <MobileLayout>
            <Head title="Berita — JDIH Banjarnegara" />

            {/* Header */}
            <div className="px-5 pt-6 pb-4 bg-white border-b border-slate-100 sticky top-16 z-40">
                <form onSubmit={doSearch} className="flex gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input value={search} onChange={e => setSearch(e.target.value)}
                            placeholder="Cari berita..."
                            className="w-full pl-10 pr-9 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-400/30 focus:border-teal-400"
                        />
                        {search && <button type="button" onClick={() => { setSearch(''); router.get('/mobile/berita'); }} className="absolute right-3 top-1/2 -translate-y-1/2"><X className="h-3.5 w-3.5 text-slate-400" /></button>}
                    </div>
                    <button type="submit" className="px-4 py-3 bg-[#0d9488] text-white rounded-2xl text-sm font-black active:scale-95 transition-all">Cari</button>
                </form>
            </div>

            <div className="px-5 pt-5 pb-6 space-y-6">
                {/* Counter */}
                <div className="flex items-center justify-between">
                    <span className="text-sm font-black uppercase tracking-widest text-slate-400">{news.total} Berita</span>
                    {news.last_page > 1 && <span className="text-[10px] font-bold text-slate-400">Hal {news.current_page}/{news.last_page}</span>}
                </div>

                {news.data.length === 0 ? (
                    <div className="py-20 flex flex-col items-center gap-4">
                        <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center">
                            <Newspaper className="h-10 w-10 text-slate-300" />
                        </div>
                        <p className="text-sm font-black text-slate-400">Belum ada berita</p>
                    </div>
                ) : (
                    <>
                        {/* Featured Article */}
                        {featured && (
                            <a href={`/berita/${featured.slug}`} className="block rounded-[2rem] overflow-hidden bg-white border border-slate-100 shadow-sm active:scale-[0.98] transition-all">
                                <div className="relative aspect-video bg-slate-100">
                                    {featured.thumbnail ? (
                                        <img src={featured.thumbnail} alt={featured.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <Newspaper className="h-12 w-12 text-slate-200" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                    <div className="absolute bottom-0 inset-x-0 p-5">
                                        <span className="text-[9px] font-black bg-[#0d9488] text-white px-3 py-1 rounded-lg uppercase tracking-widest">{featured.category}</span>
                                        <h2 className="mt-2 text-base font-black text-white leading-snug line-clamp-2">{featured.title}</h2>
                                        {featured.date && (
                                            <div className="flex items-center gap-1.5 mt-2 text-white/70">
                                                <Clock className="h-3 w-3" />
                                                <span className="text-[10px] font-bold">{featured.date}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </a>
                        )}

                        {/* News List */}
                        {rest.length > 0 && (
                            <div className="space-y-3">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Berita Lainnya</p>
                                {rest.map(item => (
                                    <a key={item.id} href={`/berita/${item.slug}`}
                                        className="flex gap-4 p-3.5 bg-white border border-slate-100 rounded-3xl shadow-sm active:scale-[0.98] transition-all">
                                        <div className="h-16 w-16 rounded-2xl bg-slate-100 overflow-hidden shrink-0">
                                            {item.thumbnail ? (
                                                <img src={item.thumbnail} alt={item.title} className="h-full w-full object-cover" />
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center">
                                                    <Newspaper className="h-6 w-6 text-slate-300" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col justify-center gap-1 overflow-hidden flex-1">
                                            <span className="text-[9px] font-black text-[#0d9488] uppercase tracking-widest">{item.category}</span>
                                            <h3 className="text-sm font-black text-slate-800 leading-snug line-clamp-2">{item.title}</h3>
                                            {item.date && (
                                                <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400">
                                                    <Clock className="h-2.5 w-2.5" />{item.date}
                                                </div>
                                            )}
                                        </div>
                                        <ChevronRight className="h-4 w-4 text-slate-300 shrink-0 self-center" />
                                    </a>
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {news.last_page > 1 && (
                            <div className="flex gap-3 pt-2">
                                {news.current_page > 1 && (
                                    <button onClick={() => router.get('/mobile/berita', { q: search||undefined, page: news.current_page - 1 })}
                                        className="flex-1 py-3.5 bg-white border border-slate-200 text-slate-600 rounded-2xl text-sm font-black active:scale-95 transition-all">
                                        ← Sebelumnya
                                    </button>
                                )}
                                {news.current_page < news.last_page && (
                                    <button onClick={() => router.get('/mobile/berita', { q: search||undefined, page: news.current_page + 1 })}
                                        className="flex-1 py-3.5 bg-[#0d9488] text-white rounded-2xl text-sm font-black active:scale-95 transition-all">
                                        Muat Lebih →
                                    </button>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </MobileLayout>
    );
}
