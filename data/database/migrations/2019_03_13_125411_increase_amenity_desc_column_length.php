<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class IncreaseAmenityDescColumnLength extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('amenities', function(Blueprint $table)
        {
            $table->string('desc', 255)->default('')->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('amenities', function(Blueprint $table)
        {
            $table->string('desc', 45)->default('')->change();
        });
    }
}