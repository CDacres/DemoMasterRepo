<?php

use Illuminate\Database\Migrations\Migration;

class UpdateAmenityTranslations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("UPDATE `translator_translations` SET `text`='Lunch', `updated_at`=now() WHERE `item`='amenity.desc.UEpTGMXszKHzDYxU' AND (`locale`='en' OR `locale`='en_IE' OR `locale`='en_US')");
        DB::statement("UPDATE `translator_translations` SET `text`='Déjeuner', `updated_at`=now() WHERE `item`='amenity.desc.UEpTGMXszKHzDYxU' AND `locale`='fr'");
        DB::statement("UPDATE `translator_translations` SET `text`='Mittagessen', `updated_at`=now() WHERE `item`='amenity.desc.UEpTGMXszKHzDYxU' AND `locale`='de'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("UPDATE `translator_translations` SET `text`='Venue provides catering', `updated_at`=now() WHERE `item`='amenity.desc.UEpTGMXszKHzDYxU' AND (`locale`='en' OR `locale`='en_IE' OR `locale`='en_US')");
        DB::statement("UPDATE `translator_translations` SET `text`='Restauration sur place', `updated_at`=now() WHERE `item`='amenity.desc.UEpTGMXszKHzDYxU' AND `locale`='fr'");
        DB::statement("UPDATE `translator_translations` SET `text`='Veranstaltungsort bietet Verpflegung', `updated_at`=now() WHERE `item`='amenity.desc.UEpTGMXszKHzDYxU' AND `locale`='de'");
    }
}