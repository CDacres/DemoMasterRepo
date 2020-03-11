<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class FixDbEnumAndDefaultFields extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('asset_audit', function(Blueprint $table)
        {
            $table->unsignedInteger('reference_id')->nullable()->change();
        });
        DB::statement("UPDATE `live`.`payments` SET `account` = '' WHERE `account` IS NULL");
        DB::statement("ALTER TABLE `live`.`payments` CHANGE COLUMN `account` `account` ENUM('', 'ePayment', 'Active Saver') NOT NULL DEFAULT ''");
        DB::statement("UPDATE `live`.`profiles` SET `bus_email_only` = '0' WHERE `bus_email_only` IS NULL");
        DB::statement("ALTER TABLE `live`.`profiles` CHANGE COLUMN `bus_email_only` `bus_email_only` ENUM('0', '1') NOT NULL DEFAULT '0'");
        DB::statement("ALTER TABLE `live`.`reservations` CHANGE COLUMN `source` `source` ENUM('Website Direct', 'Enquiry - Website', 'Enquiry - Call', 'Enquiry - Email', 'Enquiry - Chat') NOT NULL DEFAULT 'Website Direct'");
        DB::statement("UPDATE `live`.`rooms` SET `office_size_unit` = 'm2' WHERE `office_size_unit` IS NULL");
        DB::statement("ALTER TABLE `live`.`rooms` CHANGE COLUMN `office_size_unit` `office_size_unit` ENUM('m2', 'ft2') NOT NULL DEFAULT 'm2'");
        Schema::table('hour_rates', function(Blueprint $table)
        {
            $table->decimal('price_per_hour_exvat', 10, 4)->default(0)->change();
        });
        Schema::table('minimum_spends', function(Blueprint $table)
        {
            $table->decimal('amount_exvat', 10, 4)->default(0)->change();
        });
        DB::statement("ALTER TABLE `live`.`profiles`"
            . " CHANGE COLUMN `email` `email` VARCHAR(255) NULL DEFAULT NULL,"
            . " CHANGE COLUMN `address_status` `address_status` INT(11) NULL DEFAULT 0,"
            . " CHANGE COLUMN `parking` `parking` INT(11) NULL DEFAULT 0,"
            . " CHANGE COLUMN `bussiness_name` `bussiness_name` VARCHAR(200) NULL DEFAULT NULL,"
            . " CHANGE COLUMN `venue_type` `venue_type` VARCHAR(200) NULL DEFAULT NULL,"
            . " CHANGE COLUMN `website` `website` VARCHAR(200) NULL DEFAULT NULL,"
            . " CHANGE COLUMN `neighbor` `neighbor` VARCHAR(60) NULL DEFAULT NULL,"
            . " CHANGE COLUMN `exact` `exact` INT(11) NULL DEFAULT 0,"
            . " CHANGE COLUMN `lat` `lat` DECIMAL(18,14) NULL DEFAULT 0,"
            . " CHANGE COLUMN `long` `long` DECIMAL(18,14) NULL DEFAULT 0,"
            . " CHANGE COLUMN `street_view` `street_view` SMALLINT(6) NULL DEFAULT 0,"
            . " CHANGE COLUMN `room_cancel_percent` `room_cancel_percent` INT(11) NULL DEFAULT 0,"
            . " CHANGE COLUMN `room_cancel_days` `room_cancel_days` INT(11) NULL DEFAULT 0");
        Schema::table('set_menus', function(Blueprint $table)
        {
            $table->decimal('amount_exvat', 10, 4)->default(0)->change();
        });
        Schema::table('users', function(Blueprint $table)
        {
            $table->decimal('google_id', 45, 0)->default(0)->change();
            $table->decimal('fb_id', 45, 0)->default(0)->change();
            $table->decimal('twitter_id', 45, 0)->default(0)->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('asset_audit', function(Blueprint $table)
        {
            $table->unsignedInteger('reference_id')->nullable(false)->change();
        });
        DB::statement("ALTER TABLE `live`.`payments` CHANGE COLUMN `account` `account` ENUM('ePayment', 'Active Saver') NULL DEFAULT NULL");
        DB::statement("ALTER TABLE `live`.`profiles` CHANGE COLUMN `bus_email_only` `bus_email_only` ENUM('0', '1') NULL DEFAULT NULL");
        DB::statement("ALTER TABLE `live`.`reservations` CHANGE COLUMN `source` `source` ENUM('Website Direct', 'Enquiry - Website', 'Enquiry - Call', 'Enquiry - Email', 'Enquiry - Chat') NULL DEFAULT 'Website Direct'");
        DB::statement("ALTER TABLE `live`.`rooms` CHANGE COLUMN `office_size_unit` `office_size_unit` ENUM('m2', 'ft2') NULL DEFAULT NULL");
        Schema::table('hour_rates', function(Blueprint $table)
        {
            $table->decimal('price_per_hour_exvat', 10, 4)->change();
        });
        Schema::table('minimum_spends', function(Blueprint $table)
        {
            $table->decimal('amount_exvat', 10, 4)->change();
        });
        DB::statement("ALTER TABLE `live`.`profiles`"
            . " CHANGE COLUMN `email` `email` VARCHAR(255) NOT NULL,"
            . " CHANGE COLUMN `address_status` `address_status` INT(11) NOT NULL,"
            . " CHANGE COLUMN `parking` `parking` INT(11) NOT NULL,"
            . " CHANGE COLUMN `bussiness_name` `bussiness_name` VARCHAR(200) NOT NULL,"
            . " CHANGE COLUMN `venue_type` `venue_type` VARCHAR(200) NOT NULL,"
            . " CHANGE COLUMN `website` `website` VARCHAR(200) NOT NULL,"
            . " CHANGE COLUMN `neighbor` `neighbor` VARCHAR(60) NOT NULL,"
            . " CHANGE COLUMN `exact` `exact` INT(11) NOT NULL,"
            . " CHANGE COLUMN `lat` `lat` DECIMAL(18,14) NOT NULL,"
            . " CHANGE COLUMN `long` `long` DECIMAL(18,14) NOT NULL,"
            . " CHANGE COLUMN `street_view` `street_view` SMALLINT(6) NOT NULL,"
            . " CHANGE COLUMN `room_cancel_percent` `room_cancel_percent` INT(11) NOT NULL,"
            . " CHANGE COLUMN `room_cancel_days` `room_cancel_days` INT(11) NOT NULL");
        Schema::table('set_menus', function(Blueprint $table)
        {
            $table->decimal('amount_exvat', 10, 4)->change();
        });
        Schema::table('users', function(Blueprint $table)
        {
            $table->decimal('google_id', 45, 0)->change();
            $table->decimal('fb_id', 45, 0)->change();
            $table->decimal('twitter_id', 45, 0)->change();
        });
    }
}