<?php

namespace App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies;

use App\ORM\Asset;
use App\ORM\Room;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\Contracts\RepresentsAsset;
use Illuminate\Support\Collection;

class UsageProxy extends ComplexProxy implements RepresentsAsset {

  protected $placeHolderColumns = ['id'];
  const BASECLASS = Room::class;

  protected $overrideMap = [
    Asset::class => ['token', 'id', 'parent_id', 'asset_type_id', 'venue_usage_token'],
  ];

  protected function setupNew() {
    $this->token = md5(uniqid(rand()));
  }

  static public function fetchForVenuesUsages(Collection $parentIds): Collection {
    $assets = Asset::whereIn('parent_id', $parentIds->all())->with(['room'])->whereNotNull('venue_usage_token')->get();
    return static::assetsToProxies($assets);
  }

  static public function fetchForVenuesAll(Collection $parentIds): Collection {
    $assets = Asset::whereIn('parent_id', $parentIds->all())->with(['room'])->get();
    return static::assetsToProxies($assets);
  }

  static public function fetchNullOrOneForSpace($token): ?UsageProxy {
    $assets = Asset::where(['token' => $token])->with(['room'])->whereNull('venue_usage_token')->get();
    $spaces = static::assetsToProxies($assets);
    $count = $spaces->count();
    if ($count > 1) {
      throw new \Exception('Multiple spaces for token: ' . $token); // TODO error handling
    } else if ($count === 1) {
      return $spaces->first();
    } else {
      return null;
    }
  }

  static public function fetchMany(Collection $tokens): Collection {
    $assets = Asset::whereIn('token', $tokens->all())->with(['room'])->get();
    return static::assetsToProxies($assets);
  }

  static public function assetsToProxies(Collection $assets): Collection {
    return $assets->map(function (Asset $asset) {
      $room = $asset->room;
      $asset->unsetRelation('room');
      return new static($asset, $room);
    });
  }

  public function save(): void {
    $asset = $this->retrieveModel(Asset::class);
    $this->saveModel($asset);
    $room = $this->retrieveModel(Room::class);
    $room->asset_id = $asset->id;
    $this->saveModel($room);
    $this->handleLegacyConnections($asset, $room);
  }

  private function handleLegacyConnections(Asset $asset, Room $room): void {
    if (is_null($asset->reference_id) || is_null($asset->asset_type_id)) {
      $asset->reference_id = $room->id;
      $asset->asset_type_id = Asset::ROOM;
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
    return true;
  }

  public function isVenue(): bool {
    return false;
  }

  public function isGroup(): bool {
    return false;
  }
}
