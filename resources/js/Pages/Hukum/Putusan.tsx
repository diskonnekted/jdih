import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import SearchForm, { SearchValues } from '@/Components/SearchForm';
import { 
    ChevronRight, 
    Calendar, 
    AlertCircle, 
    ChevronLeft, 
    Filter,
    Gavel
} from 'lucide-react';

interface Document {
    id: number;
    nomor: string;
    jenis: string;
    tanggal: string;
    abstrak: string;
    title: string;
    year: number;
    court_type: string;
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
}

interface Props {
    documents: PaginatedDocuments;
    filters?: any;
}

export default function Putusan({ documents, filters: initialFilters }: Props) {
    const [filters, setFilters] = useState<SearchValues>({
        namaDokumen: initialFilters?.namaDokumen || '',
        jenisDokumen: 'Putusan',
        nomor: initialFilters?.nomor || '',
        tahun: initialFilters?.tahun || '',
        status: initialFilters?.status || '',
    });

    function handleSearch(values: SearchValues) {
        setFilters(values);
        router.get('/putusan', values, {
            preserveState: true,
            replace: true,
        });
    }

    return (
        <PublicLayout>
            <Head title="Putusan Pengadilan - JDIH Banjarnegara" />
            
            <PageHeader
                title="Putusan"
                subtitle="Daftar putusan pengadilan yang berkaitan dengan hukum daerah Kabupaten Banjarnegara"
                breadcrumbs={[
                    { label: 'Beranda', href: '/' },
                    { label: 'Putusan' }
                ]}
            />

            <div className="bg-slate-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-6 py-10">
                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                        
                        {/* Sidebar Filter - Fixed width on LG */}
                        <div className="w-full lg:w-1/4 space-y-6 lg:sticky lg:top-24">
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <Filter className="h-4 w-4 text-[#0d9488]" /> Filter Putusan
                                </h3>
                                <SearchForm
                                    mode="compact"
                                    initialValues={filters}
                                    onSearch={handleSearch}
                                    hideJenis={true}
                                    jenisDokumenDefault="Putusan"
                                />
                            </div>
                        </div>

                        {/* Main Content: Document List - Flexible width */}
                        <div className="w-full lg:w-3/4 space-y-6">
                            {/* Stats */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="px-4 py-1.5 bg-slate-200 text-slate-600 text-xs font-bold rounded-full">
                                        {documents.total.toLocaleString('id-ID')} putusan ditemukan
                                    </span>
                                </div>
                            </div>

                            {/* Documents Cards */}
                            <div className="space-y-4">
                                {documents.data.map((doc) => (
                                    <Link 
                                        key={doc.id}
                                        href={`/putusan/${doc.id}`}
                                        className="block bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-teal-900/5 hover:border-[#0d9488]/30 transition-all group overflow-hidden"
                                    >
                                        <div className="p-6 flex items-center justify-between gap-6">
                                            <div className="flex-1 min-w-0 space-y-3">
                                                <div className="flex items-center gap-3">
                                                    <h3 className="text-base md:text-lg font-black text-slate-800 group-hover:text-[#0d9488] transition-colors leading-snug">
                                                        Putusan Nomor {doc.nomor}
                                                    </h3>
                                                    <span className="shrink-0 px-2.5 py-0.5 bg-blue-50 text-blue-500 text-[10px] font-black rounded uppercase">
                                                        {doc.court_type || 'Putusan'}
                                                    </span>
                                                </div>
                                                <p className="text-slate-500 text-sm font-medium leading-relaxed line-clamp-2">
                                                    {doc.title}
                                                </p>
                                                <div className="flex items-center gap-4 pt-2">
                                                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black border bg-emerald-50 text-emerald-600 border-emerald-100">
                                                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                        {doc.status ? doc.status.toUpperCase() : 'INKRACHT'}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-bold">
                                                        <Calendar className="h-3.5 w-3.5" />
                                                        Tahun {doc.year}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="shrink-0">
                                                <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#0d9488]/10 transition-colors">
                                                    <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-[#0d9488]" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}

                                {documents.data.length === 0 && (
                                    <div className="bg-white rounded-3xl border border-slate-200 p-20 text-center flex flex-col items-center justify-center gap-4">
                                        <div className="bg-slate-50 p-6 rounded-full mb-2">
                                            <AlertCircle className="h-12 w-12 text-slate-200" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-lg font-black text-slate-800">Tidak ada putusan ditemukan</p>
                                            <p className="text-sm text-slate-400 font-medium">Silakan coba kata kunci atau filter yang berbeda.</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Pagination */}
                            {documents.last_page > 1 && (
                                <div className="mt-12 flex items-center justify-center gap-3">
                                    {documents.links.map((link, i) => {
                                        const isPrev = link.label.includes('Previous');
                                        const isNext = link.label.includes('Next');
                                        
                                        if (isPrev) {
                                            return link.url ? (
                                                <Link 
                                                    key={i} 
                                                    href={link.url} 
                                                    className="h-12 w-12 flex items-center justify-center bg-white border border-slate-200 rounded-xl transition-all hover:border-[#0d9488] hover:text-[#0d9488] shadow-sm"
                                                >
                                                    <ChevronLeft className="h-5 w-5" />
                                                </Link>
                                            ) : (
                                                <div 
                                                    key={i} 
                                                    className="h-12 w-12 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-xl opacity-30 cursor-not-allowed"
                                                >
                                                    <ChevronLeft className="h-5 w-5 text-slate-300" />
                                                </div>
                                            );
                                        }
                                        
                                        if (isNext) {
                                            return link.url ? (
                                                <Link 
                                                    key={i} 
                                                    href={link.url} 
                                                    className="h-12 w-12 flex items-center justify-center bg-white border border-slate-200 rounded-xl transition-all hover:border-[#0d9488] hover:text-[#0d9488] shadow-sm"
                                                >
                                                    <ChevronRight className="h-5 w-5" />
                                                </Link>
                                            ) : (
                                                <div 
                                                    key={i} 
                                                    className="h-12 w-12 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-xl opacity-30 cursor-not-allowed"
                                                >
                                                    <ChevronRight className="h-5 w-5 text-slate-300" />
                                                </div>
                                            );
                                        }

                                        return link.url ? (
                                            <Link
                                                key={i}
                                                href={link.url}
                                                className={`h-12 px-5 flex items-center justify-center text-sm font-black transition-all rounded-xl border
                                                    ${link.active 
                                                        ? 'bg-[#0d9488] border-[#0d9488] text-white shadow-lg shadow-teal-900/20' 
                                                        : 'bg-white border-slate-200 text-slate-500 hover:border-[#0d9488] hover:text-[#0d9488] shadow-sm'}`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ) : (
                                            <div
                                                key={i}
                                                className="h-12 px-5 flex items-center justify-center text-sm font-black rounded-xl border border-slate-100 text-slate-300 opacity-50 cursor-not-allowed bg-slate-50"
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
