<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateTranslationPlaceholderInTagMeta extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tag_language_label_meta', function(Blueprint $table)
        {
            $table->string('lp_link_label_new')->default('')->after('lp_link_label');
            $table->string('lp_title_new')->nullable()->after('lp_title');
            $table->string('lp_meta_desc_new', 400)->nullable()->after('lp_meta_desc');
            $table->string('lp_h1_title_new')->nullable()->after('lp_h1_title');
            $table->string('lp_h2_title_new')->nullable()->after('lp_h2_title');
        });
        DB::statement("UPDATE `tag_language_label_meta`"
            . " SET `lp_link_label_new`=REPLACE(`lp_link_label`, '{{1}}', ':location_desc'),"
            . " `lp_title_new`=REPLACE(`lp_title`, '{{1}}', ':location_desc'),"
            . " `lp_meta_desc_new`=REPLACE(`lp_meta_desc`, '{{1}}', ':location_desc'), `lp_meta_desc_new`=REPLACE(`lp_meta_desc_new`, '{{2}}', ':parent_desc'),"
            . " `lp_h1_title_new`=REPLACE(`lp_h1_title`, '{{1}}', ':location_desc'),"
            . " `lp_h2_title_new`=REPLACE(`lp_h2_title`, '{{1}}', ':location_desc'), `lp_h2_title_new`=REPLACE(`lp_h2_title_new`, '{{2}}', ':parent_desc')");
        Schema::table('tag_language_label_meta_keywords', function(Blueprint $table)
        {
            $table->string('keyword_new')->default('')->after('keyword');
        });
        DB::statement("UPDATE `tag_language_label_meta_keywords` SET `keyword_new`=REPLACE(`keyword`, '{{1}}', ':location_desc')");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tag_language_label_meta', function(Blueprint $table)
        {
            $table->dropColumn('lp_link_label_new');
            $table->dropColumn('lp_title_new');
            $table->dropColumn('lp_meta_desc_new');
            $table->dropColumn('lp_h1_title_new');
            $table->dropColumn('lp_h2_title_new');
        });
        Schema::table('tag_language_label_meta_keywords', function(Blueprint $table)
        {
            $table->dropColumn('keyword_new');
        });
    }
}