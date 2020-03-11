<?php

namespace Tests\Unit\Projections\Assets;

use App\Zipcube\HandlesAssets\Persistence\AssetDismantler\Deconstructor;
use App\Zipcube\HandlesAssets\Persistence\AssetDismantler\RoomDismantler;
use App\Zipcube\HandlesAssets\Persistence\AssetDismantler\VenueDismantler;
use Exception;
use Tests\TestCase;
use Tests\_Providers\DismantleAssets as Provider;

use Illuminate\Database\Eloquent\Collection;

use App\ORM\Asset as EAsset;
use App\ORM\AssetAmenity as EAssetAmenity;
use App\ORM\Company as ECompany;
use App\ORM\DayRate as EDayRate;
use App\ORM\Image as EImage;
use App\ORM\Product as EProduct;
use App\ORM\ProductAlias as EProductAlias;
use App\ORM\Room as ERoom;
use App\ORM\Venue as EVenue;

class AssetDismantleTest extends TestCase
{
  /**
   * @dataProvider dataProviderRoom
   * @group assets
   * @group dismantle
   */
  public function testBuildRoom(...$providedData) {
    $expected = array_pop($providedData);
    $eModelDataArray = array_pop($providedData);
    $asset = array_pop($providedData);
    list($asset, $emptyDecon) = $this->generateAssets($asset, $eModelDataArray);
    $dismantler = new RoomDismantler();
    $decon = $dismantler->populateDeconstructorFromAsset($asset, $emptyDecon);
    $this->checkDecon($decon, $expected);
  }

  /**
   * @dataProvider dataProviderVenue
   * @group assets
   * @group dismantle
   */
  public function testBuildVenue(...$providedData) {
    $expected = array_pop($providedData);
    $eModelDataArray = array_pop($providedData);
    $asset = array_pop($providedData);
    list($asset, $emptyDecon) = $this->generateAssets($asset, $eModelDataArray);
    $dismantler = new VenueDismantler();
    $decon = $dismantler->populateDeconstructorFromAsset($asset, $emptyDecon);
    $this->checkDecon($decon, $expected);
  }

  /**
   * @dataProvider dataProviderBadAsset
   * @group assets
   * @group build
   */
  public function testExceptionOnBadAssetRoom(...$providedData) {
    $this->expectException(Exception::class);
    $eModelDataArray = array_pop($providedData);
    $asset = array_pop($providedData);
    list($asset, $emptyDecon) = $this->generateAssets($asset, $eModelDataArray);
    $dismantler = new RoomDismantler();
    $dismantler->populateDeconstructorFromAsset($asset, $emptyDecon);
  }

  /**
   * @dataProvider dataProviderBadAsset
   * @group assets
   * @group build
   */
  public function testExceptionOnBadAssetVenue(...$providedData) {
    $this->expectException(Exception::class);
    $eModelDataArray = array_pop($providedData);
    $asset = array_pop($providedData);
    list($asset, $emptyDecon) = $this->generateAssets($asset, $eModelDataArray);
    $dismantler = new VenueDismantler();
    $dismantler->populateDeconstructorFromAsset($asset, $emptyDecon);
  }

  private function checkDecon(Deconstructor $decon, array $expected) {
    $this->assertJsonStringEqualsJsonString($expected['eAsset'], $decon->getPrimaryAsset()->toJson());
    if (!empty($expected['aliasEAssetCollection'])) {
      $this->assertJsonStringEqualsJsonString($expected['aliasEAssetCollection'], $decon->getAliasAssetCollection()->toJson());
    }
    if (!empty($expected['eCompany'])) {
      $this->assertJsonStringEqualsJsonString($expected['eCompany'], $decon->getCompany()->toJson());
    }
    if (!empty($expected['eRoomCollection'])) {
      $this->assertJsonStringEqualsJsonString($expected['eRoomCollection'], $decon->getRoomCollection()->toJson());
    }
    if (!empty($expected['eVenue'])) {
      $this->assertJsonStringEqualsJsonString($expected['eVenue'], $decon->getVenue()->toJson());
    }
    if (!empty($expected['eProductCollection'])) {
      $this->assertJsonStringEqualsJsonString($expected['eProductCollection'], $decon->getProductCollection()->toJson());
    }
    if (!empty($expected['eProductAliasCollection'])) {
      $this->assertJsonStringEqualsJsonString($expected['eProductAliasCollection'], $decon->getProductAliasCollection()->toJson());
    }
    if (!empty($expected['eDayRateCollection'])) {
      $this->assertJsonStringEqualsJsonString($expected['eDayRateCollection'], $decon->getDayRateCollection()->toJson());
    }
    if (!empty($expected['eOpeningPeriodCollection'])) {
      $this->assertJsonStringEqualsJsonString($expected['eOpeningPeriodCollection'], $decon->getOpeningPeriodCollection()->toJson());
    }
    if (!empty($expected['eImageCollection'])) {
      $this->assertJsonStringEqualsJsonString($expected['eImageCollection'], $decon->getImageCollection()->toJson());
    }
    if (!empty($expected['eAssetAmenityCollection'])) {
      $this->assertJsonStringEqualsJsonString($expected['eAssetAmenityCollection'], $decon->getAssetAmenityCollection()->toJson());
    }
    if (!empty($expected['eAssetConfigurationCollection'])) {
      $this->assertJsonStringEqualsJsonString($expected['eAssetConfigurationCollection'], $decon->getAssetConfigurationCollection()->toJson());
    }
  }

  public function dataProviderRoom() {
    $pro = new Provider();
    return [$pro->fetchRoom()];
  }

  public function dataProviderVenue() {
    $pro = new Provider();
    return [$pro->fetchVenue()];
  }

  public function dataProviderBadAsset() {
    $pro = new Provider();
    return [$pro->fetchBadAsset()];
  }

  private function generateAssets($asset, $eModelData) {
    $eAsset = new EAsset(json_decode($eModelData['eAsset'], true));
    $aliasEAssets = isset($eModelData['aliasEAssetCollection']) ? $this->buildAliasEAssetCollection($eModelData['aliasEAssetCollection']) : null;
    $eRooms = isset($eModelData['eRoomCollection']) ? $this->buildERoomCollection($eModelData['eRoomCollection']) : null;
    $eVenue = isset($eModelData['eVenue']) ?  new EVenue(json_decode($eModelData['eVenue'], true)) : null;
    $eCompany = isset($eModelData['eCompany']) ? new ECompany(json_decode($eModelData['eCompany'], true)) : null;
    $eProducts = isset($eModelData['eProductCollection']) ? $this->buildEProductCollection($eModelData['eProductCollection']) : null;
    $eProductAliases = isset($eModelData['eProductAliasCollection']) ? $this->buildEProductAliasCollection($eModelData['eProductAliasCollection']) : null;
    $eDayRates = isset($eModelData['eDayRateCollection']) ? $this->buildEDayRateCollection($eModelData['eDayRateCollection']) : null;
    $eImages = isset($eModelData['eImageCollection']) ? $this->buildEImageCollection($eModelData['eImageCollection']) : null;
    $eAssetAmenities = isset($eModelData['eAssetAmenityCollection']) ? $this->buildEAssetAmenityCollection($eModelData['eAssetAmenityCollection']) : null;
    return [$asset, new Deconstructor($eAsset, $aliasEAssets, $eCompany, $eRooms, $eVenue, $eProducts, $eProductAliases, $eDayRates, null, $eImages, $eAssetAmenities, null)];
  }

  private function buildAliasEAssetCollection(string $aliasEAssetCollectionJson): Collection {
    return new Collection(collect(json_decode($aliasEAssetCollectionJson, true))->map(function ($aliasAssetData) {
      return new EAsset($aliasAssetData, true);
    }));
  }

  private function buildERoomCollection(string $eRoomCollectionJson): Collection {
    return new Collection(collect(json_decode($eRoomCollectionJson, true))->map(function ($roomData) {
      return new ERoom($roomData, true);
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

  private function buildEDayRateCollection(string $eDayRateCollectionJson): Collection {
    return new Collection(collect(json_decode($eDayRateCollectionJson, true))->map(function ($dayRateData) {
      return new EDayRate($dayRateData, true);
    }));
  }

  private function buildEImageCollection(string $eImageCollectionJson): Collection {
    return new Collection(collect(json_decode($eImageCollectionJson, true))->map(function ($imageData) {
      return new EImage($imageData, true);
    }));
  }

  private function buildEAssetAmenityCollection(string $eAssetAmenityCollectionJson): Collection {
    return new Collection(collect(json_decode($eAssetAmenityCollectionJson, true))->map(function ($assetAmenityData) {
      return new EAssetAmenity($assetAmenityData, true);
    }));
  }
}
