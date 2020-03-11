<?php

namespace App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\ImageProxy;

use App\ORM\Image;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\ImageProxy\Jobs\ImageUploadJob;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\ImageProxy\Helpers\ImageFileHelper;

class ImageUploadProxy extends BaseProxy {

  protected function save(): void {
    $model = $this->retrieveModel(Image::class);
    $file = $model->file;
    unset($model->file);
    (new ImageFileHelper())->hold($this->token, $this->size, $file);
    dispatch(new ImageUploadJob($this));
  }

  public function deferredSave(): void {
    $model = $this->retrieveModel(Image::class);
    $size = $model->size;
    unset($model->size);
    Image::updateOrCreate(['token' => $this->token], $model->getDirty());
    $this->size = $size;
    $this->applyWithMutex(function (Image $mutex) { $this->gotMutex($mutex); }, function () { $this->missedMutex(); });
  }

  public function missedMutex() {
    dispatch(new ImageUploadJob($this))->delay(10);
  }

  public function gotMutex(Image $mutex) {
    $helper = new ImageFileHelper();
    $file = $helper->unHold($this->token, $this->size);
    $helper->put($this->token, $this->size, $file, $mutex->asset_id);
  }
}
