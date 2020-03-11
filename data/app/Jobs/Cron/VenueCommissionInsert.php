<?php

namespace App\Jobs\Cron;

use App\Jobs\ExtendedJob as Job;
use Illuminate\Support\Facades\DB;

use App\Helpers\ChunkHelper;

use App\Models\Booking\AssetCommission;

class VenueCommissionInsert extends Job
{
    public $tries = 3;

    public function handle()
    {
        $venueArr = $this->_get_venue_missing_commissions();
        $this->_insert_asset_commissions($venueArr);
    }

    private function _get_venue_missing_commissions()
    {
        return DB::table('venues')->leftJoin('asset_commissions', 'venues.asset_id', 'asset_commissions.asset_id')
            ->leftJoin('booking_channel_countries', 'venues.country_code', 'booking_channel_countries.country_code')
            ->where('venues.enabled', 1)
            ->whereNull('asset_commissions.asset_id')
            ->select(DB::raw('venues.asset_id, booking_channel_countries.booking_channel_id, booking_channel_countries.defaultCommission'))->get()->toArray();
    }

    private function _get_default_booking_channel_commissions()
    {
        return DB::table('booking_channels')
            ->where('booking_channels.enabled', 1)
            ->select(DB::raw('booking_channels.id, booking_channels.defaultCommission'))->get()->toArray();
    }

    private function _insert_asset_commissions($venueArr)
    {
        if (count($venueArr) > 0)
        {
            $insertCommArr = [];
            $defaultBCs = $this->_get_default_booking_channel_commissions();
            foreach ($venueArr as $venueObj)
            {
                if (is_null($venueObj->booking_channel_id))
                {
                    foreach ($defaultBCs as $defaultBC)
                    {
                        $insertCommArr[] = ['asset_id' => $venueObj->asset_id, 'bookingChannel_id' => $defaultBC->id, 'commissionPercentage' => $defaultBC->defaultCommission];
                    }
                }
                else
                {
                    $insertCommArr[] = ['asset_id' => $venueObj->asset_id, 'bookingChannel_id' => $venueObj->booking_channel_id, 'commissionPercentage' => $venueObj->defaultCommission];
                }
            }
            (new ChunkHelper())->chunkInsert((new AssetCommission()), $insertCommArr);
        }
    }
}