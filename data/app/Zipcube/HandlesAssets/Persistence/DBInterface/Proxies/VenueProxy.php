<?php

namespace App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies;

use App\ORM\Venue;
use App\ORM\Asset;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\Contracts\RepresentsAsset;
use Illuminate\Support\Collection;

class VenueProxy extends ComplexProxy implements RepresentsAsset {

  const BASECLASS = Venue::class;
  protected $placeHolderColumns = ['id', 'venue_id'];
  protected $overrideMap = [
    Asset::class => ['menus', 'token', 'id', 'parent_id', 'asset_type_id'],
    Venue::class => ['venue_id' => 'id']
  ];

  static public function fetchNullOrOne($token): ?VenueProxy {
    $assets = Asset::where('token', $token)->with(['venue'])->get();
    $venues = static::buildProxyCollection($assets);
    $count = $venues->count();
    if ($count > 1) {
      throw new \Exception('Multiple venues for token: ' . $token); // TODO error handling
    } else if ($count === 1) {
      return $venues->first();
    } else {
      return null;
    }
  }

  static public function fetchMany(Collection $tokens): Collection {
    $assets = Asset::whereIn('token', $tokens->all())->with(['venue'])->get();
    return static::buildProxyCollection($assets);
  }

  static public function fetchManyFromIds(Collection $ids): Collection {
    $assets = Asset::whereIn('id', $ids->all())->with(['venue'])->get();
    return static::buildProxyCollection($assets);
  }

  static public function fetchFromParentId(int $id): Collection {
    $assets = Asset::where('parent_id', $id)->with(['venue'])->get();
    return static::buildProxyCollection($assets);
  }

  static public function fetchFromId(int $id): Collection {
    $assets = Asset::where('id', $id)->with(['venue'])->get();
    return static::buildProxyCollection($assets);
  }

  static private function buildProxyCollection(Collection $assets): Collection {
    return $assets->map(function (Asset $asset) {
      $venue = $asset->venue;
      $asset->unsetRelation('venue');
      return new static($asset, $venue);
    });
  }

  public function save(): void {
    $asset = $this->retrieveModel(Asset::class);
    $this->saveModel($asset);
    $venue = $this->retrieveModel(Venue::class);
    $venue->asset_id = $asset->id;
    $this->saveModel($venue);
    $this->handleLegacyConnections($asset, $venue);
  }

  private function handleLegacyConnections(Asset $asset, Venue $venue): void {
    if (is_null($asset->reference_id) || is_null($asset->asset_type_id)) {
      $asset->reference_id = $venue->id;
      $asset->asset_type_id = Asset::VENUE;
      $asset->save();
    }
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
    return false;
  }

  public function isVenue(): bool {
    return true;
  }

  public function isGroup(): bool {
    return false;
  }
}
