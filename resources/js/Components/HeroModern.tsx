import React from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Database, ShieldCheck, Sparkles, ChevronDown } from 'lucide-react';

interface HeroModernProps {
    onSearch?: (values: any) => void;
}

export default function HeroModern({ onSearch }: HeroModernProps) {
    const [searchValues, setSearchValues] = React.useState({
        query: '',
        type: 'Semua Jenis',
        year: 'Semua Tahun',
        status: 'Semua Status'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch?.(searchValues);
    };

    return (
        <section className="relative min-h-[600px] overflow-hidden bg-white">
            {/* Background Pattern - Subtle Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(#003399 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
            
            <div className="relative max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                    
                    {/* LEFT COLUMN: Content & Search */}
                    <div className="lg:col-span-7 space-y-10">
                        <div>
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-[#003399] rounded-full text-xs font-bold mb-6 border border-blue-100"
                            >
                                <Sparkles className="h-3 w-3" />
                                Portal Resmi Pemkab Banjarnegara
                            </motion.div>
                            
                            <motion.h1 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-5xl md:text-6xl font-black text-[#001a4d] leading-[1.1] mb-6"
                            >
                                Jaringan Dokumentasi <br/>
                                <span className="text-[#003399]">dan Informasi Hukum</span> <br/>
                                Kabupaten Banjarnegara
                            </motion.h1>
                            
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-slate-500 text-lg max-w-2xl leading-relaxed"
                            >
                                Akses cepat dan terverifikasi untuk seluruh produk hukum daerah — 
                                peraturan daerah, peraturan bupati, keputusan bupati, surat edaran, 
                                dan dokumen hukum lainnya dalam satu portal.
                            </motion.p>
                        </div>

                        {/* Search Card */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,51,153,0.1)] border border-slate-100 p-8 relative z-20"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <Database className="h-5 w-5 text-[#003399]" />
                                <h3 className="font-bold text-[#001a4d]">Cari Produk Hukum</h3>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                    <input 
                                        type="text" 
                                        placeholder="Ketik nama dokumen, nomor, atau subjek..."
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-[#003399] transition-all text-slate-900 placeholder:text-slate-400"
                                        value={searchValues.query}
                                        onChange={(e) => setSearchValues({...searchValues, query: e.target.value})}
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="relative group">
                                        <select 
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl appearance-none text-slate-700 text-sm focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                                            value={searchValues.type}
                                            onChange={(e) => setSearchValues({...searchValues, type: e.target.value})}
                                        >
                                            <option>Semua Jenis</option>
                                            <option>Peraturan Daerah</option>
                                            <option>Peraturan Bupati</option>
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none group-hover:text-[#003399] transition-colors" />
                                    </div>
                                    <div className="relative group">
                                        <select 
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl appearance-none text-slate-700 text-sm focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                                            value={searchValues.year}
                                            onChange={(e) => setSearchValues({...searchValues, year: e.target.value})}
                                        >
                                            <option>Semua Tahun</option>
                                            <option>2026</option>
                                            <option>2025</option>
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none group-hover:text-[#003399] transition-colors" />
                                    </div>
                                    <div className="relative group">
                                        <select 
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl appearance-none text-slate-700 text-sm focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                                            value={searchValues.status}
                                            onChange={(e) => setSearchValues({...searchValues, status: e.target.value})}
                                        >
                                            <option>Semua Status</option>
                                            <option>Berlaku</option>
                                            <option>Dicabut</option>
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none group-hover:text-[#003399] transition-colors" />
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2">
                                    <div className="flex items-center gap-3 text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                                        <span className="opacity-50">Populer:</span>
                                        <a href="#" className="text-blue-600 hover:underline">Pajak Daerah</a>
                                        <span>•</span>
                                        <a href="#" className="text-blue-600 hover:underline">RPJMD</a>
                                        <span>•</span>
                                        <a href="#" className="text-blue-600 hover:underline">Koperasi</a>
                                    </div>
                                    <button 
                                        type="submit"
                                        className="w-full sm:w-auto px-10 py-4 bg-[#003399] text-white font-black text-sm rounded-xl hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center gap-3"
                                    >
                                        <Search className="h-4 w-4" />
                                        Cari Sekarang
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN: Decorative Card */}
                    <div className="lg:col-span-5 hidden lg:block relative">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="relative"
                        >
                            {/* Main Image Card */}
                            <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl z-10 border-[12px] border-white ring-1 ring-slate-200">
                                <img 
                                    src="/images/hero.jpg" 
                                    alt="Banjarnegara View" 
                                    className="w-full h-full object-cover"
                                />
                                {/* Bottom Caption Overlay */}
                                <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-[#001a4d]/90 via-[#001a4d]/40 to-transparent">
                                    <p className="text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-2">Banjarnegara</p>
                                    <h3 className="text-white text-2xl font-bold leading-tight">
                                        Gilar-gilar Merah Putih Satu Semangat Membangun
                                    </h3>
                                </div>
                            </div>

                            {/* Stats Badge - Floating Left */}
                            <motion.div 
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.7 }}
                                className="absolute -left-12 top-1/4 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-2xl border border-slate-100 z-20 flex items-center gap-4 min-w-[200px]"
                            >
                                <div className="h-12 w-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                                    <Database className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Dokumen</p>
                                    <p className="text-xl font-black text-[#001a4d]">4,825+</p>
                                </div>
                            </motion.div>

                            {/* Verification Badge - Floating Right */}
                            <motion.div 
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="absolute -right-8 bottom-[20%] bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-2xl border border-slate-100 z-20 flex items-center gap-4 min-w-[180px]"
                            >
                                <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                                    <ShieldCheck className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Terverifikasi</p>
                                    <p className="text-base font-black text-[#001a4d]">100% Resmi</p>
                                </div>
                            </motion.div>

                            {/* Decorative Background Element */}
                            <div className="absolute -z-10 -top-8 -right-8 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl"></div>
                            <div className="absolute -z-10 -bottom-12 -left-12 w-80 h-80 bg-amber-600/5 rounded-full blur-3xl"></div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
