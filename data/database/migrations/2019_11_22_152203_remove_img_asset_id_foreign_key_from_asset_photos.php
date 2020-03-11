<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RemoveImgAssetIdForeignKeyFromAssetPhotos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('asset_photos', function (Blueprint $table) {
            $table->dropForeign('img_asset_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('asset_photos', function (Blueprint $table) {
            $table->foreign('asset_id', 'img_asset_id')
                  ->references('id')->on('asset_audit')
                  ->onUpdate('restrict')
                  ->onDelete('restrict');
        });
    }
}
