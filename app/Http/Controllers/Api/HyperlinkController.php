<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreHyperlinkRequest;
use App\Http\Resources\HyperlinkResource;
use App\Models\Hyperlink;
use App\Shortener;
use OpenApi\Attributes as OA;

class HyperlinkController extends Controller
{
    /**
     * Shorten a URL
     */
    #[OA\Post(
        path: '/api/shorten',
        operationId: 'shortenUrl',
        summary: 'Shorten a URL',
        description: 'Creates a new shortened URL or returns the existing shortened URL for the provided URL.',
        security: [['bearerAuth' => []]],
        tags: ['Hyperlinks'],
        requestBody: new OA\RequestBody(
            required: true,
            description: 'URL data to be shortened',
            content: new OA\JsonContent(
                ref: '#/components/schemas/StoreHyperlinkRequest'
            )
        ),
        responses: [
            new OA\Response(
                response: 200,
                description: 'URL shortened successfully or existing short URL returned',
                content: new OA\JsonContent(
                    ref: '#/components/schemas/HyperlinkResource'
                )
            ),
            new OA\Response(
                response: 401,
                description: 'Unauthorized - invalid or missing access token',
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: 'message', type: 'string', example: 'Unauthorized'),
                    ]
                )
            ),
            new OA\Response(
                response: 422,
                description: 'Validation error - invalid URL or unsafe URL',
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: 'message', type: 'string', example: 'The url field is required.'),
                        new OA\Property(
                            property: 'errors',
                            type: 'object',
                            properties: [
                                new OA\Property(
                                    property: 'url',
                                    type: 'array',
                                    items: new OA\Items(type: 'string', example: 'The url field is required.')
                                ),
                            ]
                        ),
                    ]
                )
            ),
        ]
    )]
    public function shorten(StoreHyperlinkRequest $request): HyperlinkResource
    {
        $hyperlinkExists = Hyperlink::query()->where('url', $request->get('url'))->first();

        if ($hyperlinkExists) {
            return new HyperlinkResource([
                'message' => 'Shortened Url Already Exists',
                'short_url' => url('/' . $hyperlinkExists->shot_slug),
            ]);
        }

        $shotSlug = Shortener::shorten();

        $hyperLinkData = [
            'url' => $request->get('url'),
            'shot_slug' => $shotSlug,
            'last_visit' => now(),
            'user_id' => $request->user->id,
        ];

        Hyperlink::create($hyperLinkData);

        return new HyperlinkResource([
            'message' => 'Shortened Url created successfully',
            'short_url' => url('/' . $shotSlug),
        ]);
    }
}
