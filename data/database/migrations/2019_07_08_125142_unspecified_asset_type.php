<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UnspecifiedAssetType extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      DB::statement("INSERT INTO asset_types (`id`, `asset_type`, `enabled`) VALUES(100,'unspecified',1)");
      DB::statement("UPDATE live.asset_types SET id = 0 WHERE id = 100;");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
      DB::statement("DELETE FROM asset_types WHERE `id`=0");
    }
}
