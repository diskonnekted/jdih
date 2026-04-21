import React from 'react';
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

const NEWS = [
    { id: 1, slug: 'infografis-perda-8-2025',      title: 'Infografis Peraturan Daerah Nomor 8 Tahun 2025 Tentang Pajak Daerah Dan Retribusi Daerah', date: '2025-12-15', category: 'Infografis' },
    { id: 2, slug: 'study-referensi-temanggung',    title: 'Study Referensi Pelaksanaan Tugas Pada Bagian Hukum Sekretariat Daerah Kabupaten Temanggung', date: '2025-11-20', category: 'Kegiatan' },
    { id: 3, slug: 'penandatanganan-mou-kejaksaan', title: 'Penandatanganan MOU Dengan Kejaksaan Negeri Terkait Pelaksanaan Pidana Kerja Sosial', date: '2025-10-05', category: 'Kerja Sama' },
    { id: 4, slug: 'forum-satu-data-banjarnegara',  title: 'Forum Satu Data Indonesia Kabupaten Banjarnegara "Perencanaan Berbasis Data"', date: '2025-09-18', category: 'Forum' },
];

const STATS = [
    { label: 'Total Dokumen',    value: '9.645+', icon: FileText },
    { label: 'Jenis Peraturan',  value: '24',     icon: Scale },
    { label: 'Tahun Dokumen',    value: '40+',    icon: Calendar },
    { label: 'Pengunjung/Bulan', value: '15.000+',icon: Users },
];

const RELATED_LINKS = [
    { label: 'Pemerintah Kab. Banjarnegara', href: 'http://banjarnegarakab.go.id', icon: Building2 },
    { label: 'Kemendagri RI',                href: 'http://www.kemendagri.go.id',  icon: Landmark },
    { label: 'Kementerian Setneg RI',        href: 'https://www.setneg.go.id',     icon: Shield },
    { label: 'JDIHN',                        href: 'https://www.jdihn.go.id',      icon: Globe },
    { label: 'JDIH DPRD Banjarnegara',       href: 'http://jdih.dprd.jatengprov.go.id', icon: Users },
    { label: 'BPHN Kemenkumham RI',          href: 'http://www.bphn.go.id',        icon: BookOpen },
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

const TYPE_COLORS: Record<string, string> = {
    PERDA: '#0d9488', PERBUP: '#1e293b', KEPBUP: '#f59e0b', SE: '#6366f1', INBUP: '#ec4899',
};

function TypeBadge({ type }: { type: string }) {
    return (
        <span className="text-xs font-bold px-2 py-0.5 rounded text-white tracking-wider"
            style={{ backgroundColor: TYPE_COLORS[type] ?? '#0d9488' }}>
            {type}
        </span>
    );
}

/* ------------------------------------------------------------------ */
/* HERO  –  2-column split layout                                      */
/* ------------------------------------------------------------------ */
function Hero() {
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
        if (values.namaDokumen) params.set('q', values.namaDokumen);
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
                style={{ backgroundImage: "url('/images/hero.webp')" }}
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
function CategoryGrid() {
    return (
        <section className="py-16 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <p className="text-[#0d9488] text-sm font-bold uppercase tracking-widest mb-1">Database</p>
                        <h2 className="text-3xl font-bold text-[#1e293b]">Kategori Produk Hukum</h2>
                    </div>
                    <Link href="/peraturan-daerah" className="hidden md:flex items-center gap-2 text-sm font-semibold text-[#0d9488] hover:text-teal-700 transition-colors">
                        Lihat Semua <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {CATEGORIES.map((cat) => (
                        <Link key={cat.code} href={cat.href}
                            className="group flex items-center gap-4 p-5 bg-white border border-slate-200 rounded-lg hover:border-[#0d9488] hover:shadow-md transition-all">
                            <div className="h-12 w-12 rounded flex items-center justify-center shrink-0" style={{ backgroundColor: cat.color }}>
                                <cat.icon className="h-6 w-6 text-white" />
                            </div>
                            <div className="min-w-0">
                                <div className="font-bold text-[#1e293b] text-sm group-hover:text-[#0d9488] transition-colors truncate">{cat.title}</div>
                                <div className="text-slate-500 text-xs">{cat.count} Dokumen</div>
                            </div>
                        </Link>
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
                    <Link href="/peraturan-daerah" className="hidden md:flex items-center gap-2 text-sm font-semibold text-[#0d9488] hover:text-teal-700 transition-colors">
                        Lihat Semua <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
                <div className="space-y-4">
                    {LATEST_DOCS.map((doc, idx) => (
                        <div key={doc.id}
                            className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 border border-slate-200 rounded-lg hover:border-[#0d9488] hover:bg-slate-50 transition-all group">
                            <div className="hidden sm:flex h-10 w-10 rounded bg-slate-100 items-center justify-center text-slate-400 font-bold shrink-0">
                                {String(idx + 1).padStart(2, '0')}
                            </div>
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
                            <div className="flex items-center gap-2 shrink-0">
                                <Link href={doc.href}
                                    className="flex items-center gap-1.5 px-4 py-2 bg-[#1e293b] text-white text-xs font-bold rounded hover:bg-slate-700 transition-colors">
                                    <Eye className="h-3.5 w-3.5" /> Detail
                                </Link>
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
                        <h2 className="text-3xl font-bold text-[#1e293b]">Berita &amp; Artikel</h2>
                    </div>
                    <Link href="/berita" className="hidden md:flex items-center gap-2 text-sm font-semibold text-[#0d9488] hover:text-teal-700 transition-colors">
                        Semua Berita <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {NEWS.map((article) => (
                        <Link key={article.id} href={`/berita/${article.slug}`}
                            className="group bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-[#0d9488] hover:shadow-md transition-all">
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
function VideoSection() {
    return (
        <section className="py-16 bg-[#1e293b]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <p className="text-[#0d9488] text-sm font-bold uppercase tracking-widest mb-1">Media</p>
                        <h2 className="text-3xl font-bold text-white">Video Terbaru</h2>
                    </div>
                    <Link href="/video" className="flex items-center gap-2 text-sm font-semibold text-[#0d9488] hover:text-teal-300 transition-colors">
                        Selengkapnya <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {VIDEOS.map((v) => (
                        <a key={v.id} href={v.href} target="_blank" rel="noreferrer"
                            className="group bg-slate-800 border border-slate-700 rounded-lg overflow-hidden hover:border-[#0d9488] transition-all">
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

function CustomTip({ active, payload, label }: any) {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs shadow">
            <p className="font-bold text-[#1e293b]">{label}</p>
            <p className="text-[#0d9488] font-semibold">{payload[0].value.toLocaleString('id-ID')} dok</p>
        </div>
    );
}

function StatistikSection() {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <p className="text-[#0d9488] text-sm font-bold uppercase tracking-widest mb-1">Data</p>
                        <h2 className="text-3xl font-bold text-[#1e293b]">Statistik Dokumen Hukum</h2>
                    </div>
                    <Link href="/statistik" className="hidden md:flex items-center gap-2 text-sm font-semibold text-[#0d9488] hover:text-teal-700 transition-colors">
                        Lihat Lengkap <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Bar chart per jenis */}
                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
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
                                    <Tooltip content={<CustomTip />} />
                                    <Bar dataKey="jumlah" radius={[3, 3, 0, 0]}>
                                        {STAT_JENIS_MINI.map((_, i) => (
                                            <Cell key={i} fill={i % 2 === 0 ? '#0d9488' : '#1e293b'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Line chart tren tahun */}
                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                        <div className="bg-[#0d9488] px-5 py-4">
                            <p className="text-white font-bold text-sm">Tren Produk Hukum per Tahun</p>
                            <p className="text-teal-100 text-xs">Perkembangan 2020–2026</p>
                        </div>
                        <div className="p-5">
                            <ResponsiveContainer width="100%" height={220}>
                                <LineChart data={STAT_TAHUN_MINI} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                    <XAxis dataKey="tahun" tick={{ fontSize: 10, fill: '#64748b' }} />
                                    <YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
                                    <Tooltip content={<CustomTip />} />
                                    <Line
                                        type="monotone"
                                        dataKey="jumlah"
                                        stroke="#0d9488"
                                        strokeWidth={2.5}
                                        dot={{ fill: '#0d9488', r: 4 }}
                                        activeDot={{ r: 6 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <Link href="/statistik"
                        className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#0d9488] text-[#0d9488] font-bold text-sm rounded-lg hover:bg-[#0d9488] hover:text-white transition-all">
                        Lihat Statistik Lengkap <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/* PAGE                                                                */
/* ------------------------------------------------------------------ */
export default function Welcome({ auth }: PageProps) {
    return (
        <PublicLayout user={auth?.user}>
            <Head title="JDIH Kabupaten Banjarnegara – Jaringan Dokumentasi & Informasi Hukum" />
            <Hero />
            <CategoryGrid />
            <LatestDocuments />
            <StatistikSection />
            <NewsSection />
            <VideoSection />
            <RelatedLinks />
            <CTA />
        </PublicLayout>
    );
}
