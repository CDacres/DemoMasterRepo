<?php

namespace App\Models\Landing;

use App\Models\RoomAsset;
use App\LaravelExtensions\Model\MyModel;

class BLP_LandingCardChosenAsset extends MyModel
{
    public $table = 'blp_landing_card_chosen_assets';

    protected $fillable = [
        'lp_id',
        'asset_id',
        'type_id',
        'ordering'
    ];

    public function landing()
    {
        return $this->belongsTo(BLP_Landing::class, 'lp_id');
    }

    public function asset()
    {
        return $this->belongsTo(RoomAsset::class);
    }

    public function card_type()
    {
        return $this->belongsTo(BLP_LandingCardType::class, 'type_id');
    }
}