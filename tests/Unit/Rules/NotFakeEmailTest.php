<?php

use App\Rules\NotFakeEmail;

test('rule passes in non-production environments when not explicitly enabled', function () {
    config([
        'email_safety.production_only' => true,
        'email_safety.enabled' => null,
    ]);

    $rule = new NotFakeEmail;
    $failed = false;

    $rule->validate('email', 'user@mailinator.com', function () use (&$failed) {
        $failed = true;
    });

    expect($failed)->toBeFalse();
});

test('rule validates email format when enabled', function () {
    config(['email_safety.enabled' => true]);

    $rule = new NotFakeEmail;
    $failed = false;

    $rule->validate('email', 'not-an-email', function () use (&$failed) {
        $failed = true;
    });

    expect($failed)->toBeTrue();
});

test('rule rejects blocked disposable email domains', function () {
    config(['email_safety.enabled' => true]);

    $disposableEmails = [
        'test@mailinator.com',
        'test@10minutemail.com',
        'test@tempmail.com',
        'test@guerrillamail.com',
        'test@trashmail.com',
        'test@yopmail.com',
        'test@sharklasers.com',
    ];

    $rule = new NotFakeEmail;

    foreach ($disposableEmails as $email) {
        $failed = false;
        $rule->validate('email', $email, function () use (&$failed) {
            $failed = true;
        });

        expect($failed)->toBeTrue("Expected {$email} to be blocked");
    }
});

test('rule rejects subdomains of blocked disposable domains', function () {
    config(['email_safety.enabled' => true]);

    $rule = new NotFakeEmail;
    $failed = false;

    $rule->validate('email', 'test@sub.mailinator.com', function () use (&$failed) {
        $failed = true;
    });

    expect($failed)->toBeTrue();
});

test('rule rejects blocked keywords in domain', function () {
    config(['email_safety.enabled' => true]);

    $rule = new NotFakeEmail;
    $failed = false;

    $rule->validate('email', 'test@custom-tempmail-service.org', function () use (&$failed) {
        $failed = true;
    });

    expect($failed)->toBeTrue();
});

test('rule rejects fake test domains in production', function () {
    config(['email_safety.enabled' => true]);

    $testEmails = [
        'user@example.com',
        'user@example.org',
        'user@test.com',
        'user@fake.com',
    ];

    $rule = new NotFakeEmail;

    foreach ($testEmails as $email) {
        $failed = false;
        $rule->validate('email', $email, function () use (&$failed) {
            $failed = true;
        });

        expect($failed)->toBeTrue("Expected {$email} to be blocked");
    }
});

test('rule allows valid email domains when DNS check is disabled or valid', function () {
    config([
        'email_safety.enabled' => true,
        'email_safety.check_dns_records' => false,
    ]);

    $validEmails = [
        'john.doe@gmail.com',
        'jane.smith@outlook.com',
        'user@yahoo.com',
        'test@proton.me',
    ];

    $rule = new NotFakeEmail;

    foreach ($validEmails as $email) {
        $failed = false;
        $rule->validate('email', $email, function () use (&$failed) {
            $failed = true;
        });

        expect($failed)->toBeFalse("Expected {$email} to pass validation");
    }
});
