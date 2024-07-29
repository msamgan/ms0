<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreHyperlinkRequest;
use App\Http\Requests\UpdateHyperlinkRequest;
use App\Models\Hyperlink;
use App\Shortener;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class HyperlinkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreHyperlinkRequest $request): JsonResponse
    {
        $shotSlug = Shortener::shorten($request->get('url'));

        $hyperlinkExists = Hyperlink::query()->where('url', $request->get('url'))->first();

        if ($hyperlinkExists) {
            return response()->json([
                'status' => true,
                'message' => 'Shortened Url Already Exists',
                'shot_url' => url('/' . $hyperlinkExists->shot_slug),
            ]);
        }

        Hyperlink::create([
            'url' => $request->get('url'),
            'shot_slug' => $shotSlug,
            'last_visit' => now(),
        ]);

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

    public function apiDocs(): Response
    {
        return Inertia::render('ApiDocs');
    }
}
