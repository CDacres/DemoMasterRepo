<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddProductTokenRoot extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('day_rates', function (Blueprint $table) {
          $table->string('token_root', 30)->index('token_root_idx');
        });
        DB::statement("UPDATE live.day_rates SET token_root = substring(md5(uuid()),3);");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('day_rates', function (Blueprint $table) {
          $table->dropColumn('token_root');
        });
    }
}
