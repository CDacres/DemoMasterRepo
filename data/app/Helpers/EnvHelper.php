<?php

namespace App\Helpers;

class EnvHelper
{
    protected $_env = null;

    public function getEnv()
    {
        if (is_null($this->_env))
        {
            $this->_env = env('ENVIRONMENT');
        }
        return $this->_env;
    }

    public function acceptsInsecureCertificates()
    {
        return $this->getEnv() !== 'production';
    }
}