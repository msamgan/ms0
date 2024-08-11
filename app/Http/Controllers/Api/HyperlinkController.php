<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreHyperlinkRequest;
use App\Models\Hyperlink;
use App\Shortener;
use Illuminate\Http\JsonResponse;

/**
 *
 */
class HyperlinkController extends Controller
{
    /**
     * Shorten a URL
     * @param StoreHyperlinkRequest $request
     * @return JsonResponse
     */
    public function shorten(StoreHyperlinkRequest $request): JsonResponse
    {
        $hyperlinkExists = Hyperlink::query()->where('url', $request->get('url'))->first();

        if ($hyperlinkExists) {
            return response()->json([
                'status' => true,
                'message' => 'Shortened Url Already Exists',
                'shot_url' => url('/' . $hyperlinkExists->shot_slug),
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

        return response()->json([
            'status' => true,
            'message' => 'Shortened Url created successfully',
            'shot_url' => url('/' . $shotSlug),
        ]);
    }
}
