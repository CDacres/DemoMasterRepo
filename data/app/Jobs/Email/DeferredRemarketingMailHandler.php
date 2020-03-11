<?php

namespace App\Jobs\Email;

use App\Jobs\Email\DeferredRemarketingMail;
use App\Models\Marketing\MarketingDrives;
use App\Jobs\ExtendedJob as Job;

class DeferredRemarketingMailHandler extends Job
{
    public $tries = 3;

    protected $_dry_run = false;
    protected $_frequency;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($dry_run, $frequency)
    {
        $this->_dry_run = $dry_run;
        $this->_frequency = $frequency;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $drives = $this->_get_drives();
        dispatch(new DeferredRemarketingMail($drives, [], $this->_dry_run));
    }

    private function _get_drives()
    {
        $drive_query = MarketingDrives::with([
                'views',
                'views.events',
            ])->where(['frequency' => $this->_frequency])->orderBy('priority', 'ASC');
        if ($this->_dry_run)
        {
            $drive_query->where('status', 'ENABLED');
            $drive_query->orWhere('status', 'TESTING');
        }
        else
        {
            $drive_query->where('status', 'ENABLED');
        }
        return $drive_query->get();
    }
}