<?php

namespace App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\ImageProxy;

use App\ORM\Image;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\ImageProxy\Jobs\ImageMoveJob;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\ImageProxy\Helpers\ImageFileHelper;
use Illuminate\Support\Collection;

class ImageEdgeProxy extends BaseProxy {

  protected function save(): void {
    dispatch(new ImageMoveJob($this));
  }

  public function delete(): void {
    $model = $this->retrieveModel(Image::class);
    $model->enabled = 0;
    $model->save();
  }

  static public function fetch(Collection $assetIds): Collection {
    return Image::where('enabled', 1)->whereIn('asset_id', $assetIds)->get()
      ->map(function (Image $model) {
      return new static($model);
    });
  }

  static public function fetchByAssetIdsAndTokens(Collection $assetIds, Collection $tokens): Collection {
    return Image::where('enabled', 1)->where(function ($query) use ($assetIds, $tokens) {
      $query->whereIn('token', $tokens)
        ->orWhereIn('asset_id', $assetIds);
    })->get()->map(function (Image $image) {
      return new static($image);
    });
  }

  public function deferredSave(): void {
    $model = $this->retrieveModel(Image::class);
    $original = Image::where(['token' => $this->token])->get()->first();
    Image::updateOrCreate(['token' => $this->token], $model->getDirty());
    $this->applyWithMutex(function (Image $mutex) use ($original) { $this->gotMutex($mutex, $original); }, function () { $this->missedMutex(); });
  }

  public function missedMutex() {
    dispatch(new ImageMoveJob($this))->delay(10);
  }

  public function gotMutex(Image $mutex, ?Image $original) {
    $oldAssetId = is_null($original) ? 0 : (int)$original->asset_id;
    $newAssetId = (int)$mutex->asset_id;
    (new ImageFileHelper())->move($this->token, $oldAssetId, $newAssetId);
  }

}
