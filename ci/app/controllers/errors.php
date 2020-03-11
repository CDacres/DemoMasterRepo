<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Errors extends Controller_Base__Page
{
    function __construct()
    {
        parent::__construct();
    }

    public function page_missing()
    {
        return $this->_page_404();
    }
}