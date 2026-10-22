<?php

namespace App\Http\Requests;

use App\Models\Tag;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTagRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $tag = $this->route('tag');

        if ($tag instanceof Tag) {
            return $this->user()?->id === $tag->user_id;
        }

        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $tag = $this->route('tag');
        $tagId = $tag instanceof Tag ? $tag->id : $tag;

        return [
            'name' => [
                'sometimes',
                'required',
                'string',
                'max:255',
                Rule::unique('tags', 'name')
                    ->where('user_id', $this->user()?->id)
                    ->ignore($tagId),
            ],
            'slug' => [
                'nullable',
                'string',
                'max:255',
            ],
        ];
    }
}
