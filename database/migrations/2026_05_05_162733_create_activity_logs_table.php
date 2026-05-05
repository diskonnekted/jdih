<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('activity_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('user_name')->nullable();       // snapshot nama saat log dibuat
            $table->string('user_email')->nullable();      // snapshot email
            $table->string('action', 50);                  // created|updated|deleted|login|logout|viewed|exported|printed
            $table->string('model_type')->nullable();      // App\Models\LegalDocument
            $table->unsignedBigInteger('model_id')->nullable(); // ID record yang diubah
            $table->string('model_label')->nullable();     // Deskripsi singkat record (e.g. judul dokumen)
            $table->text('description')->nullable();       // Keterangan tambahan
            $table->json('old_values')->nullable();        // Nilai sebelum diubah
            $table->json('new_values')->nullable();        // Nilai sesudah diubah
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'created_at']);
            $table->index(['model_type', 'model_id']);
            $table->index('action');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('activity_logs');
    }
};
