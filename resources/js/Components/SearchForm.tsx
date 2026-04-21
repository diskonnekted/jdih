import React, { useState } from 'react';
import { Search } from 'lucide-react';

/* ------------------------------------------------------------------ */
/* CONSTANTS                                                           */
/* ------------------------------------------------------------------ */
const JENIS_DOKUMEN = [
    'Peraturan Daerah',
    'Peraturan Bupati',
    'Keputusan Bupati',
    'Instruksi Bupati',
    'Keputusan Sekretaris Daerah',
    'Surat Edaran',
    'Dokumen Hukum Terjemahan',
    'Dokumen Hukum Langka',
    'Naskah Akademik',
    'Raperda',
    'Analisis & Evaluasi Hukum',
    'RANHAM',
    'Risalah Rapat',
    'Artikel Bidang Hukum',
    'Propemperda',
    'Katalog',
    'Putusan',
    'Kerja Sama Daerah',
];

const STATUS_DOKUMEN = [
    'Berlaku',
    'Dicabut',
    'Diubah',
    'Tidak Berlaku',
];

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: CURRENT_YEAR - 1979 }, (_, i) => CURRENT_YEAR - i);

/* ------------------------------------------------------------------ */
/* TYPES                                                               */
/* ------------------------------------------------------------------ */
export interface SearchValues {
    namaDokumen: string;
    jenisDokumen: string;
    nomor: string;
    tahun: string;
    status: string;
}

interface Props {
    /** Nilai awal field (opsional, untuk pre-fill dari URL params) */
    initialValues?: Partial<SearchValues>;
    /** Callback ketika tombol Cari diklik */
    onSearch?: (values: SearchValues) => void;
    /** Sembunyikan field Jenis Dokumen (jika halaman sudah spesifik satu kategori) */
    hideJenis?: boolean;
    /** Label default untuk Jenis Dokumen (mis. sudah terpilih dari halaman) */
    jenisDokumenDefault?: string;
    /** Mode: 'full' (landing page) | 'compact' (halaman daftar) */
    mode?: 'full' | 'compact';
}

/* ------------------------------------------------------------------ */
/* COMPONENT                                                           */
/* ------------------------------------------------------------------ */
export default function SearchForm({
    initialValues = {},
    onSearch,
    hideJenis = false,
    jenisDokumenDefault = '',
    mode = 'full',
}: Props) {
    const [values, setValues] = useState<SearchValues>({
        namaDokumen: initialValues.namaDokumen ?? '',
        jenisDokumen: initialValues.jenisDokumen ?? jenisDokumenDefault,
        nomor: initialValues.nomor ?? '',
        tahun: initialValues.tahun ?? '',
        status: initialValues.status ?? '',
    });

    function handleChange(field: keyof SearchValues, val: string) {
        setValues((prev) => ({ ...prev, [field]: val }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onSearch?.(values);
    }

    function handleReset() {
        const reset: SearchValues = {
            namaDokumen: '',
            jenisDokumen: jenisDokumenDefault,
            nomor: '',
            tahun: '',
            status: '',
        };
        setValues(reset);
        onSearch?.(reset);
    }

    const isCompact = mode === 'compact';

    return (
        <form
            onSubmit={handleSubmit}
            className={`bg-white border border-slate-200 rounded-xl shadow-sm ${isCompact ? 'p-5' : 'p-6 md:p-8'}`}
        >
            {!isCompact && (
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                    <div className="h-8 w-8 bg-[#0d9488] rounded-lg flex items-center justify-center shrink-0">
                        <Search className="h-4 w-4 text-white" />
                    </div>
                    <div>
                        <h3 className="font-bold text-[#1e293b] text-base">Pencarian Dokumen Hukum</h3>
                        <p className="text-xs text-slate-400">
                            Temukan peraturan dan produk hukum Kabupaten Banjarnegara
                        </p>
                    </div>
                </div>
            )}

            <div className="space-y-4">
                {/* Row 1: Nama Dokumen */}
                <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                        Nama Dokumen
                    </label>
                    <input
                        type="text"
                        placeholder="Masukkan Nama Dokumen"
                        value={values.namaDokumen}
                        onChange={(e) => handleChange('namaDokumen', e.target.value)}
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488]/20 transition-colors"
                    />
                </div>

                {/* Row 2: Jenis Dokumen */}
                {!hideJenis && (
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                            Jenis Dokumen
                        </label>
                        <select
                            value={values.jenisDokumen}
                            onChange={(e) => handleChange('jenisDokumen', e.target.value)}
                            className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488]/20 transition-colors bg-white appearance-none cursor-pointer"
                        >
                            <option value="">-Jenis Dokumen-</option>
                            {JENIS_DOKUMEN.map((j) => (
                                <option key={j} value={j}>{j}</option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Row 3: Nomor | Tahun | Status */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Nomor */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                            Nomor
                        </label>
                        <input
                            type="text"
                            placeholder="Nomor Dokumen"
                            value={values.nomor}
                            onChange={(e) => handleChange('nomor', e.target.value)}
                            className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488]/20 transition-colors"
                        />
                    </div>

                    {/* Tahun */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                            Tahun
                        </label>
                        <select
                            value={values.tahun}
                            onChange={(e) => handleChange('tahun', e.target.value)}
                            className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488]/20 transition-colors bg-white appearance-none cursor-pointer"
                        >
                            <option value="">-Pilih Tahun-</option>
                            {YEARS.map((y) => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                            Status
                        </label>
                        <select
                            value={values.status}
                            onChange={(e) => handleChange('status', e.target.value)}
                            className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488]/20 transition-colors bg-white appearance-none cursor-pointer"
                        >
                            <option value="">-Pilih Status-</option>
                            {STATUS_DOKUMEN.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                        type="submit"
                        className="flex items-center gap-2 px-8 py-2.5 border-2 border-[#0d9488] text-[#0d9488] font-bold text-sm rounded-lg hover:bg-[#0d9488] hover:text-white transition-all duration-200"
                    >
                        <Search className="h-4 w-4" />
                        CARI
                    </button>
                    {(values.namaDokumen || values.jenisDokumen !== jenisDokumenDefault || values.nomor || values.tahun || values.status) && (
                        <button
                            type="button"
                            onClick={handleReset}
                            className="px-5 py-2.5 border border-slate-200 text-slate-500 font-medium text-sm rounded-lg hover:border-slate-400 hover:text-slate-700 transition-colors"
                        >
                            Reset
                        </button>
                    )}
                </div>
            </div>
        </form>
    );
}
