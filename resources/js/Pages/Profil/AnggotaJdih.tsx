import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import { Building2, Globe } from 'lucide-react';

interface Member {
    no: number;
    nama: string;
    url: string;
    kategori: string;
}

const KATEGORI_COLORS: Record<string, string> = {
    'Perangkat Daerah': '#0d9488',
    'Legislatif': '#1e293b',
    'Dinas': '#6366f1',
    'UPTD': '#f59e0b',
    'Badan': '#ec4899',
    'Lainnya': '#64748b',
};

const DEFAULT_MEMBERS: Member[] = [
    { no: 1, nama: 'Sekretariat Daerah Kab. Banjarnegara', url: 'https://setda.banjarnegarakab.go.id', kategori: 'Perangkat Daerah' },
    { no: 2, nama: 'DPRD Kab. Banjarnegara', url: 'https://dprd.banjarnegarakab.go.id', kategori: 'Legislatif' },
    { no: 3, nama: 'Inspektorat Daerah', url: 'https://inspektorat.banjarnegarakab.go.id', kategori: 'Perangkat Daerah' },
    { no: 4, nama: 'Badan Kepegawaian Daerah (BKD)', url: 'https://bkd.banjarnegarakab.go.id', kategori: 'Badan' },
    { no: 5, nama: 'BAPERLITBANG', url: 'https://baperlitbang.banjarnegarakab.go.id', kategori: 'Badan' },
    { no: 6, nama: 'BPPKAD', url: 'https://bppkad.banjarnegarakab.go.id', kategori: 'Badan' },
    { no: 7, nama: 'BPBD', url: 'https://bpbd.banjarnegarakab.go.id', kategori: 'Badan' },
    { no: 8, nama: 'Dinas Pendidikan Pemuda dan Olahraga', url: 'https://dindikpora.banjarnegarakab.go.id', kategori: 'Dinas' },
    { no: 9, nama: 'Dinas Kesehatan', url: 'https://dinkes.banjarnegarakab.go.id', kategori: 'Dinas' },
    { no: 10, nama: 'DPUPR', url: 'https://dpupr.banjarnegarakab.go.id', kategori: 'Dinas' },
    { no: 11, nama: 'DPKP LH', url: 'https://dpkplh.banjarnegarakab.go.id', kategori: 'Dinas' },
    { no: 12, nama: 'Dinas Sosial PPPA', url: 'https://dinsospppa.banjarnegarakab.go.id', kategori: 'Dinas' },
    { no: 13, nama: 'DISNAKER PMPTSP', url: 'https://disnakerpmptsp.banjarnegarakab.go.id', kategori: 'Dinas' },
    { no: 14, nama: 'DINDUKCAPIL', url: 'https://dindukcapil.banjarnegarakab.go.id', kategori: 'Dinas' },
    { no: 15, nama: 'DISPERMADES PPKB', url: 'https://dispermadesppkb.banjarnegarakab.go.id', kategori: 'Dinas' },
    { no: 16, nama: 'DINKOMINFO', url: 'https://dinkominfo.banjarnegarakab.go.id', kategori: 'Dinas' },
    { no: 17, nama: 'DINHUB', url: 'https://dinhub.banjarnegarakab.go.id', kategori: 'Dinas' },
    { no: 18, nama: 'DISARPUS', url: 'https://disarpus.banjarnegarakab.go.id', kategori: 'Dinas' },
    { no: 19, nama: 'DISPARBUD', url: 'https://wisata.banjarnegarakab.go.id', kategori: 'Dinas' },
    { no: 20, nama: 'DISTANKAN', url: 'https://distankan.banjarnegarakab.go.id', kategori: 'Dinas' },
    { no: 21, nama: 'RSUD Banjarnegara', url: 'https://rsud.banjarnegarakab.go.id', kategori: 'UPTD' },
    { no: 22, nama: 'Satuan Polisi Pamong Praja', url: 'https://satpolpp.banjarnegarakab.go.id', kategori: 'Perangkat Daerah' },
];

export default function AnggotaJdih({ members = [] }: { members?: any[] }) {
    // Map raw DB members or fall back to defaults
    const displayMembers: Member[] = members.length > 0
        ? members.map((m, i) => ({
            no: i + 1,
            nama: m.name ?? m.nama ?? '',
            url: m.url ?? '',
            kategori: m.category ?? m.kategori ?? 'Perangkat Daerah',
        }))
        : DEFAULT_MEMBERS;

    // Collect unique categories from actual data
    const usedCategories = Array.from(new Set(displayMembers.map((m) => m.kategori)));

    return (
        <PublicLayout>
            <Head title="Anggota JDIH Banjarnegara – JDIH Banjarnegara" />
            <PageHeader
                title="Anggota JDIH Banjarnegara"
                subtitle="Daftar perangkat daerah yang tergabung dalam Jaringan Dokumentasi dan Informasi Hukum Kabupaten Banjarnegara"
                breadcrumbs={[{ label: 'Profil Kami' }, { label: 'Anggota JDIH' }]}
            />
            <section className="py-12 px-6">
                <div className="max-w-5xl mx-auto">
                    {/* Summary cards — only show categories that exist */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        {usedCategories.map((kat) => {
                            const count = displayMembers.filter((m) => m.kategori === kat).length;
                            const color = KATEGORI_COLORS[kat] ?? '#64748b';
                            return (
                                <div key={kat} className="bg-white border border-slate-200 rounded-lg p-4 flex items-center gap-3">
                                    <div className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: color }} />
                                    <div>
                                        <div className="text-xs text-slate-500">{kat}</div>
                                        <div className="font-bold text-[#1e293b]">{count} OPD</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Table */}
                    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                        <div className="bg-[#1e293b] px-6 py-4 flex items-center gap-3">
                            <Building2 className="h-5 w-5 text-[#0d9488]" />
                            <h2 className="text-white font-bold">Daftar Anggota JDIH ({displayMembers.length} OPD)</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200">
                                        <th className="px-4 py-3 text-left text-[#1e293b] font-bold w-12 text-center">No</th>
                                        <th className="px-4 py-3 text-left text-[#1e293b] font-bold">Nama Instansi</th>
                                        <th className="px-4 py-3 text-left text-[#1e293b] font-bold">Kategori</th>
                                        <th className="px-4 py-3 text-left text-[#1e293b] font-bold">Website</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayMembers.map((a, i) => (
                                        <tr key={i} className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${i % 2 !== 0 ? 'bg-slate-50/40' : ''}`}>
                                            <td className="px-4 py-3 text-center text-slate-400 font-mono text-xs">{String(a.no).padStart(2, '0')}</td>
                                            <td className="px-4 py-3 font-medium text-[#1e293b]">{a.nama}</td>
                                            <td className="px-4 py-3">
                                                <span
                                                    className="text-[10px] font-bold px-2 py-0.5 rounded text-white uppercase tracking-wider"
                                                    style={{ backgroundColor: KATEGORI_COLORS[a.kategori] ?? '#64748b' }}
                                                >
                                                    {a.kategori}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                {a.url ? (
                                                    <a
                                                        href={a.url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="flex items-center gap-1 text-[#0d9488] hover:text-teal-700 transition-colors text-xs font-semibold"
                                                    >
                                                        <Globe className="h-3.5 w-3.5" /> Kunjungi
                                                    </a>
                                                ) : (
                                                    <span className="text-slate-300 text-xs">-</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
