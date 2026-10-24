<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Translation\PotentiallyTranslatedString;

class NotFakeEmail implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  Closure(string, ?string=): PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (! $this->shouldValidate()) {
            return;
        }

        if (! is_string($value) || ! filter_var($value, FILTER_VALIDATE_EMAIL)) {
            $fail('The :attribute must be a valid email address.');

            return;
        }

        $domain = $this->extractDomain($value);

        if ($domain === '' || ! str_contains($domain, '.')) {
            $fail('The :attribute must have a valid email domain.');

            return;
        }

        if ($this->isBlockedTestDomain($domain)) {
            $fail('The :attribute domain is not allowed.');

            return;
        }

        if ($this->isBlockedDomain($domain)) {
            $fail('The :attribute must not be a fake or disposable email address.');

            return;
        }

        if ($this->containsBlockedKeyword($domain)) {
            $fail('The :attribute domain appears to be disposable or invalid.');

            return;
        }

        if ($this->shouldCheckDns() && ! $this->hasValidDnsRecords($domain)) {
            $fail('The :attribute domain does not exist or cannot receive emails.');

            return;
        }
    }

    /**
     * Determine if validation should be performed based on environment or configuration.
     */
    public function shouldValidate(): bool
    {
        $enabled = config('email_safety.enabled');

        if ($enabled !== null) {
            return (bool) $enabled;
        }

        if (config('email_safety.production_only', true)) {
            return app()->isProduction();
        }

        return true;
    }

    /**
     * Extract normalized domain from email.
     */
    public function extractDomain(string $email): string
    {
        $parts = explode('@', $email);

        return strtolower(trim((string) end($parts)));
    }

    /**
     * Check if domain is in blocked disposable domains list.
     */
    protected function isBlockedDomain(string $domain): bool
    {
        foreach (config('email_safety.blocked_domains', []) as $blocked) {
            $blocked = strtolower(trim((string) $blocked));

            if ($blocked === '') {
                continue;
            }

            if ($domain === $blocked || str_ends_with($domain, '.' . $blocked)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Check if domain is a known test / dummy domain.
     */
    protected function isBlockedTestDomain(string $domain): bool
    {
        foreach (config('email_safety.blocked_test_domains', []) as $blocked) {
            $blocked = strtolower(trim((string) $blocked));

            if ($blocked === '') {
                continue;
            }

            if ($domain === $blocked || str_ends_with($domain, '.' . $blocked)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Check if domain contains any blocked keyword.
     */
    protected function containsBlockedKeyword(string $domain): bool
    {
        foreach (config('email_safety.blocked_keywords', []) as $keyword) {
            $keyword = strtolower(trim((string) $keyword));

            if ($keyword !== '' && str_contains($domain, $keyword)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Determine whether DNS check should be executed.
     */
    protected function shouldCheckDns(): bool
    {
        return (bool) config('email_safety.check_dns_records', true);
    }

    /**
     * Verify if domain has active MX or A/AAAA records.
     */
    protected function hasValidDnsRecords(string $domain): bool
    {
        // First check MX records (standard for receiving mail)
        if (@checkdnsrr($domain, 'MX')) {
            return true;
        }

        // Fallback to A / AAAA records (RFC 5321 permits delivery to A record if no MX exists)
        if (@checkdnsrr($domain, 'A') || @checkdnsrr($domain, 'AAAA')) {
            return true;
        }

        return false;
    }
}
