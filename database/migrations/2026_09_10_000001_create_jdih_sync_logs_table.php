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
        Schema::create('jdih_sync_logs', function (Blueprint $table) {
            $table->id();
            $table->string('sync_type')->default('document'); // document, member, profile, full
            $table->string('direction')->default('outbound'); // outbound (local to pusat), inbound (pusat to local)
            $table->string('status')->default('pending'); // pending, processing, success, failed
            $table->integer('total_records')->default(0);
            $table->integer('success_records')->default(0);
            $table->integer('failed_records')->default(0);
            $table->text('payload')->nullable(); // JSON data sent/received
            $table->text('response')->nullable(); // Response from JDIHN API
            $table->text('error_message')->nullable();
            $table->string('triggered_by')->default('schedule'); // schedule, manual, api
            $table->string('api_token_name')->nullable();
            $table->timestamp('synced_at')->nullable();
            $table->timestamps();
            
            $table->index('sync_type');
            $table->index('status');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jdih_sync_logs');
    }
};
