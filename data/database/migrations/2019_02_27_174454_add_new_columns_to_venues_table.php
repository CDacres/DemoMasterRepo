<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddNewColumnsToVenuesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('venues', function (Blueprint $table) {
            $table->integer('assignedAdmin')->unsigned()->nullable()->after('main_contact');
            $table->string('notes', 1500)->nullable()->after('agree_to_list');
            $table->enum('source', ['Prospect', 'Organic'])->default('Organic')->after('notes');
            $table->enum('stage', ['New Listing', 'Pending', 'Picture', 'Salvage', 'Pre-approved', 'Live', 'Rejected'])->default('New Listing')->after('source');
            $table->boolean('sponsored')->default(0)->after('stage');
        });
        DB::statement("UPDATE `venues` INNER JOIN `scrape_audit` ON `scrape_audit`.`asset_id`=`venues`.`asset_id` SET `source`='Prospect'");
        DB::statement("UPDATE `venues` SET `stage`='Live' WHERE `approved`=1");
        DB::statement("UPDATE `venues` INNER JOIN `rooms` ON `rooms`.`venue_id`=`venues`.`id` SET `venues`.`sponsored`=1 WHERE `rooms`.`enabled`=1 AND `rooms`.`sponsored`=1 AND `venues`.`enabled`=1");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('venues', function (Blueprint $table) {
            $table->dropColumn('assignedAdmin');
            $table->dropColumn('notes');
            $table->dropColumn('source');
            $table->dropColumn('stage');
            $table->dropColumn('sponsored');
        });
    }
}