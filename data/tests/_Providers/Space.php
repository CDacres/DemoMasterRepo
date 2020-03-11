<?php

namespace Tests\_Providers;

class Space
{
  private $spaceJson = '{"input":{"asset":{"id":{"value":"ab12cde3456fgh7ij890kl1m23456789"},"name":"Test Space","description":"This is test data.","currency":"GBP","usages":[{"products":[{"id":{"value":"randomString"},"name":"Test Product","description":"Basic Desc","includes":[{"description":"Bobbins","orderIndex":1}],"unitPrice":{"currency":"GBP","value":13},"unit":"SPAN"}],"category":"MEETING","context":{"configurations":[{"kind":"SEATED","maxPax":100}]}}],"area":{"value":52.5,"unit":"M2"},"spaceDetails":{"styles":["QUIRKY","AFFORDABLE"]}}}}';

  private $listingsV1SpaceJson = '{"input":{"asset":{"id":{"value":"ab12cde3456fgh7ij890kl1m23456789"},"name":"Test Space","description":"This is test data.","currency":"GBP","usages":[{"products":[{"id":{"value":"randomString"},"name":"Test Product","description":"Basic Desc","includes":[{"description":"Bobbins","orderIndex":1}],"unitPrice":{"currency":"GBP","value":13},"unit":"SPAN"}],"category":"MEETING","context":{"configurations":[{"kind":"SEATED","maxPax":100}]}}],"area":{"value":52.5,"unit":"M2"}},"details":{"styles":["QUIRKY","AFFORDABLE"]}}}';

  public function listingsV1SpaceAsArray() {
    return json_decode($this->listingsV1SpaceJson, true);
  }

  public function getRawSpaceJson() {
    return $this->spaceJson;
  }

  public function getRawListingsV1SpaceJson() {
    return $this->listingsV1SpaceJson;
  }

  public function spaceAsArray() {
    return json_decode($this->spaceJson, true)['input']['asset'];
  }
}
