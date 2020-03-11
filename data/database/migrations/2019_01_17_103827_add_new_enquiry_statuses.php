<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddNewEnquiryStatuses extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('enquiries_status', function(Blueprint $table)
        {
            $table->unsignedInteger('ordering')->after('name');
        });
        DB::statement("UPDATE `enquiries_status` SET `name`='New Lead', `ordering`=1 WHERE `id`='1'");
        DB::statement("UPDATE `enquiries_status` SET `ordering`=6 WHERE `id`='2'");
        DB::statement("UPDATE `enquiries_status` SET `ordering`=7 WHERE `id`='3'");
        DB::statement("INSERT INTO `enquiries_status` (`id`, `name`, `ordering`, `enabled`) VALUES
            (4,'Alternative',2,1),
            (5,'Offer sent',3,1),
            (6,'Viewing',4,1),
            (7,'Salvage',5,1);");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('enquiries_status', function(Blueprint $table)
        {
            $table->dropColumn('ordering');
        });
        DB::statement("UPDATE `enquiries_status` SET `name`='Pending' WHERE `id`='1'");
        DB::statement("DELETE FROM `enquiries_status` WHERE `id` IN (4,5,6,7)");
    }
}