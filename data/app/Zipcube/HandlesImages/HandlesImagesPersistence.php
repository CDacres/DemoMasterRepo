<?php

namespace App\Zipcube\HandlesImages;

use App\Zipcube\HandlesImages\Persistence\DBInterface\ImageUploadInterface;
use App\Zipcube\HandlesImages\Persistence\DBInterface\ImageBuildInterface;
use App\Zipcube\HandlesImages\Persistence\MDT\ImageMDT;
use App\Types\CId;
use App\Types\CImageUpload;
use App\Types\Id;
use Illuminate\Support\Collection;

class HandlesImagesPersistence {

  private $imageType = 'jpg';
  private $tempAssetId = '0';

  static public function uploadImages(CImageUpload $images): void {
    collect($images->getCollection())->each(function ($image) {
      $interface = new ImageUploadInterface();
      $md = $interface->buildModel($image->getId());
      (new ImageMDT())->mutate($md, $image);
      $interface->persist($md);
    });
  }

  static public function serveImages(CId $payload): Collection {
    $interface = new ImageBuildInterface();
    $md = $interface->buildModel($payload);
    $images = collect($payload->getCollection())->map(function (Id $id) use ($md) {
      return (new ImageMDT())->build($md, $id);
    });
    return $images;
  }

}
