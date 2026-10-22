<?php

namespace App\Http\Controllers;

use App\Models\Hyperlink;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        return response()->json($this->payload());
    }

    private function payload(): array
    {
        return [
            'token' => auth()->user()->access_token,
            'linkCount' => Hyperlink::query()->where('user_id', auth()->id())->count(),
            'visits' => Hyperlink::query()->where('user_id', auth()->id())->sum('visits'),
        ];
    }
}
