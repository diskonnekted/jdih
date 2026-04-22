<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\LegalDocument;
use App\Models\Category;

class OfficialDocumentSeeder extends Seeder
{
    public function run(): void
    {
        $perda = Category::where('slug', 'peraturan-daerah')->first();
        
        if (!$perda) return;

        // Delete existing to avoid duplicates
        LegalDocument::where('document_number', '8')->where('year', '2025')->delete();

        LegalDocument::create([
            'category_id' => $perda->id,
            'document_type' => 'Peraturan Perundangan-undangan',
            'entity' => 'Pemerintah Provinsi',
            'title' => 'Peraturan Daerah Kabupaten Banjarnegara Nomor 8 Tahun 2025 tentang Perubahan Atas Peraturan Daerah Nomor 8 Tahun 2023 Tentang Pajak Daerah Dan Retribusi Daerah',
            'document_number' => '8',
            'year' => '2025',
            'abbreviation' => 'PERDA',
            'published_at' => '2025-12-30',
            'promulgated_at' => '2025-12-30',
            'place_of_enactment' => 'Banjarnegara',
            'status' => 'Berlaku',
            'status_note' => '',
            'teu' => 'Banjarnegara',
            'signer' => 'Amalia Desiana',
            'author' => 'Bagian Hukum',
            'publisher_place' => 'Banjarnegara',
            'initiator' => 'Eksekutif',
            'source' => 'Lembaran Daerah Kabupaten Banjarnegara Tahun 2025 Nomor 8',
            'subject' => 'RETRIBUSI',
            'legal_field' => 'Hukum Administrasi Negara',
            'language' => 'Bahasa Indonesia',
            'location' => 'Bagian Hukum Setda Kabupaten Banjarnegara',
            'abstract' => "DOKUMEN ABSTRAK:\n\n1. Peraturan Daerah ini menetapkan perubahan atas Perda Nomor 8 Tahun 2023 tentang Pajak Daerah dan Retribusi Daerah.\n2. Fokus utama adalah penyesuaian tarif dan optimalisasi pemungutan retribusi daerah.\n3. Ditetapkan dan diundangkan pada tanggal 30 Desember 2025.",
            'file_path' => 'data/2025pd3304008.pdf',
            'judicial_review' => 'Tidak Ada',
            'result_judicial_review' => '',
            'view_count' => 150,
            'download_count' => 328,
        ]);
    }
}
