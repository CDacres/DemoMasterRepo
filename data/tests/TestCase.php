<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use ReflectionClass;

abstract class TestCase extends BaseTestCase
{
    protected static function getMethod($path, $name) {
        $class = new ReflectionClass($path);
        $method = $class->getMethod($name);
        $method->setAccessible(true);
        return $method;
    }

    use CreatesApplication;
}
