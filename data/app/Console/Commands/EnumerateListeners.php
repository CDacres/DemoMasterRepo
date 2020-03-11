<?php

namespace App\Console\Commands;

use App\Console\Commands\Helpers\PrintsEvents;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;

class EnumerateListeners extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'domain:events {event?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Enumerates Domain Events';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
      $events = Cache::get('domainEvents');
      $event = $this->argument('event');
      (new PrintsEvents())->print($this, $events, $event);
    }
}
