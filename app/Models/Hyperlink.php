<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @method static create(array $array)
 */
class Hyperlink extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'user_id',
        'url',
        'shot_slug',
        'visits',
        'is_active',
        'last_visit',
    ];

    protected $keyType = 'string';
}
