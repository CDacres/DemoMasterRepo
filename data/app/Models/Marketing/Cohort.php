<?php

namespace App\Models\Marketing;
use App\LaravelExtensions\Model\MyModel;

class Cohort extends MyModel
{
    protected $table = 'cohorts';
    public $timestamps = false;
    protected $guarded = [];
}