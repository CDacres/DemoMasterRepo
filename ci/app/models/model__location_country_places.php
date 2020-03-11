<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__location_country_places extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Location_Country_Places::class);
        parent::__construct();
    }

    public function get_main_location_object($country)
    {
        return new Location_Country_Places($this->_get_main_location_object($country));
    }

    private function _get_main_location_object($country)
    {
        $parent_location = 'parent_location';
        $this->db->advanced_join(Location_Country_Places::class, Location::class, Location_Country_Places::column('main_location_id', false), Location::id_column(false));
        $this->db->advanced_join(Location::class, Location::class, Location::column('parent_id', false), Location::id_column(false), "LEFT", null, $parent_location);
        $this->db->where(Location_Country_Places::column('country'), $country);
        $this->db->select_alias(Location::column('human_desc'), Location_Country_Places::alias('location_desc'));
        $this->db->select_alias(Location::column('search_url'), Location_Country_Places::alias('location_search_url'));
        $this->db->select_alias(Location::column('human_desc', false, $parent_location), Location_Country_Places::alias('location_parent_desc'));
        $this->db->select_alias(Location::column('requires_determiner', false, $parent_location), Location_Country_Places::alias('location_parent_determiner'));
        return $this->_query_init_and_run();
    }

    public function get_location_places_by_country($country)
    {
        return new Location_Country_Places($this->_get_location_places_by_country($country));
    }

    private function _get_location_places_by_country($country)
    {
        $parent_location = 'parent_location';
        $location_1 = 'location_1';
        $location_2 = 'location_2';
        $location_3 = 'location_3';
        $location_4 = 'location_4';
        $this->db->advanced_join(Location_Country_Places::class, Location::class, Location_Country_Places::column('main_location_id', false), Location::id_column(false));
        $this->db->advanced_join(Location::class, Location::class, Location::column('parent_id', false), Location::id_column(false), "LEFT", null, $parent_location);
        $this->db->advanced_join(Location_Country_Places::class, Location::class, Location_Country_Places::column('location_1_id', false), Location::id_column(false), "LEFT", null, $location_1);
        $this->db->advanced_join(Location_Country_Places::class, Location::class, Location_Country_Places::column('location_2_id', false), Location::id_column(false), "LEFT", null, $location_2);
        $this->db->advanced_join(Location_Country_Places::class, Location::class, Location_Country_Places::column('location_3_id', false), Location::id_column(false), "LEFT", null, $location_3);
        $this->db->advanced_join(Location_Country_Places::class, Location::class, Location_Country_Places::column('location_4_id', false), Location::id_column(false), "LEFT", null, $location_4);
        $this->db->where(Location_Country_Places::column('country'), $country);
        $this->db->select_alias(Location::column('human_desc'), Location_Country_Places::alias('location_desc'));
        $this->db->select_alias(Location::column('human_desc', false, $parent_location), Location_Country_Places::alias('location_parent_desc'));
        $this->db->select_alias(Location::column('requires_determiner', false, $parent_location), Location_Country_Places::alias('location_parent_determiner'));
        $this->db->select_alias(Location::column('human_desc', false, $location_1), Location_Country_Places::alias('location_1_desc'));
        $this->db->select_alias(Location::column('human_desc', false, $location_2), Location_Country_Places::alias('location_2_desc'));
        $this->db->select_alias(Location::column('human_desc', false, $location_3), Location_Country_Places::alias('location_3_desc'));
        $this->db->select_alias(Location::column('human_desc', false, $location_4), Location_Country_Places::alias('location_4_desc'));
        return $this->_query_init_and_run();
    }
}