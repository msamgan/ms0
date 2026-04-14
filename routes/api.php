<?php

use App\Http\Controllers\Api\HyperlinkController;
use App\Http\Controllers\Api\StatusCodeController;
use Illuminate\Support\Facades\Route;

Route::middleware('access-token-check')->group(function () {
    Route::post('/shorten', [HyperlinkController::class, 'shorten'])->name('api.shorten');
    Route::get('/status/{statusCode}', StatusCodeController::class)->name('api.status');
    Route::post('/status/{statusCode}', StatusCodeController::class)->name('api.status.post');
});
