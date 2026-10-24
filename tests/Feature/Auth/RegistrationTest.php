<?php

test('registration screen can be rendered', function () {
    $response = $this->get('/register');

    $response->assertStatus(200);
});

test('new users can register', function () {
    $response = $this->post('/register', [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('dashboard', absolute: false));
});

test('registration blocks disposable emails when safety rule is enforced', function () {
    config(['email_safety.enabled' => true]);

    $response = $this->post('/register', [
        'name' => 'Disposable User',
        'email' => 'user@mailinator.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertSessionHasErrors(['email']);
    $this->assertGuest();
});

test('registration blocks fake test domains when safety rule is enforced', function () {
    config(['email_safety.enabled' => true]);

    $response = $this->post('/register', [
        'name' => 'Fake User',
        'email' => 'user@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertSessionHasErrors(['email']);
    $this->assertGuest();
});

test('registration allows valid real email domains when safety rule is enforced', function () {
    config([
        'email_safety.enabled' => true,
        'email_safety.check_dns_records' => false,
    ]);

    $response = $this->post('/register', [
        'name' => 'Valid User',
        'email' => 'validuser@gmail.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('dashboard', absolute: false));
});
