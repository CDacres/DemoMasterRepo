<?php

namespace App\Http\Controllers\VersionOne;
use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Henry;
use App\Models\Asset;
use App\Models\Company;
use App\Models\Venue;
use App\Models\Room;
use App\Models\Pivots\AssetUserPrivilege;
use App\Models\User;
use App\Models\Profile;
use App\Models\OpeningPeriod;
use App\Models\HourRate;
use App\Models\Booking\CancellationTerm;
use App\Models\Amenity;
use App\Models\Pivots\AssetAmenity;
use App\Models\AssetImage;
use App\Helpers\AssetImageHelper;
use App\Models\Booking\AssetCommission;
use App\Models\Pivots\AssetConfiguration;
use App\Models\Pivots\AssetTag;
use App\Models\DayRate;
use App\Models\AssetOfficeIncentive;
use App\Models\Booking\AssetBookingIncentive;
use App\Models\Pivots\AssetDDRInclude;
use App\Models\Pivots\AssetSetMenu;
use App\Models\Pivots\AssetMinimumSpend;
use App\Models\Booking\AssetDiscount;
use App\Models\Pivots\AssetAttribute;
use App\Contracts\Facades\ChannelLog as Log;

class Henrys extends Controller
{
    protected $defaultClass = Henry::class;

    public function purge(Request $request)
    {
        ini_set('memory_limit', '1024M');
        set_time_limit(60);
        if (!is_null($request->input('version')))
        {
            $henrys = $this->henry_by_version($request->input('version'))->get();
            $happened = $this->_doPurge($henrys);
            if ($happened !== true)
            {
                return $happened;
            }
            $this->henry_by_version($request->input('version'), false)->delete();
        }
        elseif (!is_null($request->input('batch_id')))
        {
            $henrys = $this->henry_by_batch_id($request->input('batch_id'))->get();
            $happened = $this->_doPurge($henrys);
            if ($happened !== true)
            {
                return $happened;
            }
            $this->henry_by_batch_id($request->input('batch_id'), false)->delete();
        }
        else
        {
            return response()->json(['error' => 'Needs version or batch id'], 405);
        }
        return response('', 200);
    }

    public function henry_by_batch_id($batch_id, $include_join = true)
    {
        $retHenry = Henry::whereBatchId($batch_id);
        if ($include_join)
        {
            $retHenry->joinAsset();
        }
        return $retHenry;
    }

    public function henry_by_version($version, $include_join = true)
    {
        $retHenry = Henry::whereVersion($version);
        if ($include_join)
        {
            $retHenry->joinAsset();
        }
        return $retHenry;
    }

    private function _doPurge($henrys)
    {
        if ($henrys->count() == 0)
        {
            return response()->json(['error' => 'No henry data'], 403);
        }
        $asset_ids = $henrys->pluck('asset_id')->toArray();
        $companyAssets = $this->_findCompanyAssets($asset_ids);
        if (is_null($companyAssets))
        {
            return response()->json(['error' => 'No company data'], 403);
        }
        $all_asset_ids = array_merge($asset_ids, $companyAssets);
        try
        {
            $this->_removePeopleAndPrivileges($all_asset_ids);
        }
        catch (Exception $ex)
        {
            Log::error('Purge failed at removing user privilege stage');
        }
        $this->_removePeriodsAndHourPrices($asset_ids);
        $this->_removeCancellation($asset_ids);
        $this->_removeFacilities($asset_ids);
        $this->_removeImages($asset_ids);
        $this->_removeCommission($asset_ids);
        $this->_removeConfiguration($asset_ids);
        $this->_removeTag($asset_ids);
        $this->_removeDayPrice($asset_ids);
        $this->_removeOfficeIncentive($asset_ids);
        $this->_removeBookingIncentive($asset_ids);
        $this->_removeDDRInclude($asset_ids);
        $this->_removeSetMenu($asset_ids);
        $this->_removeMinimumSpend($asset_ids);
        $this->_removeDiscount($asset_ids);
        $this->_removeAttribute($asset_ids);
        $this->_removeAssets($all_asset_ids);
        return true;
    }

    private function _findCompanyAssets($asset_ids)
    {
        $retArr = [];
        $companyIdArr = Venue::whereIn('asset_id', $asset_ids)->get()->map(function ($venue) {
            return $venue->company_id;
        })->unique();
        if ($companyIdArr->count() > 0)
        {
            $retArr = Company::whereIn('id', $companyIdArr->toArray())->get()->map(function ($company) {
                return $company->asset_id;
            })->toArray();
        }
        return $retArr;
    }

    private function _removePeopleAndPrivileges($asset_ids)
    {
        $privilegeUsers = AssetUserPrivilege::whereIn('asset_id', $asset_ids)->get()->map(function ($priv) {
            return $priv->user_id;
        })->unique();
        if ($privilegeUsers->count() > 0)
        {
            $userArr = $privilegeUsers->toArray();
            AssetUserPrivilege::whereIn('asset_id', $asset_ids)->delete();
            Profile::whereIn('user_id', $userArr)->delete();
            User::whereIn('id', $userArr)->delete();
        }
    }

    private function _removePeriodsAndHourPrices($asset_ids)
    {
        $periods = OpeningPeriod::whereIn('asset_id', $asset_ids)->get()->map(function ($period) {
            return $period->id;
        })->unique();
        if ($periods->count() > 0)
        {
            HourRate::whereIn('openingPeriod_id', $periods->toArray())->delete();
            OpeningPeriod::whereIn('asset_id', $asset_ids)->delete();
        }
    }

    private function _removeCancellation($asset_ids)
    {
        CancellationTerm::whereIn('asset_id', $asset_ids)->delete();
    }

    private function _removeFacilities($asset_ids)
    {
        $assetAmenities = AssetAmenity::whereIn('asset_id', $asset_ids)->get()->map(function ($assetAmenity) {
            return $assetAmenity->amenity_id;
        })->unique();
        if ($assetAmenities->count() > 0)
        {
            $amenityArr = $assetAmenities->toArray();
            AssetAmenity::whereIn('asset_id', $asset_ids)->delete();
            $amenities = Amenity::fromScrape()->whereIn('id', $amenityArr)->get()->toArray();
            foreach ($amenities as $amenity)
            {
                $amenityTranslate = explode('translatable.amenity.desc.', $amenity['desc']);
                if (isset($amenityTranslate[1]))
                {
                    DB::statement("DELETE FROM translator_translations WHERE item = 'amenity.desc." . $amenityTranslate[1] . "'");
                }
            }
            Amenity::fromScrape()->whereIn('id', $amenityArr)->delete();
        }
    }

    private function _removeImages($asset_ids)
    {
        $imageHelper = new AssetImageHelper();
        foreach ($asset_ids as $image_asset)
        {
            $imageHelper->purgeAssetImages($image_asset, true);
        }
        AssetImage::whereIn('asset_id', $asset_ids)->delete();
    }

    private function _removeCommission($asset_ids)
    {
        AssetCommission::whereIn('asset_id', $asset_ids)->delete();
    }

    private function _removeConfiguration($asset_ids)
    {
        AssetConfiguration::whereIn('asset_id', $asset_ids)->delete();
    }

    private function _removeTag($asset_ids)
    {
        AssetTag::whereIn('asset_id', $asset_ids)->delete();
    }

    private function _removeDayPrice($asset_ids)
    {
        DayRate::whereIn('asset_id', $asset_ids)->delete();
    }

    private function _removeOfficeIncentive($asset_ids)
    {
        AssetOfficeIncentive::whereIn('asset_id', $asset_ids)->forceDelete();
    }

    private function _removeBookingIncentive($asset_ids)
    {
        AssetBookingIncentive::whereIn('asset_id', $asset_ids)->forceDelete();
    }

    private function _removeDDRInclude($asset_ids)
    {
        AssetDDRInclude::whereIn('asset_id', $asset_ids)->delete();
    }

    private function _removeSetMenu($asset_ids)
    {
        AssetSetMenu::whereIn('asset_id', $asset_ids)->forceDelete();
    }

    private function _removeMinimumSpend($asset_ids)
    {
        AssetMinimumSpend::whereIn('asset_id', $asset_ids)->delete();
    }

    private function _removeDiscount($asset_ids)
    {
        AssetDiscount::whereIn('asset_id', $asset_ids)->forceDelete();
    }

    private function _removeAttribute($asset_ids)
    {
        AssetAttribute::whereIn('asset_id', $asset_ids)->delete();
    }

    private function _removeAssets($asset_ids)
    {
        Room::whereIn('asset_id', $asset_ids)->delete();
        Venue::whereIn('asset_id', $asset_ids)->delete();
        Company::whereIn('asset_id', $asset_ids)->delete();
        Asset::whereIn('id', $asset_ids)->forceDelete();
    }
}