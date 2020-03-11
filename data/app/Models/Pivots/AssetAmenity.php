<?php

namespace App\Models\Pivots;

use App\Models\Amenity;
use App\Models\AmenityType;
use App\Models\Asset;
use App\Transformers\FacilityTransformer;
use App\Scopes\EnabledScope;
use App\LaravelExtensions\Model\LegacyModel;
use App\Helpers\Formatting\TextHelper;
use App\Events\AssetAmenityCopyEvent;

class AssetAmenity extends LegacyModel
{
    public $timestamps = false;
    public $table = 'asset_amenity';

    static protected $defaultTransformer = FacilityTransformer::class;
    static protected $defaultSerialisationLabel = 'facilities';
    protected $usesHardDeletes = true;

    protected $fillable = [
        'name',
        'cost',
        'instructions',
        'available',
        'cost_exvat'
    ];

    protected $dispatchesEvents = [
        'created' => AssetAmenityCopyEvent::class,
        'updated' => AssetAmenityCopyEvent::class
    ];

    public function amenity()
    {
        return $this->belongsTo(Amenity::class);
    }

    public function asset()
    {
        return $this->belongsTo(Asset::class);
    }

    public function facility_type()
    {
        return $this->belongsTo(AmenityType::class);
    }

    public function filter()
    {
        return $this->belongsTo(Amenity::class)->where('filterable', true);
    }

    public function getFilterIdAttribute()
    {
        return $this->attributes['amenity_id'];
    }

    public function setFilterIdAttribute($value)
    {
        $this->attributes['amenity_id'] = $value;
    }

    public function getFacilityTypeIdAttribute()
    {
        return $this->attributes['amenity_type_id'];
    }

    public function setFacilityTypeIdAttribute($value)
    {
        $this->attributes['amenity_type_id'] = $value;
    }

    public function setNameAttribute($value)
    {
        $this->attributes['name'] = (new TextHelper())->text_replace($value);
    }

    public function setInstructionsAttribute($value)
    {
        $this->attributes['instructions'] = (new TextHelper())->text_replace($value);
    }

    public function createFromRequestHelper($reqHelper)
    {
        $amenity = Amenity::withoutGlobalScope(EnabledScope::class)->find($reqHelper->getJSONRelationshipId('filter'));
        $asset = Asset::findOrFail($reqHelper->getJSONRelationshipId('asset'));
        if (is_null($amenity))
        {
            $amenity = $this->_createAndSaveLegacyAmenity($reqHelper);
        }
        if (!$reqHelper->requestHasAttribute('name'))
        {
            $this->name = $amenity->name;
        }
        else
        {
            $this->fill($reqHelper->getJSONAttributes(['name']));
        }
        $this->fill($reqHelper->getJSONAttributes(['cost', 'cost_exvat', 'instructions', 'available']));
        $this->facility_type_id = $amenity->amenity_types_id;
        $this->filter_id = $amenity->id;
        $this->asset_id = $asset->id;
        $this->allows_price = $amenity->allow_price;
        $this->save();
        return AssetAmenity::findOrFail($this->id);
    }

    private function _createAndSaveLegacyAmenity($reqHelper)
    {
        $amenity = new Amenity();
        $amenity->desc = $reqHelper->getJSONAttribute('name');
        $amenity->filterable = false;
        $amenity->allow_price = true;
        $amenity->amenity_types_id = AmenityType::confirmIdOrFallback($reqHelper->getJSONRelationshipId('facility_type'));
        $amenity->save();
        return $amenity;
    }
}
