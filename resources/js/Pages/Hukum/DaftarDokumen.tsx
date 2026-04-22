import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import SearchForm, { SearchValues } from '@/Components/SearchForm';
import { Eye, Download, ChevronLeft, ChevronRight, FileText, Calendar, Tag, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

interface Document {
    id: number;
    number: string;
    nomor: string;
    title: string;
    year: string;
    date: string;
    status: string;
}

interface PaginationLinks {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedDocuments {
    data: Document[];
    links: PaginationLinks[];
    current_page: number;
    last_page: number;
    total: number;
    from: number;
    to: number;
}

interface Props {
    kategori: string;
    title: string;
    code: string;
    documents: PaginatedDocuments;
    filters?: any;
}

export default function DaftarDokumen({ kategori, title, code, documents, filters: initialFilters }: Props) {
    const [filters, setFilters] = useState<SearchValues>({
        namaDokumen: initialFilters?.namaDokumen || '',
        jenisDokumen: title,
        nomor: initialFilters?.nomor || '',
        tahun: initialFilters?.tahun || '',
        status: initialFilters?.status || '',
    });

    function handleSearch(values: SearchValues) {
        setFilters(values);
        router.get(`/${kategori}`, values as any, {
            preserveState: true,
            replace: true,
        });
    }

    const fmtDate = (d: string) => {
        return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    return (
        <PublicLayout variant="classic">
            <Head title={`${title} – JDIH Banjarnegara`} />
            
            <PageHeader
                title={title}
                subtitle={`Database Dokumentasi ${title} Kabupaten Banjarnegara`}
                breadcrumbs={[
                    { label: 'Beranda', href: '/' },
                    { label: 'Katalog', href: '/katalog' },
                    { label: title }
                ]}
            />

            <section className="py-12 bg-[#f8fafc] min-h-screen">
                <div className="max-w-7xl mx-auto px-6">
                    
                    {/* Search Section */}
                    <div className="bg-white border border-slate-200 shadow-sm mb-8">
                        <div className="p-6">
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                <span className="h-1 w-4 bg-[#0d9488] rounded-full" /> Filter Pencarian
                            </h3>
                            <SearchForm
                                mode="compact"
                                initialValues={filters}
                                onSearch={handleSearch}
                                hideJenis={true}
                                jenisDokumenDefault={title}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        
                        {/* Main List */}
                        <div className="flex-1">
                            {/* Counter & Info */}
                            <div className="flex items-center justify-between mb-6 px-2">
                                <div className="text-xs text-slate-500 font-medium">
                                    Menampilkan <span className="text-slate-900 font-bold">{documents.from ?? 0} - {documents.to ?? 0}</span> dari <span className="text-[#0d9488] font-bold">{documents.total}</span> dokumen
                                </div>
                                <div className="hidden md:flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    <Tag className="h-3 w-3" /> {code} Database
                                </div>
                            </div>

                            {/* Documents Loop */}
                            <div className="space-y-4">
                                {documents.data.map((doc) => (
                                    <div 
                                        key={doc.id}
                                        className="bg-white border border-slate-200 hover:border-[#0d9488] hover:shadow-xl hover:shadow-[#0d9488]/5 transition-all group overflow-hidden"
                                    >
                                        <div className="flex flex-col md:flex-row">
                                            {/* Status Accent */}
                                            <div className={`w-full md:w-1.5 shrink-0 ${
                                                doc.status === 'Berlaku' ? 'bg-emerald-500' : 'bg-rose-500'
                                            }`} />
                                            
                                            <div className="flex-1 p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-6">
                                                {/* Icon / Info */}
                                                <div className="hidden md:flex h-14 w-14 bg-slate-50 rounded-lg items-center justify-center shrink-0 border border-slate-100 group-hover:bg-[#0d9488]/5 transition-colors">
                                                    <FileText className="h-6 w-6 text-slate-300 group-hover:text-[#0d9488]" />
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex flex-wrap items-center gap-3 mb-2">
                                                        <span className="bg-[#0d9488] text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest">
                                                            {code}
                                                        </span>
                                                        <span className={`flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded border ${
                                                            doc.status === 'Berlaku' 
                                                                ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                                                                : 'bg-rose-50 text-rose-700 border-rose-100'
                                                        }`}>
                                                            {doc.status === 'Berlaku' ? <CheckCircle2 className="h-2.5 w-2.5" /> : <XCircle className="h-2.5 w-2.5" />}
                                                            {doc.status.toUpperCase()}
                                                        </span>
                                                        <span className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold">
                                                            <Calendar className="h-3 w-3" /> {fmtDate(doc.date)}
                                                        </span>
                                                    </div>
                                                    <Link 
                                                        href={`/${kategori}/${doc.id}`}
                                                        className="block text-sm md:text-base font-bold text-slate-900 group-hover:text-[#0d9488] transition-colors leading-relaxed line-clamp-2"
                                                    >
                                                        {doc.title}
                                                    </Link>
                                                    <div className="mt-2 text-[10px] text-slate-400 font-bold uppercase tracking-[0.1em]">
                                                        Nomor {doc.number} Tahun {doc.year}
                                                    </div>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex items-center gap-2 shrink-0 md:pl-4">
                                                    <Link
                                                        href={`/${kategori}/${doc.id}`}
                                                        className="flex items-center gap-2 px-4 py-2.5 bg-[#1e293b] text-white text-[10px] font-black uppercase tracking-widest rounded hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-900/10"
                                                    >
                                                        <Eye className="h-3.5 w-3.5" /> DETAIL
                                                    </Link>
                                                    <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded hover:border-[#0d9488] hover:text-[#0d9488] transition-all">
                                                        <Download className="h-3.5 w-3.5" /> PDF
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {documents.data.length === 0 && (
                                    <div className="bg-white border border-slate-200 p-20 text-center flex flex-col items-center justify-center gap-4">
                                        <AlertCircle className="h-12 w-12 text-slate-200" />
                                        <div className="space-y-1">
                                            <p className="text-sm font-bold text-slate-800 uppercase tracking-widest">Tidak ada dokumen ditemukan</p>
                                            <p className="text-xs text-slate-400">Silakan coba kata kunci atau filter yang berbeda.</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Pagination */}
                            {documents.last_page > 1 && (
                                <div className="mt-12 flex items-center justify-center gap-2">
                                    {documents.links.map((link, i) => {
                                        const isPrev = link.label.includes('Previous');
                                        const isNext = link.label.includes('Next');
                                        
                                        if (isPrev) return (
                                            <Link 
                                                key={i} 
                                                href={link.url || '#'} 
                                                className={`h-10 w-10 flex items-center justify-center border border-slate-200 rounded transition-all ${!link.url ? 'opacity-30 cursor-not-allowed' : 'hover:border-[#0d9488] hover:text-[#0d9488]'}`}
                                            >
                                                <ChevronLeft className="h-4 w-4" />
                                            </Link>
                                        );
                                        
                                        if (isNext) return (
                                            <Link 
                                                key={i} 
                                                href={link.url || '#'} 
                                                className={`h-10 w-10 flex items-center justify-center border border-slate-200 rounded transition-all ${!link.url ? 'opacity-30 cursor-not-allowed' : 'hover:border-[#0d9488] hover:text-[#0d9488]'}`}
                                            >
                                                <ChevronRight className="h-4 w-4" />
                                            </Link>
                                        );

                                        // Only show nearby pages or special logic if needed, here we show all for simplicity
                                        return (
                                            <Link
                                                key={i}
                                                href={link.url || '#'}
                                                className={`h-10 px-4 flex items-center justify-center border text-xs font-bold transition-all rounded
                                                    ${link.active 
                                                        ? 'bg-[#0d9488] border-[#0d9488] text-white shadow-lg shadow-teal-900/20' 
                                                        : 'bg-white border-slate-200 text-slate-500 hover:border-[#0d9488] hover:text-[#0d9488]'}`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
