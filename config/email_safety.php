<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Enforce in Production Only
    |--------------------------------------------------------------------------
    |
    | When set to true, fake email detection is only enforced when the
    | application environment is set to "production". In local or testing
    | environments, validation is bypassed to allow mock email addresses.
    | Set to false or configure EMAIL_SAFETY_ENFORCE to enforce in all environments.
    |
    */
    'production_only' => env('EMAIL_SAFETY_PRODUCTION_ONLY', true),

    /*
    |--------------------------------------------------------------------------
    | Enforce Email Safety
    |--------------------------------------------------------------------------
    |
    | If explicitly set to true or false, overrides the production_only check.
    | When null, the rule checks whether app()->isProduction() (or production_only).
    |
    */
    'enabled' => env('EMAIL_SAFETY_ENABLED', null),

    /*
    |--------------------------------------------------------------------------
    | Check DNS / MX Records
    |--------------------------------------------------------------------------
    |
    | When enabled and running in an enforced environment, verifies that the
    | email domain has valid MX or A/AAAA DNS records to ensure the domain
    | can actually receive mail.
    |
    */
    'check_dns_records' => env('EMAIL_SAFETY_CHECK_DNS', true),

    /*
    |--------------------------------------------------------------------------
    | Blocked Disposable / Temporary Email Domains
    |--------------------------------------------------------------------------
    |
    | Known disposable, temporary, or throwaway email domains that should
    | not be allowed for user registration.
    | Additional domains can be appended via EMAIL_SAFETY_BLOCKED_DOMAINS env.
    |
    */
    'blocked_domains' => array_filter(array_merge([
        'mailinator.com',
        '10minutemail.com',
        'tempmail.com',
        'temp-mail.org',
        'guerrillamail.com',
        'guerrillamail.net',
        'guerrillamail.org',
        'guerrillamailblock.com',
        'sharklasers.com',
        'grr.la',
        'throwawaymail.com',
        'yopmail.com',
        'yopmail.fr',
        'yopmail.net',
        'trashmail.com',
        'trashmail.net',
        'trashmail.me',
        'dispostable.com',
        'getairmail.com',
        'fakemailgenerator.com',
        'generator.email',
        'nada.ltd',
        'mohmal.com',
        'crazymailing.com',
        'maildrop.cc',
        'inboxkitten.com',
        'discard.email',
        'fakeinbox.com',
        'armyspy.com',
        'cuvox.de',
        'dayrep.com',
        'einrot.com',
        'fleckens.hu',
        'gustr.com',
        'jourrapide.com',
        'rhyta.com',
        'superrito.com',
        'teleworm.us',
        'dropmail.me',
        'burnermail.io',
        'emailondeck.com',
        'tempail.com',
        'mytemp.email',
        'byom.de',
        'trash-mail.com',
        'getnada.com',
        'abv.bg',
    ], array_filter(explode(',', (string) env('EMAIL_SAFETY_BLOCKED_DOMAINS', ''))))),

    /*
    |--------------------------------------------------------------------------
    | Blocked Fake / Testing Domains
    |--------------------------------------------------------------------------
    |
    | Reserved / example domains that should not be used for production accounts.
    |
    */
    'blocked_test_domains' => [
        'example.com',
        'example.org',
        'example.net',
        'test.com',
        'fake.com',
        'invalid.com',
        'localhost',
        'invalid',
        'test',
        'example',
    ],

    /*
    |--------------------------------------------------------------------------
    | Blocked Keywords
    |--------------------------------------------------------------------------
    |
    | Reject emails whose domain part contains any of these keywords,
    | commonly used by disposable or throwaway inbox services.
    |
    */
    'blocked_keywords' => [
        'mailinator',
        'tempmail',
        'disposable',
        'trashmail',
        'fakeinbox',
        '10minutemail',
        'throwaway',
        'guerrillamail',
        'sharklasers',
        'yopmail',
        'dispostable',
        'burnermail',
        'emailondeck',
        'maildrop',
    ],
];
