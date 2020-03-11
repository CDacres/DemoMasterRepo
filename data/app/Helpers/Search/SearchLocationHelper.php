<?php

namespace App\Helpers\Search;

use App\Models\Landing\Location;

use App\Helpers\GeocodeHelper;
use App\Helpers\UrlHelper;

class SearchLocationHelper
{
    private $_request;
    private $_location;
    public $name;
    public $long;
    public $lat;
    public $ne_long;
    public $ne_lat;
    public $sw_long;
    public $sw_lat;
    public $currency_symbol_left;
    private $_geocode_response = null;
    private $_geocode_attempted = false;
    private $_expand_bounds = true;
    private $_default_currency = '&pound;';

    public function __construct($request, $expand_bounds = true)
    {
        $this->_request = $request;
        $this->_expand_bounds = $expand_bounds;
        $this->_generate_location_object();
        $this->_generate_bounds();
        $this->_set_currency_from_location();
        $this->name = $this->_location->human_desc;
    }

    public function has_usable_bounds()
    {
        return !is_null($this->sw_long)
        && !is_null($this->sw_lat)
        && !is_null($this->ne_long)
        && !is_null($this->ne_lat);
    }

    public function has_usable_centre()
    {
        return !is_null($this->long)
        && !is_null($this->lat);
    }

    private function _generate_bounds()
    {
        $this->_set_bounds_from_request();
        if (!$this->has_usable_bounds())
        {
            $this->_set_bounds_from_location();
        }
    }

    private function _set_bounds_from_request()
    {
        $this->sw_long = $this->_sanitise_long_lat($this->_request->query('sw_lon'), true);
        $this->sw_lat = $this->_sanitise_long_lat($this->_request->query('sw_lat'), false);
        $this->ne_long = $this->_sanitise_long_lat($this->_request->query('ne_lon'), true);
        $this->ne_lat = $this->_sanitise_long_lat($this->_request->query('ne_lat'), false);
        $this->_centre_from_bounds();
    }

    private function _set_bounds_from_location()
    {
        $this->sw_long = $this->_sanitise_long_lat($this->_location->bounds_sw_lon, true);
        $this->sw_lat = $this->_sanitise_long_lat($this->_location->bounds_sw_lat, false);
        $this->ne_long = $this->_sanitise_long_lat($this->_location->bounds_ne_lon, true);
        $this->ne_lat = $this->_sanitise_long_lat($this->_location->bounds_ne_lat, false);
        $this->_centre_from_location();
    }

    private function _centre_from_location()
    {
        $this->_set_centre($this->_location->lat, $this->_location->long);
    }

    private function _centre_from_bounds()
    {
        $this->_set_centre((($this->sw_lat + $this->ne_lat) / 2), (($this->sw_long + $this->ne_long) / 2));
    }

    private function _set_centre($lat, $long)
    {
        $this->long = $this->_sanitise_long_lat($long, true);
        $this->lat = $this->_sanitise_long_lat($lat, false);
    }

    private function _sanitise_long_lat($bound, $lon_not_lat)
    {
        return (($this->_long_lat_is_sane($bound, $lon_not_lat))?$bound:null);
    }

    private function _long_lat_is_sane($bound, $lon_not_lat)
    {
        if (is_null($bound) || !is_numeric($bound))
        {
            return false;
        }
        if ($lon_not_lat)
        {
            return (-180 < $bound && $bound < 180);
        }
        else
        {
            return (-90 < $bound && $bound < 90);
        }
    }

    private function _location_from_slug($slug)
    {
        return Location::where('search_url', $slug)->first();
    }

    private function _default_location_slug()
    {
        return "London--UK";
    }

//    TODO: use _location_from_place_id when needed
//    private function _location_from_place_id($placeid)
//    {
//        return Location::where('place_id', $placeid)->first();
//    }

    private function _generate_location_object()
    {
        $location_slug = $this->_request->query('location');
        $location = (($location_slug)?$this->_location_from_slug($location_slug):null);
//        $location_place = $this->_request->query('place_id');
//        $location = (($location_place)?$this->_location_from_place_id($location_place):null);
        $location = (($location)?$location:$this->_location_from_request());
        $this->_location = (($location)?$location:$this->_location_from_slug($this->_default_location_slug()));
    }

    private function _location_from_request()
    {
        $this->_get_geocode_response();
        return $this->_get_location_from_geocode();
    }

    private function _get_location_from_geocode()
    {
        $location = null;
        if ($this->_geocode_success())
        {
            $location = new Location();
            $location->lat = $this->_geocode_response['geometry']['location']['lat'];
            $location->long = $this->_geocode_response['geometry']['location']['lng'];
            $location->bounds_ne_lon = $this->_geocode_response['geometry']['viewport']['northeast']['lng'];
            $location->bounds_ne_lat = $this->_geocode_response['geometry']['viewport']['northeast']['lat'];
            $location->bounds_sw_lon = $this->_geocode_response['geometry']['viewport']['southwest']['lng'];
            $location->bounds_sw_lat = $this->_geocode_response['geometry']['viewport']['southwest']['lat'];
            $location->human_desc = $this->_geocode_response['formatted_address'];
            $location->country = $this->_get_country_code_from_geocode();
            if ($this->_expand_bounds)
            {
                $location->check_and_expand_bounds();
            }
        }
        return $location;
    }

    private function _get_country_code_from_geocode()
    {
        $country_code = null;
        if (isset($this->_geocode_response['address_components']))
        {
            foreach ($this->_geocode_response['address_components'] as $address_component)
            {
                if (in_array('country', $address_component['types']))
                {
                    $country_code = $address_component['short_name'];
                }
            }
        }
        return $country_code;
    }

    private function _set_currency_from_location()
    {
        $currency = null;
        if ($this->_location->country !== null)
        {
            $currency = \App\Models\Currency::getCurrencyByCountryCode($this->_location->country);
        }
        $this->currency_symbol_left = ((is_null($currency))?$this->_default_currency:$currency->symbol_left);
    }

    private function _get_geocode_response($force = false)
    {
        $this->_get_geocode_response_from_location_slug($force);
        if (is_null($this->_geocode_response))
        {
            $this->_get_geocode_response_from_latlong(true);
        }
    }

    private function _get_geocode_response_from_location_slug($force)
    {
        if ((!$this->_geocode_attempted || $force) && !is_null($this->_request->query('location')))
        {
            $this->_geocode_attempted = true;
            $coder = new GeocodeHelper();
            $url_helper = new UrlHelper();
            $response = $coder->address_geocode($url_helper->search_url_decode($this->_request->query('location')));
            $chosen_example = $this->_get_first_useful_geocode_response($response);
            $this->_geocode_response = $chosen_example;
        }
    }

    private function _get_geocode_response_from_latlong($force)
    {
        if ((!$this->_geocode_attempted || $force) && $this->_set_up_for_latlong_geocoding())
        {
            $this->_geocode_attempted = true;
            $coder = new GeocodeHelper();
            $response = $coder->latlng_geocode($this->lat, $this->long);
            $chosen_example = $this->_get_first_useful_geocode_response($response);
            $this->_geocode_response = $chosen_example;
        }
    }

    private function _set_up_for_latlong_geocoding()
    {
        $this->_set_centre($this->_request->query('lat'), $this->_request->query('lon'));
        if (!$this->has_usable_centre())
        {
            $this->_set_bounds_from_request();
            if (!$this->has_usable_centre())
            {
                return false;
            }
        }
        return true;
    }

    private function _get_first_useful_geocode_response($response)
    {
        $collection = collect($response['results']);
        return $collection->first(function ($item)
        {
            return isset($item['geometry'])
            && isset($item['geometry']['location'])
            && isset($item['geometry']['viewport']);
        });
    }

    private function _geocode_success()
    {
        return !is_null($this->_geocode_response);
    }

    public function get_geocode_data()
    {
        $this->_get_geocode_response();
        if ($this->_geocode_success())
        {
            return $this->_parse_geocode_to_array();
        }
        else
        {
            return ['geocoded' => 0];
        }
    }

    private function _parse_geocode_to_array()
    {
        $fields = [
            'locality', 'country', 'street_number', 'route', 'postal_town', 'administrative_area_level_1', 'administrative_area_level_2', 'administrative_area_level_3',
            'administrative_area_level_4', 'administrative_area_level_5', 'neighborhood', 'premise', 'subpremise', 'airport', 'point_of_interest', 'bus_station',
            'train_station', 'transit_station', 'postal_code', 'sublocality', 'sublocality_level_1', 'sublocality_level_2', 'sublocality_level_3', 'sublocality_level_4', 'sublocality_level_5', 'political'
        ];
        $data = ['geocoded' => 1];
        $location = $this->_geocode_response;
        if (isset($location['address_components']))
        {
            foreach ($location['address_components'] as $address_component)
            {
                $types = $address_component['types'];
                foreach ($fields as $field)
                {
                    if (in_array($field, $types))
                    {
                        $data[$field] = $address_component['long_name'];
                    }
                }
            }
        }
        return $data;
    }
}
