<?php

namespace App\Zipcube\HandlesAssets\Persistence;

use Illuminate\Support\Collection;

use App\ORM\Asset;
use App\ORM\Room;
use App\ORM\Venue;
use App\ORM\Vertical;
use App\ORM\Configuration;
use App\ORM\Tag;
use App\ORM\VenueType;
use App\ORM\Amenity;
use App\ORM\OfficeType;
use App\ORM\AssetTag;

class AssetTags
{
  public function runTagGeneration($assetId)
  {
    $asset = Asset::find($assetId)->with([
      'amenities',
      'asset_configurations'
    ]);
    $room = Room::where('asset_id', $assetId)->first();
    if ($room)
    {
      $venue = $room->venue;
      $amenities = $asset->amenities->where('available', 1);
      $configs = $asset->asset_configurations;
      return $this->generateTags($asset, $room, $venue, $amenities, $configs);
    }
    return null;
  }

  public function generateTags(Asset $asset, Room $room, Venue $venue, Collection $amenities, Collection $configs)
  {
    $tags = collect([]);
    if ($room->primary_vertical_id == Vertical::MEETING)
    {
      $tags = $this->generateMeetingTags($asset, $venue, $amenities, $configs);
    }
    elseif ($room->primary_vertical_id == Vertical::OFFICE)
    {
      $tags = $this->generateOfficeTags($asset, $room, $venue);
    }
    elseif ($room->primary_vertical_id == Vertical::PARTY)
    {
      $tags = $this->generatePartyTags($asset, $venue, $configs);
    }
    elseif ($room->primary_vertical_id == Vertical::DINING)
    {
      $tags = $this->generateDiningTags($asset, $venue);
    }
    elseif ($room->primary_vertical_id == Vertical::WEDDING)
    {
      $tags = $this->generateWeddingTags($asset);
    }
    return $tags;
  }

  private function generateMeetingTags($asset, $venue, $amenities, $configs)
  {
    $basicTags = collect([]);
    $basicTags->push($this->as($asset, Tag::MEETING));
    if ($this->isInGermany($venue))
    {
      $basicTags->push($this->as($asset, Tag::TAGUNGSRAUM));
      if ($this->isGermanHotel($venue))
      {
        $basicTags->push($this->as($asset, Tag::TAGUNGSHOTEL));
      }
    }
    $assetTagsByConfig = $this->useConfigs($asset, $venue, $amenities, $configs);
    return $basicTags->merge($assetTagsByConfig);
  }

  private function generateOfficeTags($asset, $room, $venue)
  {
    $basicTags = collect([]);
    $basicTags->push($this->as($asset, Tag::OFFICE_SPACE));
    if ($venue->venue_type_id == VenueType::COWORKING_SPACE)
    {
      $basicTags->push($this->as($asset, Tag::COWORKING_SPACE));
    }
    $assetTagsByOfficeType = $this->useOfficeTypes($asset, $room);
    return $basicTags->merge($assetTagsByOfficeType);
  }

  private function generatePartyTags($asset, $venue, $configs)
  {
    $basicTags = collect([]);
    $basicTags->push($this->as($asset, Tag::PARTY));
    if ($this->isInGermany($venue))
    {
      $basicTags->push($this->as($asset, Tag::EVENTLOCATION));
    }
    foreach ($configs as $config)
    {
      if ($config->max_capacity >= 200)
      {
        $basicTags->push($this->as($asset, Tag::HALL));
      }
    }
    $assetTagsByVenueType = $this->useVenueTypes($asset, $venue);
    return $basicTags->merge($assetTagsByVenueType);
  }

  private function generateDiningTags($asset, $venue)
  {
    $basicTags = collect([]);
    $basicTags->push($this->as($asset, Tag::DINING));
    if ($venue->venue_type_id == VenueType::RESTAURANT)
    {
      $basicTags->push($this->as($asset, Tag::RESTAURANT));
    }
    return $basicTags;
  }

  private function generateWeddingTags($asset)
  {
    $basicTags = collect([]);
    $basicTags->push($this->as($asset, Tag::WEDDING));
    return $basicTags;
  }

  private function isInGermany($venue)
  {
    return ($venue->country_code == 'DE');
  }

  private function isGermanHotel($venue)
  {
    return ($venue->country_code == 'DE' && $venue->venue_type_id == VenueType::HOTEL);
  }

  private function hasProjector($amenities)
  {
    return ($amenities->contains('amenity_id', Amenity::PROJECTOR));
  }

  private function useConfigs($asset, $venue, $amenities, $configs)
  {
    $configTags = collect([]);
    foreach ($configs as $config)
    {
      if ($config->max_capacity <= 4)
      {
        $configTags->push($this->as($asset, Tag::INTERVIEW_ROOM));
      }
      if ($config->configuration_id == Configuration::BOARDROOM)
      {
        $configTags->push($this->as($asset, Tag::BOARDROOM));
      }
      if ($config->configuration_id == Configuration::CLASSROOM)
      {
        $classroomTags = $this->hasClassroom($config, $asset, $venue);
        foreach ($classroomTags as $classroomTag)
        {
          $configTags->push($classroomTag);
        }
      }
      if ($config->configuration_id == Configuration::THEATRE)
      {
        $theatreTags = $this->hasTheatre($config, $asset, $amenities);
        foreach ($theatreTags as $theatreTag)
        {
          $configTags->push($theatreTag);
        }
      }
      if ($config->configuration_id == Configuration::U_SHAPED)
      {
        $uShapedTags = $this->hasUShaped($config, $asset, $venue, $amenities);
        foreach ($uShapedTags as $uShapedTag)
        {
          $configTags->push($uShapedTag);
        }
      }
      if ($config->configuration_id !== Configuration::RECEPTION)
      {
        $nonSeatedTags = $this->allNonSeated($config, $asset, $venue);
        foreach ($nonSeatedTags as $noSeatTag)
        {
          $configTags->push($noSeatTag);
        }
      }
    }
    return $configTags;
  }

  private function hasClassroom($config, $asset, $venue)
  {
    $classroomTags = collect([]);
    if ($config->max_capacity >= 8)
    {
      $classroomTags->push($this->as($asset, Tag::TRAINING_ROOM));
      if ($this->isGermanHotel($venue))
      {
        $classroomTags->push($this->as($asset, Tag::SEMINARHOTEL));
      }
    }
    return $classroomTags;
  }

  private function hasTheatre($config, $asset, $amenities)
  {
    $theatreTags = collect([]);
    if ($this->hasProjector($amenities))
    {
      $theatreTags->push($this->as($asset, Tag::PRESENTATION));
    }
    if ($config->max_capacity >= 50)
    {
      $theatreTags->push($this->as($asset, Tag::LECTURE_THEATRE));
      $theatreTags->push($this->as($asset, Tag::LECTURE));
      if ($config->max_capacity >= 100)
      {
        $theatreTags->push($this->as($asset, Tag::AUDITORIUM));
      }
    }
    return $theatreTags;
  }

  private function hasUShaped($config, $asset, $venue, $amenities)
  {
    $uShapedTags = collect([]);
    if ($this->hasProjector($amenities))
    {
      $uShapedTags->push($this->as($asset, Tag::PRESENTATION));
    }
    if ($config->max_capacity >= 8)
    {
      $uShapedTags->push($this->as($asset, Tag::TRAINING_ROOM));
      if ($this->isGermanHotel($venue))
      {
        $uShapedTags->push($this->as($asset, Tag::SEMINARHOTEL));
      }
    }
    return $uShapedTags;
  }

  private function allNonSeated($config, $asset, $venue)
  {
    $nonSeatedTags = collect([]);
    if ($config->max_capacity <= 40)
    {
      $nonSeatedTags->push($this->as($asset, Tag::MEETING_ROOMS));
    }
    else
    {
      $nonSeatedTags->push($this->as($asset, Tag::CONFERENCE_ROOM));
      if ($this->isGermanHotel($venue))
      {
        $nonSeatedTags->push($this->as($asset, Tag::KONFERENZ_HOTEL));
      }
      if ($config->max_capacity >= 100)
      {
        $nonSeatedTags->push($this->as($asset, Tag::CONFERENCE_CENTRE));
      }
    }
    return $nonSeatedTags;
  }

  private function useOfficeTypes($asset, $room)
  {
    $officeTypeTag = collect([]);
    if ($room->office_type_id == OfficeType::HOTDESK)
    {
      $officeTypeTag->push($this->as($asset, Tag::HOT_DESK));
    }
    elseif ($room->office_type_id == OfficeType::PRIVATEOFFICE)
    {
      $officeTypeTag->push($this->as($asset, Tag::PRIVATE_OFFICE));
    }
    return $officeTypeTag;
  }

  private function useVenueTypes($asset, $venue)
  {
    $venueTypeTag = collect([]);
    if ($venue->venue_type_id == VenueType::BAR)
    {
      $venueTypeTag->push($this->as($asset, Tag::BAR));
    }
    elseif ($venue->venue_type_id == VenueType::PUB)
    {
      $venueTypeTag->push($this->as($asset, Tag::PUB));
    }
    elseif ($venue->venue_type_id == VenueType::COCKTAIL_BAR)
    {
      $venueTypeTag->push($this->as($asset, Tag::COCKTAIL_BAR));
    }
    elseif ($venue->venue_type_id == VenueType::PENTHOUSE_VILLA)
    {
      $venueTypeTag->push($this->as($asset, Tag::PENTHOUSE));
    }
    return $venueTypeTag;
  }

  private function as($asset, $tag): AssetTag
  {
    return new AssetTag([
      'asset_id' => $asset->id,
      'tag_id' => $tag
    ]);
  }
}
