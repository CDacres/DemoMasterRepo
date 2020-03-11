<?php

namespace App\Http\Controllers\VersionOne;
use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\Cache;
use App\Models\Attribute;

use DateInterval;

class Atts extends Controller
{
    public function get_all_atts()
    {
        return Cache::tags(['atts'])->remember('atts', DateInterval::createFromDateString('1 day'), function() {
            return Attribute::get();
        });
    }
}