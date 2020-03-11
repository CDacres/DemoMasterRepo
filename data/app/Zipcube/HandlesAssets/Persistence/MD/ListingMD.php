<?php

namespace App\Zipcube\HandlesAssets\Persistence\MD;

use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\Generics\AmenityProxy;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\Generics\ConfigProxy;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\Generics\TagProxy;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\Generics\DayRateProxy;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\Generics\HourRateProxy;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\Generics\HoursProxy;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\ImageProxy\ImageEdgeProxy;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\Generics\ProductAliasProxy;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\Generics\ProductProxy;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\GroupProxy;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\VenueProxy;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\UsageProxy;
use Illuminate\Support\Collection;
use App\Zipcube\HandlesAssets\Persistence\MD\ModelDirectory;

class ListingMD extends ModelDirectory {

  const GROUP = 'Groups';
  const VENUE = 'Venues';
  const USAGE = 'Usages';
  const CONFIG = 'Configurations';
  const TAG = 'Tags';
  const AMENITY = 'Amenities';
  const HOUR = 'OpeningHours';
  const HOURRATE = 'HourRates';
  const IMAGE = 'Images';
  const PRODUCT = 'Products';
  const PRODUCTALIAS = 'ProductAliases';
  const DAYRATE = 'DayRates';

  const AMENITYREF = 'AmenitiesReference';
  const PARENTOHREF = 'ParentHourReference';
  const PARENTAMENITYREF = 'ParentAmenityReference';
  const VENUEREF = 'VenueReference';
  const GROUPREF = 'GroupReference';
  const VATREF = 'VATReference';

  public function fetchModelMap(): Collection {
    return collect([
      self::GROUP => GroupProxy::class,
      self::VENUE => VenueProxy::class,
      self::USAGE => UsageProxy::class,
      self::CONFIG => ConfigProxy::class,
      self::TAG => TagProxy::class,
      self::AMENITY => AmenityProxy::class,
      self::HOUR => HoursProxy::class,
      self::HOURRATE => HourRateProxy::class,
      self::PRODUCT => ProductProxy::class,
      self::PRODUCTALIAS => ProductAliasProxy::class,
      self::DAYRATE => DayRateProxy::class,
      self::IMAGE => ImageEdgeProxy::class,
    ]);
  }
}
