<?php

use Illuminate\Database\Migrations\Migration;

class UpdateReservationStatus extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("UPDATE `reservation_status` SET `name`='Waiting for Customer Review' WHERE `id`='9'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("UPDATE `reservation_status` SET `name`='Waiting for Review' WHERE `id`='9'");
    }
}