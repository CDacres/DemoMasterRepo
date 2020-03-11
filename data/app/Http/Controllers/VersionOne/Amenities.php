<?php

namespace App\Http\Controllers\VersionOne;
use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\Cache;
use App\Models\Amenity;
use App\Scopes\EnabledScope;

use DateInterval;

class Amenities extends Controller
{
    protected $defaultClass = Amenity::class;

    public function get_all_filters()
    {
        $seesDisabled = $this->authority()->can('see_disabled', Amenity::class);
        $cacheKey = 'amenities_' . ($seesDisabled ? 'inc_disabled' : 'exc_disabled') . '_' . $this->locale();
        $amenity_collection = Cache::tags(['amenities'])->remember($cacheKey, DateInterval::createFromDateString('1 day'), function() use ($seesDisabled) {
            $query = Amenity::where('filterable', true);
            if ($seesDisabled)
            {
                $query->withoutGlobalScope(EnabledScope::class);
            }
            return $query->get();
        });
        return $this->serialisedJsonResponse($amenity_collection);
    }
}