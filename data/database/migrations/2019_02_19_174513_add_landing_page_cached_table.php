<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddLandingPageCachedTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('blp_landing_url_cache', function(Blueprint $table)
        {
            $table->increments('id');
            $table->string('url', 100);
            $table->dateTime('last_cached');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('blp_landing_url_cache');
    }
}