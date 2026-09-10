import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import {
    Building2,
    Monitor,
    Database,
    Wifi,
    CheckCircle2,
    AlertCircle,
    Package,
} from 'lucide-react';

interface InfrastructureItem {
    id: number;
    category: string;
    name: string;
    description: string;
    specification: string;
    quantity: number;
    condition: string;
    photo_path: string | null;
}

interface Props {
    infrastructures: {
        ruangan: InfrastructureItem[];
        perangkat_keras: InfrastructureItem[];
        perangkat_lunak: InfrastructureItem[];
        jaringan: InfrastructureItem[];
    };
}

const categoryIcons: Record<string, typeof Building2> = {
    ruangan: Building2,
    perangkat_keras: Monitor,
    perangkat_lunak: Database,
    jaringan: Wifi,
};

const categoryLabels: Record<string, string> = {
    ruangan: 'Ruang Kerja & Fasilitas',
    perangkat_keras: 'Perangkat Keras',
    perangkat_lunak: 'Perangkat Lunak',
    jaringan: 'Jaringan & Infrastruktur IT',
};

const categoryOrder = ['ruangan', 'perangkat_keras', 'perangkat_lunak', 'jaringan'];

export default function SaranaPrasarana({ infrastructures }: Props) {
    const getConditionBadge = (condition: string) => {
        const styles: Record<string, string> = {
            baik: 'bg-emerald-100 text-emerald-700',
            rusak_ringan: 'bg-amber-100 text-amber-700',
            rusak_berat: 'bg-red-100 text-red-700',
        };
        return (
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${styles[condition] || 'bg-gray-100 text-gray-700'}`}>
                {condition === 'baik' && <CheckCircle2 className="h-3 w-3" />}
                {(condition === 'rusak_ringan' || condition === 'rusak_berat') && <AlertCircle className="h-3 w-3" />}
                {condition.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
            </span>
        );
    };

    const allItems = Object.values(infrastructures ?? {}).flat();
    const totalUnits = allItems.reduce((s, i) => s + i.quantity, 0);
    const totalBaik = allItems.filter((i) => i.condition === 'baik').length;

    const renderCategory = (category: string) => {
        const items = infrastructures?.[category as keyof Props['infrastructures']] ?? [];
        if (items.length === 0) return null;

        const Icon = categoryIcons[category] || Package;

        return (
            <div key={category} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="bg-[#0d9488] px-6 py-4 flex items-center gap-3">
                    <Icon className="h-6 w-6 text-white" />
                    <h2 className="text-lg font-bold text-white tracking-wide">
                        {categoryLabels[category] ?? category}
                    </h2>
                    <span className="ml-auto text-teal-100 text-sm font-medium">
                        {items.length} item
                    </span>
                </div>
                <div className="divide-y divide-slate-100">
                    {items.map((item) => (
                        <div key={item.id} className="px-6 py-4 flex items-start justify-between gap-4 hover:bg-slate-50 transition-colors">
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                    <h3 className="font-bold text-[#1e293b]">{item.name}</h3>
                                    {getConditionBadge(item.condition)}
                                </div>
                                {item.description && (
                                    <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                                )}
                                {item.specification && (
                                    <p className="text-xs text-slate-500 mt-1">
                                        <span className="font-semibold text-slate-600">Spesifikasi:</span> {item.specification}
                                    </p>
                                )}
                            </div>
                            <div className="text-right shrink-0">
                                <div className="text-xl font-black text-[#0d9488]">{item.quantity}</div>
                                <div className="text-[10px] text-slate-400 uppercase tracking-wide">Unit</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <PublicLayout>
            <Head title="Sarana & Prasarana – JDIH Banjarnegara" />
            <PageHeader
                title="Sarana & Prasarana"
                subtitle="Infrastruktur fisik dan digital pendukung pengelolaan dokumen hukum di JDIH Kabupaten Banjarnegara"
                breadcrumbs={[{ label: 'Profil Kami' }, { label: 'Sarana & Prasarana' }]}
            />

            <section className="py-12 px-6">
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Ringkasan */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm">
                            <div className="text-2xl font-black text-[#1e293b]">{allItems.length}</div>
                            <div className="text-[11px] text-slate-500 uppercase tracking-wide mt-1">Total Item</div>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm">
                            <div className="text-2xl font-black text-[#0d9488]">{totalUnits}</div>
                            <div className="text-[11px] text-slate-500 uppercase tracking-wide mt-1">Total Unit</div>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm">
                            <div className="text-2xl font-black text-emerald-600">{totalBaik}</div>
                            <div className="text-[11px] text-slate-500 uppercase tracking-wide mt-1">Kondisi Baik</div>
                        </div>
                    </div>

                    {/* Kategori */}
                    {categoryOrder.map(renderCategory)}

                    {allItems.length === 0 && (
                        <div className="bg-white border border-slate-200 rounded-xl p-10 text-center text-slate-500 shadow-sm">
                            Data sarana & prasarana belum tersedia.
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
