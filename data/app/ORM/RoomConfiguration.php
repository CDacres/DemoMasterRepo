<?php

namespace App\ORM;

use Illuminate\Database\Eloquent\Model;

class RoomConfiguration extends Model
{
  public $timestamps = false;
  public $table = 'room_configuration';
  public $guarded = [];

  public function configurations()
  {
      return $this->belongsTo(Configuration::class);
  }

  public function rooms()
  {
      return $this->belongsTo(Configuration::class, 'asset_id', 'asset_id');
  }
}
