<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Migrasi 2026_09_10_000004 membuat tabel 'infrastructure' (tunggal),
     * tetapi model Infrastructure memakai konvensi jamak 'infrastructures'.
     * Rename agar keduanya cocok (data dipertahankan).
     */
    public function up(): void
    {
        if (Schema::hasTable('infrastructure') && !Schema::hasTable('infrastructures')) {
            Schema::rename('infrastructure', 'infrastructures');
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('infrastructures') && !Schema::hasTable('infrastructure')) {
            Schema::rename('infrastructures', 'infrastructure');
        }
    }
};
