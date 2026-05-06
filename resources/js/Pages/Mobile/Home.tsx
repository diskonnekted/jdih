import React from 'react';
import MobileLayout from '@/Layouts/MobileLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    Search, Newspaper, Gavel, 
    ArrowRight, Clock, ChevronRight, Image as ImageIcon
} from 'lucide-react';
import { motion } from 'framer-motion';

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
    return (
        <MobileLayout>
            <Head title="JDIH Banjarnegara - Mobile" />

            <div className="flex flex-col gap-8 pb-10">
                
                {/* 1. Card Nama Aplikasi (Hero) */}
                <div className="px-5 pt-6">
                    <div className="bg-gradient-to-br from-[#0d9488] to-[#0f766e] rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-teal-900/20">
                        <div className="absolute -top-6 -right-6 opacity-10">
                            <Gavel className="h-32 w-32 rotate-12" />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-10 w-10 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                                    <img src="/logo_jdih.png" alt="JDIH" className="h-6 w-6 object-contain" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-teal-100">Portal Resmi</span>
                            </div>
                            <h1 className="text-3xl font-black mb-2 leading-tight">JDIH</h1>
                            <p className="text-sm font-bold text-teal-50 mb-8 opacity-80">Jaringan Dokumentasi & Informasi Hukum Kabupaten Banjarnegara</p>
                            
                            <div className="flex items-center gap-4">
                                <Link href="/mobile/pencarian" className="flex-1 bg-white text-[#0d9488] rounded-2xl px-5 py-4 flex items-center justify-between shadow-lg active:scale-95 transition-all">
                                    <div className="flex items-center gap-3">
                                        <Search className="h-5 w-5" />
                                        <span className="text-xs font-black uppercase tracking-widest">Cari Dokumen</span>
                                    </div>
                                    <ChevronRight className="h-4 w-4 opacity-50" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Infografik Section */}
                {infographics && infographics.length > 0 && (
                    <div className="space-y-4">
                        <div className="px-6 flex items-center justify-between">
                            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Infografis Terbaru</h3>
                        </div>
                        <div className="flex gap-4 overflow-x-auto px-6 pb-2 no-scrollbar">
                            {infographics.map((info, i) => (
                                <motion.div 
                                    key={i}
                                    whileTap={{ scale: 0.98 }}
                                    className="min-w-[280px] bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm flex-shrink-0"
                                >
                                    <div className="aspect-[4/3] relative bg-slate-100">
                                        {info.image ? (
                                            <img src={info.image} alt={info.title} className="absolute inset-0 w-full h-full object-cover" />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <ImageIcon className="h-10 w-10 text-slate-200" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-5">
                                        <p className="text-xs font-bold text-slate-700 line-clamp-1">{info.title}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 3. Produk Hukum Terbaru */}
                <div className="px-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Produk Terkini</h3>
                        <Link href="/mobile/pencarian" className="text-[10px] font-black text-[#0d9488] uppercase tracking-widest flex items-center gap-1">
                            Semua <ArrowRight className="h-3 w-3" />
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {latestDocs.map((doc, i) => (
                            <Link 
                                key={i} 
                                href={`/mobile/dokumen/${doc.id}`} 
                                className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-3xl shadow-sm active:scale-[0.98] transition-all"
                            >
                                <div className="h-12 w-12 rounded-2xl bg-teal-50 flex items-center justify-center shrink-0">
                                    <Gavel className="h-5 w-5 text-[#0d9488]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[8px] font-black px-2 py-0.5 rounded bg-[#0d9488]/10 text-[#0d9488] uppercase tracking-widest">{doc.code || 'DOC'}</span>
                                        <span className="text-[8px] font-bold text-slate-400 uppercase">{doc.year}</span>
                                    </div>
                                    <p className="text-xs font-black text-slate-800 line-clamp-1 leading-snug">{doc.title}</p>
                                    <p className="text-[9px] font-bold text-slate-400 mt-0.5">No. {doc.number}</p>
                                </div>
                                <ChevronRight className="h-4 w-4 text-slate-300" />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* 4. Berita Terbaru */}
                <div className="px-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Warta JDIH</h3>
                        <Link href="/mobile/berita" className="text-[10px] font-black text-[#0d9488] uppercase tracking-widest flex items-center gap-1">
                            Lainnya <ArrowRight className="h-3 w-3" />
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {latestNews.map((news, i) => (
                            <Link 
                                key={i} 
                                href={`/berita/${news.slug || news.id}`}
                                className="flex gap-4 p-4 bg-white border border-slate-100 rounded-3xl shadow-sm active:scale-[0.98] transition-all"
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
                                    <p className="text-[9px] font-black text-[#0d9488] uppercase tracking-widest">Kabar Hukum</p>
                                    <h4 className="text-sm font-black text-slate-800 leading-snug line-clamp-2">{news.title}</h4>
                                    <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400">
                                        <Clock className="h-2.5 w-2.5" />
                                        <span>{news.date}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </MobileLayout>
    );
}
