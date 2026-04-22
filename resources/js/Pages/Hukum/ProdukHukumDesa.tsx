import React, { useState, useEffect } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    Search, Filter, ChevronRight, FileText, Download, 
    ArrowRight, Building2, MapPin, Loader2, AlertCircle 
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
        satuan: string; // This is the download link
        kategori: string;
        tgl_upload: string;
    };
}

const VILLAGES = [
    { 
        kecamatan: 'Banjarmangu', 
        desa: [
            { name: 'Sijenggung', url: 'https://sijenggung-banjarnegara.desa.id' }
        ] 
    }
];

export default function ProdukHukumDesa() {
    const [selectedKec, setSelectedKec] = useState(VILLAGES[0].kecamatan);
    const [selectedDesa, setSelectedDesa] = useState(VILLAGES[0].desa[0]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<LegalProduct[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    // Filters
    const [search, setSearch] = useState('');
    const [activeCat, setActiveCat] = useState('');
    const [year, setYear] = useState('');

    const currentDesaDescr = `Kecamatan ${selectedKec}, Desa ${selectedDesa.name}`;

    useEffect(() => {
        fetchInitialData();
    }, [selectedDesa]);

    const fetchInitialData = async () => {
        setLoading(true);
        setError(null);
        try {
            // Fetch categories
            const catRes = await axios.get('/api/produk-hukum-desa', {
                params: {
                    url: selectedDesa.url,
                    endpoint: '/internal_api/produk-hukum/kategori'
                }
            });
            setCategories(catRes.data?.data || []);

            // Fetch products
            fetchProducts();
        } catch (err) {
            console.error('Error fetching initial data:', err);
            setError('Gagal menghubungkan ke website desa. Pastikan website desa sedang aktif.');
        } finally {
            setLoading(false);
        }
    };

    const fetchProducts = async () => {
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
            setError('Terjadi kesalahan saat mengambil produk hukum.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetchProducts();
    };

    return (
        <PublicLayout variant="modern">
            <Head title="Produk Hukum Desa" />

            {/* Hero Section */}
            <div className="bg-[#003399] text-white py-16 px-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
                </div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex items-center gap-3 text-blue-200 mb-4 font-bold tracking-widest text-xs uppercase">
                        <Building2 className="h-4 w-4" />
                        <span>Eksperimen JDIH</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-4">Produk Hukum Desa</h1>
                    <p className="text-blue-100/80 max-w-2xl text-lg leading-relaxed">
                        Akses langsung dokumen regulasi desa melalui integrasi JDIH dengan Sistem Informasi Desa (OpenSID).
                    </p>
                </div>
            </div>

            {/* Filter Section */}
            <div className="max-w-7xl mx-auto px-6 -translate-y-10 relative z-20">
                <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {/* Kecamatan */}
                        <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Pilih Kecamatan</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <select 
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none"
                                    value={selectedKec}
                                    onChange={(e) => setSelectedKec(e.target.value)}
                                >
                                    {VILLAGES.map(v => <option key={v.kecamatan} value={v.kecamatan}>{v.kecamatan}</option>)}
                                </select>
                            </div>
                        </div>

                        {/* Desa */}
                        <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Pilih Desa</label>
                            <div className="relative">
                                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <select 
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none"
                                    value={selectedDesa.name}
                                    onChange={(e) => {
                                        const desa = VILLAGES.find(v => v.kecamatan === selectedKec)?.desa.find(d => d.name === e.target.value);
                                        if (desa) setSelectedDesa(desa);
                                    }}
                                >
                                    {VILLAGES.find(v => v.kecamatan === selectedKec)?.desa.map(d => (
                                        <option key={d.name} value={d.name}>{d.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Kategori</label>
                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <select 
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none"
                                    value={activeCat}
                                    onChange={(e) => setActiveCat(e.target.value)}
                                >
                                    <option value="">Semua Kategori</option>
                                    {categories.map(c => <option key={c.id} value={c.id}>{c.nama}</option>)}
                                </select>
                            </div>
                        </div>

                        {/* Search */}
                        <form onSubmit={handleSearchSubmit}>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Cari Judul / Nomor</label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <input 
                                    type="text"
                                    placeholder="Masukkan kata kunci..."
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </form>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap gap-2">
                        <button 
                            onClick={fetchProducts}
                            className="px-6 py-2.5 bg-[#003399] text-white rounded-xl font-bold text-sm hover:bg-blue-800 transition-all flex items-center gap-2"
                        >
                            Terapkan Filter
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="mb-8">
                    <h2 className="text-2xl font-black text-[#1e293b] mb-2">Daftar Produk Hukum</h2>
                    <p className="text-slate-500 text-sm font-medium flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 text-blue-500" /> {currentDesaDescr}
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-100 rounded-2xl p-6 text-red-600 flex items-center gap-4 mb-8">
                        <AlertCircle className="h-6 w-6 shrink-0" />
                        <div>
                            <p className="font-bold">Terjadi Kendala</p>
                            <p className="text-sm opacity-80">{error}</p>
                        </div>
                    </div>
                )}

                {loading ? (
                    <div className="py-20 flex flex-col items-center justify-center gap-4 text-slate-400">
                        <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
                        <p className="font-bold text-sm tracking-widest uppercase">Memuat data dari website desa...</p>
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((item) => (
                            <div key={item.id} className="bg-white border border-slate-200 rounded-2xl p-6 group hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-900/5 transition-all flex flex-col">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-tighter">
                                        {item.attributes.kategori}
                                    </span>
                                    <span className="text-xs font-bold text-slate-400">{item.attributes.tahun}</span>
                                </div>
                                <h3 className="font-bold text-[#1e293b] line-clamp-3 mb-6 group-hover:text-blue-700 transition-colors flex-1 leading-snug">
                                    {item.attributes.nama}
                                </h3>
                                <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                                    <a 
                                        href={item.attributes.satuan} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-[#003399] font-bold text-xs hover:gap-3 transition-all"
                                    >
                                        Unduh Dokumen <Download className="h-3.5 w-3.5" />
                                    </a>
                                    <FileText className="h-4 w-4 text-slate-200 group-hover:text-blue-100 transition-colors" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 text-center px-10">
                        <FileText className="h-12 w-12 mb-4 opacity-20" />
                        <p className="font-bold text-lg text-slate-500">Tidak ada data ditemukan</p>
                        <p className="text-sm max-w-xs mt-2">Coba ubah filter atau pastikan desa tersebut sudah mengunggah produk hukum.</p>
                    </div>
                )}
            </div>

            {/* Footnote */}
            <div className="max-w-7xl mx-auto px-6 pb-20">
                <div className="bg-slate-900 rounded-3xl p-8 relative overflow-hidden">
                    <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-blue-600/20 to-transparent opacity-50" />
                    <div className="relative z-10 max-w-2xl">
                        <h3 className="text-xl font-bold text-white mb-2 underline decoration-blue-500 underline-offset-8">Tentang Fitur Eksperimental</h3>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            Fitur ini bekerja dengan menghubungkan basis data internal JDIH secara real-time ke web desa masing-masing. Keakuratan data sepenuhnya bergantung pada pembaruan yang dilakukan secara mandiri oleh pemerintah desa melalui sistem OpenSID.
                        </p>
                        <Link href="/katalog" className="inline-flex items-center gap-2 text-white font-bold text-sm bg-blue-600 px-6 py-3 rounded-xl hover:bg-blue-700 transition-all">
                            Cari di Database Pusat <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
