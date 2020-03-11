<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVenueRoomAssetAliasesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('venue_room_asset_aliases', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('venue_asset_id');
            $table->integer('room_asset_id');
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
        Schema::dropIfExists('venue_room_asset_aliases');
    }
}
