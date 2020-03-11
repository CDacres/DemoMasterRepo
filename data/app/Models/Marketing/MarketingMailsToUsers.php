<?php

namespace App\Models\Marketing;
use App\LaravelExtensions\Model\LegacyModel;

class MarketingMailsToUsers extends LegacyModel
{
    protected $table = 'marketing_mails_to_users';
    public $timestamps = false;
    protected $guarded = [];
}