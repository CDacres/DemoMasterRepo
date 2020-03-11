<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RemoveTokenRootColumn extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('day_rates', function (Blueprint $table) {
          $table->dropColumn('token_root');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('day_rates', function (Blueprint $table) {
          $table->string('token_root', 30)->index('token_root_idx');
        });
    }

}
