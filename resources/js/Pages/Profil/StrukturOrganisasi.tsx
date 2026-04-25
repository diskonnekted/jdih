import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';

/* ------------------------------------------------------------------ */
/* DATA                                                                */
/* ------------------------------------------------------------------ */
const DIAGRAMS = [
    {
        id: 1,
        src: '/images/struktur1.png',
        title: 'Struktur Organisasi Bagian Hukum',
        subtitle: 'Sekretariat Daerah Kabupaten Banjarnegara',
        description: 'Bagan hierarki organisasi internal Bagian Hukum, mulai dari Kepala Bagian Hukum hingga jabatan-jabatan fungsional dan sub koordinator di bawahnya.',
        highlights: [
            'Kepala Bagian Hukum',
            'Jabatan Fungsional – Perancang Peraturan',
            'Sub Koordinator Perundang-Undangan',
            'Sub Koordinator Bantuan Hukum',
            'Sub Koordinator Dokumentasi & Informasi',
        ],
    },
    {
        id: 2,
        src: '/images/struktur2.png',
        title: 'Struktur Organisasi Tim JDIH',
        subtitle: 'Jaringan Dokumentasi dan Informasi Hukum Kabupaten Banjarnegara',
        description: 'Bagan susunan Tim Pengelola JDIH Kabupaten Banjarnegara yang terdiri dari unsur pengarah, penanggung jawab, ketua, sekretaris, dan anggota dari berbagai perangkat daerah.',
        highlights: [
            'Pengarah – Sekretaris Daerah',
            'Penanggungjawab – Asisten Pemerintahan',
            'Ketua – Kepala Bagian Hukum Setda',
            'Sekretaris – Penyuluh Hukum',
            '6 Anggota dari berbagai OPD',
        ],
    },
    {
        id: 3,
        src: '/images/struktur3.png',
        title: 'Bagan Organisasi JDIH',
        subtitle: 'Pusat JDIH Kabupaten Banjarnegara',
        description: 'Bagan hubungan antara Bagian Hukum sebagai pusat JDIH dengan seluruh anggota jaringan dokumentasi hukum di Kabupaten Banjarnegara.',
        highlights: [
            'Bagian Hukum – Pusat JDIH',
            'BUMD Kabupaten Banjarnegara',
            'Perangkat Daerah / OPD',
            'Bagian pada Setda',
            'Desa / Kelurahan',
            'BLUD',
        ],
    },
];

/* ------------------------------------------------------------------ */
/* LIGHTBOX                                                            */
/* ------------------------------------------------------------------ */
function Lightbox({
    diagram, onClose, onPrev, onNext, hasPrev, hasNext,
}: {
    diagram: typeof DIAGRAMS[0];
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
    hasPrev: boolean;
    hasNext: boolean;
}) {
    return (
        <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="relative max-w-5xl w-full"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm"
                >
                    <X className="h-5 w-5" /> Tutup
                </button>

                {/* Image */}
                <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
                    <img
                        src={diagram.src}
                        alt={diagram.title}
                        className="w-full h-auto max-h-[75vh] object-contain"
                    />
                </div>

                {/* Caption */}
                <div className="mt-4 text-center text-white">
                    <p className="font-bold">{diagram.title}</p>
                    <p className="text-sm text-white/60">{diagram.subtitle}</p>
                </div>

                {/* Prev / Next */}
                {hasPrev && (
                    <button
                        onClick={onPrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 h-10 w-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                )}
                {hasNext && (
                    <button
                        onClick={onNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 h-10 w-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
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
export default function StrukturOrganisasi({ item }: { item?: any }) {
    const [active, setActive] = useState<number | null>(null);

    const DIAGRAMS_DEFAULT = [
        {
            id: 1,
            src: '/images/struktur1.png',
            title: 'Struktur Organisasi Bagian Hukum',
            subtitle: 'Sekretariat Daerah Kabupaten Banjarnegara',
            description: 'Bagan hierarki organisasi internal Bagian Hukum, mulai dari Kepala Bagian Hukum hingga jabatan-jabatan fungsional dan sub koordinator di bawahnya.',
            highlights: [
                'Kepala Bagian Hukum',
                'Jabatan Fungsional – Perancang Peraturan',
                'Sub Koordinator Perundang-Undangan',
                'Sub Koordinator Bantuan Hukum',
                'Sub Koordinator Dokumentasi & Informasi',
            ],
        },
        {
            id: 2,
            src: '/images/struktur2.png',
            title: 'Struktur Organisasi Tim JDIH',
            subtitle: 'Jaringan Dokumentasi dan Informasi Hukum Kabupaten Banjarnegara',
            description: 'Bagan susunan Tim Pengelola JDIH Kabupaten Banjarnegara yang terdiri dari unsur pengarah, penanggung jawab, ketua, sekretaris, dan anggota dari berbagai perangkat daerah.',
            highlights: [
                'Pengarah – Sekretaris Daerah',
                'Penanggungjawab – Asisten Pemerintahan',
                'Ketua – Kepala Bagian Hukum Setda',
                'Sekretaris – Penyuluh Hukum',
                '6 Anggota dari berbagai OPD',
            ],
        },
        {
            id: 3,
            src: '/images/struktur3.png',
            title: 'Bagan Organisasi JDIH',
            subtitle: 'Pusat JDIH Kabupaten Banjarnegara',
            description: 'Bagan hubungan antara Bagian Hukum sebagai pusat JDIH dengan seluruh anggota jaringan dokumentasi hukum di Kabupaten Banjarnegara.',
            highlights: [
                'Bagian Hukum – Pusat JDIH',
                'BUMD Kabupaten Banjarnegara',
                'Perangkat Daerah / OPD',
                'Bagian pada Setda',
                'Desa / Kelurahan',
                'BLUD',
            ],
        },
    ];

    const currentIdx = active !== null ? DIAGRAMS_DEFAULT.findIndex((d) => d.id === active) : -1;
    const currentDiagram = currentIdx >= 0 ? DIAGRAMS_DEFAULT[currentIdx] : null;

    function goPrev() {
        if (currentIdx > 0) setActive(DIAGRAMS_DEFAULT[currentIdx - 1].id);
    }
    function goNext() {
        if (currentIdx < DIAGRAMS_DEFAULT.length - 1) setActive(DIAGRAMS_DEFAULT[currentIdx + 1].id);
    }

    return (
        <PublicLayout>
            <Head title="Struktur Organisasi – JDIH Banjarnegara" />

            <PageHeader
                title="Struktur Organisasi"
                subtitle="Susunan organisasi Bagian Hukum dan Tim JDIH Sekretariat Daerah Kabupaten Banjarnegara"
                breadcrumbs={[{ label: 'Profil Kami' }, { label: 'Struktur Organisasi' }]}
            />

            <section className="py-12 px-6 bg-slate-50">
                <div className="max-w-6xl mx-auto">
                    {item ? (
                        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm p-8 prose prose-slate max-w-none">
                            <div dangerouslySetInnerHTML={{ __html: item.content }} />
                        </div>
                    ) : (
                        <>
                            {/* Tab-like header */}
                            <div className="text-center mb-10">
                                <p className="text-[#0d9488] font-bold text-xs uppercase tracking-widest mb-2">Bagan Organisasi</p>
                                <p className="text-slate-500 text-sm max-w-xl mx-auto">
                                    Klik gambar untuk memperbesar. Terdapat {DIAGRAMS_DEFAULT.length} bagan struktur yang menggambarkan
                                    susunan organisasi dan jaringan JDIH Kabupaten Banjarnegara.
                                </p>
                            </div>

                            {/* Card grid */}
                            <div className="space-y-8">
                                {DIAGRAMS_DEFAULT.map((diagram, i) => (
                                    <div
                                        key={diagram.id}
                                        className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <div className="bg-[#1e293b] px-6 py-4 flex items-center gap-4">
                                            <div className="h-8 w-8 bg-[#0d9488] rounded flex items-center justify-center font-bold text-white text-sm shrink-0">
                                                {i + 1}
                                            </div>
                                            <div>
                                                <h2 className="text-white font-bold">{diagram.title}</h2>
                                                <p className="text-[#0d9488] text-xs">{diagram.subtitle}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                                            <div
                                                className="lg:col-span-2 relative group cursor-zoom-in bg-white border-r border-slate-100"
                                                onClick={() => setActive(diagram.id)}
                                            >
                                                <img
                                                    src={diagram.src}
                                                    alt={diagram.title}
                                                    className="w-full h-auto object-contain max-h-[400px] p-4"
                                                />
                                                <div className="absolute inset-0 bg-[#1e293b]/0 group-hover:bg-[#1e293b]/10 flex items-center justify-center transition-all">
                                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#1e293b]/80 text-white rounded-full h-12 w-12 flex items-center justify-center shadow-lg">
                                                        <ZoomIn className="h-6 w-6" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-6 flex flex-col justify-between bg-slate-50 border-l border-slate-100">
                                                <div>
                                                    <h3 className="font-bold text-[#1e293b] text-sm mb-3">Keterangan</h3>
                                                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                                        {diagram.description}
                                                    </p>

                                                    <h3 className="font-bold text-[#1e293b] text-sm mb-3">Komponen Utama</h3>
                                                    <ul className="space-y-2">
                                                        {diagram.highlights.map((item, j) => (
                                                            <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                                                                <span className="h-5 w-5 bg-[#0d9488]/10 text-[#0d9488] rounded text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                                                                    {j + 1}
                                                                </span>
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <button
                                                    onClick={() => setActive(diagram.id)}
                                                    className="mt-6 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0d9488] text-white text-sm font-semibold rounded hover:bg-teal-600 transition-colors"
                                                >
                                                    <ZoomIn className="h-4 w-4" /> Perbesar Gambar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <p className="text-center text-slate-400 text-xs mt-8">
                                * Klik gambar atau tombol "Perbesar Gambar" untuk melihat detail bagan secara fullscreen.
                                Gunakan tombol panah untuk berpindah antar bagan.
                            </p>
                        </>
                    )}
                </div>
            </section>

            {currentDiagram && (
                <Lightbox
                    diagram={currentDiagram}
                    onClose={() => setActive(null)}
                    onPrev={goPrev}
                    onNext={goNext}
                    hasPrev={currentIdx > 0}
                    hasNext={currentIdx < DIAGRAMS_DEFAULT.length - 1}
                />
            )}
        </PublicLayout>
    );
}
