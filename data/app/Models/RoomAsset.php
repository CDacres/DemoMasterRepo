<?php

namespace App\Models;

use App\Transformers\RoomAssetTransformer;
use App\Models\Verticals\Vertical;
use App\Models\Usage;
use App\Contracts\Facades\ChannelLog as Log;
use App\Helpers\UrlHelper;

class RoomAsset extends SpaceAsset
{
    protected $_type = RoomAsset::ROOM;
    protected $_detailsType = Room::class;
    static protected $defaultTransformer = RoomAssetTransformer::class;
    static protected $defaultSerialisationLabel = 'rooms';
    private $_inferredCurrencyCode;

    public function __construct(array $attributes = [])
    {
        $this->_setDependency('day_rate_details');
        $this->addFillableRelationship('primary_vertical', 'primary_vertical_id');
        $this->addFillableRelationship('office_type', 'office_type_id');
        parent::__construct($attributes);
        $this->hidden = array_merge([], $this->hidden);
        $this->appends = array_merge([
            'title',
            'desc',
            'listing_hourly_rate',
            'currency',
            'review_count',
            'review_score',
            'review_count_string',
            'lat',
            'long',
            'url',
            'room_id',
            'asset_id',
            'venue_id',
            'asset_edit_url',
            'venue_edit_url',
            'venue_agreed_to_list',
            'ranking'
        ], $this->appends);
    }

    public function saveNewRoom($venue)
    {
        $this->setPriceControl();
        $this->parent()->associate($venue);
        $this->_guessCurrencyIfRequired($venue);
        $this->save();
        if ($this->hasEmptyRelationship('opening_periods'))
        {
            $this->copyRelationFromAsset($venue, 'opening_periods');
            $this->refresh();
            $this->updateHourRates();
        }
        $this->copyRelationFromAsset($venue, 'privileges');
        $this->copyRelationFromAsset($venue, 'facilities');
        $this->copyRelationFromAsset($venue, 'cancellation_terms');
        $this->save();
    }

    public function createFromRequestHelper($reqHelper)
    {
        $venue = VenueAsset::findOrFail($reqHelper->getJSONRelationshipId('venue'));
        if ($reqHelper->userCannot('update', $venue))
        {
            abort(401);
        }
        $fillArray = array_merge($reqHelper->requestAttributes(['primary_vertical_id' => 'primary_vertical']), ['venue_id' => $venue->reference_id]); //TODO: kill these details linkages - do on assets in asset table with hierarchy (nestsets?)
        $this->fill($fillArray);
        $this->saveNewRoom($venue);
        return $this;
    }

    public function fill(array $attributes)
    {
        parent::fill($attributes);
        if (!empty($attributes))
        {
            $this->day_rate_details = (new DayRate)->fill($attributes);
        }
        return $this;
    }

    public function save(array $options = [])
    {
        $updateHourRates = $this->_needsHourRateUpdate();
        $updatePriceControl = $this->_needsPriceControlUpdate();
        $saved = parent::save($options) && $this->saveDayRateDetails();
        if ($updateHourRates)
        {
            $this->refresh();
            $this->updateHourRates();
        }
        if ($updatePriceControl)
        {
            $this->refresh();
            $this->setPriceControl();
            $this->save();
        }
        return $saved;
    }

    private function _needsHourRateUpdate()
    {
        return $this->hasPendingProtoPeriods() || $this->_hasDirtyHourRate();
    }

    private function _needsPriceControlUpdate()
    {
        return $this->hasDirtyDependencyAttribute('details', 'primary_vertical_id');
    }

    private function _hasDirtyHourRate()
    {
        return $this->hasDirtyDependencyAttribute('details', 'listing_hourly_rate');
    }

    public function saveDayRateDetails()
    {
        $dayRateDetails = $this->day_rate_details;
        $saved = $this->day_rate_details()->save($dayRateDetails);
        $this->_clearProtoDependency('day_rate_details');
        return $saved;
    }

    public function updateHourRates()
    {
        $hourly_rate = $this->details->listing_hourly_rate;
        if (!is_null($hourly_rate))
        {
            HourRate::unguard();
            $this->opening_periods->each(function ($period) use ($hourly_rate) {
                HourRate::updateOrCreate(
                    ['openingPeriod_id' => $period->id],
                    ['price_per_hour' => $hourly_rate]
                );
            });
            HourRate::reguard();
        }
        else
        {
            $this->opening_periods->each(function ($period) {
                HourRate::where('openingPeriod_id', $period->id)->delete();
            });
        }
    }

    private function _guessCurrencyIfRequired($venue = null)
    {
        if (is_null($this->currency))
        {
            $this->currency = $this->inferAndReturnCurrencyCode($venue);
        }
    }

    public function inferAndReturnCurrencyCode($venue, $forceRefresh = false)
    {
        if ($forceRefresh || $this->_inferredCurrencyCode === null)
        {
            $this->_inferredCurrencyCode = $this->_inferAndReturnCurrencyCode($venue);
        }
        return $this->_inferredCurrencyCode;
    }

    private function _inferAndReturnCurrencyCode($venue)
    {
        $currency_code = null;
        $country_code = $venue->inferAndReturnCountryCode();
        $currency = Currency::getCurrencyByCountryCode($country_code);
        if (is_null($currency))
        {
            Log::warning("Room creation attempted for country with no currency.", 'default', ['asset_id' => $this->id, 'country_code' => $country_code]);
        }
        else
        {
            $currency_code = $currency->currency_code;
        }
        return $currency_code;
    }

    public function patchMerge($patchArray)
    {
        $this->day_rate_details->patchMerge($patchArray);
        return parent::patchMerge($patchArray);
    }

    public function isApproved()
    {
        return $this->details->isApproved();
    }

    public function isRoomHidden()
    {
        return $this->details->isRoomHidden();
    }

    public function getAssetIdAttribute()
    {
        return $this->id;
    }

    public function parent()
    {
        return $this->belongsTo(VenueAsset::class, $this->getParentIdName());
    }

    public function hour_rate_details()
    {
        return $this->hasManyThrough(HourRate::class, OpeningPeriod::class, 'asset_id', 'openingPeriod_id', 'id', 'id');
    }

    public function day_rate_details()
    {
        return $this->hasOne(DayRate::class, 'asset_id', 'id');
    }

    public function office_type()
    {
        return $this->hasManyThrough(OfficeType::class, Room::class, 'asset_id', 'id', 'id', 'office_type_id');
    }

    public function primary_vertical()
    {
        return $this->hasManyThrough(Vertical::class, Room::class, 'asset_id', 'id', 'id', 'primary_vertical_id');
    }

    public function getRankingAttribute()
    {
        return $this->details->ranking;
    }

    public function getRoomIdAttribute()
    {
        return $this->details->id;
    }

    public function getListingHourlyRateAttribute()
    {
        return $this->details->listing_hourly_rate;
    }

    public function getHourlyPriceAttribute()
    {
        return $this->listing_hourly_rate;
    }

    public function getTitleAttribute()
    {
        return $this->details->title;
    }

    public function getDescAttribute()
    {
        return $this->details->desc;
    }

    public function getCurrencyAttribute()
    {
        return $this->details->currency;
    }

    public function setCurrencyAttribute($currency)
    {
        return $this->details->currency = $currency;
    }

    public function getReviewCountAttribute()
    {
        return $this->details->review_count;
    }

    public function getReviewScoreAttribute()
    {
        return $this->details->review_score;
    }

    public function getLatAttribute()
    {
        return $this->details->lat;
    }

    public function getLongAttribute()
    {
        return $this->details->long;
    }

    public function getAddressAttribute()
    {
        return $this->details->address;
    }

    public function getCityAttribute()
    {
        return $this->details->city;
    }

    public function getPhoneAttribute()
    {
        return $this->details->phone;
    }

    public function getVenueIdAttribute()
    {
        return $this->details->venue_id;
    }

    public function getVenueNameAttribute()
    {
        return $this->details->venuename;
    }

    public function getCompanyTokenAttribute()
    {
        return $this->parent->companytoken;
    }

    public function getAssetEditUrlAttribute()
    {
        return "/uk/rooms/" . (new UrlHelper())->seo_url($this->details->city) . "/" . $this->id . "/edit";
    }

    public function getVenueEditUrlAttribute()
    {
        return "/uk/venues/" . (new UrlHelper())->seo_url($this->details->venuename) . "/" . $this->parent->id . "/edit";
    }

    public function getVenueAgreedToListAttribute()
    {
        return $this->details->venue_agreed_to_list;
    }

    public function getReviewCountStringAttribute()
    {
        return (($this->review_count === null || $this->review_count === 0)?null:trans_choice('assets.reviews', $this->review_count, ['number' => $this->review_count]));
    }

    public function setPriceControl()
    {
        $this->details->flexible_percent = 15;
        $this->details->flexible_enabled = 1;
        if ($this->_getsPriceControl())
        {
            $this->details->price_control_percent = 12;
        }
        else
        {
            $this->details->price_control_percent = null;
        }
    }

    public function setPrimaryVerticalIdAttribute($value)
    {
        $this->details->primary_vertical_id = $value;
        $this->details->usage_id = (($value == Vertical::MEETING)?Usage::MEETINGROOM:(($value == Vertical::OFFICE)?Usage::PRIVATEOFFICE:Usage::EVENTFUNCTION)); //TODO: this is a massive hack. Hopefully it's temporary. It naively maps vertical to old usages
    }

    public function setOfficeTypeIdAttribute($value)
    {
        $this->details->office_type_id = $value;
    }

    public function getMinimumSpendAttribute()
    {
        if (!is_null($this->day_rate_details))
        {
            return $this->day_rate_details->minimum_spend;
        }
        return null;
    }

    public function setMinimumSpendAttribute($value)
    {
        $this->day_rate_details->minimum_spend = $value;
    }

    private function _getsPriceControl()
    {
        return ($this->details->primary_vertical_id == Vertical::MEETING);
    }

    public function getFlexiblePercentAttribute()
    {
        return $this->details->flexible_percent;
    }

    public function getFlexibleEnabledAttribute()
    {
        return $this->details->flexible_enabled;
    }

    public function getPriceControlPercentAttribute()
    {
        return $this->details->price_control_percent;
    }
}