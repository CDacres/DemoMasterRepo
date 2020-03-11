<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddBannerTextColour extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('browse', function(Blueprint $table)
        {
            $table->string('banner_text_color', 7)->nullable()->after('banner_text');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('browse', function(Blueprint $table)
        {
            $table->dropColumn('banner_text_color');
        });
    }
}