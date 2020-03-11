<?php

namespace App\Models\Booking;
use App\LaravelExtensions\Model\MyModel;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Transformers\AssetDiscountTransformer;
use App\Models\Asset;

class AssetDiscount extends MyModel
{
    static protected $defaultTransformer = AssetDiscountTransformer::class;
    static protected $defaultSerialisationLabel = 'discounts';
    public $table = 'asset_discounts';
    use SoftDeletes;
    protected $dates = ['deleted_at'];
    protected $fillable = ['discount'];

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