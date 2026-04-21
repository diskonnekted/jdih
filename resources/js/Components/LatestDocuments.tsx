import { motion } from 'framer-motion';
import { Calendar, Download, Eye } from 'lucide-react';
import React from 'react';

const mocks = [
    { id: 1, type: 'PERDA', number: 'No. 1 Tahun 2024', title: 'Perubahan Atas Peraturan Daerah Nomor 5 Tahun 2012 Tentang Tata Ruang Wilayah.', date: '15 Jan 2024' },
    { id: 2, type: 'PERBUP', number: 'No. 24 Tahun 2023', title: 'Pemberian Insentif dan Kemudahan Investasi di Kabupaten Banjarnegara.', date: '10 Des 2023' },
    { id: 3, type: 'KEPKEP', number: 'No. 550/12/2023', title: 'Penetapan Lokasi Pembangunan Gedung Olahraga Terpadu.', date: '01 Des 2023' },
];

export default function LatestDocuments() {
    return (
        <section className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">Produk Hukum Terbaru</h2>
                        <p className="text-slate-500">Informasi hukum terkini yang baru saja diterbitkan</p>
                    </div>
                    <button className="mt-4 md:mt-0 px-6 py-2 border-2 border-slate-200 hover:border-amber-500 hover:text-amber-600 font-bold rounded-lg transition-all">
                        Lihat Semua
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {mocks.map((doc, idx) => (
                        <motion.div
                            key={doc.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-amber-200 hover:shadow-md transition-all group"
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full uppercase tracking-wider">
                                        {doc.type}
                                    </span>
                                    <span className="text-slate-400 text-sm flex items-center gap-1">
                                        <Calendar className="h-4 w-4" /> {doc.date}
                                    </span>
                                </div>
                                <h3 className="font-bold text-slate-800 text-lg group-hover:text-amber-600 transition-colors uppercase leading-tight">
                                    {doc.number} {doc.title}
                                </h3>
                            </div>
                            
                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-colors">
                                    <Eye className="h-4 w-4" /> Detail
                                </button>
                                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 border border-slate-200 text-slate-600 rounded-xl hover:border-amber-500 hover:text-amber-600 transition-colors">
                                    <Download className="h-4 w-4" /> PDF
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
