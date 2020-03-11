<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__usagesuperset extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(UsageSuperset::class);
        parent::__construct();
    }
}