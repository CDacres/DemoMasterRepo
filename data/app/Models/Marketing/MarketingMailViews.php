<?php

namespace App\Models\Marketing;
use App\LaravelExtensions\Model\MyModel;
use App\Models\Marketing\MarketingMailViewEvents;

class MarketingMailViews extends MyModel
{
    protected $table = 'marketing_mail_views';
    public $timestamps = false;
    protected $guarded = [];

    public function events()
    {
        return $this->hasMany(MarketingMailViewEvents::class, 'mail_view_id', 'id');
    }
}