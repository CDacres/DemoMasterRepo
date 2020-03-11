<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__reservation_status extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Reservation_Status::class);
        parent::__construct();
    }

    public function get_reservation_status_by_id($id)
    {
        $this->db->where(Reservation_Status::id_column(), $id);
        return $this->_query_init_and_run()['name'];
    }
}