import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import { Target, ListChecks } from 'lucide-react';

/* ------------------------------------------------------------------ */
/* DATA TUPOKSI – sesuai konten asli jdih.banjarnegarakab.go.id       */
/* ------------------------------------------------------------------ */
const TUGAS_POKOK = `Melaksanakan pengoordinasian penyusunan dan analisis kebijakan Daerah, pengoordinasian pelaksanaan tugas Perangkat Daerah, pemantauan dan evaluasi pelaksanaan kebijakan Daerah, membantu pelaksanaan tugas dan wewenang Gubernur sebagai wakil pemerintah pusat bidang hukum, pelayanan administratif dan pembinaan sumber daya ASN di bidang perundang-undangan, bantuan hukum dan hak asasi manusia dan pengawasan produk hukum daerah dan jaringan dokumentasi serta informasi hukum.`;

const FUNGSI = [
    'Pengoordinasian penyusunan dan analisis kebijakan Daerah di bidang perundang-undangan, bantuan hukum dan hak asasi manusia dan pengawasan produk hukum daerah, serta jaringan dokumentasi dan informasi hukum;',
    'Pengoordinasian pelaksanaan tugas Perangkat Daerah di bidang perundang-undangan, bantuan hukum dan hak asasi manusia dan pengawasan produk hukum daerah, serta jaringan dokumentasi dan informasi hukum;',
    'Pemantauan dan evaluasi pelaksanaan kebijakan Daerah di bidang perundang-undangan, bantuan hukum dan hak asasi manusia dan pengawasan produk hukum daerah, serta jaringan dokumentasi dan informasi hukum;',
    'Pengoordinasian pelaksanaan tugas dan wewenang Bupati sebagai wakil pemerintah provinsi bidang hukum;',
    'Pelaksanaan pelayanan administratif dan pembinaan sumber daya ASN di bidang perundang-undangan, bantuan hukum dan hak asasi manusia dan pengawasan produk hukum daerah, serta jaringan dokumentasi dan informasi hukum; dan',
    'Pelaksanaan tugas lain yang diberikan oleh Asisten Pemerintahan dan Kesejahteraan Rakyat.',
];

/* ------------------------------------------------------------------ */
/* PAGE                                                                */
/* ------------------------------------------------------------------ */
export default function Tupoksi() {
    return (
        <PublicLayout>
            <Head title="Tupoksi Bagian Hukum – JDIH Banjarnegara" />

            <PageHeader
                title="Tupoksi Bagian Hukum"
                subtitle="Tugas Pokok dan Fungsi Bagian Hukum Sekretariat Daerah Kabupaten Banjarnegara"
                breadcrumbs={[{ label: 'Profil Kami' }, { label: 'Tupoksi Bagian Hukum' }]}
            />

            <section className="py-12 px-6 bg-slate-50">
                <div className="max-w-4xl mx-auto space-y-8">

                    {/* ── TUGAS POKOK ── */}
                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                        {/* Header */}
                        <div className="bg-[#0d9488] px-6 py-5 flex items-center gap-4">
                            <div className="h-10 w-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                                <Target className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <p className="text-teal-100 text-xs font-semibold uppercase tracking-widest">Bagian Hukum Setda Kab. Banjarnegara</p>
                                <h2 className="text-white font-bold text-lg">Tugas Pokok</h2>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="px-6 py-6">
                            <p className="text-slate-700 leading-relaxed text-[15px]">
                                {TUGAS_POKOK}
                            </p>
                        </div>
                    </div>

                    {/* ── FUNGSI ── */}
                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                        {/* Header */}
                        <div className="bg-[#1e293b] px-6 py-5 flex items-center gap-4">
                            <div className="h-10 w-10 bg-[#0d9488]/30 rounded-lg flex items-center justify-center shrink-0">
                                <ListChecks className="h-5 w-5 text-[#0d9488]" />
                            </div>
                            <div>
                                <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest">Bagian Hukum Setda Kab. Banjarnegara</p>
                                <h2 className="text-white font-bold text-lg">Fungsi</h2>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="px-6 py-6">
                            <ol className="space-y-5">
                                {FUNGSI.map((item, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        {/* Nomor */}
                                        <span className="h-8 w-8 bg-[#0d9488] text-white rounded-lg flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                                            {i + 1}
                                        </span>
                                        {/* Teks */}
                                        <p className="text-slate-700 leading-relaxed text-[15px] pt-1">
                                            {item}
                                        </p>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>

                    {/* ── Catatan ── */}
                    <div className="border border-[#0d9488]/30 bg-[#0d9488]/5 rounded-lg px-5 py-4 text-sm text-slate-600">
                        <span className="font-semibold text-[#0d9488]">Dasar Hukum:</span>{' '}
                        Peraturan Bupati Banjarnegara tentang Kedudukan, Susunan Organisasi, Tugas dan Fungsi
                        serta Tata Kerja Sekretariat Daerah Kabupaten Banjarnegara.
                    </div>

                </div>
            </section>
        </PublicLayout>
    );
}
