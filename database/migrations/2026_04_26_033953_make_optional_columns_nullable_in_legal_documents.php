<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Membuat kolom-kolom opsional menjadi nullable agar form bisa disimpan
     * meski tidak semua field diisi (field metadata JDIH yang tidak wajib).
     */
    public function up(): void
    {
        Schema::table('legal_documents', function (Blueprint $table) {
            $table->string('teu')->nullable()->default(null)->change();
            $table->string('place_of_enactment')->nullable()->default(null)->change();
            $table->string('language')->nullable()->default(null)->change();
            $table->string('location')->nullable()->default(null)->change();
            $table->string('document_type')->nullable()->default(null)->change();
            $table->integer('page_count')->nullable()->default(null)->change();
        });
    }

    public function down(): void
    {
        Schema::table('legal_documents', function (Blueprint $table) {
            $table->string('teu')->nullable(false)->default('Banjarnegara')->change();
            $table->string('place_of_enactment')->nullable(false)->default('Banjarnegara')->change();
            $table->string('language')->nullable(false)->default('Indonesia')->change();
            $table->string('location')->nullable(false)->default('Bagian Hukum SETDA Kabupaten Banjarnegara')->change();
            $table->string('document_type')->nullable(false)->default('Peraturan Perundang-undangan')->change();
            $table->integer('page_count')->nullable(false)->default(0)->change();
        });
    }
};
