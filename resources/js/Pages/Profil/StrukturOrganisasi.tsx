import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';

export default function StrukturOrganisasi() {
    const boxes = [
        { label: 'Bagian Hukum', level: 0 },
        { label: 'Sub Bagian Peraturan Perundang-Undangan', level: 1 },
        { label: 'Sub Bagian Bantuan Hukum dan HAM', level: 1 },
        { label: 'Sub Bagian Dokumentasi dan Informasi Hukum', level: 1 },
    ];

    return (
        <PublicLayout>
            <Head title="Struktur Organisasi – JDIH Banjarnegara" />
            <PageHeader
                title="Struktur Organisasi"
                subtitle="Susunan organisasi Bagian Hukum Sekretariat Daerah Kabupaten Banjarnegara"
                breadcrumbs={[{ label: 'Profil Kami' }, { label: 'Struktur Organisasi' }]}
            />
            <section className="py-12 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white border border-slate-200 rounded-lg p-8">
                        {/* Kepala */}
                        <div className="flex justify-center mb-6">
                            <div className="bg-[#0d9488] text-white px-8 py-4 rounded-lg text-center min-w-[280px]">
                                <div className="text-xs uppercase tracking-widest opacity-80 mb-1">Pimpinan</div>
                                <div className="font-bold text-lg">Kepala Bagian Hukum</div>
                                <div className="text-sm opacity-80 mt-1">Sekretariat Daerah Kab. Banjarnegara</div>
                            </div>
                        </div>

                        {/* Line to sub */}
                        <div className="flex justify-center mb-2">
                            <div className="w-px h-8 bg-slate-300" />
                        </div>
                        <div className="flex justify-center mb-2">
                            <div className="w-3/4 h-px bg-slate-300" />
                        </div>

                        {/* Sub Bagian */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { title: 'Sub Bagian', sub: 'Peraturan Perundang-Undangan', desc: 'Penyusunan & pengkajian produk hukum daerah' },
                                { title: 'Sub Bagian', sub: 'Bantuan Hukum dan HAM', desc: 'Penanganan perkara & perlindungan hak warga' },
                                { title: 'Sub Bagian', sub: 'Dokumentasi & Informasi Hukum', desc: 'Pengelolaan JDIH & layanan informasi hukum' },
                            ].map((box, i) => (
                                <div key={i} className="flex flex-col items-center">
                                    <div className="h-6 w-px bg-slate-300 mb-0" />
                                    <div className="bg-[#1e293b] text-white rounded-lg p-4 text-center w-full">
                                        <div className="text-[10px] uppercase tracking-widest text-[#0d9488] mb-1">{box.title}</div>
                                        <div className="font-bold text-sm mb-2">{box.sub}</div>
                                        <div className="text-xs text-slate-400">{box.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <p className="text-center text-slate-400 text-xs mt-8">
                            * Struktur berdasarkan Peraturan Bupati Banjarnegara tentang Kedudukan, Susunan Organisasi, Tugas dan Fungsi serta Tata Kerja Sekretariat Daerah.
                        </p>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
