<?php

namespace App\Console\Commands;

use App\Models\JdihApiSetting;
use Illuminate\Console\Command;

class ConfigureJdihApi extends Command
{
    protected $signature = 'jdih:configure-api';
    protected $description = 'Konfigurasi pengaturan API JDIHN Pusat';

    public function handle()
    {
        $this->info("Konfigurasi API JDIHN Pusat\n");

        $apiUrl = $this->ask('URL API JDIHN Pusat', 'https://jdihnh.kemkumham.go.id/api');
        JdihApiSetting::set('jdihnh_api_url', $apiUrl);
        $this->info('  ✓ URL API disimpan');

        $apiToken = $this->secret('API Token (tipe Bearer)');
        JdihApiSetting::set('jdihnh_api_token', $apiToken);
        $this->info('  ✓ API Token disimpan');

        $orgCode = $this->ask('Kode Organisasi JDIH');
        JdihApiSetting::set('jdihnh_org_code', $orgCode);
        $this->info('  ✓ Kode Organisasi disimpan');

        $this->newLine();
        $this->info("Konfigurasi API JDIHN Pusat selesai.");
    }
}
