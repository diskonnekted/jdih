import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import { CheckCircle, Target } from 'lucide-react';

const VISI = `"Profesional dan Proporsional dalam penyusunan produk hukum daerah, pemberian bantuan hukum dan hak asasi manusia, pelayanan informasi dan dokumentasi hukum serta pengawasan produk hukum daerah kabupaten/kota"`;

const MISI = [
    'Menyusun Produk Hukum daerah selaras dengan kepentingan umum, peraturan perundang-undangan yang lebih tinggi dan/atau peraturan perundang-undangan lainnya serta harmonisasi dengan produk hukum setingkat.',
    'Menyelesaikan penanganan perkara dan pemberian bantuan dan perlindungan hukum berdasarkan kepastian hukum, berazaskan kebenaran dan keadilan.',
    'Melayani informasi dan dokumentasi hukum.',
    'Mewujudkan sumber daya manusia yang profesional dan handal di bidang hukum.',
];

export default function VisiMisi() {
    return (
        <PublicLayout>
            <Head title="Visi Misi – JDIH Banjarnegara" />
            <PageHeader
                title="Visi & Misi"
                subtitle="Visi dan Misi Bagian Hukum Sekretariat Daerah Kabupaten Banjarnegara"
                breadcrumbs={[{ label: 'Profil Kami' }, { label: 'Visi Misi' }]}
            />

            <section className="py-12 px-6">
                <div className="max-w-4xl mx-auto space-y-10">
                    {/* VISI */}
                    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                        <div className="bg-[#0d9488] px-6 py-4 flex items-center gap-3">
                            <Target className="h-6 w-6 text-white" />
                            <h2 className="text-lg font-bold text-white tracking-wide">Visi Bagian Hukum</h2>
                        </div>
                        <div className="px-6 py-6">
                            <blockquote className="border-l-4 border-[#0d9488] pl-6 text-[#1e293b] text-lg font-medium leading-relaxed italic">
                                {VISI}
                            </blockquote>
                        </div>
                    </div>

                    {/* MISI */}
                    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                        <div className="bg-[#1e293b] px-6 py-4 flex items-center gap-3">
                            <CheckCircle className="h-6 w-6 text-[#0d9488]" />
                            <h2 className="text-lg font-bold text-white tracking-wide">Misi Bagian Hukum</h2>
                        </div>
                        <div className="px-6 py-6">
                            <ol className="space-y-5">
                                {MISI.map((m, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <div className="h-8 w-8 bg-[#0d9488] text-white rounded flex items-center justify-center font-bold text-sm shrink-0">
                                            {i + 1}
                                        </div>
                                        <p className="text-slate-700 leading-relaxed pt-1">{m}</p>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
