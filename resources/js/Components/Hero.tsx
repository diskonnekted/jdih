import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import React from 'react';

export default function Hero() {
    return (
        <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
                style={{ backgroundImage: "url('/images/hero-bg.png')" }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/60" />
            </div>

            <div className="relative z-10 max-w-5xl px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        Dokumentasi & Informasi Hukum <br/>
                        <span className="text-amber-400">Kabupaten Banjarnegara</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-3xl mx-auto">
                        Akses mudah dan cepat ke database peraturan daerah, keputusan bupati, 
                        dan produk hukum lainnya secara transparan.
                    </p>
                </motion.div>

                {/* Search Bar */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="flex flex-col md:flex-row items-center gap-4 bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 shadow-2xl"
                >
                    <div className="flex-1 w-full relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                        <input 
                            type="text" 
                            placeholder="Cari peraturan, nomor, atau kata kunci..." 
                            className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border-none focus:ring-2 focus:ring-amber-500 text-slate-900 placeholder:text-slate-400"
                        />
                    </div>
                    <button className="w-full md:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-xl transition-all shadow-lg hover:shadow-amber-500/25 flex items-center justify-center gap-2">
                        Cari Sekarang
                    </button>
                </motion.div>

                <div className="mt-8 flex flex-wrap justify-center gap-6 text-slate-400 text-sm">
                    <span>Populer:</span>
                    <button className="hover:text-amber-400 transition-colors">Perda No. 1 2024</button>
                    <button className="hover:text-amber-400 transition-colors">Retribusi Daerah</button>
                    <button className="hover:text-amber-400 transition-colors">Tata Ruang</button>
                </div>
            </div>
        </section>
    );
}
