<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Village;

class VillageSeeder extends Seeder
{
    /**
     * Daftar desa/kelurahan Kabupaten Banjarnegara yang endpoint dokumen
     * (internal_api/produk-hukum) terverifikasi mengembalikan JSON valid dari server produksi.
     * Keanggotaan kecamatan mengacu pada:
     * https://id.wikipedia.org/wiki/Daftar_kecamatan_dan_kelurahan_di_Kabupaten_Banjarnegara
     * Desa tanpa website / endpoint mati sengaja tidak disertakan.
     */
    public function run(): void
    {
        $villages = [
            // Kecamatan Banjarmangu (15)
            ['kecamatan' => 'Banjarmangu', 'name' => 'Banjarkulon', 'url' => 'https://banjarkulon-banjarnegara.desa.id/'],
            ['kecamatan' => 'Banjarmangu', 'name' => 'Banjarmangu', 'url' => 'https://banjarmangu-banjarnegara.desa.id/'],
            ['kecamatan' => 'Banjarmangu', 'name' => 'Beji', 'url' => 'https://beji-banjarnegara.desa.id/'],
            ['kecamatan' => 'Banjarmangu', 'name' => 'Gripit', 'url' => 'https://gripit-banjarnegara.desa.id/'],
            ['kecamatan' => 'Banjarmangu', 'name' => 'Jenggawur', 'url' => 'https://jenggawur-banjarnegara.desa.id/'],
            ['kecamatan' => 'Banjarmangu', 'name' => 'Kalilunjar', 'url' => 'https://kalilunjar-banjarnegara.desa.id/'],
            ['kecamatan' => 'Banjarmangu', 'name' => 'Kendaga', 'url' => 'https://kendaga-banjarnegara.desa.id/'],
            ['kecamatan' => 'Banjarmangu', 'name' => 'Kesenet', 'url' => 'https://kesenet-banjarnegara.desa.id/'],
            ['kecamatan' => 'Banjarmangu', 'name' => 'Pekandangan', 'url' => 'https://pekandangan-banjarnegara.desa.id/'],
            ['kecamatan' => 'Banjarmangu', 'name' => 'Prendengan', 'url' => 'https://prendengan-banjarmangu.sistemdata.id/'],
            ['kecamatan' => 'Banjarmangu', 'name' => 'Rejasari', 'url' => 'https://rejasari-banjarnegara.desa.id/'],
            ['kecamatan' => 'Banjarmangu', 'name' => 'Sigeblok', 'url' => 'https://sigeblog-banjarnegara.desa.id/'],
            ['kecamatan' => 'Banjarmangu', 'name' => 'Sijenggung', 'url' => 'https://sijenggung-banjarnegara.desa.id/'],
            ['kecamatan' => 'Banjarmangu', 'name' => 'Sijeruk', 'url' => 'https://sijeruk-banjarnegara.desa.id/'],
            ['kecamatan' => 'Banjarmangu', 'name' => 'Sipedang', 'url' => 'https://sipedang-banjarnegara.desa.id/'],

            // Kecamatan Batur (1)
            ['kecamatan' => 'Batur', 'name' => 'Sumberejo', 'url' => 'https://www.sumberejo-banjarnegara.desa.id/'],

            // Kecamatan Bawang (1)
            ['kecamatan' => 'Bawang', 'name' => 'Bawang', 'url' => 'https://desabawang.id/'],

            // Kecamatan Pagentan (3)
            ['kecamatan' => 'Pagentan', 'name' => 'Karekan', 'url' => 'https://karekan-banjarnegara.desa.id/'],
            ['kecamatan' => 'Pagentan', 'name' => 'Pagentan', 'url' => 'https://pagentan-banjarnegara.desa.id/'],
            ['kecamatan' => 'Pagentan', 'name' => 'Sokaraja', 'url' => 'https://sokaraja-banjarnegara.desa.id/'],

            // Kecamatan Purwanegara (1)
            ['kecamatan' => 'Purwanegara', 'name' => 'Gumiwang', 'url' => 'https://gumiwang.desa.id/'],

            // Kecamatan Sigaluh (3)
            ['kecamatan' => 'Sigaluh', 'name' => 'Pringamba', 'url' => 'https://www.pringamba-banjarnegara.desa.id/'],
            ['kecamatan' => 'Sigaluh', 'name' => 'Singomerto', 'url' => 'https://singamerta-banjarnegara.desa.id/'],
            ['kecamatan' => 'Sigaluh', 'name' => 'Tunggara', 'url' => 'https://www.tunggara-banjarnegara.desa.id/'],

            // Kecamatan Wanadadi (1)
            ['kecamatan' => 'Wanadadi', 'name' => 'Wanadadi', 'url' => 'https://wanadadi.desa.id/'],

            // Kecamatan Wanayasa (2)
            ['kecamatan' => 'Wanayasa', 'name' => 'Jatilawang', 'url' => 'https://jatilawang-banjarnegara.desa.id/'],
            ['kecamatan' => 'Wanayasa', 'name' => 'Karangtengah', 'url' => 'https://karangtengah-banjarnegara.desa.id/'],

        ];

        foreach ($villages as $village) {
            Village::updateOrCreate(
                ['kecamatan' => $village['kecamatan'], 'name' => $village['name']],
                ['url' => $village['url'], 'is_active' => true]
            );
        }
    }
}
