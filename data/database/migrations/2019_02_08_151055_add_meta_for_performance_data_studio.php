<?php

use Illuminate\Database\Migrations\Migration;

class AddMetaForPerformanceDataStudio extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("INSERT INTO `metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('administrator/google_studio', 'performance', 'en', 'Performance - Admin - Zipcube', 'Performance | Administrator Dashboard', 'Performance | Administrator')");
        DB::statement("INSERT INTO `metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('administrator/google_studio', 'performance', 'fr', 'Performance - Admin - Zipcube', 'Performance | Administrator Dashboard', 'Performance | Administrator')");
        DB::statement("INSERT INTO `metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('administrator/google_studio', 'performance', 'de', 'Performance - Admin - Zipcube', 'Performance | Administrator Dashboard', 'Performance | Administrator')");
        DB::statement("INSERT INTO `metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('administrator/google_studio', 'performance', 'en_IE', 'Performance - Admin - Zipcube', 'Performance | Administrator Dashboard', 'Performance | Administrator')");
        DB::statement("INSERT INTO `metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('administrator/google_studio', 'performance', 'en_US', 'Performance - Admin - Zipcube', 'Performance | Administrator Dashboard', 'Performance | Administrator')");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("DELETE FROM `metas` WHERE `controller_name`='administrator/google_studio' AND `method_name`='performance'");
    }
}