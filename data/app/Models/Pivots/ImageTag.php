<?php

namespace App\Models\Pivots;

use App\Models\Tags\Tag;
use App\Models\AssetImage;
use App\Transformers\ImageTagTransformer;
use App\LaravelExtensions\Model\LegacyModel;

class ImageTag extends LegacyModel
{
    public $timestamps = false;
    public $table = 'image_tags';
    static protected $defaultTransformer = ImageTagTransformer::class;
    static protected $defaultSerialisationLabel = 'image_tags';
    protected $usesHardDeletes = true;

    public function __construct(array $attributes = [])
    {
        $this->addFillableRelationship('image', 'image_id');
        $this->addFillableRelationship('tag', 'tag_id');
        parent::__construct($attributes);
    }

    public function tag()
    {
        return $this->belongsTo(Tag::class);
    }

    public function image()
    {
        return $this->belongsTo(AssetImage::class);
    }
}