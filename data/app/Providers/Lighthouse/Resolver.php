<?php 

namespace App\Providers\Lighthouse;

class Resolver {
  public function __invoke($source, $args, $context, \GraphQL\Type\Definition\ResolveInfo $info)
  {
    $property  = null;

    $fieldName = $info->fieldName;
    if ($source instanceof \Google\Protobuf\Internal\Message) {
      $methodName = 'get' . ucfirst($fieldName);
      if (method_exists($source, $methodName)) {
        $response = $source->$methodName();
        $pool = \Google\Protobuf\Internal\DescriptorPool::getGeneratedPool();
        $desc = $pool->getDescriptorByClassName(get_class($source));
        $field = $this->selectField($desc, $fieldName);
        $repeated = $field->isRepeated();
        $enum = $field->getEnumType();
        if (!is_null($enum)) {
          if ($response === 0) {
            return null;
          }
          if ($field->isRepeated()) {
            return $this->repeatedEnumToNameArray($enum, $response);
          } else {
            return $this->enumToName($enum, $response);
          }
        } else {
          return $response;
        }
      }
    }

    if (is_array($source) || $source instanceof ArrayAccess) {
      if (isset($source[$fieldName])) {
        $property = $source[$fieldName];
      }
    } elseif (is_object($source)) {
      if (isset($source->{$fieldName})) {
        $property = $source->{$fieldName};
      }
    }

    if ($property instanceof Closure) {
      return $property($source, $args, $context, $info);
    }
    return $property;
  }

  private function repeatedEnumToNameArray($enum, \Google\Protobuf\Internal\RepeatedField $repeated) {
    return collect($repeated)->map(function ($number) { return $this->enumToName($enum, $number); });
  }

  private function enumToName($enum, $number) {
    return $enum->getValueByNumber($number)->getName();
  }

  private function selectField($desc, $fieldName): \Google\Protobuf\Internal\FieldDescriptor {
    return collect($desc->getField())
      ->first(function ($field) use ($fieldName) {
        return $field->getName() === $fieldName;
      });
  }
}
