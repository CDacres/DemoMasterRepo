<?php

namespace App\ORM;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
  public $timestamps = false;
  public $table = 'users';

  public $guarded = [];
}
