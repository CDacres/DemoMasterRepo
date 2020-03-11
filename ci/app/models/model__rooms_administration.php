<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');
/**
 * Zipcube Rooms Class
 *
 * Room information in database - booking types, amenities, configurations, etc
 *
 * @package		Zipcube
 * @subpackage          Models
 * @category            Data
 * @author		Will
 * @version		Version 2.0
 * @link		www.zipcube.com
 */

class Model__rooms_administration extends Model__room_skeletons
{
    function __construct()
    {
        parent::__construct();
        $this->_set_base_class(Room_Administration::class);
    }

    function get_admin_super_collection_by_company_id($companyId, $date)
    {
        $this->db->where(Company::id_column(), $companyId);
        $this->_wrap_in_collection('venue_id');
        $this->_add_opening_hours($date);
        $this->_add_reservations($date);
        return new Room_Administration___Collection_Collection($this->_query_launch(true, false));
    }

    function get_rooms_super_collection_available_to_user($userId, $date, $privilegeConst = null)
    {
        $this->_filter_on_user_id($userId);
        $this->_filter_on_privilege($privilegeConst);
        $this->_wrap_in_collection('venue_id');
        $this->db->order_by(Venue::column('name'), 'ASC');
        $this->db->order_by(Room_Skeleton::column('title'), 'ASC');
        $this->_add_opening_hours($date);
        $this->_add_reservations($date);
        return new Room_Administration___Collection_Collection($this->_query_launch(true, false, false));
    }

    function get_resources_super_collection_by_company_id($companyId)
    {
        $this->db->where(Company::id_column(), $companyId);
        $this->_wrap_in_collection('venue_id');
        return new Room_Administration___Collection_Collection($this->_query_launch(true, false));
    }

    protected function _add_reservations($date)
    {
        $this->_query_join_booked_periods($date);
        $this->db->advanced_join(Booked_Period::class, Reservation::class, Booked_Period::column('reservation_id',false), Reservation::id_column(false));
        $this->_select_sub_collection_alias(Booked_Period::column('start'), 'reservations', Reservation::alias('start_date_time'));
        $this->_select_sub_collection_alias(Booked_Period::column('end'), 'reservations', Reservation::alias('end_date_time'));
        $this->_select_sub_collection(Reservation::class, 'reservations');
    }

    protected function _add_opening_hours($date)
    {
        $this->db->join(Opening_Hours::tableName(), Room_Administration::column('asset_id') . " = " . Opening_Hours::column('asset_id') . " AND " . Opening_Hours::column('day_id') . " = " . date("w",strtotime($date)), "LEFT");
        $this->db->nullable_where(Opening_Hours::column('aggregate'), 0);
        $this->_select_sub_collection(Opening_Hours::class, 'opening_hours');
        $this->_set_sub_collection_ordering(Opening_Hours::column('start'), 'opening_hours', 'ASC');
    }
}