import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import { Image, X } from 'lucide-react';

export default function Galeri({ items = [] }: { items?: any[] }) {
    const [selected, setSelected] = useState<any | null>(null);
    const [filterTahun, setFilterTahun] = useState('');

    const displayItems = items.map(item => ({
        ...item,
        tahun: item.date ? new Date(item.date).getFullYear() : 'Lainnya'
    }));

    const years = [...new Set(displayItems.map(g => g.tahun))].sort((a, b) => {
        if (a === 'Lainnya') return 1;
        if (b === 'Lainnya') return -1;
        return Number(b) - Number(a);
    });

    const filtered = filterTahun ? displayItems.filter(g => String(g.tahun) === filterTahun) : displayItems;

    return (
        <PublicLayout>
            <Head title="Galeri – JDIH Banjarnegara" />
            <PageHeader
                title="Galeri"
                subtitle="Dokumentasi kegiatan Bagian Hukum Sekretariat Daerah Kabupaten Banjarnegara"
                breadcrumbs={[{ label: 'Informasi' }, { label: 'Galeri' }]}
            />
            <section className="py-10 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Filter */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        <button onClick={() => setFilterTahun('')}
                            className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${!filterTahun ? 'bg-[#0d9488] text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-[#0d9488] hover:text-[#0d9488]'}`}>
                            Semua
                        </button>
                        {years.map(y => (
                            <button key={y} onClick={() => setFilterTahun(String(y))}
                                className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${filterTahun === String(y) ? 'bg-[#0d9488] text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-[#0d9488] hover:text-[#0d9488]'}`}>
                                {y}
                            </button>
                        ))}
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filtered.length > 0 ? filtered.map((item, i) => (
                            <button key={item.id} onClick={() => setSelected(item)}
                                className="group relative aspect-square rounded-lg overflow-hidden border border-slate-200 hover:border-[#0d9488] hover:shadow-md transition-all text-left">
                                <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
                                    <img 
                                        src={item.image} 
                                        alt={item.title} 
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all flex items-end">
                                    <div className="p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                        <p className="text-xs font-semibold leading-snug line-clamp-2">{item.title}</p>
                                        <p className="text-[10px] text-[#0d9488] mt-1">{item.tahun}</p>
                                    </div>
                                </div>
                            </button>
                        )) : (
                            <div className="col-span-full py-20 text-center text-slate-400">
                                Belum ada dokumentasi foto untuk tahun ini.
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            {selected && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
                    <div className="bg-white rounded-xl max-w-4xl w-full overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
                        <div className="relative bg-slate-900 min-h-[300px] flex items-center justify-center">
                            <img 
                                src={selected.image} 
                                alt={selected.title} 
                                className="max-w-full max-h-[70vh] object-contain"
                            />
                            <button onClick={() => setSelected(null)}
                                className="absolute top-4 right-4 h-10 w-10 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-colors">
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="p-6 bg-white">
                            <h3 className="text-lg font-bold text-[#1e293b]">{selected.title}</h3>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs font-bold px-2 py-1 bg-teal-50 text-[#0d9488] rounded">
                                    {selected.tahun}
                                </span>
                                {selected.date && (
                                    <span className="text-xs text-slate-400">
                                        Diunggah pada {new Date(selected.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </PublicLayout>
    );
}
