<?php

namespace Tests\_Providers;

class Venue
{
  private $venueJson = '{"input":{"asset":{"id":{"value":"495df9d128b1bd454bebb00d623ce699"},"name":"Lemon","location":{"address":{"formattedAddress":"125, Bob, London","streetNumber":"125","street":"Some Road","countryCode":"UK"},"coords":{"lat":126,"lng":125}},"description":"Carl","currency":"USD","usages":[{"products":[{"id":{"value":"randomString"},"description":"Basic Desc","includes":[{"description":"Bobbins","orderIndex":1}],"unitPrice":{"currency":"USD","value":13},"unit":"SPAN","context":{"schedule":{"days":[{"day":"MONDAY","spans":[{"start":600,"end":720}]}]}}}],"category":"PARTY"}],"context":{"website":"jam.com","menus":[{"description":"yum","groups":[{"description":"starter","orderIndex":1,"items":[{"description":"cabbage","priceOptions":[{"description":"BOGOL","kind":"STD","price":{"currency":"EUR","value":12.34}}]}]}]}],"schedule":{"days":[{"day":"MONDAY","spans":[{"start":720,"end":1440}]},{"day":"TUESDAY","spans":[{"start":720,"end":1440}]},{"day":"WEDNESDAY","spans":[{"start":720,"end":1440}]},{"day":"THURSDAY","spans":[{"start":720,"end":1220}]}]}},"venueDetails":{"venueTypeId":{"value":"1"}}}}}';

  private $listingsV1VenueJson = '{"input":{"asset":{"id":{"value":"495df9d128b1bd454bebb00d623ce699"},"name":"Lemon","location":{"address":{"formattedAddress":"125, Bob, London","streetNumber":"125","street":"Some Road","countryCode":"UK"},"coords":{"lat":126,"lng":125}},"description":"Carl","currency":"USD","usages":[{"products":[{"id":{"value":"randomString"},"description":"Basic Desc","includes":[{"description":"Bobbins","orderIndex":1}],"unitPrice":{"currency":"USD","value":13},"unit":"SPAN","context":{"schedule":{"days":[{"day":"MONDAY","spans":[{"start":600,"end":720}]}]}}}],"category":"PARTY"}],"context":{"website":"jam.com","menus":[{"description":"yum","groups":[{"description":"starter","orderIndex":1,"items":[{"description":"cabbage","priceOptions":[{"description":"BOGOL","kind":"STD","price":{"currency":"EUR","value":12.34}}]}]}]}],"schedule":{"days":[{"day":"MONDAY","spans":[{"start":720,"end":1440}]},{"day":"TUESDAY","spans":[{"start":720,"end":1440}]},{"day":"WEDNESDAY","spans":[{"start":720,"end":1440}]},{"day":"THURSDAY","spans":[{"start":720,"end":1220}]}]}}},"details":{"venueTypeId":{"value":"1"}}}}';
  /**
   * Convert args from GQL to Relevant suite of Types
   *
   * @return void
   */

  public function listingsV1VenueAsArray() {
    return json_decode($this->listingsV1VenueJson, true);
  }

  public function getRawVenueJson() {
    return $this->venueJson;
  }

  public function getRawListingsV1VenueJson() {
    return $this->listingsV1VenueJson;
  }

  public function venueAsArray() {
    return json_decode($this->venueJson, true)['input']['asset'];
  }
}
