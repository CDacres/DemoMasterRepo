<?php

namespace App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\ImageProxy\Helpers;

use Illuminate\Support\Facades\App;
use App\Types\ImageSize;
use App\Maps\ImageSizeMap;

class ImageFileHelper {
  private $sizes = [
    ImageSize::SMALL,
    ImageSize::MEDIUM,
    ImageSize::LARGE,
    ImageSize::HUGE,
    ImageSize::BANNER,
  ];

  public $fileManager;
  public $deepStorageImagesFolder = 'asset_images';

  public function put(string $token, string $size, $file, $assetId) {
    if ((int)$size === ImageSize::RAW) {
      $path = $this->getDeepStoragePath($token, $assetId);
      $connection = $this->getDeepStorageConnection();
    } else {
      $path = $this->generateThumbPath($token, $size, $assetId);
      $connection = $this->getImageConnection();
    }
    $this->fileManager($connection)->put($path, $file);
    $this->fileManager->disconnect($connection);
  }

  public function move(string $token, int $oldAssetId, int $newAssetId) {
    if ($oldAssetId !== $newAssetId) {
      $this->moveOriginal($token, $oldAssetId, $newAssetId);
      $this->moveThumbs($token, $oldAssetId, $newAssetId);
    }
  }

  public function hold(string $token, int $size, $file): void {
    $fileWrapper = [];
    $fileWrapper['data'] = $file;
    $serialisedWrapper = serialize($fileWrapper);
    $key = $this->generateHoldName($token, $size);
    $this->fileManager($this->getHoldingConnection())->put($key, $serialisedWrapper);
  }

  public function unHold(string $token, int $size) {
    $key = $this->generateHoldName($token, $size);
    $serialisedWrapper = $this->fileManager($this->getHoldingConnection())->get($key)->read();
    $fileWrapper = unserialize($serialisedWrapper);
    return $fileWrapper['data'];
  }

  private function generateHoldName(string $token, int $size): string {
    return $token . (string)$size;
  }

  private function fileManager($connection = null) {
    if (is_null($this->fileManager)) {
      $this->fileManager = App::make('App\InjectionWrappers\FlySystem')->manager;
    }
    return $this->fileManager->connection($connection);
  }

  private function getDeepStoragePath(string $token, int $assetId) {
    return $this->deepStorageImagesFolder . '/' . $assetId . '/' . $token . '.jpg';
  }

  private function generateThumbPath(string $token, int $size, int $assetId) {
    $dims = (new ImageSizeMap())->dimensionsFromType($size);
    return $assetId . '/' . implode('_', $dims) . '_' . $token . '.jpg';
  }

  private function slashedPath($path) {
    if (strlen($path) > 0) {
      $path = rtrim($path, '/') . '/';
    }
    return $path;
  }

  private function moveOriginal(string $token, int $oldAssetId, int $newAssetId) {
    $oldPath = $this->getDeepStoragePath($token, $oldAssetId);
    $newPath = $this->getDeepStoragePath($token, $newAssetId);
    $connection = $this->getDeepStorageConnection();
    $this->moveFile($connection, $oldPath, $newPath);
    $this->fileManager->disconnect($connection);
  }

  private function moveThumbs(string $token, int $oldAssetId, int $newAssetId) {
    $connection = $this->getImageConnection();
    foreach ($this->sizes as $size) {
      $oldPath = $this->generateThumbPath($token, $size, $oldAssetId);
      $newPath = $this->generateThumbPath($token, $size, $newAssetId);
      $this->moveFile($connection, $oldPath, $newPath);
    }
    $this->fileManager->disconnect($connection);
  }

  private function moveFile($connection, $oldPath, $newPath) {
    if ($this->fileManager($connection)->has($oldPath)) {
      $this->fileManager($connection)->copy($oldPath, $newPath);
      $this->fileManager($connection)->delete($oldPath);
    }
  }

  private function getHoldingConnection() {
    return 'holding';
  }

  private function getDeepStorageConnection() {
    return env('DEEP_STORAGE_CONNECTION');
  }

  private function getImageConnection() {
    return env('IMAGES_CONNECTION');
  }
}
