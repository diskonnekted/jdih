import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import { 
    FileText, 
    Download, 
    Calendar, 
    ChevronLeft, 
    Info, 
    Link as LinkIcon,
    FileType,
    BookOpen,
    Scale,
    Eye,
    X,
    BarChart3,
    User,
    MapPin
} from 'lucide-react';

interface MetadataField {
    label: string;
    value: string | number | null | undefined;
}

interface DocumentDetailProps {
    document: any;
    category: any;
}

export default function DetailDokumen({ document, category }: DocumentDetailProps) {
    const [showPreview, setShowPreview] = useState(false);
    
    // Safety check for category
    const activeCategory = category || document.category || { name: 'Dokumen', slug: 'katalog' };

    // Formatter for dates
    const formatDate = (dateString: string) => {
        if (!dateString) return '-';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
        } catch (e) {
            return dateString;
        }
    };

    const breadcrumbs = [
        { label: 'Katalog', href: `/${activeCategory.slug}` },
        { label: activeCategory.name, href: `/${activeCategory.slug}` },
        { label: `Nomor ${document.document_number || '-'}` }
    ];

    const sidebarFields: MetadataField[] = [
        { label: 'Tipe Dokumen', value: document.document_type || 'Peraturan Perundangan-undangan' },
        { label: 'Jenis', value: document.category?.name || 'Peraturan Daerah' },
        { label: 'Entitas', value: document.entity || '-' },
        { label: 'Nomor', value: document.document_number || '-' },
        { label: 'Tahun', value: document.year || '-' },
        { label: 'Singkatan', value: document.abbreviation || '-' },
        { label: 'Status', value: document.status || 'Berlaku' },
        { label: 'Tanggal Tetap', value: formatDate(document.published_at) },
        { label: 'Tgl. Unduh', value: formatDate(document.promulgated_at) },
        { label: 'Jumlah Hal.', value: document.page_count ? `${document.page_count} hal` : '-' },
    ];

    const detailFields: MetadataField[] = [
        { label: 'Bidang Hukum', value: document.legal_field || '-' },
        { label: 'T.E.U Orang/Badan', value: document.teu || '-' },
        { label: 'Pejabat Penandatangan', value: document.signer || '-' },
        { label: 'Pemrakarsa', value: document.initiator || '-' },
        { label: 'Pengarang', value: document.author || '-' },
        { label: 'Tempat Penetapan', value: document.place_of_enactment || '-' },
        { label: 'Tempat Penerbit', value: document.publisher_place || '-' },
        { label: 'Sumber', value: document.source || '-' },
        { label: 'Subjek', value: document.subject_text || '-' },
        { label: 'Bahasa', value: document.language || 'Indonesia' },
        { label: 'Lokasi', value: document.location || '-' },
    ];

    // Calculate file URL
    const fileUrl = document.file_path?.startsWith('http') 
        ? document.file_path 
        : `/${document.file_path}`;

    return (
        <PublicLayout variant="classic">
            <Head title={`Detail ${document.title}`} />
            
            <PageHeader 
                title="Detail Dokumen" 
                breadcrumbs={breadcrumbs}
            />

            <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
                
                {/* FULL WIDTH TITLE */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-8">
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <span className="px-4 py-1 bg-[#0d9488] text-white text-xs font-bold rounded uppercase tracking-wider">
                                {document.abbreviation || 'PERDA'}
                            </span>
                            <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                                <Calendar className="h-4 w-4" />
                                <span>{formatDate(document.published_at)}</span>
                            </div>
                            <span className={`px-3 py-1 text-xs font-bold rounded-full border ${
                                document.status === 'Berlaku' 
                                ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                                : 'bg-red-50 text-red-600 border-red-100'
                            }`}>
                                {document.status || 'Berlaku'}
                            </span>
                        </div>
                        
                        <h1 className="text-2xl font-bold text-slate-900 leading-tight">
                            {document.title}
                        </h1>
                    </div>
                </div>

                {/* THE MAIN GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    
                    {/* LEFT COLUMN (Wide 2/3) */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* 1. Abstrak / Ringkasan (MOVED HERE) */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                            <div className="bg-[#1e293b] px-6 py-4">
                                <h3 className="text-white font-bold text-sm flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-[#0d9488]" />
                                    Abstrak / Ringkasan
                                </h3>
                            </div>
                            <div className="p-8">
                                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                                    <p className="text-slate-600 text-sm leading-relaxed italic whitespace-pre-line">
                                        {document.abstract || "Abstrak untuk dokumen ini sedang dalam proses pembaharuan atau tidak tersedia."}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 2. Dokumen Produk Hukum + Large Preview */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                            <div className="bg-[#0d9488] px-6 py-4 flex justify-between items-center">
                                <h3 className="text-white font-bold text-sm flex items-center gap-2">
                                    <FileType className="h-4 w-4" />
                                    Dokumen Produk Hukum
                                </h3>
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={() => setShowPreview(!showPreview)}
                                        className="flex items-center gap-2 px-4 py-1.5 bg-white/10 text-white text-xs font-bold rounded-lg hover:bg-white/20 transition-colors border border-white/20"
                                    >
                                        <Eye className="h-3.5 w-3.5" />
                                        {showPreview ? 'Tutup Preview' : 'Tampilkan Preview'}
                                    </button>
                                    <a 
                                        href={fileUrl}
                                        download
                                        className="flex items-center gap-2 px-4 py-1.5 bg-[#1e293b] text-white text-xs font-bold rounded-lg hover:bg-black transition-colors"
                                    >
                                        <Download className="h-3.5 w-3.5" />
                                        Unduh PDF
                                    </a>
                                </div>
                            </div>
                            
                            {/* Large Preview Area */}
                            {showPreview ? (
                                <div className="bg-slate-900 aspect-[4/5] md:aspect-[4/3.2] relative border-b border-slate-100">
                                    <object 
                                        data={fileUrl}
                                        type="application/pdf"
                                        className="w-full h-full"
                                    >
                                        <div className="flex flex-col items-center justify-center h-full text-white p-8 text-center">
                                            <p className="text-sm font-bold mb-4">Browser Anda tidak mendukung preview PDF langsung.</p>
                                            <a href={fileUrl} className="px-6 py-2 bg-[#0d9488] rounded-lg text-xs font-bold">Download File di Sini</a>
                                        </div>
                                    </object>
                                    <button 
                                        onClick={() => setShowPreview(false)}
                                        className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>
                            ) : (
                                <div className="p-12 flex flex-col items-center justify-center text-center bg-slate-50 border-b border-slate-100">
                                    <div className="bg-white p-6 rounded-2xl shadow-sm mb-4">
                                        <FileText className="h-12 w-12 text-[#0d9488]" />
                                    </div>
                                    <h4 className="text-slate-700 font-bold mb-1">Preview Dokumen Tersedia</h4>
                                    <p className="text-slate-400 text-sm max-w-xs">
                                        Klik tombol "Tampilkan Preview" di atas untuk membaca dokumen langsung di sini.
                                    </p>
                                </div>
                            )}

                            <div className="p-6 bg-white">
                                <div className="flex items-center gap-3">
                                    <div className="bg-[#0d9488]/10 p-2 rounded">
                                        <FileText className="h-5 w-5 text-[#0d9488]" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-700">{document.file_path?.split('/').pop() || 'dokumen.pdf'}</p>
                                        <p className="text-xs text-slate-400 uppercase tracking-wider">Original Scan • PDF File</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. Metadata Lengkap Section */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
                                <h3 className="text-slate-700 font-bold text-sm flex items-center gap-2">
                                    <BookOpen className="h-4 w-4 text-[#0d9488]" />
                                    Metadata Lengkap
                                </h3>
                            </div>
                            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                                {detailFields.map((field, idx) => (
                                    <div key={idx} className="space-y-1.5 border-l-2 border-slate-100 pl-4 hover:border-[#0d9488] transition-colors">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{field.label}</p>
                                        <p className="text-sm font-semibold text-slate-700">{field.value || '-'}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Judicial Review Section */}
                        {(document.judicial_review || document.result_judicial_review) && (
                            <div className="bg-amber-50 rounded-xl shadow-sm border border-amber-100 overflow-hidden">
                                <div className="bg-amber-100 px-6 py-4">
                                    <h3 className="text-amber-800 font-bold text-sm flex items-center gap-2">
                                        <Scale className="h-4 w-4" />
                                        Judicial Review / Uji Materi
                                    </h3>
                                </div>
                                <div className="p-6 space-y-4">
                                    {document.judicial_review && (
                                        <div>
                                            <p className="text-xs font-bold text-amber-600 uppercase mb-1 tracking-widest">Status Review</p>
                                            <p className="text-sm text-slate-700 font-medium leading-relaxed">{document.judicial_review}</p>
                                        </div>
                                    )}
                                    {document.result_judicial_review && (
                                        <div>
                                            <p className="text-xs font-bold text-amber-600 uppercase mb-1 tracking-widest">Hasil Review</p>
                                            <p className="text-sm text-slate-700 font-medium leading-relaxed">{document.result_judicial_review}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                    </div>

                    {/* RIGHT COLUMN (Narrow 1/3) */}
                    <div className="space-y-6">
                        
                        {/* 1. Informasi Dokumen Sidebar Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                            <div className="bg-[#1e293b] px-6 py-4">
                                <h3 className="text-white font-bold text-sm flex items-center gap-2">
                                    <Info className="h-4 w-4 text-[#0d9488]" />
                                    Informasi Dokumen
                                </h3>
                            </div>
                            <div className="p-0">
                                <table className="w-full text-sm">
                                    <tbody>
                                        {sidebarFields.map((field, idx) => (
                                            <tr key={idx} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                                                <td className="px-6 py-4 font-medium text-slate-400 w-1/3">{field.label}</td>
                                                <td className="px-6 py-4 font-bold text-slate-700 text-right">{field.value || '-'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* 2. Statistik Dokumen Sidebar Card */}
                        <div className="bg-slate-50 rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="bg-slate-100 px-6 py-4 border-b border-slate-200">
                                <h3 className="text-slate-700 font-bold text-sm flex items-center gap-2">
                                    <BarChart3 className="h-4 w-4 text-[#0d9488]" />
                                    Statistik Dokumen
                                </h3>
                            </div>
                            <div className="p-6 grid grid-cols-2 gap-4">
                                <div className="text-center">
                                    <p className="text-2xl font-black text-[#1e293b]">{document.view_count || 0}</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">Kali Diakses</p>
                                </div>
                                <div className="text-center border-l border-slate-200">
                                    <p className="text-2xl font-black text-[#0d9488]">{document.download_count || 0}</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">Kali Diunduh</p>
                                </div>
                            </div>
                        </div>

                        {/* Back Button */}
                        <Link href={`/${activeCategory.slug}`} 
                            className="flex items-center justify-center gap-2 w-full py-4 bg-slate-100 text-slate-600 font-bold text-sm rounded-xl hover:bg-slate-200 transition-colors">
                            <ChevronLeft className="h-4 w-4" />
                            Kembali ke Daftar
                        </Link>

                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
