<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Village;

class VillageSeeder extends Seeder
{
    /**
     * Daftar desa/kelurahan Kabupaten Banjarnegara dengan website terverifikasi aktif.
     * Keanggotaan kecamatan mengacu pada:
     * https://id.wikipedia.org/wiki/Daftar_kecamatan_dan_kelurahan_di_Kabupaten_Banjarnegara
     * URL diverifikasi via HTTP GET dari server produksi.
     * Desa tanpa website / situs bermasalah sengaja tidak disertakan.
     */
    public function run(): void
    {
        $villages = [
            // Kecamatan Banjarmangu (16)
            ['kecamatan' => 'Banjarmangu', 'name' => 'Banjarkulon', 'url' => 'https://banjarkulon-banjarnegara.desa.id/'],
            ['kecamatan' => 'Banjarmangu', 'name' => 'Banjarmangu', 'url' => 'https://banjarmangu-banjarnegara.desa.id/'],
            ['kecamatan' => 'Banjarmangu', 'name' => 'Beji', 'url' => 'https://beji-banjarnegara.desa.id/'],
            ['kecamatan' => 'Banjarmangu', 'name' => 'Gripit', 'url' => 'https://gripit-banjarnegara.desa.id/'],
            ['kecamatan' => 'Banjarmangu', 'name' => 'Jenggawur', 'url' => 'https://jenggawur-banjarnegara.desa.id/'],
            ['kecamatan' => 'Banjarmangu', 'name' => 'Kalilunjar', 'url' => 'https://kalilunjar-banjarnegara.desa.id/'],
            ['kecamatan' => 'Banjarmangu', 'name' => 'Kendaga', 'url' => 'https://kendaga-banjarnegara.desa.id/'],
            ['kecamatan' => 'Banjarmangu', 'name' => 'Kesenet', 'url' => 'https://kesenet-banjarnegara.desa.id/'],
            ['kecamatan' => 'Banjarmangu', 'name' => 'Majatengah', 'url' => 'https://majatengah-banjarmangu.sistemdata.id/'],
            ['kecamatan' => 'Banjarmangu', 'name' => 'Paseh', 'url' => 'https://paseh-banjarnegara.desa.id/'],
            ['kecamatan' => 'Banjarmangu', 'name' => 'Pekandangan', 'url' => 'https://pekandangan-banjarnegara.desa.id/'],
            ['kecamatan' => 'Banjarmangu', 'name' => 'Prendengan', 'url' => 'https://prendengan-banjarmangu.sistemdata.id/'],
            ['kecamatan' => 'Banjarmangu', 'name' => 'Rejasari', 'url' => 'https://rejasari-banjarnegara.desa.id/'],
            ['kecamatan' => 'Banjarmangu', 'name' => 'Sijenggung', 'url' => 'https://sijenggung-banjarnegara.desa.id/'],
            ['kecamatan' => 'Banjarmangu', 'name' => 'Sijeruk', 'url' => 'https://sijeruk-banjarnegara.desa.id/'],
            ['kecamatan' => 'Banjarmangu', 'name' => 'Sipedang', 'url' => 'https://sipedang-banjarnegara.desa.id/'],

            // Kecamatan Banjarnegara (1)
            ['kecamatan' => 'Banjarnegara', 'name' => 'Kutabanjarnegara', 'url' => 'https://kutabanjarnegara.desa.id/'],

            // Kecamatan Batur (4)
            ['kecamatan' => 'Batur', 'name' => 'Bakal', 'url' => 'https://bakal-banjarnegara.desa.id/'],
            ['kecamatan' => 'Batur', 'name' => 'Batur', 'url' => 'https://batur-banjarnegara.desa.id/'],
            ['kecamatan' => 'Batur', 'name' => 'Dieng Kulon', 'url' => 'https://www.dieng.desa.id/'],
            ['kecamatan' => 'Batur', 'name' => 'Sumberejo', 'url' => 'https://www.sumberejo-banjarnegara.desa.id/'],

            // Kecamatan Bawang (3)
            ['kecamatan' => 'Bawang', 'name' => 'Bawang', 'url' => 'https://desabawang.id/'],
            ['kecamatan' => 'Bawang', 'name' => 'Blambangan', 'url' => 'https://blambangan-banjarnegara.desa.id/'],
            ['kecamatan' => 'Bawang', 'name' => 'Mantrianom', 'url' => 'https://mantrianom-banjarnegara.desa.id/'],

            // Kecamatan Kalibening (2)
            ['kecamatan' => 'Kalibening', 'name' => 'Gununglangit', 'url' => 'https://gununglangit-banjarnegara.desa.id/'],
            ['kecamatan' => 'Kalibening', 'name' => 'Sembawa', 'url' => 'https://sembawa-banjarnegara.desa.id/'],

            // Kecamatan Karangkobar (2)
            ['kecamatan' => 'Karangkobar', 'name' => 'Pasuruhan', 'url' => 'https://pasuruhan.desa.id/'],
            ['kecamatan' => 'Karangkobar', 'name' => 'Slatri', 'url' => 'https://slatri.desa.id/'],

            // Kecamatan Madukara (2)
            ['kecamatan' => 'Madukara', 'name' => 'Dawuhan', 'url' => 'https://dawuhan.desa.id/'],
            ['kecamatan' => 'Madukara', 'name' => 'Kutayasa', 'url' => 'https://kutayasa-banjarnegara.desa.id/'],

            // Kecamatan Mandiraja (3)
            ['kecamatan' => 'Mandiraja', 'name' => 'Banjengan', 'url' => 'https://desabanjengan.id/'],
            ['kecamatan' => 'Mandiraja', 'name' => 'Blimbing', 'url' => 'https://desablimbing.id/'],
            ['kecamatan' => 'Mandiraja', 'name' => 'Glempang', 'url' => 'https://desaglempang.id/'],

            // Kecamatan Pagentan (4)
            ['kecamatan' => 'Pagentan', 'name' => 'Karekan', 'url' => 'https://karekan-banjarnegara.desa.id/'],
            ['kecamatan' => 'Pagentan', 'name' => 'Kasmaran', 'url' => 'https://kasmaran-banjarnegara.desa.id/'],
            ['kecamatan' => 'Pagentan', 'name' => 'Pagentan', 'url' => 'https://pagentan-banjarnegara.desa.id/'],
            ['kecamatan' => 'Pagentan', 'name' => 'Sokaraja', 'url' => 'https://sokaraja-banjarnegara.desa.id/'],

            // Kecamatan Pejawaran (4)
            ['kecamatan' => 'Pejawaran', 'name' => 'Condong Campur', 'url' => 'https://condongcampur-banjarnegara.desa.id/'],
            ['kecamatan' => 'Pejawaran', 'name' => 'Darmayasa', 'url' => 'https://darmayasa-banjarnegara.desa.id/'],
            ['kecamatan' => 'Pejawaran', 'name' => 'Giritirta', 'url' => 'https://giritirta-banjarnegara.desa.id/'],
            ['kecamatan' => 'Pejawaran', 'name' => 'Karangsari', 'url' => 'https://karangsari-banjarnegara.desa.id/'],

            // Kecamatan Purwanegara (2)
            ['kecamatan' => 'Purwanegara', 'name' => 'Gumiwang', 'url' => 'https://gumiwang.desa.id/'],
            ['kecamatan' => 'Purwanegara', 'name' => 'Kaliajir', 'url' => 'https://kaliajir.desa.id/'],

            // Kecamatan Purworejo Klampok (2)
            ['kecamatan' => 'Purworejo Klampok', 'name' => 'Klampok', 'url' => 'https://klampok-banjarnegara.desa.id/'],
            ['kecamatan' => 'Purworejo Klampok', 'name' => 'Sirkandi', 'url' => 'https://sirkandi-banjarnegara.desa.id/'],

            // Kecamatan Rakit (7)
            ['kecamatan' => 'Rakit', 'name' => 'Badamita', 'url' => 'https://badamita-banjarnegara.desa.id/'],
            ['kecamatan' => 'Rakit', 'name' => 'Bandingan', 'url' => 'https://bandingan.desa.id/'],
            ['kecamatan' => 'Rakit', 'name' => 'Lengkong', 'url' => 'https://lengkong-banjarnegara.desa.id/'],
            ['kecamatan' => 'Rakit', 'name' => 'Luwung', 'url' => 'https://www.luwung-banjarnegara.desa.id/'],
            ['kecamatan' => 'Rakit', 'name' => 'Pingit', 'url' => 'https://pingit-banjarnegara.desa.id/'],
            ['kecamatan' => 'Rakit', 'name' => 'Rakit', 'url' => 'https://www.rakit-banjarnegara.desa.id/'],
            ['kecamatan' => 'Rakit', 'name' => 'Tanjunganom', 'url' => 'https://www.tanjunganom-banjarnegara.desa.id/'],

            // Kecamatan Sigaluh (10)
            ['kecamatan' => 'Sigaluh', 'name' => 'Bandingan', 'url' => 'https://bandingan-sigaluh.desa.id/'],
            ['kecamatan' => 'Sigaluh', 'name' => 'Bojanegara', 'url' => 'https://desabojanegara.wordpress.com/'],
            ['kecamatan' => 'Sigaluh', 'name' => 'Gembongan', 'url' => 'https://gembongan-banjarnegara.desa.id/'],
            ['kecamatan' => 'Sigaluh', 'name' => 'Panawaren', 'url' => 'https://www.panawaren.desa.id/'],
            ['kecamatan' => 'Sigaluh', 'name' => 'Prigi', 'url' => 'https://prigi.desa.id/'],
            ['kecamatan' => 'Sigaluh', 'name' => 'Pringamba', 'url' => 'https://www.pringamba-banjarnegara.desa.id/'],
            ['kecamatan' => 'Sigaluh', 'name' => 'Randegan', 'url' => 'https://randegan-banjarnegara.desa.id/'],
            ['kecamatan' => 'Sigaluh', 'name' => 'Sawal', 'url' => 'https://sawal-banjarnegara.desa.id/'],
            ['kecamatan' => 'Sigaluh', 'name' => 'Singomerto', 'url' => 'https://singamerta-banjarnegara.desa.id/'],
            ['kecamatan' => 'Sigaluh', 'name' => 'Wanacipta', 'url' => 'https://wanacipta.desa.id/'],

            // Kecamatan Susukan (1)
            ['kecamatan' => 'Susukan', 'name' => 'Gumelem Kulon', 'url' => 'https://gumelemkulon.desa.id/'],

            // Kecamatan Wanadadi (2)
            ['kecamatan' => 'Wanadadi', 'name' => 'Tapen', 'url' => 'https://tapen-banjarnegara.desa.id/'],
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
