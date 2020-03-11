<?php

use Illuminate\Database\Migrations\Migration;

class AddVenueStage extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("ALTER TABLE `live`.`venues` CHANGE COLUMN `stage` `stage` ENUM('Prospect', 'New Listing', 'Pending', 'Picture', 'Salvage', 'Pre-approved', 'Live', 'Rejected') NOT NULL DEFAULT 'New Listing'");
        DB::statement("UPDATE `venues` SET `stage`='Prospect' WHERE `source`='Prospect' AND `stage`='New Listing'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("UPDATE `venues` SET `stage`='New Listing' WHERE `source`='Prospect' AND `stage`='Prospect'");
        DB::statement("ALTER TABLE `live`.`venues` CHANGE COLUMN `stage` `stage` ENUM('New Listing', 'Pending', 'Picture', 'Salvage', 'Pre-approved', 'Live', 'Rejected') NOT NULL DEFAULT 'New Listing'");
    }
}