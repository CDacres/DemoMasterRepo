<?php

namespace App\Providers\Lighthouse;

use GraphQL\Language\AST\NameNode;
use GraphQL\Language\AST\NodeList;
use GraphQL\Language\AST\ObjectTypeDefinitionNode;
use GraphQL\Language\AST\FieldDefinitionNode;
use GraphQL\Language\AST\DirectiveNode;

class ASTListener
{
  public function handle(\Nuwave\Lighthouse\Events\ManipulateAST $event)
  {
    collect($event->documentAST->types)
      ->filter(function ($type) { return $type instanceof ObjectTypeDefinitionNode; })
      ->each(function (ObjectTypeDefinitionNode $definition) {
        collect($definition->fields)->each(function (FieldDefinitionNode $field) {
          $name = new NameNode(['value' => 'proto']);
          $directive = new DirectiveNode(['name' => $name, 'arguments' => []]);
          $directivesNodeList = new NodeList([$directive]);
          $field->directives = $field->directives->merge($directivesNodeList);
        });
      });
  }
}
