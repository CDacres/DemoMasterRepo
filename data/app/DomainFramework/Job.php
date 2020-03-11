<?php

namespace App\DomainFramework;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class Job implements ShouldQueue
{
  use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

  protected $command;
  protected $method;
  protected $caller;
  protected $finally;

  public $tries = 1;

  public function __construct(DomainObject $command, String $method, ?DomainObject $caller = null, ?String $finally = null)
  {
    $this->command = $command;
    $this->method = $method;
    $this->caller = $caller;
    $this->finally = $finally;
  }

  public function handle()
  {
    $this->command->getCalledWith($this->method);
    if (!is_null($this->caller)) {
      $this->caller->getCalledWith($this->finally);
    }
  }
}
