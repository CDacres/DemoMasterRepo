<?php

namespace App\ORM;

use Illuminate\Database\Eloquent\Model;

class ImageTag extends Model
{
  public $timestamps = false;
  public $table = 'image_tags';
  public $guarded = [];
}
