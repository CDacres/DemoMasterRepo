<?php

namespace App\Providers;

use Nuwave\Lighthouse\LighthouseServiceProvider as LighthouseServiceProviderBase;
use Illuminate\Validation\Factory as ValidationFactory;
use Illuminate\Contracts\Config\Repository as ConfigRepository;
use Illuminate\Support\Facades\Event;
use Nuwave\Lighthouse\Support\Contracts\CreatesContext;

use App\Providers\Lighthouse\Resolver;
use App\Providers\Lighthouse\ASTListener;
use App\Providers\Lighthouse\DirectiveListener;
use App\Providers\Lighthouse\ContextFactory;

class LighthouseServiceProvider extends LighthouseServiceProviderBase
{
  public function register(): void
  {
    parent::register();
    \GraphQL\Executor\Executor::setDefaultFieldResolver(new Resolver());
    $this->app->singleton(CreatesContext::class, ContextFactory::class);
  }

  public function boot(ValidationFactory $validationFactory, ConfigRepository $configRepository): void
  {
    parent::boot($validationFactory, $configRepository);
    Event::listen(\Nuwave\Lighthouse\Events\ManipulateAST::class, ASTListener::class);
    Event::listen(\Nuwave\Lighthouse\Events\RegisterDirectiveNamespaces::class, DirectiveListener::class);
  }
}
