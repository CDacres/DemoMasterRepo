<?php

namespace App\ORM;

use Illuminate\Database\Eloquent\Model;

class Venue extends Model
{
  const CREATED_AT = 'created';
  const UPDATED_AT = 'updated';

  public $table = 'venues';

  public $guarded = [];

  public function asset()
  {
    return $this->belongsTo(Asset::class);
  }
}
