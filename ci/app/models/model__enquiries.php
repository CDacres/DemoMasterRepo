<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__enquiries extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Enquiry::class);
        parent::__construct();
    }

    protected function _post_update($object)
    {
        if (!$object->audit_is_suppressed())
        {
            $this->_audit($object);
        }
    }

    protected function _post_insert($object)
    {
        $this->_audit($object);
    }

    protected function _pre_insert($object)
    {
        $object->set('created', date("Y-m-d H:i:s"));
    }

    private function _audit($object)
    {
        $auditModel = Model__enquiries_audit::class;
        $this->load->model($auditModel);
        $this->$auditModel->audit($object);
    }

    protected function _user_can_select($object)
    {
        return $this->user_is_admin();
    }

    protected function _user_can_update($object)
    {
        return $this->user_is_admin();
    }

    public function resend_email($enquiry)
    {
        $modelComms = Model__comms::class;
        $this->load->model($modelComms);
        $this->$modelComms->enquiry($enquiry);
    }

    public function get_enquiry_by_id($id)
    {
        return new Enquiry($this->_get_enquiry_by_id($id));
    }

    private function _get_enquiry_by_id($id)
    {
        $this->_join_secondaries();
        $this->db->where(Enquiry::id_column(), $id);
        return $this->_query_init_and_run();
    }

    public function get_enquiry_collection_by_user($user_id, $statusArr = [])
    {
        return new Enquiry___Collection($this->_get_enquiry_collection_by_user($user_id, $statusArr));
    }

    private function _get_enquiry_collection_by_user($user_id, $statusArr)
    {
        $this->_join_secondaries();
        $this->db->where(Enquiry::column('user_id'), $user_id);
        if (count($statusArr) > 0)
        {
            $this->db->where_in(Enquiry::column('status'), $statusArr);
        }
        $this->db->order_by(Enquiry::column('created'), 'DESC');
        return $this->_query_init_and_run(false);
    }

    public function get_all_enquiry_details_collection($limit, $offset, $sort_by, $sort_order, $status = '', $keyword = '')
    {
        $this->db->count_rows(true);
        $this->db->limit($limit, $offset);
        $this->_join_secondaries();
        if ($sort_by == 'title')
        {
            $this->db->order_by(Runt_Enquiry_Room::sort_by_token($sort_by), $sort_order);
        }
        else
        {
            $this->db->order_by(Enquiry::sort_by_token($sort_by), $sort_order);
        }
        $this->_get_enquiry_where_clauses($status, $keyword);
        return new Enquiry___Collection($this->_query_init_and_run(false));
    }

    public function get_total_potential_revenue($status = '', $keyword = '')
    {
        return new Enquiry($this->_get_total_potential_revenue($status, $keyword));
    }

    private function _get_total_potential_revenue($status, $keyword)
    {
        $this->db->select_sum(Enquiry::column('potentialValue'), 'potential_revenue');
        $this->_join_secondaries(false);
        $this->_get_enquiry_where_clauses($status, $keyword);
        return $this->_query_init_and_run();
    }

    private function _join_secondaries($include_aliases = true)
    {
        $venueUserAlias = "main_contact_user";
        $venueProfileAlias = "main_contact_profile";
        $this->db->allow_join_disabled();
        $this->db->advanced_join(Enquiry::class, User::class, Enquiry::column('user_id', false), User::id_column(false));
        $this->db->advanced_join(User::class, Profile::class, User::id_column(false), Profile::column('user_id', false));
        $this->db->advanced_join(Enquiry::class, Runt_Enquiry_Room::class, Enquiry::id_column(false), Runt_Enquiry_Room::column('enquiry_id', false));
        $this->db->advanced_join(Runt_Enquiry_Room::class, Simple_Room::class, Runt_Enquiry_Room::column('room_id', false), Simple_Room::id_column(false));
        $this->db->advanced_join(Simple_Room::class, Venue::class, Simple_Room::column('venue_id', false), Venue::id_column(false));
        $this->db->advanced_join(Venue::class, Company::class, Venue::column('company_id', false), Company::id_column(false));
        $this->db->advanced_join(Venue::class, User::class, Venue::column('main_contact', false), User::id_column(false), "LEFT", NULL, $venueUserAlias);
        $this->db->advanced_join(User::class, Profile::class, User::id_column(false), Profile::column('user_id', false), "LEFT", $venueUserAlias, $venueProfileAlias);
        $this->db->disallow_join_disabled();
        $this->db->advanced_join(Simple_Room::class, Usage::class, Simple_Room::column('usage_id', false), Usage::id_column(false));
        $this->db->advanced_join(Usage::class, Runt_Usage_UsageSuperset::class, Usage::id_column(false), Runt_Usage_UsageSuperset::column('usage_id', false));
        $this->db->advanced_join(Runt_Usage_UsageSuperset::class, UsageSuperset::class, Runt_Usage_UsageSuperset::column('usage_superset_id', false), UsageSuperset::id_column(false));
        $this->db->advanced_join(Enquiry::class, Enquiry_Status::class, Enquiry::column('status', false), Enquiry_Status::id_column(false));
        $this->db->advanced_join(Enquiry::class, Enquiry_Duration::class, Enquiry::column('duration', false), Enquiry_Duration::id_column(false));
        $this->db->advanced_join(Enquiry::class, Runt_Enquiry_Configuration::class, Enquiry::id_column(false), Runt_Enquiry_Configuration::column('enquiry_id', false));
        if ($include_aliases)
        {
            $this->_select_sub_collection(Runt_Enquiry_Room::class, 'rooms');
            $this->_select_sub_collection_alias(Simple_Room::column('title'), 'rooms', Runt_Enquiry_Room::alias('title'));
            $this->_select_sub_collection_alias(Simple_Room::asset_id_column(), 'rooms', Runt_Enquiry_Room::alias('room_asset_id'));
            $this->_select_sub_collection_alias(Simple_Room::enabled_column(), 'rooms', Runt_Enquiry_Room::alias('room_enabled'));
            $this->_select_sub_collection_alias(Venue::id_column(), 'rooms', Runt_Enquiry_Room::alias('venue_id'));
            $this->_select_sub_collection_alias(Venue::asset_id_column(), 'rooms', Runt_Enquiry_Room::alias('venue_asset_id'));
            $this->_select_sub_collection_alias(Venue::column('name'), 'rooms', Runt_Enquiry_Room::alias('venue_name'));
            $this->_select_sub_collection_alias(Venue::column('website'), 'rooms', Runt_Enquiry_Room::alias('venue_website'));
            $this->_select_sub_collection_alias(Venue::column('city'), 'rooms', Runt_Enquiry_Room::alias('venue_city'));
            $this->_select_sub_collection_alias(Venue::column('country'), 'rooms', Runt_Enquiry_Room::alias('venue_country'));
            $this->_select_sub_collection_alias(Venue::column('country_code'), 'rooms', Runt_Enquiry_Room::alias('venue_country_code'));
            $this->_select_sub_collection_alias(Venue::column('uses_live_bookings'), 'rooms', Runt_Enquiry_Room::alias('venue_live_bookings'));
            $this->_select_sub_collection_alias(Venue::column('agree_to_list'), 'rooms', Runt_Enquiry_Room::alias('venue_agree_to_list'));
            $this->_select_sub_collection_alias(Venue::enabled_column(), 'rooms', Runt_Enquiry_Room::alias('venue_enabled'));
            $this->_select_sub_collection_alias(User::id_column(false, $venueUserAlias), 'rooms', Runt_Enquiry_Room::alias('main_user_id'));
            $this->_select_sub_collection_alias(User::column('hubspot_id', false, $venueUserAlias), 'rooms', Runt_Enquiry_Room::alias('main_user_hubspot_id'));
            $this->_select_sub_collection_alias(Profile::column('first_name', false, $venueProfileAlias), 'rooms', Runt_Enquiry_Room::alias('main_user_firstname'));
            $this->_select_sub_collection_alias(Profile::column('last_name', false, $venueProfileAlias), 'rooms', Runt_Enquiry_Room::alias('main_user_lastname'));
            $this->_select_sub_collection_alias(User::column('email', false, $venueUserAlias), 'rooms', Runt_Enquiry_Room::alias('main_user_email'));
            $this->_select_sub_collection_alias(User::column('email_status', false, $venueUserAlias), 'rooms', Runt_Enquiry_Room::alias('main_user_email_status'));
            $this->_select_sub_collection_alias(Profile::column('phone_number', false, $venueProfileAlias), 'rooms', Runt_Enquiry_Room::alias('main_user_phone'));
            $this->_select_sub_collection_alias(User::column('role_id', false, $venueUserAlias), 'rooms', Runt_Enquiry_Room::alias('main_user_role_id'));
            $this->_select_sub_collection_alias(Company::column('name'), 'rooms', Runt_Enquiry_Room::alias('company_name'));
            $this->_select_sub_collection_alias(UsageSuperset::column('alias'), 'rooms', Runt_Enquiry_Room::alias('usage_superset_alias'));
            $this->_select_sub_collection(Runt_Enquiry_Configuration::class, 'configurations');
            $this->db->select_alias(User::column('hubspot_id'), Enquiry::alias('user_hubspot_id'));
            $this->db->select_alias(User::column('email'), Enquiry::alias('user_email'));
            $this->db->select_alias(User::column('email_status'), Enquiry::alias('user_email_status'));
            $this->db->select_alias(Profile::column('first_name'), Enquiry::alias('user_first_name'));
            $this->db->select_alias(Profile::column('last_name'), Enquiry::alias('user_last_name'));
            $this->db->select_alias(Profile::column('phone_number'), Enquiry::alias('user_phone_number'));
            $this->db->select_alias(User::column('role_id'), Enquiry::alias('user_role_id'));
            $this->db->select_alias(User::enabled_column(), Enquiry::alias('user_enabled'));
            $this->db->select_alias(Enquiry_Status::column('name'), Enquiry::alias('status_desc'));
            $this->db->select_alias(Enquiry_Duration::column('desc'), Enquiry::alias('duration_desc'));
            $this->db->select_alias(Enquiry_Duration::column('lang_key'), Enquiry::alias('duration_desc_lang_key'));
            $this->db->select_alias(Enquiry_Duration::column('hide_email'), Enquiry::alias('duration_hide_email'));
            $this->db->select_alias(User::column('canonical_cookie_id'), Enquiry::alias('tracking_cookie_id'));
        }
        $this->db->nullable_where(UsageSuperset::column('hidden'), 0);
    }

    private function _get_enquiry_where_clauses($status, $keyword)
    {
        $venueUserAlias = "main_contact_user";
        $venueProfileAlias = "main_contact_profile";
        $splitStatus = explode('_', $status);
        $this->_find_status_where($status);
        if (is_numeric($status))
        {
            $this->db->where(Enquiry::column('assignedAdmin'), $status);
            $this->db->start_group_where(Enquiry::column('status'), Enquiry_Status::PENDING);
            $this->db->or_where(Enquiry::column('status'), Enquiry_Status::ALTERNATIVE);
            $this->db->or_where(Enquiry::column('status'), Enquiry_Status::OFFER);
            $this->db->or_where(Enquiry::column('status'), Enquiry_Status::VIEWING);
            $this->db->or_where(Enquiry::column('status'), Enquiry_Status::SALVAGE);
            $this->db->close_group_where();
        }
        elseif (isset($splitStatus[0]) && is_numeric($splitStatus[0]))
        {
            $this->db->where(Enquiry::column('assignedAdmin'), $splitStatus[0]);
            if (isset($splitStatus[1]))
            {
                $this->_find_status_where($splitStatus[1]);
            }
        }
        elseif ($status == 'unassigned')
        {
            $adminUserTableAlias = "admin_user";
            $this->db->allow_join_disabled();
            $this->db->advanced_join(Enquiry::class, User::class, Enquiry::column('assignedAdmin', false), User::id_column(false), "LEFT", NULL, $adminUserTableAlias);
            $this->db->disallow_join_disabled();
            $this->db->start_group_where(Enquiry::column('assignedAdmin'));
            $this->db->or_where(User::column('role_id', true, $adminUserTableAlias) . ' <> ' . User::ADMINUSER);
            $this->db->close_group_where();
            $this->db->start_group_where(Enquiry::column('status'), Enquiry_Status::PENDING);
            $this->db->or_where(Enquiry::column('status'), Enquiry_Status::ALTERNATIVE);
            $this->db->or_where(Enquiry::column('status'), Enquiry_Status::OFFER);
            $this->db->or_where(Enquiry::column('status'), Enquiry_Status::VIEWING);
            $this->db->or_where(Enquiry::column('status'), Enquiry_Status::SALVAGE);
            $this->db->close_group_where();
        }
        if ($keyword != '')
        {
            $this->db->start_group_like(Enquiry::id_column(), $keyword);
            $this->db->or_like(Profile::column('first_name'), $keyword);
            $this->db->or_like(Profile::column('last_name'), $keyword);
            $this->db->or_like("CONCAT(" . Profile::column('first_name') . ", ' ', " . Profile::column('last_name') . ")", $keyword);
            $this->db->or_like("LOWER(" . User::column('email') . ")", strtolower($keyword));
            $this->db->or_like("REPLACE(LOWER(" . User::column('email') . "), '_', '\\_')", strtolower($keyword));
            $this->db->or_like(Profile::column('phone_number'), $keyword);
            $this->db->or_like(Enquiry::column('user_phone'), $keyword);
            $this->db->or_like(Profile::column('first_name', true, $venueProfileAlias), $keyword);
            $this->db->or_like(Profile::column('last_name', true, $venueProfileAlias), $keyword);
            $this->db->or_like("CONCAT(" . Profile::column('first_name', true, $venueProfileAlias) . ", ' ', " . Profile::column('last_name', true, $venueProfileAlias) . ")", $keyword);
            $this->db->or_like("LOWER(" . User::column('email', true, $venueUserAlias) . ")", $keyword);
            $this->db->or_like("REPLACE(LOWER(" . User::column('email', true, $venueUserAlias) . "), '_', '\\_')", $keyword);
            $this->db->or_like(Profile::column('phone_number', true, $venueProfileAlias), $keyword);
            $this->db->or_like(Enquiry::column('user_phone'), $keyword);
            $this->db->or_like(Simple_Room::id_column(), $keyword);
            $this->db->or_like(Simple_Room::column('title'), $keyword);
            $this->db->or_like(Venue::id_column(), $keyword);
            $this->db->or_like(Venue::column('name'), $keyword);
            $this->db->or_like(Venue::column('address'), $keyword);
            $this->db->or_like(Venue::column('phone'), $keyword);
            $this->db->or_like(Venue::column('website'), $keyword);
            $this->db->or_like(Enquiry::column('description'), $keyword);
            $this->db->or_like(Enquiry::column('eventDate'), $keyword);
            $this->db->or_like(Enquiry::column('eventTime'), $keyword);
            $this->db->or_like(Enquiry_Duration::column('desc'), $keyword);
            $this->db->or_like(Enquiry::column('tourDate'), $keyword);
            $this->db->or_like(Enquiry::column('message'), $keyword);
            $this->db->or_like(Enquiry::column('deskCount'), $keyword);
            $this->db->or_like(Enquiry::column('reservation_id'), $keyword);
            $this->db->close_group_like();
        }
    }

    private function _find_status_where($statusStr)
    {
        if ($statusStr == Enquiry_Status::PENDINGURL)
        {
            $this->db->where(Enquiry::column('status'), Enquiry_Status::PENDING);
        }
        elseif ($statusStr == Enquiry_Status::WONURL)
        {
            $this->db->where(Enquiry::column('status'), Enquiry_Status::WON);
        }
        elseif ($statusStr == Enquiry_Status::LOSTURL)
        {
            $this->db->where(Enquiry::column('status'), Enquiry_Status::LOST);
        }
        elseif ($statusStr == Enquiry_Status::ALTERNATIVEURL)
        {
            $this->db->where(Enquiry::column('status'), Enquiry_Status::ALTERNATIVE);
        }
        elseif ($statusStr == Enquiry_Status::OFFERURL)
        {
            $this->db->where(Enquiry::column('status'), Enquiry_Status::OFFER);
        }
        elseif ($statusStr == Enquiry_Status::VIEWINGURL)
        {
            $this->db->where(Enquiry::column('status'), Enquiry_Status::VIEWING);
        }
        elseif ($statusStr == Enquiry_Status::SALVAGEURL)
        {
            $this->db->where(Enquiry::column('status'), Enquiry_Status::SALVAGE);
        }
    }

    public function get_past_pending_enquiry_collection()
    {
        return new Enquiry___Collection($this->_get_past_pending_enquiry_collection());
    }

    private function _get_past_pending_enquiry_collection()
    {
        $this->db->where(Enquiry::column('status'), Enquiry_Status::PENDING);
        $this->db->where(Enquiry::column('eventDate') . ' <= now()');
        return $this->_query_init_and_run(false);
    }
}