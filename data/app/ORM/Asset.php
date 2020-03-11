<?php

namespace App\ORM;

use Illuminate\Database\Eloquent\Model;

use Kalnoy\Nestedset\NodeTrait;
use Illuminate\Database\Eloquent\SoftDeletes;

class Asset extends Model
{
  use NodeTrait ;
  use SoftDeletes;

  const COMPANY = 1;
  const VENUE = 2;
  const ROOM = 3;

  public $table = 'asset_audit';
  public $guarded = [];

  public function opening_periods()
  {
    return $this->hasMany(OpeningPeriod::class, 'asset_id', 'id')->orderBy('day_id', 'ASC');
  }

  public function images()
  {
    return $this->hasMany(Image::class, 'asset_id', 'id')->orderBy('is_featured', 'DESC');
  }

  public function amenities()
  {
    return $this->belongsToMany(Amenity::class, 'asset_amenity')->withPivot(['name', 'cost', 'instructions', 'available', 'enabled']);
  }

  public function asset_configurations()
  {
    return $this->hasMany(AssetConfiguration::class, 'asset_id', 'id');
  }

  public function venue()
  {
    return $this->hasOne(Venue::class);
  }

  public function room()
  {
    return $this->hasOne(Room::class);
  }

  public function company()
  {
    return $this->hasOne(Company::class);
  }
}
