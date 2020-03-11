<?php

namespace App\Models\Landing;

use App\Models\Attribute;
use App\LaravelExtensions\Model\MyModel;

class BLP_LandingAttribute extends MyModel
{
    public $table = 'blp_landing_attributes';

    protected $fillable = [
        'lp_id',
        'attribute_id'
    ];

    public function landing()
    {
        return $this->belongsTo(BLP_Landing::class, 'lp_id');
    }

    public function attribute()
    {
        return $this->belongsTo(Attribute::class, 'attribute_id');
    }
}