<?php

namespace App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\ImageProxy\Jobs;

use App\Jobs\ExtendedJob as Job;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\ImageProxy\ImageUploadProxy;

class ImageUploadJob extends Job {

  public $tries = 3;

  private $_serializedProxy;

  /**
   * Create a new job instance.
   *
   * @return void
   */
  public function __construct(ImageUploadProxy $proxy) {
    $this->_serializedProxy = serialize($proxy);
  }

  /**
   * Execute the job.
   *
   * @return void
   */
  public function handle()
  {
    $proxy = unserialize($this->_serializedProxy);
    $proxy->deferredSave();
  }
}
