import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import { Download, FileText } from 'lucide-react';

const SOP_LIST = [
    { no: 1, nama: 'SOP Penyusunan Peraturan Daerah', nomor: 'SOP/HKM/001/2023', tahun: 2023, file: '#' },
    { no: 2, nama: 'SOP Penyusunan Peraturan Bupati', nomor: 'SOP/HKM/002/2023', tahun: 2023, file: '#' },
    { no: 3, nama: 'SOP Penyusunan Keputusan Bupati', nomor: 'SOP/HKM/003/2023', tahun: 2023, file: '#' },
    { no: 4, nama: 'SOP Pemberian Bantuan Hukum', nomor: 'SOP/HKM/004/2022', tahun: 2022, file: '#' },
    { no: 5, nama: 'SOP Pelayanan Informasi Hukum', nomor: 'SOP/HKM/005/2022', tahun: 2022, file: '#' },
    { no: 6, nama: 'SOP Pengelolaan Dokumentasi Hukum', nomor: 'SOP/HKM/006/2023', tahun: 2023, file: '#' },
    { no: 7, nama: 'SOP Pengkajian dan Harmonisasi Produk Hukum', nomor: 'SOP/HKM/007/2021', tahun: 2021, file: '#' },
];

export default function Sop() {
    const [search, setSearch] = useState('');
    const filtered = SOP_LIST.filter(s =>
        s.nama.toLowerCase().includes(search.toLowerCase()) ||
        s.nomor.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <PublicLayout>
            <Head title="SOP – JDIH Banjarnegara" />
            <PageHeader
                title="Standar Operasional Prosedur (SOP)"
                subtitle="Dokumen SOP layanan Bagian Hukum Setda Kabupaten Banjarnegara"
                breadcrumbs={[{ label: 'Profil Kami' }, { label: 'SOP' }]}
            />
            <section className="py-12 px-6">
                <div className="max-w-5xl mx-auto">
                    {/* Search */}
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Cari SOP..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full md:w-80 px-4 py-2.5 border border-slate-200 rounded focus:outline-none focus:border-[#0d9488] text-sm"
                        />
                    </div>

                    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                        <div className="bg-[#1e293b] px-6 py-4 flex items-center gap-3">
                            <FileText className="h-5 w-5 text-[#0d9488]" />
                            <h2 className="text-white font-bold">Daftar SOP ({filtered.length} dokumen)</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider">
                                        <th className="px-4 py-3 text-left text-slate-500 w-12">No</th>
                                        <th className="px-4 py-3 text-left text-slate-500">Nama SOP</th>
                                        <th className="px-4 py-3 text-left text-slate-500">Nomor</th>
                                        <th className="px-4 py-3 text-left text-slate-500">Tahun</th>
                                        <th className="px-4 py-3 text-center text-slate-500">Unduh</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map((sop, i) => (
                                        <tr key={sop.no} className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${i % 2 !== 0 ? 'bg-slate-50/40' : ''}`}>
                                            <td className="px-4 py-3 text-center text-slate-400 font-mono text-xs">{String(sop.no).padStart(2, '0')}</td>
                                            <td className="px-4 py-3 font-medium text-[#1e293b]">{sop.nama}</td>
                                            <td className="px-4 py-3 text-slate-500 font-mono text-xs">{sop.nomor}</td>
                                            <td className="px-4 py-3">
                                                <span className="bg-[#0d9488]/10 text-[#0d9488] text-xs font-bold px-2 py-0.5 rounded">{sop.tahun}</span>
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <a href={sop.file} className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#1e293b] text-white text-xs rounded hover:bg-slate-700 transition-colors">
                                                    <Download className="h-3.5 w-3.5" /> PDF
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                    {filtered.length === 0 && (
                                        <tr><td colSpan={5} className="px-4 py-8 text-center text-slate-400">Tidak ada SOP ditemukan.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
