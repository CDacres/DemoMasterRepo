<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTokenColumnToAssetPhotos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('asset_photos', function (Blueprint $table) {
            $table->string('token')->after('comments');
        });
        DB::statement("UPDATE `live`.`asset_photos` SET `token` = SUBSTRING_INDEX(`name`, '.', 1)");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('asset_photos', function (Blueprint $table) {
            $table->dropColumn('token');
        });
    }
}