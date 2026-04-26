<?php

namespace App\Filament\Resources\LegalDocuments\Pages;

use App\Filament\Resources\LegalDocuments\LegalDocumentResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Support\Facades\Storage;

class EditLegalDocument extends EditRecord
{
    protected static string $resource = LegalDocumentResource::class;

    /**
     * Snapshot file paths before save so we can clean up old files.
     */
    private ?string $oldFilePath = null;
    private ?string $oldAbstractFilePath = null;

    protected function beforeFill(): void
    {
        $this->oldFilePath = $this->record->file_path;
        $this->oldAbstractFilePath = $this->record->abstract_file_path;
    }

    protected function afterSave(): void
    {
        // Delete old main file if it was replaced
        if (
            $this->oldFilePath &&
            $this->record->file_path !== $this->oldFilePath
        ) {
            Storage::disk('public')->delete($this->oldFilePath);
        }

        // Delete old abstract file if it was replaced
        if (
            $this->oldAbstractFilePath &&
            $this->record->abstract_file_path !== $this->oldAbstractFilePath
        ) {
            Storage::disk('public')->delete($this->oldAbstractFilePath);
        }
    }

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make()
                ->before(function () {
                    // Delete associated files before the record is removed
                    if ($this->record->file_path) {
                        Storage::disk('public')->delete($this->record->file_path);
                    }
                    if ($this->record->abstract_file_path) {
                        Storage::disk('public')->delete($this->record->abstract_file_path);
                    }
                }),
        ];
    }
}
