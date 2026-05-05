/**
 * StatistikMiniSection — lazy-loaded chart component for homepage.
 * Dipisah ke file terpisah agar recharts (~270KB) tidak masuk bundle awal.
 */
import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    LineChart, Line, CartesianGrid, Cell,
} from 'recharts';

const STAT_JENIS_MINI = [
    { name: 'Perda',   jumlah: 124 },
    { name: 'Perbup',  jumlah: 285 },
    { name: 'Kepbup',  jumlah: 412 },
    { name: 'SE',      jumlah: 84  },
    { name: 'NA',      jumlah: 9   },
    { name: 'Raperda', jumlah: 27  },
    { name: 'KSD',     jumlah: 62  },
    { name: 'Lainnya', jumlah: 98  },
];
const STAT_TAHUN_MINI = [
    { tahun: '2020', jumlah: 275 },
    { tahun: '2021', jumlah: 389 },
    { tahun: '2022', jumlah: 445 },
    { tahun: '2023', jumlah: 503 },
    { tahun: '2024', jumlah: 468 },
    { tahun: '2025', jumlah: 312 },
    { tahun: '2026', jumlah: 90  },
];

function CustomTip({ active, payload, label, themeColor }: any) {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs shadow">
            <p className="font-bold text-[#1e293b]">{label}</p>
            <p className="font-semibold" style={{ color: themeColor }}>{payload[0].value.toLocaleString('id-ID')} dok</p>
        </div>
    );
}

interface Props {
    variant?: 'classic' | 'modern';
}

export default function StatistikMiniSection({ variant = 'classic' }: Props) {
    const themeColor = variant === 'modern' ? '#003399' : '#0d9488';
    const isModern = variant === 'modern';

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-widest mb-1" style={{ color: themeColor }}>Data</p>
                        <h2 className="text-3xl font-bold text-[#1e293b]">Statistik Dokumen Hukum</h2>
                    </div>
                    <Link href="/statistik"
                        className="hidden md:flex items-center gap-2 text-sm font-semibold transition-colors"
                        style={{ color: themeColor }}
                    >
                        Lihat Lengkap <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Bar chart per jenis */}
                    <div className={`bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm transition-all ${isModern ? 'hover:shadow-xl hover:shadow-blue-900/5 hover:border-blue-200' : ''}`}>
                        <div className="bg-[#1e293b] px-5 py-4">
                            <p className="text-white font-bold text-sm">Dokumen per Jenis Produk Hukum</p>
                            <p className="text-slate-400 text-xs">Jumlah dokumen dalam database JDIH</p>
                        </div>
                        <div className="p-5">
                            <ResponsiveContainer width="100%" height={220}>
                                <BarChart data={STAT_JENIS_MINI} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748b' }} />
                                    <YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
                                    <Tooltip content={<CustomTip themeColor={themeColor} />} />
                                    <Bar dataKey="jumlah" radius={[3, 3, 0, 0]}>
                                        {STAT_JENIS_MINI.map((_, i) => (
                                            <Cell key={i} fill={i % 2 === 0 ? themeColor : '#1e293b'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Line chart tren tahun */}
                    <div className={`bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm transition-all ${isModern ? 'hover:shadow-xl hover:shadow-blue-900/5 hover:border-blue-200' : ''}`}>
                        <div className={`px-5 py-4 transition-colors ${isModern ? 'bg-[#003399]' : 'bg-[#0d9488]'}`}>
                            <p className="text-white font-bold text-sm">Tren Produk Hukum per Tahun</p>
                            <p className={`text-xs ${isModern ? 'text-blue-100' : 'text-teal-100'}`}>Perkembangan 2020–2026</p>
                        </div>
                        <div className="p-5">
                            <ResponsiveContainer width="100%" height={220}>
                                <LineChart data={STAT_TAHUN_MINI} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                    <XAxis dataKey="tahun" tick={{ fontSize: 10, fill: '#64748b' }} />
                                    <YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
                                    <Tooltip content={<CustomTip themeColor={themeColor} />} />
                                    <Line
                                        type="monotone"
                                        dataKey="jumlah"
                                        stroke={themeColor}
                                        strokeWidth={2.5}
                                        dot={{ fill: themeColor, r: 4 }}
                                        activeDot={{ r: 6 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <Link href="/statistik"
                        className={`inline-flex items-center gap-2 px-6 py-3 border-2 font-bold text-sm rounded-lg transition-all ${isModern ? 'border-[#003399] text-[#003399] hover:bg-[#003399] hover:text-white' : 'border-[#0d9488] text-[#0d9488] hover:bg-[#0d9488] hover:text-white'}`}
                    >
                        Lihat Statistik Lengkap <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
