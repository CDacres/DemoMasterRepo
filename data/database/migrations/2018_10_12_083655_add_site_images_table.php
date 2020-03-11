<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSiteImagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('site_images', function(Blueprint $table)
        {
            $table->increments('id');
            $table->string('name', 255);
            $table->integer('image_type_id')->unsigned()->default(3)->index('site_images_image_type_id_foreign');
            $table->timestamps();
            $table->foreign('image_type_id')->references('id')->on('image_types')->onUpdate('RESTRICT')->onDelete('RESTRICT');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('site_images');
    }
}