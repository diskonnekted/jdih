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
        Schema::table('legal_documents', function (Blueprint $table) {
            $table->date('promulgated_at')->nullable()->after('published_at'); // Tgl Pengundangan
            $table->string('place_of_enactment')->default('Banjarnegara')->after('year'); // Tempat Penetapan
            $table->string('source')->nullable()->after('place_of_enactment'); // Sumber (Lembaran Daerah, etc)
            $table->text('subject')->nullable()->after('source'); // Subjek / Kata Kunci
            $table->string('govt_field')->nullable()->after('subject'); // Urusan Pemerintahan
            $table->string('language')->default('Indonesia')->after('govt_field'); // Bahasa
            $table->string('initiator')->nullable()->after('language'); // Pemrakarsa
            $table->text('status_note')->nullable()->after('status'); // Catatan Status
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('legal_documents', function (Blueprint $table) {
            $table->dropColumn([
                'promulgated_at',
                'place_of_enactment',
                'source',
                'subject',
                'govt_field',
                'language',
                'initiator',
                'status_note',
            ]);
        });
    }
};
