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
            $table->index('year');
            $table->index('status');
            $table->index('published_at');
            $table->index('category_id');
            // Fulltext index for title search if using MySQL
            if (config('database.default') === 'mysql') {
                $table->fullText('title');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('legal_documents', function (Blueprint $table) {
            $table->dropIndex(['year']);
            $table->dropIndex(['status']);
            $table->dropIndex(['published_at']);
            $table->dropIndex(['category_id']);
            if (config('database.default') === 'mysql') {
                $table->dropFullText(['title']);
            }
        });
    }
};
