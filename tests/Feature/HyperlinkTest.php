<?php

use App\Models\Hyperlink;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

test('it can redirect to original URL from shortened URL', function () {
    $url = 'https://example.com';
    $hyperlink = Hyperlink::factory()->create([
        'url' => $url,
        'shot_slug' => 'abcd',
        'visits' => 0,
    ]);

    $response = $this->get('/abcd');

    $response->assertRedirect($url);
    $hyperlink->refresh();
    expect($hyperlink->visits)->toBe(1)
        ->and($hyperlink->last_visit)->not->toBeNull();
});

test('it returns 404 for non-existent shortened URL', function () {
    $response = $this->get('/nonexistent');
    $response->assertStatus(404);
});

test('it can shorten a URL as a guest', function () {
    $url = 'https://example.com';

    $response = $this->postJson('/service/shorten', [
        'url' => $url,
    ]);

    $response->assertStatus(200)
        ->assertJson([
            'status' => true,
            'message' => 'Shortened Url created successfully',
        ]);

    $this->assertDatabaseHas('hyperlinks', [
        'url' => $url,
        'user_id' => null,
    ]);
});

test('it can shorten a URL as an authenticated user', function () {
    $user = User::factory()->create();
    $url = 'https://example.com';

    $response = $this->actingAs($user)
        ->postJson('/service/shorten', [
            'url' => $url,
        ]);

    $response->assertStatus(200)
        ->assertJson([
            'status' => true,
            'message' => 'Shortened Url created successfully',
        ]);

    $this->assertDatabaseHas('hyperlinks', [
        'url' => $url,
        'user_id' => $user->id,
    ]);
});

test('it associates guest link with user if they shorten it after logging in', function () {
    $url = 'https://example.com';
    $hyperlink = Hyperlink::create([
        'url' => $url,
        'shot_slug' => 'abcd',
        'last_visit' => now(),
        'user_id' => null,
    ]);

    $user = User::factory()->create();

    $response = $this->actingAs($user)
        ->postJson('/service/shorten', [
            'url' => $url,
        ]);

    $response->assertStatus(200)
        ->assertJson([
            'status' => true,
            'message' => 'Shortened Url Already Exists',
        ]);

    $this->assertDatabaseHas('hyperlinks', [
        'url' => $url,
        'user_id' => $user->id,
    ]);
});

test('authenticated user can view their links', function () {
    $user = User::factory()->create();
    Hyperlink::factory()->count(3)->create(['user_id' => $user->id]);
    Hyperlink::factory()->create(['user_id' => null]); // Guest link
    Hyperlink::factory()->create(['user_id' => User::factory()->create()->id]); // Other user's link

    $response = $this->actingAs($user)->get('/links');

    $response->assertStatus(200)
        ->assertInertia(fn (Assert $page) => $page
            ->component('Links')
            ->has('links', 3)
        );
});

test('authenticated user can regenerate their token', function () {
    $user = User::factory()->create(['access_token' => 'old-token']);

    $response = $this->actingAs($user)
        ->postJson('/service/regenerate-token');

    $response->assertStatus(200)
        ->assertJson([
            'status' => true,
            'message' => 'Token regenerated successfully',
        ]);

    $user->refresh();
    expect($user->access_token)->not->toBe('old-token');
});
