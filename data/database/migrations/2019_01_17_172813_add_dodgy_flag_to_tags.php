<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddDodgyFlagToTags extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tags', function (Blueprint $table) {
            $table->boolean('dodgy')->after('search_falls_back');
        });
        DB::statement("UPDATE `tags` INNER JOIN (SELECT COUNT(`language_code`), `tag_id` FROM `tag_language_labels`"
            . " GROUP BY `tag_id`"
            . " HAVING COUNT(`language_code`) < 3) alias ON alias.tag_id=`tags`.`id`"
            . " SET `dodgy`=1 WHERE `id` IN (307, 308, 309, 310, 311, 313, 314)");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tags', function (Blueprint $table) {
            $table->dropColumn('dodgy');
        });
    }
}