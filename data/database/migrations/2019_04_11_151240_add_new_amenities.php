<?php

use Illuminate\Database\Migrations\Migration;

use Illuminate\Support\Str;

use App\Models\Amenity;

class AddNewAmenities extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $this->_addAmenityPlusTranslations(-141, ['en' => 'Event Coordinator', 'fr' => 'Coordinateur Évènement', 'de' => 'Veranstaltungskoordinatorin', 'en_US' => 'Event Coordinator', 'en_IE' => 'Event Coordinator']);
        $this->_addAmenityPlusTranslations(-142, ['en' => 'Security staff', 'fr' => 'Agent(s) de Sécurité', 'de' => 'Sicherheitspersonal', 'en_US' => 'Security staff', 'en_IE' => 'Security staff']);
        $this->_addAmenityPlusTranslations(-143, ['en' => 'Ticketing event possible', 'fr' => 'Événement Payant Possible', 'de' => 'Ticketing-Event möglich', 'en_US' => 'Ticketing event possible', 'en_IE' => 'Ticketing event possible']);
    }

    private function _addAmenityPlusTranslations($id, $translationArray)
    {
        $item = 'amenity.desc.' . Str::random();
        DB::statement("INSERT INTO `amenities` (`id`, `desc`, `desc_translation`, `filterable`, `allow_price`, `amenity_types_id`) VALUES ('" . $id . "', '" . $translationArray['en'] . "', 'translatable." . $item . "', 1, 1, 7)");
        DB::statement("INSERT INTO `translator_translations` (`locale`, `namespace`, `group`, `item`, `text`, `created_at`, `updated_at`) VALUES ('en', '*', 'translatable', '" . $item . "', '" . $translationArray['en'] . "', now(), now())");
        DB::statement("INSERT INTO `translator_translations` (`locale`, `namespace`, `group`, `item`, `text`, `created_at`, `updated_at`) VALUES ('fr', '*', 'translatable', '" . $item . "', '" . $translationArray['fr'] . "', now(), now())");
        DB::statement("INSERT INTO `translator_translations` (`locale`, `namespace`, `group`, `item`, `text`, `created_at`, `updated_at`) VALUES ('de', '*', 'translatable', '" . $item . "', '" . $translationArray['de'] . "', now(), now())");
        DB::statement("INSERT INTO `translator_translations` (`locale`, `namespace`, `group`, `item`, `text`, `created_at`, `updated_at`) VALUES ('en_US', '*', 'translatable', '" . $item . "', '" . $translationArray['en_US'] . "', now(), now())");
        DB::statement("INSERT INTO `translator_translations` (`locale`, `namespace`, `group`, `item`, `text`, `created_at`, `updated_at`) VALUES ('en_IE', '*', 'translatable', '" . $item . "', '" . $translationArray['en_IE'] . "', now(), now())");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $this->_deleteAmenity(-141);
        $this->_deleteAmenity(-142);
        $this->_deleteAmenity(-143);
    }

    private function _deleteAmenity($id)
    {
        $amenity = Amenity::find($id);
        $amenity->delete();
        DB::statement("DELETE FROM `amenities` WHERE `id`='" . $id . "'"); // needs this as it's only a soft delete
    }
}