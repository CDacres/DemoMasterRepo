<?php

use Illuminate\Database\Migrations\Migration;

class AddNewVenueType extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('venue_types')->insert([['id' => 30, 'description' => 'Cocktail Bar']]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('venue_types')->where('id', 30)->delete();
    }
}