<?php

namespace App\ORM;

use Illuminate\Database\Eloquent\Model;

class AssetAmenity extends Model
{
  public $timestamps = false;
  public $table = 'asset_amenity';
  public $guarded = [];

  public function amenity()
  {
      return $this->belongsTo(Amenity::class);
  }

  public function asset()
  {
      return $this->belongsTo(Asset::class);
  }

  public function facility_type()
  {
      return $this->belongsTo(AmenityType::class);
  }

  public function filter()
  {
      return $this->belongsTo(Amenity::class)->where('filterable', true);
  }
}
