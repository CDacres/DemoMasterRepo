<?php

namespace App\ORM;

use Illuminate\Database\Eloquent\Model;

class Usage extends Model
{
  public $timestamps = false;
  public $table = 'usages';
  public $guarded = [];

  const PRIVATEOFFICE = 1;
  const MEETINGROOM = 3;
  const CONFERENCEROOM = 4;
  const OPENDESK = 5;
  const EVENTFUNCTION = 6;
  const TRAININGROOM = 12;
  const PRIVATEDESK = 13;
  const DEDICATEDDESK = 14;

  public function usage_superset_usage()
  {
    return $this->hasMany(UsageSupersetUsage::class, 'usage_id', 'id');
  }
}
