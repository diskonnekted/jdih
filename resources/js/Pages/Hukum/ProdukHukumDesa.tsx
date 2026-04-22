import React, { useState, useEffect } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import { Head, Link } from '@inertiajs/react';
import { 
    Search, Filter, ChevronRight, FileText, Download, 
    ArrowRight, Building2, MapPin, Loader2, AlertCircle,
    Gavel, Stamp, Book, ClipboardList, Info, Calendar,
    Scale, Shield, CheckCircle2, Eye, X
} from 'lucide-react';
import axios from 'axios';

interface Category {
    id: string;
    nama: string;
}

interface LegalProduct {
    id: string;
    attributes: {
        nama: string;
        tahun: string;
        satuan: string; 
        kategori: string;
        tgl_upload: string;
        url_file: string;
    };
}

interface Village {
    name: string;
    url: string;
}

interface KecamatanGroup {
    kecamatan: string;
    desa: Village[];
}

interface Props {
    villagesMapping: KecamatanGroup[];
}

export default function ProdukHukumDesa({ villagesMapping }: Props) {
    const initialKec = villagesMapping.length > 0 ? villagesMapping[0].kecamatan : '';
    const initialDesa = (villagesMapping.length > 0 && villagesMapping[0].desa.length > 0) ? villagesMapping[0].desa[0] : { name: '', url: '' };

    const [selectedKec, setSelectedKec] = useState(initialKec);
    const [selectedDesa, setSelectedDesa] = useState(initialDesa);
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<LegalProduct[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    // Filters
    const [search, setSearch] = useState('');
    const [activeCat, setActiveCat] = useState('');
    const [year, setYear] = useState('');

    useEffect(() => {
        if (selectedDesa.name && selectedDesa.url) {
            fetchInitialData();
        }
    }, [selectedDesa.name, selectedDesa.url]);

    const fetchInitialData = async () => {
        setLoading(true);
        setError(null);
        try {
            const catRes = await axios.get('/api/produk-hukum-desa', {
                params: {
                    url: selectedDesa.url,
                    endpoint: '/internal_api/produk-hukum/kategori'
                }
            });
            setCategories(catRes.data?.data || []);
            fetchProducts();
        } catch (err) {
            console.error('Error fetching initial data:', err);
            setError('Gagal menghubungkan ke website desa. Masalah teknis pada server desa tujuan.');
        } finally {
            setLoading(false);
        }
    };

    const fetchProducts = async () => {
        if (!selectedDesa.url) return;
        setLoading(true);
        try {
            const params: any = {
                url: selectedDesa.url,
                endpoint: '/internal_api/produk-hukum',
                'sort': '-tahun',
                'page[size]': 50
            };

            if (activeCat) params['filter[kategori]'] = activeCat;
            if (search) params['filter[search]'] = search;
            if (year) params['filter[tahun]'] = year;

            const res = await axios.get('/api/produk-hukum-desa', { params });
            setProducts(res.data?.data || []);
        } catch (err) {
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    };

    const fmtDate = (d: string) => {
        if (!d) return '-';
        return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    return (
        <PublicLayout variant="classic">
            <Head title="Produk Hukum Desa – JDIH Banjarnegara" />
            
            <PageHeader 
                title="Produk Hukum Desa" 
                breadcrumbs={[
                    { label: 'Hukum', href: '#' },
                    { label: 'Produk Hukum Desa' }
                ]}
            />

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    
                    {/* SIDEBAR SELECTORS */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                            <div className="bg-[#1e293b] px-5 py-4 flex items-center gap-2">
                                <Building2 className="h-4 w-4 text-[#0d9488]" />
                                <h3 className="text-white font-bold text-sm uppercase tracking-wider">Wilayah Desa</h3>
                            </div>
                            <div className="p-6 space-y-5">
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Pilih Kecamatan</label>
                                    <select 
                                        value={selectedKec}
                                        onChange={(e) => {
                                            const newKec = e.target.value;
                                            setSelectedKec(newKec);
                                            const firstDesa = villagesMapping.find(g => g.kecamatan === newKec)?.desa[0];
                                            if (firstDesa) setSelectedDesa(firstDesa);
                                        }}
                                        className="w-full bg-slate-50 border-slate-200 rounded-lg text-sm focus:ring-[#0d9488] focus:border-[#0d9488] font-semibold text-slate-700"
                                    >
                                        {villagesMapping.map(group => (
                                            <option key={group.kecamatan} value={group.kecamatan}>{group.kecamatan}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Pilih Desa</label>
                                    <div className="space-y-1 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                        {villagesMapping.find(g => g.kecamatan === selectedKec)?.desa.map(desa => (
                                            <button
                                                key={desa.name}
                                                onClick={() => setSelectedDesa(desa)}
                                                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center justify-between group ${
                                                    selectedDesa.name === desa.name 
                                                    ? 'bg-[#0d9488] text-white shadow-lg shadow-[#0d9488]/20' 
                                                    : 'text-slate-600 hover:bg-slate-100'
                                                }`}
                                            >
                                                <span>{desa.name}</span>
                                                <ChevronRight className={`h-4 w-4 transition-transform ${selectedDesa.name === desa.name ? 'translate-x-1' : 'opacity-0 group-hover:opacity-100'}`} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* HELP CARD */}
                        <div className="bg-[#0d9488]/5 rounded-xl border border-[#0d9488]/10 p-6">
                            <div className="flex items-start gap-3">
                                <Info className="h-5 w-5 text-[#0d9488] shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="text-[#0d9488] font-bold text-sm mb-2">Integrasi OpenSID</h4>
                                    <p className="text-slate-500 text-xs leading-relaxed">
                                        Data ini disinkronkan secara langsung dari website resmi masing-masing desa melalui API OpenSID.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* MAIN CONTENT AREA */}
                    <div className="lg:col-span-3 space-y-6">
                        
                        {/* SEARCH & FILTER BAR */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <input 
                                        type="text" 
                                        placeholder="Cari dokumen desa..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border-slate-200 rounded-xl text-sm focus:ring-[#0d9488] focus:border-[#0d9488] font-medium"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <select 
                                        value={activeCat}
                                        onChange={(e) => setActiveCat(e.target.value)}
                                        className="bg-slate-50 border-slate-200 rounded-xl text-sm focus:ring-[#0d9488] focus:border-[#0d9488] font-bold text-slate-600 px-4"
                                    >
                                        <option value="">Semua Kategori</option>
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.nama}>{cat.nama}</option>
                                        ))}
                                    </select>
                                    <button 
                                        onClick={fetchProducts}
                                        className="bg-[#1e293b] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-black transition-all flex items-center gap-2"
                                    >
                                        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Filter className="h-4 w-4" />}
                                        Filter
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* DATA LISTING (REFACTORED TO LIST STYLE) */}
                        {loading && products.length === 0 ? (
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-20 flex flex-col items-center text-center">
                                <Loader2 className="h-10 w-10 text-[#0d9488] animate-spin mb-4" />
                                <h3 className="text-slate-900 font-bold mb-1">Menghubungkan ke Server Desa...</h3>
                                <p className="text-slate-400 text-sm">Mohon tunggu sebentar, kami sedang mengambil data terbaru.</p>
                            </div>
                        ) : error ? (
                            <div className="bg-rose-50 rounded-2xl border border-rose-100 p-12 flex flex-col items-center text-center">
                                <div className="bg-rose-100 p-4 rounded-full mb-4">
                                    <AlertCircle className="h-8 w-8 text-rose-600" />
                                </div>
                                <h3 className="text-rose-900 font-bold mb-1">Koneksi Gagal</h3>
                                <p className="text-rose-600/70 text-sm max-w-md mb-6">{error}</p>
                                <button 
                                    onClick={fetchInitialData}
                                    className="px-6 py-2 bg-rose-600 text-white rounded-lg font-bold text-sm hover:bg-rose-700 transition-colors"
                                >
                                    Coba Hubungkan Kembali
                                </button>
                            </div>
                        ) : products.length === 0 ? (
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-20 flex flex-col items-center text-center">
                                <div className="bg-slate-50 p-6 rounded-full mb-4">
                                    <Book className="h-10 w-10 text-slate-200" />
                                </div>
                                <h3 className="text-slate-900 font-bold mb-1">Tidak Ada Data</h3>
                                <p className="text-slate-400 text-sm max-w-xs">Belum ada dokumen yang dipublikasikan oleh Desa {selectedDesa.name}.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {products.map((product) => (
                                    <div 
                                        key={product.id}
                                        className="bg-white border border-slate-200 hover:border-[#0d9488] hover:shadow-xl hover:shadow-[#0d9488]/5 transition-all group overflow-hidden"
                                    >
                                        <div className="flex flex-col md:flex-row">
                                            {/* Status Accent */}
                                            <div className="w-full md:w-1.5 shrink-0 bg-emerald-500" />
                                            
                                            <div className="flex-1 p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-6">
                                                {/* Icon / Info */}
                                                <div className="hidden md:flex h-14 w-14 bg-slate-50 rounded-lg items-center justify-center shrink-0 border border-slate-100 group-hover:bg-[#0d9488]/5 transition-colors">
                                                    <FileText className="h-6 w-6 text-slate-300 group-hover:text-[#0d9488]" />
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex flex-wrap items-center gap-3 mb-2">
                                                        <span className="bg-[#0d9488] text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest">
                                                            {product.attributes.kategori || 'DESA'}
                                                        </span>
                                                        <span className="flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded border bg-emerald-50 text-emerald-700 border-emerald-100 uppercase">
                                                            <CheckCircle2 className="h-2.5 w-2.5" /> BERLAKU
                                                        </span>
                                                        <span className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold">
                                                            <Calendar className="h-3 w-3" /> {fmtDate(product.attributes.tgl_upload)}
                                                        </span>
                                                    </div>
                                                    <div className="block text-sm md:text-base font-bold text-slate-900 group-hover:text-[#0d9488] transition-colors leading-relaxed line-clamp-2">
                                                        {product.attributes.nama}
                                                    </div>
                                                    <div className="mt-2 text-[10px] text-slate-400 font-bold uppercase tracking-[0.1em] flex items-center gap-2">
                                                        <span>Desa {selectedDesa.name}</span>
                                                        <span className="opacity-30">•</span>
                                                        <span>Tahun {product.attributes.tahun}</span>
                                                    </div>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex items-center gap-2 shrink-0 md:pl-4">
                                                    {product.attributes.url_file && (
                                                        <>
                                                            <a
                                                                href={product.attributes.url_file}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="h-10 w-10 flex items-center justify-center rounded-lg bg-[#1e293b] text-white hover:bg-black transition-colors"
                                                                title="Lihat Dokumen"
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                            </a>
                                                            <a
                                                                href={product.attributes.url_file}
                                                                download
                                                                className="h-10 px-4 flex items-center justify-center gap-2 rounded-lg bg-slate-100 text-slate-600 font-bold text-xs hover:bg-slate-200 transition-colors"
                                                            >
                                                                <Download className="h-4 w-4" />
                                                                Unduh
                                                            </a>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
