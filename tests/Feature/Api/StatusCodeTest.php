<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create([
        'access_token' => 'test-token',
    ]);
});

test('it returns the correct status code 200', function () {
    $response = $this->withHeader('Authorization', 'Bearer test-token')
        ->getJson('/api/status/200');

    $response->assertStatus(200)
        ->assertJson([
            'status' => true,
            'status_code' => 200,
            'message' => 'Success',
        ]);
});

test('it returns the correct status code 201', function () {
    $response = $this->withHeader('Authorization', 'Bearer test-token')
        ->getJson('/api/status/201');

    $response->assertStatus(201)
        ->assertJson([
            'status' => true,
            'status_code' => 201,
            'message' => 'Success',
        ]);
});

test('it returns the correct status code 400', function () {
    $response = $this->withHeader('Authorization', 'Bearer test-token')
        ->getJson('/api/status/400');

    $response->assertStatus(400)
        ->assertJson([
            'status' => true,
            'status_code' => 400,
            'message' => 'Client Error',
        ]);
});

test('it returns the correct status code 500', function () {
    $response = $this->withHeader('Authorization', 'Bearer test-token')
        ->getJson('/api/status/500');

    $response->assertStatus(500)
        ->assertJson([
            'status' => true,
            'status_code' => 500,
            'message' => 'Server Error',
        ]);
});

test('it returns 401 if no access token is provided', function () {
    $response = $this->getJson('/api/status/200');

    $response->assertStatus(401)
        ->assertJson([
            'message' => 'Unauthorized',
        ]);
});

test('it returns 401 if an invalid access token is provided', function () {
    $response = $this->withHeader('Authorization', 'Bearer invalid-token')
        ->getJson('/api/status/200');

    $response->assertStatus(401)
        ->assertJson([
            'message' => 'Unauthorized',
        ]);
});

test('it returns the correct status code and payload for POST /api/status/{statusCode}', function () {
    $payload = [
        'key' => 'value',
        'another_key' => 'another_value',
    ];

    $response = $this->withHeader('Authorization', 'Bearer test-token')
        ->postJson('/api/status/201', $payload);

    $response->assertStatus(201)
        ->assertJson([
            'status' => true,
            'status_code' => 201,
            'message' => 'Success',
            'data' => $payload,
        ]);
});

test('it returns the correct status code and different payload for POST /api/status/{statusCode}', function () {
    $payload = [
        'foo' => 'bar',
    ];

    $response = $this->withHeader('Authorization', 'Bearer test-token')
        ->postJson('/api/status/400', $payload);

    $response->assertStatus(400)
        ->assertJson([
            'status' => true,
            'status_code' => 400,
            'message' => 'Client Error',
            'data' => $payload,
        ]);
});

test('it returns 401 if no access token is provided for POST', function () {
    $response = $this->postJson('/api/status/200', ['key' => 'value']);

    $response->assertStatus(401)
        ->assertJson([
            'message' => 'Unauthorized',
        ]);
});

test('it returns the correct status code and payload for PUT /api/status/{statusCode}', function () {
    $payload = [
        'key' => 'value',
    ];

    $response = $this->withHeader('Authorization', 'Bearer test-token')
        ->putJson('/api/status/200', $payload);

    $response->assertStatus(200)
        ->assertJson([
            'status' => true,
            'status_code' => 200,
            'message' => 'Success',
            'data' => $payload,
        ]);
});

test('it returns the correct status code and payload for PATCH /api/status/{statusCode}', function () {
    $payload = [
        'key' => 'value',
    ];

    $response = $this->withHeader('Authorization', 'Bearer test-token')
        ->patchJson('/api/status/200', $payload);

    $response->assertStatus(200)
        ->assertJson([
            'status' => true,
            'status_code' => 200,
            'message' => 'Success',
            'data' => $payload,
        ]);
});

test('it returns the correct status code and payload for DELETE /api/status/{statusCode}', function () {
    $payload = [
        'key' => 'value',
    ];

    $response = $this->withHeader('Authorization', 'Bearer test-token')
        ->deleteJson('/api/status/200', $payload);

    $response->assertStatus(200)
        ->assertJson([
            'status' => true,
            'status_code' => 200,
            'message' => 'Success',
            'data' => $payload,
        ]);
});
