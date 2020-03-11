<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__attribute_language extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Attribute_Language::class);
        parent::__construct();
    }

    public function get_attribute_language_object($lang_code, $attribute_id)
    {
        return new Attribute_Language($this->_get_attribute_language_object($lang_code, $attribute_id));
    }

    private function _get_attribute_language_object($lang_code, $attribute_id)
    {
        $this->db->advanced_join(Attribute_Language::class, Attribute_Type::class, Attribute_Language::column('attribute_id', false), Attribute_Type::id_column(false));
        $this->db->where(Attribute_Language::column('lang_code'), $lang_code);
        $this->db->where(Attribute_Language::column('attribute_id'), $attribute_id);
        return $this->_query_init_and_run();
    }
}