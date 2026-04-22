import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import { Head } from '@inertiajs/react';
import { 
    MessageSquare, Send, Phone, Mail, Clock, 
    ShieldCheck, Info, CheckCircle2, User,
    FileQuestion, Calendar, Landmark
} from 'lucide-react';

export default function KonsultasiHukum() {
    return (
        <PublicLayout variant="classic">
            <Head title="Konsultasi Hukum Online – JDIH Banjarnegara" />
            
            <PageHeader 
                title="Konsultasi Hukum Online" 
                breadcrumbs={[
                    { label: 'Layanan Hukum', href: '#' },
                    { label: 'Konsultasi Hukum' }
                ]}
            />

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    
                    {/* LEFT: Consultation Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                            <div className="bg-[#1e293b] p-8 text-white relative overflow-hidden">
                                <div className="relative z-10">
                                    <h2 className="text-2xl font-bold mb-2">Formulir Konsultasi</h2>
                                    <p className="text-slate-400 text-sm">Silakan isi formulir di bawah ini. Tim hukum kami akan menjawab pertanyaan Anda melalui email.</p>
                                </div>
                                <MessageSquare className="absolute -right-4 -bottom-4 h-32 w-32 text-white/5 rotate-12" />
                            </div>

                            <form className="p-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                            <User className="h-3 w-3 text-[#0d9488]" /> Nama Lengkap
                                        </label>
                                        <input 
                                            type="text" 
                                            placeholder="Masukkan nama Anda"
                                            className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-[#0d9488] focus:border-[#0d9488] font-medium transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                            <Mail className="h-3 w-3 text-[#0d9488]" /> Alamat Email
                                        </label>
                                        <input 
                                            type="email" 
                                            placeholder="contoh@email.com"
                                            className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-[#0d9488] focus:border-[#0d9488] font-medium transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <FileQuestion className="h-3 w-3 text-[#0d9488]" /> Perihal / Topik Hukum
                                    </label>
                                    <select className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-[#0d9488] focus:border-[#0d9488] font-bold text-slate-600 transition-all">
                                        <option value="">Pilih Topik Konsultasi</option>
                                        <option value="perdata">Hukum Perdata</option>
                                        <option value="pidana">Hukum Pidana</option>
                                        <option value="tun">Tata Usaha Negara</option>
                                        <option value="keluarga">Hukum Keluarga / Waris</option>
                                        <option value="desa">Hukum Desa</option>
                                        <option value="lainnya">Lainnya</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <MessageSquare className="h-3 w-3 text-[#0d9488]" /> Pertanyaan Anda
                                    </label>
                                    <textarea 
                                        rows={6}
                                        placeholder="Uraikan permasalahan hukum yang ingin Anda konsultasikan..."
                                        className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-[#0d9488] focus:border-[#0d9488] font-medium transition-all"
                                    ></textarea>
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-[#0d9488]/5 rounded-2xl border border-[#0d9488]/10">
                                    <ShieldCheck className="h-5 w-5 text-[#0d9488] shrink-0" />
                                    <p className="text-[11px] text-slate-500 leading-relaxed">
                                        Kerahasiaan identitas dan isi konsultasi Anda dijamin sepenuhnya oleh Bagian Hukum Setda Kabupaten Banjarnegara.
                                    </p>
                                </div>

                                <button className="w-full bg-[#0d9488] hover:bg-teal-700 text-white font-black uppercase tracking-[0.2em] py-4 rounded-xl shadow-lg shadow-[#0d9488]/20 transition-all flex items-center justify-center gap-3 group">
                                    Kirim Konsultasi <Send className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* RIGHT: Contact Info */}
                    <div className="space-y-8">
                        
                        {/* ── Office Info ── */}
                        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-8 flex items-center gap-2">
                                <Landmark className="h-4 w-4" />
                                Konsultasi Offline
                            </h3>
                            <div className="space-y-8">
                                <div className="flex gap-4">
                                    <div className="h-10 w-10 shrink-0 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100">
                                        <Clock className="h-5 w-5 text-[#0d9488]" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-800">Waktu Layanan</p>
                                        <p className="text-xs text-slate-500 mt-1">Senin – Kamis: 08.00 – 15.00 WIB</p>
                                        <p className="text-xs text-slate-500">Jumat: 08.00 – 11.00 WIB</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="h-10 w-10 shrink-0 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100">
                                        <Phone className="h-5 w-5 text-[#0d9488]" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-800">Telepon</p>
                                        <p className="text-xs text-slate-500 mt-1">(0286) 591218</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="h-10 w-10 shrink-0 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100">
                                        <Calendar className="h-5 w-5 text-[#0d9488]" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-800">Lokasi</p>
                                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                            Bagian Hukum Setda Banjarnegara,<br />
                                            Jl. Ahmad Yani No. 16, Banjarnegara.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── Disclaimer ── */}
                        <div className="bg-slate-900 rounded-3xl p-8 text-white">
                            <Info className="h-8 w-8 text-[#0d9488] mb-4" />
                            <h3 className="font-bold mb-3">Penting!</h3>
                            <ul className="space-y-3 text-[11px] text-slate-400">
                                <li className="flex gap-2">
                                    <CheckCircle2 className="h-3.5 w-3.5 text-[#0d9488] shrink-0" />
                                    <span>Jawaban bersifat informatif dan bukan merupakan pendapat hukum resmi (Legal Opinion).</span>
                                </li>
                                <li className="flex gap-2">
                                    <span>Tim kami akan merespon dalam waktu maksimal 3x24 jam hari kerja.</span>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
