<?php

namespace App\ORM;

use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
  public $timestamps = false;
  public $table = 'currency';
  public $guarded = [];
}
