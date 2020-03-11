<?php

namespace App\Zipcube\HandlesAssets\Persistence\MDT\Transformers;

use App\Types\ProductCategory;
use App\Types\Usage;
use App\Maps\VerticalMap;

use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\UsageProxy;

class UsageMDTT extends BaseMDTT {

  public function toUsageProxy(Usage $usage): array {
    $data = [
      'usage_id' => (new VerticalMap())->legacyUsageIdFromCategory($usage->getCategory()),
      'primary_vertical_id' => (new VerticalMap())->idFromCategory($usage->getCategory()),
      'office_type_id' => (new VerticalMap())->officeTypeFromCategory($usage->getCategory()),
      'flexible_percent' => 15,
      'flexible_enabled' => 1,
      'price_control_percent' => null
    ];
    if ($this->categoryDemandsPriceControl($usage->getCategory())) {
      $data['price_control_percent'] = 12;
    }
    return $data;
  }

  public function toVenueUsageProxy(Usage $usage): array {
    return [
      'title' => $usage->getName(),
      'desc' => $usage->getDescription(),
    ];
  }

  private function categoryDemandsPriceControl(int $cat) {
    return $cat === ProductCategory::MEETING;
  }

  public function fromVenueUsageProxy(UsageProxy $proxy): Usage {
    return (new Usage())->setName($proxy->title)
      ->setDescription($proxy->desc);
  }

}
