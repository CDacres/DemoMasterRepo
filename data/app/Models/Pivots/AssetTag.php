<?php

namespace App\Models\Pivots;

use App\Models\Tags\Tag;
use App\Models\Asset;
use App\Transformers\AssetTagTransformer;
use App\LaravelExtensions\Model\LegacyModel;

class AssetTag extends LegacyModel
{
    public $timestamps = false;
    public $table = 'asset_tag';
    static protected $defaultTransformer = AssetTagTransformer::class;
    static protected $defaultSerialisationLabel = 'asset_tags';
    protected $usesHardDeletes = true;

    protected $fillable = ['ranking'];

    public function __construct(array $attributes = [])
    {
        $this->addFillableRelationship('asset', 'asset_id');
        $this->addFillableRelationship('tag', 'tag_id');
        parent::__construct($attributes);
    }

    public function tag()
    {
        return $this->belongsTo(Tag::class);
    }

    public function asset()
    {
        return $this->belongsTo(Asset::class);
    }
}