<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use App\ZipcubeInterface\Subscriber;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    /* protected $listen = [ */
    /*     'App\Zipcube\ServiceLayer\Events\AssetUpsertRequested' => [ */
    /*         'App\Zipcube\ServiceLayer\Services\Assets\Functions\Impure\CreateRootAsset', */
    /*     ], */
    /* ]; */

    protected $subscribe = [
      Subscriber::class
    ];
}
