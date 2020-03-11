<?php

use Illuminate\Database\Migrations\Migration;

class UpdateAdminMeta extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("UPDATE `metas` SET `controller_name`='administrator/payouts', `title`='Payouts | Administrator', `meta_description`='Payouts | Administrator Dashboard', `meta_keyword`='Payouts | Administrator' WHERE `controller_name`='administrator/invoices'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("UPDATE `metas` SET `controller_name`='administrator/invoices', `title`='Invoices | Administrator', `meta_description`='Invoices | Administrator Dashboard', `meta_keyword`='Invoices | Administrator' WHERE `controller_name`='administrator/payouts'");
    }
}