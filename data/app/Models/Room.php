<?php

namespace App\Models;

use App\LaravelExtensions\Model\LegacyModel;
use App\Models\Verticals\Vertical;
use App\Helpers\Formatting\TextHelper;
use App\Helpers\RoomHelper;
use App\Scopes\EnabledScope;

class Room extends LegacyModel
{
    const CREATED_AT = 'created';
    const UPDATED_AT = 'updated';

    public $table = 'rooms';

    public $fillable = [
        'hourly_price',
        'hourly_price_exvat',
        'daily_minimum_days',
        'monthly_minimum_months',
        'venue_id',
        'primary_vertical_id',
        'name',
        'description',
        'draft_description',
        'office_type_id',
        'num_of_desks',
        'office_size',
        'office_size_unit',
        'strict_time',
        'price_negotiation',
        'additional_charges',
        'currency'
    ];

    public function isApproved()
    {
        $companyApproved = $this->venue->company->approved;
        $venueApproved = $this->venue->approved;
        $roomApproved = $this->approved;
        $roomStatus = $this->status;
        $retApproved = false;
        if ($companyApproved && $venueApproved && $roomApproved && $roomStatus == 1)
        {
            $retApproved = true;
        }
        return $retApproved;
    }

    public function isRoomHidden()
    {
        $roomHidden = $this->roomhidden;
        $retHidden = false;
        if ($roomHidden)
        {
            $retHidden = true;
        }
        return $retHidden;
    }

    public function venue()
    {
        return $this->belongsTo(Venue::class);
    }

    public function primary_vertical()
    {
        return $this->hasOne(Vertical::class, 'id', 'primary_vertical_id')->withoutGlobalScope(EnabledScope::class);
    }

    public function office_type()
    {
        return $this->belongsTo(OfficeType::class);
    }

    public function currency_code()
    {
        return $this->belongsTo(Currency::class, 'currency', 'code');
    }

    public function usage()
    {
        return $this->belongsTo(Usage::class);
    }

    public function getReviewCountAttribute()
    {
        return $this->venue->review_count;
    }

    public function getReviewScoreAttribute()
    {
        return $this->venue->review_score;
    }

    public function getLatAttribute()
    {
        return $this->venue->lat;
    }

    public function getLongAttribute()
    {
        return $this->venue->long;
    }

    public function getAddressAttribute()
    {
        return $this->venue->address;
    }

    public function getRoadAttribute()
    {
        return $this->venue->road;
    }

    public function getTownAttribute()
    {
        return $this->venue->town;
    }

    public function getCityAttribute()
    {
        return $this->venue->city;
    }

    public function getCountryAttribute()
    {
        return $this->venue->country;
    }

    public function getCountryCodeAttribute()
    {
        return $this->venue->country_code;
    }

    public function getPostCodeAttribute()
    {
        return $this->venue->post_code;
    }

    public function getPhoneAttribute()
    {
        return $this->venue->phone;
    }

    public function getVenueAgreedToListAttribute()
    {
        return $this->venue->agree_to_list;
    }

    public function getLiveBookingsAttribute()
    {
        return $this->venue->uses_live_bookings;
    }

    public function getVenueApprovedAttribute()
    {
        return $this->venue->approved;
    }

    public function getVenueNameAttribute()
    {
        return $this->venue->name;
    }

    public function getVenueDescriptionAttribute()
    {
        return $this->venue->description;
    }

    public function getVenueMainContactAttribute()
    {
        return $this->venue->main_contact;
    }

    public function getVenueEnabledAttribute()
    {
        return $this->venue->enabled;
    }

    public function getDescriptionAttribute()
    {
        return $this->desc;
    }

    public function setDescriptionAttribute($value)
    {
        $this->attributes['desc'] = (new TextHelper())->text_replace($value);
    }

    public function setDraftDescriptionAttribute($value)
    {
        $this->attributes['draft_description'] = (new TextHelper())->text_replace($value);
    }

    public function getNameAttribute()
    {
        return $this->title;
    }

    public function setNameAttribute($value)
    {
        $this->attributes['title'] = (new TextHelper())->text_replace($value);
    }

    public function getHourlyPriceAttribute()
    {
        return $this->listing_hourly_rate;
    }

    public function setHourlyPriceAttribute($value)
    {
        $this->attributes['listing_hourly_rate'] = $value;
    }

    public function setHourlyPriceExvatAttribute($value)
    {
        $this->attributes['listing_hourly_rate_exvat'] = $value;
    }

    public function setPrimaryVerticalIdAttribute($value)
    {
        $this->attributes['primary_vertical_id'] = $value;
        $this->attributes['usage_id'] = (($value == 1) ? 3 : (($value == 2) ? 1 : 6)); //TODO: this is a massive hack. Hopefully it's temporary. It naively maps vertical to old usages
    }

    public function setOfficeSizeUnitAttribute($value)
    {
        $this->attributes['office_size_unit'] = (!empty($value)?$value:'m2');
    }

    public function getParentRefField()
    {
        return 'venue_id';
    }

    public function getUrlAttribute()
    {
        return (new RoomHelper())->get_url($this, false, false);
    }

    public function getRoomHiddenAttribute()
    {
        // this has to use attributes rather than shorthand as 'hidden' is a reserved word
        return $this->attributes['hidden'];
    }
}