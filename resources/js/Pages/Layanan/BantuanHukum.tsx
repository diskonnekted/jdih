import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import { Head } from '@inertiajs/react';
import { 
    Scale, Shield, FileText, CheckCircle2, 
    Info, ExternalLink, HelpCircle, Users,
    Building2, Gavel, ClipboardCheck, ArrowRight
} from 'lucide-react';

export default function BantuanHukum() {
    const OBH_LIST = [
        { name: 'LBH Banjarnegara', address: 'Jl. Pemuda No. 12, Banjarnegara', contact: '(0286) 123456' },
        { name: 'Posbakum Pengadilan Negeri Banjarnegara', address: 'Jl. Ahmad Yani No. 10, Banjarnegara', contact: '-' },
        { name: 'LBH Perisai Bangsa', address: 'Kec. Purwareja Klampok, Banjarnegara', contact: '0812-xxxx-xxxx' },
    ];

    const SYARAT = [
        'Surat Keterangan Tidak Mampu (SKTM) dari Desa/Kelurahan',
        'Fotokopi KTP dan Kartu Keluarga',
        'Dokumen pendukung perkara (Gugatan, Panggilan, dsb)',
        'Uraian singkat mengenai pokok persoalan hukum',
    ];

    return (
        <PublicLayout variant="classic">
            <Head title="Layanan Bantuan Hukum – JDIH Banjarnegara" />
            
            <PageHeader 
                title="Layanan Bantuan Hukum" 
                breadcrumbs={[
                    { label: 'Layanan Hukum', href: '#' },
                    { label: 'Bantuan Hukum' }
                ]}
            />

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    
                    {/* LEFT: Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        
                        {/* ── Intro Section ── */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-emerald-100 rounded-xl">
                                    <Scale className="h-6 w-6 text-emerald-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900">Tentang Bantuan Hukum</h2>
                            </div>
                            <div className="prose prose-slate max-w-none">
                                <p className="text-slate-600 leading-relaxed text-lg">
                                    Pemerintah Kabupaten Banjarnegara berkomitmen memberikan akses keadilan bagi seluruh lapisan masyarakat, khususnya bagi masyarakat miskin atau tidak mampu yang sedang menghadapi permasalahan hukum.
                                </p>
                                <p className="text-slate-600 leading-relaxed">
                                    Bantuan Hukum adalah jasa hukum yang diberikan oleh Pemberi Bantuan Hukum secara cuma-cuma (gratis) kepada Penerima Bantuan Hukum. Penerima Bantuan Hukum adalah orang atau kelompok orang miskin yang tidak dapat memenuhi hak dasar secara layak dan mandiri.
                                </p>
                            </div>
                        </section>

                        {/* ── Dasar Hukum ── */}
                        <section className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <Gavel className="h-5 w-5 text-[#0d9488]" />
                                Dasar Hukum
                            </h3>
                            <div className="space-y-4">
                                <div className="flex gap-4 group">
                                    <div className="h-10 w-10 shrink-0 bg-white rounded-lg flex items-center justify-center border border-slate-200 group-hover:border-[#0d9488] transition-colors">
                                        <FileText className="h-5 w-5 text-slate-400 group-hover:text-[#0d9488]" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-700">Undang-Undang Nomor 16 Tahun 2011</p>
                                        <p className="text-xs text-slate-500">Tentang Bantuan Hukum</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 group">
                                    <div className="h-10 w-10 shrink-0 bg-white rounded-lg flex items-center justify-center border border-slate-200 group-hover:border-[#0d9488] transition-colors">
                                        <FileText className="h-5 w-5 text-slate-400 group-hover:text-[#0d9488]" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-700">Peraturan Daerah Kabupaten Banjarnegara</p>
                                        <p className="text-xs text-slate-500">Tentang Penyelenggaraan Bantuan Hukum Bagi Masyarakat Miskin</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* ── Prosedur ── */}
                        <section>
                            <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                                <ClipboardCheck className="h-6 w-6 text-[#0d9488]" />
                                Alur Permohonan
                            </h3>
                            <div className="relative space-y-8 before:absolute before:left-6 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                                {[
                                    { t: 'Pendaftaran', d: 'Pemohon datang ke Organisasi Bantuan Hukum (OBH) yang terakreditasi dengan membawa persyaratan.' },
                                    { t: 'Verifikasi', d: 'OBH melakukan verifikasi berkas dan identitas pemohon sesuai kriteria masyarakat miskin.' },
                                    { t: 'Analisis Perkara', d: 'Advokat/Paralegal melakukan analisis terhadap duduk perkara yang dihadapi pemohon.' },
                                    { t: 'Pemberian Bantuan', d: 'Pemberian jasa hukum baik litigasi (di pengadilan) maupun non-litigasi.' },
                                ].map((step, i) => (
                                    <div key={i} className="relative pl-14">
                                        <div className="absolute left-0 top-0 h-12 w-12 rounded-full bg-white border-2 border-[#0d9488] flex items-center justify-center font-black text-[#0d9488] z-10">
                                            {i + 1}
                                        </div>
                                        <h4 className="font-bold text-slate-900 mb-1">{step.t}</h4>
                                        <p className="text-sm text-slate-500 leading-relaxed">{step.d}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                    </div>

                    {/* RIGHT: Sidebar Info */}
                    <div className="space-y-8">
                        
                        {/* ── Persyaratan ── */}
                        <div className="bg-[#1e293b] rounded-2xl p-6 shadow-xl text-white">
                            <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2 opacity-80">
                                <Shield className="h-4 w-4" />
                                Persyaratan Utama
                            </h3>
                            <ul className="space-y-4">
                                {SYARAT.map((item, i) => (
                                    <li key={i} className="flex gap-3 text-sm font-medium">
                                        <CheckCircle2 className="h-5 w-5 text-[#0d9488] shrink-0" />
                                        <span className="opacity-90">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
                                <div className="flex gap-3">
                                    <Info className="h-5 w-5 text-[#0d9488] shrink-0" />
                                    <p className="text-[11px] leading-relaxed opacity-60">
                                        * Seluruh layanan bantuan hukum untuk masyarakat miskin tidak dipungut biaya apapun (GRATIS).
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* ── OBH Terakreditasi ── */}
                        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                                <Building2 className="h-4 w-4" />
                                OBH Terakreditasi
                            </h3>
                            <div className="space-y-4">
                                {OBH_LIST.map((obh, i) => (
                                    <div key={i} className="p-4 rounded-xl border border-slate-50 hover:border-[#0d9488]/30 hover:bg-slate-50 transition-all group">
                                        <h4 className="text-sm font-bold text-slate-800 group-hover:text-[#0d9488]">{obh.name}</h4>
                                        <p className="text-[11px] text-slate-400 mt-1">{obh.address}</p>
                                        <div className="mt-3 flex items-center justify-between text-[10px] font-bold text-slate-500">
                                            <span>{obh.contact}</span>
                                            <button className="text-[#0d9488] flex items-center gap-1 hover:underline">
                                                Detail <ArrowRight className="h-2.5 w-2.5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── FAQ Quick Link ── */}
                        <Link 
                            href="/konsultasi-hukum"
                            className="block bg-emerald-600 rounded-2xl p-6 text-white hover:bg-emerald-700 transition-colors group"
                        >
                            <HelpCircle className="h-8 w-8 mb-4 opacity-50 group-hover:scale-110 transition-transform" />
                            <h3 className="font-bold text-lg mb-1">Butuh Konsultasi?</h3>
                            <p className="text-emerald-100 text-xs">Ajukan pertanyaan hukum Anda secara online melalui portal konsultasi kami.</p>
                            <div className="mt-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest">
                                Klik Disini <ArrowRight className="h-3 w-3" />
                            </div>
                        </Link>

                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
