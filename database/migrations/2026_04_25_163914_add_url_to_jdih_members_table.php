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
        Schema::table('jdih_members', function (Blueprint $table) {
            $table->string('url')->nullable()->after('photo_path');
            $table->string('category')->nullable()->after('url');
            $table->string('position')->nullable()->change();
            $table->string('photo_path')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('jdih_members', function (Blueprint $table) {
            $table->dropColumn(['url', 'category']);
            $table->string('position')->nullable(false)->change();
            $table->string('photo_path')->nullable(false)->change();
        });
    }
};
