<?php

namespace Tests\_Providers;

use App\Types\Address;
use App\Types\Asset;
use App\Types\AssetAmenityEdge;
use App\Types\AssetConfiguration;
use App\Types\CurrencyAmount;
use App\Types\DailyHours;
use App\Types\DaySpan;
use App\Types\Id;
use App\Types\Image;
use App\Types\ImageUrl;
use App\Types\LatLng;
use App\Types\Location;
use App\Types\Product;
use App\Types\ProductCategory;
use App\Types\ProductContext;
use App\Types\ProductPriceSchedule;
use App\Types\SpaceDetails;
use App\Types\VenueDetails;
use App\Types\Usage;

class DismantleAssets {

  public $room = [
    'data' => [
      'eAsset' => '{"id":1,"asset_type_id":3,"reference_id":1,"token":"ab12cde3456fgh7ij890kl1m23456789","parent_id":2}',
      'eRoomCollection' => '[{"id":1,"asset_id":1,"venue_id":1,"status":1,"usage_id":3}]',
      'eVenue' => '{"id":1,"asset_id":2,"venue_type_id":0}',
      'eProductCollection' => '[{"id":"01234567a8bc901de2fgh3456ijk78lm", "asset_id":1}]',
      'eProductAliasCollection' => '[]',
      'eDayRateCollection' => '[]',
      'eImageCollection' => '[{"id":10,"asset_id":1}]',
    ],
    'results' => [
      'eAsset' => '{"id":1,"asset_type_id":3,"reference_id":1,"token":"ab12cde3456fgh7ij890kl1m23456789","parent_id":2}',
      'aliasEAssetCollection' => '',
      'eCompany' => '',
      'eRoomCollection' => '[{"id":1,"asset_id":1,"venue_id":1,"status":1,"usage_id":3,"title":"Meeting room","desc":"This is the room description.","listing_hourly_rate": 98.76,"primary_vertical_id": 0}]',
      'eVenue' => '{"id":1,"asset_id":2,"venue_type_id":0,"currency":"GBP"}',
      'eProductCollection' => '[{"id":"01234567a8bc901de2fgh3456ijk78lm", "asset_id":1,"json": "{\"context\":{\"schedule\":{\"days\":[{\"day\":\"MONDAY\",\"spans\":[{\"start\":480,\"end\":1080}]},{\"day\":\"TUESDAY\",\"spans\":[{\"start\":480,\"end\":1080}]},{\"day\":\"WEDNESDAY\",\"spans\":[{\"start\":480,\"end\":1080}]},{\"day\":\"THURSDAY\",\"spans\":[{\"start\":480,\"end\":1080}]},{\"day\":\"FRIDAY\",\"spans\":[{\"start\":480,\"end\":1080}]}]}}}"}]',
      'eProductAliasCollection' => '[{"asset_id":1,"external":"01234567a8bc901de2fgh3456ijk78lm","internal":"98765432m1lk098ji7hgf6543edc21ba"}]',
      'eDayRateCollection' => '',
      'eOpeningPeriodCollection' => '[{"asset_id":1,"day_id":1,"start":480,"end":1080},{"asset_id":1,"day_id":2,"start":480,"end":1080},{"asset_id":1,"day_id":3,"start":480,"end":1080},{"asset_id":1,"day_id":4,"start":480,"end":1080},{"asset_id":1,"day_id":5,"start":480,"end":1080}]',
      'eImageCollection' => '[{"id":10,"asset_id":1}]',
    ],
  ];

  public $venue = [
    'data' => [
      'eAsset' => '{"id":1,"asset_type_id":2,"reference_id":1,"token":"ab12cde3456fgh7ij890kl1m23456789"}',
      'aliasEAssetCollection' => '[{"id":2,"asset_type_id":3,"reference_id":2,"token":"zy12xwv3456uts7rq890po1n23456789"},{"id":3,"asset_type_id":3,"reference_id":3,"token":"qw12ert3456yui7op890as1d23456789"}]',
      'eRoomCollection' => '[{"id":1,"asset_id":2,"venue_id":1,"status":1,"usage_id":3},{"id":2,"asset_id":3,"venue_id":1,"status":1,"usage_id":12,"primary_vertical_id":1}]',
      'eVenue' => '{"id":1,"asset_id":1,"venue_type_id":0}',
      'eProductCollection' => '[{"id":"01234567a8bc901de2fgh3456ijk78lm", "asset_id":2},{"id":"98765432z1yx098wv7uts6543rqp21on", "asset_id":3}]',
      'eProductAliasCollection' => '[]',
      'eDayRateCollection' => '[]',
      'eImageCollection' => '[{"id":10,"asset_id":1},{"id":11,"asset_id":2}]',
      'eAssetAmenityCollection' => '[{"id":1,"asset_id":1,"amenity_id":15}]',
    ],
    'results' => [
      'eAsset' => '{"id":1,"asset_type_id":2,"reference_id":1,"token":"ab12cde3456fgh7ij890kl1m23456789"}',
      'aliasEAssetCollection' => '[{"id":2,"asset_type_id":3,"reference_id":2,"token":"zy12xwv3456uts7rq890po1n23456789"},{"id":3,"asset_type_id":3,"reference_id":3,"token":"qw12ert3456yui7op890as1d23456789"}]',
      'eCompany' => '',
      'eRoomCollection' => '[{"id":1,"asset_id":2,"venue_id":1,"status":1,"usage_id":3,"listing_hourly_rate":98.76,"title": "Product Usage 1", "desc": "This is the usage description.", "primary_vertical_id": 0},{"id":2,"asset_id":3,"venue_id":1,"status":1,"usage_id":12,"listing_hourly_rate":54.32,"primary_vertical_id": 1,"listing_hourly_rate": 54.32,"title": "","desc": ""}]',
      'eVenue' => '{"id":1,"asset_id":1,"venue_type_id":"5","currency":"GBP","lat":51.5074,"long":-0.1278,"address":"123 Fake Street, East Finchester Green, AB1 2CD","street_number":"123","road":"Fake Street","country":"United Kingdom","country_code":"GB","city":"London","town":"East Finchester Green","county":"Greater London","post_code":"AB1 2CD","transport":"","name":"Meeting venue","description":"This is the venue description.","website":"http://www.assettest.com"}',
      'eProductCollection' => '[{"id":"01234567a8bc901de2fgh3456ijk78lm","asset_id":2,"json":"{\"context\":{\"schedule\":{\"days\":[{\"day\":\"MONDAY\",\"spans\":[{\"start\":480,\"end\":1080}]},{\"day\":\"TUESDAY\",\"spans\":[{\"start\":480,\"end\":1080}]},{\"day\":\"WEDNESDAY\",\"spans\":[{\"start\":480,\"end\":1080}]},{\"day\":\"THURSDAY\",\"spans\":[{\"start\":480,\"end\":1080}]},{\"day\":\"FRIDAY\",\"spans\":[{\"start\":480,\"end\":1080}]}]}}}"},{"id":"98765432z1yx098wv7uts6543rqp21on","asset_id":3,"json":"{\"context\":{\"schedule\":{\"days\":[{\"day\":\"MONDAY\",\"spans\":[{\"start\":540,\"end\":1020}]},{\"day\":\"TUESDAY\",\"spans\":[{\"start\":540,\"end\":1020}]},{\"day\":\"WEDNESDAY\",\"spans\":[{\"start\":540,\"end\":1020}]},{\"day\":\"THURSDAY\",\"spans\":[{\"start\":540,\"end\":1020}]},{\"day\":\"FRIDAY\",\"spans\":[{\"start\":540,\"end\":1020}]}]}}}"}]',
      'eProductAliasCollection' => '[{"asset_id":2,"external":"01234567a8bc901de2fgh3456ijk78lm","internal":"98765432n1op098qr7stu6543vwx21yz"},{"asset_id":3,"external":"98765432z1yx098wv7uts6543rqp21on","internal":"98765432d1sa098po7iuy6543tre21wq"}]',
      'eDayRateCollection' => '',
      'eOpeningPeriodCollection' => '[{"asset_id":1,"day_id":1,"start":480,"end":1080},{"asset_id":1,"day_id":2,"start":480,"end":1080},{"asset_id":1,"day_id":3,"start":480,"end":1080},{"asset_id":1,"day_id":4,"start":480,"end":1080},{"asset_id":1,"day_id":5,"start":480,"end":1080},{"asset_id":2,"day_id":1,"start":480,"end":1080},{"asset_id":2,"day_id":2,"start":480,"end":1080},{"asset_id":2,"day_id":3,"start":480,"end":1080},{"asset_id":2,"day_id":4,"start":480,"end":1080},{"asset_id":2,"day_id":5,"start":480,"end":1080},{"asset_id":3,"day_id":1,"start":540,"end":1020},{"asset_id":3,"day_id":2,"start":540,"end":1020},{"asset_id":3,"day_id":3,"start":540,"end":1020},{"asset_id":3,"day_id":4,"start":540,"end":1020},{"asset_id":3,"day_id":5,"start":540,"end":1020}]',
      'eImageCollection' => '[{"id":10,"asset_id":1},{"id":11,"asset_id":2}]',
      'eAssetAmenityCollection' => '[{"id":1,"asset_id":1,"amenity_id":15,"instructions":"Test Amenity 1","available":true,"cost":12.34},{"asset_id":3,"amenity_id":"16","instructions":"Test Amenity 2","available":true,"cost":56.78}]',
      'eAssetConfigurationCollection' => '[{"asset_id":3,"max_capacity":45,"configuration_id":7}]',
    ],
  ];

  public $badAsset = [
    'data' => [
      'eAsset' => '{"id":1,"token":null}',
    ],
  ];

  private function buildAsset($assetType) {
    $daySpan1 = new DaySpan(['start' => 480,'end' => 1080]);
    $daySpan2 = new DaySpan(['start' => 540,'end' => 1020]);
    $dailyHours1 = new DailyHours(['day' => 2, 'spans' => [$daySpan1]]);
    $dailyHours2 = new DailyHours(['day' => 3, 'spans' => [$daySpan1]]);
    $dailyHours3 = new DailyHours(['day' => 4, 'spans' => [$daySpan1]]);
    $dailyHours4 = new DailyHours(['day' => 5, 'spans' => [$daySpan1]]);
    $dailyHours5 = new DailyHours(['day' => 6, 'spans' => [$daySpan1]]);
    $dailyHours6 = new DailyHours(['day' => 2, 'spans' => [$daySpan2]]);
    $dailyHours7 = new DailyHours(['day' => 3, 'spans' => [$daySpan2]]);
    $dailyHours8 = new DailyHours(['day' => 4, 'spans' => [$daySpan2]]);
    $dailyHours9 = new DailyHours(['day' => 5, 'spans' => [$daySpan2]]);
    $dailyHours10 = new DailyHours(['day' => 6, 'spans' => [$daySpan2]]);
    $schedule1 = new ProductPriceSchedule(['days' => [$dailyHours1, $dailyHours2, $dailyHours3, $dailyHours4, $dailyHours5]]);
    $schedule2 = new ProductPriceSchedule(['days' => [$dailyHours6, $dailyHours7, $dailyHours8, $dailyHours9, $dailyHours10]]);
    $amenity1 = new AssetAmenityEdge([
      'amenityId' => new Id(['value' => '15']),
      'price' => new CurrencyAmount(['value' => 12.34, 'currency' => 1]),
      'note' => 'Test Amenity 1',
    ]);
    $amenity2 = new AssetAmenityEdge([
      'amenityId' => new Id(['value' => '16']),
      'price' => new CurrencyAmount(['value' => 56.78, 'currency' => 1]),
      'note' => 'Test Amenity 2',
    ]);
    $productContext1 = new ProductContext(['schedule' => $schedule1]);
    $productContext2 = new ProductContext(['schedule' => $schedule2]);
    $assetContext = new ProductContext(['website' => 'http://www.assettest.com', 'schedule' => $schedule1, 'amenities' => [$amenity1]]);
    $usageContext = new ProductContext(['configurations' => [new AssetConfiguration(['maxPax' => 45, 'kind' => 7])],'amenities' => [$amenity2]]);
    $product1 = new Product([
      'id' => new Id(['value' => '01234567a8bc901de2fgh3456ijk78lm']),
      'unitPrice' => new CurrencyAmount(['value' => 98.76, 'currency' => 1]),
      'unit' => 8,
      'coverage' => 1,
      'context' => $productContext1,
    ]);
    $product2 = new Product([
      'id' => new Id(['value' => '98765432z1yx098wv7uts6543rqp21on']),
      'unitPrice' => new CurrencyAmount(['value' => 54.32, 'currency' => 1]),
      'unit' => 8,
      'coverage' => 1,
      'context' => $productContext2,
    ]);
    $usage1 = new Usage(['products' => [$product1], 'name' => 'Product Usage 1', 'description' => 'This is the usage description.']);
    $usage2 = new Usage(['products' => [$product2], 'context' => $usageContext, 'category' => ProductCategory::MEETING]);
    $imageUrl1 = new ImageUrl(['url' => 'https:\/\/test.image1.url.zipcube\/']);
    $imageUrl2 = new ImageUrl(['size' => 1, 'url' => 'https:\/\/test.image1.url.zipcube\/190_120_']);
    $imageUrl3 = new ImageUrl(['size' => 2, 'url' => 'https:\/\/test.image1.url.zipcube\/300_200_']);
    $imageUrl4 = new ImageUrl(['size' => 3, 'url' => 'https:\/\/test.image1.url.zipcube\/639_428_']);
    $imageUrl5 = new ImageUrl(['size' => 4, 'url' => 'https:\/\/test.image1.url.zipcube\/870_450_']);
    $imageUrl6 = new ImageUrl(['url' => 'https:\/\/test.image2.url.zipcube\/']);
    $imageUrl7 = new ImageUrl(['size' => 1, 'url' => 'https:\/\/test.image2.url.zipcube\/190_120_']);
    $imageUrl8 = new ImageUrl(['size' => 2, 'url' => 'https:\/\/test.image2.url.zipcube\/300_200_']);
    $imageUrl9 = new ImageUrl(['size' => 3, 'url' => 'https:\/\/test.image2.url.zipcube\/639_428_']);
    $imageUrl10 = new ImageUrl(['size' => 4, 'url' => 'https:\/\/test.image2.url.zipcube\/870_450_']);
    $image1 = new Image([
      'id' => new Id(['value' => '10']),
      'type' => 1,
      'urls' => [$imageUrl1, $imageUrl2, $imageUrl3, $imageUrl4, $imageUrl5],
    ]);
    $image2 = new Image([
      'id' => new Id(['value' => '11']),
      'type' => 1,
      'urls' => [$imageUrl6, $imageUrl7, $imageUrl8, $imageUrl9, $imageUrl10],
    ]);
    $address = new Address([
      'formattedAddress' => '123 Fake Street, East Finchester Green, AB1 2CD',
      'streetNumber' => '123',
      'street' => 'Fake Street',
      'country' => 'United Kingdom',
      'countryCode' => 'GB',
      'city' => 'London',
      'town' => 'East Finchester Green',
      'county' => 'Greater London',
      'postcode' => 'AB1 2CD'
    ]);
    $coords = new LatLng(['lat' => 51.5074, 'lng' => -0.1278]);
    $location = new Location(['address' => $address, 'coords' => $coords]);
    $asset = new Asset([
      'id' => new Id(['value' => 'ab12cde3456fgh7ij890kl1m23456789']),
      'name' => 'Meeting ' . $assetType,
      'description' => 'This is the ' . $assetType . ' description.',
      'currency' => 1,
    ]);

    switch ($assetType) {
      case 'room':
        $asset->setSpaceDetails(new SpaceDetails(['styles' => []]))
              ->setUsages([$usage1])
              ->setImages([$image1]);
        break;
      case 'venue':
        $asset->setVenueDetails(new VenueDetails(['venueTypeId' => new Id(['value' => '5'])]))
              ->setLocation($location)
              ->setContext($assetContext)
              ->setUsages([$usage1, $usage2])
              ->setImages([$image1, $image2]);
        break;
    }
    return $asset;
  }

  public function fetchRoom() {
    return ([$this->buildAsset('room'), $this->room['data'], $this->room['results']]);
  }

  public function fetchVenue() {
    return ([$this->buildAsset('venue'), $this->venue['data'], $this->venue['results']]);
  }

  public function fetchBadAsset() {
    return ([new Asset(), $this->badAsset]);
  }
}
