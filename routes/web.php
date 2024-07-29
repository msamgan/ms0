<?php

use App\Http\Controllers\HyperlinkController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';

Route::post('/api/shorten', [HyperlinkController::class, 'store'])->name('api.shorten');
Route::get('/api/docs', [HyperlinkController::class, 'apiDocs'])->name('api_docs');
Route::get('/{shot_slug}', [HyperlinkController::class, 'show'])->name('show');
