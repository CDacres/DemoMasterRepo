<?php

namespace Tests\Unit\GQLTrans\Listings;

use Tests\TestCase;
use Tests\_Providers\Space as JsonProvider;

use App\Http\GraphQL\Transformers\V1Listing;
use App\Http\GraphQL\Transformers\Asset as AT;

use App\Types\Asset;
use App\Types\Currency;
use App\Types\SpaceDetails;

class V1SpaceTest extends TestCase
{
  /**
   * @group v1space
   **/
  public function testCanonicalisation() {
    $provider = new JsonProvider();
    $v1Data = $provider->listingsV1SpaceAsArray();
    $v1Munger = new V1Listing();
    $canon = $v1Munger->v1SpaceToCanon($v1Data);
    $this->assertEquals(json_decode($provider->getRawSpaceJson()), json_decode(json_encode($canon)));
  }

  /**
   * @group v1space
   **/
  public function testReverseCanonicalisation() {
    $provider = new JsonProvider();
    $spaceData = $provider->spaceAsArray();
    $spaceAsset = (new AT())->argsToType($spaceData);
    $v1Munger = new V1Listing();
    $v1Space = $v1Munger->canonSpaceToV1($spaceAsset);
    $this->assertEquals(json_decode($provider->getRawListingsV1SpaceJson())->input, json_decode(json_encode($v1Space)));
  }

  /**
   * @group v1space
   **/
  public function testSpace() {
    $spaceData = (new JsonProvider())->spaceAsArray();
    $spaceAsset = (new AT())->argsToType($spaceData);
    $this->assertInstanceOf(Asset::class, $spaceAsset);
    $spaceDetails = $spaceAsset->getSpaceDetails();
    $this->assertAssetDetails($spaceAsset);
    $this->assertSpaceDetails($spaceDetails);
    $this->assertEquals(1, count($spaceAsset->getUsages()));
  }

  private function assertSpaceDetails(SpaceDetails $details) {
    $this->assertEquals([1,2], collect($details->getStyles())->toArray());
  }

  private function assertAssetDetails(Asset $asset) {
    $this->assertEquals('ab12cde3456fgh7ij890kl1m23456789', $asset->getID()->getValue());
    $this->assertEquals('Test Space', $asset->getName());
    $this->assertEquals('This is test data.', $asset->getDescription());
    $this->assertEquals(Currency::GBP, $asset->getCurrency());
  }
}
