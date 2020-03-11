<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLocationAssetTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('location_asset', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('location_id')->unsigned()->index('loc_asset_location_id_idx');
            $table->integer('approved_venue_count')->unsigned()->nullable();
            $table->integer('unapproved_venue_count')->unsigned()->nullable();
            $table->boolean('enabled')->default(1);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('location_asset');
    }
}