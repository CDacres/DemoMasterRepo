<?php

namespace Tests\_Providers;

use App\ORM\Asset;
use App\ORM\Room;
use App\ORM\DayRate;
use App\ORM\Product;
use App\ORM\ProductAlias;
use App\ORM\Venue;
use App\Types\CProduct;

class Products {

  public $badAssetData = ['id' => 1, 'token' => null];
  public $badDayRateData = ['asset_id' => 1];
  public $assetData = ['id' => 1, 'token' => '01111111122222223333333444444440'];
  public $venue = ['id' => 2, 'currency' => 'GBP', 'minimum_minutes' => 120];
  public $meetingRoomNoHourly = ['id' => 2, 'asset_id' => 1, 'primary_vertical_id' => 1];
  public $office = ['id' => 9, 'asset_id' => 8, 'primary_vertical_id' => 2];
  public $meetingRoomHourly = ['id' => 2, 'asset_id' => 1, 'listing_hourly_rate' => 12.34, 'primary_vertical_id' => 1];
  public $dayRate = ['asset_id' => 1, 'standard_day_rate' => 13.24, 'token_root' => '011122223333444455556666777788'];
  public $monthRate = ['asset_id' => 8, 'monthly_price' => 1634, 'token_root' => '011122223333444455556666777788'];
  public $halfDayFirst = ['asset_id' => 1, 'halfday_rate_first' => 13.24, 'token_root' => '011122223333444455556666777788', 'half_day_time_first_start' => 720, 'half_day_time_first_end' => 900];
  public $halfDaySecond = ['asset_id' => 1, 'halfday_rate_second' => 15.24, 'token_root' => '011122223333444455556666777788', 'half_day_time_second_start' => 960, 'half_day_time_second_end' => 1240];
  public $twoSpanNotHalfDay = ['asset_id' => 1, 'halfday_rate_first' => 13.24, 'halfday_rate_second' => 15.24, 'token_root' => '011122223333444455556666777788', 'half_day_time_first_start' => 720, 'half_day_time_first_end' => 900, 'half_day_time_second_start' => 960, 'half_day_time_second_end' => 1240];
  public $halfDay = ['asset_id' => 1, 'halfday_rate_first' => 13.24, 'halfday_rate_second' => 13.24, 'token_root' => '011122223333444455556666777788', 'half_day_time_first_start' => 720, 'half_day_time_first_end' => 900, 'half_day_time_second_start' => 960, 'half_day_time_second_end' => 1240];
  public $combinedNotHalfDay = ['asset_id' => 1, 'standard_day_rate' => 13.24, 'halfday_rate_first' => 13.24, 'halfday_rate_second' => 15.24, 'token_root' => '011122223333444455556666777788', 'half_day_time_first_start' => 720, 'half_day_time_first_end' => 900, 'half_day_time_second_start' => 960, 'half_day_time_second_end' => 1240];
  public $combinedHalfDay = ['asset_id' => 1, 'standard_day_rate' => 13.24, 'halfday_rate_first' => 13.24, 'halfday_rate_second' => 13.24, 'token_root' => '011122223333444455556666777788', 'half_day_time_first_start' => 720, 'half_day_time_first_end' => 900, 'half_day_time_second_start' => 960, 'half_day_time_second_end' => 1240];
  public $halfDayAlias = [['id' => 3, 'internal' => '01112222333344445555666677778801', 'external' => '01232123212321232123212321223210']];
  public $hourlyAlias = [['id' => 7, 'internal' => '04444444433333332222222111111110', 'external' => '01232123212321232123212321223219']];
  public $monthlyAlias = [['id' => 7, 'internal' => '01112222333344445555666677778804', 'external' => '01232123212321232123212321223220']];
  public $notHalfDayAliases = [['id' => 3, 'internal' => '01112222333344445555666677778802', 'external' => '01232123212321232123212321223211'],['id' => 4, 'internal' => '01112222333344445555666677778803', 'external' => '01232123212321232123212321223212']];
  public $standaloneProducts = [['id' => "012332124324322546345f2346323450", 'asset_id' => 1, 'json' => '{"id":{"value":"012332124324322546345f2346323450"},"coverage":"ALLIN","unitPrice":{"value":12.34,"currency":"GBP"},"unit":"HOUR","context":{"schedule":{"days":[{"spans":[{"start":1240,"end":1380}]}]}}}']];
  public $mixedProducts = [['id' => "012332124324322546345f2346323450", 'asset_id' => 1, 'json' => '{"id":{"value":"012332124324322546345f2346323450"},"coverage":"ALLIN","unitPrice":{"value":16.34,"currency":"GBP"},"unit":"HOUR","context":{"schedule":{"days":[{"spans":[{"start":1240,"end":1380}]}]}}}'],['id' => "04444444433333332222222111111110", 'asset_id' => 1, 'json' => '{"coverage":"ALLIN","context":{"schedule":{"days":[{"spans":[{"start":900,"end":1150}]}]}}}']];
  public $mixedAliasProducts = [['id' => "012332124324322546345f2346323450", 'asset_id' => 1, 'json' => '{"id":{"value":"012332124324322546345f2346323450"},"coverage":"ALLIN","unitPrice":{"value":16.34,"currency":"GBP"},"unit":"HOUR","context":{"schedule":{"days":[{"spans":[{"start":1240,"end":1380}]}]}}}'],['id' => "01232123212321232123212321223219", 'asset_id' => 1, 'json' => '{"coverage":"ALLIN","context":{"schedule":{"days":[{"spans":[{"start":900,"end":1150}]}]}}}']];

  public $resultData = [
    'meetingHourly' => '{"collection":[{"id":{"value":"04444444433333332222222111111110"},"coverage":"ALLIN","unitPrice":{"value":12.34,"currency":"GBP"},"unit":"HOUR"}]}',
    'meetingDaily' => '{"collection":[{"id":{"value":"01112222333344445555666677778800"},"coverage":"ALLIN","unitPrice":{"value":13.24,"currency":"GBP"},"unit":"DAY"}]}',
    'meetingHourlyAndDaily' => '{"collection":[{"id":{"value":"04444444433333332222222111111110"},"coverage":"ALLIN","unitPrice":{"value":12.34,"currency":"GBP"},"unit":"HOUR"},{"id":{"value":"01112222333344445555666677778800"},"coverage":"ALLIN","unitPrice":{"value":13.24,"currency":"GBP"},"unit":"DAY"}]}',
    'meetingCustomFirst' => '{"collection":[{"id":{"value":"01112222333344445555666677778802"},"coverage":"ALLIN","unitPrice":{"value":13.24,"currency":"GBP"},"unit":"HOUR","context":{"schedule":{"days":[{"spans":[{"start":720,"end":900}]}]}}}]}',
    'meetingCustomSecond' => '{"collection":[{"id":{"value":"01112222333344445555666677778803"},"coverage":"ALLIN","unitPrice":{"value":15.24,"currency":"GBP"},"unit":"HOUR","context":{"schedule":{"days":[{"spans":[{"start":960,"end":1240}]}]}}}]}',
    'meetingTwoSpanNotHalfDay' => '{"collection":[{"id":{"value":"01112222333344445555666677778802"},"coverage":"ALLIN","unitPrice":{"value":13.24,"currency":"GBP"},"unit":"HOUR","context":{"schedule":{"days":[{"spans":[{"start":720,"end":900}]}]}}},{"id":{"value":"01112222333344445555666677778803"},"coverage":"ALLIN","unitPrice":{"value":15.24,"currency":"GBP"},"unit":"HOUR","context":{"schedule":{"days":[{"spans":[{"start":960,"end":1240}]}]}}}]}',
    'meetingHalfDay' => '{"collection":[{"id":{"value":"01112222333344445555666677778801"},"coverage":"ALLIN","unitPrice":{"value":13.24,"currency":"GBP"},"unit":"HOUR","context":{"schedule":{"days":[{"spans":[{"start":720,"end":900},{"start":960,"end":1240}]}]}}}]}',
    'meetingCombinedNotHalfDay' => '{"collection":[{"id":{"value":"04444444433333332222222111111110"},"coverage":"ALLIN","unitPrice":{"value":12.34,"currency":"GBP"},"unit":"HOUR"},{"id":{"value":"01112222333344445555666677778800"},"coverage":"ALLIN","unitPrice":{"value":13.24,"currency":"GBP"},"unit":"DAY"},{"id":{"value":"01112222333344445555666677778802"},"coverage":"ALLIN","unitPrice":{"value":13.24,"currency":"GBP"},"unit":"HOUR","context":{"schedule":{"days":[{"spans":[{"start":720,"end":900}]}]}}},{"id":{"value":"01112222333344445555666677778803"},"coverage":"ALLIN","unitPrice":{"value":15.24,"currency":"GBP"},"unit":"HOUR","context":{"schedule":{"days":[{"spans":[{"start":960,"end":1240}]}]}}}]}',
    'meetingCombinedHalfDay' => '{"collection":[{"id":{"value":"04444444433333332222222111111110"},"coverage":"ALLIN","unitPrice":{"value":12.34,"currency":"GBP"},"unit":"HOUR"},{"id":{"value":"01112222333344445555666677778800"},"coverage":"ALLIN","unitPrice":{"value":13.24,"currency":"GBP"},"unit":"DAY"},{"id":{"value":"01112222333344445555666677778801"},"coverage":"ALLIN","unitPrice":{"value":13.24,"currency":"GBP"},"unit":"HOUR","context":{"schedule":{"days":[{"spans":[{"start":720,"end":900},{"start":960,"end":1240}]}]}}}]}',
    'meetingCombinedHalfDayWithAlias' => '{"collection":[{"id":{"value":"04444444433333332222222111111110"},"coverage":"ALLIN","unitPrice":{"value":12.34,"currency":"GBP"},"unit":"HOUR"},{"id":{"value":"01112222333344445555666677778800"},"coverage":"ALLIN","unitPrice":{"value":13.24,"currency":"GBP"},"unit":"DAY"},{"id":{"value":"01232123212321232123212321223210"},"coverage":"ALLIN","unitPrice":{"value":13.24,"currency":"GBP"},"unit":"HOUR","context":{"schedule":{"days":[{"spans":[{"start":720,"end":900},{"start":960,"end":1240}]}]}}}]}',
    'meetingCombinedNotHalfDayWithAlias' => '{"collection":[{"id":{"value":"04444444433333332222222111111110"},"coverage":"ALLIN","unitPrice":{"value":12.34,"currency":"GBP"},"unit":"HOUR"},{"id":{"value":"01112222333344445555666677778800"},"coverage":"ALLIN","unitPrice":{"value":13.24,"currency":"GBP"},"unit":"DAY"},{"id":{"value":"01232123212321232123212321223211"},"coverage":"ALLIN","unitPrice":{"value":13.24,"currency":"GBP"},"unit":"HOUR","context":{"schedule":{"days":[{"spans":[{"start":720,"end":900}]}]}}},{"id":{"value":"01232123212321232123212321223212"},"coverage":"ALLIN","unitPrice":{"value":15.24,"currency":"GBP"},"unit":"HOUR","context":{"schedule":{"days":[{"spans":[{"start":960,"end":1240}]}]}}}]}',
    'meetingHalfDayWithAliasAndNewProduct' => '{"collection":[{"id":{"value":"01112222333344445555666677778801"},"coverage":"ALLIN","unitPrice":{"value":13.24,"currency":"GBP"},"unit":"HOUR","context":{"schedule":{"days":[{"spans":[{"start":720,"end":900},{"start":960,"end":1240}]}]}}}]}',
    'meetingCombinedHalfDayWithAliasAndNewProduct' => '{"collection":[{"id":{"value":"012332124324322546345f2346323450"},"coverage":"ALLIN","unitPrice":{"value":12.34,"currency":"GBP"},"unit":"HOUR","context":{"schedule":{"days":[{"spans":[{"start":1240,"end":1380}]}]}}},{"id":{"value":"04444444433333332222222111111110"},"coverage":"ALLIN","unitPrice":{"value":12.34,"currency":"GBP"},"unit":"HOUR"},{"id":{"value":"01112222333344445555666677778800"},"coverage":"ALLIN","unitPrice":{"value":13.24,"currency":"GBP"},"unit":"DAY"},{"id":{"value":"01232123212321232123212321223210"},"coverage":"ALLIN","unitPrice":{"value":13.24,"currency":"GBP"},"unit":"HOUR","context":{"schedule":{"days":[{"spans":[{"start":720,"end":900},{"start":960,"end":1240}]}]}}}]}',
    'meetingHourlyWithProductComposition' => '{"collection":[{"id":{"value":"012332124324322546345f2346323450"},"coverage":"ALLIN","unitPrice":{"value":16.34,"currency":"GBP"},"unit":"HOUR","context":{"schedule":{"days":[{"spans":[{"start":1240,"end":1380}]}]}}},{"id":{"value":"04444444433333332222222111111110"},"coverage":"ALLIN","unitPrice":{"value":12.34,"currency":"GBP"},"unit":"HOUR","context":{"schedule":{"days":[{"spans":[{"start":900,"end":1150}]}]}}}]}',
    'meetingHourlyWithAliasAndProductComposition' => '{"collection":[{"id":{"value":"012332124324322546345f2346323450"},"coverage":"ALLIN","unitPrice":{"value":16.34,"currency":"GBP"},"unit":"HOUR","context":{"schedule":{"days":[{"spans":[{"start":1240,"end":1380}]}]}}},{"id":{"value":"01232123212321232123212321223219"},"coverage":"ALLIN","unitPrice":{"value":12.34,"currency":"GBP"},"unit":"HOUR","context":{"schedule":{"days":[{"spans":[{"start":900,"end":1150}]}]}}}]}',
    'officeMonthlyWithAlias' => '{"collection":[{"id":{"value":"01232123212321232123212321223220"},"coverage":"ALLIN","unitPrice":{"value":1634,"currency":"GBP"},"unit":"MONTH"}]}',
  ];

  public function badAsset() {
    return new Asset($this->badAssetData);
  }

  public function badDayRate() {
    return new DayRate($this->badDayRateData);
  }

  public function roomWithHourly() {
    return new Room($this->meetingRoomHourly);
  }

  public function anyVenue() {
    return new Venue($this->venue);
  }

  public function fetchHourly() {
    return $this->generateTestArgs($this->resultData['meetingHourly'], $this->meetingRoomHourly);
  }

  public function fetchDaily() {
    return $this->generateTestArgs($this->resultData['meetingDaily'], $this->meetingRoomNoHourly, $this->venue, $this->dayRate);
  }

  public function fetchHourlyAndDaily() {
    return $this->generateTestArgs($this->resultData['meetingHourlyAndDaily'], $this->meetingRoomHourly, $this->venue, $this->dayRate);
  }

  public function fetchCustomFirst() {
    return $this->generateTestArgs($this->resultData['meetingCustomFirst'], $this->meetingRoomNoHourly, $this->venue, $this->halfDayFirst);
  }

  public function fetchCustomSecond() {
    return $this->generateTestArgs($this->resultData['meetingCustomSecond'], $this->meetingRoomNoHourly, $this->venue, $this->halfDaySecond);
  }

  public function fetchTwoSpanNotHalfDay() {
    return $this->generateTestArgs($this->resultData['meetingTwoSpanNotHalfDay'], $this->meetingRoomNoHourly, $this->venue, $this->twoSpanNotHalfDay);
  }

  public function fetchHalfDay() {
    return $this->generateTestArgs($this->resultData['meetingHalfDay'], $this->meetingRoomNoHourly, $this->venue, $this->halfDay);
  }

  public function fetchCombinedNotHalfDay() {
    return $this->generateTestArgs($this->resultData['meetingCombinedNotHalfDay'], $this->meetingRoomHourly, $this->venue, $this->combinedNotHalfDay);
  }

  public function fetchCombinedHalfDay() {
    return $this->generateTestArgs($this->resultData['meetingCombinedHalfDay'], $this->meetingRoomHourly, $this->venue, $this->combinedHalfDay);
  }

  public function fetchCombinedHalfDayWithAlias() {
    return $this->generateTestArgs($this->resultData['meetingCombinedHalfDayWithAlias'], $this->meetingRoomHourly, $this->venue, $this->combinedHalfDay, [], $this->halfDayAlias);
  }

  public function fetchCombinedNotHalfDayWithAlias() {
    return $this->generateTestArgs($this->resultData['meetingCombinedNotHalfDayWithAlias'], $this->meetingRoomHourly, $this->venue, $this->combinedNotHalfDay, [], $this->notHalfDayAliases);
  }

  public function fetchCombinedHalfDayWithAliasAndNewProduct() {
    return $this->generateTestArgs($this->resultData['meetingCombinedHalfDayWithAliasAndNewProduct'], $this->meetingRoomHourly, $this->venue, $this->combinedHalfDay, $this->standaloneProducts, $this->halfDayAlias);
  }

  public function fetchMeetingHourlyWithProductComposition() {
    return $this->generateTestArgs($this->resultData['meetingHourlyWithProductComposition'], $this->meetingRoomHourly, $this->venue, null, $this->mixedProducts);
  }

  public function fetchMeetingHourlyWithAliasAndProductComposition() {
    return $this->generateTestArgs($this->resultData['meetingHourlyWithAliasAndProductComposition'], $this->meetingRoomHourly, $this->venue, null, $this->mixedAliasProducts, $this->hourlyAlias);
  }

  public function fetchOfficeMonthlyWithAlias() {
    return $this->generateTestArgs($this->resultData['officeMonthlyWithAlias'], $this->office, $this->venue, $this->monthRate, [], $this->monthlyAlias);
  }

  private function generateTestArgs($resultJson, $room = null, $venue = null, $day = null, $products = [], $aliases = []) {
    $results = new CProduct();
    $results->mergeFromJsonString($resultJson);
    return [
      new Asset($this->assetData),
      $room ? new Room($room) : new Room($this->meetingRoomHourly),
      $venue ? new Venue($venue) : new Venue($this->venue),
      $this->generateProductCollection($products),
      $this->generateAliasesCollection($aliases),
      $day ? new DayRate($day) : null,
      $results
    ];
  }

  private function generateProductCollection($data) {
    return collect($data)->map(function ($itemData) { return new Product($itemData); });
  }

  private function generateAliasesCollection($data) {
    return collect($data)->map(function ($itemData) { return new ProductAlias($itemData); });
  }
}
