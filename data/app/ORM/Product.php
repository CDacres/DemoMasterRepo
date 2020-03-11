<?php

namespace App\ORM;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
  use SoftDeletes;

  public $timestamps = false;
  public $table = 'products';
  public $guarded = [];
  public $incrementing = false;
  public $keyType = 'string';
}
