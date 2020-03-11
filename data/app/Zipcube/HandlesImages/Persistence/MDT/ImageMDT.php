<?php

namespace App\Zipcube\HandlesImages\Persistence\MDT;

use App\Zipcube\HandlesImages\Persistence\ImageUploadMD;
use App\Zipcube\HandlesImages\Persistence\ImageBuildMD;
use App\Zipcube\HandlesImages\Persistence\MDT\Transformers\ImageMDTT;
use App\Types\Id;
use App\Types\Image;
use App\Types\ImageUpload;

class ImageMDT {

  public function mutate(ImageUploadMD $directory, ImageUpload $image): void {
    $directory->upsert(ImageUploadMD::IMAGE, ['token' => $image->getId()->getValue()], (new ImageMDTT())->toEloquent($image));
  }

  public function build(ImageBuildMD $directory, Id $id): Image {
    $proxy = $directory->use(ImageBuildMD::IMAGE, ['token' => $id->getValue()]);
    return (new ImageMDTT())->fromEloquent($proxy);
  }
}
