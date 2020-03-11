<?php

namespace App\Models\Landing;

use App\Transformers\StandardTransformer;
use App\LaravelExtensions\Model\MyModel;
use App\Models\Tags\TagLabel;

class BLP extends MyModel
{
    static protected $defaultTransformer = StandardTransformer::class;

    protected $fillable = [
        'location_id',
        'tag_label_id'
    ];

    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    public function tag_label()
    {
        return $this->belongsTo(TagLabel::class);
    }
}