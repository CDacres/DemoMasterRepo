<?php

namespace App\Events;

use App\Events\Event;
use App\Models\Asset;
use App\Models\Pivots\AssetAmenity;

class AssetAmenityCopyEvent extends Event
{
    public function __construct(AssetAmenity $asset_amenity)
    {
        if ($asset_amenity->asset->asset_type->id == Asset::VENUE)
        {
            $room_asset_ids = $asset_amenity->asset->children->pluck('id')->toArray();
            foreach ($room_asset_ids as $room_asset)
            {
                if (AssetAmenity::where('amenity_id', $asset_amenity->amenity_id)->where('asset_id', $room_asset)->exists())
                {
                    $roomAmenity = AssetAmenity::where('amenity_id', $asset_amenity->amenity_id)->where('asset_id', $room_asset)->first();
                }
                else
                {
                    $roomAmenity = new AssetAmenity();
                    $roomAmenity->asset_id = $room_asset;
                    $roomAmenity->amenity_id = $asset_amenity->amenity_id;
                }
                $roomAmenity->name = (!is_null($asset_amenity->name)?$asset_amenity->name:null);
                $roomAmenity->cost = (!is_null($asset_amenity->cost)?$asset_amenity->cost:null);
                $roomAmenity->cost_exvat = (!is_null($asset_amenity->cost_exvat)?$asset_amenity->cost_exvat:null);
                $roomAmenity->instructions = (!is_null($asset_amenity->instructions)?$asset_amenity->instructions:null);
                $roomAmenity->available = $asset_amenity->available;
                $roomAmenity->allows_price = $asset_amenity->allows_price;
                $roomAmenity->amenity_type_id = $asset_amenity->amenity_type_id;
                $roomAmenity->save();
            }
        }
    }
}