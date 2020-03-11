<?php

use Illuminate\Database\Migrations\Migration;

class AlterPbiInvoicesViewAddAdmin extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::unprepared("
            ALTER VIEW `pbi_invoices` AS select
                `reservations`.`id` AS `id`,
                `reservation_periods`.`start` AS `start`,
                ((`reservations`.`price` +
                (case
                    when isnull(`reservations`.`extra_fee`) then 0
                    else `reservations`.`extra_fee` end)) +
                (case
                    when isnull(`reservations`.`flexible_fee`) then 0
                    else `reservations`.`flexible_fee` end)) AS `total`,
                ((`reservations`.`toZipcube` +
                (case
                    when isnull(`reservations`.`extra_fee`) then 0
                    else `reservations`.`extra_fee` end)) +
                (case
                    when isnull(`reservations`.`flexible_fee`) then 0
                    else `reservations`.`flexible_fee` end)) AS `revenue`,
                sum(((case when (`payments`.`paymentStatus_id` = 4) then -(1) else 1 end) * `payments`.`amount`)) AS `invoice_amount`,
                `bookings`.`created` AS `created`,
                concat(`profiles`.`Fname`, ' ', `profiles`.`Lname`) AS `user_name`,
                `users`.`email` AS `email`,
                substring_index(`users`.`email`, '@',-(1)) AS `domain`,
                `payments`.`notes` AS `notes`,
                `reservations`.`zipcube_notes` AS `zipcube_notes`,
                concat(admin_profiles.`Fname`, ' ', admin_profiles.`Lname`) AS `admin_user_name`,
                admin_users.`email` AS `admin_email`
            from
                (((((`reservations`
            join `payments` on
                ((`reservations`.`booking_id` = `payments`.`booking_id`)))
            join `reservation_periods` on
                ((`reservations`.`id` = `reservation_periods`.`reservation_id`)))
            join `bookings` on
                ((`reservations`.`booking_id` = `bookings`.`id`)))
            join `users` on
                ((`bookings`.`booker_id` = `users`.`id`)))
            join `profiles` on
                ((`users`.`id` = `profiles`.`user_id`)))
            join `users` AS admin_users on
                    ((`reservations`.`assigned_user` = admin_users.id))
            join `profiles` AS admin_profiles on
                ((admin_users.`id` = admin_profiles.`user_id`))
            where
                ((`payments`.`paymentType_id` = 4)
                and (`payments`.`paymentStatus_id` <> 2)
                and (`payments`.`paymentStatus_id` <> 6)
                and (`reservations`.`reservationStatus_id` in (1,
                3,
                7,
                8,
                9,
                10)))
            group by
                `reservations`.`id`
        ");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared("
            ALTER VIEW `pbi_invoices` AS select
                `reservations`.`id` AS `id`,
                `reservation_periods`.`start` AS `start`,
                ((`reservations`.`price` +
                (case
                    when isnull(`reservations`.`extra_fee`) then 0
                    else `reservations`.`extra_fee`
                end)) +
                (case
                    when isnull(`reservations`.`flexible_fee`) then 0
                    else `reservations`.`flexible_fee`
                end)) AS `total`,
                ((`reservations`.`toZipcube` +
                (case
                    when isnull(`reservations`.`extra_fee`) then 0
                    else `reservations`.`extra_fee`
                end)) +
                (case
                    when isnull(`reservations`.`flexible_fee`) then 0
                    else `reservations`.`flexible_fee`
                end)) AS `revenue`,
                sum(((case when (`payments`.`paymentStatus_id` = 4) then -(1) else 1 end) * `payments`.`amount`)) AS `invoice_amount`,
                `bookings`.`created` AS `created`,
                concat(`profiles`.`Fname`, ' ', `profiles`.`Lname`) AS `user_name`,
                `users`.`email` AS `email`,
                SUBSTRING_INDEX(`users`.`email`, '@', -1) AS domain,
                `payments`.`notes` AS `notes`,
                `reservations`.`zipcube_notes` AS `zipcube_notes`
            from
                (((((`reservations`
            join `payments` on
                ((`reservations`.`booking_id` = `payments`.`booking_id`)))
            join `reservation_periods` on
                ((`reservations`.`id` = `reservation_periods`.`reservation_id`)))
            join `bookings` on
                ((`reservations`.`booking_id` = `bookings`.`id`)))
            join `users` on
                ((`bookings`.`booker_id` = `users`.`id`)))
            join `profiles` on
                ((`users`.`id` = `profiles`.`user_id`)))
            where
                ((`payments`.`paymentType_id` = 4)
                and (`payments`.`paymentStatus_id` <> 2)
                and (`payments`.`paymentStatus_id` <> 6)
                and (`reservations`.`reservationStatus_id` in (1,
                3,
                7,
                8,
                9,
                10)))
            group by
                `reservations`.`id`
        ");
    }
}