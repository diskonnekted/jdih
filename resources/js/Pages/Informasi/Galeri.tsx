import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import { Image, X } from 'lucide-react';

const GALERI = [
    { id: 1, judul: 'Penandatanganan MOU Kejaksaan Negeri Banjarnegara', kategori: 'Kerja Sama', tahun: 2025 },
    { id: 2, judul: 'Study Referensi Bagian Hukum ke Kabupaten Temanggung', kategori: 'Kegiatan', tahun: 2025 },
    { id: 3, judul: 'Forum Satu Data Indonesia Kabupaten Banjarnegara', kategori: 'Forum', tahun: 2025 },
    { id: 4, judul: 'Bimtek Legal Drafting KPU Banjarnegara 2025', kategori: 'Bimtek', tahun: 2025 },
    { id: 5, judul: 'Sosialisasi Perda Pajak Daerah 2025', kategori: 'Sosialisasi', tahun: 2025 },
    { id: 6, judul: 'Rapat Penyusunan Propemperda 2026', kategori: 'Rapat', tahun: 2025 },
    { id: 7, judul: 'Pelatihan SDM Hukum Bersama Universitas Jenderal Soedirman', kategori: 'Pelatihan', tahun: 2024 },
    { id: 8, judul: 'Evaluasi JDIH Tingkat Kabupaten Tahun 2024', kategori: 'Evaluasi', tahun: 2024 },
    { id: 9, judul: 'Penghargaan JDIH Terbaik Jawa Tengah 2024', kategori: 'Penghargaan', tahun: 2024 },
    { id: 10, judul: 'Penyuluhan Hukum di Kecamatan Banjarmangu', kategori: 'Sosialisasi', tahun: 2024 },
    { id: 11, judul: 'Workshop Penyusunan Naskah Akademik', kategori: 'Workshop', tahun: 2023 },
    { id: 12, judul: 'Pelantikan Kepala Sub Bagian Hukum', kategori: 'Kegiatan', tahun: 2023 },
];

const PLACEHOLDER_COLORS = [
    '#0d9488', '#1e293b', '#6366f1', '#f59e0b', '#ec4899', '#8b5cf6',
];

export default function Galeri() {
    const [selected, setSelected] = useState<typeof GALERI[0] | null>(null);
    const [filterTahun, setFilterTahun] = useState('');

    const years = [...new Set(GALERI.map(g => g.tahun))].sort((a, b) => b - a);
    const filtered = filterTahun ? GALERI.filter(g => String(g.tahun) === filterTahun) : GALERI;

    return (
        <PublicLayout>
            <Head title="Galeri – JDIH Banjarnegara" />
            <PageHeader
                title="Galeri"
                subtitle="Dokumentasi kegiatan Bagian Hukum Sekretariat Daerah Kabupaten Banjarnegara"
                breadcrumbs={[{ label: 'Informasi' }, { label: 'Galeri' }]}
            />
            <section className="py-10 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Filter */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        <button onClick={() => setFilterTahun('')}
                            className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${!filterTahun ? 'bg-[#0d9488] text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-[#0d9488] hover:text-[#0d9488]'}`}>
                            Semua
                        </button>
                        {years.map(y => (
                            <button key={y} onClick={() => setFilterTahun(String(y))}
                                className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${filterTahun === String(y) ? 'bg-[#0d9488] text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-[#0d9488] hover:text-[#0d9488]'}`}>
                                {y}
                            </button>
                        ))}
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filtered.map((item, i) => (
                            <button key={item.id} onClick={() => setSelected(item)}
                                className="group relative aspect-square rounded-lg overflow-hidden border border-slate-200 hover:border-[#0d9488] hover:shadow-md transition-all text-left">
                                <div className="absolute inset-0 flex items-center justify-center"
                                    style={{ backgroundColor: PLACEHOLDER_COLORS[i % PLACEHOLDER_COLORS.length] + '22' }}>
                                    <Image className="h-10 w-10 opacity-30" style={{ color: PLACEHOLDER_COLORS[i % PLACEHOLDER_COLORS.length] }} />
                                </div>
                                <div className="absolute inset-0 bg-[#1e293b]/0 group-hover:bg-[#1e293b]/70 transition-all flex items-end">
                                    <div className="p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                        <p className="text-xs font-semibold leading-snug line-clamp-2">{item.judul}</p>
                                        <p className="text-[10px] text-[#0d9488] mt-1">{item.tahun}</p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            {selected && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
                    <div className="bg-white rounded-lg max-w-lg w-full overflow-hidden" onClick={e => e.stopPropagation()}>
                        <div className="bg-[#1e293b] h-64 flex items-center justify-center relative">
                            <Image className="h-20 w-20 text-[#0d9488]" />
                            <button onClick={() => setSelected(null)}
                                className="absolute top-3 right-3 h-8 w-8 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                        <div className="p-4">
                            <p className="font-semibold text-[#1e293b]">{selected.judul}</p>
                            <p className="text-sm text-slate-500 mt-1">{selected.kategori} · {selected.tahun}</p>
                        </div>
                    </div>
                </div>
            )}
        </PublicLayout>
    );
}
