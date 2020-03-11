<?php

namespace App\Models;

use App\LaravelExtensions\Model\MyModel;

class ImageType extends MyModel
{
    const ASSET = 1;
    const FOOD = 2;

    public $timestamps = false;
    public $table = 'image_types';
}