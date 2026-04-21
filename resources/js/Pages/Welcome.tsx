import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import Hero from '@/Components/Hero';
import CategoryGrid from '@/Components/CategoryGrid';
import LatestDocuments from '@/Components/LatestDocuments';
import { motion } from 'framer-motion';

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    return (
        <>
            <Head title="JDIH Banjarnegara - Jaringan Dokumentasi & Informasi Hukum" />
            
            <div className="min-h-screen bg-white">
                {/* Navigation */}
                <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
                    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-amber-500 rounded-lg flex items-center justify-center font-bold text-white text-xl shadow-lg">B</div>
                            <div>
                                <span className="block font-bold text-slate-900 leading-none">JDIH</span>
                                <span className="text-xs text-slate-500 font-medium tracking-widest uppercase">Banjarnegara</span>
                            </div>
                        </div>
                        
                        <div className="hidden md:flex items-center gap-8 font-semibold text-slate-600">
                            <Link href="/" className="text-amber-600">Beranda</Link>
                            <Link href="#" className="hover:text-amber-600 transition-colors">Produk Hukum</Link>
                            <Link href="#" className="hover:text-amber-600 transition-colors">Informasi</Link>
                            <Link href="#" className="hover:text-amber-600 transition-colors">Kontak</Link>
                            
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-xl transition-all"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <Link
                                    href={route('login')}
                                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-all shadow-lg"
                                >
                                    Masuk Ke Panel
                                </Link>
                            )}
                        </div>
                    </div>
                </nav>

                <main className="pt-20">
                    <Hero />
                    <CategoryGrid />
                    <LatestDocuments />
                    
                    {/* Newsletter / Contact Section */}
                    <section className="py-20 px-6">
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="max-w-7xl mx-auto bg-slate-900 rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[100px] rounded-full" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full" />
                            
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Butuh Bantuan atau Informasi Terkait Hukum?</h2>
                            <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
                                Tim kami siap membantu Anda memberikan informasi terkini mengenai regulasi di Kabupaten Banjarnegara.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <button className="px-8 py-4 bg-amber-500 text-slate-900 font-bold rounded-2xl hover:bg-amber-600 transition-all">
                                    Hubungi Kami
                                </button>
                                <button className="px-8 py-4 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-all border border-white/10">
                                    Panduan Pengguna
                                </button>
                            </div>
                        </motion.div>
                    </section>
                </main>

                <footer className="bg-slate-50 border-t border-slate-100 py-16">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                            <div className="col-span-1 md:col-span-2">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="h-10 w-10 bg-amber-500 rounded-lg flex items-center justify-center font-bold text-white text-xl">B</div>
                                    <span className="font-bold text-2xl text-slate-900 tracking-tight">JDIH Banjarnegara</span>
                                </div>
                                <p className="text-slate-500 max-w-md leading-relaxed">
                                    Jaringan Dokumentasi dan Informasi Hukum Kabupaten Banjarnegara adalah wadah pendayagunaan bersama atas dokumen hukum secara tertib, terpadu dan berkesinambungan.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 mb-6 uppercase text-sm tracking-widest">Link Cepat</h4>
                                <ul className="space-y-4 text-slate-500">
                                    <li><Link href="#" className="hover:text-amber-600">Visi & Misi</Link></li>
                                    <li><Link href="#" className="hover:text-amber-600">Struktur Organisasi</Link></li>
                                    <li><Link href="#" className="hover:text-amber-600">FAQ</Link></li>
                                    <li><Link href="#" className="hover:text-amber-600">Statistik</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 mb-6 uppercase text-sm tracking-widest">Kontak</h4>
                                <ul className="space-y-4 text-slate-500">
                                    <li>Jl. A. Yani No. 16, Banjarnegara</li>
                                    <li>Telp: (0286) 591212</li>
                                    <li>Email: hukum@banjarnegarakab.go.id</li>
                                </ul>
                            </div>
                        </div>
                        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-sm">
                            <p>© 2024 Sekretariat Daerah Kabupaten Banjarnegara. All rights reserved.</p>
                            <div className="flex gap-6">
                                <Link href="#" className="hover:text-slate-600">Privacy Policy</Link>
                                <Link href="#" className="hover:text-slate-600">Terms of Service</Link>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
