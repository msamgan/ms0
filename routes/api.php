<?php

use App\Http\Controllers\Api\HyperlinkController;
use Illuminate\Support\Facades\Route;

Route::middleware('access-token-check')->group(function () {
    Route::post('/shorten', [HyperlinkController::class, 'shorten'])->name('api.shorten');
});
