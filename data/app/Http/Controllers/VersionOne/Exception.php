<?php

namespace App\Http\Controllers\VersionOne;

use Exception as PHP_Exception;

class Exception extends PHP_Exception
{
    public function __construct(string $message = "", int $code = 0, \Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
}