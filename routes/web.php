<?php

use App\Http\Controllers\HyperlinkController;
use App\Http\Controllers\ProfileController;
use App\Models\Hyperlink;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'isAuthenticated' => auth()->check(),
        'user' => auth()->user() ?? null,
    ]);
})->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'token' => auth()->user()->access_token,
        'linkCount' => Hyperlink::query()->where('user_id', auth()->id())->count(),
        'visits' => Hyperlink::query()->where('user_id', auth()->id())->sum('visits'),
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/service/regenerate-token', [HyperlinkController::class, 'regenerateToken'])->name('service.regenerate-token');

    Route::get('/links', [HyperlinkController::class, 'links'])->name('links');
});

require __DIR__ . '/auth.php';

Route::post('/service/shorten', [HyperlinkController::class, 'store'])->name('service.shorten');
// Route::get('/api-documentation', [HyperlinkController::class, 'apiDocs'])->name('api_docs');

// this is the route that redirects the user to the original URL, this has to be the last route
Route::get('/{shot_slug}', [HyperlinkController::class, 'show'])->name('show');
