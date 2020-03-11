<?php

use Illuminate\Database\Migrations\Migration;

class AddMetaForInvoiceDataStudio extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("INSERT INTO `metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('administrator/google_studio', 'invoices', 'en', 'Unpaid invoices - Admin - Zipcube', 'Unpaid invoices | Administrator Dashboard', 'Unpaid invoices | Administrator')");
        DB::statement("INSERT INTO `metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('administrator/google_studio', 'invoices', 'fr', 'Unpaid invoices - Admin - Zipcube', 'Unpaid invoices | Administrator Dashboard', 'Unpaid invoices | Administrator')");
        DB::statement("INSERT INTO `metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('administrator/google_studio', 'invoices', 'de', 'Unpaid invoices - Admin - Zipcube', 'Unpaid invoices | Administrator Dashboard', 'Unpaid invoices | Administrator')");
        DB::statement("INSERT INTO `metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('administrator/google_studio', 'invoices', 'en_IE', 'Unpaid invoices - Admin - Zipcube', 'Unpaid invoices | Administrator Dashboard', 'Unpaid invoices | Administrator')");
        DB::statement("INSERT INTO `metas` (`controller_name`, `method_name`, `lang_code`, `title`, `meta_description`, `meta_keyword`) VALUES ('administrator/google_studio', 'invoices', 'en_US', 'Unpaid invoices - Admin - Zipcube', 'Unpaid invoices | Administrator Dashboard', 'Unpaid invoices | Administrator')");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("DELETE FROM `metas` WHERE `controller_name`='administrator/google_studio' AND `method_name`='invoices'");
    }
}
