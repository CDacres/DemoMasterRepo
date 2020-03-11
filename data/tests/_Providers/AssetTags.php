<?php

namespace Tests\_Providers;

use App\ORM\Asset;
use App\ORM\Room;
use App\ORM\Venue;
use App\ORM\AssetAmenity;
use App\ORM\RoomConfiguration;
use App\ORM\AssetTag;
use App\ORM\VenueType;
use App\ORM\Amenity;
use App\ORM\Configuration;
use App\ORM\Vertical;
use App\ORM\Tag;
use App\ORM\OfficeType;

class AssetTags
{
  public $asset = ['id' => 1, 'token' => '01111111122222223333333444444440'];
  public $venue = ['id' => 1];
  public $hotelVenue = ['id' => 1, 'venue_type_id' => VenueType::HOTEL];
  public $coworkingVenue = ['id' => 1, 'venue_type_id' => VenueType::COWORKING_SPACE];
  public $barVenue = ['id' => 1, 'venue_type_id' => VenueType::BAR];
  public $pubVenue = ['id' => 1, 'venue_type_id' => VenueType::PUB];
  public $cocktailVenue = ['id' => 1, 'venue_type_id' => VenueType::COCKTAIL_BAR];
  public $penthouseVenue = ['id' => 1, 'venue_type_id' => VenueType::PENTHOUSE_VILLA];
  public $restuarantVenue = ['id' => 1, 'venue_type_id' => VenueType::RESTAURANT];
  public $germanVenue = ['id' => 1, 'country_code' => 'DE'];
  public $germanHotelVenue = ['id' => 1, 'country_code' => 'DE', 'venue_type_id' => VenueType::HOTEL];
  public $amenities = [['id' => 1, 'asset_id' => 1, 'available' => 1, 'amenity_id' => Amenity::PROJECTOR]];
  public $configs = [['id' => 1, 'asset_id' => 1, 'configuration_id' => Configuration::BOARDROOM, 'max_capacity' => 10]];
  public $conferenceConfigs = [['id' => 1, 'asset_id' => 1, 'configuration_id' => Configuration::BANQUET, 'max_capacity' => 100]];
  public $classroomConfigs = [['id' => 1, 'asset_id' => 1, 'configuration_id' => Configuration::CLASSROOM, 'max_capacity' => 10]];
  public $uShapedConfigs = [['id' => 1, 'asset_id' => 1, 'configuration_id' => Configuration::U_SHAPED, 'max_capacity' => 10]];
  public $theatreConfigs = [['id' => 1, 'asset_id' => 1, 'configuration_id' => Configuration::THEATRE, 'max_capacity' => 100]];
  public $interviewCapacity = [['id' => 1, 'asset_id' => 1, 'configuration_id' => Configuration::BOARDROOM, 'max_capacity' => 2]];
  public $hallCapacity = [['id' => 1, 'asset_id' => 1, 'configuration_id' => Configuration::RECEPTION, 'max_capacity' => 200]];
  public $meeting = ['id' => 1, 'asset_id' => 1, 'primary_vertical_id' => Vertical::MEETING];
  public $office = ['id' => 1, 'asset_id' => 1, 'primary_vertical_id' => Vertical::OFFICE];
  public $hotDeskOffice = ['id' => 1, 'asset_id' => 1, 'primary_vertical_id' => Vertical::OFFICE, 'office_type_id' => OfficeType::HOTDESK];
  public $privateOffice = ['id' => 1, 'asset_id' => 1, 'primary_vertical_id' => Vertical::OFFICE, 'office_type_id' => OfficeType::PRIVATEOFFICE];
  public $party = ['id' => 1, 'asset_id' => 1, 'primary_vertical_id' => Vertical::PARTY];
  public $dining = ['id' => 1, 'asset_id' => 1, 'primary_vertical_id' => Vertical::DINING];
  public $wedding = ['id' => 1, 'asset_id' => 1, 'primary_vertical_id' => Vertical::WEDDING];

  public $resultData = [
    'meeting' => [['asset_id' => 1, 'tag_id' => Tag::MEETING]],
    'germanMeeting' => [['asset_id' => 1, 'tag_id' => Tag::MEETING], ['asset_id' => 1, 'tag_id' => Tag::TAGUNGSRAUM]],
    'germanHotelMeeting' => [['asset_id' => 1, 'tag_id' => Tag::MEETING], ['asset_id' => 1, 'tag_id' => Tag::TAGUNGSRAUM], ['asset_id' => 1, 'tag_id' => Tag::TAGUNGSHOTEL]],
    'boardroom' => [['asset_id' => 1, 'tag_id' => Tag::MEETING], ['asset_id' => 1, 'tag_id' => Tag::BOARDROOM], ['asset_id' => 1, 'tag_id' => Tag::MEETING_ROOMS]],
    'conference' => [['asset_id' => 1, 'tag_id' => Tag::MEETING], ['asset_id' => 1, 'tag_id' => Tag::CONFERENCE_ROOM], ['asset_id' => 1, 'tag_id' => Tag::CONFERENCE_CENTRE]],
    'germanHotelConference' => [['asset_id' => 1, 'tag_id' => Tag::MEETING], ['asset_id' => 1, 'tag_id' => Tag::TAGUNGSRAUM], ['asset_id' => 1, 'tag_id' => Tag::TAGUNGSHOTEL], ['asset_id' => 1, 'tag_id' => Tag::CONFERENCE_ROOM], ['asset_id' => 1, 'tag_id' => Tag::KONFERENZ_HOTEL], ['asset_id' => 1, 'tag_id' => Tag::CONFERENCE_CENTRE]],
    'classroom' => [['asset_id' => 1, 'tag_id' => Tag::MEETING], ['asset_id' => 1, 'tag_id' => Tag::TRAINING_ROOM], ['asset_id' => 1, 'tag_id' => Tag::MEETING_ROOMS]],
    'germanClassroom' => [['asset_id' => 1, 'tag_id' => Tag::MEETING], ['asset_id' => 1, 'tag_id' => Tag::TAGUNGSRAUM], ['asset_id' => 1, 'tag_id' => Tag::TAGUNGSHOTEL], ['asset_id' => 1, 'tag_id' => Tag::TRAINING_ROOM], ['asset_id' => 1, 'tag_id' => Tag::SEMINARHOTEL], ['asset_id' => 1, 'tag_id' => Tag::MEETING_ROOMS]],
    'uShaped' => [['asset_id' => 1, 'tag_id' => Tag::MEETING], ['asset_id' => 1, 'tag_id' => Tag::TRAINING_ROOM], ['asset_id' => 1, 'tag_id' => Tag::MEETING_ROOMS]],
    'germanUShaped' => [['asset_id' => 1, 'tag_id' => Tag::MEETING], ['asset_id' => 1, 'tag_id' => Tag::TAGUNGSRAUM], ['asset_id' => 1, 'tag_id' => Tag::TAGUNGSHOTEL], ['asset_id' => 1, 'tag_id' => Tag::TRAINING_ROOM], ['asset_id' => 1, 'tag_id' => Tag::SEMINARHOTEL], ['asset_id' => 1, 'tag_id' => Tag::MEETING_ROOMS]],
    'uShapedWithAmenities' => [['asset_id' => 1, 'tag_id' => Tag::MEETING], ['asset_id' => 1, 'tag_id' => Tag::PRESENTATION], ['asset_id' => 1, 'tag_id' => Tag::TRAINING_ROOM], ['asset_id' => 1, 'tag_id' => Tag::MEETING_ROOMS]],
    'theatre' => [['asset_id' => 1, 'tag_id' => Tag::MEETING], ['asset_id' => 1, 'tag_id' => Tag::LECTURE_THEATRE], ['asset_id' => 1, 'tag_id' => Tag::LECTURE], ['asset_id' => 1, 'tag_id' => Tag::AUDITORIUM], ['asset_id' => 1, 'tag_id' => Tag::CONFERENCE_ROOM], ['asset_id' => 1, 'tag_id' => Tag::CONFERENCE_CENTRE]],
    'theatreWithAmenities' => [['asset_id' => 1, 'tag_id' => Tag::MEETING], ['asset_id' => 1, 'tag_id' => Tag::PRESENTATION], ['asset_id' => 1, 'tag_id' => Tag::LECTURE_THEATRE], ['asset_id' => 1, 'tag_id' => Tag::LECTURE], ['asset_id' => 1, 'tag_id' => Tag::AUDITORIUM], ['asset_id' => 1, 'tag_id' => Tag::CONFERENCE_ROOM], ['asset_id' => 1, 'tag_id' => Tag::CONFERENCE_CENTRE]],
    'interview' => [['asset_id' => 1, 'tag_id' => Tag::MEETING], ['asset_id' => 1, 'tag_id' => Tag::INTERVIEW_ROOM], ['asset_id' => 1, 'tag_id' => Tag::BOARDROOM], ['asset_id' => 1, 'tag_id' => Tag::MEETING_ROOMS]],
    'office' => [['asset_id' => 1, 'tag_id' => Tag::OFFICE_SPACE]],
    'officeHotDesk' => [['asset_id' => 1, 'tag_id' => Tag::OFFICE_SPACE], ['asset_id' => 1, 'tag_id' => Tag::HOT_DESK]],
    'officePrivate' => [['asset_id' => 1, 'tag_id' => Tag::OFFICE_SPACE], ['asset_id' => 1, 'tag_id' => Tag::PRIVATE_OFFICE]],
    'officeCoworking' => [['asset_id' => 1, 'tag_id' => Tag::OFFICE_SPACE], ['asset_id' => 1, 'tag_id' => Tag::COWORKING_SPACE]],
    'party' => [['asset_id' => 1, 'tag_id' => Tag::PARTY]],
    'partyBar' => [['asset_id' => 1, 'tag_id' => Tag::PARTY], ['asset_id' => 1, 'tag_id' => Tag::BAR]],
    'partyPub' => [['asset_id' => 1, 'tag_id' => Tag::PARTY], ['asset_id' => 1, 'tag_id' => Tag::PUB]],
    'partyCocktail' => [['asset_id' => 1, 'tag_id' => Tag::PARTY], ['asset_id' => 1, 'tag_id' => Tag::COCKTAIL_BAR]],
    'partyPenthouse' => [['asset_id' => 1, 'tag_id' => Tag::PARTY], ['asset_id' => 1, 'tag_id' => Tag::PENTHOUSE]],
    'partyHall' => [['asset_id' => 1, 'tag_id' => Tag::PARTY], ['asset_id' => 1, 'tag_id' => Tag::HALL]],
    'germanParty' => [['asset_id' => 1, 'tag_id' => Tag::PARTY], ['asset_id' => 1, 'tag_id' => Tag::EVENTLOCATION]],
    'dining' => [['asset_id' => 1, 'tag_id' => Tag::DINING]],
    'diningRestaurant' => [['asset_id' => 1, 'tag_id' => Tag::DINING], ['asset_id' => 1, 'tag_id' => Tag::RESTAURANT]],
    'wedding' => [['asset_id' => 1, 'tag_id' => Tag::WEDDING]],
  ];

  public function fetchMeetingTags()
  {
    return $this->generateTestArgs($this->resultData['meeting'], $this->meeting);
  }

  public function fetchGermanMeetingTags()
  {
    return $this->generateTestArgs($this->resultData['germanMeeting'], $this->meeting, $this->germanVenue);
  }

  public function fetchGermanHotelMeetingTags()
  {
    return $this->generateTestArgs($this->resultData['germanHotelMeeting'], $this->meeting, $this->germanHotelVenue);
  }

  public function fetchBoardroomTags()
  {
    return $this->generateTestArgs($this->resultData['boardroom'], $this->meeting, null, [], $this->configs);
  }

  public function fetchConferenceTags()
  {
    return $this->generateTestArgs($this->resultData['conference'], $this->meeting, null, [], $this->conferenceConfigs);
  }

  public function fetchGermanHotelConferenceTags()
  {
    return $this->generateTestArgs($this->resultData['germanHotelConference'], $this->meeting, $this->germanHotelVenue, [], $this->conferenceConfigs);
  }

  public function fetchClassroomTags()
  {
    return $this->generateTestArgs($this->resultData['classroom'], $this->meeting, null, [], $this->classroomConfigs);
  }

  public function fetchGermanHotelClassroomTags()
  {
    return $this->generateTestArgs($this->resultData['germanClassroom'], $this->meeting, $this->germanHotelVenue, [], $this->classroomConfigs);
  }

  public function fetchUShapedTags()
  {
    return $this->generateTestArgs($this->resultData['uShaped'], $this->meeting, null, [], $this->uShapedConfigs);
  }

  public function fetchGermanHotelUShapedTags()
  {
    return $this->generateTestArgs($this->resultData['germanUShaped'], $this->meeting, $this->germanHotelVenue, [], $this->uShapedConfigs);
  }

  public function fetchUShapedWithAmenitiesTags()
  {
    return $this->generateTestArgs($this->resultData['uShapedWithAmenities'], $this->meeting, null, $this->amenities, $this->uShapedConfigs);
  }

  public function fetchTheatreTags()
  {
    return $this->generateTestArgs($this->resultData['theatre'], $this->meeting, null, [], $this->theatreConfigs);
  }

  public function fetchTheatreWithAmenitiesTags()
  {
    return $this->generateTestArgs($this->resultData['theatreWithAmenities'], $this->meeting, null, $this->amenities, $this->theatreConfigs);
  }

  public function fetchInterviewTags()
  {
    return $this->generateTestArgs($this->resultData['interview'], $this->meeting, null, [], $this->interviewCapacity);
  }

  public function fetchOfficeTags()
  {
    return $this->generateTestArgs($this->resultData['office'], $this->office);
  }

  public function fetchHotDeskOfficeTags()
  {
    return $this->generateTestArgs($this->resultData['officeHotDesk'], $this->hotDeskOffice);
  }

  public function fetchPrivateOfficeTags()
  {
    return $this->generateTestArgs($this->resultData['officePrivate'], $this->privateOffice);
  }

  public function fetchCoworkingOfficeTags()
  {
    return $this->generateTestArgs($this->resultData['officeCoworking'], $this->office, $this->coworkingVenue);
  }

  public function fetchPartyTags()
  {
    return $this->generateTestArgs($this->resultData['party'], $this->party);
  }

  public function fetchPartyBarTags()
  {
    return $this->generateTestArgs($this->resultData['partyBar'], $this->party, $this->barVenue);
  }

  public function fetchPartyPubTags()
  {
    return $this->generateTestArgs($this->resultData['partyPub'], $this->party, $this->pubVenue);
  }

  public function fetchPartyCocktailTags()
  {
    return $this->generateTestArgs($this->resultData['partyCocktail'], $this->party, $this->cocktailVenue);
  }

  public function fetchPartyPenthouseTags()
  {
    return $this->generateTestArgs($this->resultData['partyPenthouse'], $this->party, $this->penthouseVenue);
  }

  public function fetchPartyHallTags()
  {
    return $this->generateTestArgs($this->resultData['partyHall'], $this->party, null, [], $this->hallCapacity);
  }

  public function fetchGermanPartyTags()
  {
    return $this->generateTestArgs($this->resultData['germanParty'], $this->party, $this->germanVenue);
  }

  public function fetchDiningTags()
  {
    return $this->generateTestArgs($this->resultData['dining'], $this->dining);
  }

  public function fetchDiningRestaurantTags()
  {
    return $this->generateTestArgs($this->resultData['diningRestaurant'], $this->dining, $this->restuarantVenue);
  }

  public function fetchWeddingTags()
  {
    return $this->generateTestArgs($this->resultData['wedding'], $this->wedding);
  }

  private function generateTestArgs($results, $room = null, $venue = null, $amenities = [], $configs = [])
  {
    return [
      new Asset($this->asset),
      $room ? new Room($room) : new Room($this->meeting),
      $venue ? new Venue($venue) : new Venue($this->venue),
      $this->generateAssetAmenityCollection($amenities),
      $this->generateConfigCollection($configs),
      $this->generateAssetTagCollection($results)
    ];
  }

  private function generateAssetAmenityCollection($data)
  {
    return collect($data)->map(function ($itemData) { return new AssetAmenity($itemData); });
  }

  private function generateConfigCollection($data)
  {
    return collect($data)->map(function ($itemData) { return new RoomConfiguration($itemData); });
  }

  private function generateAssetTagCollection($data)
  {
    return collect($data)->map(function ($itemData) { return new AssetTag($itemData); });
  }
}