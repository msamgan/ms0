<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StatusCodeResource extends JsonResource
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
        $statusCode = (int) $this->resource['status_code'];
        $message = $this->resource['message'];

        $response = [
            'status' => true,
            'status_code' => $statusCode,
            'message' => $message,
        ];

        if (isset($this->resource['data'])) {
            $response['data'] = $this->resource['data'];
        }

        return $response;
    }
}
