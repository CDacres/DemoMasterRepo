<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__financial_entities extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Financial_Entity::class);
        parent::__construct();
    }

    public function get_all_financial_entity_details_collection($limit, $offset, $sort_by, $sort_order, $status = '', $keyword = '')
    {
        $venueUserAlias = "main_contact_user";
        $venueProfileAlias = "main_contact_profile";
        $this->db->count_rows(true);
        $this->db->limit($limit, $offset);
        $this->db->allow_join_disabled();
        $this->db->advanced_join(Financial_Entity::class, Venue::class, Financial_Entity::id_column(false), Venue::column('financial_entity_id', false));
        $this->db->advanced_join(Financial_Entity::class, User::class, Financial_Entity::column('account_user', false), User::id_column(false));
        $this->db->advanced_join(User::class, Profile::class, User::id_column(false), Profile::column('user_id', false));
        $this->db->disallow_join_disabled();
        $this->db->advanced_join(Venue::class, Runt_User_Asset_Privilege::class, Venue::asset_id_column(false), Runt_User_Asset_Privilege::column('asset_id', false));
        $this->db->advanced_join(Runt_User_Asset_Privilege::class, User::class, Runt_User_Asset_Privilege::column('user_id', false), User::id_column(false), "LEFT", NULL, $venueUserAlias);
        $this->db->advanced_join(User::class, Profile::class, User::id_column(false), Profile::column('user_id', false), "LEFT", $venueUserAlias, $venueProfileAlias);
        $this->_select_sub_collection(Venue::class, 'venues');
        $this->_set_sub_collection_ordering(Venue::column('name'), 'venues', 'ASC');
        $this->_select_sub_collection_alias(User::column('email', true, $venueUserAlias), 'contact_details', Venue::alias('email'));
        $this->_set_sub_collection_ordering(Profile::column('first_name', true, $venueProfileAlias), 'contact_details', 'ASC');
        $this->_set_sub_collection_ordering(Profile::column('last_name', true, $venueProfileAlias), 'contact_details', 'ASC');
        $this->_select_sub_collection(Profile::class, 'contact_details', $venueProfileAlias);
        $this->db->select_alias(User::column('hubspot_id'), Financial_Entity::alias('account_user_hubspot_id'));
        $this->db->select_alias(Profile::column('first_name'), Financial_Entity::alias('account_user_firstname'));
        $this->db->select_alias(Profile::column('last_name'), Financial_Entity::alias('account_user_lastname'));
        $this->db->select_alias(User::column('email'), Financial_Entity::alias('account_user_email'));
        $this->db->select_alias(User::column('email_status'), Financial_Entity::alias('account_user_email_status'));
        $this->db->select_alias(Profile::column('phone_number'), Financial_Entity::alias('account_user_phone'));
        $this->db->order_by(Financial_Entity::sort_by_token($sort_by), $sort_order);
        if ($status == 'missing_address')
        {
            $this->db->where(Financial_Entity::column('address'));
        }
        elseif ($status == 'missing_vat')
        {
            $this->db->where(Financial_Entity::column('vat_number'));
        }
        elseif ($status == 'missing_financial_data')
        {
            $this->db->where('JSON_TYPE(' . Financial_Entity::column('financial_data') . ') = "NULL"');
        }
        elseif ($status == 'missing_user')
        {
            $this->db->start_group_where(Financial_Entity::column('account_user'));
            $this->db->or_where(User::enabled_column(), 0);
            $this->db->close_group_where();
        }
        if ($keyword != '')
        {
            $this->db->start_group_like(Financial_Entity::id_column(), $keyword);
            $this->db->or_like(Financial_Entity::column('name'), $keyword);
            $this->db->or_like(Financial_Entity::column('address'), $keyword);
            $this->db->or_like(Financial_Entity::column('vat_number'), $keyword);
            $this->db->or_like(Financial_Entity::column('financial_data'), $keyword);
            $this->db->or_like(Venue::id_column(), $keyword);
            $this->db->or_like(Venue::column('name'), $keyword);
            $this->db->or_like(Profile::column('first_name'), $keyword);
            $this->db->or_like(Profile::column('last_name'), $keyword);
            $this->db->or_like("CONCAT(" . Profile::column('first_name') . ", ' ', " . Profile::column('last_name') . ")", $keyword);
            $this->db->or_like("LOWER(" . User::column('email') . ")", strtolower($keyword));
            $this->db->or_like("REPLACE(LOWER(" . User::column('email') . "), '_', '\\_')", strtolower($keyword));
            $this->db->or_like(Profile::column('phone_number'), $keyword);
            $this->db->close_group_like();
        }
        return new Financial_Entity___Collection($this->_query_init_and_run(false));
    }

    public function get_financial_entity_object_by_id($id)
    {
        return new Financial_Entity($this->_get_financial_entity_object_by_id($id));
    }

    private function _get_financial_entity_object_by_id($id)
    {
        $this->db->allow_join_disabled();
        $this->db->advanced_join(Financial_Entity::class, User::class, Financial_Entity::column('account_user', false), User::id_column(false));
        $this->db->advanced_join(User::class, Profile::class, User::id_column(false), Profile::column('user_id', false));
        $this->db->disallow_join_disabled();
        $this->db->select_alias(User::column('hubspot_id'), Financial_Entity::alias('account_user_hubspot_id'));
        $this->db->select_alias(Profile::column('first_name'), Financial_Entity::alias('account_user_firstname'));
        $this->db->select_alias(Profile::column('last_name'), Financial_Entity::alias('account_user_lastname'));
        $this->db->select_alias(User::column('email'), Financial_Entity::alias('account_user_email'));
        $this->db->select_alias(User::column('email_status'), Financial_Entity::alias('account_user_email_status'));
        $this->db->select_alias(Profile::column('phone_number'), Financial_Entity::alias('account_user_phone'));
        $this->db->where(Financial_Entity::id_column(), $id);
        return $this->_query_init_and_run();
    }

    public function get_financial_entity_by_reservation_id($reservation_id)
    {
        return new Financial_Entity___Collection($this->_get_financial_entity_by_reservation_id($reservation_id));
    }

    private function _get_financial_entity_by_reservation_id($reservation_id)
    {
        $venueAlias = "res_venue";
        $this->db->distinct();
        $this->db->advanced_join(Financial_Entity::class, Venue::class, Financial_Entity::id_column(false), Venue::column('financial_entity_id', false));
        $this->db->advanced_join(Venue::class, Company::class, Venue::column('company_id', false), Company::id_column(false));
        $this->db->advanced_join(Company::class, Venue::class, Company::id_column(false), Venue::column('company_id', false), "LEFT", NULL, $venueAlias);
        $this->db->advanced_join(Venue::class, Simple_Room::class, Venue::id_column(false), Simple_Room::column('venue_id', false), "LEFT", $venueAlias);
        $this->db->advanced_join(Simple_Room::class, Reservation::class, Simple_Room::asset_id_column(false), Reservation::column('asset_id', false));
        $this->db->order_by(Financial_Entity::column('name'), 'ASC');
        $this->db->where(Reservation::id_column(), $reservation_id);
        return $this->_query_init_and_run(false);
    }
}