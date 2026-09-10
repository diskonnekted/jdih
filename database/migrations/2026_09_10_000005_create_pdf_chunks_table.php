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
        Schema::create('pdf_chunks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('legal_document_id')->constrained('legal_documents')->onDelete('cascade');
            $table->string('chunk_index'); // e.g., '1', '2', '3'
            $table->text('content')->nullable(); // Text content of the chunk
            $table->integer('embedding_dimension')->default(384); // Dimension of embedding vector
            $table->json('embedding')->nullable(); // Vector embedding (JSON array of floats)
            $table->string('status')->default('pending'); // pending, processing, completed, failed
            $table->text('error_message')->nullable();
            $table->timestamps();

            $table->index('legal_document_id');
            $table->index('status');
            $table->index('chunk_index');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pdf_chunks');
    }
};
