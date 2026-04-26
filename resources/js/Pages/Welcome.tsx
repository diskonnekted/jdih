import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Search, Scale, FileText, Gavel, Megaphone, ClipboardList,
    BookMarked, FileSearch, Handshake, Download, Eye, Calendar,
    ArrowRight, Users, Play, Newspaper, ExternalLink,
    Building2, Globe, Shield, Landmark, BookOpen, Phone, Mail
} from 'lucide-react';
import { PageProps } from '@/types';
import PublicLayout from '@/Layouts/PublicLayout';
import SearchForm, { SearchValues } from '@/Components/SearchForm';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    LineChart, Line, CartesianGrid, Cell,
} from 'recharts';

/* ------------------------------------------------------------------ */
/* COLOUR TOKENS: Teal #0d9488 | Slate Navy #1e293b | No gradients    */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* DATA                                                                */
/* ------------------------------------------------------------------ */
const CATEGORIES = [
    { title: 'Peraturan Daerah',   code: 'PERDA',  icon: Scale,         count: '1.240', href: '/peraturan-daerah',          color: '#0d9488' },
    { title: 'Peraturan Bupati',   code: 'PERBUP', icon: FileText,      count: '2.850', href: '/peraturan-bupati',           color: '#1e293b' },
    { title: 'Keputusan Bupati',   code: 'KEPBUP', icon: Gavel,         count: '4.120', href: '/keputusan-bupati',           color: '#0d9488' },
    { title: 'Surat Edaran',       code: 'SE',     icon: Megaphone,     count: '840',   href: '/surat-edaran',              color: '#1e293b' },
    { title: 'Instruksi Bupati',   code: 'INBUP',  icon: ClipboardList, count: '320',   href: '/instruksi-bupati',          color: '#0d9488' },
    { title: 'Monografi Hukum',    code: 'MONO',   icon: BookMarked,    count: '215',   href: '/naskah-akademik',           color: '#1e293b' },
    { title: 'Naskah Akademik',    code: 'NA',     icon: FileSearch,    count: '98',    href: '/naskah-akademik',           color: '#0d9488' },
    { title: 'Kerja Sama Daerah',  code: 'KSD',    icon: Handshake,     count: '62',    href: '/kerja-sama-daerah',         color: '#1e293b' },
];

const LATEST_DOCS = [
    { id: 1, type: 'PERDA',  href: '/peraturan-daerah/1',  year: '2024', number: 'Nomor 1 Tahun 2024', title: 'Perubahan Ketiga Atas Peraturan Daerah Nomor 2 Tahun 2016 Tentang Pembentukan Dan Susunan Perangkat Daerah', date: '2024-01-15', subject: 'Perangkat Daerah' },
    { id: 2, type: 'PERDA',  href: '/peraturan-daerah/2',  year: '2023', number: 'Nomor 8 Tahun 2023', title: 'Pajak Daerah Dan Retribusi Daerah', date: '2023-12-10', subject: 'Pajak Daerah' },
    { id: 3, type: 'PERDA',  href: '/peraturan-daerah/3',  year: '2023', number: 'Nomor 6 Tahun 2023', title: 'Rencana Tata Ruang Wilayah Tahun 2023–2043', date: '2023-11-20', subject: 'Tata Ruang' },
    { id: 4, type: 'KEPBUP', href: '/keputusan-bupati/4',  year: '2026', number: 'Nomor 900/90 Tahun 2026', title: 'Penunjukan Bendahara Pengeluaran Pembantu Pada Perangkat Daerah', date: '2026-03-01', subject: 'Keuangan' },
    { id: 5, type: 'KEPBUP', href: '/keputusan-bupati/5',  year: '2026', number: 'Nomor 100.2/89 Tahun 2026', title: 'Perubahan Atas Keputusan Bupati Tentang Tim Penegasan Batas Daerah', date: '2026-02-28', subject: 'Batas Daerah' },
];


const STATS = [
    { label: 'Total Dokumen',    value: '9.645+', icon: FileText },
    { label: 'Jenis Peraturan',  value: '24',     icon: Scale },
    { label: 'Tahun Dokumen',    value: '40+',    icon: Calendar },
    { label: 'Pengunjung/Bulan', value: '15.000+',icon: Users },
];

const RELATED_LINKS = [
    { label: 'Pemerintah Kab. Banjarnegara', href: 'http://banjarnegarakab.go.id', image: '/images/pemerintah kab .png' },
    { label: 'Kemendagri RI',                href: 'http://www.kemendagri.go.id',  image: '/images/kemendagri.png' },
    { label: 'Kementerian Setneg RI',        href: 'https://www.setneg.go.id',     image: '/images/setneg.png' },
    { label: 'JDIHN',                        href: 'https://www.jdihn.go.id',      image: '/images/jdihn.png' },
    { label: 'JDIH DPRD Provinsi Jawa Tengah', href: 'http://jdih.dprd.jatengprov.go.id', image: '/images/jdih dprd.svg' },
    { label: 'BPHN Kemenkumham RI',          href: 'http://www.bphn.go.id',        image: '/images/bphn.png' },
];

const VIDEOS = [
    { id: 1, title: 'Perbup Nomor 54 Tahun 2025', href: 'https://vt.tiktok.com/ZSas6yLNF/', duration: '1:30', image: '/images/covers/cover_perbup_54_2025.png' },
    { id: 2, title: 'Tutorial Pengumpulan Produk Hukum Daerah', href: 'https://www.tiktok.com/@jdih_banjarnegara', duration: '2:45', image: '/images/covers/cover_tutorial.png' },
    { id: 3, title: 'Penyelenggaraan Koperasi Merah Putih', href: 'https://www.tiktok.com/@jdih_banjarnegara', duration: '3:10', image: '/images/covers/cover_koperasi.png' },
];

/* ------------------------------------------------------------------ */
/* HELPERS                                                             */
/* ------------------------------------------------------------------ */
function fmtDate(d: string) {
    return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

const getThemeColor = (variant: 'classic' | 'modern') => variant === 'modern' ? '#003399' : '#0d9488';
const getThemeHover = (variant: 'classic' | 'modern') => variant === 'modern' ? 'hover:text-blue-800' : 'hover:text-teal-700';
const getThemeBorderHover = (variant: 'classic' | 'modern') => variant === 'modern' ? 'hover:border-[#003399]' : 'hover:border-[#0d9488]';

const TYPE_COLORS: Record<string, string> = {
    PERDA: '#0d9488', PERBUP: '#1e293b', KEPBUP: '#f59e0b', SE: '#6366f1', INBUP: '#ec4899',
};

function TypeBadge({ type, variant = 'classic' }: { type: string, variant?: 'classic' | 'modern' }) {
    const isModern = variant === 'modern';
    let bgColor = TYPE_COLORS[type] ?? '#0d9488';
    
    // Override main types in modern mode
    if (isModern && (type === 'PERDA' || type === 'KEPBUP' || bgColor === '#0d9488')) {
        bgColor = '#003399';
    }

    return (
        <span className="text-xs font-bold px-2 py-0.5 rounded text-white tracking-wider"
            style={{ backgroundColor: bgColor }}>
            {type}
        </span>
    );
}

/* ------------------------------------------------------------------ */
/* HERO  –  2-column split layout                                      */
/* ------------------------------------------------------------------ */
function Hero({ banner }: { banner?: any }) {
    const bgImage = banner?.image || '/images/hero.jpg';
    function handleSearch(values: SearchValues) {
        const JENIS_SLUG: Record<string, string> = {
            'Peraturan Daerah':            '/peraturan-daerah',
            'Peraturan Bupati':            '/peraturan-bupati',
            'Keputusan Bupati':            '/keputusan-bupati',
            'Instruksi Bupati':            '/instruksi-bupati',
            'Keputusan Sekretaris Daerah': '/keputusan-sekretaris-daerah',
            'Surat Edaran':                '/surat-edaran',
            'Naskah Akademik':             '/naskah-akademik',
            'Raperda':                     '/raperda',
            'Analisis & Evaluasi Hukum':   '/analisis-evaluasi-hukum',
            'RANHAM':                      '/ranham',
            'Risalah Rapat':               '/risalah-rapat',
            'Artikel Bidang Hukum':        '/artikel-bidang-hukum',
            'Propemperda':                 '/propemperda',
            'Katalog':                     '/katalog',
            'Putusan':                     '/putusan',
            'Kerja Sama Daerah':           '/kerja-sama-daerah',
        };
        const base = JENIS_SLUG[values.jenisDokumen] ?? '/peraturan-daerah';
        const params = new URLSearchParams();
        if (values.namaDokumen) params.set('namaDokumen', values.namaDokumen);
        if (values.nomor)       params.set('nomor', values.nomor);
        if (values.tahun)       params.set('tahun', values.tahun);
        if (values.status)      params.set('status', values.status);
        window.location.href = base + (params.toString() ? '?' + params.toString() : '');
    }

    return (
        <section>
            {/* ── Main hero area ── */}
            <div
                className="relative bg-cover bg-left-center bg-no-repeat"
                style={{ backgroundImage: `url('${bgImage}')` }}
            >
                {/* overlay – slightly lighter on the right so form panel pops */}
                <div className="absolute inset-0 bg-[#1e293b]/85" />

                <div className="relative z-10 max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

                    {/* ── LEFT: Headline ── */}
                    <div>
                        <div className="inline-block bg-[#0d9488] text-white text-xs font-bold px-4 py-1.5 rounded mb-6 tracking-widest uppercase">
                            Jaringan Dokumentasi &amp; Informasi Hukum
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
                            Portal Produk Hukum<br />
                            <span className="text-[#0d9488]">Kabupaten Banjarnegara</span>
                        </h1>
                        <p className="text-slate-300 text-base leading-relaxed mb-8 max-w-md">
                            Akses mudah ke database peraturan daerah, keputusan bupati, dan produk hukum lainnya secara transparan dan terkini.
                        </p>

                        {/* Mini stats */}
                        <div className="grid grid-cols-2 gap-4">
                            {STATS.map((s) => (
                                <div key={s.label} className="flex items-center gap-3">
                                    <div className="h-10 w-10 bg-[#0d9488]/20 rounded-lg flex items-center justify-center shrink-0">
                                        <s.icon className="h-5 w-5 text-[#0d9488]" />
                                    </div>
                                    <div>
                                        <div className="text-xl font-bold text-white leading-none">{s.value}</div>
                                        <div className="text-xs text-slate-400">{s.label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── RIGHT: Search Form Panel ── */}
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                        {/* Panel header */}
                        <div className="bg-[#1e293b] px-6 py-4 flex items-center gap-3">
                            <div className="h-8 w-8 bg-[#0d9488] rounded-lg flex items-center justify-center shrink-0">
                                <Search className="h-4 w-4 text-white" />
                            </div>
                            <div>
                                <p className="text-white font-bold text-sm">Pencarian Dokumen Hukum</p>
                                <p className="text-slate-400 text-xs">Temukan produk hukum Kab. Banjarnegara</p>
                            </div>
                        </div>
                        {/* Form body */}
                        <div className="p-6">
                            <SearchForm
                                mode="compact"
                                onSearch={handleSearch}
                            />
                        </div>
                    </div>

                </div>
            </div>

            {/* ── Stats strip (mobile only – desktop stats inline above) ── */}
            <div className="bg-[#0d9488] lg:hidden">
                <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-2 gap-4">
                    {STATS.map((s) => (
                        <div key={s.label} className="flex items-center gap-3 text-white">
                            <s.icon className="h-7 w-7 opacity-70 shrink-0" />
                            <div>
                                <div className="text-lg font-bold leading-none">{s.value}</div>
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
function CategoryGrid({ variant = 'classic', counts = {} }: { variant?: 'classic' | 'modern', counts?: Record<string, number> }) {
    const themeColor = getThemeColor(variant);
    
    return (
        <section className="py-16 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-widest mb-1" style={{ color: themeColor }}>Database</p>
                        <h2 className="text-3xl font-bold text-[#1e293b]">Kategori Produk Hukum</h2>
                    </div>
                    <Link href="/peraturan-daerah" 
                        className={`hidden md:flex items-center gap-2 text-sm font-semibold transition-colors`}
                        style={{ color: themeColor }}
                    >
                        Lihat Semua <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {CATEGORIES.map((cat) => {
                        const iconBg = (variant === 'modern' && cat.color === '#0d9488') ? '#003399' : cat.color;
                        const count = counts[cat.title] || 0;
                        return (
                            <Link key={cat.code} href={cat.href}
                                className={`group flex items-center gap-4 p-5 bg-white border border-slate-200 rounded-lg transition-all ${variant === 'modern' ? 'hover:border-[#003399] hover:shadow-xl hover:shadow-blue-900/5' : 'hover:border-[#0d9488] hover:shadow-md'}`}>
                                <div className="h-12 w-12 rounded flex items-center justify-center shrink-0" style={{ backgroundColor: iconBg }}>
                                    <cat.icon className="h-6 w-6 text-white" />
                                </div>
                                <div className="min-w-0">
                                    <div className={`font-bold text-[#1e293b] text-sm transition-colors truncate ${variant === 'modern' ? 'group-hover:text-[#003399]' : 'group-hover:text-[#0d9488]'}`}>{cat.title}</div>
                                    <div className="text-slate-500 text-xs">{count.toLocaleString('id-ID')} Dokumen</div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/* LATEST DOCUMENTS                                                    */
/* ------------------------------------------------------------------ */
function LatestDocuments({ variant = 'classic', documents = [] }: { variant?: 'classic' | 'modern', documents?: any[] }) {
    const themeColor = getThemeColor(variant);
    const displayDocs = documents.length > 0 ? documents : LATEST_DOCS;

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-widest mb-1" style={{ color: themeColor }}>Terkini</p>
                        <h2 className="text-3xl font-bold text-[#1e293b]">Produk Hukum Terbaru</h2>
                    </div>
                    <Link href="/peraturan-daerah" 
                        className={`hidden md:flex items-center gap-2 text-sm font-semibold transition-colors`}
                        style={{ color: themeColor }}
                    >
                        Lihat Semua <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
                <div className="space-y-4">
                    {displayDocs.map((doc, idx) => (
                        <div key={doc.id}
                            className={`flex flex-col sm:flex-row sm:items-center gap-4 p-5 border border-slate-200 rounded-lg transition-all group ${variant === 'modern' ? 'hover:border-[#003399] hover:bg-blue-50/30' : 'hover:border-[#0d9488] hover:bg-slate-50'}`}>
                            <div className="hidden sm:flex h-10 w-10 rounded bg-slate-100 items-center justify-center text-slate-400 font-bold shrink-0">
                                {String(idx + 1).padStart(2, '0')}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                    <TypeBadge type={doc.code || doc.type} variant={variant} />
                                    <span className="text-xs text-slate-400">{doc.date ? fmtDate(doc.date) : doc.year}</span>
                                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{doc.subject}</span>
                                </div>
                                <p className={`font-semibold text-[#1e293b] text-sm transition-colors leading-snug ${variant === 'modern' ? 'group-hover:text-[#003399]' : 'group-hover:text-[#0d9488]'}`}>
                                    {doc.number ? `${doc.type} Nomor ${doc.number} Tahun ${doc.year}` : doc.title} — {doc.number ? doc.title : ''}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <Link href={doc.href || `/${doc.slug}/${doc.id}`}
                                    className={`flex items-center gap-1.5 px-4 py-2 text-white text-xs font-bold rounded transition-colors ${variant === 'modern' ? 'bg-[#003399] hover:bg-blue-800' : 'bg-[#1e293b] hover:bg-slate-700'}`}>
                                    <Eye className="h-3.5 w-3.5" /> Detail
                                </Link>
                                <button className={`flex items-center gap-1.5 px-4 py-2 border border-slate-200 text-slate-600 text-xs font-bold rounded transition-colors ${variant === 'modern' ? 'hover:border-[#003399] hover:text-[#003399]' : 'hover:border-[#0d9488] hover:text-[#0d9488]'}`}>
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
function NewsSection({ news, variant = 'classic' }: { news: any[], variant?: 'classic' | 'modern' }) {
    const themeColor = getThemeColor(variant);
    
    return (
        <section className="py-16 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-widest mb-1" style={{ color: themeColor }}>Informasi</p>
                        <h2 className="text-3xl font-bold text-[#1e293b]">Berita &amp; Artikel</h2>
                    </div>
                    <Link href="/berita" 
                        className={`hidden md:flex items-center gap-2 text-sm font-semibold transition-colors`}
                        style={{ color: themeColor }}
                    >
                        Semua Berita <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {news.map((article) => (
                        <Link key={article.id} href={`/berita/${article.slug}`}
                            className={`group bg-white border border-slate-200 rounded-lg overflow-hidden transition-all ${variant === 'modern' ? 'hover:border-[#003399] hover:shadow-xl' : 'hover:border-[#0d9488] hover:shadow-md'}`}>
                            <div className="h-44 bg-[#1e293b] overflow-hidden">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    width={400}
                                    height={225}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                />
                            </div>
                            <div className="p-4">
                                <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${variant === 'modern' ? 'text-[#003399]' : 'text-[#0d9488]'}`}>{article.category}</span>
                                <p className={`font-semibold text-[#1e293b] text-sm mt-1 leading-snug transition-colors line-clamp-3 ${variant === 'modern' ? 'group-hover:text-[#003399]' : 'group-hover:text-[#0d9488]'}`}>
                                    {article.title}
                                </p>
                                <p className="text-xs text-slate-400 mt-3">{fmtDate(article.date)}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/* VIDEO                                                               */
/* ------------------------------------------------------------------ */
function VideoSection({ variant = 'classic' }: { variant?: 'classic' | 'modern' }) {
    const themeColor = getThemeColor(variant);
    const isModern = variant === 'modern';

    return (
        <section className={`py-16 transition-colors ${isModern ? 'bg-[#001a4d]' : 'bg-[#1e293b]'}`}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-widest mb-1" style={{ color: themeColor }}>Media</p>
                        <h2 className="text-3xl font-bold text-white">Video Terbaru</h2>
                    </div>
                    <Link href="/video" 
                        className={`flex items-center gap-2 text-sm font-semibold transition-colors`}
                        style={{ color: themeColor }}
                    >
                        Selengkapnya <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {VIDEOS.map((v) => (
                        <a key={v.id} href={v.href} target="_blank" rel="noreferrer"
                            className={`group border rounded-lg overflow-hidden transition-all ${isModern ? 'bg-[#002673] border-[#003399] hover:border-blue-400' : 'bg-slate-800 border-slate-700 hover:border-[#0d9488]'}`}>
                            <div className={`h-48 relative flex items-center justify-center overflow-hidden bg-slate-900`}>
                                <img 
                                    src={v.image} 
                                    alt={v.title} 
                                    width={400}
                                    height={225}
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className={`relative z-10 h-14 w-14 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl backdrop-blur-sm bg-white/20 border border-white/30`} style={{ color: themeColor }}>
                                    <Play className="h-6 w-6 text-white ml-1 fill-white" />
                                </div>
                            </div>
                            <div className="p-4 relative bg-inherit">
                                <p className={`text-white text-sm font-bold leading-snug transition-colors ${isModern ? 'group-hover:text-blue-300' : 'group-hover:text-[#0d9488]'}`}>{v.title}</p>
                                <span className="text-slate-400 text-[10px] uppercase font-black tracking-widest mt-2 block">Durasi {v.duration}</span>
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
function RelatedLinks({ variant = 'classic' }: { variant?: 'classic' | 'modern' }) {
    const themeColor = getThemeColor(variant);

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-10">
                    <p className="text-sm font-bold uppercase tracking-widest mb-1" style={{ color: themeColor }}>Tautan</p>
                    <h2 className="text-3xl font-bold text-[#1e293b]">Tautan Terkait</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {RELATED_LINKS.map((link) => (
                        <a key={link.label} href={link.href} target="_blank" rel="noreferrer"
                            className={`group flex items-center gap-4 p-4 border border-slate-200 rounded-lg transition-all ${variant === 'modern' ? 'hover:border-[#003399] hover:bg-blue-50/20' : 'hover:border-[#0d9488] hover:bg-slate-50'}`}>
                            <div className="h-10 w-10 bg-white rounded flex items-center justify-center shrink-0 border border-slate-100 p-1">
                                <img src={link.image} alt={link.label} width={40} height={40} className="h-full w-full object-contain" />
                            </div>
                            <span className={`font-semibold text-[#1e293b] text-sm transition-colors flex-1 ${variant === 'modern' ? 'group-hover:text-[#003399]' : 'group-hover:text-[#0d9488]'}`}>{link.label}</span>
                            <ExternalLink className={`h-4 w-4 text-slate-400 shrink-0 transition-colors ${variant === 'modern' ? 'group-hover:text-[#003399]' : 'group-hover:text-[#0d9488]'}`} />
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
function CTA({ variant = 'classic' }: { variant?: 'classic' | 'modern' }) {
    const isModern = variant === 'modern';
    const themeColor = getThemeColor(variant);
    
    return (
        <section className={`py-16 transition-colors ${isModern ? 'bg-[#002673]' : 'bg-[#0d9488]'}`}>
            <div className="max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Butuh Bantuan Terkait Informasi Hukum?</h2>
                <p className={`text-lg mb-8 max-w-xl mx-auto ${isModern ? 'text-blue-100' : 'text-teal-100'}`}>
                    Tim kami siap membantu memberikan informasi terkini mengenai regulasi di Kabupaten Banjarnegara.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <a href="tel:02865912218" className={`px-8 py-3.5 bg-white font-bold rounded hover:bg-slate-100 transition-colors flex items-center justify-center gap-2`} style={{ color: themeColor }}>
                        <Phone className="h-5 w-5" /> Hubungi Kami
                    </a>
                    <a href="mailto:hukum@banjarnegarakab.go.id" className={`px-8 py-3.5 bg-[#1e293b] text-white font-bold rounded hover:bg-slate-900 transition-colors flex items-center justify-center gap-2`}>
                        <Mail className="h-5 w-5" /> Kirim Email
                    </a>
                </div>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/* STATISTIK MINI (landing)                                             */
/* ------------------------------------------------------------------ */
const STAT_JENIS_MINI = [
    { name: 'Perda',   jumlah: 124 },
    { name: 'Perbup',  jumlah: 285 },
    { name: 'Kepbup',  jumlah: 412 },
    { name: 'SE',      jumlah: 84  },
    { name: 'NA',      jumlah: 9   },
    { name: 'Raperda', jumlah: 27  },
    { name: 'KSD',     jumlah: 62  },
    { name: 'Lainnya', jumlah: 98  },
];
const STAT_TAHUN_MINI = [
    { tahun: '2020', jumlah: 275 },
    { tahun: '2021', jumlah: 389 },
    { tahun: '2022', jumlah: 445 },
    { tahun: '2023', jumlah: 503 },
    { tahun: '2024', jumlah: 468 },
    { tahun: '2025', jumlah: 312 },
    { tahun: '2026', jumlah: 90  },
];

function CustomTip({ active, payload, label, variant = 'classic' }: any) {
    if (!active || !payload?.length) return null;
    const themeColor = getThemeColor(variant);
    return (
        <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs shadow">
            <p className="font-bold text-[#1e293b]">{label}</p>
            <p className="font-semibold" style={{ color: themeColor }}>{payload[0].value.toLocaleString('id-ID')} dok</p>
        </div>
    );
}

function StatistikSection({ variant = 'classic' }: { variant?: 'classic' | 'modern' }) {
    const themeColor = getThemeColor(variant);
    const isModern = variant === 'modern';

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-widest mb-1" style={{ color: themeColor }}>Data</p>
                        <h2 className="text-3xl font-bold text-[#1e293b]">Statistik Dokumen Hukum</h2>
                    </div>
                    <Link href="/statistik" 
                        className={`hidden md:flex items-center gap-2 text-sm font-semibold transition-colors`}
                        style={{ color: themeColor }}
                    >
                        Lihat Lengkap <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Bar chart per jenis */}
                    <div className={`bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm transition-all ${isModern ? 'hover:shadow-xl hover:shadow-blue-900/5 hover:border-blue-200' : ''}`}>
                        <div className="bg-[#1e293b] px-5 py-4">
                            <p className="text-white font-bold text-sm">Dokumen per Jenis Produk Hukum</p>
                            <p className="text-slate-400 text-xs">Jumlah dokumen dalam database JDIH</p>
                        </div>
                        <div className="p-5">
                            <ResponsiveContainer width="100%" height={220}>
                                <BarChart data={STAT_JENIS_MINI} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748b' }} />
                                    <YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
                                    <Tooltip content={<CustomTip variant={variant} />} />
                                    <Bar dataKey="jumlah" radius={[3, 3, 0, 0]}>
                                        {STAT_JENIS_MINI.map((_, i) => (
                                            <Cell key={i} fill={i % 2 === 0 ? themeColor : '#1e293b'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Line chart tren tahun */}
                    <div className={`bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm transition-all ${isModern ? 'hover:shadow-xl hover:shadow-blue-900/5 hover:border-blue-200' : ''}`}>
                        <div className={`px-5 py-4 transition-colors ${isModern ? 'bg-[#003399]' : 'bg-[#0d9488]'}`}>
                            <p className="text-white font-bold text-sm">Tren Produk Hukum per Tahun</p>
                            <p className={`text-xs ${isModern ? 'text-blue-100' : 'text-teal-100'}`}>Perkembangan 2020–2026</p>
                        </div>
                        <div className="p-5">
                            <ResponsiveContainer width="100%" height={220}>
                                <LineChart data={STAT_TAHUN_MINI} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                    <XAxis dataKey="tahun" tick={{ fontSize: 10, fill: '#64748b' }} />
                                    <YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
                                    <Tooltip content={<CustomTip variant={variant} />} />
                                    <Line
                                        type="monotone"
                                        dataKey="jumlah"
                                        stroke={themeColor}
                                        strokeWidth={2.5}
                                        dot={{ fill: themeColor, r: 4 }}
                                        activeDot={{ r: 6 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <Link href="/statistik"
                        className={`inline-flex items-center gap-2 px-6 py-3 border-2 font-bold text-sm rounded-lg transition-all ${isModern ? 'border-[#003399] text-[#003399] hover:bg-[#003399] hover:text-white' : 'border-[#0d9488] text-[#0d9488] hover:bg-[#0d9488] hover:text-white'}`}>
                        Lihat Statistik Lengkap <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

import MobileHome from './Mobile/Home';

/* ------------------------------------------------------------------ */
/* INFOGRAFIS                                                          */
/* ------------------------------------------------------------------ */
function InfografisSection({ items, variant = 'classic' }: { items: any[], variant?: 'classic' | 'modern' }) {
    const themeColor = getThemeColor(variant);
    
    if (!items.length) return null;

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-widest mb-1" style={{ color: themeColor }}>Visual</p>
                        <h2 className="text-3xl font-bold text-[#1e293b]">Infografis Hukum</h2>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {items.map((item) => (
                        <div key={item.id} 
                            className={`group relative aspect-square bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 transition-all ${variant === 'modern' ? 'hover:border-[#003399] hover:shadow-xl' : 'hover:border-[#0d9488] hover:shadow-md'}`}>
                            <img
                                src={item.image}
                                alt={item.title}
                                width={400}
                                height={400}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                loading="lazy"
                            />
                            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform">
                                <p className="text-white text-[10px] font-black uppercase tracking-widest leading-tight">
                                    {item.title}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/* PAGE                                                                */
/* ------------------------------------------------------------------ */
export default function Welcome({ 
    auth, 
    news = [], 
    banner = null, 
    isMobile = false, 
    infographics = [], 
    latestDocs = [], 
    counts = {},
    videos = [] 
}: PageProps & { 
    news?: any[], 
    banner?: any, 
    isMobile?: boolean, 
    infographics?: any[], 
    latestDocs?: any[], 
    counts?: any,
    videos?: any[]
}) {
    const totalCount = Object.values(counts).reduce((a, b) => (a as number) + (b as number), 0) as number;
    const activeModel = 'classic';

    const CATEGORIES_DYNAMIC = [
        { title: 'Peraturan Daerah',   code: 'PERDA',  icon: Scale,         count: counts['Peraturan Daerah'] || 0, href: '/peraturan-daerah',          color: '#0d9488' },
        { title: 'Peraturan Bupati',   code: 'PERBUP', icon: FileText,      count: counts['Peraturan Bupati'] || 0, href: '/peraturan-bupati',           color: '#1e293b' },
        { title: 'Keputusan Bupati',   code: 'KEPBUP', icon: Gavel,         count: counts['Keputusan Bupati'] || 0, href: '/keputusan-bupati',           color: '#0d9488' },
        { title: 'Surat Edaran',       code: 'SE',     icon: Megaphone,     count: counts['Surat Edaran'] || 0,   href: '/surat-edaran',              color: '#1e293b' },
        { title: 'Instruksi Bupati',   code: 'INBUP',  icon: ClipboardList, count: counts['Instruksi Bupati'] || 0,   href: '/instruksi-bupati',          color: '#0d9488' },
        { title: 'Monografi Hukum',    code: 'MONO',   icon: BookMarked,    count: counts['Monografi Hukum'] || 0,   href: '/naskah-akademik',           color: '#1e293b' },
        { title: 'Naskah Akademik',    code: 'NA',     icon: FileSearch,    count: counts['Naskah Akademik'] || 0,    href: '/naskah-akademik',           color: '#0d9488' },
        { title: 'Kerja Sama Daerah',  code: 'KSD',    icon: Handshake,     count: counts['Kerja Sama Daerah'] || 0,    href: '/kerja-sama-daerah',         color: '#1e293b' },
    ];

    const STATS_DYNAMIC = [
        { label: 'Total Dokumen',    value: totalCount.toLocaleString('id-ID'), icon: FileText },
        { label: 'Jenis Peraturan',  value: Object.keys(counts).length.toString(),     icon: Scale },
        { label: 'Tahun Dokumen',    value: '40+',    icon: Calendar },
        { label: 'Dilihat',          value: 'Tersedia', icon: Users },
    ];

    const handleSearch = (values: any) => {
        const JENIS_SLUG: Record<string, string> = {
            'Peraturan Daerah':            '/peraturan-daerah',
            'Peraturan Bupati':            '/peraturan-bupati',
            'Keputusan Bupati':            '/keputusan-bupati',
            'Instruksi Bupati':            '/instruksi-bupati',
            'Keputusan Sekretaris Daerah': '/keputusan-sekretaris-daerah',
            'Surat Edaran':                '/surat-edaran',
            'Naskah Akademik':             '/naskah-akademik',
            'Raperda':                     '/raperda',
            'Analisis & Evaluasi Hukum':   '/analisis-evaluasi-hukum',
            'RANHAM':                      '/ranham',
            'Risalah Rapat':               '/risalah-rapat',
            'Artikel Bidang Hukum':        '/artikel-bidang-hukum',
            'Propemperda':                 '/propemperda',
            'Katalog':                     '/katalog',
            'Putusan':                     '/putusan',
            'Kerja Sama Daerah':           '/kerja-sama-daerah',
        };
        const query = values.query || values.namaDokumen || '';
        const type = values.type || values.jenisDokumen || '';
        const base = JENIS_SLUG[type] ?? '/peraturan-daerah';
        const params = new URLSearchParams();
        if (query) params.set('namaDokumen', query);
        if (values.nomor)       params.set('nomor', values.nomor);
        if (values.tahun || values.year) params.set('tahun', values.tahun || values.year);
        if (values.status)      params.set('status', values.status);
        window.location.href = base + (params.toString() ? '?' + params.toString() : '');
    };

    if (isMobile) {
        return (
            <MobileHome 
                latestNews={news.map(n => ({
                    id: n.slug,
                    title: n.title,
                    thumbnail: n.image,
                    date: fmtDate(n.date)
                }))}
                infographics={infographics}
                stats={{
                    total: totalCount,
                    perda: counts['Peraturan Daerah'] || 0,
                    perbup: counts['Peraturan Bupati'] || 0
                }}
            />
        );
    }

    return (
        <PublicLayout user={auth?.user}>
            <Head>
                <title>JDIH Kabupaten Banjarnegara – Jaringan Dokumentasi & Informasi Hukum</title>
                <link rel="preload" as="image" href={banner?.image || '/images/hero.jpg'} fetchPriority="high" />
            </Head>
            
            <section>
                <div className="relative bg-cover bg-left-center bg-no-repeat" style={{ backgroundImage: `url('${banner?.image || '/images/hero.jpg'}')` }}>
                    <div className="absolute inset-0 bg-[#1e293b]/85" />
                    <div className="relative z-10 max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                        <div>
                            <div className="inline-block bg-[#0d9488] text-white text-xs font-bold px-4 py-1.5 rounded mb-6 tracking-widest uppercase">
                                Jaringan Dokumentasi &amp; Informasi Hukum
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
                                Portal Produk Hukum<br />
                                <span className="text-[#0d9488]">Kabupaten Banjarnegara</span>
                            </h1>
                            <p className="text-slate-300 text-base leading-relaxed mb-8 max-w-md">
                                Akses mudah ke database peraturan daerah, keputusan bupati, dan produk hukum lainnya secara transparan dan terkini.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                {STATS_DYNAMIC.map((s) => (
                                    <div key={s.label} className="flex items-center gap-3">
                                        <div className="h-10 w-10 bg-[#0d9488]/20 rounded-lg flex items-center justify-center shrink-0">
                                            <s.icon className="h-5 w-5 text-[#0d9488]" />
                                        </div>
                                        <div>
                                            <div className="text-xl font-bold text-white leading-none">{s.value}</div>
                                            <div className="text-xs text-slate-400">{s.label}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                            <div className="bg-[#1e293b] px-6 py-4 flex items-center gap-3">
                                <div className="h-8 w-8 bg-[#0d9488] rounded-lg flex items-center justify-center shrink-0">
                                    <Search className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm">Pencarian Dokumen Hukum</p>
                                    <p className="text-slate-400 text-xs">Temukan produk hukum Kab. Banjarnegara</p>
                                </div>
                            </div>
                            <div className="p-6">
                                <SearchForm mode="compact" onSearch={handleSearch} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Category Grid */}
            <section className="py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-end justify-between mb-10">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-widest mb-1 text-[#0d9488]">Database</p>
                            <h2 className="text-3xl font-bold text-[#1e293b]">Kategori Produk Hukum</h2>
                        </div>
                        <Link href="/peraturan-daerah" className="hidden md:flex items-center gap-2 text-sm font-semibold text-[#0d9488]">
                            Lihat Semua <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {CATEGORIES_DYNAMIC.map((cat) => (
                            <Link key={cat.code} href={cat.href} className="group flex items-center gap-4 p-5 bg-white border border-slate-200 rounded-lg transition-all hover:border-[#0d9488] hover:shadow-md">
                                <div className="h-12 w-12 rounded flex items-center justify-center shrink-0" style={{ backgroundColor: cat.color }}>
                                    <cat.icon className="h-6 w-6 text-white" />
                                </div>
                                <div className="min-w-0">
                                    <div className="font-bold text-[#1e293b] text-sm group-hover:text-[#0d9488] truncate">{cat.title}</div>
                                    <div className="text-slate-500 text-xs">{cat.count.toLocaleString('id-ID')} Dokumen</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <LatestDocuments documents={latestDocs} />
            
            {/* Statistics Mini */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <div className="mb-10">
                        <p className="text-sm font-bold uppercase tracking-widest mb-1 text-[#0d9488]">Statistik</p>
                        <h2 className="text-3xl font-bold text-[#1e293b]">Data Terintegrasi</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {STATS_DYNAMIC.map((s) => (
                            <div key={s.label}>
                                <div className="h-16 w-16 bg-[#0d9488]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <s.icon className="h-8 w-8 text-[#0d9488]" />
                                </div>
                                <div className="text-3xl font-bold text-[#1e293b] mb-1">{s.value}</div>
                                <div className="text-sm text-slate-500">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <NewsSection news={news} />
            <InfografisSection items={infographics} />
            
            {/* Video Section */}
            <section className="py-16 bg-[#1e293b]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-end justify-between mb-10">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-widest mb-1 text-[#0d9488]">Media</p>
                            <h2 className="text-3xl font-bold text-white">Video Terbaru</h2>
                        </div>
                        <Link href="/video" className="flex items-center gap-2 text-sm font-semibold text-[#0d9488]">
                            Selengkapnya <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {videos.map((v: any) => (
                            <a key={v.id} href={v.video_url} target="_blank" rel="noreferrer" className="group bg-slate-800 border border-slate-700 rounded-lg overflow-hidden hover:border-[#0d9488] transition-all">
                                <div className="h-48 relative flex items-center justify-center overflow-hidden bg-slate-900">
                                    <img 
                                        src={v.thumbnail_path ? `/images/${v.thumbnail_path}` : '/images/video-placeholder.png'} 
                                        alt={v.title} 
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1e293b] to-transparent opacity-60" />
                                    <div className="relative z-10 h-14 w-14 rounded-full flex items-center justify-center bg-white/20 border border-white/30 backdrop-blur-sm group-hover:scale-110 transition-transform">
                                        <Play className="h-6 w-6 text-white ml-1 fill-white" />
                                    </div>
                                </div>
                                <div className="p-4">
                                    <p className="text-white text-sm font-bold group-hover:text-[#0d9488] transition-colors line-clamp-2">{v.title}</p>
                                    <span className="text-slate-400 text-[10px] uppercase font-black tracking-widest mt-2 block">Video Informasi</span>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            <RelatedLinks />
            <CTA />
        </PublicLayout>
    );
}
