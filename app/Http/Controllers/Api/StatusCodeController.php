<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\StatusCodeResource;
use Illuminate\Http\Request;

class StatusCodeController extends Controller
{
    /**
     * Status Code Response
     */
    public function __invoke(Request $request, $statusCode)
    {
        $statusCode = (int) $statusCode;

        $message = match (true) {
            $statusCode >= 200 && $statusCode < 300 => 'Success',
            $statusCode >= 300 && $statusCode < 400 => 'Redirection',
            $statusCode >= 400 && $statusCode < 500 => 'Client Error',
            $statusCode >= 500 && $statusCode < 600 => 'Server Error',
            default => 'Unknown Status',
        };

        $data = [
            'status_code' => $statusCode,
            'message' => $message,
        ];

        $methodsWithData = ['post', 'put', 'patch', 'delete'];

        if (in_array(strtolower($request->method()), $methodsWithData)) {
            $data['data'] = $request->except(['user']);
        }

        return new StatusCodeResource($data)
            ->response()
            ->setStatusCode($statusCode);
    }
}
