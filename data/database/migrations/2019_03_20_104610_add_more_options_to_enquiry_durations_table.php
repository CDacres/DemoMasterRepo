<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddMoreOptionsToEnquiryDurationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('enquiry_durations', function (Blueprint $table) {
            $table->boolean('week_option')->default(0)->after('day_option');
        });
        DB::statement("INSERT INTO `enquiry_durations` (`desc`, `lang_key`, `dur_value`, `day_option`) VALUES"
            . " ('3 days', 'enquiry_duration_3_day', 3, 1),"
            . " ('4 days', 'enquiry_duration_4_day', 4, 1)");
        DB::statement("INSERT INTO `enquiry_durations` (`desc`, `lang_key`, `dur_value`, `week_option`) VALUES"
            . " ('1 week', 'enquiry_duration_1_week', 1, 1),"
            . " ('2 weeks', 'enquiry_duration_2_week', 2, 1),"
            . " ('3 weeks', 'enquiry_duration_3_week', 3, 1),"
            . " ('4 weeks', 'enquiry_duration_4_week', 4, 1)");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('enquiry_durations', function (Blueprint $table) {
            $table->dropColumn('week_option');
        });
        DB::statement("DELETE FROM `enquiry_durations` WHERE `desc` IN ('3 days', '4 days', '1 week', '2 weeks', '3 weeks', '4 weeks')");
    }
}
