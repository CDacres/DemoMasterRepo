<?php

namespace App\Zipcube\HandlesImages\Persistence\MDT\Transformers;

use App\Zipcube\HandlesAssets\Persistence\MDT\Transformers\BaseMDTT;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\ImageProxy\ImageBuildProxy;
use App\Types\Image;
use App\Types\ImageType;
use App\Types\ImageUpload;
use App\Types\ImageUrl;
use App\Maps\ImageSizeMap;
use App\Maps\ImageTypeMap;
use Illuminate\Support\Facades\App;

class ImageMDTT extends BaseMDTT {

  private $fileManager;
  private $localImageConnection = 'images_local';
  private $sizes = [
    'small' => [190, 120],
    'medium' => [300, 200],
    'large' => [639, 428],
    'huge' => [870, 450],
    'banner' => [1056, 300]
  ];

  public function toEloquent(ImageUpload $image): array {
    $token = $image->getId()->getValue();
    $eloquent = [
      'token' => $token,
      'file' => $image->getFile(),
      'size' => $image->getSize(),
      'name' => $token.'.jpg'
    ];
    if (!is_null($image->getType()) && $image->getType() != ImageType::NOIMAGETYPE) {
      $eloquent['image_type_id'] = (new ImageTypeMap())->idFromType($image->getType());
    }
    return $eloquent;
  }

  public function fromEloquent(ImageBuildProxy $proxy): Image {
    $image = new Image([
      'id' => $this->buildNewId($proxy->token),
      'type' => (new ImageTypeMap())->typeFromId($proxy->image_type_id),
    ]);
    $imageName = $proxy->name;
    $pathFolder = $proxy->asset_id;
    $imageUrls = [];
    foreach ($this->sizes as $key => $value) {
      $imageUrl = new ImageUrl([
        'url' => $this->generateUrl(env('IMAGES_URL'), $imageName, $key, $pathFolder),
        'imageSize' => (new ImageSizeMap())->typeFromName($key),
      ]);
      $imageUrls[] = $imageUrl;
    }
    $image->setImageUrls($imageUrls);
    return $image;
  }

  //TODO: Move elsewhere?
  private function generateUrl($container, $imageName, $size = '', $pathFolder = ''): string {
    $imageSizes = $this->sizes;
    $prefix = '';
    if ($size != '' && isset($imageSizes[$size]))
    {
      $prefix = $imageSizes[$size][0] . "_" . $imageSizes[$size][1] . "_";
    }
    $path = "/" . (($pathFolder != '')?$pathFolder . '/':'') . $prefix . $imageName;
    if ($this->fileManager($this->localImageConnection)->has($path))
    {
      $url = env("SITE_URL") .  "/images" . $path;
    }
    else
    {
      $url = $container . $path;
    }
    return $url;
  }

  private function fileManager($connection = null) {
    if (is_null($this->fileManager)) {
      $this->fileManager = App::make('App\InjectionWrappers\FlySystem')->manager;
    }
    return $this->fileManager->connection($connection);
  }
}
