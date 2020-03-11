<?php

namespace App\Helpers;

use ReflectionClass;

class DomainHelper
{
    const uk = 1;
    const ie = 2;
    const fr = 3;
    const us = 4;
    const de = 5;

    public function find_locale_id_by_domain($domain_code)
    {
        $class = new ReflectionClass($this);
        return $class->getConstant($domain_code);
    }

    public function find_domain_code_by_locale($locale_id)
    {
        $class = new ReflectionClass($this);
        $constants = array_flip($class->getConstants());
        if (isset($constants[$locale_id]))
        {
            return $constants[$locale_id];
        }
        return false;
    }
}