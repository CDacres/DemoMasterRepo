<?php

namespace App\Jobs\Cron;

use App\Jobs\ExtendedJob as Job;
use Illuminate\Support\Facades\DB;

use App\Helpers\ChunkHelper;

use App\Models\Landing\Location;
use App\Models\Landing\LocationAsset;
use App\Models\Landing\LocationRoom;

class LocationAssetRoomCountInsert extends Job
{
    public $tries = 3;

    public function handle()
    {
        $this->_delete_current_location_rooms();
        $this->_delete_current_location_assets();
        $this->_get_room_venue_counts_by_location_and_tag();
    }

    private function _delete_current_location_rooms()
    {
        DB::table('location_rooms')->delete();
    }

    private function _delete_current_location_assets()
    {
        DB::table('location_asset')->delete();
    }

    private function _get_room_venue_counts_by_location_and_tag()
    {
        $rooms = $this->_getRoomCount();
        $this->_insertLocationRooms($rooms);
        $venues = $this->_getVenueCount();
        $this->_insertLocationAssetsAndUpdateLocations($venues);
    }

    private function _getRoomCount()
    {
        return DB::table('rooms')->join('asset_tag', 'rooms.asset_id', 'asset_tag.asset_id')
            ->join('tags', 'asset_tag.tag_id', 'tags.id')
            ->join('venues', 'rooms.venue_id', 'venues.id')
            ->join('locations', function($join) {
                $join->on('venues.country_code', 'locations.country')
                    ->on('venues.long', '>', 'locations.bounds_sw_lon')
                    ->on('venues.long', '<', 'locations.bounds_ne_lon')
                    ->on('venues.lat', '>', 'locations.bounds_sw_lat')
                    ->on('venues.lat', '<', 'locations.bounds_ne_lat');
            })->where('rooms.title', '<>', '')
            ->where('rooms.hidden', 0)
            ->where('rooms.status', 1)
            ->where('locations.in_sitemap', 1)
            ->where('rooms.enabled', 1)
            ->where('venues.enabled', 1)
            ->where('asset_tag.suppressed', 0)
            ->where('asset_tag.enabled', 1)
            ->where('tags.enabled', 1)
            ->where('locations.enabled', 1)
            ->groupBy('tags.id')
            ->groupBy('locations.id')
            ->select(DB::raw('COUNT(`rooms`.`id`) AS room_count, SUM((CASE WHEN `venues`.`approved` = 1 THEN `rooms`.`approved` ELSE 0 END)) AS approved_rooms, `tags`.`id` AS tag_id, `locations`.`id` AS location_id'))->get();
    }

    private function _insertLocationRooms($rooms)
    {
        $resultsObject = $this->_generateRoomsObject($rooms);
        $locRoomArr = $this->_calculateLocationRooms($resultsObject);
        (new ChunkHelper())->chunkInsert((new LocationRoom()), $locRoomArr);
    }

    private function _generateRoomsObject($rooms)
    {
        $roomTotal = [];
        $roomApproved = [];
        foreach ($rooms as $room)
        {
            $roomTotal = $this->_updateRoomTotals($roomTotal, $room);
            $roomApproved = $this->_updateRoomTotals($roomApproved, $room, true);
        }
        return [
            'roomTotal' => $roomTotal,
            'roomApproved' => $roomApproved
        ];
    }

    private function _updateRoomTotals($totalArr, $room, $approved = false)
    {
        if (!isset($totalArr[$room->location_id]))
        {
            $totalArr[$room->location_id] = [];
        }
        if (!isset($totalArr[$room->location_id][$room->tag_id]))
        {
            $totalArr[$room->location_id][$room->tag_id] = 0;
        }
        $totalArr[$room->location_id][$room->tag_id] += $approved ? $room->approved_rooms : $room->room_count;
        return $totalArr;
    }

    private function _calculateLocationRooms($resultsObject)
    {
        $locRoomArr = [];
        $roomTotal = $resultsObject['roomTotal'];
        $roomApproved = $resultsObject['roomApproved'];
        foreach ($roomTotal as $locationId => $tags)
        {
            foreach ($tags as $tagId => $total)
            {
                $approvedRoomCount = ((isset($roomApproved[$locationId][$tagId]))?$roomApproved[$locationId][$tagId]:0);
                $locRoomArr[] = [
                    'location_id' => $locationId,
                    'tag_id' => $tagId,
                    'approved_room_count' => $approvedRoomCount,
                    'unapproved_room_count' => ($total - $approvedRoomCount)
                ];
            }
        }
        return $locRoomArr;
    }

    private function _getVenueCount()
    {
        return DB::table('rooms')->join('venues', 'rooms.venue_id', 'venues.id')
            ->join('locations', function($join) {
                $join->on('venues.country_code', 'locations.country')
                    ->on('venues.long', '>', 'locations.bounds_sw_lon')
                    ->on('venues.long', '<', 'locations.bounds_ne_lon')
                    ->on('venues.lat', '>', 'locations.bounds_sw_lat')
                    ->on('venues.lat', '<', 'locations.bounds_ne_lat');
            })->where('rooms.title', '<>', '')
            ->where('rooms.hidden', 0)
            ->where('rooms.status', 1)
            ->where('locations.in_sitemap', 1)
            ->where('rooms.enabled', 1)
            ->where('venues.enabled', 1)
            ->where('locations.enabled', 1)
            ->groupBy('locations.id')
            ->select(DB::raw('COUNT(`rooms`.`venue_id`) AS venue_count, SUM(`venues`.`approved`) AS approved_venues, `locations`.`id` AS location_id'))->get();
    }

    private function _insertLocationAssetsAndUpdateLocations($venues)
    {
        $resultsObject = $this->_generateVenuesObject($venues);
        $locAssetArr = $this->_calculateLocationAssets($resultsObject);
        (new ChunkHelper())->chunkInsert((new LocationAsset()), $locAssetArr);
        Location::whereIn('id', $resultsObject['locations'])->update(['updated_date' => date("Y-m-d H:i:s")]);
    }

    private function _generateVenuesObject($venues)
    {
        $venueTotal = [];
        $venueApproved = [];
        $locArr = [];
        foreach ($venues as $venue)
        {
            $venueTotal = $this->_updateVenueTotals($venueTotal, $venue);
            $venueApproved = $this->_updateVenueTotals($venueApproved, $venue, true);
            $locArr[] = $venue->location_id;
        }
        return [
            'venueTotal' => $venueTotal,
            'venueApproved' => $venueApproved,
            'locations' => array_unique($locArr)
        ];
    }

    private function _updateVenueTotals($totalArr, $venue, $approved = false)
    {
        if (!isset($totalArr[$venue->location_id]))
        {
            $totalArr[$venue->location_id] = 0;
        }
        $totalArr[$venue->location_id] += $approved ? $venue->approved_venues : $venue->venue_count;
        return $totalArr;
    }

    private function _calculateLocationAssets($resultsObject)
    {
        $locAssetArr = [];
        $venueTotal = $resultsObject['venueTotal'];
        $venueApproved = $resultsObject['venueApproved'];
        foreach ($venueTotal as $locationId => $total)
        {
            $approvedVenueCount = ((isset($venueApproved[$locationId]))?$venueApproved[$locationId]:0);
            $locAssetArr[] = [
                'location_id' => $locationId,
                'approved_venue_count' => $approvedVenueCount,
                'unapproved_venue_count' => ($total - $approvedVenueCount)
            ];
        }
        return $locAssetArr;
    }
}