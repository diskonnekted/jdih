<?php

namespace App\Filament\Pages\Auth;

use Filament\Auth\Pages\Login as BaseLogin;
use App\Models\ActivityLog;
use Filament\Auth\Http\Responses\Contracts\LoginResponse;

class Login extends BaseLogin
{
    // Catatan: captcha matematika custom dihapus 2026-09-11 (redundan —
    // Filament sudah punya rate limiting bawaan 5 percobaan/menit untuk login).

    public function authenticate(): ?LoginResponse
    {
        $response = parent::authenticate();

        if ($response && auth()->check()) {
            ActivityLog::log(
                'login',
                auth()->user(),
                'User login ke admin panel'
            );
        }

        return $response;
    }
}
