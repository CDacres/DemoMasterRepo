<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__booking_channels extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Booking_Channel::class);
        parent::__construct();
    }

    public function get_booking_channel_collection()
    {
        return new Booking_Channel___Collection($this->_get_booking_channel_collection());
    }

    private function _get_booking_channel_collection()
    {
        $this->db->order_by(Booking_Channel::id_column(), 'ASC');
        return $this->_query_init_and_run(false);
    }

    public function get_booking_channel_collection_by_country($country_code)
    {
        return new Booking_Channel___Collection($this->_get_booking_channel_collection_by_country($country_code));
    }

    private function _get_booking_channel_collection_by_country($country_code)
    {
        $this->db->advanced_join(Booking_Channel::class, Booking_Channel_Country::class, Booking_Channel::id_column(false), Booking_Channel_Country::column('booking_channel_id', false));
        $this->db->select_alias(Booking_Channel_Country::column('default_commission'), Booking_Channel::alias('country_default_commission'));
        $this->db->select_alias(Booking_Channel_Country::column('self_list_commission'), Booking_Channel::alias('country_self_list_commission'));
        $this->db->where(Booking_Channel_Country::column('country_code'), $country_code);
        $this->db->order_by(Booking_Channel::id_column(), 'ASC');
        return $this->_query_init_and_run(false);
    }
}