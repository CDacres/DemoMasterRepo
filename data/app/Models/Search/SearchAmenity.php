<?php

namespace App\Models\Search;
use App\LaravelExtensions\Model\MyModel;

class SearchAmenity extends MyModel
{
    protected $table = 'search_amenities';
    public $timestamps = false;
    protected $guarded = [];
}