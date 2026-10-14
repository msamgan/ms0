<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: 'HyperlinkResource',
    title: 'Hyperlink Resource',
    description: 'Response payload returned after creating or retrieving a shortened URL',
    properties: [
        new OA\Property(
            property: 'status',
            description: 'Operation success status flag',
            type: 'boolean',
            example: true
        ),
        new OA\Property(
            property: 'message',
            description: 'Informational status message',
            type: 'string',
            example: 'Shortened Url created successfully'
        ),
        new OA\Property(
            property: 'short_url',
            description: 'The generated shortened URL',
            type: 'string',
            format: 'uri',
            example: 'http://localhost/abc1234'
        ),
    ]
)]
class HyperlinkResource extends JsonResource
{
    /**
     * The "data" wrapper that should be applied.
     *
     * @var string|null
     */
    public static $wrap = null;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'status' => true,
            'message' => $this->resource['message'],
            'short_url' => $this->resource['short_url'],
        ];
    }
}
