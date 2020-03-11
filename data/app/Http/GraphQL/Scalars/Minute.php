<?php

namespace App\Http\GraphQL\Scalars;

use GraphQL\Type\Definition\ScalarType;

class Minute extends ScalarType
{
    public function serialize($value): int
    {
        return $value;
    }

    public function parseValue($value): int
    {
        return $value;
    }

    public function parseLiteral($valueNode, ?array $variables = null): int
    {
        return $valueNode->value;
    }
}
