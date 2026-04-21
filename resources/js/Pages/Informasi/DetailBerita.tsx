import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import { Calendar, Tag, ArrowLeft, Share2, Newspaper } from 'lucide-react';

interface Props {
    slug: string;
}

// Mock article data based on slug
const ARTICLES: Record<string, { judul: string; tanggal: string; kategori: string; isi: string }> = {
    'infografis-perda-8-2025': {
        judul: 'Infografis Peraturan Daerah Nomor 8 Tahun 2025 Tentang Perubahan Atas Peraturan Daerah Nomor 8 Tahun 2023 Tentang Pajak Daerah Dan Retribusi Daerah',
        tanggal: '2025-12-15', kategori: 'Infografis',
        isi: 'Kabupaten Banjarnegara telah menerbitkan Peraturan Daerah Nomor 8 Tahun 2025 yang mengatur perubahan atas kebijakan pajak daerah dan retribusi daerah. Peraturan ini merupakan pembaruan dari Perda Nomor 8 Tahun 2023 yang menyesuaikan dengan perkembangan regulasi nasional dan kebutuhan daerah.\n\nPerubahan utama dalam peraturan ini meliputi penyesuaian tarif pajak daerah, penambahan jenis retribusi baru, serta penyederhanaan prosedur pembayaran. Hal ini diharapkan dapat meningkatkan pendapatan asli daerah dan memberikan kemudahan bagi masyarakat dalam membayar kewajiban pajaknya.\n\nSosialisasi peraturan ini telah dilaksanakan kepada seluruh perangkat daerah dan masyarakat umum. Perda ini mulai berlaku sejak tanggal diundangkan.'
    },
    'penandatanganan-mou-kejaksaan': {
        judul: 'Penandatanganan MOU Dengan Kejaksaan Negeri Terkait Pelaksanaan Pidana Kerja Sosial',
        tanggal: '2025-10-05', kategori: 'Kerja Sama',
        isi: 'Pemerintah Kabupaten Banjarnegara melalui Bagian Hukum Sekretariat Daerah telah menandatangani Memorandum of Understanding (MOU) dengan Kejaksaan Negeri Banjarnegara terkait pelaksanaan pidana kerja sosial di wilayah Kabupaten Banjarnegara.\n\nMOU ini merupakan wujud nyata komitmen pemerintah daerah dalam mendukung program restorative justice yang digagas oleh Jaksa Agung RI. Melalui kerja sama ini, pelaku tindak pidana ringan dapat menjalani sanksi berupa kerja sosial yang bermanfaat bagi masyarakat.\n\nPenandatanganan dilaksanakan oleh Sekretaris Daerah Kabupaten Banjarnegara dan Kepala Kejaksaan Negeri Banjarnegara, disaksikan oleh jajaran pejabat dari kedua instansi.'
    },
};

function fmtDate(d: string) {
    return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function DetailBerita({ slug }: Props) {
    const article = ARTICLES[slug] ?? {
        judul: 'Artikel tidak ditemukan',
        tanggal: new Date().toISOString().split('T')[0],
        kategori: 'Berita',
        isi: 'Artikel yang Anda cari tidak tersedia atau telah dipindahkan.',
    };

    return (
        <PublicLayout>
            <Head title={`${article.judul} – JDIH Banjarnegara`} />
            <PageHeader
                title="Detail Berita"
                breadcrumbs={[
                    { label: 'Informasi' },
                    { label: 'Berita', href: '/berita' },
                    { label: article.kategori },
                ]}
            />
            <section className="py-10 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Article */}
                        <div className="lg:col-span-2">
                            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                                {/* Hero image placeholder */}
                                <div className="h-48 bg-[#1e293b] flex items-center justify-center">
                                    <Newspaper className="h-16 w-16 text-[#0d9488]" />
                                </div>
                                <div className="p-6">
                                    <div className="flex flex-wrap items-center gap-2 mb-4">
                                        <span className="text-xs font-bold px-2 py-0.5 rounded text-white bg-[#0d9488]">
                                            {article.kategori}
                                        </span>
                                        <span className="text-xs text-slate-400 flex items-center gap-1">
                                            <Calendar className="h-3.5 w-3.5" /> {fmtDate(article.tanggal)}
                                        </span>
                                    </div>
                                    <h1 className="text-xl font-bold text-[#1e293b] mb-6 leading-snug">{article.judul}</h1>
                                    <div className="text-slate-700 text-sm leading-relaxed space-y-4">
                                        {article.isi.split('\n\n').map((p, i) => (
                                            <p key={i}>{p}</p>
                                        ))}
                                    </div>

                                    {/* Tags & Share */}
                                    <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Tag className="h-4 w-4 text-slate-400" />
                                            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{article.kategori}</span>
                                        </div>
                                        <button className="flex items-center gap-2 text-sm text-slate-500 hover:text-[#0d9488] transition-colors">
                                            <Share2 className="h-4 w-4" /> Bagikan
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <Link href="/berita"
                                className="mt-4 flex items-center gap-2 text-sm text-slate-500 hover:text-[#0d9488] transition-colors">
                                <ArrowLeft className="h-4 w-4" /> Kembali ke Daftar Berita
                            </Link>
                        </div>

                        {/* Sidebar */}
                        <div>
                            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                                <div className="bg-[#1e293b] px-4 py-3">
                                    <h3 className="text-white font-bold text-sm">Berita Terkait</h3>
                                </div>
                                <div className="p-4 space-y-4">
                                    {['Study Referensi Temanggung', 'Forum Satu Data Indonesia', 'Bimtek Legal Drafting KPU', 'Sosialisasi Perda 2025'].map((title, i) => (
                                        <Link key={i} href="/berita" className="block group">
                                            <p className="text-sm font-medium text-[#1e293b] group-hover:text-[#0d9488] transition-colors leading-snug">{title}</p>
                                            <p className="text-xs text-slate-400 mt-0.5">{fmtDate(`2025-${String(12 - i).padStart(2, '0')}-01`)}</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
