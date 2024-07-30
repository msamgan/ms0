<?php

namespace App;

use Random\RandomException;

class Methods
{
    /**
     * @throws RandomException
     */
    public static function generateAccessToken(): string
    {
        return bin2hex(random_bytes(32));
    }
}
