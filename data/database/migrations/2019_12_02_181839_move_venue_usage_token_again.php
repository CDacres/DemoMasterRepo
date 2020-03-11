<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MoveVenueUsageTokenAgain extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('rooms', function (Blueprint $table) {
            $table->dropColumn('venue_usage_token');
        });
        Schema::table('asset_audit', function (Blueprint $table) {
            $table->string('venue_usage_token')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('asset_audit', function (Blueprint $table) {
            $table->dropColumn('venue_usage_token');
        });
        Schema::table('rooms', function (Blueprint $table) {
            $table->string('venue_usage_token')->nullable();
        });
    }
}
