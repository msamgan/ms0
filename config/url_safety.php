<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Allowed URL Schemes
    |--------------------------------------------------------------------------
    |
    | Only URLs using one of these schemes are considered safe to shorten.
    | This blocks dangerous schemes such as "javascript:", "data:" and "file:".
    |
    */
    'allowed_schemes' => ['http', 'https'],

    /*
    |--------------------------------------------------------------------------
    | Block Private / Internal Hosts
    |--------------------------------------------------------------------------
    |
    | When enabled, URLs that resolve to loopback, private or reserved IP
    | ranges (e.g. 127.0.0.1, 10.0.0.0/8, 169.254.169.254) are rejected to
    | prevent SSRF and internal network access via the shortener.
    |
    */
    'block_private_hosts' => true,

    /*
    |--------------------------------------------------------------------------
    | Blocked Domains
    |--------------------------------------------------------------------------
    |
    | Known malicious / dangerous domains (phishing, malware, spam) that
    | should never be accepted, regardless of scheme or host resolution.
    | Additional domains can be appended via the URL_SAFETY_BLOCKED_DOMAINS
    | environment variable as a comma separated list.
    |
    */
    'blocked_domains' => array_filter(array_merge([
        'malware.testing.google.test',
        'phishing.testing.google.test',
    ], array_filter(explode(',', (string) env('URL_SAFETY_BLOCKED_DOMAINS', ''))))),

    /*
    |--------------------------------------------------------------------------
    | Blocked Keywords
    |--------------------------------------------------------------------------
    |
    | Reject URLs whose host contains any of these keywords, commonly used
    | in phishing / adult / gambling domains.
    |
    */
    'blocked_keywords' => [
        'phishing',
        'malware',
    ],

    /*
    |--------------------------------------------------------------------------
    | Allowed File Extensions
    |--------------------------------------------------------------------------
    |
    | If the URL path points to a file (i.e. it ends with an extension),
    | only extensions in this list are considered safe and accepted.
    | Dangerous/executable extensions (.exe, .bat, .sh, .apk, etc.) are
    | rejected. URLs without a file extension in the path are unaffected.
    |
    */
    'allowed_file_extensions' => [
        // Documents
        'pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'csv', 'txt', 'rtf', 'odt', 'ods', 'odp',
        // Images
        'jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'bmp', 'ico',
        // Audio / Video
        'mp3', 'wav', 'ogg', 'mp4', 'webm', 'mov', 'avi',
        // Archives
        'zip', 'tar', 'gz', 'rar', '7z',
    ],
];
