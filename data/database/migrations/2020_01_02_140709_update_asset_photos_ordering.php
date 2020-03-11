<?php

use Illuminate\Database\Migrations\Migration;

class UpdateAssetPhotosOrdering extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("UPDATE `asset_photos` SET `asset_photos`.`order_index`= 0 WHERE is_featured = 1");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
    }
}