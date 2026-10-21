<?php

use App\Http\Controllers\HyperlinkController;
use Illuminate\Support\Facades\Route;

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
});

require __DIR__ . '/auth.php';

Route::inertia('/documentation/api', 'ApiDocumentation')->name('documentation.api');
Route::inertia('/privacy', 'Privacy')->name('privacy');

// this is the route that redirects the user to the original URL; this has to be the last route
Route::get('/{shot_slug}', [HyperlinkController::class, 'show'])->name('show');
