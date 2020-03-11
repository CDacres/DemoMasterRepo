<?php

namespace App\Providers\Lighthouse\Directives;

use Closure;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Schema\Values\FieldValue;
use Nuwave\Lighthouse\Support\Contracts\Directive;
use Nuwave\Lighthouse\Support\Contracts\FieldMiddleware;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class ProtoDirective implements Directive, FieldMiddleware
{
  /**
   * Name of the directive as used in the schema.
   *
   * @return string
   */
  public function name(): string
  {
    return 'proto';
  }

  /**
   * Wrap around the final field resolver.
   *
   * @param \Nuwave\Lighthouse\Schema\Values\FieldValue $fieldValue
   * @param \Closure $next
   * @return \Nuwave\Lighthouse\Schema\Values\FieldValue
   */
  public function handleField(FieldValue $fieldValue, Closure $next): FieldValue
  {
    // Retrieve the existing resolver function
    /** @var Closure $previousResolver */
    $previousResolver = $fieldValue->getResolver();

    // Wrap around the resolver
    $wrappedResolver = function ($root, $args, GraphQLContext $context, ResolveInfo $info) use ($previousResolver) {

      $result = $previousResolver($root, $args, $context, $info);

      if ($result instanceof \App\Types\Id) {
        return ['value' => $result->getValue()];
      } elseif ($result instanceof \Google\Protobuf\Internal\RepeatedField) {
        if ($result->getClass() === \App\Types\Id::class) {
          return collect($result)->map(function (\App\Types\Id $id) { return ['value' => $id->getValue()]; })->toArray();
        }
        return $result;
      }
      return $result;
    };

    // Place the wrapped resolver back upon the FieldValue
    // It is not resolved right now - we just prepare it
    $fieldValue->setResolver($wrappedResolver);

    // Keep the middleware chain going
    return $next($fieldValue);
  }
}
