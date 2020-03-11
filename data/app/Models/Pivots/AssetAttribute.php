<?php

namespace App\Models\Pivots;

use App\Models\Attribute;
use App\Models\Asset;
use App\Transformers\AssetAttributeTransformer;
use App\LaravelExtensions\Model\LegacyModel;

class AssetAttribute extends LegacyModel
{
    public $timestamps = false;
    public $table = 'asset_attribute';
    static protected $defaultTransformer = AssetAttributeTransformer::class;
    static protected $defaultSerialisationLabel = 'asset_attributes';
    protected $usesHardDeletes = true;

    public function attribute()
    {
        return $this->belongsTo(Attribute::class);
    }

    public function asset()
    {
        return $this->belongsTo(Asset::class);
    }

    public function createFromRequestHelper($reqHelper)
    {
        $att = Attribute::findOrFail($reqHelper->getJSONRelationshipId('attribute'));
        $asset = Asset::findOrFail($reqHelper->getJSONRelationshipId('asset'));
        $this->attribute_id = $att->id;
        $this->asset_id = $asset->id;
        $this->save();
        return AssetAttribute::findOrFail($this->id);
    }
}