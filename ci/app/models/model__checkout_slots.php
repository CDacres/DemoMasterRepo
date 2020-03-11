<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__checkout_slots extends Model_Base__Object
{
    public function __construct()
    {
        $this->_set_base_class(Checkout_Slot::class);
        parent::__construct();
    }
}