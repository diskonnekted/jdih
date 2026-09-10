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
        Schema::create('infrastructure', function (Blueprint $table) {
            $table->id();
            $table->string('category'); // ruangan, perangkat_keras, perangkat_lunak, jaringan
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('specification')->nullable();
            $table->integer('quantity')->default(1);
            $table->string('condition')->default('baik'); // baik, rusak_ringan, rusak_berat
            $table->string('photo_path')->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('infrastructure');
    }
};
