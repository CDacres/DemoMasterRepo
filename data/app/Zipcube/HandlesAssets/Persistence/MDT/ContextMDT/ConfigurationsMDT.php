<?php

namespace App\Zipcube\HandlesAssets\Persistence\MDT\ContextMDT;

use App\Maps\ConfigurationMap;
use App\Types\AssetConfiguration;
use App\Types\ProductContext;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\Contracts\RepresentsAsset;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\Generics\ConfigProxy;
use App\Zipcube\HandlesAssets\Persistence\MDT\Transformers\ConfigMDTT;
use App\Zipcube\HandlesAssets\Persistence\MD\ListingMD as MD;

class ConfigurationsMDT {

  public function build(MD $directory, RepresentsAsset $proxy): array {
    return $directory->useCollection(MD::CONFIG, [
      'asset_id' => $proxy->getId(),
      'enabled' => 1
    ])->map(function (ConfigProxy $confPro) {
      return (new ConfigMDTT())->fromEloquent($confPro);
    })->values()->all();
  }

  public function mutate(MD $directory, RepresentsAsset $proxy, ProductContext $context): void {
    $configurations = $context->getConfigurations();
    if ($configurations->count() > 0) {
      collect($configurations)->each(function (AssetConfiguration $config) use($proxy, $directory) {
        $directory->upsert(MD::CONFIG, [
          'asset_id' => $proxy->getId(),
          'configuration_id' => (new ConfigurationMap())->idFromType($config->getKind())
        ], (new ConfigMDTT())->toEloquent($config));
      });
    }
  }

  public function impose(ProductContext $original, ProductContext $parent): array {
    return collect($original->getConfigurations())->all();
  }
}
