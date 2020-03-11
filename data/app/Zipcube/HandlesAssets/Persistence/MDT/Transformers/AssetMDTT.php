<?php

namespace App\Zipcube\HandlesAssets\Persistence\MDT\Transformers;

use App\Maps\AreaUnitMap;
use App\Maps\CurrencyMap;
use App\Types\Area;
use App\Types\Asset;

use App\Types\SpaceDetails;
use App\Types\VenueDetails;
use App\Types\GroupDetails;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\UsageProxy;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\VenueProxy;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\GroupProxy;

class AssetMDTT extends BaseMDTT {

  public function toSpaceRoom(Asset $asset): array {
    $spaceArray =  [
      'title' => $this->string($asset->getName()),
      'desc' => $this->string($asset->getDescription())
    ];
    if (!is_null($asset->getArea())) {
      $spaceArray['office_size'] = $this->float($asset->getArea()->getValue());
      $spaceArray['office_size_unit'] = (new AreaUnitMap())->valueFromType($asset->getArea()->getUnit());
    }
    return $spaceArray;
  }

  public function toVenueProxy(Asset $asset): array {
    return [
      'name' => $this->string($asset->getName()),
      'description' => $this->string($asset->getDescription()),
      'currency' => (new CurrencyMap())->ucFromEnum($asset->getCurrency()),
      'venue_type_id' => $this->int($asset->getVenueDetails()->getVenueTypeId()->getValue()) // TODO update with IntId
    ];
  }

  public function toGroupProxy(Asset $asset): array {
    return [
      'name' => $this->string($asset->getName()),
    ];
  }

  public function fromVenueProxy(VenueProxy $proxy): Asset {
    $details = (new VenueDetails())
      ->setVenueTypeId($this->buildNewId($proxy->venue_type_id));
    return $this->buildNewAsset($proxy->token)
      ->setName($proxy->name)
      ->setDescription($proxy->description)
      ->setCurrency((new CurrencyMap())->enumFromUc($proxy->currency))
      ->setVenueDetails($details);
  }

  public function fromRoomUsageProxy(UsageProxy $proxy): Asset {
    $details = (new SpaceDetails());
    return $this->buildNewAsset($proxy->token)
      ->setSpaceDetails($details)
      ->setName($proxy->title)
      ->setDescription($proxy->desc)
      ->setArea(new Area([
        'value' => $proxy->office_size ?: 0,
        'unit' => (new AreaUnitMap())->typeFromValue($proxy->office_size_unit)
      ]));
  }

  public function fromGroupProxy(GroupProxy $proxy): Asset {
    $details = (new GroupDetails());
    return $this->buildNewAsset($proxy->token)
      ->setName($proxy->name)
      ->setDescription($proxy->description)
      ->setGroupDetails($details);
  }

  protected function buildNewAsset(string $token): Asset {
    $asset = new Asset();
    return $asset->setId($this->buildNewId($token));
  }

}
