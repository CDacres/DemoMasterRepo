<?php
if (!defined('BASEPATH')) exit('No direct script access allowed'); 

class Model_Base__Generic_Object extends Model_Base__Object
{   
    public function set_base_class($baseClass)
    {
        $this->_set_base_class($baseClass);
    }
}