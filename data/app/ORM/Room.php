<?php

namespace App\ORM;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
  const CREATED_AT = 'created';
  const UPDATED_AT = 'updated';

  public $table = 'rooms';

  public $guarded = [];

  public function venue()
  {
    return $this->belongsTo(Venue::class);
  }

  public function primary_vertical()
  {
    return $this->hasOne(Vertical::class, 'id', 'primary_vertical_id');
  }

  public function office_type()
  {
    return $this->belongsTo(OfficeType::class);
  }

  public function currency_code()
  {
    return $this->belongsTo(Currency::class, 'currency', 'code');
  }

  public function usage()
  {
    return $this->belongsTo(Usage::class);
  }

  public function asset()
  {
    return $this->belongsTo(Asset::class);
  }
}
