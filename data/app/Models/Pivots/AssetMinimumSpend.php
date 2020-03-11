<?php

namespace App\Models\Pivots;

use App\LaravelExtensions\Model\MyModel;
use App\Transformers\AssetMinimumSpendTransformer;
use App\Models\Asset;
use App\Models\DiningPeriod;
use App\Models\RoomAsset;

class AssetMinimumSpend extends MyModel
{
    static protected $defaultTransformer = AssetMinimumSpendTransformer::class;
    static protected $defaultSerialisationLabel = 'minimum_spend_requirements';
    public $table = 'minimum_spends';
    public $timestamps = false;
    protected $fillable = [
        'amount',
        'amount_exvat'
    ];

    public function __construct(array $attributes = [])
    {
        $this->addFillableRelationship('asset', 'asset_id');
        $this->addFillableRelationship('dining_period', 'dining_period_id');
        parent::__construct($attributes);
    }

    public function asset()
    {
        return $this->belongsTo(Asset::class);
    }

    public function dining_period()
    {
        return $this->belongsTo(DiningPeriod::class, 'dining_period_id', 'id');
    }

    public function save(array $options = [])
    {
        $requireMinSpendChange = ($this->isDirty('amount') || $this->isDirty('amount_exvat'));
        parent::save($options);
        if ($requireMinSpendChange)
        {
            $room = RoomAsset::findOrFail($this->asset_id);
            $value = $this->amount;
            if (is_null($room->minimum_spend) || $room->minimum_spend < $value)
            {
                $room->minimum_spend = $value;
                $room->save();
            }
        }
    }
}