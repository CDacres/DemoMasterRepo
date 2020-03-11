<?php

namespace App\Models\Marketing;
use App\LaravelExtensions\Model\MyModel;

class MarketingMailViewEvents extends MyModel
{
    protected $table = 'marketing_mail_view_events';
    public $timestamps = false;
    protected $guarded = [];
}