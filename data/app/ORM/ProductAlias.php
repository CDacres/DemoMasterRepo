<?php

namespace App\ORM;

use Illuminate\Database\Eloquent\Model;

class ProductAlias extends Model
{
  public $timestamps = false;
  public $table = 'product_aliases';
  public $guarded = [];
}
