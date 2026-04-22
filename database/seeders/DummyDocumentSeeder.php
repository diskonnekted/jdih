<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\LegalDocument;
use App\Models\Category;

class DummyDocumentSeeder extends Seeder
{
    public function run(): void
    {
        $perda = Category::where('slug', 'peraturan-daerah')->first();
        
        if (!$perda) return;

        // Clean up previous dummy if exists
        LegalDocument::where('document_number', '5')->where('year', '2024')->delete();

        LegalDocument::create([
            'category_id' => $perda->id,
            'title' => 'Peraturan Daerah Kabupaten Banjarnegara Nomor 5 Tahun 2024 tentang Rencana Pembangunan Jangka Panjang Daerah Tahun 2025-2045',
            'document_number' => '5',
            'year' => '2024',
            'abbreviation' => 'PERDA',
            'published_at' => '2024-06-15',
            'promulgated_at' => '2024-06-16',
            'place_of_enactment' => 'Banjarnegara',
            'status' => 'Berlaku',
            'teu' => 'Bagian Hukum Sekretariat Daerah Kabupaten Banjarnegara',
            'signer' => 'H. Tri Harso Widirahmanto, S.H.',
            'initiator' => 'Badan Perencanaan Penelitian dan Pengembangan Daerah',
            'source' => 'LD Kabupaten Banjarnegara Tahun 2024 Nomor 5',
            'subject' => 'RENCANA PEMBANGUNAN JANGKA PANJANG DAERAH; RPJPD',
            'govt_field' => 'Perencanaan Pembangunan Daerah',
            'language' => 'Indonesia',
            'location' => 'Kabupaten Banjarnegara',
            'abstract' => "DOKUMEN ABSTRAK / RINGKASAN:\n\n1. Peraturan Daerah ini disusun untuk memberikan arah pembangunan jangka panjang Kabupaten Banjarnegara selama 20 tahun kedepan.\n2. Visi Pembangunan Daerah 2025-2045 adalah 'Banjarnegara Maju, Mandiri, dan Berkelanjutan'.\n3. Dokumen ini menjadi pedoman dalam penyusunan RPJMD dan RKPD setiap tahunnya.\n4. Memuat indikator kinerja utama daerah dan sasaran pokok pembangunan.",
            'file_path' => 'PERDA_RPJPD_2025_2045.pdf',
            'judicial_review' => 'Tidak Ada',
        ]);
    }
}
