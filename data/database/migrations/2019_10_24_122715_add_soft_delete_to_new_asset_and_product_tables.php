<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSoftDeleteToNewAssetAndProductTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn('enabled');
        });
        Schema::table('venue_room_asset_aliases', function (Blueprint $table) {
            $table->dropColumn('enabled');
        });
        Schema::table('products', function (Blueprint $table) {
            $table->softDeletes();
        });
        Schema::table('venue_room_asset_aliases', function (Blueprint $table) {
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
        Schema::table('venue_room_asset_aliases', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
        Schema::table('products', function (Blueprint $table) {
            $table->boolean('enabled')->default(1)->after('json');
        });
        Schema::table('venue_room_asset_aliases', function (Blueprint $table) {
            $table->boolean('enabled')->default(1)->after('room_asset_id');
        });
    }
}
