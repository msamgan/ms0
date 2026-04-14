<?php

use App\Models\Hyperlink;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create([
        'access_token' => 'test-token',
    ]);
});

test('it can shorten a new URL', function () {
    $url = 'https://example.com';

    $response = $this->withHeader('Authorization', 'Bearer test-token')
        ->postJson('/api/shorten', [
            'url' => $url,
        ]);

    $response->assertStatus(200)
        ->assertJson([
            'status' => true,
            'message' => 'Shortened Url created successfully',
        ])
        ->assertJsonStructure([
            'status',
            'message',
            'short_url',
        ]);

    $this->assertDatabaseHas('hyperlinks', [
        'url' => $url,
        'user_id' => $this->user->id,
    ]);
});

test('it returns an existing shortened URL if the same URL is provided', function () {
    $url = 'https://example.com';

    $hyperlink = Hyperlink::create([
        'url' => $url,
        'shot_slug' => 'abcd',
        'last_visit' => now(),
        'user_id' => $this->user->id,
    ]);

    $response = $this->withHeader('Authorization', 'Bearer test-token')
        ->postJson('/api/shorten', [
            'url' => $url,
        ]);

    $response->assertStatus(200)
        ->assertJson([
            'status' => true,
            'message' => 'Shortened Url Already Exists',
            'short_url' => url('/' . $hyperlink->shot_slug),
        ]);

    $this->assertEquals(1, Hyperlink::count());
});

test('it returns validation error if URL is missing', function () {
    $response = $this->withHeader('Authorization', 'Bearer test-token')
        ->postJson('/api/shorten', []);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['url']);
});

test('it returns validation error if URL is invalid', function () {
    $response = $this->withHeader('Authorization', 'Bearer test-token')
        ->postJson('/api/shorten', [
            'url' => 'not-a-url',
        ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['url']);
});

test('it returns 401 if no access token is provided', function () {
    $response = $this->postJson('/api/shorten', [
        'url' => 'https://example.com',
    ]);

    $response->assertStatus(401)
        ->assertJson([
            'message' => 'Unauthorized',
        ]);
});

test('it returns 401 if an invalid access token is provided', function () {
    $response = $this->withHeader('Authorization', 'Bearer invalid-token')
        ->postJson('/api/shorten', [
            'url' => 'https://example.com',
        ]);

    $response->assertStatus(401)
        ->assertJson([
            'message' => 'Unauthorized',
        ]);
});
