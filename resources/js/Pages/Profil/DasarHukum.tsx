import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import { FileText } from 'lucide-react';

const DASAR_HUKUM = [
    { no: 1, peraturan: 'Undang-Undang Nomor 12 Tahun 2011', tentang: 'Pembentukan Peraturan Perundang-Undangan' },
    { no: 2, peraturan: 'Peraturan Presiden Nomor 33 Tahun 2012', tentang: 'Jaringan Dokumentasi dan Informasi Hukum Nasional' },
    { no: 3, peraturan: 'Peraturan Menteri Hukum dan Hak Asasi Manusia Nomor 8 Tahun 2019', tentang: 'Standar Pengelolaan Dokumen dan Informasi Hukum' },
    { no: 4, peraturan: 'Peraturan Daerah Kabupaten Banjarnegara Nomor 1 Tahun 2024', tentang: 'Perubahan Ketiga Atas Peraturan Daerah Nomor 2 Tahun 2016 tentang Pembentukan dan Susunan Perangkat Daerah' },
    { no: 5, peraturan: 'Peraturan Bupati Banjarnegara Nomor 54 Tahun 2021', tentang: 'Kedudukan, Susunan Organisasi, Tugas dan Fungsi serta Tata Kerja Sekretariat Daerah Kabupaten Banjarnegara' },
];

export default function DasarHukum({ item }: { item?: any }) {
    const DASAR_HUKUM_DEFAULT = [
        { no: 1, peraturan: 'Undang-Undang Nomor 12 Tahun 2011', tentang: 'Pembentukan Peraturan Perundang-Undangan' },
        { no: 2, peraturan: 'Peraturan Presiden Nomor 33 Tahun 2012', tentang: 'Jaringan Dokumentasi dan Informasi Hukum Nasional' },
        { no: 3, peraturan: 'Peraturan Menteri Hukum dan Hak Asasi Manusia Nomor 8 Tahun 2019', tentang: 'Standar Pengelolaan Dokumen dan Informasi Hukum' },
        { no: 4, peraturan: 'Peraturan Daerah Kabupaten Banjarnegara Nomor 1 Tahun 2024', tentang: 'Perubahan Ketiga Atas Peraturan Daerah Nomor 2 Tahun 2016 tentang Pembentukan dan Susunan Perangkat Daerah' },
        { no: 5, peraturan: 'Peraturan Bupati Banjarnegara Nomor 54 Tahun 2021', tentang: 'Kedudukan, Susunan Organisasi, Tugas dan Fungsi serta Tata Kerja Sekretariat Daerah Kabupaten Banjarnegara' },
    ];

    return (
        <PublicLayout>
            <Head title="Dasar Hukum – JDIH Banjarnegara" />
            <PageHeader
                title="Dasar Hukum"
                subtitle="Landasan hukum pembentukan dan pengelolaan JDIH Kabupaten Banjarnegara"
                breadcrumbs={[{ label: 'Profil Kami' }, { label: 'Dasar Hukum' }]}
            />
            <section className="py-12 px-6">
                <div className="max-w-5xl mx-auto">
                    {item ? (
                        <div className="profile-card-wrapper">
                            <div className="profile-content-premium" dangerouslySetInnerHTML={{ __html: item.content }} />
                        </div>
                    ) : (
                        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                            <div className="bg-[#1e293b] px-6 py-4 flex items-center gap-3">
                                <FileText className="h-5 w-5 text-[#0d9488]" />
                                <h2 className="text-white font-bold">Daftar Dasar Hukum JDIH Banjarnegara</h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-slate-50 border-b border-slate-200">
                                            <th className="px-4 py-3 text-left text-[#1e293b] font-bold w-12 text-center">No</th>
                                            <th className="px-4 py-3 text-left text-[#1e293b] font-bold">Peraturan</th>
                                            <th className="px-4 py-3 text-left text-[#1e293b] font-bold">Tentang</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {DASAR_HUKUM_DEFAULT.map((row, i) => (
                                            <tr key={i} className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/50'}`}>
                                                <td className="px-4 py-3 text-center">
                                                    <span className="h-7 w-7 bg-[#0d9488] text-white rounded text-xs font-bold flex items-center justify-center mx-auto">
                                                        {row.no}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 font-medium text-[#1e293b]">{row.peraturan}</td>
                                                <td className="px-4 py-3 text-slate-600">{row.tentang}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
