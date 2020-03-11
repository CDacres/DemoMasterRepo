<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__event_types extends Model_Base__Object
{
    public function __construct()
    {
        $this->_set_base_class(Event_Type::class);
        parent::__construct();
    }
}