import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import { MapPin, Phone, PrinterIcon, Mail, Building2 } from 'lucide-react';

/* -------------------------------------------------------------------
   Konten asli dari jdih.banjarnegarakab.go.id/kedudukan-dan-alamat
------------------------------------------------------------------- */
const KONTAK = [
    {
        icon: Building2,
        label: 'Instansi',
        value: 'Bagian Hukum SETDA Kabupaten Banjarnegara',
    },
    {
        icon: MapPin,
        label: 'Alamat',
        value: 'Lantai 2, Jalan A. Yani Nomor 16 Banjarnegara 591187, Jawa Tengah, Indonesia',
    },
    {
        icon: Phone,
        label: 'Telepon',
        value: '(0286) 591218',
        href: 'tel:0286591218',
    },
    {
        icon: PrinterIcon,
        label: 'Fax',
        value: '(0286) 591187',
    },
    {
        icon: Mail,
        label: 'Email',
        value: 'jdih@banjarnegarakab.go.id',
        href: 'mailto:jdih@banjarnegarakab.go.id',
    },
];

/* Google Maps embed – Jl. Ahmad Yani No. 16 Banjarnegara */
const MAPS_EMBED =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.19!2d109.6939!3d-7.3898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a67d3a8b85a4d%3A0xfed7d3a5c4e5a6b7!2sJl.%20A.%20Yani%20No.16%2C%20Krandegan%2C%20Banjarnegara!5e0!3m2!1sid!2sid!4v1715000000000!5m2!1sid!2sid';

export default function KedudukanAlamat({ item }: { item?: any }) {
    const KONTAK_DEFAULT = [
        { icon: Building2, label: 'Instansi', value: 'Bagian Hukum SETDA Kabupaten Banjarnegara' },
        { icon: MapPin, label: 'Alamat', value: 'Lantai 2, Jalan A. Yani Nomor 16 Banjarnegara 591187, Jawa Tengah, Indonesia' },
        { icon: Phone, label: 'Telepon', value: '(0286) 591218', href: 'tel:0286591218' },
        { icon: PrinterIcon, label: 'Fax', value: '(0286) 591187' },
        { icon: Mail, label: 'Email', value: 'jdih@banjarnegarakab.go.id', href: 'mailto:jdih@banjarnegarakab.go.id' },
    ];

    const MAPS_EMBED_DEFAULT = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.19!2d109.6939!3d-7.3898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a67d3a8b85a4d%3A0xfed7d3a5c4e5a6b7!2sJl.%20A.%20Yani%20No.16%2C%20Krandegan%2C%20Banjarnegara!5e0!3m2!1sid!2sid!4v1715000000000!5m2!1sid!2sid';

    return (
        <PublicLayout>
            <Head title="Kedudukan dan Alamat – JDIH Banjarnegara" />

            <PageHeader
                title="Kedudukan dan Alamat"
                subtitle="Informasi lokasi dan kontak JDIH Kabupaten Banjarnegara"
                breadcrumbs={[{ label: 'Profil Kami' }, { label: 'Kedudukan dan Alamat' }]}
            />

            <section className="py-12 px-6 bg-slate-50">
                <div className="max-w-5xl mx-auto">
                    {/* Intro from Database */}
                    {item && (
                        <div className="profile-card-wrapper mb-12">
                            <div className="profile-content-premium" dangerouslySetInnerHTML={{ __html: item.content }} />
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* ── Info Card ── */}
                            <div className="space-y-5">
                                <div className="bg-[#1e293b] rounded-xl px-6 py-5">
                                    <p className="text-[#0d9488] text-xs font-bold uppercase tracking-widest mb-1">Pusat Layanan Hukum</p>
                                    <h2 className="text-white text-xl font-bold">JDIH Kabupaten Banjarnegara</h2>
                                </div>

                                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm divide-y divide-slate-100">
                                    {KONTAK_DEFAULT.map((item) => (
                                        <div key={item.label} className="flex items-start gap-4 px-6 py-4">
                                            <div className="h-9 w-9 bg-[#0d9488]/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                                                <item.icon className="h-4.5 w-4.5 text-[#0d9488]" style={{ height: '1.125rem', width: '1.125rem' }} />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{item.label}</p>
                                                {item.href ? (
                                                    <a href={item.href} className="text-[#0d9488] font-medium text-sm hover:text-teal-700 transition-colors break-all">
                                                        {item.value}
                                                    </a>
                                                ) : (
                                                    <p className="text-[#1e293b] font-medium text-sm leading-snug">{item.value}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-[#0d9488]/5 border border-[#0d9488]/20 rounded-xl px-6 py-5">
                                    <p className="text-[#0d9488] font-bold text-sm mb-3">🕐 Jam Layanan</p>
                                    <div className="space-y-1.5 text-sm text-slate-600">
                                        <div className="flex justify-between">
                                            <span>Senin – Kamis</span>
                                            <span className="font-semibold text-[#1e293b]">07.30 – 16.00 WIB</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Jumat</span>
                                            <span className="font-semibold text-[#1e293b]">07.30 – 11.00 WIB</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Sabtu – Minggu</span>
                                            <span className="font-semibold text-slate-400">Libur</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ── Map ── */}
                            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col">
                                <div className="bg-[#1e293b] px-5 py-4">
                                    <p className="text-white font-bold text-sm">Peta Lokasi</p>
                                    <p className="text-slate-400 text-xs">Jl. A. Yani No. 16, Krandegan, Banjarnegara</p>
                                </div>
                                <div className="flex-1 min-h-[360px]">
                                    <iframe
                                        src={MAPS_EMBED_DEFAULT}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0, minHeight: '360px' }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Peta Lokasi JDIH Banjarnegara"
                                    />
                                </div>
                                <div className="px-5 py-3 border-t border-slate-100">
                                    <a href="https://maps.google.com/?q=Jl.+A.+Yani+No.16+Banjarnegara" target="_blank" rel="noreferrer" className="text-[#0d9488] text-xs font-semibold hover:text-teal-700 transition-colors">
                                        ↗ Buka di Google Maps
                                    </a>
                                </div>
                        </div>
                </div>
            </section>
        </PublicLayout>
    );
}
