<?php

namespace Tests\Unit\Projections\Assets;

use App\Zipcube\HandlesAssets\Persistence\AssetTags;
use Tests\TestCase;
use Tests\_Providers\AssetTags as Provider;

class TagsTest extends TestCase
{
  /**
   * @dataProvider dataProvider
   * @group tags
   */
  public function testMeeting(...$providedData)
  {
    $expected = array_pop($providedData);
    $builder = new AssetTags();
    $assetTags = $builder->generateTags(...$providedData);
    $this->assertEquals($expected, $assetTags);
  }

  public function dataProvider()
  {
    $pro = new Provider();
    return [
      'Meeting Room' => $pro->fetchMeetingTags(),
      'German Meeting Room' => $pro->fetchGermanMeetingTags(),
      'German Hotel Meeting Room' => $pro->fetchGermanHotelMeetingTags(),
      'Boardroom Room' => $pro->fetchBoardroomTags(),
      'Conference Room' => $pro->fetchConferenceTags(),
      'German Hotel Conference Room' => $pro->fetchGermanHotelConferenceTags(),
      'Classroom' => $pro->fetchClassroomTags(),
      'German Classroom' => $pro->fetchGermanHotelClassroomTags(),
      'U-Shaped' => $pro->fetchUShapedTags(),
      'German U-Shaped' => $pro->fetchGermanHotelUShapedTags(),
      'U-Shaped With Amenities' => $pro->fetchUShapedWithAmenitiesTags(),
      'Theatre' => $pro->fetchTheatreTags(),
      'Theatre With Amenities' => $pro->fetchTheatreWithAmenitiesTags(),
      'Interview' => $pro->fetchInterviewTags(),
      'Office' => $pro->fetchOfficeTags(),
      'Hot Desk' => $pro->fetchHotDeskOfficeTags(),
      'Private Office' => $pro->fetchPrivateOfficeTags(),
      'Coworking Office' => $pro->fetchCoworkingOfficeTags(),
      'Party' => $pro->fetchPartyTags(),
      'Party Bar' => $pro->fetchPartyBarTags(),
      'Party Pub' => $pro->fetchPartyPubTags(),
      'Party Cocktail' => $pro->fetchPartyCocktailTags(),
      'Party Penthouse' => $pro->fetchPartyPenthouseTags(),
      'Party Hall' => $pro->fetchPartyHallTags(),
      'German Party' => $pro->fetchGermanPartyTags(),
      'Dining' => $pro->fetchDiningTags(),
      'Dining Restuarant' => $pro->fetchDiningRestaurantTags(),
      'Wedding' => $pro->fetchWeddingTags(),
    ];
  }
}