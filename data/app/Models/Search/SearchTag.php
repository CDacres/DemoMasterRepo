<?php

namespace App\Models\Search;
use App\LaravelExtensions\Model\MyModel;

class SearchTag extends MyModel
{
    protected $table = 'search_tags';
    public $timestamps = false;
    protected $guarded = [];
}