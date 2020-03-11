<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RemoveBlpLandingCardTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::drop('blp_landing_cards');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::create('blp_landing_cards', function(Blueprint $table)
        {
            $table->increments('id');
            $table->unsignedInteger('lp_id')->index('lp_id_idx');
            $table->unsignedInteger('asset_id')->index('asset_id_idx');
            $table->unsignedInteger('type_id')->index('type_id_idx');
            $table->unsignedInteger('ordering');
            $table->timestamps();
            $table->unique(['lp_id', 'asset_id', 'type_id']);
            $table->foreign('lp_id', 'lp_card_lp_id')->references('id')->on('blp_landing')->onUpdate('RESTRICT')->onDelete('RESTRICT');
            $table->foreign('asset_id', 'lp_card_asset_id')->references('id')->on('asset_audit')->onUpdate('RESTRICT')->onDelete('RESTRICT');
            $table->foreign('type_id', 'lp_card_type_id')->references('id')->on('blp_landing_card_types')->onUpdate('RESTRICT')->onDelete('RESTRICT');
        });
    }
}