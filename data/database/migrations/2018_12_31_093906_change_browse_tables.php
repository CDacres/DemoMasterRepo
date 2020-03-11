<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeBrowseTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('browse_urls', function(Blueprint $table)
        {
            $table->unsignedInteger('locale_id')->index('locale_id_idx')->after('browse_id');
            $table->string('url', 100)->after('locale_id');
        });
        DB::statement("UPDATE `browse_urls` INNER JOIN `blp_urls` ON `blp_urls`.`id`=`browse_urls`.`blp_url_id` INNER JOIN `locales` ON `locales`.`domain_code`=SUBSTRING_INDEX(`blp_urls`.`url`, '/', 1) SET `browse_urls`.`locale_id`=`locales`.`id`, `browse_urls`.`url`=CONCAT('/', SUBSTRING_INDEX(`blp_urls`.`url`, '/', -1))");
        Schema::table('browse_urls', function(Blueprint $table)
        {
            $table->unique(['locale_id', 'url'], 'browse_urls_locale_id_url_unique');
            $table->foreign('locale_id', 'browse_url_locale_id')->references('id')->on('locales')->onUpdate('RESTRICT')->onDelete('RESTRICT');
            $table->dropForeign('browse_url_blp_url_id');
            $table->dropUnique('blp_url_id_UNIQUE');
            $table->dropColumn('blp_url_id');
        });
        Schema::drop('blp_urls');
        Schema::rename('browse', 'blp_browse');
        Schema::rename('browse_urls', 'blp_browse_urls');
        Schema::rename('browse_cards', 'blp_browse_cards');
        Schema::create('blp_browse_info', function(Blueprint $table)
        {
            $table->increments('id');
            $table->unsignedInteger('browse_id')->index('browse_id_idx');
            $table->unsignedInteger('banner_img_id')->nullable()->index('banner_img_id_idx');
            $table->string('banner_title', 255)->nullable();
            $table->string('banner_button', 255)->nullable();
            $table->string('banner_text', 255)->nullable();
            $table->string('banner_text_color', 7)->nullable();
            $table->string('card_title', 255)->nullable();
            $table->string('card_subtitle', 255)->nullable();
            $table->string('help_title', 255)->nullable();
            $table->string('help_subtitle', 255)->nullable();
            $table->text('html_bottom')->nullable();
            $table->text('html_top')->nullable();
            $table->string('nearby_title', 255)->nullable();
            $table->timestamps();
            $table->foreign('browse_id', 'browse_info_browse_id')->references('id')->on('blp_browse')->onUpdate('RESTRICT')->onDelete('RESTRICT');
        });
        DB::statement("INSERT INTO `blp_browse_info` (`browse_id`, `banner_img_id`, `banner_title`, `banner_button`, `banner_text`, `banner_text_color`, `card_title`, `card_subtitle`, `help_title`, `help_subtitle`, `html_bottom`, `html_top`, `nearby_title`)"
            . " SELECT `id`, `banner_img_id`, `banner_title`, `banner_button`, `banner_text`, `banner_text_color`, `card_title`, `card_subtitle`, `help_title`, `help_subtitle`, `html_bottom`, `html_top`, `nearby_title` FROM `blp_browse`");
        Schema::create('blp_browse_meta', function(Blueprint $table)
        {
            $table->increments('id');
            $table->unsignedInteger('browse_id')->index('browse_id_idx');
            $table->string('page_title', 255)->nullable();
            $table->string('page_subtitle', 255)->nullable();
            $table->string('meta_title', 255)->nullable();
            $table->string('meta_desc', 400)->nullable();
            $table->string('meta_keyword', 600)->nullable();
            $table->string('schema_name', 255)->nullable();
            $table->string('schema_desc', 400)->nullable();
            $table->timestamps();
            $table->foreign('browse_id', 'browse_meta_browse_id')->references('id')->on('blp_browse')->onUpdate('RESTRICT')->onDelete('RESTRICT');
        });
        DB::statement("INSERT INTO `blp_browse_meta` (`browse_id`, `page_title`, `page_subtitle`, `meta_title`, `meta_desc`, `meta_keyword`, `schema_name`, `schema_desc`) SELECT `id`, `page_title`, `page_subtitle`, `meta_title`, `meta_desc`, `meta_keyword`, `schema_name`, `schema_desc` FROM `blp_browse`");
        Schema::table('blp_browse', function (Blueprint $table) {
            $table->dropColumn(['banner_img_id', 'banner_title', 'banner_button', 'banner_text', 'banner_text_color', 'card_title', 'card_subtitle', 'help_title', 'help_subtitle', 'html_bottom', 'html_top', 'nearby_title', 'page_title', 'page_subtitle', 'meta_title', 'meta_desc', 'meta_keyword', 'schema_name', 'schema_desc']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::rename('blp_browse', 'browse');
        Schema::rename('blp_browse_urls', 'browse_urls');
        Schema::rename('blp_browse_cards', 'browse_cards');
        Schema::create('blp_urls', function(Blueprint $table)
        {
            $table->increments('id');
            $table->string('url', 100)->unique('url_UNIQUE');
            $table->timestamps();
        });
        DB::statement("INSERT INTO `blp_urls` (`url`) SELECT CONCAT(`domain_code`, `url`) FROM `browse_urls` INNER JOIN `locales` ON `locales`.`id`=`browse_urls`.`locale_id`");
        Schema::table('browse_urls', function(Blueprint $table)
        {
            $table->unsignedInteger('blp_url_id')->after('browse_id');
        });
        DB::statement("UPDATE `browse_urls` INNER JOIN `blp_urls` ON `blp_urls`.`url`=CONCAT(SUBSTRING_INDEX(`blp_urls`.`url`, '/', 1), `browse_urls`.`url`) INNER JOIN `locales` ON `locales`.`id`=`browse_urls`.`locale_id` AND `locales`.`domain_code`=SUBSTRING_INDEX(`blp_urls`.`url`, '/', 1) SET `browse_urls`.`blp_url_id`=`blp_urls`.`id`");
        Schema::table('browse_urls', function(Blueprint $table)
        {
            $table->unique('blp_url_id', 'blp_url_id_UNIQUE');
            $table->foreign('blp_url_id', 'browse_url_blp_url_id')->references('id')->on('blp_urls')->onUpdate('RESTRICT')->onDelete('RESTRICT');
            $table->dropForeign('browse_url_locale_id');
            $table->dropUnique('browse_urls_locale_id_url_unique');
            $table->dropColumn('locale_id');
            $table->dropColumn('url');
        });
        Schema::table('browse', function(Blueprint $table)
        {
            $table->string('page_title', 255)->nullable()->after('tag_label_id');
            $table->string('page_subtitle', 255)->nullable()->after('page_title');
            $table->unsignedInteger('banner_img_id')->nullable()->index('banner_img_id_idx')->after('page_subtitle');
            $table->string('banner_title', 255)->nullable()->after('banner_img_id');
            $table->string('banner_button', 255)->nullable()->after('banner_title');
            $table->string('banner_text', 255)->nullable()->after('banner_button');
            $table->string('banner_text_color', 7)->nullable()->after('banner_text');
            $table->string('card_title', 255)->nullable()->after('banner_text_color');
            $table->string('card_subtitle', 255)->nullable()->after('card_title');
            $table->string('help_title', 255)->nullable()->after('card_subtitle');
            $table->string('help_subtitle', 255)->nullable()->after('help_title');
            $table->text('html_bottom')->nullable()->after('help_subtitle');
            $table->text('html_top')->nullable()->after('html_bottom');
            $table->string('nearby_title', 255)->nullable()->after('html_top');
            $table->string('meta_title', 255)->nullable()->after('nearby_title');
            $table->string('meta_desc', 400)->nullable()->after('meta_title');
            $table->string('meta_keyword', 600)->nullable()->after('meta_desc');
            $table->string('schema_name', 255)->nullable()->after('meta_keyword');
            $table->string('schema_desc', 400)->nullable()->after('schema_name');
        });
        DB::statement("UPDATE `browse` INNER JOIN `blp_browse_info` ON `browse`.`id`=`blp_browse_info`.`browse_id`"
            . " SET `browse`.`banner_img_id`=`blp_browse_info`.`banner_img_id`,"
            . " `browse`.`banner_title`=`blp_browse_info`.`banner_title`,"
            . " `browse`.`banner_button`=`blp_browse_info`.`banner_button`,"
            . " `browse`.`banner_text`=`blp_browse_info`.`banner_text`,"
            . " `browse`.`card_title`=`blp_browse_info`.`card_title`,"
            . " `browse`.`card_subtitle`=`blp_browse_info`.`card_subtitle`,"
            . " `browse`.`help_title`=`blp_browse_info`.`help_title`,"
            . " `browse`.`help_subtitle`=`blp_browse_info`.`help_subtitle`,"
            . " `browse`.`html_bottom`=`blp_browse_info`.`html_bottom`,"
            . " `browse`.`html_top`=`blp_browse_info`.`html_top`,"
            . " `browse`.`nearby_title`=`blp_browse_info`.`nearby_title`");
        DB::statement("UPDATE `browse` INNER JOIN `blp_browse_meta` ON `browse`.`id`=`blp_browse_meta`.`browse_id`"
            . " SET `browse`.`page_title`=`blp_browse_meta`.`page_title`,"
            . " `browse`.`page_subtitle`=`blp_browse_meta`.`page_subtitle`,"
            . " `browse`.`meta_title`=`blp_browse_meta`.`meta_title`,"
            . " `browse`.`meta_desc`=`blp_browse_meta`.`meta_desc`,"
            . " `browse`.`meta_keyword`=`blp_browse_meta`.`meta_keyword`,"
            . " `browse`.`schema_name`=`blp_browse_meta`.`schema_name`,"
            . " `browse`.`schema_desc`=`blp_browse_meta`.`schema_desc`");
        Schema::drop('blp_browse_info');
        Schema::drop('blp_browse_meta');
    }
}