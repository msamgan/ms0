<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('hyperlinks', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('url');
            $table->string('shot_slug');
            $table->integer('visits')->default(0);
            $table->datetime('last_visit');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hyperlinks');
    }
};
