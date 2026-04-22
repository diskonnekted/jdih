<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VillageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Village::updateOrCreate(
            ['url' => 'https://sijenggung-banjarnegara.desa.id'],
            [
                'kecamatan' => 'Banjarmangu',
                'name' => 'Sijenggung',
                'is_active' => true,
            ]
        );
    }
}
