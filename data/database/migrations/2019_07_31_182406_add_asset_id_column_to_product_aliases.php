<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddAssetIdColumnToProductAliases extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::table('product_aliases', function (Blueprint $table) {
      $table->integer('asset_id');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::table('product_aliases', function (Blueprint $table) {
      $table->dropColumn('asset_id');
    });
  }
}
