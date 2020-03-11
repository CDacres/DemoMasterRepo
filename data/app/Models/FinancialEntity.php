<?php

namespace App\Models;

use App\LaravelExtensions\Model\LegacyModel;

class FinancialEntity extends LegacyModel
{
    public $timestamps = false;
    public $table = 'financial_entities';

    protected $fillable = [
        'name',
        'address',
        'vat_number',
        'account_user'
    ];
}