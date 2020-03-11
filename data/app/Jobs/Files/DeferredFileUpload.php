<?php

namespace App\Jobs\Files;

use App\Jobs\ExtendedJob as Job;
use App\Helpers\FileHelper;

class DeferredFileUpload extends Job
{
    public $tries = 3;

    protected $_connection;
    protected $_tag;
    protected $_holding_id;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($connection, $tag, $holding_id)
    {
        $this->_connection = $connection;
        $this->_tag = $tag;
        $this->_holding_id = $holding_id;
        $this->_add_error_variables(['connection' => $connection, 'external_path' => $tag, 'holding_id' => $holding_id]);
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $helper = new FileHelper();
        $item = $helper->getFileFromHolding($this->_holding_id);
        $helper->upload($this->_connection, $this->_tag, $item, false);
    }
}
