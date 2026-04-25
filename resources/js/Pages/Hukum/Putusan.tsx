import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import SearchForm, { SearchValues } from '@/Components/SearchForm';
import { Eye, Download, ChevronLeft, ChevronRight } from 'lucide-react';

interface Document {
    id: number;
    nomor: string;
    jenis: string;
    tanggal: string;
    abstrak: string;
}

interface Props {
    documents: {
        data: Document[];
        links: any[];
        current_page: number;
        last_page: number;
    };
}

function fmtDate(d: string) {
    return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function Putusan({ documents = { data: [], links: [], current_page: 1, last_page: 1 } }: Props) {
    const [filters, setFilters] = useState<SearchValues>({
        namaDokumen: '',
        jenisDokumen: 'Putusan',
        nomor: '',
        tahun: '',
        status: '',
    });

    function handleSearch(values: SearchValues) {
        setFilters(values);
        // In a real app, you'd use router.get with filters here
    }

    const paged = documents?.data || [];
    const totalPages = documents?.last_page || 1;

    return (
        <PublicLayout>
            <PageHeader
                title="Putusan"
                subtitle="Daftar putusan pengadilan yang berkaitan dengan hukum daerah Kabupaten Banjarnegara"
                breadcrumbs={[{ label: 'Putusan' }]}
            />
            <section className="py-10 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white border border-slate-200 rounded-lg p-4 mb-6 flex flex-col sm:flex-row gap-3">
                        <SearchForm
                            mode="compact"
                            initialValues={filters}
                            onSearch={handleSearch}
                            hideJenis={true}
                            jenisDokumenDefault="Putusan"
                        />
                    </div>

                    <div className="space-y-3">
                        {paged.map((p, idx) => (
                            <div key={p.id} className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-[#0d9488] hover:shadow-sm transition-all group">
                                <div className="hidden sm:flex h-9 w-9 bg-slate-100 rounded items-center justify-center text-slate-400 font-mono text-xs shrink-0">
                                    {String((documents.current_page - 1) * 10 + idx + 1).padStart(2, '0')}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                        <span className="text-xs font-bold px-2 py-0.5 rounded text-white bg-[#1e293b]">{p.jenis}</span>
                                        <span className="text-xs text-slate-400">{fmtDate(p.tanggal)}</span>
                                    </div>
                                    <p className="font-semibold text-[#1e293b] text-sm group-hover:text-[#0d9488] transition-colors">
                                        Putusan Nomor {p.nomor}
                                    </p>
                                    <p className="text-xs text-slate-500 mt-0.5">{p.abstrak}</p>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <Link href={`/putusan/${p.id}`} className="flex items-center gap-1.5 px-3 py-2 bg-[#1e293b] text-white text-xs font-bold rounded hover:bg-slate-700 transition-colors">
                                        <Eye className="h-3.5 w-3.5" /> Detail
                                    </Link>
                                </div>
                            </div>
                        ))}

                        {paged.length === 0 && (
                            <div className="bg-white border border-slate-100 rounded-xl p-20 text-center text-slate-400">
                                Belum ada data putusan yang tersedia.
                            </div>
                        )}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 mt-8">
                            {documents.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url || '#'}
                                    className={`h-9 px-3 flex items-center justify-center border rounded text-xs font-bold transition-all ${
                                        link.active 
                                        ? 'border-[#0d9488] bg-[#0d9488] text-white' 
                                        : 'border-slate-200 text-slate-500 hover:border-[#0d9488]'
                                    } ${!link.url ? 'opacity-30 cursor-not-allowed' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
