<?php

namespace App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies;

use App\ORM\Asset;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\Contracts\RepresentsAsset;
use Illuminate\Support\Collection;

class AssetProxy extends SimpleProxy implements RepresentsAsset {

  protected $placeHolderColumns = ['id'];
  const BASECLASS = Asset::class;

  protected function setupNew() {
    $this->token = md5(uniqid(rand()));
  }

  static public function fetch(string $token): Collection {
    $assets = Asset::where(['token' => $token])->get();
    return $assets->map(function (Asset $asset) {
      return new static($asset);
    });
  }

  static public function fetchWithParentAndChildren(string $token): Collection {
    $pivotCollection = Asset::where(['token' => $token])->whereNull('venue_usage_token')->get();
    $pivot = $pivotCollection->first();
    if (is_null($pivot)) {
      return new Collection();
    }
    $parentCollection = Asset::where(['id' => $pivot->parent_id])->whereNull('venue_usage_token')->get();
    $children = Asset::where(['parent_id' => $pivot->id])->whereNull('venue_usage_token')->get();
    return $pivotCollection->concat($parentCollection)->concat($children)->map(function (Asset $asset) {
      return new static($asset);
    });
  }

  public function getId() {
    return $this->id;
  }

  public function getToken(): string {
    return $this->token;
  }

  public function getAssetTypeId(): int {
    return $this->asset_type_id;
  }

  public function isSpace(): bool {
    return $this->asset_type_id === Asset::ROOM;
  }

  public function isVenue(): bool {
    return $this->asset_type_id === Asset::VENUE;
  }

  public function isGroup(): bool {
    return $this->asset_type_id === Asset::COMPANY;
  }
}
