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
        Schema::table('video_contents', function (Blueprint $table) {
            $table->string('thumbnail_path')->nullable()->after('video_url');
            $table->string('platform')->nullable()->after('thumbnail_path');
            $table->string('duration')->nullable()->after('platform');
            $table->integer('year')->nullable()->after('duration');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('video_contents', function (Blueprint $table) {
            $table->dropColumn(['thumbnail_path', 'platform', 'duration', 'year']);
        });
    }
};
