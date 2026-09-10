<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('jdih_api_settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->text('value')->nullable();
            $table->string('type')->default('string'); // string, boolean, json
            $table->text('description')->nullable();
            $table->timestamps();
        });

        // Default settings
        DB::table('jdih_api_settings')->insert([
            [
                'key' => 'jdihnh_api_url',
                'value' => 'https://jdihnh.kemkumham.go.id/api',
                'type' => 'string',
                'description' => 'Base URL API JDIHN Pusat',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'jdihnh_api_token',
                'value' => null,
                'type' => 'string',
                'description' => 'API Token untuk autentikasi ke JDIHN Pusat',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'jdihnh_org_code',
                'value' => null,
                'type' => 'string',
                'description' => 'Kode Organisasi JDIH Kabupaten Banjarnegara di JDIHN',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'sync_enabled',
                'value' => '1',
                'type' => 'boolean',
                'description' => 'Enable/disable automatic sync',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'sync_interval_hours',
                'value' => '24',
                'type' => 'string',
                'description' => 'Sync interval in hours',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'sync_on_create_update',
                'value' => '1',
                'type' => 'boolean',
                'description' => 'Trigger sync on document create/update',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jdih_api_settings');
    }
};
