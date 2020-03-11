<?php

namespace App\Http\GraphQL\Directives;

use Nuwave\Lighthouse\Support\Contracts\Directive;
use Nuwave\Lighthouse\Support\Contracts\FieldMiddleware;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use GraphQL\Type\Definition\ResolveInfo;

use Closure;
use Nuwave\Lighthouse\Schema\Values\FieldValue;

class InputToTypeDirective implements Directive, FieldMiddleware
{
  /**
   * Directive name.
   *
   * @return string
   */
  public function name(): string
  {
    return 'inputToType';
  }

  /**
   * Remove whitespace from the beginning and end of a given input.
   *
   * @param  string  $argumentValue
   * @return mixed
   */

  public function handleField(FieldValue $fieldValue, Closure $next): FieldValue
  {
    $node = $fieldValue->getField();
    $previousResolver = $fieldValue->getResolver();
    $wrappedResolver = function ($root, $args, GraphQLContext $context, ResolveInfo $info) use ($previousResolver, $node) {
      $relevantDirective = $this->pluckRelevantDirectiveFromNode($node);
      $relevantArgs = $this->assertAndRetrieveRelevantArgs($args, $node);
      $type = $this->inferTypeFromDirective($relevantDirective);
      if (!is_null($type)) {
        $this->assertType($type);
        $object = new $type();
        $object->mergeFromJsonString(json_encode($relevantArgs));
        $args = $object;
      }
      $result = $previousResolver($root, $args, $context, $info);
      return $result;
    };

    $fieldValue->setResolver($wrappedResolver);

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

  private function assertType($type) {
    if (!class_exists($type))
    {
      throw new \Exception('InputToType directive specified non-existent type: ' . $namespacedType);
    }
  }

  private function pluckRelevantDirectiveFromNode($node) {
    $directives = collect($node->directives);
    return $directives->first(
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

  /* private function namespaceType($name): string */
  /* { */
  /*   return '\App\Types\GQL\\' . $name; */
  /* } */
}
