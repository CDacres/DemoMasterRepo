<?php

namespace App\Zipcube\HandlesAssets\Persistence\MDT;

use App\Types\Asset;
use App\Types\Id;
use App\Zipcube\HandlesAssets\Persistence\MD\ListingMD as MD;
use App\Zipcube\HandlesAssets\Persistence\MDT\Transformers\AssetMDTT;

class GroupMDT {

  public function mutate(MD $directory, Asset $target): void {
    $group = $directory->upsert(MD::GROUP, ['token' => $target->getId()->getValue()], (new AssetMDTT())->toGroupProxy($target));
    $directory->updateMany(MD::VENUE, ['parent_id' => $group->id], ['company_id' => $group->company_id]);
  }

  public function build(MD $directory, Id $id): Asset {
    $proxy = $directory->use(MD::GROUP, ['token' => $id->getValue()]);
    $asset = (new AssetMDTT())->fromGroupProxy($proxy);
    return $asset;
  }
}
