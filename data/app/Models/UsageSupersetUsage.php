<?php

namespace App\Models;

use App\LaravelExtensions\Model\LegacyModel;

class UsageSupersetUsage extends LegacyModel
{
    public $timestamps = false;
    public $table = 'usage_superset_usage';

    public function usage_superset()
    {
        return $this->belongsTo(UsageSuperset::class, 'usageSuperset_id', 'id')->where('hidden', 0);
    }
}