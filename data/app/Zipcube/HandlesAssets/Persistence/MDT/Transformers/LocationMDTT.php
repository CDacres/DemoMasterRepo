<?php

namespace App\Zipcube\HandlesAssets\Persistence\MDT\Transformers;

use App\Types\Address;
use App\Types\LatLng;
use App\Types\Location;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\VenueProxy;

class LocationMDTT extends BaseMDTT {

  public function toVenueProxy(Location $location): array {
    $retArr = [
      'transport' => null,
      'city' => null,
      'country' => null,
      'country_code' => null,
      'county' => null,
      'address_extras' => null,
      'address' => null,
      'post_code' => null,
      'road' => null,
      'street_number' => null,
      'town' => null,
      'lat' => null,
      'long' => null,
      'autocomplete' => null,
    ];
    if (!is_null($location)) {
      $retArr['transport'] = $this->string($location->getSpecialInstructions());
      $address = $location->getAddress();
      if (!is_null($address)) {
        $retArr['city'] = $this->string($address->getCity());
        $retArr['country'] = $this->string($address->getCountry());
        $retArr['country_code'] = $this->string($address->getCountryCode());
        $retArr['county'] = $this->string($address->getCounty());
        $retArr['address_extras'] = $this->string($address->getExtra());
        $retArr['address'] = $this->string($address->getFormattedAddress());
        $retArr['post_code'] = $this->string($address->getPostcode());
        $retArr['road'] = $this->string($address->getStreet());
        $retArr['street_number'] = $this->string($address->getStreetNumber());
        $retArr['town'] = $this->string($address->getTown());
        $retArr['autocomplete'] = $this->string($address->getAutocomplete());
      }
      $coords = $location->getCoords();
      if (!is_null($coords)) {
        $retArr['lat'] = $this->float($coords->getLat());
        $retArr['long'] = $this->float($coords->getLng());
      }
      // TODO urgent implement nearby places
    }
    return $retArr;
  }

  public function fromVenueProxy(VenueProxy $proxy): Location {
    $location = new Location();
    $location->setSpecialInstructions($proxy->transport);
    $address = new Address();
    $address->setCity($proxy->city);
    $address->setCountry($proxy->country);
    $address->setCountryCode($proxy->country_code);
    $address->setCounty($proxy->county);
    $address->setExtra($proxy->address_extras);
    $address->setFormattedAddress($proxy->address);
    $address->setPostcode($proxy->post_code);
    $address->setStreet($proxy->road);
    $address->setStreetNumber($proxy->street_number);
    $address->setTown($proxy->town);
    $address->setAutocomplete($proxy->autocomplete);
    $location->setAddress($address);
    $coords = new LatLng();
    $coords->setLat($proxy->lat);
    $coords->setLng($proxy->long);
    $location->setCoords($coords);
    return $location;
  }
}
