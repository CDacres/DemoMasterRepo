<?php

namespace App\Jobs\Cron;

use App\Jobs\ExtendedJob as Job;

use App\Helpers\LandingPagesHelper;

class LandingPageGet extends Job
{
    public $tries = 3;

    public function handle()
    {
        (new LandingPagesHelper)->reset_cached_landing_pages();
    }
}
