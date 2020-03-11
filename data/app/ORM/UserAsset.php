<?php

namespace App\ORM;

use Illuminate\Database\Eloquent\Model;

class UserAsset extends Model
{
  public $timestamps = false;
  public $table = 'user_asset_privileges';

  public $guarded = [];

  public function user()
  {
    return $this->belongsTo(User::class);
  }

  public function asset()
  {
    return $this->belongsTo(Asset::class);
  }
}
