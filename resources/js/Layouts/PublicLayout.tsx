import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import {
    ChevronDown, Menu, X, Phone, Mail, MapPin,
    ExternalLink, Building2, Globe, Shield, Landmark, BookOpen, Users
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
    { label: 'Pemerintah Kab. Banjarnegara', href: 'http://banjarnegarakab.go.id', icon: Building2 },
    { label: 'Kemendagri RI', href: 'http://www.kemendagri.go.id', icon: Landmark },
    { label: 'Kementerian Setneg RI', href: 'https://www.setneg.go.id', icon: Shield },
    { label: 'JDIHN', href: 'https://www.jdihn.go.id', icon: Globe },
    { label: 'JDIH DPRD Banjarnegara', href: 'http://jdih.dprd.jatengprov.go.id', icon: Users },
    { label: 'BPHN Kemenkumham RI', href: 'http://www.bphn.go.id', icon: BookOpen },
];

/* ------------------------------------------------------------------ */
/* NAVBAR                                                              */
/* ------------------------------------------------------------------ */
function Navbar({ user }: { user?: any }) {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full z-50 bg-[#1e293b] shadow-lg">
            {/* Top bar */}
            <div className="bg-[#0d9488] text-white text-xs py-1.5 px-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <span className="hidden sm:block">Bagian Hukum Sekretariat Daerah Kabupaten Banjarnegara</span>
                    <span>Telp. (0286) 591218 · hukum@banjarnegarakab.go.id</span>
                </div>
            </div>

            {/* Main nav */}
            <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
                {/* Logo only */}
                <Link href="/" className="flex items-center shrink-0">
                    <img src="/images/logo.png" alt="Logo JDIH Banjarnegara" className="h-10 w-auto object-contain" />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-0.5 text-sm font-medium">
                    {NAV_ITEMS.map((item) => (
                        <div key={item.label} className="relative group">
                            {item.children ? (
                                <button className="flex items-center gap-1 px-3 py-2 text-slate-200 hover:text-white hover:bg-white/10 rounded transition-colors whitespace-nowrap">
                                    {item.label} <ChevronDown className="h-3 w-3 shrink-0" />
                                </button>
                            ) : (
                                <Link href={(item as any).href} className="flex items-center px-3 py-2 text-slate-200 hover:text-white hover:bg-white/10 rounded transition-colors whitespace-nowrap">
                                    {item.label}
                                </Link>
                            )}
                            {item.children && (
                                <div className="absolute top-full left-0 mt-0 w-60 bg-white border border-slate-200 shadow-xl rounded-b overflow-hidden opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-50">
                                    {item.children.map((child) => (
                                        <Link key={child.label} href={child.href}
                                            className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-[#0d9488] hover:text-white transition-colors border-b border-slate-50 last:border-0">
                                            {child.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    <a href="/admin" className="ml-2 px-3 py-2 bg-[#0d9488] text-white rounded font-semibold hover:bg-teal-600 transition-colors text-xs whitespace-nowrap">
                        Admin
                    </a>
                </div>

                {/* Mobile toggle */}
                <button className="lg:hidden text-white p-1" onClick={() => setMobileOpen(!mobileOpen)}>
                    {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="lg:hidden bg-[#1a2332] border-t border-white/10 px-4 py-3 max-h-[70vh] overflow-y-auto">
                    {NAV_ITEMS.map((item) => (
                        <div key={item.label} className="border-b border-white/5 last:border-0">
                            {item.children ? (
                                <>
                                    <div className="py-2 text-slate-300 font-medium text-sm">{item.label}</div>
                                    {item.children.map((child) => (
                                        <Link key={child.label} href={child.href}
                                            className="block pl-4 py-1.5 text-slate-400 hover:text-[#0d9488] text-sm transition-colors"
                                            onClick={() => setMobileOpen(false)}>
                                            {child.label}
                                        </Link>
                                    ))}
                                </>
                            ) : (
                                <Link href={(item as any).href}
                                    className="block py-2 text-slate-300 hover:text-[#0d9488] font-medium text-sm transition-colors"
                                    onClick={() => setMobileOpen(false)}>
                                    {item.label}
                                </Link>
                            )}
                        </div>
                    ))}
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
                            <img src="/images/logo.png" alt="Logo JDIH Banjarnegara" className="h-14 w-auto object-contain" />
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
                                <link.icon className="h-3.5 w-3.5" />
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
}

export default function PublicLayout({ children, user }: PublicLayoutProps) {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar user={user} />
            {/* Offset for fixed navbar (top bar 28px + main nav 56px = 84px) */}
            <div className="pt-[84px] flex-1">
                {children}
            </div>
            <Footer />
        </div>
    );
}
