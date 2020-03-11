<?php

namespace App\Zipcube\HandlesAssets\Persistence\MDT;

use App\Types\Id;

use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\Generics\AmenityProxy;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\Generics\HoursProxy;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\UsageProxy;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\VenueProxy;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\GroupProxy;
use App\Zipcube\HandlesAssets\Persistence\MD\ListingMD as MD;
use Illuminate\Support\Collection;

class DerivationMDT {

  public function mutateSpace(MD $directory, Id $id): void {
    $usage = $directory->use(MD::USAGE, ['token' => $id->getValue()]);
    $venue = $directory->use(MD::VENUEREF, ['id' => $usage->parent_id]);
    $directory->update(MD::USAGE, ['token' => $usage->getToken()], ['venue_id' => $venue->venue_id, 'currency' => $venue->currency ]);
    $hours = $directory->useCollection(MD::PARENTOHREF, ['asset_id' => $usage->parent_id]);
    $this->mutateForHours($hours, $directory, $usage);
    $amenities = $directory->useCollection(MD::PARENTAMENITYREF, ['asset_id' => $usage->parent_id]);
    $this->mutateForAmenities($amenities, $directory, $usage);
  }

  public function mutateVenue(MD $directory, Id $id): void {
    $this->handleVAT($directory, $id);
    $venue = $directory->use(MD::VENUE, ['token' => $id->getValue()]);
    if (!is_null($venue)) {
      $group = $directory->use(MD::GROUPREF, ['id' => $venue->parent_id]);
      if (!is_null($group)) {
        $this->mutateGroupVenue($directory, $group, $venue);
      }
    }
  }

  private function handleVAT(MD $directory, Id $id): void {
    $venue = $directory->use(MD::VENUE, ['token' => $id->getValue()]);
    $rate = $directory->use(MD::VATREF, ['country_code' => $venue->country_code]);
    $directory->upsert(MD::VENUE, ['id' => $venue->getId()],
      ['vat_rate_id' => (int)$rate->id]
    );
  }

  private function mutateGroupVenue(MD $directory, GroupProxy $group, VenueProxy $venue): void {
    $directory->upsert(MD::VENUE, ['id' => $venue->getId()],
      ['company_id' => (int)$group->company_id]
    );
  }

  public function mutateGroupVenues(MD $directory, Id $id): void {
    $group = $directory->use(MD::GROUP, ['token' => $id->getValue()]);
    $directory->useTouchedCollection(MD::VENUE, ['parent_id' => $group->getId()])->each(function (VenueProxy $venue) use($directory, $group) {
      $this->mutateGroupVenue($directory, $group, $venue);
    });
  }

  public function mutateVenueSpaces(MD $directory, Id $id): void {
    $venue = $directory->use(MD::VENUE, ['token' => $id->getValue()]);
    $directory->useTouchedCollection(MD::USAGE, ['venue_usage_token' => $id->getValue()])->each(function (UsageProxy $usage) use($directory, $venue) {
      $this->mutateVenueSpace($directory, $venue, $usage);
    });
    $directory->useCollection(MD::USAGE, ['venue_usage_token' => null, 'parent_id' => $venue->getId()])->each(function (UsageProxy $usage) use($directory, $venue) {
      $this->mutateVenueSpace($directory, $venue, $usage);
    });
  }

  private function mutateVenueSpace(MD $directory, VenueProxy $venue, UsageProxy $usage): void {
    $directory->update(MD::USAGE, ['token' => $usage->getToken()], ['venue_id' => $venue->venue_id, 'currency' => $venue->currency ]);
    $hours = $directory->useTouchedCollection(MD::HOUR, ['asset_id' => $usage->parent_id]);
    $this->mutateForHours($hours, $directory, $usage);
    $amenities = $directory->useTouchedCollection(MD::AMENITY, ['asset_id' => $usage->parent_id]);
    $this->mutateForAmenities($amenities, $directory, $usage);
  }

  private function mutateForHours(Collection $hours, MD $directory, UsageProxy $usage): void {
    $hours->each(function (HoursProxy $venueHour) use($directory, $usage) {
      $period = $directory->upsert(MD::HOUR, [
        'asset_id' => $usage->getId(),
        'day_id' => $venueHour->day_id,
        'start' => $venueHour->start,
        'end' => $venueHour->end ],
        ['enabled' => 1]);
      if (!is_null($usage->listing_hourly_rate)) {
        $directory->upsert(MD::HOURRATE,
          ['openingPeriod_id' => $period->id],
          ['price_per_hour' => (string)$usage->listing_hourly_rate, 'enabled' => 1]);
      }
    });
  }

  private function mutateForAmenities(Collection $amenities, MD $directory, UsageProxy $usage): void {
    $amenities->each(function (AmenityProxy $venueAmenity) use($directory, $usage) {
      $directory->ensure(MD::AMENITY, [
        'asset_id' => $usage->getId(),
        'amenity_id' => $venueAmenity->amenity_id
      ], [
        'available' => $venueAmenity->available,
      ], true);
      $directory->update(MD::AMENITY, [
        'asset_id' => $usage->getId(),
        'amenity_id' => $venueAmenity->amenity_id
      ], [
        'enabled' => $venueAmenity->enabled,
        'amenity_type_id' => $venueAmenity->amenity_type_id,
        'name' => $venueAmenity->name,
        'allows_price' => $venueAmenity->allows_price,
        'cost' => $venueAmenity->cost,
        'instructions' => $venueAmenity->instructions
      ]);
    });
  }
}
