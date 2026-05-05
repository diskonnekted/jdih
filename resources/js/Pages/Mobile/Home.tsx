import React from 'react';
import MobileLayout from '@/Layouts/MobileLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    Search, Newspaper, Building2, Info, Gavel, 
    ArrowRight, MapPin, Phone, Download, Clock, Play
} from 'lucide-react';

interface Props {
    latestNews: any[];
    infographics: any[];
    latestDocs: any[];
    videos: any[];
    relatedLinks: any[];
    stats: {
        total: number;
        perda: number;
        perbup: number;
    };
}

export default function MobileHome({ 
    latestNews = [], 
    infographics = [], 
    latestDocs = [], 
    videos = [], 
    relatedLinks = [],
    stats 
}: Props) {
    const menus = [
        { label: 'Cari Dokumen',  icon: <Search className="h-6 w-6" />,   href: '/mobile/pencarian',     color: 'bg-teal-500',  description: 'Database Hukum' },
        { label: 'Inovasi Desa',  icon: <Building2 className="h-6 w-6" />, href: '/produk-hukum-desa',    color: 'bg-teal-600',  description: 'Produk Hukum Desa' },
        { label: 'Berita Terbaru',icon: <Newspaper className="h-6 w-6" />, href: '/mobile/berita',        color: 'bg-teal-700',  description: 'Kabar Banjarnegara' },
        { label: 'Informasi JDIH',icon: <Info className="h-6 w-6" />,      href: '/mobile/info',          color: 'bg-slate-700', description: 'Profil & Alamat' },
    ];


    return (
        <MobileLayout>
            <Head title="JDIH Banjarnegara - Mobile" />

            {/* Banner Section */}
            <div className="px-6 pt-6 bg-gradient-to-b from-white to-[#f8fafc]">
                <div className="bg-[#0d9488] rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-teal-900/20">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Gavel className="h-20 w-20 rotate-12" />
                    </div>
                    <div className="relative z-10">
                        <p className="text-[10px] font-black uppercase tracking-widest text-teal-100 mb-2">Selamat Datang di JDIH</p>
                        <h2 className="text-2xl font-black mb-6 leading-tight text-white">Portal Dokumentasi Hukum Banjarnegara</h2>
                        <div className="flex items-center gap-6">
                            <div>
                                <p className="text-xl font-black text-white">{stats.total || 0}</p>
                                <p className="text-[8px] font-bold uppercase tracking-widest text-teal-100">Total Produk</p>
                            </div>
                            <div className="h-8 w-px bg-white/20" />
                            <div>
                                <p className="text-xl font-black text-white">{stats.perda || 0}</p>
                                <p className="text-[8px] font-bold uppercase tracking-widest text-teal-100">Perda</p>
                            </div>
                            <div className="h-8 w-px bg-white/20" />
                            <div>
                                <p className="text-xl font-black text-white">{stats.perbup || 0}</p>
                                <p className="text-[8px] font-bold uppercase tracking-widest text-teal-100">Perbup</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 mt-6">
                            <Link href="/pencarian" className="flex-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl px-4 py-3 flex items-center gap-3 text-white/80 active:scale-95 transition-all">
                                <Search className="h-4 w-4" />
                                <span className="text-xs font-bold uppercase tracking-widest">Cari Peraturan...</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Infografis Section - Hidden on Mobile per user request */}
            {/* 
            {infographics.length > 0 && (
                ...
            )}
            */}

            {/* Quick Menu Grid */}
            <div className="px-6 pt-10">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Layanan Utama</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {menus.map((menu, i) => (
                        <Link 
                            key={i} 
                            href={menu.href}
                            className="bg-white p-6 rounded-[2rem] border border-slate-100 flex flex-col gap-4 shadow-sm active:scale-95 transition-all"
                        >
                            <div className={`${menu.color} p-3 rounded-2xl text-white w-fit shadow-lg`}>
                                {menu.icon}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-black text-[#1e293b] leading-tight">{menu.label}</span>
                                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">{menu.description}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Latest Documents */}
            <div className="px-6 pt-10">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Produk Terkini</h3>
                    <Link href="/peraturan-daerah" className="text-[10px] font-black text-[#0d9488] uppercase tracking-widest flex items-center gap-1">
                        Lihat Semua <ArrowRight className="h-3 w-3" />
                    </Link>
                </div>
                <div className="space-y-3">
                    {latestDocs.slice(0, 4).map((doc, i) => (
                        <Link key={i} href={doc.href || `/peraturan-daerah/${doc.id}`} 
                            className="block p-4 bg-white border border-slate-100 rounded-3xl shadow-sm active:scale-98 transition-all">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-[8px] font-black px-2 py-0.5 rounded bg-teal-500 text-white uppercase tracking-widest">{doc.type || 'DOKUMEN'}</span>
                                <span className="text-[8px] font-bold text-slate-400 uppercase">{doc.year}</span>
                            </div>
                            <p className="text-xs font-bold text-[#1e293b] line-clamp-2 leading-snug">{doc.title}</p>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Video Section */}
            {videos.length > 0 && (
                <div className="pt-10">
                    <div className="px-6 flex items-center justify-between mb-4">
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Video Edukasi</h3>
                    </div>
                    <div className="flex gap-4 overflow-x-auto px-6 pb-4 no-scrollbar">
                        {videos.map((v, i) => (
                            <a key={i} href={v.href} target="_blank" rel="noreferrer" 
                                className="min-w-[280px] bg-slate-900 rounded-[2rem] overflow-hidden shadow-lg flex-shrink-0 relative aspect-video group">
                                <img src={v.image} alt={v.title} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                                        <Play className="h-5 w-5 text-white fill-white ml-0.5" />
                                    </div>
                                </div>
                                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/90 to-transparent">
                                    <p className="text-white text-xs font-black line-clamp-1">{v.title}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            )}

            {/* Latest News Preview */}
            <div className="px-6 pt-10 pb-10">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Warta JDIH</h3>
                    <Link href="/berita" className="text-[10px] font-black text-[#0d9488] uppercase tracking-widest flex items-center gap-1">
                        Baca Berita <ArrowRight className="h-3 w-3" />
                    </Link>
                </div>
                
                <div className="space-y-4">
                    {latestNews.length > 0 ? latestNews.slice(0, 3).map((news, i) => (
                        <Link 
                            key={i} 
                            href={`/berita/${news.id}`}
                            className="flex gap-4 p-4 bg-white border border-slate-100 rounded-3xl shadow-sm active:scale-98 transition-all"
                        >
                            <div className="h-20 w-20 rounded-2xl bg-slate-100 overflow-hidden shrink-0">
                                {news.thumbnail ? (
                                    <img src={news.thumbnail} alt={news.title} className="h-full w-full object-cover" />
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center text-slate-300">
                                        <Newspaper className="h-6 w-6" />
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col justify-center gap-1.5 overflow-hidden">
                                <p className="text-[10px] font-black text-[#0d9488] uppercase tracking-widest">Kabar Hukum</p>
                                <h4 className="text-sm font-black text-[#1e293b] leading-snug line-clamp-2">{news.title}</h4>
                                <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase">
                                    <Clock className="h-2.5 w-2.5" />
                                    <span>{news.date}</span>
                                </div>
                            </div>
                        </Link>
                    )) : (
                        <div className="p-10 text-center bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
                            <p className="text-xs font-bold text-slate-400">Belum ada berita terbaru</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Related Links */}
            {relatedLinks.length > 0 && (
                <div className="px-6 pb-10">
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6">Tautan Terkait</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {relatedLinks.map((link, i) => (
                            <a key={i} href={link.href} target="_blank" rel="noreferrer" 
                                className="flex flex-col items-center gap-3 p-4 bg-white border border-slate-100 rounded-3xl shadow-sm text-center">
                                <img src={link.image} alt={link.label} className="h-10 w-10 object-contain" />
                                <span className="text-[9px] font-black text-[#1e293b] uppercase leading-tight line-clamp-2">{link.label}</span>
                            </a>
                        ))}
                    </div>
                </div>
            )}

            {/* Quick Actions Footer */}
            <div className="px-10 pb-10">
                <div className="flex items-center justify-center gap-8 text-slate-300">
                    <div className="flex flex-col items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span className="text-[7px] font-bold uppercase tracking-[0.2em]">Krandegan</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <Phone className="h-4 w-4" />
                        <span className="text-[7px] font-bold uppercase tracking-[0.2em]">591218</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <Download className="h-4 w-4" />
                        <span className="text-[7px] font-bold uppercase tracking-[0.2em]">PWA Ready</span>
                    </div>
                </div>
            </div>
        </MobileLayout>
    );
}
