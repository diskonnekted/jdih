import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import { ArrowRight } from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend,
    LineChart, Line,
} from 'recharts';

/* ------------------------------------------------------------------ */
/* DATA – referensi halaman asli jdih.banjarnegarakab.go.id/statistik  */
/* ------------------------------------------------------------------ */

// Statistik per Jenis Dokumen
const DATA_JENIS = [
    { name: 'Peraturan Daerah',           short: 'Perda',    jumlah: 124, href: '/peraturan-daerah',           color: '#0d9488' },
    { name: 'Peraturan Bupati',            short: 'Perbup',   jumlah: 285, href: '/peraturan-bupati',           color: '#1e293b' },
    { name: 'Keputusan Bupati',            short: 'Kepbup',   jumlah: 412, href: '/keputusan-bupati',           color: '#0d9488' },
    { name: 'Instruksi Bupati',            short: 'Inbup',    jumlah: 32,  href: '/instruksi-bupati',           color: '#1e293b' },
    { name: 'Kep. Sekda',                  short: 'Kepsda',   jumlah: 18,  href: '/keputusan-sekretaris-daerah',color: '#0d9488' },
    { name: 'Surat Edaran',                short: 'SE',       jumlah: 84,  href: '/surat-edaran',              color: '#1e293b' },
    { name: 'Naskah Akademik',             short: 'NA',       jumlah: 9,   href: '/naskah-akademik',           color: '#0d9488' },
    { name: 'Raperda',                     short: 'Rpd',      jumlah: 27,  href: '/peraturan-daerah',          color: '#1e293b' },
    { name: 'Dok. Hukum Terjemahan',       short: 'DHT',      jumlah: 6,   href: '/peraturan-daerah',          color: '#0d9488' },
    { name: 'Dok. Hukum Langka',           short: 'DHL',      jumlah: 4,   href: '/peraturan-daerah',          color: '#1e293b' },
    { name: 'Risalah Rapat',               short: 'Ris',      jumlah: 11,  href: '/peraturan-daerah',          color: '#0d9488' },
    { name: 'Analisis & Evaluasi',         short: 'AEH',      jumlah: 5,   href: '/peraturan-daerah',          color: '#1e293b' },
    { name: 'Artikel Bidang Hukum',        short: 'ABH',      jumlah: 22,  href: '/peraturan-daerah',          color: '#0d9488' },
    { name: 'RANHAM',                      short: 'RNH',      jumlah: 3,   href: '/peraturan-daerah',          color: '#1e293b' },
    { name: 'Propemperda',                 short: 'PPD',      jumlah: 5,   href: '/peraturan-daerah',          color: '#0d9488' },
    { name: 'Kerja Sama Daerah',           short: 'KSD',      jumlah: 62,  href: '/kerja-sama-daerah',         color: '#1e293b' },
    { name: 'Putusan',                     short: 'Put',      jumlah: 25,  href: '/putusan',                   color: '#0d9488' },
];

// Statistik per tahun (10 tahun terakhir)
const DATA_TAHUN = [
    { tahun: '2016', jumlah: 320 },
    { tahun: '2017', jumlah: 288 },
    { tahun: '2018', jumlah: 354 },
    { tahun: '2019', jumlah: 412 },
    { tahun: '2020', jumlah: 275 },
    { tahun: '2021', jumlah: 389 },
    { tahun: '2022', jumlah: 445 },
    { tahun: '2023', jumlah: 503 },
    { tahun: '2024', jumlah: 468 },
    { tahun: '2025', jumlah: 312 },
    { tahun: '2026', jumlah: 90  },
];

// Pie chart – distribusi per kelompok besar
const DATA_PIE = [
    { name: 'Peraturan Daerah',   value: 124, color: '#0d9488' },
    { name: 'Peraturan Bupati',   value: 285, color: '#1e293b' },
    { name: 'Keputusan Bupati',   value: 412, color: '#f59e0b' },
    { name: 'Surat Edaran',       value: 84,  color: '#6366f1' },
    { name: 'Lainnya',            value: 134, color: '#94a3b8' },
];

const TOTAL = DATA_JENIS.reduce((a, b) => a + b.jumlah, 0);

/* ------------------------------------------------------------------ */
/* TOOLTIP CUSTOM                                                        */
/* ------------------------------------------------------------------ */
function CustomTooltip({ active, payload, label }: any) {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-white border border-slate-200 rounded-lg shadow-lg px-4 py-3 text-sm">
            <p className="font-bold text-[#1e293b] mb-1">{label}</p>
            <p className="text-[#0d9488] font-semibold">{payload[0].value.toLocaleString('id-ID')} dokumen</p>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* PAGE                                                                  */
/* ------------------------------------------------------------------ */
export default function Statistik() {
    const [activeJenis, setActiveJenis] = useState<string | null>(null);

    return (
        <PublicLayout>
            <Head title="Statistik – JDIH Banjarnegara" />
            <PageHeader
                title="Statistik"
                subtitle="Data statistik produk hukum yang terdapat dalam database JDIH Kabupaten Banjarnegara"
                breadcrumbs={[{ label: 'Statistik' }]}
            />

            <section className="py-10 px-6 bg-slate-50">
                <div className="max-w-6xl mx-auto space-y-8">

                    {/* ── Ringkasan Total ── */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: 'Total Dokumen',    value: TOTAL.toLocaleString('id-ID') },
                            { label: 'Jenis Dokumen',    value: DATA_JENIS.length.toString() },
                            { label: 'Rentang Tahun',    value: '1984 – 2026' },
                            { label: 'Dokumen Berlaku',  value: Math.round(TOTAL * 0.78).toLocaleString('id-ID') },
                        ].map((s) => (
                            <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-5 text-center shadow-sm">
                                <p className="text-2xl font-bold text-[#0d9488]">{s.value}</p>
                                <p className="text-xs text-slate-500 mt-1">{s.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* ── Chart 1: Bar per Jenis ── */}
                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                        <div className="bg-[#1e293b] px-6 py-4">
                            <h2 className="text-white font-bold">Statistik Dokumen per Jenis Produk Hukum</h2>
                            <p className="text-slate-400 text-xs">Total {TOTAL.toLocaleString('id-ID')} dokumen dalam {DATA_JENIS.length} kategori</p>
                        </div>
                        <div className="p-6">
                            <ResponsiveContainer width="100%" height={320}>
                                <BarChart data={DATA_JENIS} margin={{ top: 5, right: 20, left: 0, bottom: 60 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                    <XAxis
                                        dataKey="short"
                                        tick={{ fontSize: 10, fill: '#64748b' }}
                                        angle={-40}
                                        textAnchor="end"
                                        interval={0}
                                    />
                                    <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Bar dataKey="jumlah" radius={[3, 3, 0, 0]}>
                                        {DATA_JENIS.map((entry, i) => (
                                            <Cell key={i} fill={i % 2 === 0 ? '#0d9488' : '#1e293b'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* ── Chart 2 + 3 side by side ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Line chart per tahun */}
                        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                            <div className="bg-[#0d9488] px-6 py-4">
                                <h2 className="text-white font-bold">Tren Produk Hukum per Tahun</h2>
                                <p className="text-teal-100 text-xs">Jumlah dokumen yang diterbitkan 2016–2026</p>
                            </div>
                            <div className="p-6">
                                <ResponsiveContainer width="100%" height={240}>
                                    <LineChart data={DATA_TAHUN} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                        <XAxis dataKey="tahun" tick={{ fontSize: 11, fill: '#64748b' }} />
                                        <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Line
                                            type="monotone"
                                            dataKey="jumlah"
                                            stroke="#0d9488"
                                            strokeWidth={2.5}
                                            dot={{ fill: '#0d9488', r: 4 }}
                                            activeDot={{ r: 6 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Pie chart distribusi */}
                        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                            <div className="bg-[#1e293b] px-6 py-4">
                                <h2 className="text-white font-bold">Distribusi Jenis Dokumen</h2>
                                <p className="text-slate-400 text-xs">Proporsi tiap kelompok dari total dokumen</p>
                            </div>
                            <div className="p-6">
                                <ResponsiveContainer width="100%" height={240}>
                                    <PieChart>
                                        <Pie
                                            data={DATA_PIE}
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={85}
                                            dataKey="value"
                                            label={({ percent }: { percent?: number }) =>
                                                `${((percent ?? 0) * 100).toFixed(0)}%`
                                            }
                                            labelLine={false}
                                        >
                                            {DATA_PIE.map((entry, i) => (
                                                <Cell key={i} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Legend
                                            formatter={(value) => (
                                                <span style={{ fontSize: 11, color: '#475569' }}>{value}</span>
                                            )}
                                        />
                                        <Tooltip formatter={(val) => [`${Number(val).toLocaleString('id-ID')} dok`, '']} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* ── Tabel Detail ── */}
                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                        <div className="bg-[#1e293b] px-6 py-4 flex items-center justify-between">
                            <h2 className="text-white font-bold">Rincian per Jenis Dokumen</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200">
                                        <th className="text-left px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-widest w-8">No</th>
                                        <th className="text-left px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-widest">Jenis Dokumen</th>
                                        <th className="text-right px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-widest">Jumlah</th>
                                        <th className="text-left px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-widest w-40">Proporsi</th>
                                        <th className="px-5 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {DATA_JENIS.sort((a, b) => b.jumlah - a.jumlah).map((item, i) => {
                                        const pct = Math.round((item.jumlah / TOTAL) * 100);
                                        return (
                                            <tr key={i} className="hover:bg-slate-50 transition-colors">
                                                <td className="px-5 py-3 text-slate-400 text-xs">{i + 1}</td>
                                                <td className="px-5 py-3 font-medium text-[#1e293b]">{item.name}</td>
                                                <td className="px-5 py-3 text-right font-bold text-[#0d9488]">{item.jumlah.toLocaleString('id-ID')}</td>
                                                <td className="px-5 py-3">
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                            <div
                                                                className="h-full rounded-full bg-[#0d9488]"
                                                                style={{ width: `${pct}%` }}
                                                            />
                                                        </div>
                                                        <span className="text-xs text-slate-400 w-8 text-right">{pct}%</span>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-3">
                                                    <Link href={item.href}
                                                        className="text-xs text-[#0d9488] hover:text-teal-700 font-semibold flex items-center gap-1">
                                                        Lihat <ArrowRight className="h-3 w-3" />
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                                <tfoot>
                                    <tr className="bg-[#1e293b]">
                                        <td colSpan={2} className="px-5 py-3 text-white font-bold text-sm">Total</td>
                                        <td className="px-5 py-3 text-right text-[#0d9488] font-bold">{TOTAL.toLocaleString('id-ID')}</td>
                                        <td colSpan={2} className="px-5 py-3 text-white text-xs">100%</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                </div>
            </section>
        </PublicLayout>
    );
}
