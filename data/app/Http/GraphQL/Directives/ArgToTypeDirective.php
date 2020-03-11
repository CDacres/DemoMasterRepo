<?php

namespace App\Http\GraphQL\Directives;

use Nuwave\Lighthouse\Support\Contracts\Directive;
use Nuwave\Lighthouse\Support\Contracts\FieldMiddleware;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use GraphQL\Type\Definition\ResolveInfo;

use Closure;
use Nuwave\Lighthouse\Schema\Values\FieldValue;

class ArgToTypeDirective implements Directive, FieldMiddleware
{
  /**
   * Directive name.
   *
   * @return string
   */
  public function name(): string
  {
    return 'argToType';
  }

  /**
   * Remove whitespace from the beginning and end of a given input.
   *
   * @param  string  $argumentValue
   * @return mixed
   */
  /* public function transform($arguments) */
  /* { */
  /*   $value = $this->inferType($arguments); */
  /*   return $value; */
  /* } */

  public function handleField(FieldValue $fieldValue, Closure $next): FieldValue
  {
    $node = $fieldValue->getField();
    /** @var Closure $previousResolver */
    $previousResolver = $fieldValue->getResolver();
    // Wrap around the resolver
    $wrappedResolver = function ($root, $args, GraphQLContext $context, ResolveInfo $info) use ($previousResolver, $node) {
      $relevantDirective = $this->pluckRelevantDirectiveFromNode($node);
      $relevantArgs = $this->assertAndRetrieveRelevantArgs($args, $node);
      $type = $this->inferTypeFromDirective($relevantDirective);
      if (!is_null($type)) {
        $this->assertType($type);
        $object = new $type();

        $object->mergeFromJsonString(json_encode($args));
        return $object;
      }
      /* if (is_array($args) && isset($args['args'])) { */
      /*   $args = $args['args']; */
      /* } */
      $closure($args);
      $result = $previousResolver($root, $args, $context, $info);
      return $result;
    };

    // Place the wrapped resolver back upon the FieldValue
    // It is not resolved right now - we just prepare it
    $fieldValue->setResolver($wrappedResolver);

    // Keep the middleware chain going
    return $next($fieldValue);
  }

  private function assertAndRetrieveRelevantArgs(array $args, \GraphQL\Language\AST\FieldDefinitionNode $node) {
    $arguments = collect($node->arguments);
    if ($arguments->count() !== 1) {
      throw new \Exception('ToType directive only available on single argument inputs');
    }
    $argument = $arguments->first();
    $argName = $argument->name->value;
    return $args[$argName];
  }

  private function inferType($arguments) {
    $node = $this->definitionNode;
    $relevantDirective = $this->pluckRelevantDirectiveFromNode($node);
    $type = $this->inferTypeFromDirective($relevantDirective);

    if (!is_null($type)) {
      $this->assertType($type);
      $object = new $type();

      $object->mergeFromJsonString(json_encode($arguments));
      return $object;
    }
    $type = $this->inferTypeFromArgumentType($node);
    if (is_null($type)) {
      throw new \Exception('As directive used with no inferrable type');
    }
    $namespacedType = $this->namespaceType($type);
    if (!class_exists($namespacedType))
    {
      throw new \Exception('As directive specified non-existent type: ' . $namespacedType);
    }
    return $namespacedType;
  }

  private function assertType($type) {
    if (!class_exists($type))
    {
      throw new \Exception('As directive specified non-existent type: ' . $namespacedType);
    }
  }

  private function inferTypeFromArgumentType($node) {
    if ($node->type instanceof \GraphQL\Language\AST\NonNullTypeNode) {
      $type = $node->type->type->name->value;
    } else if ($node->type instanceof \GraphQL\Language\AST\ListTypeNode) {

    } else {
      $type = $node->type->name->value;
    }
    return null;
  }

  private function pluckRelevantDirectiveFromNode($node) {
    return collect($node->directives)->first(
      function ($directive) {
        return $directive->name->value === $this->name();
      }
    );
  }

  private function inferTypeFromDirective($relevantDirective) {
    $arguments = $relevantDirective->arguments;
    $potentialTypeContainer = collect($arguments)->first(
      function ($arg) {
        return $arg->name->value === 'type';
      }
    );
    if (!is_null($potentialTypeContainer)) {
      return $potentialTypeContainer->value->value;
    }
    return null;
  }

  private function namespaceType($name): string
  {
    return '\App\Types\GQL\\' . $name;
  }
}
