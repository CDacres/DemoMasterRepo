<?php

use Illuminate\Database\Migrations\Migration;

class AddMetaForReviewDataStudio extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("INSERT INTO `metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('administrator/google_studio', 'reviews', 'en', 'Reviews - Admin - Zipcube', 'Reviews | Administrator Dashboard', 'Reviews | Administrator')");
        DB::statement("INSERT INTO `metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('administrator/google_studio', 'reviews', 'fr', 'Reviews - Admin - Zipcube', 'Reviews | Administrator Dashboard', 'Reviews | Administrator')");
        DB::statement("INSERT INTO `metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('administrator/google_studio', 'reviews', 'de', 'Reviews - Admin - Zipcube', 'Reviews | Administrator Dashboard', 'Reviews | Administrator')");
        DB::statement("INSERT INTO `metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('administrator/google_studio', 'reviews', 'en_IE', 'Reviews - Admin - Zipcube', 'Reviews | Administrator Dashboard', 'Reviews | Administrator')");
        DB::statement("INSERT INTO `metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('administrator/google_studio', 'reviews', 'en_US', 'Reviews - Admin - Zipcube', 'Reviews | Administrator Dashboard', 'Reviews | Administrator')");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("DELETE FROM `metas` WHERE `controller_name`='administrator/google_studio' AND `method_name`='reviews'");
    }
}