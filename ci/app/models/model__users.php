<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__users extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(User::class);
        parent::__construct();
    }

    protected function _post_update($user)
    {
        if ($user->has_new_email())
        {
            $modelUserInfoHistory = Model__user_info_history::class;
            $this->load->model($modelUserInfoHistory);
            $this->$modelUserInfoHistory->insert_update($user->get('info_history'));
        }
    }

    protected function _pre_insert($object)
    {
        srand((double) microtime() * 1000000);
        $object->set('unsubscribe_token', md5(uniqid(rand(), true)));
    }

    private function _add_business_user_check()
    {
        $this->db->allow_join_disabled();
        $this->db->advanced_join(User::class, Runt_Business_User::class, User::id_column(false), Runt_Business_User::column('user_id', false));
        $this->db->disallow_join_disabled();
        $this->db->select_alias(Runt_Business_User::enabled_column(), User::alias('is_business_user'));
    }

    public function get_user_by_id($id, $withBusinessUserCheck = false)
    {
        return new User($this->_get_user_by_id($id, $withBusinessUserCheck));
    }

    private function _get_user_by_id($id, $withBusinessUserCheck)
    {
        if ($withBusinessUserCheck)
        {
            $this->_add_business_user_check();
        }
        $this->db->where(User::id_column(), $id);
        return $this->_query_launch();
    }

    public function get_user_by_email($email, $withBusinessUserCheck = false)
    {
        return new User($this->_get_user_by_email($email, $withBusinessUserCheck));
    }

    private function _get_user_by_email($email, $withBusinessUserCheck)
    {
        if ($withBusinessUserCheck)
        {
            $this->_add_business_user_check();
        }
        $this->db->where('LOWER(' . User::column('email') . ')', strtolower($email));
        return $this->_query_launch();
    }

    public function check_for_existing_user_by_email($email, $user_id)
    {
        return new User($this->_check_for_existing_user_by_email($email, $user_id));
    }

    private function _check_for_existing_user_by_email($email, $user_id)
    {
        $this->db->where('LOWER(' . User::column('email') . ')', strtolower($email));
        $this->db->where(User::id_column() . ' <>', $user_id);
        return $this->_query_launch();
    }

    public function get_user_by_token($token)
    {
        return new User($this->_get_user_by_token($token));
    }

    private function _get_user_by_token($token)
    {
        $this->db->where(User::column('token'), $token);
        return $this->_query_launch();
    }

     public function get_user_by_unsubscribe_token($token, $check_not_unsubscribed = false)
    {
        return new User($this->_get_user_by_unsubscribe_token($token, $check_not_unsubscribed));
    }

    private function _get_user_by_unsubscribe_token($token, $check_not_unsubscribed)
    {
        $this->db->where(User::column('unsubscribe_token'), $token);
        if ($check_not_unsubscribed)
        {
            $this->db->where(User::column('marketing_subscribed'), 1);
        }
        return $this->_query_launch();
    }

    public function get_user_by_remember_token($token)
    {
        return new User($this->_get_user_by_remember_token($token));
    }

    private function _get_user_by_remember_token($token)
    {
        $this->db->where(User::column('remember_me_token'), $token);
        return $this->_query_launch();
    }

    public function get_interested_parties_by_asset_id($assetId, $privilegeConst = false)
    {
        return new User___Collection($this->_get_interested_parties_by_asset_id($assetId, $privilegeConst));
    }

    private function _get_interested_parties_by_asset_id($assetId, $privilegeConst)
    {
        $this->_join_asset_privileges_with_asset_id($assetId);
        if ($privilegeConst == false)
        {
            $this->db->where(Runt_User_Asset_Privilege::column('privileges_mask') . " & " . Runt_User_Asset_Privilege::NOTIFY . "=", Runt_User_Asset_Privilege::NOTIFY, false);
        }
        else
        {
            $this->db->where(Runt_User_Asset_Privilege::column('privileges_mask') . " & " . $privilegeConst . "=", $privilegeConst);
        }
        return $this->_query_launch(false);
    }

    public function get_all_users_by_company_asset_id($assetId, $ordering = [])
    {
        return new User___Collection($this->_get_all_users_by_company_asset_id($assetId, $ordering));
    }

    private function _get_all_users_by_company_asset_id($assetId, $ordering)
    {
        $venue_alias = 'user_venues';
        $venue_privileges_alias = 'user_venue_privileges';
        $company_privileges_alias = 'user_company_privileges';
        $this->db->advanced_join(User::class, Runt_User_Asset_Privilege::class, User::id_column(false), Runt_User_Asset_Privilege::column('user_id', false), "INNER");
        $this->db->advanced_join(Runt_User_Asset_Privilege::class, Venue::class, Runt_User_Asset_Privilege::column('asset_id', false), Venue::asset_id_column(false), "INNER");
        $this->db->advanced_join(Venue::class, Company::class, Venue::column('company_id', false), Company::id_column(false), "INNER");
        $this->db->advanced_join(Company::class, Venue::class, Company::id_column(false), Venue::column('company_id', false), "INNER", null, $venue_alias);
        $this->db->join(Runt_User_Asset_Privilege::tableName() . " AS " . $venue_privileges_alias, Venue::asset_id_column(false, $venue_alias) . "=" . Runt_User_Asset_Privilege::column('asset_id', false, $venue_privileges_alias) . " AND " . User::id_column() . "=" . Runt_User_Asset_Privilege::column('user_id', false, $venue_privileges_alias), "INNER");
        $this->db->join(Runt_User_Asset_Privilege::tableName() . " AS " . $company_privileges_alias, Company::asset_id_column() . "=" . Runt_User_Asset_Privilege::column('asset_id', false, $company_privileges_alias) . " AND " . User::id_column() . "=" . Runt_User_Asset_Privilege::column('user_id', false, $company_privileges_alias), "LEFT");
        $this->_select_sub_collection_alias(Venue::column('name', false, $venue_alias), 'venue_privileges', User::alias('venue_name'));
        $this->_select_sub_collection(Venue::class, 'venue_privileges', $venue_alias);
        $this->_set_sub_collection_ordering(Venue::column('name', false, $venue_alias), 'venue_privileges', 'ASC');
        $this->db->select_alias(Runt_User_Asset_Privilege::column('privileges_mask', false, $company_privileges_alias), User::alias('company_privilege'));
        $this->db->where(Company::asset_id_column(), $assetId);
        if ($ordering != null)
        {
            $this->db->order_by(User::sort_by_token($ordering['field']), ((!isset($ordering['direction'])?'ASC':$ordering['direction'])));
        }
        else
        {
            $this->db->order_by(Profile::column('first_name'), 'ASC');
            $this->db->order_by(Profile::column('last_name'), 'ASC');
        }
        $this->db->group_by(User::id_column());
        return $this->_query_launch(false);
    }

    public function get_all_users_by_venue_asset_id($assetId, $ordering = [])
    {
        return new User___Collection($this->_get_all_users_by_venue_asset_id($assetId, $ordering));
    }

    private function _get_all_users_by_venue_asset_id($assetId, $ordering)
    {
        $venue_alias = 'user_venues';
        $venue_privileges_alias = 'user_venue_privileges';
        $company_privileges_alias = 'user_company_privileges';
        $this->_join_asset_privileges_with_asset_id($assetId);
        $this->db->advanced_join(Runt_User_Asset_Privilege::class, Venue::class, Runt_User_Asset_Privilege::column('asset_id', false), Venue::asset_id_column(false), "INNER");
        $this->db->advanced_join(Venue::class, Company::class, Venue::column('company_id', false), Company::id_column(false), "INNER");
        $this->db->advanced_join(Company::class, Venue::class, Company::id_column(false), Venue::column('company_id', false), "INNER", null, $venue_alias);
        $this->db->join(Runt_User_Asset_Privilege::tableName() . " AS " . $venue_privileges_alias, Venue::asset_id_column(false, $venue_alias) . "=" . Runt_User_Asset_Privilege::column('asset_id', false, $venue_privileges_alias) . " AND " . User::id_column() . "=" . Runt_User_Asset_Privilege::column('user_id', false, $venue_privileges_alias), "INNER");
        $this->db->join(Runt_User_Asset_Privilege::tableName() . " AS " . $company_privileges_alias, Company::asset_id_column() . "=" . Runt_User_Asset_Privilege::column('asset_id', false, $company_privileges_alias) . " AND " . User::id_column() . "=" . Runt_User_Asset_Privilege::column('user_id', false, $company_privileges_alias), "LEFT");
        $this->_select_sub_collection_alias(Venue::column('name', false, $venue_alias), 'venue_privileges', User::alias('venue_name'));
        $this->_select_sub_collection(Venue::class, 'venue_privileges', $venue_alias);
        $this->_set_sub_collection_ordering(Venue::column('name', false, $venue_alias), 'venue_privileges', 'ASC');
        $this->db->select_alias(Runt_User_Asset_Privilege::column('privileges_mask', false, $company_privileges_alias), User::alias('company_privilege'));
        if ($ordering != null)
        {
            $this->db->order_by(User::sort_by_token($ordering['field']), ((!isset($ordering['direction'])?'ASC':$ordering['direction'])));
        }
        else
        {
            $this->db->order_by(Profile::column('first_name'), 'ASC');
            $this->db->order_by(Profile::column('last_name'), 'ASC');
        }
        $this->db->group_by(User::id_column());
        return $this->_query_launch(false);
    }

    protected function _query_launch($justOne = true)
    {
        $this->_join_profile();
        return $this->_query_init_and_run($justOne);
    }

    private function _join_profile()
    {
        $this->db->advanced_join(User::class, Profile::class, User::id_column(false), Profile::column('user_id', false));
        $this->db->select_alias(Profile::id_column(), User::alias('profile_id'));
        $this->db->select_alias(Profile::column('first_name'), User::alias('first_name'));
        $this->db->select_alias(Profile::column('last_name'), User::alias('last_name'));
        $this->db->select_alias(Profile::column('phone_number'), User::alias('phone_number'));
        $this->db->select_alias(Profile::column('phone_number_search'), User::alias('phone_number_search'));
    }

    private function _join_asset_privileges_with_asset_id($assetId)
    {
        $this->db->advanced_join(User::class, Runt_User_Asset_Privilege::class, User::id_column(false), Runt_User_Asset_Privilege::column('user_id', false), "INNER");
        $this->db->where(Runt_User_Asset_Privilege::column('asset_id'), $assetId);
    }

    public function get_create_hubspot_id(User $user)
    {
        // If id set, return
        // turn this off to keep id fresh???
        $retVal = '';
        $hubspot_id = intval($user->get('hubspot_id'));
        if ($hubspot_id != null && $hubspot_id > 0)
        {
            $retVal = $hubspot_id;
        }
        else
        {
            try
            {
                $modelProfiles = Model__profiles::class;
                $this->load->model($modelProfiles);
                $profile = $this->$modelProfiles->get_profile_by_user_id($user->get('id'));
                $this->load->library('HubspotAPI');
                // Create user on hubspot
                $result = $this->hubspotapi->create_or_update_user(strtolower($user->get('email')), [
                    (object) [
                        'property' => 'firstname',
                        'value' => $profile->get('first_name')
                    ],
                    (object) [
                        'property' => 'lastname',
                        'value' => $profile->get('last_name')
                    ],
                    (object) [
                        'property' => 'phone',
                        'value' => $profile->get('phone_number')
                    ],
                    (object) [
                        'property' => 'neverbouncevalidationresult',
                        'value' => emailStatusToHubspot($user->get('email_status'))
                    ],
//                    (object) [
//                        'property' => 'type_client',
//                        'value' => $user->find_hubspot_type()
//                    ]
                ]);
                if (!isset($result['status']) || (isset($result['status']) && $result['status'] == 409))
                {
                    error_log("Unable to add user to Hubspot: " . json_encode($result), 0);
                }
                elseif (isset($result['result']->vid))
                {
                    // Save hubspot id
                    $retVal = intval($result['result']->vid);
                    $user->set('hubspot_id', $retVal);
                    $this->insert_update($user);
                }
            }
            catch (Exception $exc)
            {
                error_log("Unable connect to hubspot: " . $exc->getMessage());
            }
        }
        return $retVal;
    }

    public function create_new_user_with_profile(User $protoUser, Profile $protoProfile, $plainTextPassword = null)
    {
        $modelProfiles = Model__profiles::class;
        $this->load->model($modelProfiles);
        $protoUser->set('created', local_to_gmt());
        $protoUser->set('coupon_code', rand(10000, 99999));
        $protoUser->set('ref_id', md5($protoUser->get('email')));
        $protoUser->set('username', $protoProfile->get('first_name'));
        $ci = &get_instance();
        if (defined('ENVIRONMENT') && ENVIRONMENT == 'production')
        {
            $protoUser->set_last_ip($ci->input->ip_address());
        }
        else
        {
            $protoUser->set_last_ip('127.0.0.1');
        }
        $protoUser->set_password($plainTextPassword);
        if ($plainTextPassword === null)
        {
            $protoUser->generate_token();
        }
        $user = $this->insert_update($protoUser);
        if (!$user->is_null_object())
        {
            $protoProfile->set('user_id', $protoUser->get('id'));
            $profile = $this->$modelProfiles->insert_update($protoProfile);
            if ($profile->is_null_object())
            {
                $this->delete($protoUser);
                $user = new User();
            }
            else
            {
                // Get user and associate hubspot id
                $user = $this->get_user_by_id($protoUser->get('id'));
                $this->get_create_hubspot_id($user);
            }
        }
        return $user;
    }

    public function get_all_users($today = false)
    {
        $this->db->count_rows(true);
        if ($today)
        {
            $todayDate = new DateTime();
            $tomorrowDate = new DateTime();
            $tomorrowDate->add(new DateInterval('P1D'));
            $this->db->where('FROM_UNIXTIME(' . User::column('created') . ') >=', $todayDate->format("Y-m-d")); //hack while users created field is still unix time
            $this->db->where('FROM_UNIXTIME(' . User::column('created') . ') <=', $tomorrowDate->format("Y-m-d"));
        }
        return $this->_query_launch(false);
    }

    public function get_all_users_details_collection($limit, $offset, $sort_by, $sort_order, $keyword = '')
    {
        $this->db->count_rows(true);
        $this->db->limit($limit, $offset);
        $this->db->order_by(User::sort_by_token($sort_by), $sort_order);
        if ($keyword != '')
        {
            $this->db->start_group_like(User::id_column(), $keyword);
            $this->db->or_like(Profile::column('first_name'), $keyword);
            $this->db->or_like(Profile::column('last_name'), $keyword);
            $this->db->or_like("CONCAT(" . Profile::column('first_name') . ", ' ', " . Profile::column('last_name') . ")", $keyword);
            $this->db->or_like("LOWER(" . User::column('email') . ")", strtolower($keyword));
            $this->db->or_like("REPLACE(LOWER(" . User::column('email') . "), '_', '\\_')", strtolower($keyword));
            $this->db->or_like(Profile::column('phone_number'), $keyword);
            $this->db->close_group_like();
        }
        return new User___Collection($this->_query_launch(false));
    }

    public function set_user_enquirer_state_by_id($user_id)
    {
        $state = $this->_check_user_has_enquiries_by_id($user_id);
        $user = $this->get_user_by_id($user_id);
        $this->_update_user_is_enquirer($user, $state);
    }

    public function set_user_enquirer_state($user)
    {
        $state = $this->_check_user_has_enquiries_by_id($user->get('id'));
        $this->_update_user_is_enquirer($user, $state);
    }

    private function _update_user_is_enquirer($user, $is_enquirer)
    {
        if ($user->get('is_enquirer') != $is_enquirer)
        {
            $this->_register_deal($user, $is_enquirer);
            $user->set('is_enquirer', $is_enquirer);
            $this->insert_update($user);
        }
    }

    private function _register_deal($user, $is_enquirer)
    {
        $this->load->helper('analytics');
        $analytics_helper = new Analytics_Helper();
        if ($is_enquirer)
        {
            $analytics_helper->register_deal_opened($user);
        }
        else
        {
            $analytics_helper->register_deal_closed($user);
        }
    }

    public function get_admin_users()
    {
        return new User___Collection($this->_get_admin_users());
    }

    private function _get_admin_users()
    {
        $this->db->where(User::column('role_id'), User::ADMINUSER);
        return $this->_query_launch(false);
    }

    public function get_autocomplete_users_details_collection($keyword = '')
    {
        return new User___Collection($this->_get_autocomplete_users_details_collection($keyword));
    }

    public function _get_autocomplete_users_details_collection($keyword)
    {
        $this->db->start_group_like(User::id_column(), $keyword);
        $this->db->or_like(Profile::column('first_name'), $keyword);
        $this->db->or_like(Profile::column('last_name'), $keyword);
        $this->db->or_like("CONCAT(LOWER(" . Profile::column('first_name') . "), ' ', LOWER(" . Profile::column('last_name') . "))", $keyword);
        $this->db->or_like("CONCAT(LOWER(" . Profile::column('first_name') . "), LOWER(" . Profile::column('last_name') . "), LOWER(" . User::column('email') . "))", strtolower(preg_replace('/[\s\+]/', '', $keyword)));
        $this->db->or_like("CONCAT(LOWER(" . Profile::column('first_name') . "), LOWER(" . Profile::column('last_name') . "), LOWER(" . User::column('email') . "), " . Profile::column('phone_number_search') . ")", strtolower(preg_replace('/[\s\+]/', '', $keyword)));
        $this->db->or_like("CONCAT(LOWER(" . Profile::column('first_name') . "), LOWER(" . Profile::column('last_name') . "), LOWER(" . User::column('email') . "), (CASE WHEN " . Profile::column('phone_number_search') . " IS NULL THEN 'null' ELSE " . Profile::column('phone_number_search') . " END))", strtolower(preg_replace('/[\s\+]/', '', $keyword)));
        $this->db->or_like("LOWER(" . User::column('email') . ")", strtolower($keyword));
        $this->db->or_like("REPLACE(LOWER(" . User::column('email') . "), '_', '\\_')", strtolower($keyword));
        $this->db->or_like(Profile::column('phone_number'), $keyword);
        $this->db->or_like(Profile::column('phone_number_search'), $keyword);
        $this->db->close_group_like();
        return $this->_query_launch(false);
    }

    private function _check_user_has_enquiries_by_id($user_id)
    {
        $has_enquiry = false;
        $modelEnquiries = Model__enquiries::class;
        $this->load->model($modelEnquiries);
        $user_enquiries = $this->$modelEnquiries->get_enquiry_collection_by_user($user_id, [Enquiry_Status::PENDING]);
        if ($user_enquiries->exists_in_db() && count($user_enquiries) > 0)
        {
            $has_enquiry = true;
        }
        return $has_enquiry;
    }

    public function get_google_user($email, $google_id)
    {
        return new User($this->_get_google_user($email, $google_id));
    }

    private function _get_google_user($email, $google_id)
    {
        $this->db->where('LOWER(' . User::column('email') . ')', strtolower($email));
        $this->db->or_where(User::column('google_id'), $google_id);
        return $this->_query_launch();
    }

    public function get_facebook_user($email, $fb_id)
    {
        return new User($this->_get_facebook_user($email, $fb_id));
    }

    private function _get_facebook_user($email, $fb_id)
    {
        $this->db->where('LOWER(' . User::column('email') . ')', strtolower($email));
        $this->db->or_where(User::column('fb_id'), $fb_id);
        return $this->_query_launch();
    }

    public function get_linkedin_user($email, $linkedin_id)
    {
        return new User($this->_get_linkedin_user($email, $linkedin_id));
    }

    private function _get_linkedin_user($email, $linkedin_id)
    {
        $this->db->where('LOWER(' . User::column('email') . ')', strtolower($email));
        $this->db->or_where(User::column('linkedin_id'), $linkedin_id);
        return $this->_query_launch();
    }
}