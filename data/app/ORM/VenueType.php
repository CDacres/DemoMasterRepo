<?php

namespace App\ORM;

use Illuminate\Database\Eloquent\Model;

class VenueType extends Model
{
  public $timestamps = false;
  public $table = 'venue_types';
  public $guarded = [];

  const HOTEL = 5;
  const COWORKING_SPACE = 10;
  const BAR = 18;
  const PENTHOUSE_VILLA = 24;
  const RESTAURANT = 26;
  const PUB = 29;
  const COCKTAIL_BAR = 30;
}