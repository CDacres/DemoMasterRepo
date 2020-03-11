<?php

namespace App\Jobs\Files;

use App\Jobs\ExtendedJob as Job;
use App\Helpers\FileHelper;

class DeferredDirDeletion extends Job
{
    public $tries = 3;

    protected $_connection;
    protected $_path;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($connection, $path)
    {
        $this->_connection = $connection;
        $this->_path = $path;
        $this->_add_error_variables(['connection' => $connection, 'external_path' => $path]);
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $helper = new FileHelper();
        $helper->deleteDir($this->_connection, $this->_path, false);
    }
}