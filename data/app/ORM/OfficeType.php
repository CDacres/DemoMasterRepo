<?php

namespace App\ORM;

use Illuminate\Database\Eloquent\Model;

class OfficeType extends Model
{
  public $timestamps = false;
  public $table = 'office_types';

  const HOTDESK = 1;
  const DEDICATEDDESK = 2;
  const PRIVATEOFFICE = 3;
}
