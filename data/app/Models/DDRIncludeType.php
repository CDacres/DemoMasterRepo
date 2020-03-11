<?php

namespace App\Models;

use App\LaravelExtensions\Model\MyModel;

class DDRIncludeType extends MyModel
{
    public $timestamps = false;
    public $table = 'ddr_include_types';
    static protected $defaultSerialisationLabel = 'ddr_include_types';
}