<?php

use App\Http\Controllers\Api\HyperlinkController;
use Illuminate\Support\Facades\Route;

Route::middleware('access-token-check')
    ->post('/shorten', [HyperlinkController::class, 'shorten'])->name('api.shorten');
