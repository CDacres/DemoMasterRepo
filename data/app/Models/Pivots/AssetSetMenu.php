<?php

namespace App\Models\Pivots;

use App\LaravelExtensions\Model\MyModel;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Transformers\AssetSetMenuTransformer;
use App\Models\Asset;
use App\Models\DiningPeriod;

class AssetSetMenu extends MyModel
{
    static protected $defaultTransformer = AssetSetMenuTransformer::class;
    static protected $defaultSerialisationLabel = 'set_menus';
    public $table = 'set_menus';
    public $timestamps = false;
    use SoftDeletes;
    protected $dates = ['deleted_at'];
    protected $fillable = ['amount'];

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
}