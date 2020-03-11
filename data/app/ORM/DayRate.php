<?php

namespace App\ORM;

use Illuminate\Database\Eloquent\Model;

class DayRate extends Model
{
  public $timestamps = false;
  public $table = 'day_rates';
  public $guarded = [];
}
