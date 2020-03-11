<?php

namespace App\Zipcube\HandlesImages;

use Intervention\Image\Facades\Image as ImageFacade;

use App\ZipcubeInterface\DomainCommand;
use App\Zipcube\_Messages\ImageUploadApproved;
use App\Zipcube\HandlesImages\HandlesImagesPersistence as Persistence;

use App\Types\CId;
use App\Types\CImageUpload;
use App\Types\ImageUpload;
use App\Maps\ImageSizeMap;
use Illuminate\Support\Collection;

class HandlesImagesService extends DomainCommand {

  private $saveQuality = 75;
  public $imageType = 'jpg';
  private $imageSizes = [
    'small' => [190, 120],
    'medium' => [300, 200],
    'large' => [639, 428],
    'huge' => [870, 450],
    'banner' => [1056, 300]
  ];

  public $eventMap = [
    [ImageUploadApproved::class, 'handleImageUpload'],
  ];

  public function handleImageUpload(ImageUpload $payload) {
    $imageCollection = $this->handleImageSizes($payload);
    Persistence::uploadImages($imageCollection);
  }

  public function imageCollectionByCId(CId $ids): Collection {
    return Persistence::serveImages($ids);
  }

  private function handleImageSizes(ImageUpload $rawImage): CImageUpload {
    ini_set('memory_limit', '4096M');
    $imageArr = [$rawImage];
    $imageFile = $rawImage->getFile();
    $interImage = ImageFacade::make($imageFile);
    foreach ($this->imageSizes as $size => $dimsArray) {
      $interImage->backup();
      $image = $this->generateResizedImage($rawImage, $size, $dimsArray, $interImage);
      $imageArr[] = $image;
      $interImage->reset();
    }
    return new CImageUpload(['collection' => $imageArr]);
  }

  private function generateResizedImage(ImageUpload $raw, string $size, array $dimsArray, $interImage): ImageUpload {
    $resized = new ImageUpload([
      'id' => $raw->getId(),
      'type' => $raw->getType(),
      'size' => (new ImageSizeMap())->typeFromName($size),
    ]);
    if (!empty($dimsArray)) {
      $interImage->fit($dimsArray[0], $dimsArray[1], function ($constraint) {
        $constraint->upsize();
      });
    }
    $resized->setFile((string) $interImage->encode($this->imageType, $this->saveQuality));
    return $resized;
  }
}
