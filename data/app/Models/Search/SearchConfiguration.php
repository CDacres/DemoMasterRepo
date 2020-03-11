<?php

namespace App\Models\Search;
use App\LaravelExtensions\Model\MyModel;

class SearchConfiguration extends MyModel
{
    protected $table = 'search_configurations';
    public $timestamps = false;
    protected $guarded = [];
}