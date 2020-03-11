<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__payments_audit extends Model_Base__Auditor
{
    function __construct()
    {
        $this->_set_base_class(Payment_Audit::class);
        parent::__construct();
    }
}