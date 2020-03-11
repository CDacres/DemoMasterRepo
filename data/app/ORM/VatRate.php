<?php

namespace App\ORM;

use Illuminate\Database\Eloquent\Model;

class VatRate extends Model
{
  const STANDARD = 'Default';
  const ZERO = 'Zero';

  public $timestamps = false;
  public $table = 'vat_rates';
}
