import React from 'react';
import MobileLayout from '@/Layouts/MobileLayout';
import { Head } from '@inertiajs/react';
import { MapPin, Phone, Mail, ExternalLink, Scale, Globe, Clock, ChevronRight, Building2, Users } from 'lucide-react';

export default function InfoJdih() {
    const links = [
        { label: 'JDIHN Nasional',       href: 'https://www.jdihn.go.id',                    icon: Globe },
        { label: 'JDIH Prov. Jateng',    href: 'https://jdih.jatengprov.go.id/',              icon: Globe },
        { label: 'Pemkab Banjarnegara',  href: 'http://banjarnegarakab.go.id',                icon: Building2 },
        { label: 'Sekretariat Daerah',   href: 'https://setda.banjarnegarakab.go.id',         icon: Building2 },
        { label: 'DPRD Banjarnegara',    href: 'https://dprd.banjarnegarakab.go.id',          icon: Users },
        { label: 'Kemendagri RI',        href: 'http://www.kemendagri.go.id',                 icon: Globe },
    ];

    const menuItems = [
        { label: 'Visi & Misi',            href: '/visi-misi' },
        { label: 'Dasar Hukum',            href: '/dasar-hukum' },
        { label: 'Struktur Organisasi',    href: '/struktur-organisasi' },
        { label: 'Tupoksi Bagian Hukum',   href: '/tupoksi-bag-hukum' },
        { label: 'Anggota JDIH',           href: '/anggota-jdih' },
        { label: 'Kedudukan & Alamat',     href: '/kedudukan-dan-alamat' },
        { label: 'SOP',                    href: '/sop' },
    ];

    return (
        <MobileLayout>
            <Head title="Informasi JDIH — Banjarnegara" />

            {/* Hero */}
            <div className="px-5 pt-6 pb-4">
                <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-[2rem] p-6 text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <Scale className="h-32 w-32" />
                    </div>
                    <div className="relative z-10 flex items-center gap-4 mb-6">
                        <div className="h-16 w-16 rounded-2xl bg-[#0d9488] flex items-center justify-center shadow-lg shrink-0">
                            <img src="/logo_jdih.png" alt="JDIH" className="h-12 w-12 object-contain" onError={e => { (e.target as HTMLImageElement).style.display='none'; }} />
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-teal-400 uppercase tracking-widest">Kabupaten Banjarnegara</p>
                            <h1 className="text-lg font-black text-white leading-tight">JDIH</h1>
                            <p className="text-[10px] font-bold text-slate-400 mt-0.5">Jaringan Dokumentasi & Informasi Hukum</p>
                        </div>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                        Wadah pendayagunaan bersama atas dokumen hukum secara tertib, terpadu, dan berkesinambungan di lingkungan Pemerintah Kabupaten Banjarnegara.
                    </p>
                    <div className="flex items-center gap-2 mt-4">
                        <Clock className="h-3.5 w-3.5 text-teal-400 shrink-0" />
                        <span className="text-[10px] font-bold text-slate-400">Senin – Jumat, 08.00 – 15.00 WIB</span>
                    </div>
                </div>
            </div>

            {/* Linktree CTA */}
            <div className="px-5 pb-4">
                <a href="https://linktr.ee/PUUBAGIANHUKUMBNA" target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-between w-full p-5 bg-[#0d9488] text-white rounded-[2rem] shadow-lg shadow-teal-900/20 active:scale-[0.98] transition-all">
                    <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-teal-100 mb-1">Semua Link Penting</p>
                        <p className="text-base font-black">Linktree JDIH Banjarnegara</p>
                        <p className="text-[10px] text-teal-100 mt-0.5">linktr.ee/PUUBAGIANHUKUMBNA</p>
                    </div>
                    <div className="h-12 w-12 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center shrink-0">
                        <ExternalLink className="h-5 w-5 text-white" />
                    </div>
                </a>
            </div>

            {/* Kontak */}
            <div className="px-5 pb-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Kontak</p>
                <div className="bg-white border border-slate-100 rounded-3xl divide-y divide-slate-50 shadow-sm overflow-hidden">
                    <div className="flex items-center gap-4 p-4">
                        <div className="h-10 w-10 rounded-2xl bg-teal-50 flex items-center justify-center shrink-0">
                            <MapPin className="h-5 w-5 text-[#0d9488]" />
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Alamat</p>
                            <p className="text-sm font-bold text-slate-800 leading-snug">Jl. Ahmad Yani No. 16, Krandegan, Banjarnegara</p>
                        </div>
                    </div>
                    <a href="tel:02865912181" className="flex items-center gap-4 p-4 active:bg-slate-50 transition-all">
                        <div className="h-10 w-10 rounded-2xl bg-teal-50 flex items-center justify-center shrink-0">
                            <Phone className="h-5 w-5 text-[#0d9488]" />
                        </div>
                        <div className="flex-1">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Telepon</p>
                            <p className="text-sm font-bold text-slate-800">(0286) 591218</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-300" />
                    </a>
                    <a href="mailto:jdihbanjarnegara@gmail.com" className="flex items-center gap-4 p-4 active:bg-slate-50 transition-all">
                        <div className="h-10 w-10 rounded-2xl bg-teal-50 flex items-center justify-center shrink-0">
                            <Mail className="h-5 w-5 text-[#0d9488]" />
                        </div>
                        <div className="flex-1">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Email</p>
                            <p className="text-sm font-bold text-slate-800">jdihbanjarnegara@gmail.com</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-300" />
                    </a>
                </div>
            </div>

            {/* Maps */}
            <div className="px-5 pb-4">
                <div className="rounded-3xl overflow-hidden border border-slate-100 shadow-sm">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.624220178036!2d109.69379512548414!3d-7.395934914095323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7aa91649242607%3A0x7cf16e25160c9389!2sSekretariat%20Daerah%20Kabupaten%20Banjarnegara!5e0!3m2!1sid!2sid!4v1777905689780!5m2!1sid!2sid"
                        width="100%" height="200" style={{ border: 0 }} allowFullScreen={false} loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade" className="w-full"
                    />
                </div>
            </div>

            {/* Profil Menu */}
            <div className="px-5 pb-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Profil Kelembagaan</p>
                <div className="bg-white border border-slate-100 rounded-3xl divide-y divide-slate-50 shadow-sm overflow-hidden">
                    {menuItems.map((m, i) => (
                        <a key={i} href={m.href} className="flex items-center justify-between px-4 py-3.5 active:bg-slate-50 transition-all">
                            <span className="text-sm font-bold text-slate-700">{m.label}</span>
                            <ChevronRight className="h-4 w-4 text-slate-300" />
                        </a>
                    ))}
                </div>
            </div>

            {/* Related Links */}
            <div className="px-5 pb-8">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Tautan Terkait</p>
                <div className="grid grid-cols-2 gap-3">
                    {links.map((link, i) => {
                        const Icon = link.icon;
                        return (
                            <a key={i} href={link.href} target="_blank" rel="noreferrer"
                                className="flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm active:scale-95 transition-all">
                                <div className="h-8 w-8 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                                    <Icon className="h-4 w-4 text-[#0d9488]" />
                                </div>
                                <span className="text-[10px] font-black text-slate-700 leading-snug line-clamp-2">{link.label}</span>
                            </a>
                        );
                    })}
                </div>
            </div>
        </MobileLayout>
    );
}
