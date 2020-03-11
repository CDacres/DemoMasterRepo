<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Maintenance extends Controller_Base__Page
{
    function __construct()
    {
        parent::__construct();
    }

    function index()
    {
        $this->load->view('maintenance', $this->data);
    }
}