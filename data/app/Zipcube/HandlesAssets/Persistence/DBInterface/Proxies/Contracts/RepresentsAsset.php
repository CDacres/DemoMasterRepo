<?php

namespace App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\Contracts;

interface RepresentsAsset {
  public function getId();
  public function getToken(): string;
  public function getAssetTypeId(): int;
  public function isSpace(): bool;
  public function isVenue(): bool;
  public function isGroup(): bool;
}
