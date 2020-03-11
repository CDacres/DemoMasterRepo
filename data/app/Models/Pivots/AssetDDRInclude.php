<?php

namespace App\Models\Pivots;

use App\LaravelExtensions\Model\MyModel;
use App\Models\DDRIncludeType;
use App\Models\Asset;
use App\Transformers\AssetDDRIncludeTransformer;
use App\Helpers\Formatting\TextHelper;

class AssetDDRInclude extends MyModel
{
    public $timestamps = false;
    public $table = 'asset_ddr_includes';
    static protected $defaultTransformer = AssetDDRIncludeTransformer::class;
    static protected $defaultSerialisationLabel = 'ddr_includes';

    protected $fillable = ['include_text'];

    public function __construct(array $attributes = [])
    {
        $this->addFillableRelationship('asset', 'asset_id');
        $this->addFillableRelationship('ddrinclude_type', 'include_type_id');
        parent::__construct($attributes);
    }

    public function ddrinclude_type()
    {
        return $this->belongsTo(DDRIncludeType::class, 'include_type_id', 'id');
    }

    public function asset()
    {
        return $this->belongsTo(Asset::class);
    }

    public function setIncludeTextAttribute($value)
    {
        $this->attributes['include_text'] = (new TextHelper())->text_replace($value);
    }
}