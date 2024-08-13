<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreHyperlinkRequest;
use App\Http\Requests\UpdateHyperlinkRequest;
use App\Methods;
use App\Models\Hyperlink;
use App\Shortener;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Random\RandomException;

class HyperlinkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function links(): Response
    {
        return Inertia::render('Links', [
            'links' => Hyperlink::query()->where('user_id', auth()->id())->get()->map(function ($link) {
                return [
                    'id' => $link->id,
                    'url' => $link->url,
                    'shot_slug' => $link->shot_slug,
                    'visits' => $link->visits,
                    'last_visit' => date('F, d Y', strtotime($link->last_visit)),
                    'shortened_url' => url('/' . $link->shot_slug),
                    'status' => 'Active',
                ];
            }),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreHyperlinkRequest $request): JsonResponse
    {
        $hyperlinkExists = Hyperlink::query()->where('url', $request->get('url'))->first();

        if ($hyperlinkExists && $hyperlinkExists->user_id === null && auth()->check()) {
            $hyperlinkExists->user_id = auth()->id();
            $hyperlinkExists->save();
        }

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
        ];

        if (auth()->check()) {
            $hyperLinkData['user_id'] = auth()->id();
        }

        Hyperlink::create($hyperLinkData);

        return response()->json([
            'status' => true,
            'message' => 'Shortened Url created successfully',
            'shot_url' => url('/' . $shotSlug),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $shortSlug = $request->shot_slug;

        $hyperlink = Hyperlink::query()->where(DB::raw('BINARY `shot_slug`'), $shortSlug)->first();

        if ($hyperlink) {
            $hyperlink->visits = $hyperlink->visits + 1;
            $hyperlink->last_visit = now();
            $hyperlink->save();

            return redirect($hyperlink->url);
        }

        abort(404);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Hyperlink $hyperlink)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateHyperlinkRequest $request, Hyperlink $hyperlink)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Hyperlink $hyperlink)
    {
        //
    }

    /**
     * @throws RandomException
     */
    public function regenerateToken(): JsonResponse
    {
        $user = auth()->user();
        $user->access_token = Methods::generateAccessToken();
        $user->save();

        return response()->json([
            'status' => true,
            'message' => 'Token regenerated successfully',
        ]);
    }
}
