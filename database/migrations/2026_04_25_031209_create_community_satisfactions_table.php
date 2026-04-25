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
        Schema::create('community_satisfactions', function (Blueprint $table) {
            $table->id();
            $table->string('gender')->nullable();
            $table->string('age_group')->nullable();
            $table->string('education')->nullable();
            $table->string('occupation')->nullable();
            
            // Unsur Pelayanan (U1 - U9)
            $table->integer('u1')->comment('Persyaratan');
            $table->integer('u2')->comment('Prosedur');
            $table->integer('u3')->comment('Waktu Pelayanan');
            $table->integer('u4')->comment('Biaya/Tarif');
            $table->integer('u5')->comment('Produk Spesifikasi');
            $table->integer('u6')->comment('Kompetensi Pelaksana');
            $table->integer('u7')->comment('Perilaku Pelaksana');
            $table->integer('u8')->comment('Sarana Prasarana');
            $table->integer('u9')->comment('Penanganan Pengaduan');
            
            $table->text('suggestion')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('community_satisfactions');
    }
};
