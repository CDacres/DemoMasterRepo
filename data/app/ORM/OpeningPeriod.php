<?php

namespace App\ORM;

use Illuminate\Database\Eloquent\Model;

class OpeningPeriod extends Model
{
  public $timestamps = false;
  public $table = 'opening_periods';

  public $guarded = [];

  public function asset()
  {
    return $this->belongsTo(Asset::class);
  }

  public function day()
  {
    return $this->hasOne(Day::class, 'id', 'day_id');
  }

  public function hour_rate()
  {
    return $this->hasOne(HourRate::class, 'openingPeriod_id', 'id');
  }
}
