<?php

namespace App\Models;
use App\LaravelExtensions\Model\MyModel;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Transformers\AssetOfficeIncentiveTransformer;
use App\Models\Asset;

class AssetOfficeIncentive extends MyModel
{
    static protected $defaultTransformer = AssetOfficeIncentiveTransformer::class;
    static protected $defaultSerialisationLabel = 'office_incentives';
    public $table = 'office_incentives';
    use SoftDeletes;
    protected $dates = ['deleted_at'];
    protected $fillable = [
        'discount',
        'months_trigger'
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