<?php

namespace App\Models\Pivots;

use App\LaravelExtensions\Model\MyModel;
use App\Models\Configuration;
use App\Models\Asset;
use App\Transformers\AssetConfigurationTransformer;

class AssetConfiguration extends MyModel
{
    public $timestamps = false;
    public $table = 'room_configuration';
    static protected $defaultTransformer = AssetConfigurationTransformer::class;
    static protected $defaultSerialisationLabel = 'guest_capacities';

    protected $fillable = ['max_capacity'];

    public function __construct(array $attributes = [])
    {
        $this->addFillableRelationship('asset', 'asset_id');
        $this->addFillableRelationship('configuration', 'configuration_id');
        parent::__construct($attributes);
    }

    public function configuration()
    {
        return $this->belongsTo(Configuration::class);
    }

    public function asset()
    {
        return $this->belongsTo(Asset::class);
    }
}