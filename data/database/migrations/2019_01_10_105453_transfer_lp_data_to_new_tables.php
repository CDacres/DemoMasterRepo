<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class TransferLpDataToNewTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('blp_landing', function(Blueprint $table)
        {
            $table->unsignedInteger('old_lp_id');
        });
        DB::statement("INSERT INTO `blp_landing` (`old_lp_id`, `location_id`, `tag_label_id`, `created_at`, `updated_at`)"
            . " SELECT `landing_pages`.`id`, `landing_pages`.`location_id`, `tag_language_labels`.`id`, now(), now() FROM `landing_pages`"
            . " INNER JOIN `landing_page_language` ON `landing_pages`.`id` = `landing_page_language`.`landing_page_id`"
            . " INNER JOIN `locations` ON `landing_pages`.`location_id` = `locations`.`id`"
            . " INNER JOIN `tag_language_labels` ON `landing_page_language`.`lang_code` = `tag_language_labels`.`language_code` AND `landing_pages`.`tag_id` = `tag_language_labels`.`tag_id`"
            . " WHERE `landing_pages`.`enabled` = 1"
            . " AND `locations`.`enabled` = 1"
            . " AND `locations`.`parent_id` <> 0"
            . " AND `landing_page_language`.`enabled` = 1"
            . " AND `tag_language_labels`.`preferred` = 1"
            . " ORDER BY `landing_pages`.`id`, `landing_page_language`.`id`");
        DB::statement("INSERT INTO `blp_landing_attributes` (`lp_id`, `attribute_id`, `created_at`, `updated_at`)"
            . " SELECT `blp_landing`.`id`, `landing_pages`.`attribute_id`, now(), now() FROM `landing_pages`"
            . " INNER JOIN `landing_page_language` ON `landing_pages`.`id` = `landing_page_language`.`landing_page_id`"
            . " INNER JOIN `locations` ON `landing_pages`.`location_id` = `locations`.`id`"
            . " INNER JOIN `tag_language_labels` ON `landing_page_language`.`lang_code` = `tag_language_labels`.`language_code` AND `landing_pages`.`tag_id` = `tag_language_labels`.`tag_id`"
            . " INNER JOIN `blp_landing` ON `landing_pages`.`id` = `blp_landing`.`old_lp_id`"
            . " WHERE `landing_pages`.`enabled` = 1"
            . " AND `locations`.`enabled` = 1"
            . " AND `locations`.`parent_id` <> 0"
            . " AND `landing_page_language`.`enabled` = 1"
            . " AND `tag_language_labels`.`preferred` = 1"
            . " AND `landing_pages`.`attribute_id` IS NOT NULL"
            . " ORDER BY `landing_pages`.`id`, `landing_page_language`.`id`");
        DB::statement("INSERT INTO `blp_landing_info` (`lp_id`, `html_bottom`, `html_top`, `created_at`, `updated_at`)"
            . " SELECT `blp_landing`.`id`, `landing_page_language`.`desc_text`, `landing_page_language`.`desc_text_top`, now(), now() FROM `landing_pages`"
            . " INNER JOIN `landing_page_language` ON `landing_pages`.`id` = `landing_page_language`.`landing_page_id`"
            . " INNER JOIN `locations` ON `landing_pages`.`location_id` = `locations`.`id`"
            . " INNER JOIN `tag_language_labels` ON `landing_page_language`.`lang_code` = `tag_language_labels`.`language_code` AND `landing_pages`.`tag_id` = `tag_language_labels`.`tag_id`"
            . " INNER JOIN `blp_landing` ON `landing_pages`.`id` = `blp_landing`.`old_lp_id`"
            . " WHERE `landing_pages`.`enabled` = 1"
            . " AND `locations`.`enabled` = 1"
            . " AND `locations`.`parent_id` <> 0"
            . " AND `landing_page_language`.`enabled` = 1"
            . " AND `tag_language_labels`.`preferred` = 1"
            . " ORDER BY `landing_pages`.`id`, `landing_page_language`.`id`");
        DB::statement("INSERT INTO `blp_landing_meta` (`lp_id`, `page_title`, `page_subtitle`, `meta_title`, `meta_desc`, `meta_keyword`, `schema_name`, `schema_desc`, `created_at`, `updated_at`)"
            . " SELECT `blp_landing`.`id`, `landing_page_language`.`h1`, `landing_page_language`.`h2`, `landing_page_language`.`meta_title`, `landing_page_language`.`meta_desc`, `landing_page_language`.`meta_keyword`, `landing_page_language`.`meta_title`, `landing_page_language`.`meta_desc`, now(), now() FROM `landing_pages`"
            . " INNER JOIN `landing_page_language` ON `landing_pages`.`id` = `landing_page_language`.`landing_page_id`"
            . " INNER JOIN `locations` ON `landing_pages`.`location_id` = `locations`.`id`"
            . " INNER JOIN `tag_language_labels` ON `landing_page_language`.`lang_code` = `tag_language_labels`.`language_code` AND `landing_pages`.`tag_id` = `tag_language_labels`.`tag_id`"
            . " INNER JOIN `blp_landing` ON `landing_pages`.`id` = `blp_landing`.`old_lp_id`"
            . " WHERE `landing_pages`.`enabled` = 1"
            . " AND `locations`.`enabled` = 1"
            . " AND `locations`.`parent_id` <> 0"
            . " AND `landing_page_language`.`enabled` = 1"
            . " AND `tag_language_labels`.`preferred` = 1"
            . " ORDER BY `landing_pages`.`id`, `landing_page_language`.`id`");
        DB::statement("INSERT INTO `blp_landing_urls` (`lp_id`, `locale_id`, `url`, `preferred`, `created_at`, `updated_at`)"
            . " SELECT `blp_landing`.`id`, `locales`.`id`, CONCAT('/', `landing_page_urls`.`url`), `landing_page_urls`.`preferred`, now(), now() FROM `landing_pages`"
            . " INNER JOIN `landing_page_language` ON `landing_pages`.`id` = `landing_page_language`.`landing_page_id`"
            . " INNER JOIN `landing_page_urls` ON `landing_page_language`.`id` = `landing_page_urls`.`landing_page_language_id`"
            . " INNER JOIN `locations` ON `landing_pages`.`location_id` = `locations`.`id`"
            . " INNER JOIN `locales` ON `locations`.`country` = `locales`.`country_code`"
            . " INNER JOIN `tag_language_labels` ON `landing_page_language`.`lang_code` = `tag_language_labels`.`language_code` AND `landing_pages`.`tag_id` = `tag_language_labels`.`tag_id`"
            . " INNER JOIN `blp_landing` ON `landing_pages`.`id` = `blp_landing`.`old_lp_id`"
            . " WHERE `landing_pages`.`enabled` = 1"
            . " AND `locations`.`enabled` = 1"
            . " AND `locations`.`parent_id` <> 0"
            . " AND `landing_page_language`.`enabled` = 1"
            . " AND `tag_language_labels`.`preferred` = 1"
            . " ORDER BY `landing_pages`.`id`, `landing_page_language`.`id`");
        DB::statement("INSERT INTO `blp_landing_linked` (`lp_id`, `linked_lp_id`, `created_at`, `updated_at`)"
            . " SELECT `blp_landing`.`id`, linked_blp.id, now(), now() FROM `landing_pages`"
            . " INNER JOIN `landing_page_language` ON `landing_pages`.`id` = `landing_page_language`.`landing_page_id`"
            . " INNER JOIN `locations` ON `landing_pages`.`location_id` = `locations`.`id`"
            . " INNER JOIN `tag_language_labels` ON `landing_page_language`.`lang_code` = `tag_language_labels`.`language_code` AND `landing_pages`.`tag_id` = `tag_language_labels`.`tag_id`"
            . " INNER JOIN `landing_page_similar_links` ON `landing_pages`.`id` = `landing_page_similar_links`.`landing_page_id`"
            . " INNER JOIN `landing_pages` AS linked_page ON `landing_page_similar_links`.`linked_landing_page_id` = linked_page.id"
            . " INNER JOIN `landing_page_language` AS linked_page_lang ON linked_page.id = linked_page_lang.`landing_page_id`"
            . " INNER JOIN `locations` AS linked_location ON linked_page.`location_id` = linked_location.`id`"
            . " INNER JOIN `tag_language_labels` AS linked_tag_lang ON linked_page_lang.`lang_code` = linked_tag_lang.`language_code` AND linked_page.`tag_id` = linked_tag_lang.`tag_id`"
            . " INNER JOIN `blp_landing` ON `landing_pages`.`id` = `blp_landing`.`old_lp_id`"
            . " INNER JOIN `blp_landing` AS linked_blp ON linked_page.id = linked_blp.old_lp_id"
            . " WHERE `landing_pages`.`enabled` = 1"
            . " AND `locations`.`enabled` = 1"
            . " AND `locations`.`parent_id` <> 0"
            . " AND `landing_page_language`.`enabled` = 1"
            . " AND `tag_language_labels`.`preferred` = 1"
            . " AND linked_page.`enabled` = 1"
            . " AND linked_location.`enabled` = 1"
            . " AND linked_location.`parent_id` <> 0"
            . " AND linked_page_lang.`enabled` = 1"
            . " AND linked_tag_lang.`preferred` = 1"
            . " ORDER BY `landing_pages`.`id`, `landing_page_language`.`id`");
        DB::statement("INSERT INTO `blp_landing_card_types` (`id`, `type_desc`) VALUES (1, 'Favourite'), (2, 'Popular'), (3, 'Review'), (4, 'Recent');");
        DB::statement("INSERT INTO `blp_landing_card_chosen_assets` (`lp_id`, `asset_id`, `type_id`, `ordering`, `created_at`, `updated_at`)"
            . " SELECT `blp_landing`.`id`, `landing_page_carousel_assets`.`asset_id`, '1', '1', now(), now() FROM `landing_pages`"
            . " INNER JOIN `landing_page_language` ON `landing_pages`.`id` = `landing_page_language`.`landing_page_id`"
            . " INNER JOIN `locations` ON `landing_pages`.`location_id` = `locations`.`id`"
            . " INNER JOIN `tag_language_labels` ON `landing_page_language`.`lang_code` = `tag_language_labels`.`language_code` AND `landing_pages`.`tag_id` = `tag_language_labels`.`tag_id`"
            . " INNER JOIN `landing_page_carousel_assets` ON `landing_pages`.`id` = `landing_page_carousel_assets`.`landing_page_id` AND `landing_page_carousel_assets`.`carousel_attribute_id` = 8"
            . " INNER JOIN `blp_landing` ON `landing_pages`.`id` = `blp_landing`.`old_lp_id`"
            . " WHERE `landing_pages`.`enabled` = 1"
            . " AND `locations`.`enabled` = 1"
            . " AND `locations`.`parent_id` <> 0"
            . " AND `landing_page_language`.`enabled` = 1"
            . " AND `tag_language_labels`.`preferred` = 1"
            . " ORDER BY `landing_pages`.`id`, `landing_page_language`.`id`");
        DB::statement("UPDATE `blp_landing`"
            . " INNER JOIN `landing_pages` ON `blp_landing`.`old_lp_id` = `landing_pages`.`id`"
            . " INNER JOIN `landing_pages` AS redirect_lp ON `landing_pages`.`redirect_id` = redirect_lp.id"
            . " INNER JOIN `blp_landing` AS redirect_blp_landing ON redirect_lp.id = redirect_blp_landing.old_lp_id"
            . " INNER JOIN `landing_page_language` ON `landing_pages`.`id` = `landing_page_language`.`landing_page_id`"
            . " INNER JOIN `locations` ON `landing_pages`.`location_id` = `locations`.`id`"
            . " INNER JOIN `tag_language_labels` ON `landing_page_language`.`lang_code` = `tag_language_labels`.`language_code` AND `landing_pages`.`tag_id` = `tag_language_labels`.`tag_id`"
            . " SET `blp_landing`.`redirect_lp_id` = redirect_blp_landing.id"
            . " WHERE `landing_pages`.`redirect_id` IS NOT NULL"
            . " AND `landing_pages`.`canonical` = 0"
            . " AND `landing_pages`.`enabled` = 1"
            . " AND redirect_lp.enabled = 1"
            . " AND `locations`.`enabled` = 1"
            . " AND `locations`.`parent_id` <> 0"
            . " AND `landing_page_language`.`enabled` = 1"
            . " AND `tag_language_labels`.`preferred` = 1");
        Schema::table('blp_landing', function(Blueprint $table)
        {
            $table->dropColumn('old_lp_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared("
            SET FOREIGN_KEY_CHECKS = 0;
            TRUNCATE `blp_landing_card_chosen_assets`;
            TRUNCATE `blp_landing_card_types`;
            TRUNCATE `blp_landing_linked`;
            TRUNCATE `blp_landing_urls`;
            TRUNCATE `blp_landing_meta`;
            TRUNCATE `blp_landing_info`;
            TRUNCATE `blp_landing_attributes`;
            TRUNCATE `blp_landing`;
            SET FOREIGN_KEY_CHECKS = 1;");
    }
}