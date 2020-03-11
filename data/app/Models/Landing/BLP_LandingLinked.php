<?php

namespace App\Models\Landing;

use App\LaravelExtensions\Model\MyModel;

class BLP_LandingLinked extends MyModel
{
    public $table = 'blp_landing_linked';

    protected $fillable = [
        'lp_id',
        'linked_lp_id'
    ];

    public function landing()
    {
        return $this->belongsTo(BLP_Landing::class, 'lp_id');
    }

    public function linked_landing()
    {
        return $this->belongsTo(BLP_Landing::class, 'linked_lp_id');
    }
}