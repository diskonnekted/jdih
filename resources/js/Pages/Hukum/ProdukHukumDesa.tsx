import React, { useState, useEffect } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
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
        <PublicLayout variant="modern">
            <Head title="Produk Hukum Desa" />

            {/* Hero Section */}
            <div className="bg-[#002673] text-white pt-24 pb-20 px-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '60px 60px' }} />
                </div>
                <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 text-blue-400 mb-6 font-black tracking-widest text-xs uppercase animate-pulse">
                            <span className="h-2 w-2 rounded-full bg-blue-500" />
                            <span>JDIH Lab & Inovasi Desa</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black mb-6 leading-[1.1] tracking-tight">
                            Produk Hukum <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">Desa</span>
                        </h1>
                        <p className="text-blue-100/70 text-xl leading-relaxed font-medium">
                            Upaya transparansi hukum hingga tingkat terbawah. Terhubung secara langsung ke Sistem Informasi Desa (OpenSID) untuk data yang lebih akurat.
                        </p>
                    </div>
                    <div className="w-full md:w-auto flex flex-col items-center gap-4 bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-2xl">
                        <div className="text-center">
                            <p className="text-blue-300 font-black text-4xl mb-1">{villagesMapping.length}</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Kecamatan</p>
                        </div>
                        <div className="h-px w-10 bg-white/10" />
                        <div className="text-center">
                            <p className="text-teal-400 font-black text-4xl mb-1">
                                {villagesMapping.reduce((acc, cur) => acc + cur.desa.length, 0)}
                            </p>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Desa Terhubung</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter Section */}
            <div className="max-w-7xl mx-auto px-6 -translate-y-12 relative z-20">
                <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/10 border border-slate-100 p-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">
                                <MapPin className="h-3 w-3 text-blue-600" /> Wilayah Kecamatan
                            </label>
                            <select 
                                className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-black text-[#1e293b] outline-none focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none cursor-pointer"
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
                            <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">
                                <Building2 className="h-3 w-3 text-blue-600" /> Nama Desa
                            </label>
                            <select 
                                className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-black text-[#1e293b] outline-none focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none cursor-pointer"
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
                            <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">
                                <Filter className="h-3 w-3 text-blue-600" /> Jenis Peraturan
                            </label>
                            <select 
                                className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-black text-[#1e293b] outline-none focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none cursor-pointer"
                                value={activeCat}
                                onChange={(e) => setActiveCat(e.target.value)}
                            >
                                <option value="">Semua Kategori</option>
                                {categories.map(c => <option key={c.id} value={c.id}>{c.nama}</option>)}
                            </select>
                        </div>

                        <form onSubmit={handleSearchSubmit}>
                            <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">
                                <Search className="h-3 w-3 text-blue-600" /> Pencarian Judul
                            </label>
                            <div className="relative group">
                                <input 
                                    type="text"
                                    placeholder="Nomor atau nama..."
                                    className="w-full pl-5 pr-12 py-3 bg-slate-50 border-none rounded-2xl text-sm font-medium text-[#1e293b] outline-none focus:ring-4 focus:ring-blue-500/10 transition-all shadow-inner"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 rounded-xl text-white shadow-lg hover:bg-blue-700 active:scale-95 transition-all">
                                    <Search className="h-4 w-4" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* List Header */}
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h2 className="text-3xl font-black text-[#1e293b]">Daftar Produk Hukum</h2>
                    <div className="flex items-center gap-3 mt-2 text-sm font-bold text-slate-400">
                        <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-blue-500" /> Kec. {selectedKec}</span>
                        <span className="h-1 w-1 rounded-full bg-slate-200" />
                        <span className="flex items-center gap-1.5"><Building2 className="h-3.5 w-3.5 text-blue-500" /> Desa {selectedDesa.name}</span>
                    </div>
                </div>
                {products.length > 0 && !loading && (
                    <p className="text-sm font-black uppercase tracking-widest text-[#003399] bg-blue-50 px-4 py-2 rounded-full">
                        {products.length} Dokumen Ditemukan
                    </p>
                )}
            </div>

            {/* Content Area */}
            <div className="max-w-7xl mx-auto px-6 pb-24 min-h-[400px]">
                {error && (
                    <div className="bg-white border-2 border-red-50 rounded-[2rem] p-12 text-center flex flex-col items-center">
                        <div className="h-16 w-16 rounded-full bg-red-50 flex items-center justify-center mb-6">
                            <AlertCircle className="h-8 w-8 text-red-500" />
                        </div>
                        <h3 className="text-xl font-black text-[#1e293b] mb-2 font-black">Offline Temporer</h3>
                        <p className="text-slate-400 max-w-md mx-auto text-sm font-medium leading-relaxed mb-8">{error}</p>
                        <button onClick={fetchInitialData} className="px-8 py-3 bg-red-500 text-white rounded-xl font-bold text-sm shadow-xl shadow-red-900/10 hover:bg-red-600 transition-all">
                            Coba Hubungkan Ulang
                        </button>
                    </div>
                )}

                {loading ? (
                    <div className="py-20 flex flex-col items-center justify-center gap-6">
                        <div className="relative">
                            <div className="h-20 w-20 rounded-full border-4 border-blue-50 border-t-blue-500 animate-spin" />
                            <Building2 className="h-8 w-8 text-blue-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        </div>
                        <div className="text-center">
                            <p className="font-black text-sm tracking-[0.2em] text-[#003399] uppercase mb-1">Sinkronisasi Desa</p>
                            <p className="text-slate-400 text-xs font-bold">Mengambil data dari server {selectedDesa.name}...</p>
                        </div>
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((item, idx) => (
                            <div 
                                key={item.id} 
                                className="group relative bg-white border border-slate-100 rounded-[2rem] h-full flex flex-col hover:border-blue-500 transition-all duration-300 shadow-[0_0_50px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_60px_rgba(0,51,153,0.1)] overflow-hidden"
                                style={{ transitionDelay: `${idx * 50}ms` }}
                            >
                                <div className="absolute top-0 right-0 p-6 opacity-[0.05] group-hover:scale-125 transition-transform duration-500 pointer-events-none">
                                    {getIcon(item.attributes.kategori)}
                                </div>
                                <div className="p-8 pb-4">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-[#003399] rounded-lg">
                                            <span className="p-1 rounded-md bg-white shadow-sm">
                                                {getIcon(item.attributes.kategori)}
                                            </span>
                                            <span className="text-[10px] font-black uppercase tracking-widest">{item.attributes.kategori}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-slate-400">
                                            <Calendar className="h-3 w-3" />
                                            <span className="text-xs font-black">{item.attributes.tahun}</span>
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-black text-[#1e293b] leading-snug group-hover:text-blue-700 transition-colors line-clamp-4">
                                        {item.attributes.nama}
                                    </h3>
                                </div>
                                <div className="mt-auto p-8 pt-4">
                                    <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                                        <div className="text-[10px] font-bold text-slate-300">
                                            {item.attributes.tgl_upload 
                                                ? `Update: ${new Date(item.attributes.tgl_upload).toLocaleDateString('id-ID')}`
                                                : 'Update: -'}
                                        </div>
                                        <a 
                                            href={item.attributes.satuan} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="px-5 py-2.5 bg-[#003399] text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-black transition-all flex items-center gap-2 group-hover:px-6"
                                        >
                                            Unduh <Download className="h-3 w-3" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : !loading && !error && (
                    <div className="py-24 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center px-10">
                        <div className="h-20 w-20 bg-white rounded-3xl shadow-xl flex items-center justify-center mb-6">
                            <FileText className="h-10 w-10 text-slate-200" />
                        </div>
                        <h3 className="text-xl font-black text-slate-700 mb-2 font-black">Data Belum Tersedia</h3>
                        <p className="text-slate-400 text-sm max-w-xs font-medium leading-relaxed">
                            Sepertinya Pemerintah Desa belum mempublikasikan produk hukum terbarunya di website resmi.
                        </p>
                    </div>
                )}
            </div>

            {/* Inovasi Footer Card */}
            <div className="max-w-7xl mx-auto px-6 pb-24">
                <div className="bg-[#003399] rounded-[3rem] p-12 relative overflow-hidden shadow-2xl shadow-blue-900/40">
                    <div className="absolute right-[-10%] top-[-20%] h-[150%] w-[50%] bg-blue-400 rounded-full blur-[120px] opacity-20 pointer-events-none" />
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-blue-200 text-[10px] font-black uppercase tracking-widest mb-8 border border-white/5">
                                <Info className="h-3 w-3" /> Informasi Sinkronisasi
                            </div>
                            <h3 className="text-3xl font-black text-white mb-6 leading-tight">Mewujudkan Integrasi Data Hukum di Seluruh Desa.</h3>
                            <p className="text-blue-100/60 text-sm leading-relaxed mb-8 font-medium">
                                Melalui JDIH Kabupaten Banjarnegara, kami berkomitmen untuk mendayagunakan dokumen peraturan desa sebagai bagian dari basis data hukum nasional yang terintegrasi.
                            </p>
                            <Link href="/katalog" className="group inline-flex items-center gap-3 text-white font-black text-xs bg-white/5 hover:bg-white/10 px-8 py-4 rounded-2xl transition-all border border-white/10">
                                DATABASE PRODUK HUKUM DAERAH <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                        <div className="hidden md:block">
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { icon: <Scale className="h-6 w-6" />, label: 'Standardisasi' },
                                    { icon: <Search className="h-6 w-6" />, label: 'Temu Kembali' },
                                    { icon: <Download className="h-6 w-6" />, label: 'Akses Publik' },
                                    { icon: <Shield className="h-6 w-6" />, label: 'Legalitas' },
                                ].map((box, i) => (
                                    <div key={i} className="p-6 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/5 flex flex-col gap-4">
                                        <div className="p-3 bg-blue-500/20 text-blue-300 w-fit rounded-2xl">
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
        </PublicLayout>
    );
}
