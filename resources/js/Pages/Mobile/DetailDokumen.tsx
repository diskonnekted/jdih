import React from 'react';
import MobileLayout from '@/Layouts/MobileLayout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Download, Eye, Calendar, Hash, Tag, FileText, Monitor, AlertCircle } from 'lucide-react';

interface Document {
    id: number; title: string; number: string; year: number;
    type: string; code: string; slug: string; status: string;
    date: string | null; subject: any; abstract: string;
    has_file: boolean; view_count: number; download_count: number;
}
interface Props { document: Document; }

export default function DetailDokumen({ document: doc }: Props) {
    const statusColor = (s: string) => {
        if (s === 'berlaku') return 'bg-emerald-500';
        if (s === 'dicabut') return 'bg-red-500';
        return 'bg-slate-400';
    };

    const subjects = (() => {
        if (!doc.subject) return [];
        if (Array.isArray(doc.subject)) return doc.subject;
        try { const p = JSON.parse(doc.subject); return Array.isArray(p) ? p : [p]; } catch { return [String(doc.subject)]; }
    })();

    return (
        <MobileLayout>
            <Head title={`${doc.title} — JDIH Banjarnegara`} />

            {/* Back Button */}
            <div className="px-5 pt-5 pb-3">
                <Link href="/mobile/pencarian" className="inline-flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest active:opacity-60 transition-all">
                    <ArrowLeft className="h-4 w-4" /> Kembali ke Pencarian
                </Link>
            </div>

            {/* Header Card */}
            <div className="px-5 pb-4">
                <div className="bg-gradient-to-br from-[#0d9488] to-[#0f766e] rounded-[2rem] p-6 text-white shadow-2xl shadow-teal-900/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-10">
                        <FileText className="h-24 w-24" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-[9px] font-black px-3 py-1 rounded-xl bg-white/20 border border-white/30 uppercase tracking-widest">{doc.type}</span>
                            {doc.status && (
                                <span className={`text-[9px] font-black px-3 py-1 rounded-xl text-white uppercase tracking-widest ${statusColor(doc.status)}`}>{doc.status}</span>
                            )}
                        </div>
                        <h1 className="text-base font-black leading-snug text-white mb-4">{doc.title}</h1>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="bg-white/10 rounded-xl p-3 text-center">
                                <p className="text-lg font-black text-white">{doc.year}</p>
                                <p className="text-[8px] font-bold text-teal-100 uppercase tracking-widest">Tahun</p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-3 text-center">
                                <p className="text-lg font-black text-white">{doc.view_count ?? 0}</p>
                                <p className="text-[8px] font-bold text-teal-100 uppercase tracking-widest">Dilihat</p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-3 text-center">
                                <p className="text-lg font-black text-white">{doc.download_count ?? 0}</p>
                                <p className="text-[8px] font-bold text-teal-100 uppercase tracking-widest">Unduhan</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Meta Info */}
            <div className="px-5 pb-4">
                <div className="bg-white border border-slate-100 rounded-3xl p-4 space-y-3 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                            <Hash className="h-4 w-4 text-[#0d9488]" />
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Nomor Dokumen</p>
                            <p className="text-sm font-black text-slate-800">{doc.number || '—'}</p>
                        </div>
                    </div>
                    {doc.date && (
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                                <Calendar className="h-4 w-4 text-[#0d9488]" />
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Tanggal Ditetapkan</p>
                                <p className="text-sm font-black text-slate-800">{doc.date}</p>
                            </div>
                        </div>
                    )}
                    {subjects.length > 0 && (
                        <div className="flex items-start gap-3">
                            <div className="h-8 w-8 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 mt-0.5">
                                <Tag className="h-4 w-4 text-[#0d9488]" />
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Subjek</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {subjects.map((s: string, i: number) => (
                                        <span key={i} className="text-[9px] font-bold bg-teal-50 text-teal-700 border border-teal-200 px-2.5 py-1 rounded-lg">{s}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Abstract */}
            {doc.abstract && (
                <div className="px-5 pb-4">
                    <div className="bg-white border border-slate-100 rounded-3xl p-4 shadow-sm">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Ringkasan</p>
                        <p className="text-sm text-slate-600 leading-relaxed">{doc.abstract}</p>
                    </div>
                </div>
            )}

            {/* Status Warning */}
            {doc.status === 'dicabut' && (
                <div className="px-5 pb-4">
                    <div className="bg-red-50 border border-red-200 rounded-3xl p-4 flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                        <div>
                            <p className="text-xs font-black text-red-700 mb-1">Dokumen Telah Dicabut</p>
                            <p className="text-xs text-red-500">Peraturan ini sudah tidak berlaku. Mohon cari regulasi terbaru yang menggantikannya.</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Action Buttons */}
            <div className="px-5 pb-8 space-y-3">
                {doc.has_file && (
                    <a href={`/dokumen/${doc.id}/unduh`}
                        className="flex items-center justify-center gap-3 w-full py-4 bg-[#0d9488] text-white rounded-2xl font-black text-sm shadow-lg shadow-teal-900/20 active:scale-95 transition-all">
                        <Download className="h-5 w-5" />
                        Unduh Dokumen PDF
                    </a>
                )}
                <a href={`/${doc.slug}/${doc.id}`} target="_blank" rel="noreferrer"
                    className="flex items-center justify-center gap-3 w-full py-4 bg-white border-2 border-slate-200 text-slate-600 rounded-2xl font-black text-sm active:scale-95 transition-all">
                    <Monitor className="h-5 w-5" />
                    Buka Versi Desktop Lengkap
                </a>
                {!doc.has_file && (
                    <div className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                        <FileText className="h-5 w-5 text-slate-300 shrink-0" />
                        <p className="text-xs text-slate-400 font-bold">File PDF belum tersedia untuk dokumen ini.</p>
                    </div>
                )}
            </div>
        </MobileLayout>
    );
}
