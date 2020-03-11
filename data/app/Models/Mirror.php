<?php

namespace App\Models;

use App\LaravelExtensions\Model\MyModel;

class Mirror extends MyModel
{
    public $timestamps = false;
    public $table = 'mirrors';
}