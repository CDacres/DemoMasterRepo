<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddReservationNeededSwitchColumn extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('reservations', function(Blueprint $table)
        {
            $table->boolean('needed_switch')->default(0)->after('token');
        });
        DB::statement("UPDATE `reservations` SET `needed_switch`='1' WHERE `requires_switch`='1' AND `switch_datetime` IS NOT NULL");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("UPDATE `reservations` SET `requires_switch`='1' WHERE `needed_switch`='1' AND `switch_datetime` IS NOT NULL");
        Schema::table('reservations', function(Blueprint $table)
        {
            $table->dropColumn('needed_switch');
        });
    }
}
