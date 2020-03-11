<?php

namespace App\ORM;

use Illuminate\Database\Eloquent\Model;
use Kalnoy\Nestedset\NodeTrait;

class Tag extends Model
{
  use NodeTrait;

  public $table = 'tags';
  public $guarded = [];

  const MEETING = 1;
  const OFFICE_SPACE = 2;
  const PARTY = 3;
  const DINING = 4;
  const WEDDING = 5;
  const AUDITORIUM = 19;
  const BAR = 24;
  const COCKTAIL_BAR = 77;
  const LECTURE_THEATRE = 82;
  const CONFERENCE_ROOM = 84;
  const RESTAURANT = 113;
  const HALL = 128;
  const BOARDROOM = 138;
  const INTERVIEW_ROOM = 149;
  const MEETING_ROOMS = 152;
  const PRESENTATION = 156;
  const PENTHOUSE = 206;
  const PUB = 237;
  const LECTURE = 268;
  const TRAINING_ROOM = 271;
  const CONFERENCE_CENTRE = 299;
  const PRIVATE_OFFICE = 300;
  const COWORKING_SPACE = 304;
  const HOT_DESK = 305;
  const TAGUNGSHOTEL = 307;
  const TAGUNGSRAUM = 308;
  const SEMINARHOTEL = 309;
  const KONFERENZ_HOTEL = 310;
  const EVENTLOCATION = 311;

  public function getLftName()
  {
    return 'lft';
  }

  public function getRgtName()
  {
    return 'rgt';
  }

}
