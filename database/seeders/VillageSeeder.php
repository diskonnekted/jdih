<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Village;

class VillageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            ['kecamatan' => 'Banjarmangu', 'name' => 'Sijenggung', 'url' => 'https://sijenggung-banjarnegara.desa.id'],
            ['kecamatan' => 'Banjarmangu', 'name' => 'Pekandangan', 'url' => 'https://pekandangan-banjarnegara.desa.id'],
            ['kecamatan' => 'Bawang', 'name' => 'Blambangan', 'url' => 'https://blambangan-banjarnegara.desa.id'],
            ['kecamatan' => 'Bawang', 'name' => 'Mantrianom', 'url' => 'https://mantrianom-banjarnegara.desa.id'],
            ['kecamatan' => 'Purwareja Klampok', 'name' => 'Klampok', 'url' => 'https://klampok-banjarnegara.desa.id'],
            ['kecamatan' => 'Purwareja Klampok', 'name' => 'Sirkandi', 'url' => 'https://sirkandi-banjarnegara.desa.id'],
            ['kecamatan' => 'Wanadadi', 'name' => 'Wanadadi', 'url' => 'https://wanadadi-banjarnegara.desa.id'],
            ['kecamatan' => 'Wanadadi', 'name' => 'Tapen', 'url' => 'https://tapen-banjarnegara.desa.id'],
            ['kecamatan' => 'Mandiraja', 'name' => 'Mandiraja Kulon', 'url' => 'https://mandirajakulon-banjarnegara.desa.id'],
            ['kecamatan' => 'Mandiraja', 'name' => 'Mandiraja Wetan', 'url' => 'https://mandirajawetan-banjarnegara.desa.id'],
        ];

        foreach ($data as $item) {
            Village::updateOrCreate(
                ['name' => $item['name'], 'kecamatan' => $item['kecamatan']],
                [
                    'url' => $item['url'],
                    'is_active' => true,
                ]
            );
        }
    }
}
