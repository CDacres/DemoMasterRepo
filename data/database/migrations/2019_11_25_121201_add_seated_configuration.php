<?php

use Illuminate\Database\Migrations\Migration;

class AddSeatedConfiguration extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("INSERT INTO `configurations` (`id`, `desc`, `enabled`) VALUES (10, 'Seated', 1);");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("DELETE FROM `configurations` WHERE `id` = 10");
    }
}