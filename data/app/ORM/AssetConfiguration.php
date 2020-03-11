<?php

namespace App\ORM;

use Illuminate\Database\Eloquent\Model;

class AssetConfiguration extends Model
{
  public $timestamps = false;
  public $table = 'room_configuration';
  public $guarded = [];

  public function asset()
  {
    return $this->belongsTo(Asset::class);
  }
}
