<?php

namespace App\Providers\Lighthouse;

use Illuminate\Http\Request;
use Nuwave\Lighthouse\Support\Contracts\CreatesContext;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

use App\Providers\Lighthouse\Context;

class ContextFactory implements CreatesContext
{
  /**
   * Generate GraphQL context.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Nuwave\Lighthouse\Support\Contracts\GraphQLContext
   */
  public function generate(Request $request): GraphQLContext
  {
    return new Context($request);
  }
}
