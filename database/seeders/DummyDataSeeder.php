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
use App\Models\News;
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

        // 2. Kategori/Jenis Produk Hukum (lengkap, sesuai frontend)
        $categories = [
            ['name' => 'Peraturan Daerah',              'code' => 'PERDA',   'slug' => 'peraturan-daerah',              'description' => 'Peraturan Daerah Kabupaten Banjarnegara'],
            ['name' => 'Peraturan Bupati',              'code' => 'PERBUP',  'slug' => 'peraturan-bupati',              'description' => 'Peraturan Bupati Banjarnegara'],
            ['name' => 'Keputusan Bupati',              'code' => 'KEPBUP',  'slug' => 'keputusan-bupati',              'description' => 'Keputusan Bupati Banjarnegara'],
            ['name' => 'Surat Edaran',                  'code' => 'SE',      'slug' => 'surat-edaran',                  'description' => 'Surat Edaran Bupati/Sekda'],
            ['name' => 'Instruksi Bupati',              'code' => 'INBUP',   'slug' => 'instruksi-bupati',              'description' => 'Instruksi Bupati Banjarnegara'],
            ['name' => 'Keputusan Sekretaris Daerah',   'code' => 'KEPSEK',  'slug' => 'keputusan-sekretaris-daerah',   'description' => 'Keputusan Sekretaris Daerah'],
            ['name' => 'Naskah Akademik',               'code' => 'NA',      'slug' => 'naskah-akademik',               'description' => 'Naskah Akademik Rancangan Perda'],
            ['name' => 'Monografi Hukum',               'code' => 'MONO',    'slug' => 'monografi-hukum',               'description' => 'Monografi/Kajian Hukum'],
            ['name' => 'Raperda',                       'code' => 'RPRDA',   'slug' => 'raperda',                       'description' => 'Rancangan Peraturan Daerah'],
            ['name' => 'Analisis & Evaluasi Hukum',     'code' => 'AEH',     'slug' => 'analisis-evaluasi-hukum',       'description' => 'Analisis dan Evaluasi Hukum'],
            ['name' => 'RANHAM',                        'code' => 'RANHAM',  'slug' => 'ranham',                        'description' => 'Rencana Aksi Nasional Hak Asasi Manusia'],
            ['name' => 'Risalah Rapat',                 'code' => 'RISAL',   'slug' => 'risalah-rapat',                 'description' => 'Risalah Rapat Pembahasan Perda'],
            ['name' => 'Artikel Bidang Hukum',          'code' => 'ARTKEL', 'slug' => 'artikel-bidang-hukum',          'description' => 'Artikel dan Tulisan Bidang Hukum'],
            ['name' => 'Propemperda',                   'code' => 'PROP',    'slug' => 'propemperda',                   'description' => 'Program Pembentukan Peraturan Daerah'],
            ['name' => 'Propemperbup',                  'code' => 'PPB',     'slug' => 'propemperbup',                  'description' => 'Program Pembentukan Peraturan Bupati'],
            ['name' => 'Raperbup',                      'code' => 'RPB',     'slug' => 'raperbup',                      'description' => 'Rancangan Peraturan Bupati'],
            ['name' => 'Hasil Harmonisasi',             'code' => 'HAR',     'slug' => 'hasil-harmonisasi',             'description' => 'Hasil Harmonisasi Produk Hukum'],
            ['name' => 'Hasil Fasilitasi',              'code' => 'FAS',     'slug' => 'hasil-fasilitasi',              'description' => 'Hasil Fasilitasi Produk Hukum'],
            ['name' => 'Fasilitasi Provinsi',            'code' => 'FPR',     'slug' => 'fasilitasi-provinsi',           'description' => 'Hasil Fasilitasi Tingkat Provinsi'],
            ['name' => 'Fasilitasi Pusat',               'code' => 'FPS',     'slug' => 'fasilitasi-pusat',              'description' => 'Hasil Fasilitasi Tingkat Pusat'],
            ['name' => 'Hasil Kajian Hukum',            'code' => 'KJH',     'slug' => 'hasil-kajian-hukum',            'description' => 'Hasil Kajian dan Analisis Hukum'],
            ['name' => 'Kerja Sama Daerah',             'code' => 'KSD',     'slug' => 'kerja-sama-daerah',             'description' => 'Perjanjian Kerja Sama Antar Daerah'],
            ['name' => 'Dokumen Hukum Terjemahan',      'code' => 'TRA',     'slug' => 'dokumen-hukum-terjemahan',     'description' => 'Dokumen Hukum Terjemahan'],
            ['name' => 'Dokumen Hukum Langka',          'code' => 'RARE',    'slug' => 'dokumen-hukum-langka',         'description' => 'Dokumen Hukum Langka'],
            ['name' => 'Putusan',                       'code' => 'PUT',     'slug' => 'putusan',                      'description' => 'Putusan Pengadilan'],
        ];
        foreach ($categories as $cat) {
            Category::firstOrCreate(['slug' => $cat['slug']], $cat);
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

        // 7. Berita (News)
        $newsData = [
            [
                'title' => 'Infografis Peraturan Daerah Nomor 8 Tahun 2025 Tentang Perubahan Atas Peraturan Daerah Nomor 8 Tahun 2023 Tentang Pajak Daerah Dan Retribusi Daerah',
                'slug' => 'infografis-peraturan-daerah-nomor-8-tahun-2025',
                'content' => 'Berikut adalah infografis mengenai Peraturan Daerah Nomor 8 Tahun 2025 yang mengatur tentang perubahan pajak dan retribusi daerah di Kabupaten Banjarnegara.',
                'image' => 'images/infografis peraturan daerah no 8 tahun 2025.webp',
                'category' => 'Infografis',
            ],
            [
                'title' => 'Study Referensi Pelaksanaan Tugas pada Bagian Hukum Sekretariat Daerah Kabupaten Temanggung',
                'slug' => 'study-referensi-pelaksanaan-tugas-temanggung',
                'content' => 'Bagian Hukum Sekretariat Daerah Kabupaten Banjarnegara melakukan studi referensi ke Kabupaten Temanggung terkait pelaksanaan tugas dan fungsi hukum.',
                'image' => 'images/Study Referensi Pelaksanaan Tugas pada Bagian Hukum Sekretariat Daerah Kabupaten Temanggung.webp',
                'category' => 'Berita',
            ],
            [
                'title' => 'Penandatanganan MOU Dengan Kejaksaan Negeri Terkait Pelaksanaan Pidana Kerja Sosial',
                'slug' => 'mou-kejaksaan-negeri-pidana-kerja-sosial',
                'content' => 'Pemerintah Kabupaten Banjarnegara melakukan penandatanganan MOU dengan Kejaksaan Negeri terkait implementasi pelaksanaan pidana kerja sosial.',
                'image' => 'images/Penandatanganan MOU Dengan Kejaksaan Negeri Terkait Pelaksanaan Pidana Kerja Sosial.webp',
                'category' => 'Kerja Sama',
            ],
            [
                'title' => 'Forum Satu Data Indonesia Kabupaten Banjarnegara "Perencanaan Berbasis Data"',
                'slug' => 'forum-satu-data-indonesia-banjarnegara',
                'content' => 'Pelaksanaan Forum Satu Data Indonesia di Kabupaten Banjarnegara dengan tema Perencanaan Berbasis Data untuk meningkatkan kualitas kebijakan publik.',
                'image' => 'images/Forum Satu Data Indonesia Kabupaten Banjarnegara \'\'Perencanaan Berbasis Data\'\'.webp',
                'category' => 'Forum',
            ],
        ];

        foreach ($newsData as $news) {
            News::updateOrCreate(
                ['slug' => $news['slug']],
                array_merge($news, [
                    'status' => 'published',
                    'published_at' => now()->subDays(rand(1, 10)),
                ])
            );
        }
        
        echo "Dummy data seeded successfully.\n";
    }
}
