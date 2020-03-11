<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddBusinessUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('business_users', function(Blueprint $table)
        {
            $table->increments('id');
            $table->unsignedInteger('user_id')->unique('bus_user_UNIQUE');
            $table->dateTime('created');
            $table->boolean('enabled')->default(1);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('business_users');
    }
}