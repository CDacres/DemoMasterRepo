<?php

namespace App\Models\Booking;
use App\LaravelExtensions\Model\LegacyModel;
use App\Transformers\CancellationTermTransformer;
use App\Models\Asset;

class CancellationTerm extends LegacyModel
{
    public $timestamps = false;
    public $table = 'asset_cancellation';

    protected $fillable = [
        'percentage',
        'notice_days'
    ];

    static protected $defaultTransformer = CancellationTermTransformer::class;
    static protected $defaultSerialisationLabel = 'cancellation_terms';

    public function __construct(array $attributes = [])
    {
        $this->addFillableRelationship('asset', 'asset_id');
        parent::__construct($attributes);
    }

    public function asset()
    {
        return $this->belongsTo(Asset::class);
    }

    public function getPercentageAttribute()
    {
        return $this->cancel_percent/100;
    }

    public function setPercentageAttribute($value)
    {
        $this->attributes['cancel_percent'] = $value * 100;
    }

    public function getNoticeDaysAttribute()
    {
        return $this->cancel_days;
    }

    public function setNoticeDaysAttribute($value)
    {
        $this->attributes['cancel_days'] = $value;
    }
}