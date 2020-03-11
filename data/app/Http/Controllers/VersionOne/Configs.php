<?php

namespace App\Http\Controllers\VersionOne;
use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\Cache;
use App\Models\Configuration;

use DateInterval;

class Configs extends Controller
{
    public function get_all_configs()
    {
        return Cache::tags(['configs'])->remember('configs', DateInterval::createFromDateString('1 day'), function() {
            return Configuration::get();
        });
    }
}