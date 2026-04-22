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
        Schema::create('legal_document_relations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('main_document_id')->constrained('legal_documents')->onDelete('cascade');
            $table->foreignId('related_document_id')->constrained('legal_documents')->onDelete('cascade');
            $table->string('relation_type'); // e.g., 'Mencabut', 'Diubah Oleh', 'Mencabut Sebagian', etc.
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('legal_document_relations');
    }
};
