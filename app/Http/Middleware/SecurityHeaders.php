<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SecurityHeaders
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        $isLocal = config('app.env') === 'local';
        
        // Content Security Policy (CSP)
        // Kita matikan CSP di Local agar tidak bentrok dengan Vite HMR
        if (!$isLocal) {
            $csp = "default-src 'self'; ";
            $csp .= "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://cdn.jsdelivr.net https://cdn.ayroui.com https://www.youtube.com https://s.ytimg.com; ";
            $csp .= "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.bunny.net https://cdn.jsdelivr.net https://cdn.ayroui.com; ";
            $csp .= "font-src 'self' data: https://fonts.gstatic.com https://fonts.bunny.net https://cdn.jsdelivr.net https://cdn.ayroui.com; ";
            $csp .= "img-src 'self' data: https://jdih.banjarnegarakab.go.id https://www.googletagmanager.com https://i.ytimg.com; ";
            $csp .= "connect-src 'self' https://www.google-analytics.com; ";
            $csp .= "frame-src 'self' https://www.youtube.com https://vt.tiktok.com; ";

            $response->headers->set('Content-Security-Policy', $csp);
            $response->headers->set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
        }

        $response->headers->set('X-Frame-Options', 'DENY');
        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('X-XSS-Protection', '1; mode=block');
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');

        return $response;
    }
}
