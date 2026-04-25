import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import { FileText, Eye, Download, Calendar } from 'lucide-react';

interface Document {
    id: number;
    nomor: string;
    judul: string;
    pihak: string;
    jenis: string;
    tanggal: string;
}

const JENIS_COLORS: Record<string, string> = {
    MOU: '#0d9488', PKS: '#1e293b', Nokespa: '#6366f1',
};

function fmtDate(d: string) {
    return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

interface Props {
    documents: Document[];
}

export default function KerjaSama({ documents = [] }: Props) {
    return (
        <PublicLayout>
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
                        {documents.map((k) => (
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
                                        <Link href={`/katalog/${k.id}`} className="flex items-center gap-1.5 px-3 py-2 bg-[#1e293b] text-white text-xs font-bold rounded hover:bg-slate-700 transition-colors">
                                            <Eye className="h-3.5 w-3.5" /> Detail
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {documents.length === 0 && (
                            <div className="bg-white border border-slate-100 rounded-xl p-20 text-center text-slate-400">
                                Belum ada data kerja sama yang tersedia.
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
