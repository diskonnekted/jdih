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
        Schema::table('public_dialogue_responses', function (Blueprint $table) {
            $table->renameColumn('email', 'address');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('public_dialogue_responses', function (Blueprint $table) {
            $table->renameColumn('address', 'email');
        });
    }
};
