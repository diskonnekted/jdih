import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Search, ChevronDown, Menu, X, Scale, FileText, Briefcase,
    Megaphone, Info, BookOpen, Download, Eye, Calendar,
    Phone, Mail, MapPin, ExternalLink, Play, Newspaper,
    ArrowRight, Users, BarChart3, Globe, Building2,
    ClipboardList, Gavel, BookMarked, FileSearch, Handshake,
    TrendingUp, Landmark, Shield
} from 'lucide-react';
import { PageProps } from '@/types';

/* ------------------------------------------------------------------ */
/* COLOUR TOKENS                                                        */
/* ------------------------------------------------------------------ */
// Primary: Teal #0d9488 | Dark: Slate Navy #1e293b | Accent: Amber #f59e0b
// No gradients used anywhere.

/* ------------------------------------------------------------------ */
/* DATA                                                                */
/* ------------------------------------------------------------------ */
const NAV_ITEMS = [
    {
        label: 'Profil Kami', href: '#',
        children: [
            { label: 'Visi Misi', href: '#' },
            { label: 'Dasar Hukum', href: '#' },
            { label: 'Struktur Organisasi', href: '#' },
            { label: 'Tupoksi Bagian Hukum', href: '#' },
            { label: 'Anggota JDIH Banjarnegara', href: '#' },
            { label: 'Kedudukan dan Alamat', href: '#' },
            { label: 'SOP', href: '#' },
        ]
    },
    {
        label: 'Peraturan Perundang-Undangan', href: '#',
        children: [
            { label: 'Peraturan Daerah', href: '#' },
            { label: 'Peraturan Bupati', href: '#' },
            { label: 'Keputusan Bupati', href: '#' },
            { label: 'Instruksi Bupati', href: '#' },
            { label: 'Keputusan Sekretaris Daerah', href: '#' },
            { label: 'Dokumen Hukum Terjemahan', href: '#' },
            { label: 'Dokumen Hukum Langka', href: '#' },
            { label: 'Propemperda', href: '#' },
            { label: 'Katalog', href: '#' },
            { label: 'Peraturan Pusat ↗', href: 'https://jdihn.go.id/' },
        ]
    },
    {
        label: 'Monografi Hukum', href: '#',
        children: [
            { label: 'Naskah Akademik', href: '#' },
            { label: 'Raperda', href: '#' },
            { label: 'Analisis & Evaluasi Hukum', href: '#' },
            { label: 'RANHAM', href: '#' },
            { label: 'Risalah Rapat', href: '#' },
            { label: 'Artikel Bidang Hukum', href: '#' },
        ]
    },
    {
        label: 'Informasi', href: '#',
        children: [
            { label: 'Berita', href: '#' },
            { label: 'Download', href: '#' },
            { label: 'Galeri', href: '#' },
            { label: 'Video', href: '#' },
        ]
    },
    { label: 'Putusan', href: '#' },
    { label: 'Kerja Sama Daerah', href: '#' },
];

const CATEGORIES = [
    { title: 'Peraturan Daerah', code: 'PERDA', icon: Scale, count: '1.240', color: '#0d9488' },
    { title: 'Peraturan Bupati', code: 'PERBUP', icon: FileText, count: '2.850', color: '#1e293b' },
    { title: 'Keputusan Bupati', code: 'KEPBUP', icon: Gavel, count: '4.120', color: '#0d9488' },
    { title: 'Surat Edaran', code: 'SE', icon: Megaphone, count: '840', color: '#1e293b' },
    { title: 'Instruksi Bupati', code: 'INBUP', icon: ClipboardList, count: '320', color: '#0d9488' },
    { title: 'Monografi Hukum', code: 'MONO', icon: BookMarked, count: '215', color: '#1e293b' },
    { title: 'Naskah Akademik', code: 'NA', icon: FileSearch, count: '98', color: '#0d9488' },
    { title: 'Kerja Sama Daerah', code: 'KSD', icon: Handshake, count: '62', color: '#1e293b' },
];

const LATEST_DOCS = [
    { id: 1, type: 'PERDA', year: '2024', number: 'Nomor 1 Tahun 2024', title: 'Perubahan Ketiga Atas Peraturan Daerah Nomor 2 Tahun 2016 Tentang Pembentukan Dan Susunan Perangkat Daerah', date: '2024-01-15', subject: 'Perangkat Daerah' },
    { id: 2, type: 'PERDA', year: '2023', number: 'Nomor 8 Tahun 2023', title: 'Pajak Daerah Dan Retribusi Daerah', date: '2023-12-10', subject: 'Pajak Daerah' },
    { id: 3, type: 'PERDA', year: '2023', number: 'Nomor 6 Tahun 2023', title: 'Rencana Tata Ruang Wilayah Tahun 2023–2043', date: '2023-11-20', subject: 'Tata Ruang' },
    { id: 4, type: 'KEPBUP', year: '2026', number: 'Nomor 900/90 Tahun 2026', title: 'Penunjukan Bendahara Pengeluaran Pembantu Pada Perangkat Daerah', date: '2026-03-01', subject: 'Bendahara' },
    { id: 5, type: 'KEPBUP', year: '2026', number: 'Nomor 100.2/89 Tahun 2026', title: 'Perubahan Atas Keputusan Bupati Nomor 130/546 Tahun 2022 Tentang Tim Penegasan Batas Daerah', date: '2026-02-28', subject: 'Penegasan Batas' },
];

const NEWS = [
    { id: 1, title: 'Infografis Peraturan Daerah Nomor 8 Tahun 2025 Tentang Pajak Daerah Dan Retribusi Daerah', date: '2025-12-15', category: 'Infografis' },
    { id: 2, title: 'Study Referensi Pelaksanaan Tugas Pada Bagian Hukum Sekretariat Daerah Kabupaten Temanggung', date: '2025-11-20', category: 'Kegiatan' },
    { id: 3, title: 'Penandatanganan MOU Dengan Kejaksaan Negeri Terkait Pelaksanaan Pidana Kerja Sosial', date: '2025-10-05', category: 'Kerja Sama' },
    { id: 4, title: 'Forum Satu Data Indonesia Kabupaten Banjarnegara "Perencanaan Berbasis Data"', date: '2025-09-18', category: 'Forum' },
];

const STATS = [
    { label: 'Total Dokumen', value: '9.645+', icon: FileText },
    { label: 'Jenis Peraturan', value: '24', icon: Scale },
    { label: 'Tahun Dokumen', value: '40+', icon: Calendar },
    { label: 'Pengunjung/Bulan', value: '15.000+', icon: Users },
];

const RELATED_LINKS = [
    { label: 'Pemerintah Kab. Banjarnegara', href: 'http://banjarnegarakab.go.id', icon: Building2 },
    { label: 'Kemendagri RI', href: 'http://www.kemendagri.go.id', icon: Landmark },
    { label: 'Kementerian Setneg RI', href: 'https://www.setneg.go.id', icon: Shield },
    { label: 'JDIHN', href: 'https://www.jdihn.go.id', icon: Globe },
    { label: 'JDIH DPRD Banjarnegara', href: 'http://jdih.dprd.jatengprov.go.id', icon: Users },
    { label: 'BPHN Kemenkumham RI', href: 'http://www.bphn.go.id', icon: BookOpen },
];

const VIDEOS = [
    { id: 1, title: 'Perbup Nomor 54 Tahun 2025', href: 'https://vt.tiktok.com/ZSas6yLNF/', duration: '1:30' },
    { id: 2, title: 'Tutorial Pengumpulan Produk Hukum Daerah', href: 'https://www.tiktok.com/@jdih_banjarnegara', duration: '2:45' },
    { id: 3, title: 'Penyelenggaraan Koperasi Merah Putih', href: 'https://www.tiktok.com/@jdih_banjarnegara', duration: '3:10' },
];

/* ------------------------------------------------------------------ */
/* HELPERS                                                             */
/* ------------------------------------------------------------------ */
function fmtDate(d: string) {
    return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

function TypeBadge({ type }: { type: string }) {
    const colors: Record<string, string> = {
        PERDA: '#0d9488', PERBUP: '#1e293b', KEPBUP: '#f59e0b', SE: '#6366f1', INBUP: '#ec4899',
    };
    return (
        <span
            className="text-xs font-bold px-2 py-1 rounded text-white tracking-wider"
            style={{ backgroundColor: colors[type] ?? '#0d9488' }}
        >
            {type}
        </span>
    );
}

/* ------------------------------------------------------------------ */
/* NAVBAR                                                              */
/* ------------------------------------------------------------------ */
function Navbar({ user }: { user: any }) {
    const [open, setOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

    return (
        <nav className="fixed top-0 w-full z-50 bg-[#1e293b] shadow-lg">
            {/* Top bar */}
            <div className="bg-[#0d9488] text-white text-xs py-1.5 px-6">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <span>Bagian Hukum Sekretariat Daerah Kabupaten Banjarnegara</span>
                    <span>Telp. (0286) 591218 · hukum@banjarnegarakab.go.id</span>
                </div>
            </div>

            {/* Main nav */}
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <img src="/images/logo.png" alt="Logo JDIH Banjarnegara" className="h-12 w-auto object-contain" />
                    <div className="leading-none">
                        <span className="block font-bold text-white text-base">JDIH Banjarnegara</span>
                        <span className="text-[#0d9488] text-[10px] font-semibold tracking-widest uppercase">Kabupaten Banjarnegara</span>
                    </div>
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-1 text-sm font-medium">
                    {NAV_ITEMS.map((item) => (
                        <div key={item.label} className="relative group">
                            <button
                                className="flex items-center gap-1 px-3 py-2 text-slate-200 hover:text-white hover:bg-white/10 rounded transition-colors"
                                onMouseEnter={() => setActiveMenu(item.label)}
                                onMouseLeave={() => setActiveMenu(null)}
                            >
                                {item.label}
                                {item.children && <ChevronDown className="h-3 w-3" />}
                            </button>
                            {item.children && (
                                <div
                                    className="absolute top-full left-0 mt-0 w-56 bg-white border border-slate-200 shadow-xl rounded-b-lg overflow-hidden opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity"
                                    onMouseEnter={() => setActiveMenu(item.label)}
                                    onMouseLeave={() => setActiveMenu(null)}
                                >
                                    {item.children.map((child) => (
                                        <a key={child.label} href={child.href} className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-[#0d9488] hover:text-white transition-colors border-b border-slate-50 last:border-0">
                                            {child.label}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    {user ? (
                        <a href="/admin" className="ml-2 px-4 py-2 bg-[#0d9488] text-white rounded font-semibold hover:bg-teal-600 transition-colors">
                            Admin
                        </a>
                    ) : (
                        <a href="/admin/login" className="ml-2 px-4 py-2 bg-[#0d9488] text-white rounded font-semibold hover:bg-teal-600 transition-colors">
                            Masuk
                        </a>
                    )}
                </div>

                {/* Mobile toggle */}
                <button className="lg:hidden text-white" onClick={() => setOpen(!open)}>
                    {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile menu */}
            {open && (
                <div className="lg:hidden bg-[#1e293b] border-t border-white/10 px-6 py-4 space-y-1">
                    {NAV_ITEMS.map((item) => (
                        <div key={item.label}>
                            <a href={item.href} className="block py-2 text-slate-300 hover:text-white font-medium">{item.label}</a>
                            {item.children?.map((child) => (
                                <a key={child.label} href={child.href} className="block pl-4 py-1.5 text-slate-400 hover:text-white text-sm">{child.label}</a>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </nav>
    );
}

/* ------------------------------------------------------------------ */
/* HERO                                                                */
/* ------------------------------------------------------------------ */
function Hero() {
    const [q, setQ] = useState('');
    return (
        <section className="relative pt-[calc(64px+28px)] pb-0">
        <div
                className="relative bg-cover bg-center bg-no-repeat py-20 px-6"
                style={{ backgroundImage: "url('/images/hero.webp')" }}
            >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-[#1e293b]/80" />
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <div className="inline-block bg-[#0d9488] text-white text-xs font-bold px-4 py-1.5 rounded mb-6 tracking-widest uppercase">
                        Jaringan Dokumentasi & Informasi Hukum
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                        Portal Produk Hukum<br />
                        <span className="text-[#0d9488]">Kabupaten Banjarnegara</span>
                    </h1>
                    <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
                        Akses mudah ke database peraturan daerah, keputusan bupati, dan produk hukum lainnya secara transparan dan terkini.
                    </p>

                    {/* Search */}
                    <div className="flex flex-col sm:flex-row gap-0 bg-white rounded overflow-hidden shadow-2xl max-w-2xl mx-auto">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                            <input
                                type="text"
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                                placeholder="Cari peraturan, nomor, atau kata kunci..."
                                className="w-full pl-12 pr-4 py-4 border-none outline-none text-slate-800 placeholder:text-slate-400 text-sm"
                            />
                        </div>
                        <button className="px-8 py-4 bg-[#0d9488] text-white font-bold text-sm hover:bg-teal-600 transition-colors whitespace-nowrap">
                            Cari Sekarang
                        </button>
                    </div>

                    <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
                        <span className="text-slate-500">Populer:</span>
                        {['Perda No. 1 2024', 'Pajak Daerah', 'Tata Ruang', 'RPJMD 2025–2029'].map((kw) => (
                            <button key={kw} className="text-[#0d9488] hover:text-teal-300 transition-colors">{kw}</button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats strip */}
            <div className="bg-[#0d9488]">
                <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {STATS.map((s) => (
                        <div key={s.label} className="flex items-center gap-3 text-white">
                            <s.icon className="h-8 w-8 opacity-70 shrink-0" />
                            <div>
                                <div className="text-xl font-bold leading-none">{s.value}</div>
                                <div className="text-xs opacity-80">{s.label}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/* CATEGORY GRID                                                       */
/* ------------------------------------------------------------------ */
function CategoryGrid() {
    return (
        <section className="py-16 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <p className="text-[#0d9488] text-sm font-bold uppercase tracking-widest mb-1">Database</p>
                        <h2 className="text-3xl font-bold text-[#1e293b]">Kategori Produk Hukum</h2>
                    </div>
                    <a href="#" className="hidden md:flex items-center gap-2 text-sm font-semibold text-[#0d9488] hover:text-teal-700 transition-colors">
                        Lihat Semua <ArrowRight className="h-4 w-4" />
                    </a>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {CATEGORIES.map((cat) => (
                        <a key={cat.code} href="#"
                            className="group flex items-center gap-4 p-5 bg-white border border-slate-200 rounded-lg hover:border-[#0d9488] hover:shadow-md transition-all">
                            <div
                                className="h-12 w-12 rounded flex items-center justify-center shrink-0"
                                style={{ backgroundColor: cat.color }}
                            >
                                <cat.icon className="h-6 w-6 text-white" />
                            </div>
                            <div className="min-w-0">
                                <div className="font-bold text-[#1e293b] text-sm group-hover:text-[#0d9488] transition-colors truncate">{cat.title}</div>
                                <div className="text-slate-500 text-xs">{cat.count} Dokumen</div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/* LATEST DOCUMENTS                                                    */
/* ------------------------------------------------------------------ */
function LatestDocuments() {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <p className="text-[#0d9488] text-sm font-bold uppercase tracking-widest mb-1">Terkini</p>
                        <h2 className="text-3xl font-bold text-[#1e293b]">Produk Hukum Terbaru</h2>
                    </div>
                    <a href="#" className="hidden md:flex items-center gap-2 text-sm font-semibold text-[#0d9488] hover:text-teal-700 transition-colors">
                        Lihat Semua <ArrowRight className="h-4 w-4" />
                    </a>
                </div>

                <div className="space-y-4">
                    {LATEST_DOCS.map((doc, idx) => (
                        <div key={doc.id}
                            className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 border border-slate-200 rounded-lg hover:border-[#0d9488] hover:bg-slate-50 transition-all group cursor-pointer">
                            {/* Number */}
                            <div className="hidden sm:flex h-10 w-10 rounded bg-slate-100 items-center justify-center text-slate-400 font-bold shrink-0">
                                {String(idx + 1).padStart(2, '0')}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                    <TypeBadge type={doc.type} />
                                    <span className="text-xs text-slate-400">{fmtDate(doc.date)}</span>
                                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{doc.subject}</span>
                                </div>
                                <p className="font-semibold text-[#1e293b] text-sm group-hover:text-[#0d9488] transition-colors leading-snug">
                                    {doc.number} — {doc.title}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 shrink-0">
                                <button className="flex items-center gap-1.5 px-4 py-2 bg-[#1e293b] text-white text-xs font-bold rounded hover:bg-slate-700 transition-colors">
                                    <Eye className="h-3.5 w-3.5" /> Detail
                                </button>
                                <button className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 text-slate-600 text-xs font-bold rounded hover:border-[#0d9488] hover:text-[#0d9488] transition-colors">
                                    <Download className="h-3.5 w-3.5" /> PDF
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/* NEWS                                                                */
/* ------------------------------------------------------------------ */
function NewsSection() {
    return (
        <section className="py-16 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <p className="text-[#0d9488] text-sm font-bold uppercase tracking-widest mb-1">Informasi</p>
                        <h2 className="text-3xl font-bold text-[#1e293b]">Berita & Artikel</h2>
                    </div>
                    <a href="#" className="hidden md:flex items-center gap-2 text-sm font-semibold text-[#0d9488] hover:text-teal-700 transition-colors">
                        Semua Berita <ArrowRight className="h-4 w-4" />
                    </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {NEWS.map((article) => (
                        <a key={article.id} href="#" className="group bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-[#0d9488] hover:shadow-md transition-all">
                            <div className="h-36 bg-[#1e293b] flex items-center justify-center">
                                <Newspaper className="h-12 w-12 text-[#0d9488]" />
                            </div>
                            <div className="p-4">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#0d9488]">{article.category}</span>
                                <p className="font-semibold text-[#1e293b] text-sm mt-1 leading-snug group-hover:text-[#0d9488] transition-colors line-clamp-3">
                                    {article.title}
                                </p>
                                <p className="text-xs text-slate-400 mt-3">{fmtDate(article.date)}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/* VIDEO                                                               */
/* ------------------------------------------------------------------ */
function VideoSection() {
    return (
        <section className="py-16 bg-[#1e293b]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <p className="text-[#0d9488] text-sm font-bold uppercase tracking-widest mb-1">Media</p>
                        <h2 className="text-3xl font-bold text-white">Video Terbaru</h2>
                    </div>
                    <a href="https://www.tiktok.com/@jdih_banjarnegara" target="_blank" rel="noreferrer"
                        className="flex items-center gap-2 text-sm font-semibold text-[#0d9488] hover:text-teal-300 transition-colors">
                        Selengkapnya <ArrowRight className="h-4 w-4" />
                    </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {VIDEOS.map((v) => (
                        <a key={v.id} href={v.href} target="_blank" rel="noreferrer"
                            className="group relative bg-slate-800 border border-slate-700 rounded-lg overflow-hidden hover:border-[#0d9488] transition-all">
                            <div className="h-40 bg-[#0d2d29] flex items-center justify-center">
                                <div className="h-14 w-14 rounded-full bg-[#0d9488] flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Play className="h-6 w-6 text-white ml-1" />
                                </div>
                            </div>
                            <div className="p-4">
                                <p className="text-white text-sm font-semibold leading-snug group-hover:text-[#0d9488] transition-colors">{v.title}</p>
                                <span className="text-slate-400 text-xs mt-1 block">Durasi {v.duration}</span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/* RELATED LINKS                                                       */
/* ------------------------------------------------------------------ */
function RelatedLinks() {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-10">
                    <p className="text-[#0d9488] text-sm font-bold uppercase tracking-widest mb-1">Tautan</p>
                    <h2 className="text-3xl font-bold text-[#1e293b]">Tautan Terkait</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {RELATED_LINKS.map((link) => (
                        <a key={link.label} href={link.href} target="_blank" rel="noreferrer"
                            className="group flex items-center gap-4 p-4 border border-slate-200 rounded-lg hover:border-[#0d9488] hover:bg-slate-50 transition-all">
                            <div className="h-10 w-10 bg-[#0d9488] rounded flex items-center justify-center shrink-0">
                                <link.icon className="h-5 w-5 text-white" />
                            </div>
                            <span className="font-semibold text-[#1e293b] text-sm group-hover:text-[#0d9488] transition-colors flex-1">{link.label}</span>
                            <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-[#0d9488] shrink-0 transition-colors" />
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/* CTA                                                                 */
/* ------------------------------------------------------------------ */
function CTA() {
    return (
        <section className="py-16 bg-[#0d9488]">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Butuh Bantuan Terkait Informasi Hukum?</h2>
                <p className="text-teal-100 text-lg mb-8 max-w-xl mx-auto">
                    Tim kami siap membantu memberikan informasi terkini mengenai regulasi di Kabupaten Banjarnegara.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <a href="tel:02865912218" className="px-8 py-3.5 bg-white text-[#0d9488] font-bold rounded hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
                        <Phone className="h-5 w-5" /> Hubungi Kami
                    </a>
                    <a href="mailto:hukum@banjarnegarakab.go.id" className="px-8 py-3.5 bg-[#1e293b] text-white font-bold rounded hover:bg-slate-900 transition-colors flex items-center justify-center gap-2">
                        <Mail className="h-5 w-5" /> Kirim Email
                    </a>
                </div>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/* FOOTER                                                              */
/* ------------------------------------------------------------------ */
function Footer() {
    const OPD_LINKS = [
        ['Sekretariat Daerah', 'https://setda.banjarnegarakab.go.id'],
        ['DPRD', 'https://dprd.banjarnegarakab.go.id'],
        ['Inspektorat', 'https://inspektorat.banjarnegarakab.go.id'],
        ['BKD', 'https://bkd.banjarnegarakab.go.id'],
        ['BAPERLITBANG', 'https://baperlitbang.banjarnegarakab.go.id'],
        ['BPPKAD', 'https://bppkad.banjarnegarakab.go.id'],
        ['Dinas Kesehatan', 'https://dinkes.banjarnegarakab.go.id'],
        ['DPUPR', 'https://dpupr.banjarnegarakab.go.id'],
        ['DINKOMINFO', 'https://dinkominfo.banjarnegarakab.go.id'],
        ['DISPARBUD', 'https://wisata.banjarnegarakab.go.id'],
    ];

    return (
        <footer className="bg-[#1e293b] text-slate-400 pt-12 pb-6">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <img src="/images/logo.png" alt="Logo JDIH Banjarnegara" className="h-12 w-auto object-contain" />
                            <div>
                                <span className="block font-bold text-white text-lg">JDIH Banjarnegara</span>
                                <span className="text-[#0d9488] text-xs font-semibold">Kabupaten Banjarnegara</span>
                            </div>
                        </div>
                        <p className="text-sm leading-relaxed mb-4 max-w-sm">
                            Jaringan Dokumentasi dan Informasi Hukum Kabupaten Banjarnegara – wadah pendayagunaan bersama atas dokumen hukum secara tertib, terpadu dan berkesinambungan.
                        </p>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-start gap-2"><MapPin className="h-4 w-4 text-[#0d9488] shrink-0 mt-0.5" /><span>Jl. Ahmad Yani No. 16, Krandegan, Banjarnegara</span></div>
                            <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-[#0d9488] shrink-0" /><span>Telp. (0286) 591218</span></div>
                            <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-[#0d9488] shrink-0" /><span>hukum@banjarnegarakab.go.id</span></div>
                        </div>
                        <div className="flex gap-3 mt-5">
                            <a href="https://www.tiktok.com/@jdih_banjarnegara" target="_blank" rel="noreferrer"
                                className="px-3 py-1.5 text-xs border border-slate-600 rounded hover:border-[#0d9488] hover:text-[#0d9488] transition-colors">TikTok</a>
                            <a href="https://www.instagram.com/jdih_banjarnegara/" target="_blank" rel="noreferrer"
                                className="px-3 py-1.5 text-xs border border-slate-600 rounded hover:border-[#0d9488] hover:text-[#0d9488] transition-colors">Instagram</a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Produk Hukum</h4>
                        <ul className="space-y-2 text-sm">
                            {['Peraturan Daerah', 'Peraturan Bupati', 'Keputusan Bupati', 'Surat Edaran', 'Instruksi Bupati', 'Naskah Akademik', 'Putusan', 'Katalog'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="hover:text-[#0d9488] transition-colors">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* OPD Links */}
                    <div>
                        <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Website OPD</h4>
                        <ul className="space-y-2 text-sm">
                            {OPD_LINKS.map(([label, href]) => (
                                <li key={label}>
                                    <a href={href} target="_blank" rel="noreferrer" className="hover:text-[#0d9488] transition-colors flex items-center gap-1">
                                        {label} <ExternalLink className="h-3 w-3 opacity-50" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-700 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs">
                    <p>© 2025 Sekretariat Daerah Kabupaten Banjarnegara. Hak cipta dilindungi.</p>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-white transition-colors">Disclaimer</a>
                        <a href="#" className="hover:text-white transition-colors">Sitemap</a>
                        <a href="/admin" className="hover:text-white transition-colors">Admin Panel</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

/* ------------------------------------------------------------------ */
/* PAGE                                                                */
/* ------------------------------------------------------------------ */
export default function Welcome({ auth }: PageProps) {
    return (
        <>
            <Head title="JDIH Kabupaten Banjarnegara – Jaringan Dokumentasi & Informasi Hukum" />
            <meta name="description" content="Portal resmi produk hukum Kabupaten Banjarnegara. Akses peraturan daerah, keputusan bupati, dan dokumen hukum lainnya secara online." />

            <Navbar user={auth?.user} />

            <main>
                <Hero />
                <CategoryGrid />
                <LatestDocuments />
                <NewsSection />
                <VideoSection />
                <RelatedLinks />
                <CTA />
            </main>

            <Footer />
        </>
    );
}
