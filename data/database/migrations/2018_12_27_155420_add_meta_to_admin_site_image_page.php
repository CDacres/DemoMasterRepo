<?php

use Illuminate\Database\Migrations\Migration;

class AddMetaToAdminSiteImagePage extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("UPDATE `metas` SET `method_name`='asset_photos', `title`='Asset Photos - Admin - Zipcube', `meta_description`='Asset Photos | Administrator Dashboard', `meta_keyword`='Asset Photos | Administrator' WHERE `controller_name`='administrator/google_studio' AND `method_name`='photos'");
        DB::statement("INSERT INTO `metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('administrator/google_studio', 'site_images', 'en', 'Site Images - Admin - Zipcube', 'Site Images | Administrator Dashboard', 'Site Images | Administrator')");
        DB::statement("INSERT INTO `metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('administrator/google_studio', 'site_images', 'fr', 'Site Images - Admin - Zipcube', 'Site Images | Administrator Dashboard', 'Site Images | Administrator')");
        DB::statement("INSERT INTO `metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('administrator/google_studio', 'site_images', 'de', 'Site Images - Admin - Zipcube', 'Site Images | Administrator Dashboard', 'Site Images | Administrator')");
        DB::statement("INSERT INTO `metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('administrator/google_studio', 'site_images', 'en_IE', 'Site Images - Admin - Zipcube', 'Site Images | Administrator Dashboard', 'Site Images | Administrator')");
        DB::statement("INSERT INTO `metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('administrator/google_studio', 'site_images', 'en_US', 'Site Images - Admin - Zipcube', 'Site Images | Administrator Dashboard', 'Site Images | Administrator')");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("UPDATE `metas` SET `method_name`='photos', `title`='Photos - Admin - Zipcube', `meta_description`='Photos | Administrator Dashboard', `meta_keyword`='Photos | Administrator' WHERE `controller_name`='administrator/google_studio' AND `method_name`='asset_photos'");
        DB::statement("DELETE FROM `metas` WHERE `controller_name`='administrator/google_studio' AND `method_name`='site_images'");
    }
}