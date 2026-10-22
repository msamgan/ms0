<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hyperlink_tag', function (Blueprint $table) {
            $table->id();
            $table->foreignUuid('hyperlink_id')->constrained('hyperlinks')->cascadeOnDelete();
            $table->foreignId('tag_id')->constrained()->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['hyperlink_id', 'tag_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hyperlink_tag');
    }
};
