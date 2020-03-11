<?php

namespace App\Models\Marketing;
use App\LaravelExtensions\Model\MyModel;

class CohortPivot extends MyModel
{
    protected $table = 'cohort_pivots';
    public $timestamps = false;
    protected $guarded = [];
}