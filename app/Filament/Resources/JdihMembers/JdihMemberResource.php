<?php

namespace App\Filament\Resources\JdihMembers;

use App\Models\JdihMember;

use App\Filament\Resources\JdihMembers\Pages\CreateJdihMember;
use App\Filament\Resources\JdihMembers\Pages\EditJdihMember;
use App\Filament\Resources\JdihMembers\Pages\ListJdihMembers;
use App\Filament\Resources\JdihMembers\Schemas\JdihMemberForm;
use App\Filament\Resources\JdihMembers\Tables\JdihMembersTable;

use UnitEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class JdihMemberResource extends Resource
{
    protected static ?string $model = JdihMember::class;

    protected static \BackedEnum|string|null $navigationIcon = Heroicon::OutlinedUserGroup;

    protected static ?string $navigationLabel = 'Management Anggota JDIH';

    protected static \UnitEnum|string|null $navigationGroup = 'Data Master';

    protected static ?int $navigationSort = 6;


protected static ?string $recordTitleAttribute = 'name';

    public static function form(Schema $schema): Schema
    {
        return JdihMemberForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return JdihMembersTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListJdihMembers::route('/'),
            'create' => CreateJdihMember::route('/create'),
            'edit' => EditJdihMember::route('/{record}/edit'),
        ];
    }
}

