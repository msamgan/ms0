<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HyperlinkController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'isAuthenticated' => auth()->check(),
        'user' => auth()->user() ?? null,
    ]);
})->name('home');

Route::get('/dashboard', [DashboardController::class, '__invoke'])
    ->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/service/regenerate-token', [HyperlinkController::class, 'regenerateToken'])->name('service.regenerate-token');

    Route::get('/links', [HyperlinkController::class, 'links'])->name('links');
});

require __DIR__ . '/auth.php';

Route::post('/service/shorten', [HyperlinkController::class, 'store'])->name('service.shorten');

// this is the route that redirects the user to the original URL, this has to be the last route
Route::get('/{shot_slug}', [HyperlinkController::class, 'show'])->name('show');
