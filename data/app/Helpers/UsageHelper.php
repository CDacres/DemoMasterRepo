<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Cache;

use App\Models\Usage;

class UsageHelper
{
    public function get_usage_alias($usage_id, $lang_code)
    {
        $cache_tag = 'usage_' . $usage_id . '_' . $lang_code;
        if (Cache::tags(['usage'])->has($cache_tag))
        {
            return Cache::tags(['usage'])->get($cache_tag);
        }
        else
        {
            $usage_superset_alias = Usage::find($usage_id)->usage_superset_usage->first()->usage_superset->usage_superset_language->where('lang_code', $lang_code)->first()->alias;
            Cache::tags(['usage'])->forever($cache_tag, $usage_superset_alias);
            return $usage_superset_alias;
        }
    }
}