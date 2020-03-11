<?php

use Illuminate\Database\Migrations\Migration;

class AddYesterdayReservationsView extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::unprepared("
            CREATE VIEW `yesterday_reservations_for_review`
            AS SELECT
            `profiles`.`Fname` AS client_first_name,
            `profiles`.`Lname` AS client_last_name,
            `users`.`email` AS client_email,
            `profiles`.`phnum` AS client_phone,
            CONCAT('https://www.zipcube.com/', `locales`.`domain_code`, '/write-review/reservation?token=', `reservations`.`review_token`) AS review_link
            FROM `reservations`
            INNER JOIN `bookings` ON `bookings`.`id`=`reservations`.`booking_id`
            LEFT JOIN `reservation_periods` ON `reservations`.`id`=`reservation_periods`.`reservation_id`
            INNER JOIN `users` ON `bookings`.`booker_id`=`users`.`id`
            INNER JOIN `profiles` ON `users`.`id`=`profiles`.`user_id`
            INNER JOIN `locales` ON `users`.`locale_pref`=`locales`.`country_code`
            WHERE `reservationStatus_id` IN (7,8,9,10)
            AND `bookings`.`enabled`=1
            AND `reservations`.`enabled`=1
            AND `users`.`enabled`=1
            AND `profiles`.`enabled`=1
            AND DATE(`reservation_periods`.`end`) = DATE(SUBDATE(now() ,1));
        ");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared("DROP VIEW IF EXISTS `yesterday_reservations_for_review`;");
    }
}