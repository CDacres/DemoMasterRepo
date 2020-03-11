<?php

namespace App\ORM;

use Illuminate\Database\Eloquent\Model;

class Amenity extends Model
{
  public $timestamps = false;
  public $table = 'amenities';
  public $guarded = [];

  const PROJECTOR = 26;
}
