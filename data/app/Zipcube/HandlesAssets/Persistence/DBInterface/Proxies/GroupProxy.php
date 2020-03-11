<?php

namespace App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies;

use App\ORM\Company;
use App\ORM\Asset;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\Contracts\RepresentsAsset;
use Illuminate\Support\Collection;

class GroupProxy extends ComplexProxy implements RepresentsAsset {

  const BASECLASS = Company::class;
  protected $placeHolderColumns = ['id'];
  protected $overrideMap = [
    Asset::class => ['token', 'id', 'asset_type_id'],
    Company::class => ['company_id' => 'id'],
  ];

  static public function fetch($token): Collection {
    $assets = Asset::where('token', $token)->with(['company'])->get();
    return static::buildProxyCollection($assets);
  }

  static public function fetchByAssetIds(Collection $assetIds): Collection {
    $assets = Asset::whereIn('id', $assetIds->all())->with(['company'])->get();
    return static::buildProxyCollection($assets);
  }

  static private function buildProxyCollection(Collection $assets): Collection {
    return $assets->map(function (Asset $asset) {
      $company = $asset->company;
      $asset->unsetRelation('company');
      return new static($asset, $company);
    });
  }

  public function insert(): void {
    $asset = $this->retrieveModel(Asset::class);
    $this->saveModel($asset);
    $company = $this->retrieveModel(Company::class);
    $company->asset_id = $asset->id;
    $this->saveModel($company);
    $this->handleLegacyConnections($asset, $company);
  }

  private function handleLegacyConnections(Asset $asset, Company $venue): void {
    if (is_null($asset->reference_id) || is_null($asset->asset_type_id)) {
      $asset->reference_id = $venue->id;
      $asset->asset_type_id = Asset::COMPANY;
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
    return false;
  }

  public function isGroup(): bool {
    return true;
  }
}
