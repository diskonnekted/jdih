<?php

namespace App\Filament\Pages\Auth;

use Filament\Forms\Components\TextInput;
use Filament\Auth\Pages\Login as BaseLogin;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\App;
use Filament\Notifications\Notification;
use Illuminate\Validation\ValidationException;

class Login extends BaseLogin
{
    public function mount(): void
    {
        parent::mount();

        // Skip captcha di environment lokal
        if (!App::isLocal() && !Session::has('captcha_answer')) {
            $this->generateCaptcha();
        }
    }

    protected function generateCaptcha(): void
    {
        Session::put('captcha_question', "Berapa hasil dari 5 + 5 ?");
        Session::put('captcha_answer', 10);
    }

    public function form(Schema $schema): Schema
    {
        // Di lokal: hanya tampilkan email & password tanpa captcha
        if (App::isLocal()) {
            return $schema->components([
                $this->getEmailFormComponent(),
                $this->getPasswordFormComponent(),
                $this->getRememberFormComponent(),
            ]);
        }

        if (!Session::has('captcha_question')) {
            $this->generateCaptcha();
        }

        return $schema
            ->components([
                $this->getEmailFormComponent(),
                $this->getPasswordFormComponent(),
                $this->getRememberFormComponent(),
                TextInput::make('captcha')
                    ->label(fn() => Session::get('captcha_question'))
                    ->placeholder('Hasil angka...')
                    ->required()
                    ->numeric()
                    ->autocomplete(false)
                    ->extraAttributes(['autocomplete' => 'off']),
            ]);
    }

    protected function getCredentialsFromFormData(array $data): array
    {
        // Bypass validasi captcha di lokal
        if (!App::isLocal()) {
            if ((int)($data['captcha'] ?? -1) !== (int)Session::get('captcha_answer')) {
                $this->generateCaptcha();
                throw ValidationException::withMessages([
                    'data.captcha' => 'Jawaban captcha salah. Silakan coba lagi.',
                ]);
            }
        }

        return [
            'email'    => $data['email'],
            'password' => $data['password'],
        ];
    }
}

