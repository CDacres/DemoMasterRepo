<?php

namespace App\ORM;

use Illuminate\Database\Eloquent\Model;

class Day extends Model
{
  public $timestamps = false;
  public $table = 'days';
  public $guarded = [];

  public function getNameAttribute()
  {
    return lcfirst($this->attributes['name']);
  }
}
