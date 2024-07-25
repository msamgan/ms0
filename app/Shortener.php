<?php

namespace App;

use App\Models\Hyperlink;

class Shortener
{
    const SELECTION = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    const MAX_LENGTH = 4;

    public static function shorten(string $url): string
    {
        $uuid = substr(str_shuffle(str_repeat(self::SELECTION, 5)), 0, self::MAX_LENGTH);

        $exist = Hyperlink::query()->where('shot_slug', $uuid)->first();

        if ($exist) {
            return self::shorten($url);
        }

        return $uuid;
    }
}
