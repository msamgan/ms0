<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HyperlinkController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TagController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'Welcome', [
    'isAuthenticated' => auth()->check(),
    'user' => auth()->user() ?? null,
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('/dashboard', 'Dashboard')->name('dashboard');
    Route::inertia('/profile', 'Profile/Edit', [
        'mustVerifyEmail' => true,
        'status' => session('status'),
    ])->name('profile.edit');

    Route::inertia('/links', 'Links')->name('links');

    Route::group(['prefix' => 'service'], function () {
        Route::get('dashboard', [DashboardController::class, '__invoke'])->name('service.dashboard');
        Route::get('links', [HyperlinkController::class, 'links'])->name('service.links');
        Route::post('regenerate-token', [HyperlinkController::class, 'regenerateToken'])->name('service.regenerate-token');
        Route::delete('/links/{hyperlink}', [HyperlinkController::class, 'destroy'])->name('links.destroy');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

        Route::get('tags', [TagController::class, 'tags'])->name('service.tags');
        Route::post('tags', [TagController::class, 'store'])->name('service.tags.store');
        Route::get('tags/{tag}', [TagController::class, 'show'])->name('service.tags.show');
        Route::patch('tags/{tag}', [TagController::class, 'update'])->name('service.tags.update');
        Route::delete('tags/{tag}', [TagController::class, 'destroy'])->name('service.tags.destroy');
    });
});

require __DIR__ . '/auth.php';

Route::inertia('/documentation/api', 'ApiDocumentation')->name('documentation.api');
Route::inertia('/privacy', 'Privacy')->name('privacy');

Route::post('/service/shorten', [HyperlinkController::class, 'store'])->name('service.shorten');

// this is the route that redirects the user to the original URL; this has to be the last route
Route::get('/{shot_slug}', [HyperlinkController::class, 'show'])->name('show');
