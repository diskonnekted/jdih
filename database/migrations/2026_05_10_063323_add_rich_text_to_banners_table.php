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
        Schema::table('banners', function (Blueprint $blueprint) {
            $blueprint->string('subtitle')->nullable()->after('title')->comment('Teks kecil di atas judul');
            $blueprint->text('description')->nullable()->after('subtitle')->comment('Teks deskripsi di bawah judul');
            $blueprint->boolean('show_stats')->default(true)->after('description')->comment('Tampilkan statistik di slide ini');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('banners', function (Blueprint $blueprint) {
            $blueprint->dropColumn(['subtitle', 'description', 'show_stats']);
        });
    }
};
