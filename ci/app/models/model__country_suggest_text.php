<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__country_suggest_text extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Country_Suggest_Text::class);
        parent::__construct();
    }

    public function get_country_suggest_text_by_locale($locale_code)
    {
        return new Country_Suggest_Text($this->_get_country_suggest_text_by_locale($locale_code));
    }

    private function _get_country_suggest_text_by_locale($locale_code)
    {
        $this->db->advanced_join(Country_Suggest_Text::class, Contact_Info::class, Country_Suggest_Text::column('locale_code', false), Contact_Info::column('locale', false));
        $this->db->select_alias(Contact_Info::column('country'), Country_Suggest_Text::alias('country_name'));
        $this->db->where(Country_Suggest_Text::column('locale_code'), $locale_code);
        return $this->_query_init_and_run();
    }
}