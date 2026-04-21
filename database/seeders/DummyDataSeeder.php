<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ProfileItem;
use App\Models\LegalDecision;
use App\Models\Katalog;
use App\Models\KatalogDownload;
use App\Models\LegalDocument;
use App\Models\Category;
use App\Models\User;
use Illuminate\Support\Str;

class DummyDataSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Data Profil (6 sections)
        $profiles = [
            ['title' => 'Visi dan Misi', 'slug' => 'visi-misi', 'content' => '<p>Visi JDIH Banjarnegara: Terwujudnya Sistem Informasi Hukum yang Handal.</p>'],
            ['title' => 'Dasar Hukum', 'slug' => 'dasar-hukum', 'content' => '<p>Peraturan Presiden Nomor 33 Tahun 2012 tentang Jaringan Dokumentasi dan Informasi Hukum Nasional.</p>'],
            ['title' => 'Tupoksi Bagian Hukum', 'slug' => 'tupoksi', 'content' => '<p>Melaksanakan pengoordinasian perumusan kebijakan daerah, pengoordinasian pelaksanaan tugas Perangkat Daerah...</p>'],
            ['title' => 'Kedudukan dan Alamat', 'slug' => 'kedudukan-alamat', 'content' => '<p>Setda Kabupaten Banjarnegara, Jl. A. Yani No. 16 Banjarnegara.</p>'],
            ['title' => 'Struktur Organisasi', 'slug' => 'struktur-organisasi', 'content' => '<p>Bagan Struktur Organisasi Bagian Hukum Setda Kabupaten Banjarnegara.</p>'],
            ['title' => 'SOP', 'slug' => 'sop', 'content' => '<p>Standar Operasional Prosedur Pengelolaan JDIH.</p>'],
        ];

        foreach ($profiles as $profile) {
            ProfileItem::updateOrCreate(['slug' => $profile['slug']], $profile);
        }

        // 2. Kategori Produk Hukum
        $categories = [
            'Peraturan Daerah', 'Peraturan Bupati', 'Keputusan Bupati', 'Surat Edaran', 'Instruksi Bupati'
        ];
        foreach ($categories as $cat) {
            Category::firstOrCreate(['name' => $cat], ['slug' => Str::slug($cat)]);
        }

        // 3. Produk Hukum (LegalDocument)
        $catId = Category::first()->id;
        for ($i = 1; $i <= 5; $i++) {
            LegalDocument::updateOrCreate(
                ['title' => "Dokumen Produk Hukum Contoh #$i"],
                [
                    'category_id' => $catId,
                    'document_number' => "REG-2025-00$i",
                    'year' => 2025,
                    'status' => 'Berlaku',
                    'file_path' => 'dummy.pdf',
                ]
            );
        }

        // 4. Putusan (LegalDecision)
        $courts = ['Pengadilan Negeri', 'Pengadilan Agama', 'PTUN'];
        for ($i = 1; $i <= 5; $i++) {
            LegalDecision::updateOrCreate(
                ['document_number' => "PUT-00$i/2025"],
                [
                    'title' => "Putusan Perkara Contoh Nomor $i",
                    'year' => 2025,
                    'court_type' => $courts[array_rand($courts)],
                    'status' => 'Inkracht',
                    'file_path' => 'putusan.pdf',
                ]
            );
        }

        // 5. Katalog
        // 5. Katalog
        $katalogData = [
            [
                'category' => 'Peraturan Daerah',
                'document_number' => '22 Tahun 2015',
                'date_stipulated' => '2015-12-28',
                'date_promulgated' => '2016-01-25',
                'title' => 'Wajib Belajar Pendidikan Dasar Sembilan Tahun',
                'source' => 'Lembaran Daerah Kabupaten Banjarnegara Tahun 2015 Nomor 22',
                'status' => 'Berlaku',
                'publish_year' => 2015,
            ],
            [
                'category' => 'Peraturan Bupati',
                'document_number' => '55 Tahun 2021',
                'date_stipulated' => '2021-12-07',
                'date_promulgated' => '2021-12-31',
                'title' => 'Zona Persebaran Pembangunan Menara',
                'source' => 'Berita Daerah Kabupaten Banjarnegara Tahun 2021 Nomor 55',
                'status' => 'Berlaku',
                'publish_year' => 2021,
            ],
            [
                'category' => 'Peraturan Bupati',
                'document_number' => '202 Tahun 2011',
                'date_stipulated' => '2011-03-30',
                'date_promulgated' => '2011-03-30',
                'title' => 'Usaha Pariwisata Minat Khusus Arung Jeram di Kabupaten Banjarnegara',
                'source' => 'Berita Daerah Kabupaten Banjarnegara Tahun 2011 Nomor 13 Seri E',
                'status' => 'Tidak Berlaku',
                'publish_year' => 2011,
            ],
        ];

        foreach ($katalogData as $kData) {
            Katalog::updateOrCreate(
                ['document_number' => $kData['document_number']],
                $kData
            );
        }

        // 6. Katalog Download
        for ($i = 1; $i <= 3; $i++) {
            KatalogDownload::updateOrCreate(
                ['no' => "KBH-DL-00$i"],
                [
                    'title' => "File Download Katalog #$i",
                    'file_path' => "katalog_$i.pdf",
                ]
            );
        }
        
        echo "Dummy data seeded successfully.\n";
    }
}
