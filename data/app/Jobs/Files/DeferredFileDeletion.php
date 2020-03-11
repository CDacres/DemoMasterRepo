<?php

namespace App\Jobs\Files;

use App\Jobs\ExtendedJob as Job;
use App\Helpers\FileHelper;

class DeferredFileDeletion extends Job
{
    public $tries = 3;

    protected $_connection;
    protected $_tag;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($connection, $tag)
    {
        $this->_connection = $connection;
        $this->_tag = $tag;
        $this->_add_error_variables(['connection' => $connection, 'external_path' => $tag]);
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $helper = new FileHelper();
        $helper->deleteFile($this->_connection, $this->_tag, false);
    }
}