<?php

namespace App\ORM;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
  const CREATED_AT = 'created';
  const UPDATED_AT = 'updated';

  public $table = 'companies';

  public $guarded = [];
}
