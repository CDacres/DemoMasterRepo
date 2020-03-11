<?php

namespace App\ORM;

use Illuminate\Database\Eloquent\Model;

class AssetTag extends Model
{
  public $timestamps = false;
  public $table = 'asset_tag';
  public $guarded = [];
}