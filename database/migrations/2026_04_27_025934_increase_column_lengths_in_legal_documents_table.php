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
            $table->text('title')->change();
            $table->text('source')->nullable()->change();
            $table->text('teu')->nullable()->change();
            $table->text('signer')->nullable()->change();
            $table->text('author')->nullable()->change();
            $table->text('publisher_place')->nullable()->change();
            $table->text('initiator')->nullable()->change();
            $table->text('file_path')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('legal_documents', function (Blueprint $table) {
            $table->string('title')->change();
        });
    }
};
