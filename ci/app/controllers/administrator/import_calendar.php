<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Import_Calendar extends Controller_Base__Admin
{
    public function index()
    {
        $this->_add_js(auto_version('administrator/import_calendar.js'));
        $this->data['message_element'] = 'administrator/import_calendar';
        $this->_render();
    }
}