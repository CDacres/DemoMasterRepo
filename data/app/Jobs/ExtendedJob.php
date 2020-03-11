<?php

namespace App\Jobs;

use \Exception;
use App\Jobs\Job;
use App\Contracts\Facades\ChannelLog as Log;

abstract class ExtendedJob extends Job
{
    protected $_error_variables = [];

    protected function _add_error_variables($variable_array)
    {
        $this->_error_variables = array_merge($this->_error_variables, $variable_array);
    }

    public function failed(Exception $ex)
    {
        Log::error($ex->getMessage(), 'default', ['variables' => $this->_error_variables]);
    }
}