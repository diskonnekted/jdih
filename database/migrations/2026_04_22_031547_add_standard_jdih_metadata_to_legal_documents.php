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
            $table->string('document_type')->default('Peraturan Perundang-undangan')->after('category_id');
            $table->string('teu')->default('Banjarnegara')->after('document_type');
            $table->string('abbreviation')->nullable()->after('teu');
            $table->string('location')->default('Bagian Hukum SETDA Kabupaten Banjarnegara')->after('language');
            $table->string('signer')->nullable()->after('location');
            $table->text('judicial_review')->nullable()->after('signer');
            $table->text('related_regulations_text')->nullable()->after('status_note');
            $table->text('implementing_regulations')->nullable()->after('related_regulations_text');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('legal_documents', function (Blueprint $table) {
            $table->dropColumn([
                'document_type',
                'teu',
                'abbreviation',
                'location',
                'signer',
                'judicial_review',
                'related_regulations_text',
                'implementing_regulations',
            ]);
        });
    }
};
