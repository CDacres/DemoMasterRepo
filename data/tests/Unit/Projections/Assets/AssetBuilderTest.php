<?php

namespace Tests\Unit\Projections\Assets;

use App\Zipcube\HandlesAssets\Persistence\AssetBuilder\AssetBuilder;
use App\Zipcube\HandlesAssets\Persistence\AssetBuilder\Constructor;
use Exception;
use Tests\TestCase;
use Tests\_Providers\Assets as Provider;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\Pivot;

use App\ORM\Amenity as EAmenity;
use App\ORM\Asset as EAsset;
use App\ORM\AssetConfiguration as EAssetConfig;
use App\ORM\Company as ECompany;
use App\ORM\DayRate as EDayRate;
use App\ORM\Image as EImage;
use App\ORM\ImageTag as EImageTag;
use App\ORM\ImageType as EImageType;
use App\ORM\OpeningPeriod as EOpeningPeriod;
use App\ORM\Product as EProduct;
use App\ORM\ProductAlias as EProductAlias;
use App\ORM\Room as ERoom;
use App\ORM\Venue as EVenue;

class AssetBuildTest extends TestCase
{
  /**
   * @dataProvider dataProvider
   * @group assets
   * @group build
   */
  public function testBuild(...$providedData) {
    $expected = array_pop($providedData);
    $constructor = $this->generateConstructor(array_pop($providedData));
    $builder = new AssetBuilder();
    $asset = $builder->buildAssetFromConstructor($constructor);
    $this->assertEquals($expected, $asset->serializeToJsonString());
  }

  /**
   * @dataProvider dataProviderBadAsset
   * @group assets
   * @group build
   */
  public function testExceptionOnBadAsset(...$providedData) {
    $this->expectException(Exception::class);
    $constructor = $this->generateConstructor(array_pop($providedData));
    $builder = new AssetBuilder();
    $builder->buildAssetFromConstructor($constructor);
  }

  public function dataProvider() {
    $pro = new Provider();
    return [
      'Room' => $pro->fetchRoom(),
      'Venue' => $pro->fetchVenue(),
    ];
  }

  public function dataProviderBadAsset() {
    $pro = new Provider();
    return [
      'BadAsset' => [$pro->fetchBadAsset()[0]],
    ];
  }

  private function generateConstructor(array $data) {
    $eAsset = new EAsset(json_decode($data['eAsset'], true));
    $eVenue = isset($data['eVenue']) ?  new EVenue(json_decode($data['eVenue'], true)) : null;
    $eRooms = isset($data['eRoomCollection']) ? $this->buildERoomCollection($data['eRoomCollection']) : null;
    $eCompany = isset($data['eCompany']) ? new ECompany(json_decode($data['eCompany'], true)) : null;
    $eDayRates = isset($data['eDayRateCollection']) ? $this->buildEDayRateCollection($data['eDayRateCollection']) : null;
    $eProducts = isset($data['eProductCollection']) ? $this->buildEProductCollection($data['eProductCollection']) : null;
    $ePAs = isset($data['eProductAliasCollection']) ? $this->buildEProductAliasCollection($data['eProductAliasCollection']) : null;
    $eOpeningPeriods = isset($data['eOpeningPeriodCollection']) ? $this->buildEOpeningPeriodCollection($data['eOpeningPeriodCollection']) : null;
    $eImages = isset($data['eImageCollection']) ? $this->buildEImageCollection($data['eImageCollection']) : null;
    $eAmenityArray = isset($data['eAmenityArray']) ? $this->buildEAmenityArray($data['eAmenityArray']) : null;
    $eAssetConfigs = isset($data['eAssetConfigurationCollection']) ? $this->buildEAssetConfigurationCollection($data['eAssetConfigurationCollection']) : null;
    $eAmenityPivots = isset($data['eAmenityPivotCollection']) ? $this->buildEAmenityPivotCollection($data['eAmenityPivotCollection']) : null;
    $aliasEAssets = isset($data['aliasEAssetCollection']) ? $this->buildAliasEAssetCollection($data['aliasEAssetCollection']) : null;
    $constructor = new Constructor($eAsset, $eVenue, $eRooms, $eCompany, $eDayRates, $eProducts, $ePAs, $eOpeningPeriods, $eImages, $eAmenityArray, $eAssetConfigs, $eAmenityPivots, $aliasEAssets);

    return $constructor;
  }

  private function buildERoomCollection(string $eRoomCollectionJson): Collection {
    return new Collection(collect(json_decode($eRoomCollectionJson, true))->map(function ($roomData) {
      return new ERoom($roomData, true);
    }));
  }

  private function buildEDayRateCollection(string $eDayRateCollectionJson): Collection {
    return new Collection(collect(json_decode($eDayRateCollectionJson, true))->map(function ($dayRateData) {
      return new EDayRate($dayRateData, true);
    }));
  }

  private function buildEOpeningPeriodCollection(string $openingPeriodCollectionJson): Collection {
    return new Collection(collect(json_decode($openingPeriodCollectionJson, true))->map(function ($openingPeriodData) {
      return new EOpeningPeriod($openingPeriodData, true);
    }));
  }

  private function buildEImageCollection(string $imageCollectionJson): Collection {
    return new Collection(collect(json_decode($imageCollectionJson, true))->map(function ($imageData) {
      $eImage = new EImage($imageData, true);
      if (isset($imageData['type'])) {
        $eImageType = new EImageType($imageData['type'], true);
        $eImage->type = $eImageType;
      }
      if (isset($imageData['tags'])) {
        $eImageTagCollection = new Collection();
        foreach ($imageData['tags'] as $imageTagData) {
          $eImageTag = new EImageTag($imageTagData, true);
          $eImageTagCollection->add($eImageTag);
        }
        $eImage->tags = $eImageTagCollection;
      }
      return $eImage;
    }));
  }

  private function buildEAmenityArray(string $amenityArrayJson): array {
    $eAmenityArray = [];
    foreach (json_decode($amenityArrayJson, true) as $eAssetId => $amenityCollectionData) {
      $eAmenityArray[$eAssetId] = new Collection(collect($amenityCollectionData)->map(function ($amenityData) {
        return new EAmenity($amenityData, true);
      }));
    }
    return $eAmenityArray;
  }

  private function buildEAssetConfigurationCollection(string $assetConfigCollectionJson): Collection {
    return new Collection(collect(json_decode($assetConfigCollectionJson, true))->map(function ($assetConfigData) {
      return new EAssetConfig($assetConfigData, true);
    }));
  }

  private function buildEProductCollection(string $productCollectionJson): Collection {
    return new Collection(collect(json_decode($productCollectionJson, true))->map(function ($productData) {
      return new EProduct($productData, true);
    }));
  }

  private function buildEProductAliasCollection(string $productAliasCollectionJson): Collection {
    return new Collection(collect(json_decode($productAliasCollectionJson, true))->map(function ($productAliasData) {
      return new EProductAlias($productAliasData, true);
    }));
  }

  private function buildEAmenityPivotCollection(string $amenityPivotCollectionJson): Collection {
    return new Collection(collect(json_decode($amenityPivotCollectionJson, true))->map(function ($amenityPivotData) {
      return new Pivot($amenityPivotData, true);
    }));
  }

  private function buildAliasEAssetCollection(string $aliasEAssetCollectionJson): Collection {
    return new Collection(collect(json_decode($aliasEAssetCollectionJson, true))->map(function ($aliasAssetData) {
      return new EAsset($aliasAssetData, true);
    }));
  }
}
