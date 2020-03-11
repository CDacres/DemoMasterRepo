<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__usages extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Usage::class);
        parent::__construct();
    }

    public function get_usages_objects_collection()
    {
        return new Usage___Collection($this->_get_usages_objects_collection());
    }

    private function _get_usages_objects_collection()
    {
        $this->db->order_by(Usage::column('desc'), 'ASC');
        return $this->_query_init_and_run(false);
    }
}