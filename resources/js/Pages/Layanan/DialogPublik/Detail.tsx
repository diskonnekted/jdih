import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import { 
    Calendar, 
    ArrowLeft, 
    MessageSquare, 
    FileText, 
    Download, 
    Send, 
    CheckCircle2, 
    User,
    ShieldCheck
} from 'lucide-react';

function fmtDate(d: any) {
    if (!d) return '-';
    try {
        const date = new Date(d);
        if (isNaN(date.getTime())) return '-';
        return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch (e) {
        return '-';
    }
}

export default function Detail({ dialogue }: { dialogue: any }) {
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        full_name: '',
        email: '',
        suggestion: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/dialog-publik/${dialogue.id}/respond`, {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    const pdfUrl = dialogue.file_path 
        ? (dialogue.file_path.startsWith('http') ? dialogue.file_path : `/storage/${dialogue.file_path}`) 
        : null;

    return (
        <PublicLayout>
            <Head title={`${dialogue.title} – Dialog Publik`} />
            <PageHeader
                title="Detail Dialog Publik"
                breadcrumbs={[
                    { label: 'Layanan Hukum' },
                    { label: 'Dialog Publik', href: '/dialog-publik' },
                    { label: dialogue.document_type || 'Draft' },
                ]}
            />

            <section className="py-12 px-6 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        
                        {/* ── Left Content: PDF & Info ── */}
                        <div className="lg:col-span-8 space-y-6">
                            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                                <div className="p-6 md:p-8">
                                    <div className="flex flex-wrap items-center gap-3 mb-4">
                                        <span className="text-xs font-bold px-3 py-1 rounded-full text-white bg-[#0d9488]">
                                            {dialogue.document_type || 'RANCANGAN'}
                                        </span>
                                        <span className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
                                            <Calendar className="h-4 w-4" /> {dialogue.year || '2024'}
                                        </span>
                                    </div>
                                    
                                    <h1 className="text-2xl md:text-3xl font-bold text-[#1e293b] mb-6 leading-tight">
                                        {dialogue.title}
                                    </h1>
                                    
                                    <p className="text-slate-600 mb-8 leading-relaxed">
                                        {dialogue.description}
                                    </p>

                                    {/* PDF Viewer Container */}
                                    <div className="bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
                                        <div className="bg-slate-800 px-5 py-3 flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-white">
                                                <FileText className="h-4 w-4 text-[#0d9488]" />
                                                <span className="text-xs font-bold uppercase tracking-wider">Draft Dokumen</span>
                                            </div>
                                            {pdfUrl && (
                                                <a href={pdfUrl} target="_blank" rel="noreferrer" className="text-white/70 hover:text-white transition-colors">
                                                    <Download className="h-4 w-4" />
                                                </a>
                                            )}
                                        </div>
                                        <div className="aspect-[3/4] md:aspect-video w-full bg-slate-200">
                                            {pdfUrl ? (
                                                <iframe 
                                                    src={`${pdfUrl}#toolbar=0`} 
                                                    className="w-full h-full"
                                                    title="Draft PDF"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-10 text-center">
                                                    <FileText className="h-16 w-16 mb-4 opacity-20" />
                                                    <p>Draft dokumen tidak tersedia.</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Previous Responses */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-[#1e293b] flex items-center gap-2 px-2">
                                    <MessageSquare className="h-5 w-5 text-[#0d9488]" />
                                    Aspirasi Masyarakat ({dialogue.responses?.length || 0})
                                </h3>
                                
                                {dialogue.responses && dialogue.responses.length > 0 ? (
                                    dialogue.responses.map((resp: any) => (
                                        <div key={resp.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                                            <div className="flex justify-between items-start">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center">
                                                        <User className="h-5 w-5 text-slate-400" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-[#1e293b]">{resp.full_name}</p>
                                                        <p className="text-[10px] text-slate-400 uppercase tracking-widest">{fmtDate(resp.created_at)}</p>
                                                    </div>
                                                </div>
                                                <span className="text-[10px] font-bold text-[#0d9488] bg-[#0d9488]/10 px-2 py-0.5 rounded-full uppercase">
                                                    Terverifikasi
                                                </span>
                                            </div>
                                            <p className="text-slate-600 text-sm leading-relaxed italic">
                                                "{resp.suggestion}"
                                            </p>
                                            {resp.admin_response && (
                                                <div className="bg-[#0d9488]/5 p-4 rounded-xl border-l-4 border-[#0d9488] mt-4">
                                                    <div className="flex items-center gap-2 mb-2 text-[#0d9488]">
                                                        <ShieldCheck className="h-4 w-4" />
                                                        <span className="text-xs font-bold uppercase tracking-widest">Tanggapan Admin</span>
                                                    </div>
                                                    <p className="text-sm text-slate-700 leading-relaxed">
                                                        {resp.admin_response}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="bg-white/50 p-8 rounded-2xl border border-dashed border-slate-200 text-center">
                                        <p className="text-sm text-slate-400">Belum ada aspirasi untuk topik ini. Jadilah yang pertama memberikan masukan!</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* ── Right Content: Feedback Form ── */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-28 space-y-6">
                                <div className="bg-[#1e293b] rounded-2xl overflow-hidden shadow-xl border border-slate-700">
                                    <div className="p-6 md:p-8">
                                        <h3 className="text-white font-bold text-xl mb-2 flex items-center gap-2">
                                            <Send className="h-5 w-5 text-[#0d9488]" />
                                            Kirim Aspirasi
                                        </h3>
                                        <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                                            Masukan Anda akan ditelaah oleh tim ahli kami sebelum dipublikasikan.
                                        </p>

                                        {recentlySuccessful ? (
                                            <div className="bg-[#0d9488]/20 border border-[#0d9488]/40 p-6 rounded-xl text-center animate-in fade-in zoom-in duration-500">
                                                <CheckCircle2 className="h-12 w-12 text-[#0d9488] mx-auto mb-3" />
                                                <h4 className="text-white font-bold mb-2">Berhasil Terkirim!</h4>
                                                <p className="text-slate-300 text-xs leading-relaxed">
                                                    Terima kasih atas partisipasi Anda. Aspirasi Anda sedang dalam proses moderasi.
                                                </p>
                                                <button 
                                                    onClick={() => reset()}
                                                    className="mt-6 text-xs text-[#0d9488] font-bold uppercase hover:underline"
                                                >
                                                    Kirim Masukan Lain
                                                </button>
                                            </div>
                                        ) : (
                                            <form onSubmit={handleSubmit} className="space-y-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-widest">Nama Lengkap</label>
                                                    <input 
                                                        type="text" 
                                                        value={data.full_name}
                                                        onChange={e => setData('full_name', e.target.value)}
                                                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-[#0d9488]/50 focus:border-[#0d9488] outline-none transition-all"
                                                        placeholder="Masukkan nama Anda"
                                                        required
                                                    />
                                                    {errors.full_name && <p className="text-red-400 text-[10px] mt-1">{errors.full_name}</p>}
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-widest">Alamat Email</label>
                                                    <input 
                                                        type="email" 
                                                        value={data.email}
                                                        onChange={e => setData('email', e.target.value)}
                                                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-[#0d9488]/50 focus:border-[#0d9488] outline-none transition-all"
                                                        placeholder="nama@email.com"
                                                        required
                                                    />
                                                    {errors.email && <p className="text-red-400 text-[10px] mt-1">{errors.email}</p>}
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-widest">Saran / Masukan</label>
                                                    <textarea 
                                                        rows={6}
                                                        value={data.suggestion}
                                                        onChange={e => setData('suggestion', e.target.value)}
                                                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-[#0d9488]/50 focus:border-[#0d9488] outline-none transition-all"
                                                        placeholder="Tuliskan aspirasi Anda terhadap draft ini..."
                                                        required
                                                    />
                                                    {errors.suggestion && <p className="text-red-400 text-[10px] mt-1">{errors.suggestion}</p>}
                                                </div>

                                                <button 
                                                    type="submit" 
                                                    disabled={processing}
                                                    className="w-full bg-[#0d9488] hover:bg-teal-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
                                                >
                                                    {processing ? 'Mengirim...' : (
                                                        <>Kirim Aspirasi <Send className="h-4 w-4" /></>
                                                    )}
                                                </button>
                                            </form>
                                        )}
                                    </div>
                                </div>

                                <Link href="/dialog-publik" className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[#0d9488] transition-colors group px-2">
                                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Kembali ke Daftar
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
