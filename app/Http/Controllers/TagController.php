<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTagRequest;
use App\Http\Requests\UpdateTagRequest;
use App\Models\Tag;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        return $this->tags($request);
    }

    public function tags(Request $request): JsonResponse
    {
        return response()->json($this->tagsPayload($request));
    }

    private function tagsPayload(Request $request): array
    {
        $query = Tag::query()->where('user_id', auth()->id());
        $search = trim((string) $request->input('search', ''));

        $listing = (clone $query)->when($search !== '', function ($q) use ($search) {
            $term = '%' . addcslashes($search, '%_\\') . '%';
            $q->where(fn ($w) => $w->where('name', 'like', $term)->orWhere('slug', 'like', $term));
        });

        return [
            'filters' => ['search' => $search],
            'stats' => [
                'total' => (clone $query)->count(),
            ],
            'tags' => $listing->orderBy('created_at', 'desc')->orderBy('id', 'desc')->paginate(20)->withQueryString()->through(function ($tag) {
                return [
                    'id' => $tag->id,
                    'name' => $tag->name,
                    'slug' => $tag->slug,
                    'created_at' => $tag->created_at?->format('F, d Y'),
                    'updated_at' => $tag->updated_at?->format('F, d Y'),
                ];
            }),
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTagRequest $request): JsonResponse
    {
        $tag = Tag::create([
            'user_id' => auth()->id(),
            'name' => $request->get('name'),
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Tag created successfully',
            'tag' => [
                'id' => $tag->id,
                'name' => $tag->name,
                'slug' => $tag->slug,
                'created_at' => $tag->created_at?->format('F, d Y'),
                'updated_at' => $tag->updated_at?->format('F, d Y'),
            ],
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Tag $tag): JsonResponse
    {
        if ($tag->user_id !== auth()->id()) {
            abort(403);
        }

        return response()->json([
            'status' => true,
            'tag' => [
                'id' => $tag->id,
                'name' => $tag->name,
                'slug' => $tag->slug,
                'created_at' => $tag->created_at?->format('F, d Y'),
                'updated_at' => $tag->updated_at?->format('F, d Y'),
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTagRequest $request, Tag $tag): JsonResponse
    {
        if ($tag->user_id !== auth()->id()) {
            abort(403);
        }

        $tag->update([
            'name' => $request->get('name'),
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Tag updated successfully',
            'tag' => [
                'id' => $tag->id,
                'name' => $tag->name,
                'slug' => $tag->slug,
                'created_at' => $tag->created_at?->format('F, d Y'),
                'updated_at' => $tag->updated_at?->format('F, d Y'),
            ],
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Tag $tag): JsonResponse|RedirectResponse
    {
        if ($tag->user_id !== auth()->id()) {
            abort(403);
        }

        $tag->delete();

        if ($request->wantsJson()) {
            return response()->json([
                'status' => true,
                'message' => 'Tag deleted successfully',
            ]);
        }

        return redirect()->back();
    }
}
