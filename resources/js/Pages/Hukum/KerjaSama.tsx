import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import { FileText, Eye, Download, Calendar } from 'lucide-react';

const KERJA_SAMA = [
    { id: 1, nomor: 'MOU/2025/001', judul: 'Penandatanganan MOU Dengan Kejaksaan Negeri Banjarnegara Terkait Pelaksanaan Pidana Kerja Sosial', pihak: 'Kejaksaan Negeri Banjarnegara', jenis: 'MOU', tanggal: '2025-10-05' },
    { id: 2, nomor: 'PKS/2025/002', judul: 'Perjanjian Kerja Sama Pengelolaan Arsip Daerah dengan Arsip Nasional', pihak: 'Arsip Nasional RI', jenis: 'PKS', tanggal: '2025-08-15' },
    { id: 3, nomor: 'MOU/2024/003', judul: 'Nota Kesepahaman Pengembangan SDM Hukum dengan Universitas Jenderal Soedirman', pihak: 'Universitas Jenderal Soedirman', jenis: 'Nokespa', tanggal: '2024-11-20' },
    { id: 4, nomor: 'PKS/2024/004', judul: 'Perjanjian Kerja Sama Pendampingan Hukum dengan Peradi Banjarnegara', pihak: 'Peradi Banjarnegara', jenis: 'PKS', tanggal: '2024-07-10' },
    { id: 5, nomor: 'KB/2023/005', judul: 'Kesepakatan Bersama Pelaksanaan Penyuluhan Hukum dengan Kemenkumham', pihak: 'Kemenkumham Jawa Tengah', jenis: 'Nokespa', tanggal: '2023-12-01' },
];

const JENIS_COLORS: Record<string, string> = {
    MOU: '#0d9488', PKS: '#1e293b', Nokespa: '#6366f1',
};

function fmtDate(d: string) {
    return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function KerjaSama() {
    return (
        <PublicLayout>
            <Head title="Kerja Sama Daerah – JDIH Banjarnegara" />
            <PageHeader
                title="Kerja Sama Daerah"
                subtitle="Daftar dokumen perjanjian kerja sama Pemerintah Kabupaten Banjarnegara"
                breadcrumbs={[{ label: 'Kerja Sama Daerah' }]}
            />
            <section className="py-10 px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Legend */}
                    <div className="flex flex-wrap gap-3 mb-6">
                        {Object.entries(JENIS_COLORS).map(([jenis, color]) => (
                            <div key={jenis} className="flex items-center gap-2 text-xs text-slate-600">
                                <span className="h-3 w-3 rounded-full inline-block" style={{ backgroundColor: color }} />
                                {jenis === 'Nokespa' ? 'Nota Kesepakatan' : jenis}
                            </div>
                        ))}
                    </div>

                    <div className="space-y-4">
                        {KERJA_SAMA.map((k) => (
                            <div key={k.id} className="bg-white border border-slate-200 rounded-lg p-5 hover:border-[#0d9488] hover:shadow-sm transition-all group">
                                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-2 mb-2">
                                            <span className="text-xs font-bold px-2 py-0.5 rounded text-white" style={{ backgroundColor: JENIS_COLORS[k.jenis] ?? '#0d9488' }}>
                                                {k.jenis}
                                            </span>
                                            <span className="text-xs text-slate-400 font-mono">{k.nomor}</span>
                                            <span className="text-xs text-slate-400 flex items-center gap-1">
                                                <Calendar className="h-3.5 w-3.5" /> {fmtDate(k.tanggal)}
                                            </span>
                                        </div>
                                        <p className="font-semibold text-[#1e293b] text-sm group-hover:text-[#0d9488] transition-colors leading-snug mb-1">
                                            {k.judul}
                                        </p>
                                        <p className="text-xs text-slate-500">Pihak: {k.pihak}</p>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <button className="flex items-center gap-1.5 px-3 py-2 bg-[#1e293b] text-white text-xs font-bold rounded hover:bg-slate-700 transition-colors">
                                            <Eye className="h-3.5 w-3.5" /> Detail
                                        </button>
                                        <button className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 text-xs font-bold rounded hover:border-[#0d9488] hover:text-[#0d9488] transition-colors">
                                            <Download className="h-3.5 w-3.5" /> PDF
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
