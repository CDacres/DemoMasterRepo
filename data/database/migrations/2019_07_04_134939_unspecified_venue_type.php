<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UnspecifiedVenueType extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      DB::statement("INSERT INTO venue_types (`id`, `description`, `enabled`) VALUES(100,'Unspecified',1)");
      DB::statement("UPDATE live.venue_types SET id = 0 WHERE id = 100;");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
      DB::statement("DELETE FROM venue_types WHERE `id`=0");
    }
}
