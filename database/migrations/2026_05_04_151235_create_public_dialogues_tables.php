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
        Schema::create('public_dialogues', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('document_type')->nullable(); // e.g. Raperda, Raperbup
            $table->string('year', 4)->nullable();
            $table->text('description')->nullable();
            $table->string('file_path')->nullable(); // PDF draft
            $table->boolean('is_active')->default(true);
            $table->unsignedInteger('view_count')->default(0);
            $table->timestamps();
        });

        Schema::create('public_dialogue_responses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('public_dialogue_id')->constrained()->cascadeOnDelete();
            $table->string('full_name');
            $table->string('email');
            $table->text('suggestion');
            $table->text('admin_response')->nullable();
            $table->string('status')->default('pending'); // pending, approved, hidden
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('public_dialogue_responses');
        Schema::dropIfExists('public_dialogues');
    }
};
