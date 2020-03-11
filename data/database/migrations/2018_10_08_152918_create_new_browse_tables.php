<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNewBrowseTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('blp_urls', function(Blueprint $table)
        {
            $table->increments('id');
            $table->string('url', 100)->unique('url_UNIQUE');
            $table->timestamps();
        });
        Schema::create('browse', function(Blueprint $table)
        {
            $table->increments('id');
            $table->unsignedInteger('location_id')->index('location_id_idx');
            $table->unsignedInteger('tag_label_id')->index('tag_label_id_idx');
            $table->string('page_title', 255)->nullable();
            $table->string('page_subtitle', 255)->nullable();
            $table->unsignedInteger('banner_img_id')->nullable()->index('banner_img_id_idx');
            $table->string('banner_title', 255)->nullable();
            $table->string('banner_button', 255)->nullable();
            $table->string('banner_text', 255)->nullable();
            $table->string('card_title', 255)->nullable();
            $table->string('card_subtitle', 255)->nullable();
            $table->string('help_title', 255)->nullable();
            $table->string('help_subtitle', 255)->nullable();
            $table->text('html_bottom')->nullable();
            $table->text('html_top')->nullable();
            $table->string('nearby_title', 255)->nullable();
            $table->string('meta_title', 255)->nullable();
            $table->string('meta_desc', 400)->nullable();
            $table->string('meta_keyword', 600)->nullable();
            $table->string('schema_name', 255)->nullable();
            $table->string('schema_desc', 400)->nullable();
            $table->timestamps();
            $table->unique(['location_id', 'tag_label_id']);
            $table->foreign('location_id', 'browse_location')->references('id')->on('locations')->onUpdate('RESTRICT')->onDelete('RESTRICT');
            $table->foreign('tag_label_id', 'browse_tag_label')->references('id')->on('tag_language_labels')->onUpdate('RESTRICT')->onDelete('RESTRICT');
        });
        Schema::create('browse_urls', function(Blueprint $table)
        {
            $table->increments('id');
            $table->unsignedInteger('browse_id')->index('browse_id_idx');
            $table->unsignedInteger('blp_url_id')->unique('blp_url_id_UNIQUE');
            $table->boolean('preferred')->default(0);
            $table->timestamps();
            $table->foreign('browse_id', 'browse_url_browse_id')->references('id')->on('browse')->onUpdate('RESTRICT')->onDelete('RESTRICT');
            $table->foreign('blp_url_id', 'browse_url_blp_url_id')->references('id')->on('blp_urls')->onUpdate('RESTRICT')->onDelete('RESTRICT');
        });
        Schema::create('browse_cards', function(Blueprint $table)
        {
            $table->increments('id');
            $table->unsignedInteger('browse_id')->index('browse_id_idx');
            $table->string('card_title', 255)->nullable();
            $table->string('card_text', 255)->nullable();
            $table->unsignedInteger('card_img_id')->nullable()->index('card_img_id_idx');
            $table->unsignedInteger('ordering');
            $table->string('lp_url', 100);
            $table->timestamps();
            $table->unique(['browse_id', 'lp_url']);
            $table->foreign('browse_id', 'browse_card_browse_id')->references('id')->on('browse')->onUpdate('RESTRICT')->onDelete('RESTRICT');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('browse_cards');
        Schema::drop('browse_urls');
        Schema::drop('browse');
        Schema::drop('blp_urls');
    }
}