<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $userAgent = $request->header('User-Agent', '');
        $isMobile = preg_match('/Mobile|Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i', $userAgent);

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'isMobile' => (bool) $isMobile,
        ];
    }
}
