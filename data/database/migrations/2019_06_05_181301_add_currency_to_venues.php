<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCurrencyToVenues extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('venues', function (Blueprint $table) {
            $table->char('currency', 3)->nullable()->default('GBP')->index('currency')->after('long');
        });
        DB::statement("UPDATE `venues` INNER JOIN `rooms` ON `rooms`.`venue_id`=`venues`.`id` SET `venues`.`currency`=`rooms`.`currency`");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('venues', function (Blueprint $table) {
            $table->dropColumn('currency');
        });
    }
}