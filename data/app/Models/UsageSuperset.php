<?php

namespace App\Models;

use App\LaravelExtensions\Model\LegacyModel;

class UsageSuperset extends LegacyModel
{
    public $timestamps = false;
    public $table = 'usage_supersets';

    public function usage_superset_language()
    {
        return $this->hasMany(UsageSupersetLanguage::class, 'usageSuperset_id', 'id');
    }
}