<?php

namespace App\Http\GraphQL\Scalars;

use GraphQL\Type\Definition\ScalarType;

class Ref extends ScalarType
{
  public function serialize($value) {
    return $value['value'];
  }

  public function parseValue($value) {
    $result = ['value' => $value];
    return $result;
  }

  public function parseLiteral($valueNode, ?array $variables = null) {
    $result = ['value' => $valueNode->value];
    return $result;
  }
}
