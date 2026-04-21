<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DashboardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Categories (Document Categories)
        $categories = [
            ['name' => 'Peraturan Daerah (Perda)', 'slug' => 'perda', 'code' => 'PERDA'],
            ['name' => 'Peraturan Bupati (Perbup)', 'slug' => 'perbup', 'code' => 'PERBUP'],
            ['name' => 'Keputusan Bupati', 'slug' => 'kepbup', 'code' => 'KEPBUP'],
            ['name' => 'Surat Edaran', 'slug' => 'surat-edaran', 'code' => 'SE'],
            ['name' => 'Putusan', 'slug' => 'putusan', 'code' => 'PUTUSAN'],
            ['name' => 'Kesepakatan Bersama', 'slug' => 'kesepakatan-bersama', 'code' => 'KB'],
            ['name' => 'Letter of Intent', 'slug' => 'letter-of-intent', 'code' => 'LOI'],
            ['name' => 'Naskah Akademik', 'slug' => 'naskah-akademik', 'code' => 'NA'],
            ['name' => 'Analisis Dan Evaluasi Hukum', 'slug' => 'analisis-evaluasi-hukum', 'code' => 'AEH'],
            ['name' => 'Artikel Bidang Hukum', 'slug' => 'artikel-bidang-hukum', 'code' => 'ARTIKEL'],
            ['name' => 'Raperda', 'slug' => 'raperda', 'code' => 'RAPERDA'],
            ['name' => 'Peraturan Kepala OPD', 'slug' => 'peraturan-kepala-opd', 'code' => 'PERKAP-OPD'],
            ['name' => 'Keputusan Kepala OPD', 'slug' => 'keputusan-kepala-opd', 'code' => 'KEPKAP-OPD'],
            ['name' => 'Dokumen Hukum Terjemahan', 'slug' => 'dokumen-hukum-terjemahan', 'code' => 'TERJEMAHAN'],
            ['name' => 'Surat Edaran Sekretaris Daerah', 'slug' => 'se-sekda', 'code' => 'SE-SEKDA'],
            ['name' => 'Surat Edaran Kepala OPD', 'slug' => 'se-kepala-opd', 'code' => 'SE-OPD'],
            ['name' => 'Dokumen Hukum Langka', 'slug' => 'dokumen-hukum-langka', 'code' => 'LANGKA'],
            ['name' => 'Keputusan Sekretaris Daerah', 'slug' => 'keputusan-sekda', 'code' => 'KEP-SEKDA'],
            ['name' => 'Propemperda', 'slug' => 'propemperda', 'code' => 'PROPEMPERDA'],
            ['name' => 'Keputusan DPRD', 'slug' => 'keputusan-dprd', 'code' => 'KEP-DPRD'],
            ['name' => 'Memorandum of Understanding', 'slug' => 'mou', 'code' => 'MOU'],
            ['name' => 'Kerja Sama Daerah', 'slug' => 'kerja-sama-daerah', 'code' => 'KERJASAMA'],
            ['name' => 'Nota Kesepakatan', 'slug' => 'nota-kesepakatan', 'code' => 'NOTA'],
            ['name' => 'Hasil Fasilitasi Raperda Kabupaten/Kota', 'slug' => 'fasilitasi-raperda-kab', 'code' => 'FAS-KAB'],
            ['name' => 'Hasil Fasilitasi Raperda Provinsi', 'slug' => 'fasilitasi-raperda-prov', 'code' => 'FAS-PROV'],
            ['name' => 'Risalah Rapat', 'slug' => 'risalah-rapat', 'code' => 'RISALAH'],
        ];

        foreach ($categories as $cat) {
            \App\Models\Category::updateOrCreate(['slug' => $cat['slug']], $cat);
        }

        // 2. Legal Documents (Example)
        $perdaCat = \App\Models\Category::where('code', 'PERDA')->first();
        $perbupCat = \App\Models\Category::where('code', 'PERBUP')->first();

        \App\Models\LegalDocument::create([
            'title' => 'Pengelolaan Sampah dan Retribusi Pelayanan Kebersihan',
            'document_number' => '1',
            'year' => 2024,
            'category_id' => $perdaCat->id,
            'status' => 'Berlaku',
            'published_at' => '2024-01-15',
        ]);

        \App\Models\LegalDocument::create([
            'title' => 'Pemberian Insentif Pajak Bagi UMKM Terdampak Ekonomi',
            'document_number' => '24',
            'year' => 2023,
            'category_id' => $perbupCat->id,
            'status' => 'Berlaku',
            'published_at' => '2023-12-05',
        ]);

        // 3. News
        \App\Models\News::updateOrCreate(
            ['slug' => 'sosialisasi-perda-baru'],
            [
                'title' => 'Sosialisasi Perda Baru tentang Lingkungan Hidup',
                'content' => 'Pemerintah daerah melakukan sosialisasi intensif...',
                'published_at' => now(),
                'status' => 'published',
            ]
        );

        // 4. Profile Items
        \App\Models\ProfileItem::updateOrCreate(
            ['slug' => 'visi-misi'],
            [
                'title' => 'Visi Misi',
                'content' => 'Visi: Menjadi pusat dokumentasi hukum terdepan...',
                'sort_order' => 1,
            ]
        );

        \App\Models\ProfileItem::updateOrCreate(
            ['slug' => 'struktur-organisasi'],
            [
                'title' => 'Struktur Organisasi',
                'content' => 'Kepala Bagian Hukum...',
                'sort_order' => 2,
            ]
        );
    }
}
