<?php

namespace App\Http\Requests;

use App\Rules\SafeUrl;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: 'StoreHyperlinkRequest',
    title: 'Store Hyperlink Request',
    description: 'Request payload to shorten a URL',
    required: ['url'],
    properties: [
        new OA\Property(
            property: 'url',
            description: 'The original destination URL to shorten',
            type: 'string',
            format: 'uri',
            example: 'https://example.com/very/long/url'
        ),
    ]
)]
class StoreHyperlinkRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'url' => ['required', 'url', new SafeUrl],
        ];
    }
}
