<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LegalDocumentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\LegalDocument::create([
            'title' => 'Pengelolaan Sampah dan Retribusi Pelayanan Kebersihan',
            'document_number' => '1',
            'year' => 2024,
            'type' => 'PERDA',
            'status' => 'Berlaku',
            'abstract' => 'Peraturan daerah ini mengatur mengenai sistem pengelolaan sampah di Kabupaten Banjarnegara serta penetapan tarif retribusi.',
            'published_at' => '2024-01-15',
        ]);

        \App\Models\LegalDocument::create([
            'title' => 'Rencana Tata Ruang Wilayah Kabupaten Banjarnegara 2024-2044',
            'document_number' => '5',
            'year' => 2024,
            'type' => 'PERDA',
            'status' => 'Berlaku',
            'abstract' => 'Dokumen induk perencanaan pembangunan dan tata ruang wilayah untuk 20 tahun ke depan.',
            'published_at' => '2024-02-10',
        ]);

        \App\Models\LegalDocument::create([
            'title' => 'Pemberian Insentif Pajak Bagi UMKM Terdampak Ekonomi',
            'document_number' => '24',
            'year' => 2023,
            'type' => 'PERBUP',
            'status' => 'Berlaku',
            'abstract' => 'Kebijakan relaksasi pajak daerah guna mendukung pemulihan ekonomi kreatif.',
            'published_at' => '2023-12-05',
        ]);
    }
}
