import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import { MapPin, Phone, PrinterIcon, Mail, Building2, Clock } from 'lucide-react';

const DEFAULT_KONTAK = [
    { icon: Building2, label: 'Instansi', value: 'Bagian Hukum SETDA Kabupaten Banjarnegara', href: undefined },
    { icon: MapPin, label: 'Alamat', value: 'Lantai 2, Jalan A. Yani Nomor 16 Banjarnegara 591187, Jawa Tengah, Indonesia', href: undefined },
    { icon: Phone, label: 'Telepon', value: '(0286) 591218', href: 'tel:0286591218' },
    { icon: PrinterIcon, label: 'Fax', value: '(0286) 591187', href: undefined },
    { icon: Mail, label: 'Email', value: 'jdihbanjarnegara@gmail.com', href: 'mailto:jdihbanjarnegara@gmail.com' },
];

const DEFAULT_MAP = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.624220178036!2d109.69379512548414!3d-7.395934914095323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7aa91649242607%3A0x7cf16e25160c9389!2sSekretariat%20Daerah%20Kabupaten%20Banjarnegara!5e0!3m2!1sid!2sid!4v1777905689780!5m2!1sid!2sid';

export default function KedudukanAlamat({ item }: { item?: any }) {
    const data = (item?.content && typeof item.content === 'object') ? item.content : {};

    // Override kontak from DB if exists
    const instansi = data.instansi ?? DEFAULT_KONTAK[0].value;
    const alamat   = data.alamat   ?? DEFAULT_KONTAK[1].value;
    const telepon  = data.telepon  ?? '(0286) 591218';
    const fax      = data.fax      ?? '(0286) 591187';
    const email    = data.email    ?? 'jdihbanjarnegara@gmail.com';
    const mapEmbed = data.maps_url ?? DEFAULT_MAP;

    // jam_layanan is stored as [{hari:"...", jam:"..."}] from Repeater
    const jamLayanan: { hari: string; jam: string }[] = Array.isArray(data.jam_layanan) && data.jam_layanan.length > 0
        ? data.jam_layanan
        : [
            { hari: 'Senin – Jumat', jam: '08.00 – 11.00 WIB' },
            { hari: 'Sabtu – Minggu', jam: 'Libur' },
        ];

    const kontak = [
        { icon: Building2, label: 'Instansi', value: instansi, href: undefined as string | undefined },
        { icon: MapPin,     label: 'Alamat',   value: alamat,   href: undefined as string | undefined },
        { icon: Phone,      label: 'Telepon',  value: telepon,  href: `tel:${telepon.replace(/\D/g, '')}` },
        { icon: PrinterIcon,label: 'Fax',      value: fax,      href: undefined as string | undefined },
        { icon: Mail,       label: 'Email',    value: email,    href: `mailto:${email}` },
    ];

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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* ── Info Card ── */}
                        <div className="space-y-5">
                            <div className="bg-[#1e293b] rounded-xl px-6 py-5">
                                <p className="text-[#0d9488] text-xs font-bold uppercase tracking-widest mb-1">Pusat Layanan Hukum</p>
                                <h2 className="text-white text-xl font-bold">JDIH Kabupaten Banjarnegara</h2>
                            </div>

                            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm divide-y divide-slate-100">
                                {kontak.map((k) => (
                                    <div key={k.label} className="flex items-start gap-4 px-6 py-4">
                                        <div className="h-9 w-9 bg-[#0d9488]/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                                            <k.icon className="h-4.5 w-4.5 text-[#0d9488]" style={{ height: '1.125rem', width: '1.125rem' }} />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{k.label}</p>
                                            {k.href ? (
                                                <a href={k.href} className="text-[#0d9488] font-medium text-sm hover:text-teal-700 transition-colors break-all">
                                                    {k.value}
                                                </a>
                                            ) : (
                                                <p className="text-[#1e293b] font-medium text-sm leading-snug">{k.value}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-[#0d9488]/5 border border-[#0d9488]/20 rounded-xl px-6 py-5">
                                <p className="text-[#0d9488] font-bold text-sm mb-3 flex items-center gap-2">
                                    <Clock className="h-4 w-4" /> Jam Layanan
                                </p>
                                <div className="space-y-1.5 text-sm text-slate-600">
                                    {jamLayanan.map((j, idx) => (
                                        <div key={idx} className="flex justify-between">
                                            <span>{j.hari}</span>
                                            <span className={`font-semibold ${j.jam === 'Libur' ? 'text-slate-400' : 'text-[#1e293b]'}`}>
                                                {j.jam}
                                            </span>
                                        </div>
                                    ))}
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
                                    src={mapEmbed}
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
                                <a
                                    href="https://maps.google.com/?q=Jl.+A.+Yani+No.16+Banjarnegara"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-[#0d9488] text-xs font-semibold hover:text-teal-700 transition-colors"
                                >
                                    ↗ Buka di Google Maps
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
