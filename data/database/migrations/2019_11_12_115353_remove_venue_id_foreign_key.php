<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RemoveVenueIdForeignKey extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::table('rooms', function (Blueprint $table) {
      $table->dropForeign('room_venue_id');
    });
    DB::connection()->getDoctrineSchemaManager()->getDatabasePlatform()->registerDoctrineTypeMapping('enum', 'string');
    Schema::table('rooms', function (Blueprint $table) {
      $table->unsignedInteger('venue_id')->nullable()->change();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    DB::connection()->getDoctrineSchemaManager()->getDatabasePlatform()->registerDoctrineTypeMapping('enum', 'string');
    Schema::table('rooms', function (Blueprint $table) {
      $table->unsignedInteger('venue_id')->nullable(false)->change();
    });
    Schema::table('rooms', function (Blueprint $table) {
      $table->foreign('venue_id', 'room_venue_id')
        ->references('id')->on('venues')
        ->onUpdate('restrict')
        ->onDelete('restrict');
    });
  }
}
