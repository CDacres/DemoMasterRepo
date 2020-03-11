<?php

namespace App\Models\Landing;

use App\LaravelExtensions\Model\LegacyModel;
use App\Events\LocationCreatingEvent;

use App\Transformers\LocationTransformer;

class Location extends LegacyModel
{
    static protected $defaultTransformer = LocationTransformer::class;
    static protected $defaultSerialisationLabel = 'locations';
    public $timestamps = false;
    public $table = 'locations';
    private $_radius = 6371; //radius of the earth in km
    private $_min_area = 1.96; //desired area (km^2) for geocoded search area

    const COUNTRY = 1;
    const CITY = 2;
    const DISTRICT = 3;
    const LANDMARK = 4;
    const AIRPORT = 5;
    const POSTCODE = 6;

    protected $fillable = [
        'parent_id',
        'url_desc',
        'search_url',
        'human_desc',
        'locationcategorie_id',
        'lat',
        'long',
        'country',
        'locality',
        'constituancy_unit',
        'location_type',
        'bounds_sw_lat',
        'bounds_sw_lon',
        'bounds_ne_lat',
        'bounds_ne_lon',
        'bounds_distance',
        'search_radius',
        'in_sitemap',
        'place_id',
        'requires_determiner'
    ];

    protected $dispatchesEvents = ['creating' => LocationCreatingEvent::class];

    public function room()
    {
        return $this->hasMany(LocationRoom::class);
    }

    public function landing_page()
    {
        return $this->hasMany(LandingPage::class);
    }

    public function parent_location()
    {
        return $this->belongsTo(Location::class, 'parent_id', 'id');
    }

    public function scopeFromId($query, $id)
    {
        return $query->where('id', $id);
    }

    public function scopeFromCountryCode($query, $country_code)
    {
        return $query->where('country', $country_code);
    }

    public function scopeIsCountry($query)
    {
        return $query->where('locationcategorie_id', Location::COUNTRY);
    }

    public function check_and_expand_bounds()
    {
        $area = $this->_check_area();
        if ($area < $this->_min_area)
        {
            $this->_expand_bounds(($this->_min_area / $area));
        }
    }

    private function _check_area()
    {
        $f1 = deg2rad($this->bounds_sw_lat);
        $f2 = deg2rad($this->bounds_ne_lat);
        $l1 = deg2rad($this->bounds_sw_lon);
        $l2 = deg2rad($this->bounds_ne_lon);

        $x = ($l2 - $l1) * cos(($f1 + $f2)/2);
        $y = $f2 - $f1;
        return (($x * $this->_radius) * ($y * $this->_radius));
    }

    private function _expand_bounds($area_multiplier)
    {
        $dlon = $this->bounds_ne_lon - $this->bounds_sw_lon;
        $dlat = $this->bounds_ne_lat - $this->bounds_sw_lat;
        $lon_centre = $this->bounds_sw_lon + ($dlon / 2);
        $lat_centre = $this->bounds_sw_lat + ($dlat / 2);
        $length_multiplier = sqrt($area_multiplier);
        $this->bounds_sw_lat = $lat_centre - ($dlat * ($length_multiplier / 2));
        $this->bounds_ne_lat = $lat_centre + ($dlat * ($length_multiplier / 2));
        $this->bounds_sw_lon = $lon_centre - ($dlon * ($length_multiplier / 2));
        $this->bounds_ne_lon = $lon_centre + ($dlon * ($length_multiplier / 2));
    }
}