import React, { useState, useEffect } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import { Head, Link } from '@inertiajs/react';
import { 
    Search, Filter, ChevronRight, FileText, Download, 
    ArrowRight, Building2, MapPin, Loader2, AlertCircle,
    Gavel, Stamp, Book, ClipboardList, Info, Calendar,
    Scale, Shield
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
    }, [selectedDesa.name]);

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
            setError('Terjadi kesalahan saat memproses permintaan ke website desa.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetchProducts();
    };

    const getIcon = (category: string) => {
        const cat = category.toLowerCase();
        if (cat.includes('perdes') || cat.includes('peraturan')) return <Gavel className="h-5 w-5" />;
        if (cat.includes('sk') || cat.includes('keputusan')) return <Stamp className="h-5 w-5" />;
        if (cat.includes('laporan') || cat.includes('informasi')) return <ClipboardList className="h-5 w-5" />;
        return <Book className="h-5 w-5" />;
    };

    return (
        <PublicLayout variant="classic">
            <Head title="Produk Hukum Desa – JDIH Banjarnegara" />

            <PageHeader 
                title="Produk Hukum Desa" 
                subtitle="Integrasi Dokumentasi Hukum Desa melalui Sistem Informasi Desa (OpenSID)"
                breadcrumbs={[
                    { label: 'Beranda', href: '/' },
                    { label: 'Produk Hukum Desa' }
                ]}
            />

            {/* Filter Section */}
            <div className="bg-[#f8fafc] pt-12 pb-24">
                <div className="max-w-7xl mx-auto px-6">
                    
                    {/* Header Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
                        <div>
                            <div className="flex items-center gap-3 text-[#0d9488] mb-4 font-black tracking-widest text-[10px] uppercase">
                                <span className="h-2 w-2 rounded-full bg-[#0d9488]" />
                                <span>JDIH Lab & Inovasi Desa</span>
                            </div>
                            <h2 className="text-4xl font-black text-[#1e293b] leading-tight mb-4">
                                Sinkronisasi Data <span className="text-[#0d9488]">Langsung</span> dari Desa.
                            </h2>
                            <p className="text-slate-500 font-medium">
                                Memungkinkan akses cepat ke seluruh produk hukum desa di Kabupaten Banjarnegara melalui integrasi satu pintu.
                            </p>
                        </div>
                        <div className="flex gap-4 justify-end">
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center min-w-[140px]">
                                <p className="text-[#0d9488] font-black text-3xl mb-1">{villagesMapping.length}</p>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Kecamatan</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center min-w-[140px]">
                                <p className="text-slate-700 font-black text-3xl mb-1">
                                    {villagesMapping.reduce((acc, cur) => acc + cur.desa.length, 0)}
                                </p>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Desa Terhubung</p>
                            </div>
                        </div>
                    </div>

                    {/* Filter Card */}
                    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div>
                                <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                                    <MapPin className="h-3 w-3 text-[#0d9488]" /> Wilayah Kecamatan
                                </label>
                                <select 
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-black text-[#1e293b] outline-none focus:ring-4 focus:ring-[#0d9488]/10 transition-all appearance-none cursor-pointer"
                                    value={selectedKec}
                                    onChange={(e) => {
                                        setSelectedKec(e.target.value);
                                        const firstDesa = villagesMapping.find(v => v.kecamatan === e.target.value)?.desa[0];
                                        if (firstDesa) setSelectedDesa(firstDesa);
                                    }}
                                >
                                    {villagesMapping.map(v => <option key={v.kecamatan} value={v.kecamatan}>Kec. {v.kecamatan}</option>)}
                                </select>
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                                    <Building2 className="h-3 w-3 text-[#0d9488]" /> Nama Desa
                                </label>
                                <select 
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-black text-[#1e293b] outline-none focus:ring-4 focus:ring-[#0d9488]/10 transition-all appearance-none cursor-pointer"
                                    value={selectedDesa.name}
                                    onChange={(e) => {
                                        const desa = villagesMapping.find(v => v.kecamatan === selectedKec)?.desa.find(d => d.name === e.target.value);
                                        if (desa) setSelectedDesa(desa);
                                    }}
                                >
                                    {villagesMapping.find(v => v.kecamatan === selectedKec)?.desa.map(d => (
                                        <option key={d.name} value={d.name}>Desa {d.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                                    <Filter className="h-3 w-3 text-[#0d9488]" /> Jenis Peraturan
                                </label>
                                <select 
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-black text-[#1e293b] outline-none focus:ring-4 focus:ring-[#0d9488]/10 transition-all appearance-none cursor-pointer"
                                    value={activeCat}
                                    onChange={(e) => setActiveCat(e.target.value)}
                                >
                                    <option value="">Semua Kategori</option>
                                    {categories.map(c => <option key={c.id} value={c.id}>{c.nama}</option>)}
                                </select>
                            </div>

                            <form onSubmit={handleSearchSubmit}>
                                <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                                    <Search className="h-3 w-3 text-[#0d9488]" /> Pencarian Judul
                                </label>
                                <div className="relative group">
                                    <input 
                                        type="text"
                                        placeholder="Cari dokumen..."
                                        className="w-full pl-5 pr-12 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium text-[#1e293b] outline-none focus:ring-4 focus:ring-[#0d9488]/10 transition-all shadow-inner"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#0d9488] rounded-lg text-white shadow-lg hover:bg-[#0f766e] active:scale-95 transition-all">
                                        <Search className="h-4 w-4" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="flex justify-between items-center mt-12 mb-8">
                        <div>
                            <h3 className="text-xl font-black text-[#1e293b]">Daftar Produk Hukum</h3>
                            <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Desa {selectedDesa.name}, Kec. {selectedKec}</p>
                        </div>
                        {products.length > 0 && !loading && (
                            <div className="text-[10px] font-black text-[#0d9488] bg-[#0d9488]/10 px-4 py-2 rounded-full uppercase tracking-widest">
                                {products.length} Dokumen Ditemukan
                            </div>
                        )}
                    </div>

                    {/* Content Area */}
                    <div className="min-h-[400px]">
                        {error && (
                            <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center flex flex-col items-center shadow-sm">
                                <div className="h-16 w-16 rounded-full bg-red-50 flex items-center justify-center mb-6">
                                    <AlertCircle className="h-8 w-8 text-red-500" />
                                </div>
                                <h3 className="text-xl font-black text-[#1e293b] mb-2 font-black uppercase tracking-tight">Koneksi Terputus</h3>
                                <p className="text-slate-400 max-w-md mx-auto text-sm font-medium leading-relaxed mb-8">{error}</p>
                                <button onClick={fetchInitialData} className="px-8 py-3 bg-[#1e293b] text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-slate-900/10">
                                    Coba Hubungkan Kembali
                                </button>
                            </div>
                        )}

                        {loading ? (
                            <div className="py-20 flex flex-col items-center justify-center gap-6">
                                <div className="relative">
                                    <div className="h-20 w-20 rounded-full border-4 border-slate-100 border-t-[#0d9488] animate-spin" />
                                    <Building2 className="h-8 w-8 text-[#0d9488] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                </div>
                                <div className="text-center">
                                    <p className="font-black text-[10px] tracking-[0.2em] text-[#0d9488] uppercase mb-1">Menghubungkan ke Desa</p>
                                    <p className="text-slate-400 text-xs font-bold">Sinkronisasi data dengan server OpenSID...</p>
                                </div>
                            </div>
                        ) : products.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {products.map((item, idx) => (
                                    <div 
                                        key={item.id} 
                                        className="group relative bg-white border border-slate-200 rounded-3xl h-full flex flex-col hover:border-[#0d9488] transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-[#0d9488]/5 overflow-hidden"
                                    >
                                        <div className="p-8 pb-4">
                                            <div className="flex items-center justify-between mb-6">
                                                <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 text-slate-500 rounded-lg border border-slate-100 group-hover:bg-[#0d9488]/5 group-hover:border-[#0d9488]/20 group-hover:text-[#0d9488] transition-colors">
                                                    {getIcon(item.attributes.kategori)}
                                                    <span className="text-[9px] font-black uppercase tracking-widest">{item.attributes.kategori}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-slate-400 font-bold">
                                                    <Calendar className="h-3 w-3" />
                                                    <span className="text-[10px]">{item.attributes.tahun}</span>
                                                </div>
                                            </div>
                                            <h3 className="text-base font-bold text-[#1e293b] leading-relaxed group-hover:text-[#0d9488] transition-colors line-clamp-3">
                                                {item.attributes.nama}
                                            </h3>
                                        </div>
                                        <div className="mt-auto p-8 pt-4">
                                            <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                                                <div className="text-[10px] font-bold text-slate-400">
                                                    {item.attributes.tgl_upload 
                                                        ? `Update: ${new Date(item.attributes.tgl_upload).toLocaleDateString('id-ID')}`
                                                        : 'Update: -'}
                                                </div>
                                                <a 
                                                    href={item.attributes.satuan} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="px-5 py-2.5 bg-[#1e293b] text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#0d9488] transition-all flex items-center gap-2 shadow-lg shadow-slate-900/10"
                                                >
                                                    UNDUH <Download className="h-3 w-3" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : !loading && !error && (
                            <div className="py-24 bg-white rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center px-10">
                                <div className="h-20 w-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6">
                                    <FileText className="h-10 w-10 text-slate-200" />
                                </div>
                                <h3 className="text-xl font-black text-[#1e293b] mb-2 font-black uppercase tracking-tight">Tidak Ada Data</h3>
                                <p className="text-slate-400 text-sm max-w-xs font-medium leading-relaxed">
                                    Pemerintah desa terkait belum mempublikasikan produk hukum pada platform OpenSID.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Inovasi Info Section */}
                    <div className="mt-24">
                        <div className="bg-[#1e293b] rounded-[2.5rem] p-12 relative overflow-hidden shadow-2xl shadow-slate-900/20">
                            <div className="absolute right-[-10%] top-[-20%] h-[150%] w-[50%] bg-[#0d9488] rounded-full blur-[120px] opacity-10 pointer-events-none" />
                            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                                <div>
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full text-[#0d9488] text-[10px] font-black uppercase tracking-widest mb-8 border border-white/5">
                                        <Info className="h-3 w-3" /> Informasi Integrasi
                                    </div>
                                    <h3 className="text-3xl font-black text-white mb-6 leading-tight">Mewujudkan Integrasi Data Hukum Desa.</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed mb-8 font-medium">
                                        JDIH Kabupaten Banjarnegara mendayagunakan dokumen peraturan desa sebagai bagian dari basis data hukum daerah yang terstandardisasi dan mudah diakses.
                                    </p>
                                    <Link href="/katalog" className="group inline-flex items-center gap-3 text-white font-black text-[10px] bg-[#0d9488] hover:bg-[#0f766e] px-8 py-4 rounded-xl transition-all uppercase tracking-widest shadow-xl shadow-teal-900/20">
                                        Katalog Produk Hukum Daerah <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                                <div className="hidden md:block">
                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { icon: <Scale className="h-6 w-6" />, label: 'Standardisasi' },
                                            { icon: <Search className="h-6 w-6" />, label: 'Kemudahan' },
                                            { icon: <Download className="h-6 w-6" />, label: 'Akses Publik' },
                                            { icon: <Shield className="h-6 w-6" />, label: 'Validitas' },
                                        ].map((box, i) => (
                                            <div key={i} className="p-6 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/5 flex flex-col gap-4">
                                                <div className="p-3 bg-[#0d9488]/20 text-[#0d9488] w-fit rounded-2xl">
                                                    {box.icon}
                                                </div>
                                                <p className="text-white font-black text-[10px] uppercase tracking-widest">{box.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
