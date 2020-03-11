<?php

namespace App\Providers\Lighthouse;

class DirectiveListener
{
  public function handle()
  {
    return \App\Providers\Lighthouse\Directives::class;
  }
}
