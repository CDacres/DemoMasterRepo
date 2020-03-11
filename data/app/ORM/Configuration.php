<?php

namespace App\ORM;

use Illuminate\Database\Eloquent\Model;

class Configuration extends Model
{
  public $timestamps = false;
  public $table = 'configurations';
  public $guarded = [];

  const BOARDROOM = 1;
  const CLASSROOM = 2;
  const BANQUET = 3;
  const THEATRE = 4;
  const DESK = 5;
  const RECEPTION = 6;
  const U_SHAPED = 7;
  const CABARET = 8;
  const OFFICE = 9;

  public function rooms()
  {
    return $this->belongsToMany(Room::class, 'room_configuration')->using(\Pivots\RoomConfiguration::class);
  }

  public function getNameAttribute()
  {
    return $this->desc;
  }

  public function setNameAttribute($value)
  {
    $this->attributes['desc'] = $value;
  }
}
