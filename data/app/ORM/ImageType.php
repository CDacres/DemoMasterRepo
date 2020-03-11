<?php

namespace App\ORM;

use Illuminate\Database\Eloquent\Model;

class ImageType extends Model
{
  const ASSET = 1;
  const FOOD = 2;
  public $guarded = [];

  public $timestamps = false;
  public $table = 'image_types';
}
