import React from 'react';
import MobileLayout from '@/Layouts/MobileLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    Search, Newspaper, Building2, Info, Gavel, 
    ArrowRight, MapPin, Phone, Download, Clock
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
    latestNews: any[];
    stats: {
        total: number;
        perda: number;
        perbup: number;
    };
}

export default function MobileHome({ latestNews = [], stats }: Props) {
    const menus = [
        { 
            label: 'Cari Dokumen', 
            icon: <Search className="h-6 w-6" />, 
            href: '/katalog', 
            color: 'bg-blue-500',
            description: 'Database Hukum Pusat'
        },
        { 
            label: 'Inovasi Desa', 
            icon: <Building2 className="h-6 w-6" />, 
            href: '/produk-hukum-desa', 
            color: 'bg-teal-500',
            description: 'Produk Hukum Desa'
        },
        { 
            label: 'Berita Terbaru', 
            icon: <Newspaper className="h-6 w-6" />, 
            href: '/berita', 
            color: 'bg-indigo-500',
            description: 'Kabar Banjarnegara'
        },
        { 
            label: 'Informasi JDIH', 
            icon: <Info className="h-6 w-6" />, 
            href: '/kedudukan-dan-alamat', 
            color: 'bg-orange-500',
            description: 'Profil & Alamat'
        },
    ];

    return (
        <MobileLayout>
            <Head title="JDIH Mobile" />

            {/* Banner Section */}
            <div className="px-6 pt-6 bg-gradient-to-b from-white to-[#f8fafc]">
                <div className="bg-[#003399] rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-blue-900/20">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Gavel className="h-20 w-20 rotate-12" />
                    </div>
                    <div className="relative z-10">
                        <p className="text-[10px] font-black uppercase tracking-widest text-blue-200 mb-2">Selamat Datang di JDIH</p>
                        <h2 className="text-2xl font-black mb-6 leading-tight">Temukan Dokumentasi Hukum Banjarnegara</h2>
                        <div className="flex items-center gap-6">
                            <div>
                                <p className="text-xl font-black">{stats.total || 0}</p>
                                <p className="text-[8px] font-bold uppercase tracking-widest text-blue-200">Total Produk</p>
                            </div>
                            <div className="h-8 w-px bg-white/10" />
                            <div>
                                <p className="text-xl font-black">{stats.perda || 0}</p>
                                <p className="text-[8px] font-bold uppercase tracking-widest text-blue-200">Perda</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
                            <div className={`${menu.color} p-3 rounded-2xl text-white w-fit shadow-lg shadow-${menu.color.split('-')[1]}-500/20`}>
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

            {/* Latest News Preview */}
            <div className="px-6 pt-10 pb-10">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Berita Terkini</h3>
                    <Link href="/berita" className="text-[10px] font-black text-[#003399] uppercase tracking-widest flex items-center gap-1">
                        Lihat Semua <ArrowRight className="h-3 w-3" />
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
                                <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Warta Hub</p>
                                <h4 className="text-sm font-black text-[#1e293b] leading-snug line-clamp-2">{news.title}</h4>
                                <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase">
                                    <Clock className="h-2.5 w-2.5 outline-none" />
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
