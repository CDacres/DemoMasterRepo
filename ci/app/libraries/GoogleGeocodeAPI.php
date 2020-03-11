<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class GoogleGeocodeAPI
{
    protected $_api_key = '';

    public function __construct()
    {
        $this->_api_key = "AIzaSyALXMs8-iGTe7vIV5ItmF9YrhoJrttFiJg";
    }

    public function address_geocode($address, $country = null)
    {
        // move key to config
        $search = urlencode($address);
        $countryOption = "";
        if ($country != null)
        {
            $countryOption = "&region=" . $country;
        }
        $geocode_url = "https://maps.googleapis.com/maps/api/geocode/json?address=" . $search . $countryOption . "&key=" . $this->_api_key;

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $geocode_url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

        return json_decode(curl_exec($ch), true);
    }

    public function latlng_geocode($lat, $lng)
    {
        // move key to config
        $url_lat = urlencode($lat);
        $url_lng = urlencode($lng);
        $geocode_url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" . $url_lat . "," . $url_lng . "&key=" . $this->_api_key;

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $geocode_url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

        return json_decode(curl_exec($ch), true);
    }
}
