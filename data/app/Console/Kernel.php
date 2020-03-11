<?php

namespace App\Console;

use App\Console\Commands\EnumerateListeners;
use App\Console\Commands\EnumerateConsumers;
use App\Console\Commands\GenerateTypes;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

use App\Jobs\Cron\LocationAssetRoomCountInsert;
use App\Jobs\Cron\RoomTagInsert;
use App\Jobs\Cron\LandingPageGet;
use App\Jobs\Cron\VenueCommissionInsert;

use App\Console\Commands\RebuildDomain;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
      RebuildDomain::class,
      EnumerateListeners::class,
      EnumerateConsumers::class,
      GenerateTypes::class
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->job(new LocationAssetRoomCountInsert)->dailyAt('3:10');
        $schedule->job(new RoomTagInsert)->dailyAt('3:20');
        $schedule->job(new LandingPageGet)->everyTenMinutes();
        $schedule->job(new VenueCommissionInsert)->hourly();
    }
}
