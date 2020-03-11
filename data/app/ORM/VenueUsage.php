<?php

namespace App\ORM;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class VenueUsage extends Model
{
  use SoftDeletes;

  public $timestamps = false;
  public $table = 'venue_usages';
  public $guarded = [];

  public function room() {
    return $this->hasOne(Room::class, 'asset_id', 'room_asset_id');
  }

  public function roomAsset() {
    return $this->hasOne(Asset::class, 'id', 'room_asset_id');
  }
}
