<?php

namespace App\Models\Pivots;
use App\LaravelExtensions\Model\MyModel;
use App\Transformers\AssetMirrorTransformer;

class AssetMirror extends MyModel
{
    static protected $defaultTransformer = AssetMirrorTransformer::class;
    static protected $defaultSerialisationLabel = 'mirrors';
    public $table = 'asset_mirror';

    public $timestamps = false;
    protected $fillable = [
        'asset_id',
        'mirror_id',
        'simularity'
    ];
}