import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import { Target, ListChecks, CheckCircle2 } from 'lucide-react';

export default function Tupoksi({ item }: { item?: any }) {
    const FUNGSI = [
        'Pengkoordinasian penyusunan kebijakan daerah di bidang perundang-undangan, bantuan hukum, serta dokumentasi dan informasi.',
        'Pengkoordinasian pelaksanaan tugas Perangkat Daerah di bidang perundang-undangan, bantuan hukum, serta dokumentasi dan informasi.',
        'Pemantauan dan evaluasi pelaksanaan kebijakan daerah terkait bidang hukum.',
        'Pelaksanaan fungsi kedinasan lain yang diberikan oleh Asisten Pemerintahan dan Kesejahteraan Rakyat yang berkaitan dengan tugasnya.',
    ];

    return (
        <PublicLayout>
            <Head title="Tugas Pokok dan Fungsi – JDIH Banjarnegara" />

            <PageHeader
                title="Tugas Pokok dan Fungsi"
                subtitle="Penjabaran tugas pokok dan fungsi Bagian Hukum Sekretariat Daerah Kabupaten Banjarnegara"
                breadcrumbs={[{ label: 'Profil Kami' }, { label: 'Tugas dan Fungsi' }]}
            />

            <section className="py-12 px-6 bg-slate-50">
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Intro from Database */}
                    {item && (
                        <div className="profile-card-wrapper mb-8">
                            <div className="profile-content-premium" dangerouslySetInnerHTML={{ __html: item.content }} />
                        </div>
                    )}

                    {/* ── TUGAS POKOK ── */}
                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                        <div className="bg-[#0d9488] px-6 py-5 flex items-center gap-4">
                            <div className="h-10 w-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                                <Target className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <p className="text-teal-100 text-xs font-semibold uppercase tracking-widest">Bagian Hukum Setda Kab. Banjarnegara</p>
                                <h2 className="text-white font-bold text-lg">Tugas Pokok</h2>
                            </div>
                        </div>
                        <div className="px-6 py-6">
                            <p className="text-slate-700 leading-relaxed text-[15px]">
                                Bagian Hukum mempunyai tugas melaksanakan pengkoordinasian perumusan kebijakan daerah, 
                                pengkoordinasian pelaksanaan tugas Perangkat Daerah, pemantauan dan evaluasi pelaksanaan 
                                kebijakan daerah di bidang perundang-undangan, bantuan hukum, serta dokumentasi dan informasi.
                            </p>
                        </div>
                    </div>

                    {/* ── FUNGSI ── */}
                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                        <div className="bg-[#1e293b] px-6 py-5 flex items-center gap-4">
                            <div className="h-10 w-10 bg-[#0d9488]/20 rounded-lg flex items-center justify-center shrink-0">
                                <ListChecks className="h-5 w-5 text-[#0d9488]" />
                            </div>
                            <div>
                                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">Uraian Tugas</p>
                                <h2 className="text-white font-bold text-lg">Fungsi Utama</h2>
                            </div>
                        </div>
                        <div className="p-0">
                            {FUNGSI.map((txt, i) => (
                                <div key={i} className={`flex items-start gap-4 px-6 py-5 ${i !== FUNGSI.length - 1 ? 'border-b border-slate-100' : ''}`}>
                                    <div className="mt-1">
                                        <CheckCircle2 className="h-5 w-5 text-[#0d9488]" />
                                    </div>
                                    <p className="text-slate-600 text-[15px] leading-relaxed">{txt}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
