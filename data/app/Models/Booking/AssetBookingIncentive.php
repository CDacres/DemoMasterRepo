<?php

namespace App\Models\Booking;
use App\LaravelExtensions\Model\MyModel;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Transformers\AssetBookingIncentiveTransformer;
use App\Models\Asset;

class AssetBookingIncentive extends MyModel
{
    static protected $defaultTransformer = AssetBookingIncentiveTransformer::class;
    static protected $defaultSerialisationLabel = 'booking_incentives';
    public $table = 'booking_incentives';
    use SoftDeletes;
    protected $dates = ['deleted_at'];
    protected $fillable = [
        'discount',
        'bookings_trigger'
    ];

    public function __construct(array $attributes = [])
    {
        $this->addFillableRelationship('asset', 'asset_id');
        parent::__construct($attributes);
    }

    public function asset()
    {
        return $this->belongsTo(Asset::class);
    }
}