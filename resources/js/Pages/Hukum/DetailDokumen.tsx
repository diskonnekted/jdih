import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import { 
    Download, ArrowLeft, Calendar, Tag, FileText, 
    Eye, History, Info, ExternalLink, ChevronRight,
    Gavel, ShieldCheck, Scale
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DocumentData {
    id: number;
    title: string;
    number: string;
    year: string;
    type: string;
    document_type: string;
    teu: string;
    abbreviation?: string;
    code: string;
    status: string;
    status_note?: string;
    related_text?: string;
    implementing_regulations?: string;
    abstract?: string;
    file?: string;
    date_published?: string;
    date_promulgated?: string;
    place?: string;
    source?: string;
    subject?: any;
    govt_field?: string;
    language?: string;
    location?: string;
    signer?: string;
    judicial_review?: string;
    initiator?: string;
    related: any[];
    referenced_by: any[];
}

interface Props {
    kategori: string;
    title: string;
    code: string;
    document: DocumentData;
}

const TABS = [
    { id: 'info', label: 'Informasi Detail', icon: Info },
    { id: 'preview', label: 'Pratinjau PDF', icon: Eye },
    { id: 'status', label: 'Status Hubungan', icon: History },
    { id: 'download', label: 'Unduhan', icon: Download },
];

export default function DetailDokumen({ kategori, title, code, document }: Props) {
    const [activeTab, setActiveTab] = useState('info');

    const fmtDate = (d?: string) => {
        if (!d) return '-';
        return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    const subjects = Array.isArray(document.subject) ? document.subject : (document.subject ? JSON.parse(document.subject) : []);

    const metadata = [
        { label: 'Tipe Dokumen', value: document.document_type || 'Peraturan Perundang-undangan' },
        { label: 'Jenis', value: document.type },
        { label: 'Judul', value: `${document.type} Nomor ${document.number} Tahun ${document.year} tentang ${document.title}` },
        { label: 'T.E.U', value: document.teu || 'Banjarnegara' },
        { label: 'Nomor', value: document.number },
        { label: 'Tahun Terbit', value: document.year },
        { label: 'Singkatan Jenis', value: document.abbreviation || document.code },
        { label: 'Tempat Penetapan', value: document.place || 'Banjarnegara' },
        { label: 'Tanggal Penetapan', value: fmtDate(document.date_published) },
        { label: 'Tanggal Pengundangan', value: fmtDate(document.date_promulgated) },
        { label: 'Subjek', value: subjects.join(', ') || '-' },
        { label: 'Sumber', value: document.source || '-' },
        { label: 'Status', value: document.status },
        { label: 'Keterangan Status', value: document.status_note || '-' },
        { label: 'Bahasa', value: document.language || 'Bahasa Indonesia' },
        { label: 'Lokasi', value: document.location || 'Bagian Hukum SETDA Kabupaten Banjarnegara' },
        { label: 'Bidang Hukum', value: document.govt_field || '-' },
        { label: 'Penandatangan', value: document.signer || '-' },
        { label: 'Hasil Uji Materi', value: document.judicial_review || '-' },
        { label: 'Peraturan Terkait', value: document.related_text || '-' },
        { label: 'Peraturan Pelaksana', value: document.implementing_regulations || '-' },
    ];

    return (
        <PublicLayout>
            <Head title={`${document.number} Tahun ${document.year} – JDIH Banjarnegara`} />
            
            <PageHeader
                title="Inventarisasi Hukum"
                breadcrumbs={[
                    { label: 'Beranda', href: '/' },
                    { label: 'Database Hukum', href: '/katalog' },
                    { label: title, href: `/${kategori}` },
                    { label: `Detail No. ${document.number}` },
                ]}
            />

            <section className="py-20 bg-slate-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-6">
                    
                    {/* Header Info Card */}
                    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-200 mb-8 overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <Scale className="h-32 w-32 rotate-12" />
                        </div>
                        <div className="relative z-10">
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <span className="bg-[#003399] text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                                    {document.code}
                                </span>
                                <span className={`text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border-2 ${
                                    document.status === 'Berlaku' 
                                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                                        : 'bg-rose-50 text-rose-600 border-rose-100'
                                }`}>
                                    {document.status}
                                </span>
                                {document.year && (
                                    <span className="bg-slate-100 text-slate-500 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                                        Tahun {document.year}
                                    </span>
                                )}
                            </div>
                            <h1 className="text-2xl md:text-3xl font-black text-[#1e293b] leading-tight mb-4 max-w-4xl">
                                {document.type} Nomor {document.number} Tahun {document.year} tentang {document.title}
                            </h1>
                            <div className="flex flex-wrap gap-6 text-sm text-slate-500 font-medium">
                                <span className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-[#003399]" />
                                    Ditetapkan: {fmtDate(document.date_published)}
                                </span>
                                <span className="flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4 text-[#003399]" />
                                    Oleh: Bagian Hukum Setda Banjarnegara
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        
                        {/* Sidebar Desktop / Topbar Mobile Tabs */}
                        <div className="lg:col-span-1 space-y-4">
                            <div className="bg-white rounded-[2rem] p-4 shadow-sm border border-slate-200 sticky top-24">
                                <div className="flex flex-col gap-2">
                                    {TABS.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-black text-xs uppercase tracking-widest ${
                                                activeTab === tab.id
                                                    ? 'bg-[#003399] text-white shadow-xl shadow-blue-900/20 active:scale-95'
                                                    : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                                            }`}
                                        >
                                            <tab.icon className={`h-5 w-5 ${activeTab === tab.id ? 'text-white' : 'text-slate-300'}`} />
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>
                                <div className="mt-8 pt-8 border-t border-slate-100">
                                    <Link href={`/${kategori}`} className="flex items-center gap-3 px-6 py-4 text-slate-400 hover:text-[#003399] transition-colors text-xs font-black uppercase tracking-widest">
                                        <ArrowLeft className="h-4 w-4" /> Kembali
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Main Content Area */}
                        <div className="lg:col-span-3">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 min-h-[600px] overflow-hidden"
                                >
                                    {/* Tab: Informasi Detail */}
                                    {activeTab === 'info' && (
                                        <div className="p-10">
                                            <div className="flex items-center gap-3 mb-8">
                                                <div className="p-2 bg-blue-50 rounded-xl">
                                                    <Info className="h-5 w-5 text-[#003399]" />
                                                </div>
                                                <h3 className="text-lg font-black text-[#1e293b] uppercase tracking-widest">Metadata Dokumen</h3>
                                            </div>
                                            
                                            <div className="space-y-0 border-t border-slate-100">
                                                {metadata.map((item, i) => (
                                                    <div key={i} className="grid grid-cols-1 md:grid-cols-3 py-6 border-b border-slate-100 hover:bg-slate-50/50 transition-colors px-4 rounded-xl">
                                                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
                                                        <span className="md:col-span-2 text-sm font-bold text-[#1e293b]">{item.value}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            {document.abstract && (
                                                <div className="mt-10 p-8 bg-slate-50 rounded-3xl border border-slate-100">
                                                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Abstrak / Ringkasan</h4>
                                                    <p className="text-sm text-slate-600 leading-relaxed font-medium">{document.abstract}</p>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Tab: Pratinjau PDF */}
                                    {activeTab === 'preview' && (
                                        <div className="h-full flex flex-col p-6">
                                            <div className="flex items-center justify-between mb-6 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-emerald-50 rounded-xl">
                                                        <FileText className="h-5 w-5 text-emerald-600" />
                                                    </div>
                                                    <h3 className="text-lg font-black text-[#1e293b] uppercase tracking-widest">Pratinjau Dokumen</h3>
                                                </div>
                                                {document.file && (
                                                    <a href={document.file} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-black text-[#003399] uppercase tracking-widest hover:underline">
                                                        Buka Tab Baru <ExternalLink className="h-3 w-3" />
                                                    </a>
                                                )}
                                            </div>
                                            <div className="flex-1 bg-slate-900 rounded-[2rem] overflow-hidden border-8 border-slate-900 min-h-[700px]">
                                                {document.file ? (
                                                    <iframe 
                                                        src={`${document.file}#toolbar=0`} 
                                                        className="w-full h-full" 
                                                        title="PDF Preview"
                                                    />
                                                ) : (
                                                    <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-4">
                                                        <FileText className="h-16 w-16 opacity-20" />
                                                        <p className="font-bold uppercase tracking-widest text-xs">File tidak tersedia</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Tab: Status Peraturan */}
                                    {activeTab === 'status' && (
                                        <div className="p-10">
                                            <div className="flex items-center gap-3 mb-10">
                                                <div className="p-2 bg-orange-50 rounded-xl">
                                                    <History className="h-5 w-5 text-orange-500" />
                                                </div>
                                                <h3 className="text-lg font-black text-[#1e293b] uppercase tracking-widest">Riwayat & Status</h3>
                                            </div>

                                            <div className="space-y-12">
                                                {/* Section: Status Sekarang */}
                                                <div className="relative">
                                                    <div className="absolute left-6 top-10 bottom-0 w-px bg-slate-100" />
                                                    <div className="flex gap-8 relative z-10">
                                                        <div className="h-12 w-12 rounded-2xl bg-emerald-500 border-4 border-white shadow-lg flex items-center justify-center text-white shrink-0">
                                                            <Gavel className="h-5 w-5" />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Status Saat Ini</p>
                                                            <p className="text-lg font-black text-[#1e293b]">{document.status}</p>
                                                            {document.status_note && (
                                                                <p className="mt-2 text-sm font-medium text-slate-500 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                                                    {document.status_note}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Section: Hubungan Mencabut */}
                                                {(document.related?.length > 0 || document.referenced_by?.length > 0) ? (
                                                    <div className="space-y-8 pl-20">
                                                        {document.related.map((rel, i) => (
                                                            <div key={i} className="flex items-center gap-4 group">
                                                                <div className="h-2 w-2 rounded-full bg-blue-500" />
                                                                <div className="flex-1 p-6 bg-slate-50 rounded-3xl border border-slate-100 group-hover:border-blue-200 group-hover:bg-blue-50 transition-all cursor-pointer">
                                                                    <div className="flex justify-between items-start mb-2">
                                                                        <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest px-3 py-1 bg-white rounded-full border border-blue-100">{rel.type}</span>
                                                                        <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-blue-500" />
                                                                    </div>
                                                                    <p className="text-sm font-bold text-[#1e293b] leading-snug">{rel.type} {rel.number} Tahun {rel.year} o/ {rel.title}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        {document.referenced_by.map((rel, i) => (
                                                            <div key={i} className="flex items-center gap-4 group">
                                                                <div className="h-2 w-2 rounded-full bg-rose-500" />
                                                                <div className="flex-1 p-6 bg-slate-50 rounded-3xl border border-slate-100 group-hover:border-rose-200 group-hover:bg-rose-50 transition-all cursor-pointer">
                                                                    <div className="flex justify-between items-start mb-2">
                                                                        <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest px-3 py-1 bg-white rounded-full border border-rose-100">{rel.type}</span>
                                                                        <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-rose-500" />
                                                                    </div>
                                                                    <p className="text-sm font-bold text-[#1e293b] leading-snug">{rel.type} oleh {rel.number} Tahun {rel.year} - {rel.title}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="ml-20 p-10 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200 text-center">
                                                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Tidak ada hubungan peraturan yang tercatat</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Tab: Unduhan */}
                                    {activeTab === 'download' && (
                                        <div className="p-10">
                                            <div className="flex items-center gap-3 mb-10">
                                                <div className="p-2 bg-blue-50 rounded-xl">
                                                    <Download className="h-5 w-5 text-[#003399]" />
                                                </div>
                                                <h3 className="text-lg font-black text-[#1e293b] uppercase tracking-widest">Unduhan Dokumen</h3>
                                            </div>

                                            {document.file ? (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="p-8 bg-gradient-to-br from-[#003399] to-blue-800 rounded-[2.5rem] text-white shadow-xl shadow-blue-900/20 group relative overflow-hidden">
                                                        <div className="absolute top-0 right-0 p-6 opacity-10">
                                                            <FileText className="h-20 w-20" />
                                                        </div>
                                                        <div className="relative z-10">
                                                            <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">File Utama (PDF)</p>
                                                            <h4 className="text-sm font-black mb-6 leading-relaxed opacity-90">{document.code}_{document.number}_Th_{document.year}.pdf</h4>
                                                            <a 
                                                                href={document.file}
                                                                download
                                                                className="flex items-center justify-center gap-3 w-full py-4 bg-white text-[#003399] rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg"
                                                            >
                                                                <Download className="h-4 w-4" /> Unduh Sekarang
                                                            </a>
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Placeholder for Lampiran if any */}
                                                    <div className="p-8 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
                                                        <History className="h-8 w-8 text-slate-200 mb-4" />
                                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Lampiran tidak tersedia</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="p-20 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                                                    <FileText className="h-16 w-16 text-slate-200 mx-auto mb-6" />
                                                    <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">Dokumen Belum Tersedia</h4>
                                                    <p className="mt-2 text-xs text-slate-300 font-medium max-w-xs mx-auto">File fisik untuk peraturan ini belum diunggah ke server JDIH.</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
