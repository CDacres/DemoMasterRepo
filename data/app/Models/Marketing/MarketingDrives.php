<?php

namespace App\Models\Marketing;
use App\LaravelExtensions\Model\MyModel;
use App\Models\Marketing\MarketingMailViews;

class MarketingDrives extends MyModel
{
    protected $table = 'marketing_drives';
    public $timestamps = false;
    protected $guarded = [];

    public function views()
    {
        return $this->hasMany(MarketingMailViews::class, 'marketing_drive_id', 'id');
    }
}