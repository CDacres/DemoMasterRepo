<?php

namespace App\Zipcube\HandlesAssets\Persistence\MDT\Transformers;

use App\Maps\ConfigurationMap;
use App\Types\AssetConfiguration;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\Generics\ConfigProxy;

class ConfigMDTT extends BaseMDTT {

  public function toEloquent(AssetConfiguration $config): array {
    return [
      'max_capacity' => $this->int($config->getMaxPax()),
    ];
  }

  public function fromEloquent(ConfigProxy $proxy): AssetConfiguration {
    $config = new AssetConfiguration();
    return $config->setKind((new ConfigurationMap())->typeFromId($proxy->configuration_id))
      ->setMaxPax($proxy->max_capacity);
  }
}
