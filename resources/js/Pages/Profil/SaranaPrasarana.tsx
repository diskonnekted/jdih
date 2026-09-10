import React from 'react';
import Head from 'inertia-head';
import { 
    Building2, 
    Monitor, 
    Database, 
    Wifi, 
    Server, 
    Printer, 
    Cpu, 
    HardDrive, 
    FolderOpen,
    ShieldCheck,
    CheckCircle2,
    AlertCircle
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
                {condition.replace('_', ' ').charAt(0).toUpperCase() + condition.replace('_', ' ').slice(1)}
            </span>
        );
    };

    const renderCategory = (category: string, items: InfrastructureItem[]) => {
        const Icon = categoryIcons[category] || Building2;
        
        if (items.length === 0) return null;

        return (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-teal-50 to-white">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-teal-100 rounded-xl">
                            <Icon className="h-6 w-6 text-teal-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">{categoryLabels[category]}</h3>
                            <p className="text-sm text-slate-500">{items.length} item terdaftar</p>
                        </div>
                    </div>
                </div>

                <div className="divide-y divide-slate-100">
                    {items.map((item) => (
                        <div key={item.id} className="p-6 hover:bg-slate-50 transition-colors">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h4 className="font-bold text-slate-900">{item.name}</h4>
                                        {getConditionBadge(item.condition)}
                                    </div>
                                    {item.description && (
                                        <p className="text-sm text-slate-600 mb-2">{item.description}</p>
                                    )}
                                    {item.specification && (
                                        <div className="flex items-center gap-2 text-sm text-slate-500">
                                            <ShieldCheck className="h-4 w-4" />
                                            <span>Spesifikasi: {item.specification}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-black text-teal-600">{item.quantity}</div>
                                    <div className="text-xs text-slate-400 uppercase tracking-wide">Unit</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const totalItems = Object.values(infrastructures).reduce((sum, items) => sum + items.length, 0);
    const totalUnits = Object.values(infrastructures).reduce((sum, items) => sum + items.reduce((s, i) => s + i.quantity, 0), 0);

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            <Head title="Sarana & Prasarana - JDIH Kabupaten Banjarnegara" />

            {/* Header */}
            <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white">
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm">
                            <Server className="h-8 w-8" />
                        </div>
                        <h1 className="text-3xl font-black tracking-tight">Sarana & Prasarana</h1>
                    </div>
                    <p className="text-teal-100 text-lg max-w-2xl">
                        Infrastruktur fisik dan digital yang mendukung pengelolaan dokumen hukum di JDIH Kabupaten Banjarnegara
                    </p>
                </div>
            </div>

            {/* Stats */}
            <div className="max-w-7xl mx-auto px-4 -mt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 text-center">
                        <div className="text-3xl font-black text-slate-900">{totalItems}</div>
                        <div className="text-xs text-slate-500 uppercase tracking-wide mt-1">Total Item</div>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 text-center">
                        <div className="text-3xl font-black text-teal-600">{totalUnits}</div>
                        <div className="text-xs text-slate-500 uppercase tracking-wide mt-1">Total Unit</div>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 text-center">
                        <div className="text-3xl font-black text-emerald-600">
                            {Object.values(infrastructures).flat().filter(i => i.condition === 'baik').length}
                        </div>
                        <div className="text-xs text-slate-500 uppercase tracking-wide mt-1">Kondisi Baik</div>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 text-center">
                        <div className="text-3xl font-black text-slate-900">4</div>
                        <div className="text-xs text-slate-500 uppercase tracking-wide mt-1">Kategori</div>
                    </div>
                </div>
            </div>

            {/* Categories */}
            <div className="max-w-7xl mx-auto px-4 py-12 space-y-6">
                {renderCategory('ruangan', infrastructures.ruangan)}
                {renderCategory('perangkat_keras', infrastructures.perangkat_keras)}
                {renderCategory('perangkat_lunak', infrastructures.perangkat_lunak)}
                {renderCategory('jaringan', infrastructures.jaringan)}
            </div>

            {/* Footer spacing */}
            <div className="h-12" />
        </div>
    );
}
