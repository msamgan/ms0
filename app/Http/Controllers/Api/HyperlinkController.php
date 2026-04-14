<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreHyperlinkRequest;
use App\Http\Resources\HyperlinkResource;
use App\Models\Hyperlink;
use App\Shortener;
use Illuminate\Http\JsonResponse;

class HyperlinkController extends Controller
{
    /**
     * Shorten a URL
     */
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
