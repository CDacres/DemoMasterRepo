<?php

namespace App\Transformers;

use App\Models\RoomAsset;

class RoomAssetTransformer extends AssetTransformer
{
    public function __construct(\Illuminate\Contracts\Auth\Access\Authorizable $user = null)
    {
        parent::__construct($user);
        $this->availableIncludes = array_merge(['primary_vertical', 'asset_attributes', 'guest_capacities', 'ddr_includes', 'discounts', 'booking_incentives', 'office_incentives', 'set_menus', 'minimum_spend_requirements', 'office_type'], $this->availableIncludes);
        if ($this->contextUser->hasEagleVision() || ($this->contextUser->isUser() && $this->contextUser->is_venue_owner))
        {
            $this->availableIncludes[] = 'asset_tags';
        }
    }

    public function transform(RoomAsset $room)
    {
        $retArray = [
            'id' => (string) $room->id,
            'reference_id' => (string) $room->reference_id,
            'parent_id' => (string) $room->parent_id,
            'opening_periods' => (object) $this->transformOpeningPeriods($room->opening_periods),
            'description' => (string) $room->details->description,
            'name' => (string) $room->details->name,
            'hourly_price' => $this->_nullableValue($room->details->hourly_price, 'float'),
            'daily_minimum_days' => $this->_nullableValue($room->details->daily_minimum_days, 'integer'),
            'monthly_minimum_months' => $this->_nullableValue($room->details->monthly_minimum_months, 'integer'),
            'num_of_desks' => $this->_nullableValue($room->details->num_of_desks, 'integer'),
            'office_size' => $this->_nullableValue($room->details->office_size, 'float'),
            'office_size_unit' => $this->_nullableValue($room->details->office_size_unit, 'string'),
            'strict_time' => (bool) $room->details->strict_time,
            'price_negotiation' => (bool) $room->details->price_negotiation,
            'additional_charges' => $this->_nullableValue($room->details->additional_charges, 'string'),
            'currency' => (string) $room->details->currency,
            'vat_percent' => (float) $room->parent->vat_rate->first()->vat_percentage,
            'flexible_percent' => (float) $room->details->flexible_percent,
            'flexible_enabled' => (bool) $room->details->flexible_enabled,
            'price_control_percent' => (float) $room->details->price_control_percent
        ];
        return array_merge($retArray, $this->_getDayRateArray($room->day_rate_details));
    }

    public function includePrimaryVertical(RoomAsset $room)
    {
        $vertical = $room->details->primary_vertical;
        return $this->item($vertical, new VerticalTransformer, 'verticals');
    }

    public function includeAssetTags(RoomAsset $room)
    {
        $assetTags = $room->asset_tags;
        return $this->collection($assetTags, new AssetTagTransformer, 'asset_tags');
    }

    public function includeGuestCapacities(RoomAsset $room)
    {
        $confs = $room->guest_capacities;
        return $this->collection($confs, new AssetConfigurationTransformer, 'guest_capacities');
    }

    public function includeAssetAttributes(RoomAsset $room)
    {
        $attributes = $room->asset_attributes;
        return $this->collection($attributes, new AssetAttributeTransformer, 'asset_attributes');
    }

    public function includeDdrIncludes(RoomAsset $room)
    {
        $ddr_includes = $room->ddr_includes;
        return $this->collection($ddr_includes, new AssetDDRIncludeTransformer, 'ddr_includes');
    }

    public function includeDiscounts(RoomAsset $room)
    {
        $discounts = $room->discounts;
        return $this->collection($discounts, new AssetDiscountTransformer, 'discounts');
    }

    public function includeBookingIncentives(RoomAsset $room)
    {
        $booking_incentives = $room->booking_incentives;
        return $this->collection($booking_incentives, new AssetBookingIncentiveTransformer, 'booking_incentives');
    }

    public function includeOfficeIncentives(RoomAsset $room)
    {
        $office_incentives = $room->office_incentives;
        return $this->collection($office_incentives, new AssetOfficeIncentiveTransformer, 'office_incentives');
    }

    public function includeSetMenus(RoomAsset $room)
    {
        $set_menus = $room->set_menus;
        return $this->collection($set_menus, new AssetSetMenuTransformer, 'set_menus');
    }

    public function includeMinimumSpendRequirements(RoomAsset $room)
    {
        $minimum_spend_requirements = $room->minimum_spend_requirements;
        return $this->collection($minimum_spend_requirements, new AssetMinimumSpendTransformer, 'minimum_spend_requirements');
    }

    public function includeOfficeType(RoomAsset $room)
    {
        $office_type = $room->details->office_type;
        return $this->item($office_type, new OfficeTypeTransformer, 'office_types');
    }

    private function _getDayRateArray($dayRateDetails)
    {
        if (!is_null($dayRateDetails))
        {
            $dayRateArray = [
                'half_day_price_first' => $this->_nullableValue($dayRateDetails->half_day_price_first, 'float'),
                'half_day_price_second' => $this->_nullableValue($dayRateDetails->half_day_price_second, 'float'),
                'half_day_time_first_start' => $this->_nullableValue($dayRateDetails->half_day_time_first_start, 'integer'),
                'half_day_time_first_end' => $this->_nullableValue($dayRateDetails->half_day_time_first_end, 'integer'),
                'half_day_time_second_start' => $this->_nullableValue($dayRateDetails->half_day_time_second_start, 'integer'),
                'half_day_time_second_end' => $this->_nullableValue($dayRateDetails->half_day_time_second_end, 'integer'),
                'daily_price' => $this->_nullableValue($dayRateDetails->daily_price, 'float'),
                'evening_price' => $this->_nullableValue($dayRateDetails->evening_price, 'float'),
                'monthly_price' => $this->_nullableValue($dayRateDetails->monthly_price, 'float'),
                'daily_delegate_rate' => $this->_nullableValue($dayRateDetails->daily_delegate_rate, 'float'),
            ];
        }
        else
        {
            $dayRateArray = [
                'half_day_price_first' => null,
                'half_day_price_second' => null,
                'half_day_time_first_start' => null,
                'half_day_time_first_end' => null,
                'half_day_time_second_start' => null,
                'half_day_time_second_end' => null,
                'daily_price' => null,
                'evening_price' => null,
                'monthly_price' => null,
                'daily_delegate_rate' => null,
            ];
        }
        return $dayRateArray;
    }
}