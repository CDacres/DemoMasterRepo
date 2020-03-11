<?php

namespace App\Models\Search;

use App\LaravelExtensions\Model\MyModel;

class SearchResult extends MyModel
{
    public $timestamps = false;
    public $table = 'search_results';
    protected $guarded = [];
}