import React from 'react';
import { Head, Link } from '@inertiajs/react';
import MobileLayout from '@/Layouts/MobileLayout';
import { BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon, Files, TrendingUp, ChevronRight } from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, LineChart, Line,
} from 'recharts';
import { motion } from 'framer-motion';

interface Props {
    dataJenis: any[];
    dataTahun: any[];
    dataPie: any[];
    total: number;
    ikmScore: number;
}

function CustomTooltip({ active, payload, label }: any) {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-white border border-slate-200 rounded-xl shadow-lg px-3 py-2 text-[10px]">
            <p className="font-black text-slate-900 mb-0.5">{label}</p>
            <p className="text-[#0d9488] font-bold">{payload[0].value.toLocaleString('id-ID')} Dokumen</p>
        </div>
    );
}

export default function MobileStatistik({ dataJenis, dataTahun, dataPie, total, ikmScore }: Props) {
    return (
        <MobileLayout>
            <Head title="Statistik — JDIH Banjarnegara" />
            
            <div className="flex flex-col gap-6 p-5 pb-10">
                
                {/* Header */}
                <div className="pt-2">
                    <h1 className="text-2xl font-black text-slate-900 leading-tight">Statistik Data</h1>
                    <p className="text-xs font-bold text-slate-400 mt-1">Visualisasi database produk hukum</p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm">
                        <div className="h-10 w-10 bg-teal-50 rounded-2xl flex items-center justify-center mb-3">
                            <Files className="h-5 w-5 text-[#0d9488]" />
                        </div>
                        <p className="text-xl font-black text-slate-900">{total.toLocaleString('id-ID')}</p>
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Total Produk</p>
                    </div>
                    <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm">
                        <div className="h-10 w-10 bg-blue-50 rounded-2xl flex items-center justify-center mb-3">
                            <TrendingUp className="h-5 w-5 text-blue-600" />
                        </div>
                        <p className="text-xl font-black text-slate-900">{ikmScore > 0 ? ikmScore + '%' : 'N/A'}</p>
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Skor IKM</p>
                    </div>
                </div>

                {/* Chart 1: Bar Chart per Jenis */}
                <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-slate-900 rounded-xl flex items-center justify-center">
                            <BarChart3 className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-800">Dokumen per Jenis</h3>
                    </div>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dataJenis} margin={{ top: 10, right: 0, left: -20, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                                <XAxis 
                                    dataKey="short" 
                                    tick={{ fontSize: 8, fontWeight: 900, fill: '#94a3b8' }} 
                                    axisLine={false}
                                    tickLine={false}
                                    interval={0}
                                    angle={-45}
                                    textAnchor="end"
                                />
                                <YAxis 
                                    tick={{ fontSize: 8, fontWeight: 900, fill: '#94a3b8' }} 
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
                                <Bar dataKey="jumlah" radius={[4, 4, 0, 0]}>
                                    {dataJenis.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#0d9488' : '#1e293b'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Chart 2: Line Chart Tren */}
                <div className="bg-[#0d9488] p-6 rounded-[2.5rem] text-white shadow-xl shadow-teal-900/20 space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30">
                            <LineChartIcon className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="text-xs font-black uppercase tracking-widest text-white">Tren 10 Tahun Terakhir</h3>
                    </div>
                    <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={dataTahun} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                                <XAxis 
                                    dataKey="year" 
                                    tick={{ fontSize: 8, fontWeight: 900, fill: 'rgba(255,255,255,0.6)' }} 
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis 
                                    tick={{ fontSize: 8, fontWeight: 900, fill: 'rgba(255,255,255,0.6)' }} 
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '12px', fontSize: '10px' }}
                                    itemStyle={{ color: '#0d9488', fontWeight: 'bold' }}
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="jumlah" 
                                    stroke="#fff" 
                                    strokeWidth={3} 
                                    dot={{ r: 4, fill: '#fff' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Chart 3: Pie Chart Distribusi */}
                <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-blue-600 rounded-xl flex items-center justify-center">
                            <PieChartIcon className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-800">Distribusi Produk</h3>
                    </div>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={dataPie}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {dataPie.map((entry, index) => {
                                        const COLORS = ['#0d9488', '#3b82f6', '#f59e0b', '#ec4899', '#8b5cf6'];
                                        return (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        );
                                    })}
                                </Pie>
                                <Tooltip formatter={(val: any) => [`${val} Dokumen`, '']} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        {dataPie.map((item, i) => {
                            const COLORS = ['#0d9488', '#3b82f6', '#f59e0b', '#ec4899', '#8b5cf6'];
                            return (
                                <div key={i} className="flex items-center gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter truncate">{item.name}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* List Table (Simple for Mobile) */}
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="px-6 py-5 border-b border-slate-50 flex items-center justify-between">
                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-800">Rincian Data</h3>
                    </div>
                    <div className="divide-y divide-slate-50">
                        {dataJenis.sort((a, b) => b.jumlah - a.jumlah).map((item, i) => (
                            <Link key={i} href={item.href} className="flex items-center justify-between px-6 py-4 active:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <span className="text-[10px] font-black text-slate-300 w-4">{(i + 1).toString().padStart(2, '0')}</span>
                                    <span className="text-xs font-black text-slate-700 uppercase tracking-tight">{item.name}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-black text-[#0d9488]">{item.jumlah.toLocaleString('id-ID')}</span>
                                    <ChevronRight className="h-4 w-4 text-slate-200" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </MobileLayout>
    );
}
