<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Boot the authentication services for the application.
     *
     * @return void
     */
    public function boot()
    {
        // Here you may define how you wish users to be authenticated for your Lumen
        // application. The callback which receives the incoming request instance
        // should return either a User instance or null. You're free to obtain
        // the User instance via an API token or any other method necessary.

        $this->_registerPolicies();

        $this->app['auth']->viaRequest('api', function ($request) {
            return true;
        });
    }

    private function _registerPolicies()
    {
        Gate::policy(\App\LaravelExtensions\Model\MyModel::class, \App\Policies\StandardPolicy::class);
        Gate::policy(\App\Models\User::class, \App\Policies\UserPolicy::class);
        Gate::policy(\App\Models\Amenity::class, \App\Policies\AmenityPolicy::class);
        Gate::policy(\App\Models\Asset::class, \App\Policies\AssetPolicy::class);
        Gate::policy(\App\Models\VenueAsset::class, \App\Policies\AssetPolicy::class);
        Gate::policy(\App\Models\RoomAsset::class, \App\Policies\AssetPolicy::class);
        Gate::policy(\App\Models\AssetImage::class, \App\Policies\AssetImagePolicy::class);
        Gate::policy(\App\Models\Pivots\AssetAmenity::class, \App\Policies\FacilityPolicy::class);
    }
}