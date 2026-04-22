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
            // Basic JDIH Standard Fields
            if (!Schema::hasColumn('legal_documents', 'entity')) {
                $table->string('entity')->nullable()->after('document_type');
            }
            if (!Schema::hasColumn('legal_documents', 'abbreviation')) {
                $table->string('abbreviation')->nullable()->after('entity');
            }
            if (!Schema::hasColumn('legal_documents', 'place_of_enactment')) {
                $table->string('place_of_enactment')->nullable()->after('promulgated_at');
            }
            if (!Schema::hasColumn('legal_documents', 'source')) {
                $table->string('source')->nullable()->after('place_of_enactment');
            }
            if (!Schema::hasColumn('legal_documents', 'subject')) {
                $table->text('subject')->nullable()->after('source');
            }
            if (!Schema::hasColumn('legal_documents', 'govt_field')) {
                $table->string('govt_field')->nullable()->after('subject');
            }
            if (!Schema::hasColumn('legal_documents', 'legal_field')) {
                $table->string('legal_field')->nullable()->after('govt_field');
            }
            if (!Schema::hasColumn('legal_documents', 'legal_form')) {
                $table->string('legal_form')->nullable()->after('legal_field');
            }
            if (!Schema::hasColumn('legal_documents', 'page_count')) {
                $table->integer('page_count')->default(0)->after('legal_form');
            }
            if (!Schema::hasColumn('legal_documents', 'signer')) {
                $table->string('signer')->nullable()->after('location');
            }
            if (!Schema::hasColumn('legal_documents', 'author')) {
                $table->string('author')->nullable()->after('signer');
            }
            if (!Schema::hasColumn('legal_documents', 'publisher_place')) {
                $table->string('publisher_place')->nullable()->after('author');
            }
            if (!Schema::hasColumn('legal_documents', 'initiator')) {
                $table->string('initiator')->nullable()->after('publisher_place');
            }
            if (!Schema::hasColumn('legal_documents', 'judicial_review')) {
                $table->text('judicial_review')->nullable()->after('signer');
            }
            if (!Schema::hasColumn('legal_documents', 'result_judicial_review')) {
                $table->text('result_judicial_review')->nullable()->after('judicial_review');
            }
            if (!Schema::hasColumn('legal_documents', 'view_count')) {
                $table->integer('view_count')->default(0)->after('file_path');
            }
            if (!Schema::hasColumn('legal_documents', 'download_count')) {
                $table->integer('download_count')->default(0)->after('view_count');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Down method is simplified
    }
};
