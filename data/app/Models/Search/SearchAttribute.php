<?php

namespace App\Models\Search;
use App\LaravelExtensions\Model\MyModel;

class SearchAttribute extends MyModel
{
    protected $table = 'search_attributes';
    public $timestamps = false;
    protected $guarded = [];
}