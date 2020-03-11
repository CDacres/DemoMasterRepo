<?php

namespace App\ORM;

use Illuminate\Database\Eloquent\Model;

class UsageSupersetUsage extends Model
{
  public $timestamps = false;
  public $table = 'usage_superset_usage';
  public $guarded = [];

  public function usage_superset()
  {
    return $this->belongsTo(UsageSuperset::class, 'usageSuperset_id', 'id')->where('hidden', 0);
  }
}
