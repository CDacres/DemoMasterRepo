<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCiLangToLocalesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('locales', function (Blueprint $table) {
            $table->string('ci_language_code', 5);
        });
        DB::statement("UPDATE `locales` SET `ci_language_code`='en' WHERE `country_code`='gb'");
        DB::statement("UPDATE `locales` SET `ci_language_code`='en_IE' WHERE `country_code`='ie'");
        DB::statement("UPDATE `locales` SET `ci_language_code`='fr' WHERE `country_code`='fr'");
        DB::statement("UPDATE `locales` SET `ci_language_code`='en_US' WHERE `country_code`='us'");
        DB::statement("UPDATE `locales` SET `ci_language_code`='de' WHERE `country_code`='de'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('locales', function (Blueprint $table) {
            $table->dropColumn('ci_language_code');
        });
    }
}