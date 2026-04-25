import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import { Play, ExternalLink, ArrowRight } from 'lucide-react';

export default function Video({ items = [] }: { items?: any[] }) {
    const VIDEOS_DEFAULT = [
        { id: 1, title: 'Perbup Nomor 54 Tahun 2025 Tentang Perubahan Kedudukan dan Susunan OPD', platform: 'TikTok', duration: '1:30', video_url: 'https://vt.tiktok.com/ZSas6yLNF/', year: 2025, image: '/images/covers/cover_perbup_54_2025.png' },
        { id: 2, title: 'Tutorial Pengumpulan Produk Hukum Daerah ke JDIH Nasional', platform: 'TikTok', duration: '2:45', video_url: 'https://www.tiktok.com/@jdih_banjarnegara', year: 2025, image: '/images/covers/cover_tutorial.png' },
        { id: 3, title: 'Penyelenggaraan Koperasi Merah Putih di Kabupaten Banjarnegara', platform: 'TikTok', duration: '3:10', video_url: 'https://www.tiktok.com/@jdih_banjarnegara', year: 2025, image: '/images/covers/cover_koperasi.png' },
    ];

    const displayVideos = items.length > 0 ? items : VIDEOS_DEFAULT;

    return (
        <PublicLayout>
            <Head title="Video – JDIH Banjarnegara" />
            <PageHeader
                title="Video"
                subtitle="Konten video informatif JDIH Kabupaten Banjarnegara di media sosial"
                breadcrumbs={[{ label: 'Informasi' }, { label: 'Video' }]}
            />
            <section className="py-10 px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Platform buttons */}
                    <div className="flex gap-3 mb-8">
                        <a href="https://www.tiktok.com/@jdih_banjarnegara" target="_blank" rel="noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-all shadow-lg active:scale-95">
                            <Play className="h-4 w-4" /> TikTok
                        </a>
                        <a href="https://www.instagram.com/jdih_banjarnegara/" target="_blank" rel="noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 text-white rounded-xl text-sm font-bold hover:opacity-90 transition-all shadow-lg active:scale-95">
                            <ExternalLink className="h-4 w-4" /> Instagram
                        </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayVideos.map((v) => (
                            <a key={v.id} href={v.video_url} target="_blank" rel="noreferrer"
                                className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-[#0d9488] hover:shadow-xl transition-all flex flex-col">
                                {/* Thumbnail */}
                                <div className="aspect-video bg-[#1e293b] flex items-center justify-center relative overflow-hidden">
                                    <img 
                                        src={v.image || '/images/video-placeholder.png'} 
                                        alt={v.title} 
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60" 
                                    />
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />
                                    <div className="relative z-10 h-16 w-16 bg-[#0d9488] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                                        <Play className="h-7 w-7 text-white ml-1 fill-white" />
                                    </div>
                                    <div className="absolute top-4 right-4 z-10">
                                        <span className={`text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full text-white ${v.platform === 'TikTok' ? 'bg-black' : 'bg-pink-600'}`}>
                                            {v.platform || 'Social'}
                                        </span>
                                    </div>
                                    {v.duration && (
                                        <div className="absolute bottom-4 right-4 z-10 bg-black/70 text-white text-[10px] font-bold px-2 py-1 rounded-md">
                                            {v.duration}
                                        </div>
                                    )}
                                </div>
                                <div className="p-5 flex-1 flex flex-col">
                                    <h3 className="text-sm font-bold text-[#1e293b] group-hover:text-[#0d9488] transition-colors leading-snug line-clamp-2 mb-2">
                                        {v.title}
                                    </h3>
                                    <div className="mt-auto flex items-center justify-between text-xs text-slate-400">
                                        <span className="font-medium">{v.year || new Date().getFullYear()}</span>
                                        <span className="flex items-center gap-1 font-bold text-[#0d9488] opacity-0 group-hover:opacity-100 transition-opacity">
                                            Lihat Video <ArrowRight className="h-3 w-3" />
                                        </span>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>

                    <div className="mt-12 text-center p-8 bg-slate-50 rounded-3xl border border-slate-100">
                        <p className="text-slate-500 text-sm font-medium mb-4">Temukan konten informatif lainnya di media sosial kami:</p>
                        <div className="flex flex-wrap justify-center gap-3">
                            <a href="https://www.tiktok.com/@jdih_banjarnegara" target="_blank" rel="noreferrer"
                                className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl hover:border-[#0d9488] hover:text-[#0d9488] transition-all text-sm font-bold shadow-sm">
                                <Play className="h-4 w-4" /> TikTok JDIH Banjarnegara
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
