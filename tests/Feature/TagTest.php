<?php

use App\Models\Hyperlink;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('a tag can be created with user_id, name, and slug', function () {
    $user = User::factory()->create();

    $tag = Tag::create([
        'user_id' => $user->id,
        'name' => 'Laravel',
        'slug' => 'laravel',
    ]);

    expect($tag->name)->toBe('Laravel')
        ->and($tag->slug)->toBe('laravel')
        ->and($tag->user_id)->toBe($user->id);

    $this->assertDatabaseHas('tags', [
        'id' => $tag->id,
        'user_id' => $user->id,
        'name' => 'Laravel',
        'slug' => 'laravel',
    ]);
});

test('a tag belongs to a user and user has many tags', function () {
    $user = User::factory()->create();
    $tag = Tag::factory()->create(['user_id' => $user->id]);

    expect($tag->user->id)->toBe($user->id)
        ->and($user->tags->pluck('id'))->toContain($tag->id);
});

test('tags are deleted when their user is deleted', function () {
    $user = User::factory()->create();
    $tag1 = Tag::factory()->create(['user_id' => $user->id]);
    $tag2 = Tag::factory()->create(['user_id' => $user->id]);

    $this->assertDatabaseHas('tags', ['id' => $tag1->id]);
    $this->assertDatabaseHas('tags', ['id' => $tag2->id]);

    $user->delete();

    $this->assertDatabaseMissing('tags', ['id' => $tag1->id]);
    $this->assertDatabaseMissing('tags', ['id' => $tag2->id]);
});

test('slug is automatically generated when a tag is created', function () {
    $user = User::factory()->create();

    $tag = Tag::create([
        'user_id' => $user->id,
        'name' => 'Laravel Framework & PHP',
    ]);

    expect($tag->slug)->toBe('laravel-framework-php');

    $this->assertDatabaseHas('tags', [
        'id' => $tag->id,
        'slug' => 'laravel-framework-php',
    ]);
});

test('slug is automatically updated when a tag name is updated', function () {
    $user = User::factory()->create();

    $tag = Tag::create([
        'user_id' => $user->id,
        'name' => 'Initial Name',
    ]);

    expect($tag->slug)->toBe('initial-name');

    $tag->update([
        'name' => 'Updated Tag Name',
    ]);

    expect($tag->fresh()->slug)->toBe('updated-tag-name');

    $this->assertDatabaseHas('tags', [
        'id' => $tag->id,
        'name' => 'Updated Tag Name',
        'slug' => 'updated-tag-name',
    ]);
});

test('guest cannot access tag service endpoints', function () {
    $tag = Tag::factory()->create();

    $this->getJson('/service/tags')->assertStatus(401);
    $this->postJson('/service/tags', ['name' => 'New Tag'])->assertStatus(401);
    $this->getJson('/service/tags/' . $tag->id)->assertStatus(401);
    $this->patchJson('/service/tags/' . $tag->id, ['name' => 'Updated Tag'])->assertStatus(401);
    $this->deleteJson('/service/tags/' . $tag->id)->assertStatus(401);
});

test('authenticated user can list their tags ordered by created_at descending', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();

    $firstTag = Tag::factory()->create([
        'user_id' => $user->id,
        'name' => 'First Tag',
        'created_at' => now()->subDay(),
    ]);

    $secondTag = Tag::factory()->create([
        'user_id' => $user->id,
        'name' => 'Second Tag',
        'created_at' => now(),
    ]);

    $otherUserTag = Tag::factory()->create([
        'user_id' => $otherUser->id,
        'name' => 'Other Tag',
    ]);

    $hyperlink = Hyperlink::factory()->create(['user_id' => $user->id]);
    $hyperlink->tags()->attach($secondTag);

    $response = $this->actingAs($user)->getJson('/service/tags');

    $response->assertStatus(200)
        ->assertJson([
            'filters' => ['search' => ''],
            'stats' => ['total' => 2],
        ])
        ->assertJsonCount(2, 'tags.data')
        ->assertJsonPath('tags.data.0.id', $secondTag->id)
        ->assertJsonPath('tags.data.0.links_count', 1)
        ->assertJsonPath('tags.data.1.id', $firstTag->id)
        ->assertJsonPath('tags.data.1.links_count', 0);
});

test('authenticated user can search and filter their tags', function () {
    $user = User::factory()->create();

    $targetTag = Tag::factory()->create([
        'user_id' => $user->id,
        'name' => 'Unique Tag Search',
    ]);

    $otherTag = Tag::factory()->create([
        'user_id' => $user->id,
        'name' => 'Different Category',
    ]);

    $response = $this->actingAs($user)->getJson('/service/tags?search=unique');

    $response->assertStatus(200)
        ->assertJsonCount(1, 'tags.data')
        ->assertJsonPath('tags.data.0.id', $targetTag->id);
});

test('authenticated user can create a tag via service endpoint', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->postJson('/service/tags', [
        'name' => 'New Tag Name',
    ]);

    $response->assertStatus(201)
        ->assertJson([
            'status' => true,
            'message' => 'Tag created successfully',
            'tag' => [
                'name' => 'New Tag Name',
                'slug' => 'new-tag-name',
            ],
        ]);

    $this->assertDatabaseHas('tags', [
        'user_id' => $user->id,
        'name' => 'New Tag Name',
        'slug' => 'new-tag-name',
    ]);
});

test('tag creation validates required fields and unique names per user', function () {
    $user = User::factory()->create();
    Tag::factory()->create([
        'user_id' => $user->id,
        'name' => 'Existing Tag',
    ]);

    // Validation error when name is missing
    $response = $this->actingAs($user)->postJson('/service/tags', []);
    $response->assertStatus(422)
        ->assertJsonValidationErrors(['name']);

    // Validation error when tag name is duplicated for the same user
    $dupResponse = $this->actingAs($user)->postJson('/service/tags', [
        'name' => 'Existing Tag',
    ]);
    $dupResponse->assertStatus(422)
        ->assertJsonValidationErrors(['name']);

    // Another user can create a tag with the same name
    $otherUser = User::factory()->create();
    $otherUserResponse = $this->actingAs($otherUser)->postJson('/service/tags', [
        'name' => 'Existing Tag',
    ]);
    $otherUserResponse->assertStatus(201);
});

test('authenticated user can view their tag details', function () {
    $user = User::factory()->create();
    $tag = Tag::factory()->create([
        'user_id' => $user->id,
        'name' => 'Specific Tag',
    ]);

    $response = $this->actingAs($user)->getJson('/service/tags/' . $tag->id);

    $response->assertStatus(200)
        ->assertJson([
            'status' => true,
            'tag' => [
                'id' => $tag->id,
                'name' => 'Specific Tag',
                'slug' => $tag->slug,
            ],
        ]);
});

test('authenticated user cannot view another users tag', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();
    $tag = Tag::factory()->create([
        'user_id' => $otherUser->id,
    ]);

    $response = $this->actingAs($user)->getJson('/service/tags/' . $tag->id);

    $response->assertStatus(403);
});

test('authenticated user can update their tag', function () {
    $user = User::factory()->create();
    $tag = Tag::factory()->create([
        'user_id' => $user->id,
        'name' => 'Old Name',
    ]);

    $response = $this->actingAs($user)->patchJson('/service/tags/' . $tag->id, [
        'name' => 'Updated Name',
    ]);

    $response->assertStatus(200)
        ->assertJson([
            'status' => true,
            'message' => 'Tag updated successfully',
            'tag' => [
                'id' => $tag->id,
                'name' => 'Updated Name',
                'slug' => 'updated-name',
            ],
        ]);

    $this->assertDatabaseHas('tags', [
        'id' => $tag->id,
        'user_id' => $user->id,
        'name' => 'Updated Name',
        'slug' => 'updated-name',
    ]);
});

test('authenticated user cannot update another users tag', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();
    $tag = Tag::factory()->create([
        'user_id' => $otherUser->id,
        'name' => 'Original Name',
    ]);

    $response = $this->actingAs($user)->patchJson('/service/tags/' . $tag->id, [
        'name' => 'Hacked Name',
    ]);

    $response->assertStatus(403);

    $this->assertDatabaseHas('tags', [
        'id' => $tag->id,
        'name' => 'Original Name',
    ]);
});

test('authenticated user can delete their tag', function () {
    $user = User::factory()->create();
    $tag = Tag::factory()->create([
        'user_id' => $user->id,
    ]);

    $response = $this->actingAs($user)->deleteJson('/service/tags/' . $tag->id);

    $response->assertStatus(200)
        ->assertJson([
            'status' => true,
            'message' => 'Tag deleted successfully',
        ]);

    $this->assertDatabaseMissing('tags', [
        'id' => $tag->id,
    ]);
});

test('authenticated user cannot delete another users tag', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();
    $tag = Tag::factory()->create([
        'user_id' => $otherUser->id,
    ]);

    $response = $this->actingAs($user)->deleteJson('/service/tags/' . $tag->id);

    $response->assertStatus(403);

    $this->assertDatabaseHas('tags', [
        'id' => $tag->id,
    ]);
});
