<?php
use App\Models\Tags\TagLabel;

namespace App\ORM;

use Illuminate\Database\Eloquent\Model;

class Vertical extends Model
{
  public $timestamps = false;
  public $table = 'verticals';
  public $guarded = [];

  const MEETING = 1;
  const OFFICE = 2;
  const PARTY = 3;
  const DINING = 4;
  const WEDDING = 5;
  const ART = 6;
  const SPORT = 7;
  const POPUP = 8;
  const ACTIVITY = 9;
}
