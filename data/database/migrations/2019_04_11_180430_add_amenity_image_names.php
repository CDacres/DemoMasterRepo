<?php

use Illuminate\Database\Migrations\Migration;

class AddAmenityImageNames extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = '24h-4x.png' WHERE `id` = '-16'");
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = 'accessibility-4x.png' WHERE `id` = '23'");
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = 'air-conditioning-4x.png' WHERE `id` = '-129'");
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = 'audio-recording-4x.png' WHERE `id` = '-32'");
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = 'bicycle-storage-4x.png' WHERE `id` = '-19'");
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = 'breakout-space-4x.png' WHERE `id` = '-2'");
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = 'coffee-maker-4x.png' WHERE `id` = '-20'");
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = 'childrens-books-toys-4x.png' WHERE `id` = '-21'");
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = 'cleaning-4x.png' WHERE `id` = '-135'");
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = 'cloakroom-4x.png' WHERE `id` = '-140'");
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = 'conference-phone-4x.png' WHERE `id` = '20'");
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = 'confetti-4x.png' WHERE `id` = '-126'");
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = 'dance-floor-4x.png' WHERE `id` = '-116'");
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = 'dj-facilities-4x.png' WHERE `id` = '-119'");
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = 'entertainment-licence-4x.png' WHERE `id` = '-117'");
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = 'suitable-for-events-4x.png' WHERE `id` = '-141'");
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = 'suitable-for-events-4x.png' WHERE `id` = '-22'");
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = 'flipchart-4x.png' WHERE `id` = '24'");
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = 'gym-4x.png' WHERE `id` = '-24'");
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = 'helipad-4x.png' WHERE `id` = '-127'");
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = 'hostess-4x.png' WHERE `id` = '-139'");
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = 'hot-tub-4x.png' WHERE `id` = '-34'");
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = 'kitchen-4x.png' WHERE `id` = '-136'");
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = 'live-music-4x.png' WHERE `id` = '-118'");
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = 'locker-4x.png' WHERE `id` = '-25'");
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = 'mailing-address-4x.png' WHERE `id` = '-9'");
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = 'marquee-4x.png' WHERE `id` = '-115'");
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = 'toastmaster-4x.png' WHERE `id` = '-122'");
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = 'meeting-room-on-site-4x.png' WHERE `id` = '-11'");
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = 'mic-4x.png' WHERE `id` = '-5'");
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = 'technical-support-4x.png' WHERE `id` = '-4'");
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = 'fireworks-permitted-4x.png' WHERE `id` = '-120'");
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = 'garden-backyard-4x.png' WHERE `id` = '-137'");
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = 'parking-4x.png' WHERE `id` = '22'");
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = 'penpaper-4x.png' WHERE `id` = '25'");
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = 'pets-allowed-4x.png' WHERE `id` = '-26'");
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = 'phonebooth-4x.png' WHERE `id` = '-12'");
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = 'pool-4x.png' WHERE `id` = '-33'");
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = 'printer-4x.png' WHERE `id` = '-13'");
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = 'tv-projector-4x.png' WHERE `id` = '26'");
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = 'reception-4x.png' WHERE `id` = '-7'");
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = 'self-check-in-4x.png' WHERE `id` = '-15'");
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = 'security-4x.png' WHERE `id` = '-142'");
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = 'showers-4x.png' WHERE `id` = '-27'");
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = 'smoking-allowed-4x.png' WHERE `id` = '-138'");
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = 'speaker-4x.png' WHERE `id` = '-131'");
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = 'ticketing-event-4x.png' WHERE `id` = '-143'");
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = 'trading-address-4x.png' WHERE `id` = '-14'");
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = 'video-conference-4x.png' WHERE `id` = '18'");
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = 'whiteboard-4x.png' WHERE `id` = '19'");
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = 'wireless-internet-4x.png' WHERE `id` = '15'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("UPDATE `live`.`amenities` SET `image_name` = ''");
    }
}