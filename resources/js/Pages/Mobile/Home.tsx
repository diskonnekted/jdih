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
    banners: any[];
    publicDialogues: any[];
    stats: {
        total: number;
        perda: number;
        perbup: number;
    };
}

import axios from 'axios';

function ConsultationForm({ publicDialogues = [] }: { publicDialogues?: any[] }) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        suggestion: '',
        type: 'Aspirasi Masyarakat',
        public_dialogue_id: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.type === 'Konsultasi Publik' && !formData.public_dialogue_id) {
            alert('Mohon pilih draft dokumen yang ingin dikomentari.');
            return;
        }
        setLoading(true);
        try {
            await axios.post('/public-consultation', formData);
            setSuccess(true);
            setFormData({ name: '', address: '', suggestion: '', type: 'Aspirasi Masyarakat', public_dialogue_id: '' });
        } catch (error) {
            alert('Gagal mengirim aspirasi. Silakan coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="text-center py-4 bg-white rounded-2xl border border-teal-100 p-4">
                <CheckCircle2 className="h-10 w-10 text-[#0d9488] mx-auto mb-2" />
                <h3 className="text-sm font-black text-slate-900 mb-1">Berhasil!</h3>
                <p className="text-[10px] text-slate-500 mb-3">Terima kasih atas partisipasi Anda.</p>
                <button onClick={() => setSuccess(false)} className="text-[#0d9488] font-black text-[10px] uppercase hover:underline">Kirim Lagi</button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-3 bg-white/10 backdrop-blur-md p-5 rounded-[2rem] border border-white/20 shadow-xl shadow-black/20">
            <div>
                <label className="block text-[8px] font-black text-teal-100 uppercase mb-1 tracking-widest">Jenis Layanan</label>
                <select 
                    className="w-full bg-white/10 border-white/20 rounded-xl text-xs font-black text-white focus:ring-[#0d9488] focus:border-[#0d9488] appearance-none"
                    value={formData.type}
                    onChange={e => setFormData({...formData, type: e.target.value, public_dialogue_id: ''})}
                >
                    <option className="text-slate-900" value="Aspirasi Masyarakat">Aspirasi Masyarakat</option>
                    <option className="text-slate-900" value="Konsultasi Publik">Konsultasi Publik</option>
                </select>
            </div>

            {formData.type === 'Konsultasi Publik' && (
                <div>
                    <label className="block text-[8px] font-black text-teal-100 uppercase mb-1 tracking-widest">Pilih Draft Dokumen</label>
                    <select 
                        required
                        className="w-full bg-white/20 border-white/30 rounded-xl text-[10px] font-bold text-white focus:ring-[#0d9488] focus:border-[#0d9488]"
                        value={formData.public_dialogue_id}
                        onChange={e => setFormData({...formData, public_dialogue_id: e.target.value})}
                    >
                        <option className="text-slate-900" value="">-- Pilih Draft Dokumen --</option>
                        {publicDialogues.map((d) => (
                            <option className="text-slate-900" key={d.id} value={d.id}>
                                {d.document_type} - {d.title}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="block text-[8px] font-black text-teal-100 uppercase mb-1 tracking-widest">Nama</label>
                    <input 
                        type="text" required placeholder="Nama Anda"
                        className="w-full bg-white/10 border-white/20 rounded-xl text-xs text-white placeholder-teal-100/50 focus:ring-[#0d9488] focus:border-[#0d9488]"
                        value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-[8px] font-black text-teal-100 uppercase mb-1 tracking-widest">Alamat</label>
                    <input 
                        type="text" required placeholder="Domisili"
                        className="w-full bg-white/10 border-white/20 rounded-xl text-xs text-white placeholder-teal-100/50 focus:ring-[#0d9488] focus:border-[#0d9488]"
                        value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})}
                    />
                </div>
            </div>
            <div>
                <label className="block text-[8px] font-black text-teal-100 uppercase mb-1 tracking-widest">Saran & Masukan</label>
                <textarea 
                    required rows={2} placeholder="Tuliskan aspirasi..."
                    className="w-full bg-white/10 border-white/20 rounded-xl text-xs text-white placeholder-teal-100/50 focus:ring-[#0d9488] focus:border-[#0d9488]"
                    value={formData.suggestion} onChange={e => setFormData({...formData, suggestion: e.target.value})}
                ></textarea>
            </div>
            <button 
                type="submit" disabled={loading}
                className="w-full bg-white text-[#0d9488] font-black text-xs py-3 rounded-xl hover:bg-teal-50 transition-colors shadow-lg shadow-black/10"
            >
                {loading ? 'Mengirim...' : 'Kirim Aspirasi'}
            </button>
        </form>
    );
}

import { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

export default function MobileHome({ 
    latestNews = [], 
    infographics = [], 
    latestDocs = [], 
    videos = [], 
    relatedLinks = [],
    banners = [],
    publicDialogues = [],
    stats 
}: Props) {
    const [currentSlide, setCurrentIndex] = useState(0);
    const displayBanners = banners.length > 0 ? banners : [{
        image: '/images/hero.webp',
        title: 'JDIH',
        subtitle: 'Portal Resmi',
        description: 'Jaringan Dokumentasi & Informasi Hukum Kabupaten Banjarnegara'
    }];

    useEffect(() => {
        if (displayBanners.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % displayBanners.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [displayBanners.length]);

    return (
        <MobileLayout>
            <Head title="JDIH Banjarnegara - Mobile" />

            <div className="flex flex-col gap-8 pb-10">
                
                {/* 1. Dynamic Hero Slider Card */}
                <div className="px-5 pt-6">
                    <div className="relative rounded-[2.5rem] p-8 text-white overflow-hidden shadow-2xl shadow-teal-900/20 min-h-[480px] flex flex-col justify-between">
                        
                        {/* Background Slider */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSlide}
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                transition={{ duration: 0.8 }}
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url('${displayBanners[currentSlide].image}')` }}
                            >
                                <div className="absolute inset-0 bg-[#1e293b]/85" />
                            </motion.div>
                        </AnimatePresence>

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-8 w-8 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center p-1.5">
                                    <img src="/logo_jdih.png" alt="JDIH" className="h-full w-full object-contain" />
                                </div>
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-teal-100">
                                    {displayBanners[currentSlide].subtitle || 'Portal Resmi'}
                                </span>
                            </div>
                            
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentSlide}
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -10, opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <h1 className="text-3xl font-black mb-2 leading-tight whitespace-pre-line">
                                        {displayBanners[currentSlide].title === 'JDIH' ? 'JDIH' : displayBanners[currentSlide].title}
                                    </h1>
                                    <p className="text-xs font-bold text-teal-50 mb-6 opacity-80 leading-relaxed">
                                        {displayBanners[currentSlide].description || 'Jaringan Dokumentasi & Informasi Hukum Kabupaten Banjarnegara'}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Consultation Form inside Hero */}
                        <div className="relative z-10 mt-auto">
                            <ConsultationForm publicDialogues={publicDialogues} />
                        </div>

                        {/* Indicators */}
                        {displayBanners.length > 1 && (
                            <div className="absolute top-8 right-8 z-20 flex flex-col gap-1.5">
                                {displayBanners.map((_, idx) => (
                                    <div 
                                        key={idx} 
                                        className={`w-1 transition-all duration-300 rounded-full ${currentSlide === idx ? 'h-4 bg-white' : 'h-1 bg-white/30'}`} 
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Search Floating (optional, but keep for convenience) */}
                <div className="px-6 -mt-12 relative z-20">
                    <Link href="/mobile/pencarian" className="w-full bg-white text-[#0d9488] rounded-3xl p-5 flex items-center justify-between shadow-xl border border-teal-50 active:scale-95 transition-all">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 bg-teal-50 rounded-2xl flex items-center justify-center">
                                <Search className="h-5 w-5" />
                            </div>
                            <span className="text-sm font-black uppercase tracking-widest">Cari Produk Hukum</span>
                        </div>
                        <ChevronRight className="h-5 w-5 opacity-30" />
                    </Link>
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
