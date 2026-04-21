import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import { ClipboardList } from 'lucide-react';

const TUPOKSI = [
    {
        fungsi: 'Penyusunan Produk Hukum',
        tugas: [
            'Menyiapkan bahan penyusunan rancangan produk hukum daerah.',
            'Melakukan penelitian dan pengkajian terhadap rancangan produk hukum.',
            'Mengkooordinasikan penyusunan rancangan peraturan daerah dan peraturan kepala daerah.',
            'Menyiapkan bahan harmonisasi produk hukum daerah.',
        ]
    },
    {
        fungsi: 'Bantuan Hukum dan HAM',
        tugas: [
            'Menyelenggarakan penanganan perkara hukum.',
            'Memberikan bantuan dan perlindungan hukum kepada aparatur pemerintah daerah.',
            'Melaksanakan kegiatan penyuluhan hukum.',
            'Menyiapkan bahan pelaksanaan kegiatan di bidang Hak Asasi Manusia.',
        ]
    },
    {
        fungsi: 'Dokumentasi & Informasi Hukum',
        tugas: [
            'Mengelola Jaringan Dokumentasi dan Informasi Hukum (JDIH).',
            'Mendokumentasikan dan mempublikasikan produk hukum daerah.',
            'Memberikan layanan informasi hukum kepada masyarakat.',
            'Melaksanakan inventarisasi produk hukum daerah secara berkala.',
        ]
    },
];

export default function Tupoksi() {
    return (
        <PublicLayout>
            <Head title="Tupoksi Bagian Hukum – JDIH Banjarnegara" />
            <PageHeader
                title="Tupoksi Bagian Hukum"
                subtitle="Tugas Pokok dan Fungsi Bagian Hukum Setda Kabupaten Banjarnegara"
                breadcrumbs={[{ label: 'Profil Kami' }, { label: 'Tupoksi Bagian Hukum' }]}
            />
            <section className="py-12 px-6">
                <div className="max-w-5xl mx-auto space-y-6">
                    {TUPOKSI.map((item, i) => (
                        <div key={i} className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                            <div className="bg-[#1e293b] px-6 py-3 flex items-center gap-3">
                                <ClipboardList className="h-5 w-5 text-[#0d9488]" />
                                <h2 className="text-white font-bold">{item.fungsi}</h2>
                            </div>
                            <ul className="px-6 py-5 space-y-3">
                                {item.tugas.map((t, j) => (
                                    <li key={j} className="flex items-start gap-3 text-slate-700 text-sm">
                                        <span className="h-5 w-5 bg-[#0d9488]/10 text-[#0d9488] rounded text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                                            {j + 1}
                                        </span>
                                        {t}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>
        </PublicLayout>
    );
}
