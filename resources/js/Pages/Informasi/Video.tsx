import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import { Play, ExternalLink } from 'lucide-react';

const VIDEOS = [
    { id: 1, judul: 'Perbup Nomor 54 Tahun 2025 Tentang Perubahan Kedudukan dan Susunan OPD', platform: 'TikTok', durasi: '1:30', url: 'https://vt.tiktok.com/ZSas6yLNF/', tahun: 2025 },
    { id: 2, judul: 'Tutorial Pengumpulan Produk Hukum Daerah ke JDIH Nasional', platform: 'TikTok', durasi: '2:45', url: 'https://www.tiktok.com/@jdih_banjarnegara', tahun: 2025 },
    { id: 3, judul: 'Penyelenggaraan Koperasi Merah Putih di Kabupaten Banjarnegara', platform: 'TikTok', durasi: '3:10', url: 'https://www.tiktok.com/@jdih_banjarnegara', tahun: 2025 },
    { id: 4, judul: 'Sosialisasi Peraturan Daerah Nomor 8 Tahun 2025', platform: 'TikTok', durasi: '4:20', url: 'https://www.tiktok.com/@jdih_banjarnegara', tahun: 2025 },
    { id: 5, judul: 'Penandatanganan MOU Dengan Kejaksaan Negeri Banjarnegara', platform: 'Instagram', durasi: '1:15', url: 'https://www.instagram.com/jdih_banjarnegara/', tahun: 2025 },
    { id: 6, judul: 'Bimtek Legal Drafting KPU Banjarnegara 2025', platform: 'TikTok', durasi: '5:30', url: 'https://www.tiktok.com/@jdih_banjarnegara', tahun: 2024 },
];

export default function Video() {
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
                    <div className="flex gap-3 mb-6">
                        <a href="https://www.tiktok.com/@jdih_banjarnegara" target="_blank" rel="noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded text-sm font-medium hover:bg-gray-800 transition-colors">
                            <Play className="h-4 w-4" /> TikTok
                        </a>
                        <a href="https://www.instagram.com/jdih_banjarnegara/" target="_blank" rel="noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded text-sm font-medium hover:bg-pink-700 transition-colors">
                            <ExternalLink className="h-4 w-4" /> Instagram
                        </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {VIDEOS.map((v) => (
                            <a key={v.id} href={v.url} target="_blank" rel="noreferrer"
                                className="group bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-[#0d9488] hover:shadow-md transition-all">
                                {/* Thumbnail */}
                                <div className="h-44 bg-[#1e293b] flex items-center justify-center relative">
                                    <div className="absolute inset-0 bg-[#0d2d29]/60" />
                                    <div className="relative z-10 h-14 w-14 bg-[#0d9488] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                                        <Play className="h-6 w-6 text-white ml-1" />
                                    </div>
                                    <div className="absolute top-3 right-3 z-10">
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded text-white ${v.platform === 'TikTok' ? 'bg-black' : 'bg-pink-600'}`}>
                                            {v.platform}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-3 right-3 z-10 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
                                        {v.durasi}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <p className="text-sm font-semibold text-[#1e293b] group-hover:text-[#0d9488] transition-colors leading-snug line-clamp-2">
                                        {v.judul}
                                    </p>
                                    <p className="text-xs text-slate-400 mt-2">{v.tahun}</p>
                                </div>
                            </a>
                        ))}
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-slate-500 text-sm mb-3">Lihat semua video di:</p>
                        <div className="flex justify-center gap-3">
                            <a href="https://www.tiktok.com/@jdih_banjarnegara" target="_blank" rel="noreferrer"
                                className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 rounded-lg hover:border-[#0d9488] hover:text-[#0d9488] transition-colors text-sm font-medium">
                                <Play className="h-4 w-4" /> @jdih_banjarnegara di TikTok
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
