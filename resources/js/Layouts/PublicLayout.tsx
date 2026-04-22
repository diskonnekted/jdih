import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import {
    ChevronDown, Menu, X, Phone, Mail, MapPin,
    ExternalLink, Building2, Globe, Shield, Landmark, BookOpen, Users,
    Scale, Search
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* NAVIGATION DATA                                                      */
/* ------------------------------------------------------------------ */
const NAV_ITEMS = [
    {
        label: 'Profil Kami',
        children: [
            { label: 'Visi Misi', href: '/visi-misi' },
            { label: 'Dasar Hukum', href: '/dasar-hukum' },
            { label: 'Struktur Organisasi', href: '/struktur-organisasi' },
            { label: 'Tupoksi Bagian Hukum', href: '/tupoksi-bag-hukum' },
            { label: 'Anggota JDIH Banjarnegara', href: '/anggota-jdih' },
            { label: 'Kedudukan dan Alamat', href: '/kedudukan-dan-alamat' },
            { label: 'SOP', href: '/sop' },
        ]
    },
    {
        label: 'Peraturan Per-UU',
        children: [
            { label: 'Peraturan Daerah', href: '/peraturan-daerah' },
            { label: 'Peraturan Bupati', href: '/peraturan-bupati' },
            { label: 'Keputusan Bupati', href: '/keputusan-bupati' },
            { label: 'Instruksi Bupati', href: '/instruksi-bupati' },
            { label: 'Keputusan Sekretaris Daerah', href: '/keputusan-sekretaris-daerah' },
            { label: 'Dokumen Hukum Terjemahan', href: '/dokumen-hukum-terjemahan' },
            { label: 'Dokumen Hukum Langka', href: '/dokumen-hukum-langka' },
            { label: 'Propemperda', href: '/propemperda' },
            { label: 'Katalog', href: '/katalog' },
            { label: 'Peraturan Pusat ↗', href: 'https://jdihn.go.id/' },
            { label: 'Produk Hukum Desa', href: '/produk-hukum-desa' },
        ]
    },
    {
        label: 'Monografi Hukum',
        children: [
            { label: 'Naskah Akademik', href: '/naskah-akademik' },
            { label: 'Raperda', href: '/raperda' },
            { label: 'Analisis & Evaluasi Hukum', href: '/analisis-evaluasi-hukum' },
            { label: 'RANHAM', href: '/ranham' },
            { label: 'Risalah Rapat', href: '/risalah-rapat' },
            { label: 'Artikel Bidang Hukum', href: '/artikel-bidang-hukum' },
        ]
    },
    {
        label: 'Informasi',
        children: [
            { label: 'Berita', href: '/berita' },
            { label: 'Download', href: '/unduh' },
            { label: 'Galeri', href: '/galeri' },
            { label: 'Video', href: '/video' },
        ]
    },
    { label: 'Putusan', href: '/putusan' },
    { label: 'Kerja Sama Daerah', href: '/kerja-sama-daerah' },
];

const FOOTER_LINKS = [
    { label: 'Pemerintah Kab. Banjarnegara', href: 'http://banjarnegarakab.go.id', image: '/images/pemerintah kab .png' },
    { label: 'Kemendagri RI', href: 'http://www.kemendagri.go.id', image: '/images/kemendagri.png' },
    { label: 'Kementerian Setneg RI', href: 'https://www.setneg.go.id', image: '/images/setneg.png' },
    { label: 'JDIHN', href: 'https://www.jdihn.go.id', image: '/images/jdihn.png' },
    { label: 'JDIH DPRD Provinsi Jawa Tengah', href: 'http://jdih.dprd.jatengprov.go.id', image: '/images/jdih dprd.svg' },
    { label: 'BPHN Kemenkumham RI', href: 'http://www.bphn.go.id', image: '/images/bphn.png' },
];

/* ------------------------------------------------------------------ */
/* NAVBAR                                                              */
/* ------------------------------------------------------------------ */
function Navbar({ user, variant = 'classic' }: { user?: any; variant?: 'classic' | 'modern' }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const isModern = variant === 'modern';

    return (
        <nav className={`fixed top-0 w-full z-50 shadow-lg transition-colors duration-300 ${isModern ? 'bg-white border-b border-slate-200' : 'bg-[#1e293b]'}`}>
            {/* Top bar */}
            <div className={`${isModern ? 'bg-[#003399]' : 'bg-[#0d9488]'} text-white text-[10px] font-medium py-1.5 px-6 leading-none`}>
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <span className="hidden sm:block">Bagian Hukum Sekretariat Daerah Kabupaten Banjarnegara</span>
                        <span className="opacity-40">•</span>
                        <span>Senin – Jumat, 07.30 – 15.30 WIB</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <span className="hidden md:block">hukum@banjarnegarakab.go.id</span>
                        <div className="flex items-center gap-4">
                            <Link href="#" className="hover:text-teal-200 transition-colors">Aksesibilitas</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main nav */}
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo & Brand */}
                <Link href="/" className="flex items-center gap-3 shrink-0 group">
                    <div className="bg-[#003366] p-2 rounded shadow-sm group-hover:scale-105 transition-transform">
                        <Scale className="h-6 w-6 text-white" />
                    </div>
                    <div className="hidden sm:block">
                        <h2 className={`font-bold text-base leading-tight ${isModern ? 'text-[#003399]' : 'text-white'}`}>JDIH Banjarnegara</h2>
                        <p className={`text-[9px] uppercase tracking-widest font-semibold opacity-60 ${isModern ? 'text-[#003399]' : 'text-slate-400'}`}>Jaringan Dokumentasi Hukum</p>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-1 text-sm font-medium">
                    {NAV_ITEMS.slice(0, 6).map((item) => (
                        <div key={item.label} className="relative group/nav">
                            {item.children ? (
                                <button className={`flex items-center gap-1.5 px-4 py-2 rounded-full transition-all whitespace-nowrap ${
                                    isModern 
                                    ? 'text-slate-600 hover:text-[#003399] hover:bg-slate-50' 
                                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                                }`}>
                                    {item.label} <ChevronDown className={`h-3.5 w-3.5 transition-transform group-hover/nav:rotate-180 ${isModern ? 'text-slate-400' : 'text-slate-500'}`} />
                                </button>
                            ) : (
                                <Link href={(item as any).href} className={`flex items-center px-4 py-2 rounded-full transition-all whitespace-nowrap ${
                                    isModern 
                                    ? 'text-slate-600 hover:text-[#003399] hover:bg-slate-50' 
                                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                                }`}>
                                    {item.label}
                                </Link>
                            )}
                            {item.children && (
                                <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-100 shadow-2xl rounded-xl overflow-hidden opacity-0 group-hover/nav:opacity-100 pointer-events-none group-hover/nav:pointer-events-auto transition-all translate-y-2 group-hover/nav:translate-y-0 z-50">
                                    <div className="p-2 grid grid-cols-1">
                                        {item.children.map((child) => (
                                            <Link key={child.label} href={child.href}
                                                className="flex items-center px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-[#003399] rounded-lg transition-colors font-medium">
                                                {child.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    
                    {/* Modern Action Button */}
                    <Link 
                        href="/katalog" 
                        className={`ml-4 flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow-lg active:scale-95 ${
                            isModern 
                            ? 'bg-[#003399] text-white hover:bg-blue-800 shadow-blue-900/20' 
                            : 'bg-[#0d9488] text-white hover:bg-teal-600 shadow-teal-900/20'
                        }`}
                    >
                        <Search className="h-4 w-4" />
                        Cari Dokumen
                    </Link>

                    {/* Admin button removed from navbar in classic theme per user request */}
                </div>

                {/* Mobile toggle */}
                <button className={`lg:hidden p-2 rounded-lg ${isModern ? 'text-slate-600 hover:bg-slate-100' : 'text-white hover:bg-white/10'}`} onClick={() => setMobileOpen(!mobileOpen)}>
                    {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className={`lg:hidden border-t px-4 py-4 max-h-[75vh] overflow-y-auto ${isModern ? 'bg-white border-slate-100' : 'bg-[#1a2332] border-white/10'}`}>
                    {NAV_ITEMS.map((item) => (
                        <div key={item.label} className="mb-2">
                            {item.children ? (
                                <div className="space-y-1">
                                    <div className={`px-4 py-2 font-bold text-sm tracking-wide ${isModern ? 'text-slate-900' : 'text-slate-200'}`}>{item.label}</div>
                                    <div className="grid grid-cols-1 gap-1">
                                        {item.children.map((child) => (
                                            <Link key={child.label} href={child.href}
                                                className={`block pl-8 pr-4 py-2 rounded-lg text-sm transition-colors ${
                                                    isModern ? 'text-slate-600 hover:bg-slate-50' : 'text-slate-400 hover:bg-white/5'
                                                }`}
                                                onClick={() => setMobileOpen(false)}>
                                                {child.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <Link href={(item as any).href}
                                    className={`block px-4 py-2 rounded-lg font-bold text-sm transition-colors ${
                                        isModern ? 'text-slate-900 hover:bg-slate-50' : 'text-slate-200 hover:bg-white/5'
                                    }`}
                                    onClick={() => setMobileOpen(false)}>
                                    {item.label}
                                </Link>
                            )}
                        </div>
                    ))}
                    <div className="mt-6 pt-6 border-t border-slate-100">
                        <Link href="/katalog" className="block w-full py-3 bg-[#003399] text-white text-center rounded-xl font-bold shadow-xl">
                            Cari Dokumen
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}

/* ------------------------------------------------------------------ */
/* FOOTER                                                              */
/* ------------------------------------------------------------------ */
function Footer() {
    const HUKUM_LINKS = [
        ['Peraturan Daerah', '/peraturan-daerah'],
        ['Peraturan Bupati', '/peraturan-bupati'],
        ['Keputusan Bupati', '/keputusan-bupati'],
        ['Surat Edaran', '/surat-edaran'],
        ['Instruksi Bupati', '/instruksi-bupati'],
        ['Naskah Akademik', '/naskah-akademik'],
        ['Putusan', '/putusan'],
        ['Katalog', '/katalog'],
    ];

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
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10 pb-10 border-b border-slate-700">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <Link href="/" className="inline-block mb-4">
                            <img src="/images/logo-jdih.png" alt="Logo JDIH Banjarnegara" className="h-14 w-auto object-contain" />
                        </Link>
                        <p className="text-sm leading-relaxed mb-5 max-w-sm">
                            Jaringan Dokumentasi dan Informasi Hukum Kabupaten Banjarnegara – wadah pendayagunaan bersama atas dokumen hukum secara tertib, terpadu dan berkesinambungan.
                        </p>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 text-[#0d9488] shrink-0 mt-0.5" />
                                <span>Jl. Ahmad Yani No. 16, Krandegan, Banjarnegara</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-[#0d9488] shrink-0" />
                                <span>Telp. (0286) 591218</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-[#0d9488] shrink-0" />
                                <span>hukum@banjarnegarakab.go.id</span>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-5">
                            <a href="https://www.tiktok.com/@jdih_banjarnegara" target="_blank" rel="noreferrer"
                                className="px-3 py-1.5 text-xs border border-slate-600 rounded hover:border-[#0d9488] hover:text-[#0d9488] transition-colors">
                                TikTok
                            </a>
                            <a href="https://www.instagram.com/jdih_banjarnegara/" target="_blank" rel="noreferrer"
                                className="px-3 py-1.5 text-xs border border-slate-600 rounded hover:border-[#0d9488] hover:text-[#0d9488] transition-colors">
                                Instagram
                            </a>
                        </div>
                    </div>

                    {/* Produk Hukum */}
                    <div>
                        <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Produk Hukum</h4>
                        <ul className="space-y-2 text-sm">
                            {HUKUM_LINKS.map(([label, href]) => (
                                <li key={label}>
                                    <Link href={href} className="hover:text-[#0d9488] transition-colors">{label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Website OPD */}
                    <div>
                        <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Website OPD</h4>
                        <ul className="space-y-2 text-sm">
                            {OPD_LINKS.map(([label, href]) => (
                                <li key={label}>
                                    <a href={href} target="_blank" rel="noreferrer"
                                        className="hover:text-[#0d9488] transition-colors flex items-center gap-1">
                                        {label} <ExternalLink className="h-3 w-3 opacity-40" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Tautan Terkait */}
                <div className="mb-8">
                    <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Tautan Terkait</h4>
                    <div className="flex flex-wrap gap-3">
                        {FOOTER_LINKS.map((link) => (
                            <a key={link.label} href={link.href} target="_blank" rel="noreferrer"
                                className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-slate-700 rounded text-xs hover:border-[#0d9488] hover:text-[#0d9488] transition-colors">
                                <img src={link.image} alt={link.label} className="h-4 w-4 object-contain" />
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="border-t border-slate-700 pt-5 flex flex-col md:flex-row justify-between items-center gap-3 text-xs">
                    <p>© 2025 Sekretariat Daerah Kabupaten Banjarnegara. Hak cipta dilindungi.</p>
                    <div className="flex gap-4">
                        <Link href="#" className="hover:text-white transition-colors">Disclaimer</Link>
                        <Link href="#" className="hover:text-white transition-colors">Sitemap</Link>
                        <a href="/admin" className="hover:text-white transition-colors">Admin Panel</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

/* ------------------------------------------------------------------ */
/* PUBLIC LAYOUT                                                       */
/* ------------------------------------------------------------------ */
interface PublicLayoutProps {
    children: React.ReactNode;
    user?: any;
    variant?: 'classic' | 'modern';
}

export default function PublicLayout({ children, user, variant = 'classic' }: PublicLayoutProps) {
    const isModern = variant === 'modern';
    
    return (
        <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isModern ? 'bg-white' : 'bg-white'}`}>
            <Navbar user={user} variant={variant} />
            {/* Offset for fixed navbar (top bar approx 28px + main nav approx 56-64px) */}
            <div className={`${isModern ? 'pt-[92px]' : 'pt-[84px]'} flex-1`}>
                {children}
            </div>
            <Footer />
        </div>
    );
}
