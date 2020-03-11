<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddNewLandingPageTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('blp_landing', function(Blueprint $table)
        {
            $table->increments('id');
            $table->unsignedInteger('location_id')->index('location_id_idx');
            $table->unsignedInteger('tag_label_id')->index('tag_label_id_idx');
            $table->unsignedInteger('redirect_lp_id')->nullable();
            $table->timestamps();
            $table->foreign('location_id', 'lp_location')->references('id')->on('locations')->onUpdate('RESTRICT')->onDelete('RESTRICT');
            $table->foreign('tag_label_id', 'lp_tag_label')->references('id')->on('tag_language_labels')->onUpdate('RESTRICT')->onDelete('RESTRICT');
        });
        Schema::create('blp_landing_info', function(Blueprint $table)
        {
            $table->increments('id');
            $table->unsignedInteger('lp_id')->index('lp_id_idx');
            $table->unsignedInteger('banner_img_id')->nullable()->index('banner_img_id_idx');
            $table->string('banner_title', 255)->nullable();
            $table->string('banner_button', 255)->nullable();
            $table->string('banner_text', 255)->nullable();
            $table->string('banner_text_color', 7)->nullable();
            $table->string('favourite_card_title', 255)->nullable();
            $table->string('favourite_card_subtitle', 255)->nullable();
            $table->string('popular_card_title', 255)->nullable();
            $table->string('popular_card_subtitle', 255)->nullable();
            $table->string('review_card_title', 255)->nullable();
            $table->string('review_card_subtitle', 255)->nullable();
            $table->string('recent_card_title', 255)->nullable();
            $table->string('recent_card_subtitle', 255)->nullable();
            $table->string('map_title', 255)->nullable();
            $table->string('related_title', 255)->nullable();
            $table->string('help_title', 255)->nullable();
            $table->string('help_subtitle', 255)->nullable();
            $table->text('html_bottom')->nullable();
            $table->text('html_top')->nullable();
            $table->string('nearby_title', 255)->nullable();
            $table->timestamps();
            $table->foreign('lp_id', 'lp_info_lp_id')->references('id')->on('blp_landing')->onUpdate('RESTRICT')->onDelete('RESTRICT');
        });
        Schema::create('blp_landing_meta', function(Blueprint $table)
        {
            $table->increments('id');
            $table->unsignedInteger('lp_id')->index('lp_id_idx');
            $table->string('page_title', 255)->nullable();
            $table->string('page_subtitle', 255)->nullable();
            $table->string('meta_title', 255)->nullable();
            $table->string('meta_desc', 400)->nullable();
            $table->string('meta_keyword', 600)->nullable();
            $table->string('schema_name', 255)->nullable();
            $table->string('schema_desc', 400)->nullable();
            $table->timestamps();
            $table->foreign('lp_id', 'lp_meta_lp_id')->references('id')->on('blp_landing')->onUpdate('RESTRICT')->onDelete('RESTRICT');
        });
        Schema::create('blp_landing_urls', function(Blueprint $table)
        {
            $table->increments('id');
            $table->unsignedInteger('lp_id')->index('lp_id_idx');
            $table->unsignedInteger('locale_id')->index('locale_id_idx');
            $table->string('url', 100);
            $table->boolean('preferred')->default(0);
            $table->timestamps();
            $table->unique(['locale_id', 'url']);
            $table->foreign('lp_id', 'lp_url_lp_id')->references('id')->on('blp_landing')->onUpdate('RESTRICT')->onDelete('RESTRICT');
            $table->foreign('locale_id', 'lp_url_locale_id')->references('id')->on('locales')->onUpdate('RESTRICT')->onDelete('RESTRICT');
        });
        Schema::create('blp_landing_card_types', function(Blueprint $table)
        {
            $table->increments('id');
            $table->string('type_desc', 25);
        });
        Schema::create('blp_landing_card_chosen_assets', function(Blueprint $table)
        {
            $table->increments('id');
            $table->unsignedInteger('lp_id')->index('lp_id_idx');
            $table->unsignedInteger('asset_id')->index('asset_id_idx');
            $table->unsignedInteger('type_id')->index('type_id_idx');
            $table->unsignedInteger('ordering');
            $table->timestamps();
            $table->unique(['lp_id', 'asset_id', 'type_id']);
            $table->foreign('lp_id', 'lp_card_chosen_lp_id')->references('id')->on('blp_landing')->onUpdate('RESTRICT')->onDelete('RESTRICT');
            $table->foreign('asset_id', 'lp_card_chosen_asset_id')->references('id')->on('asset_audit')->onUpdate('RESTRICT')->onDelete('RESTRICT');
            $table->foreign('type_id', 'lp_card_chosen_type_id')->references('id')->on('blp_landing_card_types')->onUpdate('RESTRICT')->onDelete('RESTRICT');
        });
        Schema::create('blp_landing_cards', function(Blueprint $table)
        {
            $table->increments('id');
            $table->unsignedInteger('lp_id')->index('lp_id_idx');
            $table->unsignedInteger('asset_id')->index('asset_id_idx');
            $table->unsignedInteger('type_id')->index('type_id_idx');
            $table->unsignedInteger('ordering');
            $table->timestamps();
            $table->unique(['lp_id', 'asset_id', 'type_id']);
            $table->foreign('lp_id', 'lp_card_lp_id')->references('id')->on('blp_landing')->onUpdate('RESTRICT')->onDelete('RESTRICT');
            $table->foreign('asset_id', 'lp_card_asset_id')->references('id')->on('asset_audit')->onUpdate('RESTRICT')->onDelete('RESTRICT');
            $table->foreign('type_id', 'lp_card_type_id')->references('id')->on('blp_landing_card_types')->onUpdate('RESTRICT')->onDelete('RESTRICT');
        });
        Schema::create('blp_landing_attributes', function(Blueprint $table)
        {
            $table->increments('id');
            $table->unsignedInteger('lp_id')->index('lp_id_idx');
            $table->unsignedInteger('attribute_id')->index('attribute_id_idx');
            $table->timestamps();
            $table->unique(['lp_id', 'attribute_id']);
            $table->foreign('lp_id', 'lp_attribute_lp_id')->references('id')->on('blp_landing')->onUpdate('RESTRICT')->onDelete('RESTRICT');
        });
        Schema::create('blp_landing_linked', function(Blueprint $table)
        {
            $table->increments('id');
            $table->unsignedInteger('lp_id')->index('lp_id_idx');
            $table->unsignedInteger('linked_lp_id')->index('linked_lp_id_idx');
            $table->timestamps();
            $table->unique(['lp_id', 'linked_lp_id']);
            $table->foreign('lp_id', 'lp_linked_lp_id')->references('id')->on('blp_landing')->onUpdate('RESTRICT')->onDelete('RESTRICT');
            $table->foreign('linked_lp_id', 'lp_linked_linked_lp_id')->references('id')->on('blp_landing')->onUpdate('RESTRICT')->onDelete('RESTRICT');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('blp_landing_linked');
        Schema::drop('blp_landing_attributes');
        Schema::drop('blp_landing_cards');
        Schema::drop('blp_landing_card_chosen_assets');
        Schema::drop('blp_landing_card_types');
        Schema::drop('blp_landing_urls');
        Schema::drop('blp_landing_meta');
        Schema::drop('blp_landing_info');
        Schema::drop('blp_landing');
    }
}