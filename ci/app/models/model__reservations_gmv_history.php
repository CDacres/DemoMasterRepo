<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__reservations_gmv_history extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Reservation_Gmv_History::class);
        parent::__construct();
    }

    protected function _pre_insert($object)
    {
        $object->set('date_time', date("Y-m-d H:i:s"));
    }
}