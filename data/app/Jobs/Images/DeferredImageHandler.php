<?php

namespace App\Jobs\Images;

use App\Jobs\ExtendedJob as Job;
use App\Helpers\ImageHelper;

class DeferredImageHandler extends Job
{
    public $tries = 3;

    protected $_type;
    protected $_indicator;
    protected $_name;
    protected $_path;
    protected $_meta;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($type, $indicator, $name, $path, $meta)
    {
        $this->_type = $type;
        $this->_indicator = $indicator;
        $this->_name = $name;
        $this->_path = $path;
        $this->_meta = $meta;
        $this->_add_error_variables(['key' => 'URL types have an external URL. Holding Id types should be found in the local filesystem (storage/files/holding)', 'type' => $this->_type, 'indicator' => $this->_indicator, 'name' => $this->_name, 'path' => $this->_path]);
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $helper = new ImageHelper();
        $helper->handleNewImageByType($this->_type, $this->_indicator, $this->_name, $this->_path, $this->_meta);
    }
}