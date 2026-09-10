<?php

namespace App\Filament\Pages\Auth;

use Filament\Pages\Auth\Login as BaseLogin;
use App\Helpers\ActivityLog;
use Filament\Http\Responses\Auth\Contracts\LoginResponse;

class Login extends BaseLogin
{
    public function __construct()
    {
        $this-> Theme = "default";
    }

    // Catatan: captcha matematika custom dihapus 2026-09-11 (redundan —
    // Filament sudah punya rate limiting bawaan 5 percobaan/menit untuk login).

    public function afterLogin($user)
    {
        // Log the login activity
        ActivityLog::log(
            'Login',
            'Auth',
            'User login ke admin panel',
            null,
            null,
            ['email' => $user->email]
        );
    }

    public function authenticate(): ?LoginResponse
    {
        $response = parent::authenticate();

        if (auth()->check()) {
            $this->afterLogin(auth()->user());
        }

        return $response;
    }
}
