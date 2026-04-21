import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function KedudukanAlamat() {
    return (
        <PublicLayout>
            <Head title="Kedudukan dan Alamat – JDIH Banjarnegara" />
            <PageHeader
                title="Kedudukan dan Alamat"
                subtitle="Lokasi dan kontak Bagian Hukum Sekretariat Daerah Kabupaten Banjarnegara"
                breadcrumbs={[{ label: 'Profil Kami' }, { label: 'Kedudukan dan Alamat' }]}
            />
            <section className="py-12 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Info */}
                        <div className="space-y-5">
                            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                                <div className="bg-[#0d9488] px-5 py-3">
                                    <h2 className="text-white font-bold">Informasi Kontak</h2>
                                </div>
                                <div className="p-5 space-y-4">
                                    {[
                                        { icon: MapPin, label: 'Alamat', value: 'Jl. Ahmad Yani No. 16, Krandegan, Banjarnegara, Jawa Tengah 53414' },
                                        { icon: Phone, label: 'Telepon', value: '(0286) 591218' },
                                        { icon: Mail, label: 'Email', value: 'hukum@banjarnegarakab.go.id' },
                                        { icon: Clock, label: 'Jam Layanan', value: 'Senin – Jumat: 07.30 – 16.00 WIB' },
                                    ].map((item) => (
                                        <div key={item.label} className="flex items-start gap-4">
                                            <div className="h-9 w-9 bg-[#0d9488]/10 rounded flex items-center justify-center shrink-0">
                                                <item.icon className="h-4.5 w-4.5 text-[#0d9488]" />
                                            </div>
                                            <div>
                                                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">{item.label}</div>
                                                <div className="text-[#1e293b] text-sm">{item.value}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                                <div className="bg-[#1e293b] px-5 py-3">
                                    <h2 className="text-white font-bold">Media Sosial</h2>
                                </div>
                                <div className="p-5 space-y-3">
                                    <a href="https://www.tiktok.com/@jdih_banjarnegara" target="_blank" rel="noreferrer"
                                        className="flex items-center gap-3 p-3 border border-slate-200 rounded hover:border-[#0d9488] hover:bg-slate-50 transition-colors group">
                                        <div className="h-8 w-8 bg-black rounded flex items-center justify-center shrink-0">
                                            <span className="text-white text-xs font-bold">TT</span>
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-[#1e293b] group-hover:text-[#0d9488]">TikTok</div>
                                            <div className="text-xs text-slate-400">@jdih_banjarnegara</div>
                                        </div>
                                    </a>
                                    <a href="https://www.instagram.com/jdih_banjarnegara/" target="_blank" rel="noreferrer"
                                        className="flex items-center gap-3 p-3 border border-slate-200 rounded hover:border-[#0d9488] hover:bg-slate-50 transition-colors group">
                                        <div className="h-8 w-8 bg-pink-600 rounded flex items-center justify-center shrink-0">
                                            <span className="text-white text-xs font-bold">IG</span>
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-[#1e293b] group-hover:text-[#0d9488]">Instagram</div>
                                            <div className="text-xs text-slate-400">@jdih_banjarnegara</div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Map */}
                        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                            <div className="bg-[#1e293b] px-5 py-3">
                                <h2 className="text-white font-bold">Peta Lokasi</h2>
                            </div>
                            <div className="h-[400px]">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.204937876!2d109.6944!3d-7.3897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a6c9d1c1c1c1d%3A0x1234567890abcdef!2sJl.%20Ahmad%20Yani%20No.16%2C%20Banjarnegara!5e0!3m2!1sid!2sid!4v1234567890"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Peta Lokasi JDIH Banjarnegara"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
