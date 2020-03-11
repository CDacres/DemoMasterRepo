<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__metas extends Model_Base__Object
{     
    function __construct()
    {
        $this->_set_base_class(Meta::class);
        parent::__construct();
    }

    public function get_meta_details($langCode)
    {       
        $this->db->where(Meta::column('controller_name'), $this->router->directory . $this->router->class);
        $this->db->where(Meta::column('method_name'), $this->router->method);
        $this->db->where(Meta::column('lang_code'), $langCode);
        return $this->_query_init_and_run();
    }
}