<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__language extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Language::class);
        parent::__construct();
    }

    public function get_default_language_object()
    {
        return new Language($this->_get_default_language_data());
    }

    public function get_language_object_from_code($code)
    {
        return new Language($this->_get_language_data_from_code($code));
    }

    public function get_language_object_collection()
    {
        return new Language___Collection($this->_get_enabled_languages_data());
    }

    private function _get_default_language_data()
    {
        $this->db->where(Language::column('default'),1);
        return $this->_query_init_and_run();
    }

    private function _get_language_data_from_code($code)
    {
        $this->db->where(Language::column('code'),$code);
        return $this->_query_init_and_run();
    }

    private function _get_enabled_languages_data()
    {
        return $this->_query_init_and_run(false);
    }
}