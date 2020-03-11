<?php

namespace App\Models;

use App\LaravelExtensions\Model\MyModel;
use Illuminate\Database\Eloquent\SoftDeletes;

class Henry extends MyModel
{
    public $table = 'scrape_audit';

    use SoftDeletes;
    protected $dates = ['deleted_at'];

    protected $fillable = [
        'version',
        'batch_id',
        'url',
        'asset_id',
        'spider_name',
        'json_signature'
    ];

    public function scopeJoinAsset($query)
    {
        return $query->join('asset_audit', 'asset_audit.id', 'scrape_audit.asset_id')->orderBy('asset_type_id', 'DESC');
    }

    public function scopeWhereBatchId($query, $batch_id)
    {
        return $query->where('batch_id', $batch_id);
    }

    public function scopeWhereVersion($query, $version)
    {
        return $query->where('version', $version);
    }
}