import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import { MessageSquare, Calendar, FileText, ChevronRight, Search, Inbox } from 'lucide-react';

function fmtDate(d: any) {
    if (!d) return '-';
    try {
        return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch (e) {
        return '-';
    }
}

export default function Index({ dialogues }: { dialogues: any[] }) {
    const [search, setSearch] = useState('');

    const filteredDialogues = dialogues.filter(d => 
        d.title.toLowerCase().includes(search.toLowerCase()) || 
        (d.description && d.description.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <PublicLayout>
            <Head title="Dialog Publik – JDIH Banjarnegara" />
            <PageHeader
                title="Dialog Publik"
                subtitle="Saluran aspirasi masyarakat terhadap rancangan peraturan daerah/bupati"
                breadcrumbs={[{ label: 'Layanan Hukum' }, { label: 'Dialog Publik' }]}
            />

            <section className="py-12 px-6 bg-slate-50 min-h-screen">
                <div className="max-w-6xl mx-auto">
                    {/* Intro Card */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 mb-10">
                        <div className="flex flex-col md:flex-row gap-6 items-center">
                            <div className="h-20 w-20 bg-[#0d9488]/10 rounded-2xl flex items-center justify-center shrink-0">
                                <MessageSquare className="h-10 w-10 text-[#0d9488]" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-[#1e293b] mb-2">Suara Anda Membangun Banjarnegara</h2>
                                <p className="text-slate-600 leading-relaxed">
                                    Sampaikan aspirasi, saran, dan masukan Anda terhadap berbagai rancangan produk hukum (Draft) 
                                    sebelum ditetapkan menjadi produk hukum daerah yang sah. Partisipasi Anda sangat berarti bagi kualitas regulasi kita.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Search & Stats */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                        <div className="relative w-full md:max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input 
                                type="text" 
                                placeholder="Cari topik dialog..." 
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#0d9488]/20 focus:border-[#0d9488] transition-all" 
                            />
                        </div>
                        <div className="text-sm text-slate-500 font-medium">
                            Menampilkan <span className="text-[#1e293b]">{filteredDialogues.length}</span> Topik Aktif
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredDialogues.map((item) => (
                                <Link 
                                    key={item.id} 
                                    href={`/dialog-publik/${item.slug}`}
                                    className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-[#0d9488] hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                                >
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <FileText className="h-16 w-16 text-[#0d9488]" />
                                </div>
                                
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full text-white bg-[#0d9488]">
                                        {item.document_type || 'RANCANGAN'}
                                    </span>
                                    <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                                        <Calendar className="h-3 w-3" />
                                        {item.year || new Date().getFullYear()}
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold text-[#1e293b] mb-3 group-hover:text-[#0d9488] transition-colors leading-tight">
                                    {item.title}
                                </h3>
                                
                                <p className="text-sm text-slate-500 line-clamp-2 mb-5">
                                    {item.description || 'Klik untuk melihat draf dokumen dan memberikan aspirasi Anda.'}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                    <span className="text-xs font-bold text-[#0d9488] flex items-center gap-1 uppercase tracking-wider">
                                        Ikuti Dialog <ChevronRight className="h-3 w-3" />
                                    </span>
                                    <div className="flex items-center gap-3 text-slate-400">
                                        <div className="flex items-center gap-1 text-[11px]">
                                            <Search className="h-3 w-3" /> {item.view_count}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {filteredDialogues.length === 0 && (
                        <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                            <Inbox className="h-20 w-20 mx-auto mb-6 text-slate-200" />
                            <h3 className="text-xl font-bold text-slate-400 mb-2">Tidak ada topik yang ditemukan</h3>
                            <p className="text-slate-400">Silakan coba kata kunci lain atau cek kembali nanti.</p>
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
