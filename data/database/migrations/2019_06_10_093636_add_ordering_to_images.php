<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddOrderingToImages extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::table('asset_photos', function (Blueprint $table) {
      $table->smallInteger('order_index')->nullable();
    });
    DB::statement("UPDATE `asset_photos` SET `asset_photos`.`order_index`= 1 WHERE is_featured = 1");
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::table('asset_photos', function (Blueprint $table) {
      $table->dropColumn('order_index');
    });
  }
}
