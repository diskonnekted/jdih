import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import { Newspaper, Calendar, Tag, ChevronLeft, ChevronRight, Search } from 'lucide-react';

function fmtDate(d: any) {
    if (!d) return '-';
    try {
        return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch (e) {
        return '-';
    }
}

export default function Berita({ news }: { news: any }) {
    const newsData = news?.data || [];
    const [search, setSearch] = useState('');

    const artikelData = newsData.map((artikel: any) => ({
        id: artikel.id,
        slug: artikel.slug,
        judul: artikel.title,
        tanggal: artikel.published_at || artikel.created_at,
        kategori: artikel.category || 'Berita',
        image: artikel.image 
            ? (artikel.image.startsWith('http') ? artikel.image : '/storage/' + artikel.image)
            : null
    }));

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
                    {/* Search (handled by server pagination normally, but this is simple search for current page) */}
                    <div className="mb-6 relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input type="text" placeholder="Cari berita..." value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded text-sm focus:outline-none focus:border-[#0d9488]" />
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {artikelData.filter((a: any) => a.judul.toLowerCase().includes(search.toLowerCase())).map((artikel: any) => (
                            <Link key={artikel.id} href={`/berita/${artikel.slug}`}
                                className="group bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-[#0d9488] hover:shadow-md transition-all">
                                <div className="h-48 bg-slate-100 flex items-center justify-center overflow-hidden">
                                    {artikel.image ? (
                                        <img 
                                            src={artikel.image} 
                                            alt={artikel.judul} 
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center text-slate-300">
                                            <Newspaper className="h-12 w-12 mb-2" />
                                            <span className="text-[10px] uppercase font-bold">No Image</span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded text-white bg-[#0d9488]">
                                            {artikel.kategori}
                                        </span>
                                        <span className="text-xs text-slate-400 flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {fmtDate(artikel.tanggal)}
                                        </span>
                                    </div>
                                    <h3 className="font-semibold text-[#1e293b] text-sm leading-snug group-hover:text-[#0d9488] transition-colors line-clamp-3">
                                        {artikel.judul}
                                    </h3>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {artikelData.length === 0 && (
                        <div className="text-center text-slate-400 py-20 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
                            <Newspaper className="h-16 w-16 mx-auto mb-4 opacity-20" />
                            <p className="text-lg font-medium">Belum ada berita yang diterbitkan.</p>
                            <p className="text-sm">Silakan cek kembali beberapa saat lagi.</p>
                        </div>
                    )}

                    {/* Pagination */}
                    {news.links && news.links.length > 3 && (
                        <div className="flex items-center justify-center gap-1 mt-10">
                            {news.links.map((link: any, i: number) => (
                                <Link 
                                    key={i}
                                    href={link.url}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={`h-10 px-4 flex items-center justify-center rounded text-sm font-medium transition-all ${
                                        link.active 
                                            ? 'bg-[#0d9488] text-white shadow-md' 
                                            : 'bg-white border border-slate-200 text-slate-600 hover:border-[#0d9488] hover:text-[#0d9488]'
                                    } ${!link.url ? 'opacity-30 cursor-not-allowed' : ''}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
