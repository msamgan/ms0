<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * @method static create(array $array)
 *
 * @property string $id
 * @property string $url
 * @property string $shot_slug
 * @property int $visits
 * @property bool $is_active
 * @property string $last_visit
 * @property string $user_id
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

    /**
     * Get the user that owns the hyperlink.
     *
     * @return BelongsTo<User, Hyperlink>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return BelongsToMany<Tag, Hyperlink>
     */
    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'hyperlink_tag')->withTimestamps();
    }
}
