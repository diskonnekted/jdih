import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import { ZoomIn, X, ChevronLeft, ChevronRight, FileText } from 'lucide-react';

/* ------------------------------------------------------------------ */
/* DATA SOP                                                            */
/* ------------------------------------------------------------------ */
const SOP_GROUPS_DEFAULT = [
    {
        id: 1,
        nomorSop: '100.3.8/32/Setda/2024',
        namaSop: 'Layanan Perpustakaan JDIH',
        tanggalPengesahan: '31 Desember 2024',
        disahkanOleh: 'Kepala Bagian Hukum',
        tujuan: 'Menjamin berjalannya proses layanan perpustakaan JDIH, yang meliputi peminjaman dan pengembalian koleksi perpustakaan hukum, sehingga penyedia dokumen dan informasi hukum dapat berjalan dengan baik.',
        pages: [
            { src: '/images/SOP_JDIH_001.webp', label: 'Halaman 1 – Prosedur Peminjaman (Langkah 1–6)' },
            { src: '/images/SOP_JDIH_002.webp', label: 'Halaman 2 – Prosedur Peminjaman (Langkah 7–14)' },
        ],
    },
    {
        id: 2,
        nomorSop: '100.3.8/33/Setda/2024',
        namaSop: 'Pendaftaran Keanggotaan Perpustakaan JDIH',
        tanggalPengesahan: '31 Desember 2024',
        disahkanOleh: 'Kepala Bagian Hukum',
        tujuan: 'Keanggotaan Perpustakaan JDIH dibutuhkan untuk mengetahui aktivitas layanan perpustakaan JDIH, sehingga perlu menjamin proses pendaftaran anggota secara cepat, mudah dan akurat.',
        pages: [
            { src: '/images/SOP_JDIH_003.webp', label: 'Prosedur Pendaftaran Anggota Perpustakaan JDIH' },
        ],
    },
    {
        id: 3,
        nomorSop: '100.3.8/34/Setda/2024',
        namaSop: 'Pengolahan Dokumen Hukum',
        tanggalPengesahan: '31 Desember 2024',
        disahkanOleh: 'Kepala Bagian Hukum',
        tujuan: 'Prosedur pengolahan dokumen hukum agar tertata dengan rapi dan mudah ditemukan kembali.',
        pages: [
            { src: '/images/SOP_JDIH_004.webp', label: 'Prosedur Pengolahan Dokumen Hukum' },
        ],
    },
];

const ALL_PAGES_DEFAULT = SOP_GROUPS_DEFAULT.flatMap((group) =>
    group.pages.map((page) => ({ ...page, groupTitle: group.namaSop }))
);

/* ------------------------------------------------------------------ */
/* LIGHTBOX                                                            */
/* ------------------------------------------------------------------ */
function Lightbox({
    pageIdx, onClose, onPrev, onNext,
}: {
    pageIdx: number;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
}) {
    const page = ALL_PAGES_DEFAULT[pageIdx];
    return (
        <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm"
                >
                    <X className="h-5 w-5" /> Tutup (Esc)
                </button>

                {/* Image */}
                <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
                    <img
                        src={page.src}
                        alt={page.label}
                        className="w-full h-auto max-h-[80vh] object-contain"
                    />
                </div>

                {/* Caption */}
                <div className="mt-4 text-center">
                    <p className="text-white text-sm font-semibold">{page.groupTitle}</p>
                    <p className="text-white/50 text-xs mt-0.5">{page.label}</p>
                    <p className="text-white/40 text-xs mt-1">
                        {pageIdx + 1} / {ALL_PAGES_DEFAULT.length}
                    </p>
                </div>

                {/* Prev */}
                {pageIdx > 0 && (
                    <button
                        onClick={onPrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 h-10 w-10 bg-white/10 hover:bg-white/25 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                )}
                {/* Next */}
                {pageIdx < ALL_PAGES_DEFAULT.length - 1 && (
                    <button
                        onClick={onNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 h-10 w-10 bg-white/10 hover:bg-white/25 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </button>
                )}
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* PAGE                                                                */
/* ------------------------------------------------------------------ */
export default function Sop({ item }: { item?: any }) {
    const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

    function openPage(globalIdx: number) {
        setLightboxIdx(globalIdx);
    }

    const groupOffsets = SOP_GROUPS_DEFAULT.reduce<number[]>((acc, g, i) => {
        acc.push(i === 0 ? 0 : acc[i - 1] + SOP_GROUPS_DEFAULT[i - 1].pages.length);
        return acc;
    }, []);

    return (
        <PublicLayout>
            <Head title="SOP – JDIH Banjarnegara" />

            <PageHeader
                title="Standar Operasional Prosedur (SOP)"
                subtitle="Dokumen SOP layanan Sub Bagian Dokumentasi dan Informasi Hukum Sekretariat Daerah Kabupaten Banjarnegara"
                breadcrumbs={[{ label: 'Profil Kami' }, { label: 'SOP' }]}
            />

            <section className="py-12 px-6 bg-slate-50">
                <div className="max-w-6xl mx-auto">
                    {/* Intro from Database */}
                    {item && (
                        <div className="profile-card-wrapper mb-12">
                            <div className="profile-content-premium" dangerouslySetInnerHTML={{ __html: item.content }} />
                        </div>
                    )}

                    <div className="text-center mb-10">
                        <p className="text-[#0d9488] font-bold text-xs uppercase tracking-widest mb-2">Dokumen Resmi</p>
                        <p className="text-slate-500 text-sm max-w-xl mx-auto">
                            Terdapat <strong>{SOP_GROUPS_DEFAULT.length} SOP</strong> dengan total{' '}
                            <strong>{ALL_PAGES_DEFAULT.length} halaman</strong> dokumen.
                            Klik thumbnail untuk memperbesar dan melihat detail prosedur.
                        </p>
                    </div>

                    <div className="space-y-8">
                        {SOP_GROUPS_DEFAULT.map((sop, groupIdx) => (
                            <div
                                key={sop.id}
                                className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm"
                            >
                                <div className="bg-[#1e293b] px-6 py-5 flex items-start gap-4">
                                    <div className="h-10 w-10 bg-[#0d9488] rounded-lg flex items-center justify-center font-bold text-white text-sm shrink-0 mt-0.5">
                                        {String(groupIdx + 1).padStart(2, '0')}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-3 mb-1">
                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#0d9488]/20 text-[#0d9488] tracking-widest font-mono">
                                                {sop.nomorSop}
                                            </span>
                                            <span className="text-[10px] text-slate-400">
                                                Disahkan: {sop.tanggalPengesahan}
                                            </span>
                                        </div>
                                        <h2 className="text-white font-bold text-base">{sop.namaSop}</h2>
                                        <p className="text-slate-400 text-xs mt-0.5">Disahkan oleh: {sop.disahkanOleh}</p>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="mb-5 flex items-start gap-3 bg-[#0d9488]/5 border border-[#0d9488]/20 rounded-lg px-4 py-3">
                                        <FileText className="h-4 w-4 text-[#0d9488] shrink-0 mt-0.5" />
                                        <div>
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#0d9488] block mb-1">Tujuan / Peringatan</span>
                                            <p className="text-slate-600 text-sm leading-relaxed">{sop.tujuan}</p>
                                        </div>
                                    </div>

                                    <div className={`grid gap-4 ${sop.pages.length === 1 ? 'grid-cols-1 max-w-sm' : 'grid-cols-1 sm:grid-cols-2'}`}>
                                        {sop.pages.map((page, pageIdx) => {
                                            const globalIdx = groupOffsets[groupIdx] + pageIdx;
                                            return (
                                                <div key={pageIdx}>
                                                    <div
                                                        className="group relative border border-slate-200 rounded-lg overflow-hidden cursor-zoom-in hover:border-[#0d9488] hover:shadow-md transition-all bg-white"
                                                        onClick={() => openPage(globalIdx)}
                                                    >
                                                        <img
                                                            src={page.src}
                                                            alt={page.label}
                                                            className="w-full h-auto object-contain"
                                                            style={{ maxHeight: '480px' }}
                                                        />
                                                        <div className="absolute inset-0 bg-[#1e293b]/0 group-hover:bg-[#1e293b]/10 flex items-center justify-center transition-all">
                                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#1e293b]/80 text-white rounded-full h-12 w-12 flex items-center justify-center shadow-lg">
                                                                <ZoomIn className="h-6 w-6" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-2 flex items-center justify-between">
                                                        <p className="text-xs text-slate-500">{page.label}</p>
                                                        <button
                                                            onClick={() => openPage(globalIdx)}
                                                            className="flex items-center gap-1 text-xs text-[#0d9488] hover:text-teal-700 font-semibold transition-colors"
                                                        >
                                                            <ZoomIn className="h-3.5 w-3.5" /> Perbesar
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="text-center text-slate-400 text-xs mt-8">
                        * Dokumen SOP diterbitkan oleh Sub Bagian Dokumentasi dan Informasi Hukum Sekretariat Daerah Kabupaten Banjarnegara.
                        Klik gambar untuk melihat detail fullscreen dan gunakan tombol panah untuk berpindah antar halaman.
                    </p>
                </div>
            </section>

            {lightboxIdx !== null && (
                <Lightbox
                    pageIdx={lightboxIdx as number}
                    onClose={() => setLightboxIdx(null)}
                    onPrev={() => setLightboxIdx((i) => (i !== null && i > 0 ? i - 1 : i))}
                    onNext={() =>
                        setLightboxIdx((i) =>
                            i !== null && i < ALL_PAGES_DEFAULT.length - 1 ? i + 1 : i
                        )
                    }
                />
            )}
        </PublicLayout>
    );
}
