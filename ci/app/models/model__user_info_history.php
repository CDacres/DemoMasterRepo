<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__user_info_history extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(User_Info_History::class);
        parent::__construct();
    }
}