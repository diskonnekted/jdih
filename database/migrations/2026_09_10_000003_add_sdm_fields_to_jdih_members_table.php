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
            $table->string('education')->nullable()->after('position');
            $table->string('jft_jfu')->nullable()->after('education');
            $table->text('training_history')->nullable()->after('jft_jfu');
            $table->string('phone')->nullable()->after('url');
            $table->string('email')->nullable()->after('phone');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('jdih_members', function (Blueprint $table) {
            $table->dropColumn(['education', 'jft_jfu', 'training_history', 'phone', 'email']);
        });
    }
};
