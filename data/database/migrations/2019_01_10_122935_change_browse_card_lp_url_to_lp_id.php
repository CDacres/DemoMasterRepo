<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeBrowseCardLpUrlToLpId extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('blp_browse_cards', function(Blueprint $table)
        {
            $table->unsignedInteger('lp_id')->index('lp_id_idx')->after('ordering');
        });
        DB::statement("UPDATE `blp_browse_cards` INNER JOIN `blp_landing_urls` ON `blp_landing_urls`.`url`=CONCAT('/', `blp_browse_cards`.`lp_url`) SET `blp_browse_cards`.`lp_id`=`blp_landing_urls`.`lp_id`");
        Schema::table('blp_browse_cards', function(Blueprint $table)
        {
            $table->unique(['browse_id', 'lp_id'], 'browse_cards_browse_id_lp_id_unique');
            $table->foreign('lp_id', 'browse_cards_lp_id')->references('id')->on('blp_landing')->onUpdate('RESTRICT')->onDelete('RESTRICT');
            $table->dropUnique('browse_cards_browse_id_lp_url_unique');
            $table->dropColumn('lp_url');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('blp_browse_cards', function(Blueprint $table)
        {
            $table->string('lp_url', 100)->after('ordering');
        });
        DB::statement("UPDATE `blp_browse_cards` INNER JOIN `blp_landing_urls` ON `blp_landing_urls`.`lp_id`=`blp_browse_cards`.`lp_id` SET `blp_browse_cards`.`lp_url`=TRIM(LEADING '/' FROM `blp_landing_urls`.`url`)");
        Schema::table('blp_browse_cards', function(Blueprint $table)
        {
            $table->unique(['browse_id', 'lp_url'], 'browse_cards_browse_id_lp_url_unique');
            $table->dropForeign('browse_cards_lp_id');
            $table->dropUnique('browse_cards_browse_id_lp_id_unique');
            $table->dropColumn('lp_id');
        });
    }
}