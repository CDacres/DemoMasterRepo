<?php

namespace App\Models;

use App\LaravelExtensions\Model\MyModel;

use App\Models\Pivots\AssetUserPrivilege;
use App\Models\Booking\BookingChannel;
use App\Models\Booking\BookingChannelCountry;
use App\Models\Booking\AssetDiscount;
use App\Models\Booking\AssetBookingIncentive;
use App\Models\Booking\AssetCommission;
use App\Models\Booking\CancellationTerm;
use App\Models\AssetOfficeIncentive;
use App\Models\Pivots\AssetAmenity;
use App\Models\Pivots\AssetConfiguration;
use App\Models\Pivots\AssetDDRInclude;
use App\Models\Pivots\AssetSetMenu;
use App\Models\Pivots\AssetMinimumSpend;
use App\Models\Pivots\AssetAttribute;
use App\Models\Pivots\AssetTag;
use App\Models\Tags\Tag;

use App\Scopes\AssetTypeScope;

use Kalnoy\Nestedset\NodeTrait;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Helpers\RolesAndPrivilegesHelper;
use App\Helpers\PatchHelper;
use App\Helpers\TokenHelper;

class Asset extends MyModel
{
    use NodeTrait {
        applyNestedSetScope as traitScope;
    }

    const COMPANY = 1;
    const VENUE = 2;
    const ROOM = 3;

    use SoftDeletes;
    protected $dates = ['deleted_at'];
    public $table = 'asset_audit';
    protected $_type = null;
    private $_proto_opening_periods = null;

    protected $with = [
        'opening_periods',
        'opening_periods.day',
        'asset_attributes_deprecated',
        'asset_tags_deprecated'
    ];

    public $fillable = ['parent_id'];

    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $this->hidden = array_merge(['asset_type', 'token'], $this->hidden);
        $this->appends = array_merge(['type'], $this->appends);
    }

    protected static function boot()
    {
        parent::boot();
        static::addGlobalScope(new AssetTypeScope());
    }

    public function applyNestedSetScope($query, $table = null)
    {
        return $this->traitScope($query, $table)->withoutGlobalScope(AssetTypeScope::class);
    }

    public function fill(array $attributes)
    {
        $this->setupAs($this->_type);
        $this->_generatePotentialOpeningPeriodsCollectionIfPresent($attributes);
    }

    public function setupAs($assetTypeId)
    {
        $this->asset_type_id = $assetTypeId;
        $this->token = (new TokenHelper())->add_token();
    }

    public function save(array $options = [])
    {
        $needsParentUpdate = $this->isDirty('parent_id');
        $saved = parent::save($options) && $this->saveOpeningPeriods();
        if ($needsParentUpdate)
        {
            $parentAsset = Asset::withoutGlobalScope(AssetTypeScope::class)->where('id', $this->parent_id)->get()->first();
            if ($parentAsset->count() > 0)
            {
                $details = $this->details;
                $parentField = $details->getParentRefField();
                $details->$parentField = $parentAsset->reference_id;
                $this->details()->save($details);
            }
        }
        return $saved;
    }

    public function patchMerge($patchArray)
    {
        $this->_patchPotentialOpeningPeriodsCollectionIfPresent($patchArray);
        return parent::patchMerge($patchArray);
    }

    public function saveOpeningPeriods()
    {
        $saved = true;
        $openingPeriods = $this->_proto_opening_periods;
        if (!is_null($openingPeriods))
        {
            $this->_purgeOpeningPeriods();
            $saved = $this->opening_periods()->saveMany($openingPeriods);
            $this->_copyVenueOpeningOntoRooms($openingPeriods);
            $this->_proto_opening_periods = null;
        }
        return $saved;
    }

    private function _copyVenueOpeningOntoRooms($openingPeriods)
    {
        if ($this->asset_type->id == Asset::VENUE)
        {
            $room_asset_ids = $this->children->pluck('id')->toArray();
            foreach ($room_asset_ids as $room_asset)
            {
                $room_opening_periods = OpeningPeriod::where('asset_id', $room_asset)->get();
                if ($room_opening_periods->count() > 0)
                {
                    foreach ($room_opening_periods as $hourtoremove)
                    {
                        HourRate::where('openingPeriod_id', $hourtoremove->id)->delete();
                        OpeningPeriod::where('id', $hourtoremove->id)->delete();
                    }
                }
                foreach ($openingPeriods as $venue_opening_period)
                {
                    $roomNewOpenHours = new OpeningPeriod();
                    $roomNewOpenHours->asset_id = $room_asset;
                    $roomNewOpenHours->day_id = $venue_opening_period->day_id;
                    $roomNewOpenHours->start = $venue_opening_period->start;
                    $roomNewOpenHours->end = $venue_opening_period->end;
                    $roomNewOpenHours->minimum_minutes = $venue_opening_period->minimum_minutes;
                    $roomNewOpenHours->slot_length_minutes = $venue_opening_period->slot_length_minutes;
                    $roomNewOpenHours->save();
                }
                RoomAsset::find($room_asset)->updateHourRates();
            }
        }
    }

    protected function hasPendingProtoPeriods()
    {
        return !is_null($this->_proto_opening_periods);
    }

    public function giveUserPrivileges($user, $mask = null)
    {
        $adminUserRunt = new AssetUserPrivilege();
        $adminUserRunt->asset_id = $this->id;
        $adminUserRunt->user_id = $user->id;
        $adminUserRunt->privileges_mask = $mask ?: RolesAndPrivilegesHelper::get_top_privilege();
        $this->privileges()->save($adminUserRunt);
        $user->userType_id = RolesAndPrivilegesHelper::ASSETOWNER;
        $user->save();
    }

    public function copyRelationFromAsset(Asset $asset, $relation)
    {
        $originalCollection = $asset->$relation;
        $type = get_class($asset->$relation()->getRelated());
        $insertCollection = $originalCollection->map(function ($itemToReplicate) {
            $newItem = $itemToReplicate->replicate();
            if (!is_null($itemToReplicate->asset_id))
            {
                $newItem->asset_id = $this->id;
            }
            return $newItem;
        });
        $this->$relation()->saveMany($insertCollection);
    }

    public function generateDefaultCommissions($country_code, $self_listing)
    {
        $bookingChannelCountry = BookingChannelCountry::fromCountry($country_code)->get();
        if ($bookingChannelCountry->count() > 0)
        {
            $assetCommissions = $bookingChannelCountry->map(function ($channel) use ($self_listing) {
                $assetCommission = new AssetCommission();
                $assetCommission->asset_id = $this->id;
                $assetCommission->booking_channel_id = $channel->booking_channel_id;
                if ($self_listing)
                {
                    $assetCommission->commission_percentage = $channel->self_list_commission;
                }
                else
                {
                    $assetCommission->commission_percentage = $channel->defaultCommission;
                }
                return $assetCommission;
            });
        }
        else
        {
            $assetCommissions = BookingChannel::get()->map(function ($channel) use ($self_listing) {
                $assetCommission = new AssetCommission();
                $assetCommission->asset_id = $this->id;
                $assetCommission->booking_channel_id = $channel->id;
                if ($self_listing)
                {
                    $assetCommission->commission_percentage = $channel->self_list_commission;
                }
                else
                {
                    $assetCommission->commission_percentage = $channel->default_commission;
                }
                return $assetCommission;
            });
        }
        $this->commission_rates()->saveMany($assetCommissions);
    }

    public function scopeWithDetails($query)
    {
        return $query->with([
            'asset_tags_deprecated',
            'configs',
            'asset_attributes_deprecated',
            'images'
        ]);
    }

    public function scopeOrderByNewest($query)
    {
        return $query->orderBy('id', 'DESC');
    }

    public function scopeFromIdArray($query, $id_array)
    {
        return $query->whereIn($this->table . '.id', $id_array);
    }

    public function commission_rates()
    {
        return $this->hasMany(AssetCommission::class, 'asset_id', 'id');
    }

    public function discounts()
    {
        return $this->hasMany(AssetDiscount::class, 'asset_id', 'id');
    }

    public function booking_incentives()
    {
        return $this->hasMany(AssetBookingIncentive::class, 'asset_id', 'id');
    }

    public function office_incentives()
    {
        return $this->hasMany(AssetOfficeIncentive::class, 'asset_id', 'id');
    }

    public function add_ons()
    {
        return $this->hasMany(AssetAmenity::class, 'asset_id', 'id')->with('amenity')->whereHas('amenity', function($q) {
            $q->where('filterable', 0);
        });
    }

    public function asset_amenities()
    {
        return $this->hasMany(AssetAmenity::class, 'asset_id', 'id')->with('amenity')->whereHas('amenity', function($q) {
            $q->where('filterable', 1);
        });
    }

    public function opening_periods()
    {
        return $this->hasMany(OpeningPeriod::class, 'asset_id', 'id')->orderBy('day_id', 'ASC');
    }

    public function cancellation_terms()
    {
        return $this->hasMany(CancellationTerm::class, 'asset_id', 'id');
    }

    public function asset_type()
    {
        return $this->hasOne(AssetType::class, 'id', 'asset_type_id');
    }

    public function privileges()
    {
        return $this->hasMany(AssetUserPrivilege::class, 'asset_id', 'id');
    }

    public function facilities()
    {
        return $this->hasMany(AssetAmenity::class, 'asset_id', 'id')->with('amenity');
    }

    public function images()
    {
        return $this->hasMany(AssetImage::class, 'asset_id', 'id')->orderBy('is_featured', 'DESC');
    }

    public function guest_capacities()
    {
        return $this->hasMany(AssetConfiguration::class, 'asset_id', 'id');
    }

    public function ddr_includes()
    {
        return $this->hasMany(AssetDDRInclude::class, 'asset_id', 'id');
    }

    public function set_menus()
    {
        return $this->hasMany(AssetSetMenu::class, 'asset_id', 'id');
    }

    public function minimum_spend_requirements()
    {
        return $this->hasMany(AssetMinimumSpend::class, 'asset_id', 'id');
    }

    public function asset_attributes_deprecated()
    {
        return $this->belongsToMany(Attribute::class, 'asset_attribute', 'asset_id', 'attribute_id')->withPivot('enabled');
    }

    public function asset_tags_deprecated()
    {
        return $this->belongsToMany(Tag::class, 'asset_tag', 'asset_id', 'tag_id')->withPivot(['enabled', 'ranking', 'suppressed']);
    }

    public function asset_tags()
    {
        return $this->hasMany(AssetTag::class, 'asset_id', 'id');
    }

    public function asset_attributes()
    {
        return $this->hasMany(AssetAttribute::class, 'asset_id', 'id');
    }

    public function getTypeAttribute()
    {
        return $this->asset_type->asset_type;
    }

    public function getChildCountAttribute()
    {
        return $this->children->count();
    }

    private function _purgeOpeningPeriods()
    {
        $collection = $this->opening_periods ?: new \Illuminate\Support\Collection();
        $opening_period_ids = $collection->pluck('id')->all();
        HourRate::whereIn('openingPeriod_id', $opening_period_ids)->delete();
        OpeningPeriod::destroy($opening_period_ids);
    }

    public function getType()
    {
        return $this->_type;
    }

    protected function _generatePotentialOpeningPeriodsCollectionIfPresent($fillArray)
    {
        if (array_key_exists('opening_periods', $fillArray))
        {
            $this->_generatePotentialOpeningPeriodsCollection($fillArray['opening_periods']);
        }
    }

    protected function _patchPotentialOpeningPeriodsCollectionIfPresent($patchArray)
    {
        if (array_key_exists('opening_periods', $patchArray))
        {
            $this->_patchPotentialOpeningPeriodsCollection($patchArray['opening_periods']);
        }
    }

    private function _generatePotentialOpeningPeriodsCollection($periodsArray)
    {
        $openingPeriods = OpeningPeriod::collection();
        $days = Day::get()->keyBy('name');
        $sourceCollection = collect($periodsArray);
        $sourceCollection->each(function ($periods, $key) use ($openingPeriods, $days) {
            $dayId = $days->get($key)->id;
            $periodsCollection = collect($periods);
            $periodsCollection->each(function ($periodAttributes) use ($openingPeriods, $dayId) {
                $period = new OpeningPeriod($periodAttributes);
                $period->day_id = $dayId;
                $openingPeriods->push($period);
            });
        });
        $this->_proto_opening_periods = $openingPeriods;
    }

    private function _patchPotentialOpeningPeriodsCollection($patchArray)
    {
        $currentPeriods = $this->opening_periods;
        $transformerClass = static::defaultTransformer();
        $transformer = new $transformerClass;
        $transformedCurrentPeriods = $transformer->transformOpeningPeriods($currentPeriods);
        $helper = new PatchHelper();
        $patchedArray = $helper->arrayPatch($transformedCurrentPeriods, $patchArray);
        $this->_generatePotentialOpeningPeriodsCollection($patchedArray);
    }
}