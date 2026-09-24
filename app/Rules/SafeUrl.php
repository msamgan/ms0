<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Translation\PotentiallyTranslatedString;

class SafeUrl implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  Closure(string, ?string=): PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (! is_string($value)) {
            $fail('The :attribute must be a valid URL.');

            return;
        }

        $parts = parse_url($value);

        if ($parts === false || empty($parts['host'])) {
            $fail('The :attribute is not a valid URL.');

            return;
        }

        $scheme = strtolower($parts['scheme'] ?? '');
        $allowedSchemes = array_map('strtolower', config('url_safety.allowed_schemes', ['http', 'https']));

        if (! in_array($scheme, $allowedSchemes, true)) {
            $fail('The :attribute uses an unsupported or unsafe protocol.');

            return;
        }

        $host = strtolower($parts['host']);

        if ($this->isBlockedDomain($host)) {
            $fail('The :attribute points to a known dangerous or blocked domain.');

            return;
        }

        if ($this->containsBlockedKeyword($host)) {
            $fail('The :attribute points to a domain flagged as dangerous.');

            return;
        }

        if (config('url_safety.block_private_hosts', true) && $this->isPrivateOrReservedHost($host)) {
            $fail('The :attribute points to a private or internal address, which is not allowed.');

            return;
        }

        if (! $this->hasAllowedFileExtension($parts['path'] ?? '')) {
            $fail('The :attribute points to a file type that is not allowed.');

            return;
        }
    }

    protected function hasAllowedFileExtension(string $path): bool
    {
        $lastSegment = basename($path);
        $extension = pathinfo($lastSegment, PATHINFO_EXTENSION);

        // No extension in the path (e.g. a regular page URL) is always allowed.
        if ($extension === '') {
            return true;
        }

        $allowed = array_map('strtolower', config('url_safety.allowed_file_extensions', []));

        return in_array(strtolower($extension), $allowed, true);
    }

    protected function isBlockedDomain(string $host): bool
    {
        foreach (config('url_safety.blocked_domains', []) as $blocked) {
            $blocked = strtolower(trim((string) $blocked));

            if ($blocked === '') {
                continue;
            }

            if ($host === $blocked || str_ends_with($host, '.' . $blocked)) {
                return true;
            }
        }

        return false;
    }

    protected function containsBlockedKeyword(string $host): bool
    {
        foreach (config('url_safety.blocked_keywords', []) as $keyword) {
            $keyword = strtolower(trim((string) $keyword));

            if ($keyword !== '' && str_contains($host, $keyword)) {
                return true;
            }
        }

        return false;
    }

    protected function isPrivateOrReservedHost(string $host): bool
    {
        if ($host === 'localhost' || str_ends_with($host, '.localhost') || str_ends_with($host, '.local')) {
            return true;
        }

        $ips = [];

        if (filter_var($host, FILTER_VALIDATE_IP)) {
            $ips[] = $host;
        } else {
            $ips = array_merge(
                $this->resolveIps($host, DNS_A),
                $this->resolveIps($host, DNS_AAAA)
            );
        }

        if (empty($ips)) {
            // Could not resolve; do not block on resolution failure alone.
            return false;
        }

        foreach ($ips as $ip) {
            if (! filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) {
                return true;
            }
        }

        return false;
    }

    protected function resolveIps(string $host, int $type): array
    {
        $records = @dns_get_record($host, $type);

        if (! is_array($records)) {
            return [];
        }

        return array_values(array_filter(array_map(
            fn ($record) => $record['ip'] ?? $record['ipv6'] ?? null,
            $records
        )));
    }
}
