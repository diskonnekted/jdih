import { motion } from 'framer-motion';
import { Scale, FileText, Briefcase, Megaphone, Info, BookOpen } from 'lucide-react';
import React from 'react';

const categories = [
    { title: 'Peraturan Daerah', code: 'PERDA', icon: Scale, count: '1,240', color: 'bg-blue-500' },
    { title: 'Peraturan Bupati', code: 'PERBUP', icon: FileText, count: '2,850', color: 'bg-amber-500' },
    { title: 'Keputusan Bupati', code: 'KEPKEP', icon: Briefcase, count: '4,120', color: 'bg-emerald-500' },
    { title: 'Surat Edaran', code: 'SE', icon: Megaphone, count: '840', color: 'bg-rose-500' },
    { title: 'Instruksi Bupati', code: 'INBUP', icon: Info, count: '320', color: 'bg-indigo-500' },
    { title: 'Produk Hukum Lainnya', code: 'LAIN', icon: BookOpen, count: '150', color: 'bg-slate-500' },
];

export default function CategoryGrid() {
    return (
        <section className="py-20 max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Kategori Produk Hukum</h2>
                <div className="w-20 h-1 bg-amber-500 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.map((cat, idx) => (
                    <motion.div
                        key={cat.code}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="group flex items-center p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all cursor-pointer"
                    >
                        <div className={`p-4 rounded-2xl ${cat.color} text-white mr-6 group-hover:rotate-12 transition-transform`}>
                            <cat.icon className="h-8 w-8" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800 text-lg group-hover:text-amber-600 transition-colors">
                                {cat.title}
                            </h3>
                            <p className="text-slate-500">{cat.count} Dokumen</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
