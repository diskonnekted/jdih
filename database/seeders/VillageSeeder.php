<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Village;

class VillageSeeder extends Seeder
{
    /**
     * Daftar desa Kabupaten Banjarnegara dengan website yang sudah diverifikasi aktif.
     * Sumber: direktori sid.clasnet.co.id (diverifikasi via HTTP GET dari server produksi).
     * Desa tanpa website / situs bermasalah sengaja tidak disertakan.
     */
    public function run(): void
    {
        $villages = [
            // Kecamatan Banjarmangu (17 desa)
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
            ['kecamatan' => 'Banjarmangu', 'name' => 'Sigeblog', 'url' => 'https://sigeblog-banjarnegara.desa.id/'],
            ['kecamatan' => 'Banjarmangu', 'name' => 'Sijenggung', 'url' => 'https://sijenggung-banjarnegara.desa.id/'],
            ['kecamatan' => 'Banjarmangu', 'name' => 'Sijeruk', 'url' => 'https://sijeruk-banjarnegara.desa.id/'],
            ['kecamatan' => 'Banjarmangu', 'name' => 'Sipedang', 'url' => 'https://sipedang-banjarnegara.desa.id/'],

            // Kecamatan Batur (3 desa)
            ['kecamatan' => 'Batur', 'name' => 'Batur', 'url' => 'https://batur-banjarnegara.desa.id/'],
            ['kecamatan' => 'Batur', 'name' => 'Dieng Kulon', 'url' => 'https://www.dieng.desa.id/'],
            ['kecamatan' => 'Batur', 'name' => 'Sumberejo', 'url' => 'https://www.sumberejo-banjarnegara.desa.id/'],

            // Kecamatan Bawang (3 desa)
            ['kecamatan' => 'Bawang', 'name' => 'Bawang', 'url' => 'https://desabawang.id/'],
            ['kecamatan' => 'Bawang', 'name' => 'Blambangan', 'url' => 'https://blambangan-banjarnegara.desa.id/'],
            ['kecamatan' => 'Bawang', 'name' => 'Mantrianom', 'url' => 'https://mantrianom-banjarnegara.desa.id/'],

            // Kecamatan Kalibening (2 desa)
            ['kecamatan' => 'Kalibening', 'name' => 'Gununglangit', 'url' => 'https://gununglangit-banjarnegara.desa.id/'],
            ['kecamatan' => 'Kalibening', 'name' => 'Sembawa', 'url' => 'https://sembawa-banjarnegara.desa.id/'],

            // Kecamatan Madukara (1 desa)
            ['kecamatan' => 'Madukara', 'name' => 'Kutayasa', 'url' => 'https://kutayasa-banjarnegara.desa.id/'],

            // Kecamatan Mandiraja (5 desa)
            ['kecamatan' => 'Mandiraja', 'name' => 'Banjengan', 'url' => 'https://desabanjengan.id/'],
            ['kecamatan' => 'Mandiraja', 'name' => 'Blimbing', 'url' => 'https://desablimbing.id/'],
            ['kecamatan' => 'Mandiraja', 'name' => 'Glempang', 'url' => 'https://desaglempang.id/'],
            ['kecamatan' => 'Mandiraja', 'name' => 'Mandiraja Kulon', 'url' => 'https://mandirajakulon-banjarnegara.desa.id/'],
            ['kecamatan' => 'Mandiraja', 'name' => 'Mandiraja Wetan', 'url' => 'https://mandirajawetan-banjarnegara.desa.id/'],

            // Kecamatan Pagentan (4 desa)
            ['kecamatan' => 'Pagentan', 'name' => 'Karekan', 'url' => 'https://karekan-banjarnegara.desa.id/'],
            ['kecamatan' => 'Pagentan', 'name' => 'Kasmaran', 'url' => 'https://kasmaran-banjarnegara.desa.id/'],
            ['kecamatan' => 'Pagentan', 'name' => 'Pagentan', 'url' => 'https://pagentan-banjarnegara.desa.id/'],
            ['kecamatan' => 'Pagentan', 'name' => 'Sokaraja', 'url' => 'https://sokaraja-banjarnegara.desa.id/'],

            // Kecamatan Pejawaran (4 desa)
            ['kecamatan' => 'Pejawaran', 'name' => 'Condong Campur', 'url' => 'https://condongcampur-banjarnegara.desa.id/'],
            ['kecamatan' => 'Pejawaran', 'name' => 'Darmayasa', 'url' => 'https://darmayasa-banjarnegara.desa.id/'],
            ['kecamatan' => 'Pejawaran', 'name' => 'Giritirta', 'url' => 'https://giritirta-banjarnegara.desa.id/'],
            ['kecamatan' => 'Pejawaran', 'name' => 'Karangsari', 'url' => 'https://karangsari-banjarnegara.desa.id/'],

            // Kecamatan Purwareja Klampok (2 desa)
            ['kecamatan' => 'Purwareja Klampok', 'name' => 'Klampok', 'url' => 'https://klampok-banjarnegara.desa.id/'],
            ['kecamatan' => 'Purwareja Klampok', 'name' => 'Sirkandi', 'url' => 'https://sirkandi-banjarnegara.desa.id/'],

            // Kecamatan Rakit (7 desa)
            ['kecamatan' => 'Rakit', 'name' => 'Badamita', 'url' => 'https://badamita-banjarnegara.desa.id/'],
            ['kecamatan' => 'Rakit', 'name' => 'Bandingan', 'url' => 'https://bandingan.desa.id/'],
            ['kecamatan' => 'Rakit', 'name' => 'Lengkong', 'url' => 'https://lengkong-banjarnegara.desa.id/'],
            ['kecamatan' => 'Rakit', 'name' => 'Luwung', 'url' => 'https://www.luwung-banjarnegara.desa.id/'],
            ['kecamatan' => 'Rakit', 'name' => 'Pingit', 'url' => 'https://pingit-banjarnegara.desa.id/'],
            ['kecamatan' => 'Rakit', 'name' => 'Rakit', 'url' => 'https://www.rakit-banjarnegara.desa.id/'],
            ['kecamatan' => 'Rakit', 'name' => 'Tanjunganom', 'url' => 'https://www.tanjunganom-banjarnegara.desa.id/'],

            // Kecamatan Sigaluh (11 desa)
            ['kecamatan' => 'Sigaluh', 'name' => 'Bandingan', 'url' => 'https://bandingan-sigaluh.desa.id/'],
            ['kecamatan' => 'Sigaluh', 'name' => 'Bojanegara', 'url' => 'https://desabojanegara.wordpress.com/'],
            ['kecamatan' => 'Sigaluh', 'name' => 'Gembongan', 'url' => 'https://gembongan-banjarnegara.desa.id/'],
            ['kecamatan' => 'Sigaluh', 'name' => 'Panawaren', 'url' => 'https://www.panawaren.desa.id/'],
            ['kecamatan' => 'Sigaluh', 'name' => 'Prigi', 'url' => 'https://prigi-banjarnegara.desa.id/'],
            ['kecamatan' => 'Sigaluh', 'name' => 'Pringamba', 'url' => 'https://www.pringamba-banjarnegara.desa.id/'],
            ['kecamatan' => 'Sigaluh', 'name' => 'Randegan', 'url' => 'https://randegan-banjarnegara.desa.id/'],
            ['kecamatan' => 'Sigaluh', 'name' => 'Sawal', 'url' => 'https://sawal-banjarnegara.desa.id/'],
            ['kecamatan' => 'Sigaluh', 'name' => 'Singomerto', 'url' => 'https://singamerta-banjarnegara.desa.id/'],
            ['kecamatan' => 'Sigaluh', 'name' => 'Tunggoro', 'url' => 'https://www.tunggara-banjarnegara.desa.id/'],
            ['kecamatan' => 'Sigaluh', 'name' => 'Wanacipta', 'url' => 'https://wanacipta-banjarnegara.desa.id/'],

            // Kecamatan Wanadadi (2 desa)
            ['kecamatan' => 'Wanadadi', 'name' => 'Tapen', 'url' => 'https://tapen-banjarnegara.desa.id/'],
            ['kecamatan' => 'Wanadadi', 'name' => 'Wanadadi', 'url' => 'https://wanadadi.desa.id/'],

            // Kecamatan Wanayasa (2 desa)
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
