<?php

namespace Tests\Unit\GQLTrans\Listings;

use Tests\TestCase;
use Tests\_Providers\Venue as JsonProvider;

use App\Http\GraphQL\Transformers\Asset as AT;

use App\Types\CAsset;

class V1VenueTest extends TestCase
{
  /**
   * @group v1venue
   **/
  public function testCanonicalisation() {
    $provider = new JsonProvider();
    $v1Data = $provider->listingsV1VenueAsArray();
    $v1Munger = new \App\Http\GraphQL\Transformers\V1Listing();
    $canon = $v1Munger->v1VenueToCanon($v1Data);
    $this->assertEquals(json_decode($provider->getRawVenueJson()), json_decode(json_encode($canon)));
  }

  /**
   * @group v1venue
   **/
  public function testReverseCanonicalisation() {
    $provider = new JsonProvider();
    $venueData = (new JsonProvider())->venueAsArray();
    $venueAsset = (new AT())->argsToType($venueData);
    $v1Munger = new \App\Http\GraphQL\Transformers\V1Listing();
    $v1Venue = $v1Munger->canonVenueToV1($venueAsset, new CAsset());
    $this->assertEquals(json_decode($provider->getRawListingsV1VenueJson())->input, json_decode($v1Venue->serializeToJsonString()));
  }

  /**
   * @group v1venue
   **/
  public function testVenue() {
    $venueData = (new JsonProvider())->venueAsArray();
    $venueAsset = (new AT())->argsToType($venueData);
    $this->assertInstanceOf(\App\Types\Asset::class, $venueAsset);
    $venueDetails = $venueAsset->getVenueDetails();
    $this->assertAssetDetails($venueAsset);
    $this->assertVenueDetails($venueDetails);
    $this->assertOpeningHours($venueAsset);
    $this->assertMenus($venueAsset);
  }

  private function assertOpeningHours(\App\Types\Asset $asset) {
    $exOpeningHour = $asset->getContext()->getSchedule()->getDays()[0];
    $this->assertInstanceOf(\App\Types\DailyHours::class, $exOpeningHour);
    $this->assertEquals(\App\Types\Day::MONDAY, $exOpeningHour->getDay());
    $exSpan = $exOpeningHour->getSpans()[0];
    $this->assertInstanceOf(\App\Types\DaySpan::class, $exSpan);
    $this->assertEquals(720, $exSpan->getStart());
    $this->assertEquals(1440, $exSpan->getEnd());
  }

  private function assertMenus(\App\Types\Asset $asset) {
    $exMenu = $asset->getContext()->getMenus()[0];
    $this->assertInstanceOf(\App\Types\Menu::class, $exMenu);
    $this->assertEquals('yum', $exMenu->getDescription());
    $exGroup = $exMenu->getGroups()[0];
    $this->assertInstanceOf(\App\Types\MenuGroup::class, $exGroup);
    $this->assertEquals('starter', $exGroup->getDescription());
    $this->assertEquals(1, $exGroup->getOrderIndex());
    $exItem = $exGroup->getItems()[0];
    $this->assertInstanceOf(\App\Types\MenuItem::class, $exItem);
    $this->assertEquals('cabbage', $exItem->getDescription());
    $this->assertEquals(0, $exItem->getOrderIndex()); //this should be the type default since it is unspecified
    $exOption = $exItem->getPriceOptions()[0];
    $this->assertInstanceOf(\App\Types\MenuPriceOption::class, $exOption);
    $this->assertEquals('BOGOL', $exOption->getDescription());
    $this->assertEquals('STD', $exOption->getKind());
    $this->assertEquals(12.34, $exOption->getPrice()->getValue());
  }

  private function assertVenueDetails(\App\Types\VenueDetails $details) {
    $this->assertEquals("1", $details->getVenueTypeId()->getValue());
  }

  private function assertAssetDetails(\App\Types\Asset $asset) {
    $this->assertEquals('Carl', $asset->getDescription());
    $this->assertEquals('jam.com', $asset->getContext()->getWebsite());
    $this->assertEquals(\App\Types\Currency::USD, $asset->getCurrency());
    $this->assertEquals('Lemon', $asset->getName());
    $this->assertEquals('495df9d128b1bd454bebb00d623ce699', $asset->getID()->getValue());
  }
}
