<?php

namespace App\ORM;

use Illuminate\Database\Eloquent\Model;

class HourRate extends Model
{
  public $timestamps = false;
  public $table = 'hour_rates';
  public $guarded = [];
}
