<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');
require_once APPPATH . 'libraries/REST_Controller.php';

class User_REST extends REST_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->helper('email_helper');
    }

    public function onboardvenueuser_put()
    {
        $userSave = false;
        $put = $this->put();
        if (!isset($put['id']))
        {
            return $this->response(null, 400);
        }
        $currentUser = $this->dx_auth->get_user_id();
        $adminuser = new User($currentUser);
        if (!$adminuser->exists() || !$this->dx_auth->is_admin())
        {
            return $this->response($this->lang->line('rest_no_user'), 405);
        }
        $user = new User();
        if (!$user->where('enabled', 1)->where('id', $put['id'])->get()->exists())
        {
            return $this->response($this->lang->line('rest_no_user'), 405);
        }
        $oldEmail = $user->email;
        if (isset($put['email']))
        {
            if ($put['email'] != $oldEmail)
            {
                $usercheck = new User();
                if ($usercheck->where('enabled', 1)->where('email', $put['email'])->get()->exists())
                {
                    return $this->response($this->lang->line('rest_user_exists'), 405);
                }
                $user->email = $put['email'];
                $userSave = true;
                $userInfoHistory = new UserInfoHistory();
                $userInfoHistory->user_id = $put['id'];
                $userInfoHistory->email = $put['email'];
                $userInfoHistory->dateTime = date("Y-m-d H:i:s");
                if (!$userInfoHistory->save())
                {
                    return $this->response($userInfoHistory->error->all, 409);
                }
            }
        }
        if (isset($put['Fname']) && isset($put['Lname']) && isset($put['phnum']))
        {
            if (!isset($put['email']))
            {
                $email = $user->email;
            }
            else
            {
                $email = $put['email'];
            }
            $hubspot_id = $user->hubspot_id;
            if ($hubspot_id != null && $hubspot_id > 0)
            {
                try
                {
                    $this->load->library('HubspotAPI');
                    $result = $this->hubspotapi->update_user($hubspot_id, [
                        (object) ['property' => 'email', 'value' => $email],
                        (object) ['property' => 'firstname', 'value' => $put['Fname']],
                        (object) ['property' => 'lastname', 'value' => $put['Lname']],
                        (object) ['property' => 'phone', 'value' => $put['phnum']]
                    ]);
                    if (isset($result->status) && $result->status == "error")
                    {
                        error_log("Unable to update user account on Hubspot: " . json_encode($result), 0);
                    }
                }
                catch (Exception $exc)
                {
                    error_log("Unable to connect to Hubspot: " . $exc->getMessage());
                }
            }
            $profile = new Profile();
            if (!$profile->where('enabled', 1)->where('user_id', $put['id'])->get()->exists())
            {
                return $this->response($this->lang->line('rest_no_profile'), 405);
            }
            $profile->Fname = $put['Fname'];
            $profile->Lname = $put['Lname'];
            $profile->phnum = $put['phnum'];
            if (!$profile->save())
            {
                return $this->response($profile->error->all, 409);
            }
        }
        if (isset($put['password']))
        {
            if (!isset($put['password_confirmation']) || (isset($put['password_confirmation']) && !($put['password'] === $put['password_confirmation'])))
            {
                return $this->response($this->lang->line('rest_password_no_match'), 405);
            }
            if (strlen($put['password']) < 8)
            {
                return $this->response($this->lang->line('rest_password_not_strong'), 405);
            }
            $CI = &get_instance();
            $salt = $CI->security_auth->generateSalt();
            $passwordHash = $CI->security_auth->crypt($put['password'], $salt);
            $user->salt = $salt;
            $user->password = $passwordHash;
            $userSave = true;
        }
        if ($userSave)
        {
            if (!$user->save())
            {
                return $this->response($user->error->all, 409);
            }
        }
        return $this->response([], 200);
    }

    function index_get()
    {
        $get = $this->get();
        if (!isset($get['id']) && !isset($get['remember_me_token']))
        {
            return $this->response('No user id or token provided', 400);
        }
        $user = new User();
        if (isset($get['id']))
        {
            if (!$user->where('id', $get['id'])->get()->exists())
            {
                return $this->response('No user with that id exists', 400);
            }
        }
        elseif (isset($get['remember_me_token']))
        {
            if ($user->where('remember_me_token', $get['remember_me_token'])->get()->exists())
            {
                return $this->response($user->all_to_array(['email']), 200);
            }
        }
        return $this->response($user->all_to_array(['email']), 200);
    }

    public function remember_post()
    {
        $post = $this->post();
        if (!isset($post['token']) || $post['token'] == '')
        {
            return $this->response('No token provided', 400);
        }
        $modelUsers = Model__users::class;
        $this->load->model($modelUsers);
        $user = $this->$modelUsers->get_user_by_remember_token($post['token']);
        if (!$user->exists_in_db())
        {
            return $this->response('No user with that token exists', 400);
        }
        $retUser = $user->get_as_ajax_response('No user with that token exists', false, [$user->get('email')]);
        return $this->response($retUser, 200);
    }

    public function index_post()
    {
        $post = $this->post();
        if (isset($post['id']) || !isset($post['email']) || !isset($post['first_name']) || !isset($post['last_name']) || !isset($post['phone_number']))
        {
            return $this->response(null, 400);
        }
        $modelUsers = Model__users::class;
        $this->load->model($modelUsers);
        $previousUser = $this->$modelUsers->get_user_by_email($post['email']);
        if ($previousUser->exists_in_db())
        {
            return $this->response('A user already exists with that email address', 409);
        }
        $newUser = new User();
        $newUser->set('email', strtolower($post['email']));
        if (isset($post['never_bounce_status']) && $post['never_bounce_status'] != '')
        {
            $newUser->set('email_status', neverBounceStatusToEmailStatus($post['never_bounce_status']));
        }
        $plainTextPassword = null;
        if (isset($post['password']) && isset($post['confirm_password']) && $post['password'] === $post['confirm_password'])
        {
            $plainTextPassword = $post['password'];
        }
        $newProfile = new Profile();
        $newProfile->set('first_name', trim($post['first_name']));
        $newProfile->set('last_name', trim($post['last_name']));
        $newProfile->set('phone_number', $post['phone_number']);
        $newProfile->set('phone_number_search', preg_replace('/[\s\+]/', '', $post['phone_number']));
        $protouser = $this->$modelUsers->create_new_user_with_profile($newUser, $newProfile, $plainTextPassword);
        $ret_user = [
            'user_id' => $protouser->get_id(),
            'Fname' => $protouser->get('first_name'),
            'Lname' => $protouser->get('last_name'),
            'phnum' => $protouser->get('phone_number'),
            'phnum_search' => $protouser->get('phone_number_search'),
            'user_email' => $protouser->get('email'),
            'user_token' => $protouser->get('token')
        ];
        $this->load->helper('tracking');
        $tracking_helper = new Tracking_Helper();
        if (isset($post['token_id']) && $post['token_id'] !== '')
        {
            $trackCook = $tracking_helper->get_cookie_by_token_id($post['token_id']);
        }
        elseif (isset($post['token']))
        {
            $trackCook = $tracking_helper->get_cookie_by_token($post['token']);
        }
        elseif (!$this->dx_auth->is_spoof_mode())
        {
            $trackCook = $tracking_helper->get_cookie();
        }
        else
        {
            $trackCook = $tracking_helper->get_cookie(true);
        }
        if ($trackCook->exists_in_db())
        {
            $cookie_id = $trackCook->get('id');
            if ($tracking_helper->connect_user_to_specific_cookie($cookie_id, $protouser->get_id()))
            {
                $ret_user['token_id'] = $cookie_id;
            }
        }
        return $this->response([$ret_user], 201);
    }

    public function index_put()
    {
        $put = $this->put();
        if ((!isset($put['id']) && !isset($put['email'])) || !isset($put['first_name']) || !isset($put['last_name']) || !isset($put['phone_number']))
        {
            return $this->response(null, 400);
        }
        $modelUsers = Model__users::class;
        $this->load->model($modelUsers);
        $existing_email = $this->$modelUsers->check_for_existing_user_by_email($put['email'], $put['id']);
        if (isset($put['email']) && $existing_email->exists_in_db())
        {
            return $this->response('A user already exists with that email', 400);
        }
        if ($this->dx_auth->get_user_id() !== $put['id'])
        {
            return $this->response("Not authorized to update user information", 401);
        }
        $user = $this->$modelUsers->get_user_by_id($put['id']);
        if (!$user->exists_in_db())
        {
            return $this->response($this->lang->line('rest_no_user'), 405);
        }
        $user_update = new User_Info_Update();
        $user_update->set('id', $user->get_id());
        $user_update->set('first_name', trim($put['first_name']));
        $user_update->set('last_name', trim($put['last_name']));
        $user_update->set('email', strtolower($put['email']));
        $user_update->set('phone_number', $put['phone_number']);
        if (isset($put['never_bounce_status']))
        {
            $user_update->set('never_bounce_status', $put['never_bounce_status']);
        }
        $modelUserInfoUpdate = Model__user_info_update::class;
        $this->load->model($modelUserInfoUpdate);
        $this->$modelUserInfoUpdate->insert_update($user_update);
        $return_user = $this->$modelUsers->get_user_by_id($user->get_id());
        $ret_user = [
            'id' => $return_user->get_id(),
            'first_name' => $return_user->get('first_name'),
            'last_name' => $return_user->get('last_name'),
            'phone_number' => $return_user->get('phone_number'),
            'email' => $return_user->get('email'),
            'is_admin' => $this->dx_auth->is_admin() || $this->dx_auth->is_spoof_mode(),
            'is_logged_in' => $this->dx_auth->is_logged_in()
        ];
        return $this->response($ret_user, 200);
    }

    public function adminuserupdate_put()
    {
        if (!$this->dx_auth->is_admin())
        {
            return $this->response($this->lang->line('rest_wrong_perm'), 403);
        }
        $put = $this->put();
        if ((!isset($put['id']) && !isset($put['email'])) || !isset($put['first_name']) || !isset($put['last_name']) || !isset($put['phone_number']))
        {
            return $this->response('Missing user info', 405);
        }
        $modelUsers = Model__users::class;
        $this->load->model($modelUsers);
        $existing_email = $this->$modelUsers->check_for_existing_user_by_email($put['email'], $put['id']);
        if (isset($put['email']) && $existing_email->exists_in_db())
        {
            return $this->response('A user already exists with that email', 405);
        }
        $user = $this->$modelUsers->get_user_by_id($put['id']);
        if (!$user->exists_in_db())
        {
            return $this->response($this->lang->line('rest_no_user'), 405);
        }
        $user_update = new User_Info_Update();
        $user_update->set('id', $user->get_id());
        $user_update->set('first_name', trim($put['first_name']));
        $user_update->set('last_name', trim($put['last_name']));
        $user_update->set('email', strtolower($put['email']));
        $user_update->set('phone_number', $put['phone_number']);
        if (isset($put['never_bounce_status']))
        {
            $user_update->set('never_bounce_status', $put['never_bounce_status']);
        }
        $modelUserInfoUpdate = Model__user_info_update::class;
        $this->load->model($modelUserInfoUpdate);
        $this->$modelUserInfoUpdate->insert_update($user_update);
        $return_user = $this->$modelUsers->get_user_by_id($user->get_id());
        $ret_user = [
            'user_id' => $return_user->get_id(),
            'Fname' => $return_user->get('first_name'),
            'Lname' => $return_user->get('last_name'),
            'phone_number' => $return_user->get('phone_number'),
            'phnum_search' => $return_user->get('phone_number_search'),
            'user_email' => $return_user->get('email'),
        ];
        if (isset($put['token_id']))
        {
            $this->load->helper('tracking');
            $tracking_helper = new Tracking_Helper();
            $token_id = $put['token_id'];
            if (!$tracking_helper->connect_user_to_specific_cookie($token_id, $return_user->get_id()))
            {
                return $this->response('User updated, but that token id does not exist in our records. Please check and try again.', 400);
            }
            else
            {
                $this->load->helper('analytics');
                $analytics_helper = new Analytics_Helper();
                $analytics_helper->register_tracking_event('ADMIN_INTERACTION', [$this->dx_auth->get_user_id()]);
                $ret_user['token_id'] = $token_id;
            }
        }
        return $this->response([$ret_user], 200);
    }

    public function userautocomplete_get()
    {
        if (!$this->dx_auth->is_admin())
        {
            return $this->response($this->lang->line('rest_wrong_perm'), 403);
        }
        $get = $this->get();
        if (!isset($get['query']))
        {
            return $this->response('No query information provided', 400);
        }
        $modelUsers = Model__users::class;
        $this->load->model($modelUsers);
        $users = $this->$modelUsers->get_autocomplete_users_details_collection($get['query']);
        $ret_users = [];
        foreach ($users->object() as $user)
        {
            $ret_users[] = [
                'user_id' => $user->get_id(),
                'Fname' => $user->get('first_name'),
                'Lname' => $user->get('last_name'),
                'phnum_search' => $user->get('phone_number'),
                'user_email' => $user->get('email')
            ];
        }
        return $this->response($ret_users, 200);
    }

    public function admin_get()
    {
        if (!$this->dx_auth->is_admin())
        {
            return $this->response($this->lang->line('rest_wrong_perm'), 403);
        }
        $modelUsers = Model__users::class;
        $this->load->model($modelUsers);
        $admins = $this->$modelUsers->get_admin_users();
        foreach ($admins->object() as $admin)
        {
            $ret_array[] = [
                'id' => $admin->get_id(),
                'first_name' => $admin->get('first_name')
            ];
        }
        return $this->response($ret_array, 200);
    }

    public function discount_get()
    {
        if (!$this->dx_auth->is_logged_in())
        {
            return $this->response($this->lang->line('rest_wrong_perm'), 403);
        }
        $get = $this->get();
        if (!isset($get['asset_id']) || !isset($get['start']) || !isset($get['end']))
        {
            return $this->response(null, 400);
        }
        $modelUserAssetMembers = Model__user_asset_members::class;
        $this->load->model($modelUserAssetMembers);
        $asset_member = $this->$modelUserAssetMembers->get_user_by_asset_and_id($get['asset_id'], $this->dx_auth->get_user_id());
        if (!$asset_member->exists_in_db())
        {
            return $this->response($this->lang->line('rest_no_user'), 405);
        }
        $modelOpeningHours = Model__opening_hours::class;
        $this->load->model($modelOpeningHours);
        if (isset($get['slots']) && $get['slots'] != '')
        {
            $slot_collection = new Slot___Collection();
            $slot_collection->populate_from_bindings($get['slots']);
            $period = $slot_collection->as_booked_period($get['start'], $get['asset_id']);
            $openingHours = $this->$modelOpeningHours->get_daily_availability($get['asset_id'], $get['start']);
            $maskCollection = new Available_Period___Collection();
            $maskCollection->add_object($period);
            $maskCollection->convert_to_daily_mask();
            $openingHours->push_periods($maskCollection);
            $openingHours->filter_on_availability();
            $asset_member->set('new_price', $openingHours->get_total_price());
        }
        else
        {
            $openingHours = $this->$modelOpeningHours->get_weekly_opening_object_collection_by_asset_id($get['asset_id']);
            $bookedPeriods = $openingHours->as_booked_period($get['start'], $get['end'], $get['asset_id']);
            $modelDailyPrice = Model__daily_price::class;
            $this->load->model($modelDailyPrice);
            $asset_member->set('new_price', round(($this->$modelDailyPrice->get_price_by_asset_id($get['asset_id']) * $bookedPeriods->wrangle('duration')->wrangle('rounded_days')->number()) * (100 - $asset_member->get('discount'))/100, 2));
        }
        return $this->response($asset_member->get_as_ajax_response('No membership discount found for this room.'), 200);
    }

    public function updatepassword_post()
    {
        $post = $this->post();
        if (!isset($post['token']))
        {
            return $this->response('No valid token provided', 403);
        }
        if (!isset($post['user_id']))
        {
            return $this->response('No User ID provided', 400);
        }
        if (!isset($post['password']))
        {
            return $this->response('No password provided', 400);
        }
        if (!isset($post['password_confirmation']))
        {
            return $this->response('No password confirmation provided', 400);
        }
        if ($post['password'] !== $post['password_confirmation'])
        {
            return $this->response('Password and password confirmation do not match', 400);
        }
        if ($this->dx_auth->get_user_id() !== $post['user_id'])
        {
            return $this->response("Not authorized to update user information", 401);
        }
        $modelUsers = Model__users::class;
        $this->load->model($modelUsers);
        $user = $this->$modelUsers->get_user_by_id($post['user_id']);
        if (!$user->exists_in_db())
        {
            return $this->response('No user with that the provided User ID exists', 400);
        }
        $userPassword = $user->set_password($post['password']);
        if (isset($userPassword))
        {
            $this->$modelUsers->insert_update($user);
        }
        return $this->response('Success', 200);
    }

    public function userlanguage_put()
    {
        $put = $this->put();
        if (!isset($put['locale_code']))
        {
            return $this->response(null, 400);
        }
        if (isset(config_item('supported_locales')[$put['locale_code']]))
        {
            if (isset(config_item('supported_cctlds')[config_item('supported_locales')[$put['locale_code']]]))
            {
                $language = config_item('supported_cctlds')[config_item('supported_locales')[$put['locale_code']]]['lang'];
                $locale = config_item('supported_cctlds')[config_item('supported_locales')[$put['locale_code']]]['locale'];
                $this->session->set_userdata('user_lang', $language);
                $this->session->set_userdata('locale', $locale);
                $modelUsers = Model__users::class;
                $this->load->model($modelUsers);
                $user = $this->$modelUsers->get_user_by_id($this->dx_auth->get_user_id());
                if ($this->dx_auth->is_logged_in() && $user->exists_in_db())
                {
                    $user->set('language_pref', $language);
                    $user->set('locale_pref', $locale);
                    $this->$modelUsers->insert_update($user);
                }
                return $this->response(config_item('supported_locales')[$put['locale_code']], 200);
            }
            return $this->response('Unknown code', 405);
        }
        return $this->response('Unknown code', 405);
    }

    public function verify_google_id_post()
    {
        $post = $this->post();
        if (!isset($post['id_token']))
        {
            return $this->response('No id token provided', 400);
        }
        $url = 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' . $post['id_token'];
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        $result = curl_exec($ch);
        curl_close($ch);
        if ($result)
        {
            $google_data = json_decode($result);
            $pos = strpos($google_data->aud, getenv('GOOGLE_CLIENT_ID'));
            if ($pos === false)
            {
                return $this->response('Validation failed', 400);
            }
            else
            {
                $modelUsers = Model__users::class;
                $this->load->model($modelUsers);
                $user = $this->$modelUsers->get_google_user($google_data->email, $google_data->sub);
                if ($user->exists_in_db())
                {
                    return $this->_login_with_google($user, $google_data, $modelUsers);
                }
                return $this->_signup_with_google($google_data, $modelUsers);
            }
        }
        else
        {
            return $this->response('Invalid id token', 400);
        }
    }

    private function _login_with_google($user, $google_data, $modelUsers)
    {
        if (!$user->data_not_empty('google_id') && $user->get('google_id') !== $google_data->sub)
        {
            $user->set('google_id', $google_data->sub);
            $this->$modelUsers->insert_update($user);
        }
        $this->dx_auth->login($user->get('email'), null, false, false, true);
        if ($this->dx_auth->is_logged_in())
        {
            return $this->response(['success' => true], 200);
        }
        return $this->response(['success' => false], 401);
    }

    private function _signup_with_google($google_data, $modelUsers)
    {
        $user = $this->$modelUsers->get_user_by_email($google_data->email);
        if ($user->exists_in_db())
        {
            return $this->response('A user already exists with that email address', 400);
        }
        $user->set('google_id', $google_data->sub);
        $user->set('email', strtolower($google_data->email));
        $user->set('email_status', User::EMAILVALID);
        $newProfile = new Profile();
        $newProfile->set('first_name', trim($google_data->given_name));
        if (isset($google_data->family_name) && $google_data->family_name != '')
        {
            $newProfile->set('last_name', trim($google_data->family_name));
        }
        $newUser = $this->$modelUsers->create_new_user_with_profile($user, $newProfile);
        if ($newUser->exists_in_db() && $this->dx_auth->login($user->get('email'), null, false, false, true))
        {
            $modelComms = Model__comms::class;
            $this->load->model($modelComms);
            $this->$modelComms->signup_token($user);
        }
        $this->load->helper('tracking');
        $tracking_helper = new Tracking_Helper();
        $tracking_helper->connect_user_to_current_cookie_and_return_id($user->get_id());
        return $this->_login_with_google($user, $google_data, $modelUsers);
    }

    public function verify_facebook_access_token_post()
    {
        $post = $this->post();
        if (!isset($post['accessToken']))
        {
            return $this->response('No access token provided', 400);
        }
        $this->load->library('FacebookAPI');
        $data = $this->_convert_graph_object_to_stdClass($this->facebookapi->get_user_profile($post['accessToken']));
        $modelUsers = Model__users::class;
        $this->load->model($modelUsers);
        $user = $this->$modelUsers->get_facebook_user($data->email, $data->fb_id);
        if ($user->exists_in_db())
        {
            return $this->_login_with_facebook($user, $data, $modelUsers);
        }
        return $this->_signup_with_facebook($data, $modelUsers);
    }

    private function _login_with_facebook($user, $data, $modelUsers)
    {
        if ($user->get('fb_id') !== $data->fb_id)
        {
            $user->set('fb_id', $data->fb_id);
            $this->$modelUsers->insert_update($user);
        }
        $this->dx_auth->login($user->get('email'), null, false, false, true);
        if ($this->dx_auth->is_logged_in())
        {
            return $this->response(['success' => true], 200);
        }
        return $this->response(['success' => false], 401);
    }

    private function _signup_with_facebook($data, $modelUsers)
    {
        $user = $this->$modelUsers->get_user_by_email($data->email);
        if ($user->exists_in_db())
        {
            return $this->response('A user already exists with that email address', 400);
        }
        $user->set('fb_id', $data->fb_id);
        $signup_response = $this->_social_signup($user, $data, $modelUsers);
        if ($signup_response['status'])
        {
            return $this->_login_with_facebook($signup_response['user'], $signup_response['data'], $modelUsers);
        }
        return $this->response('Signup failed for some reason', 401);
    }

    private function _convert_graph_object_to_stdClass($fb_user_profile)
    {
        $data = new stdClass();
        $data->fb_id = $fb_user_profile->getProperty('id');
        $data->email = strtolower($fb_user_profile->getProperty('email'));
        $data->first_name = trim($fb_user_profile->getProperty('first_name'));
        $data->last_name = trim($fb_user_profile->getProperty('last_name'));
        return $data;
    }

    public function verify_linkedin_access_token_post()
    {
        $post = $this->post();
        if (!isset($post['response']))
        {
            return $this->response('No data provided', 400);
        }
        $this->load->library('LinkedInAPI');
        $data = $this->_convert_linkedin_data($post['response']);
        $modelUsers = Model__users::class;
        $this->load->model($modelUsers);
        $user = $this->$modelUsers->get_linkedin_user($post['response']['emailAddress'], $post['response']['id']);
        if ($user->exists_in_db())
        {
            return $this->_login_with_linkedin($user, $data, $modelUsers);
        }
        return $this->_signup_with_linkedin($data, $modelUsers);
    }

    private function _convert_linkedin_data($linkedin_profile)
    {
        $data = new stdClass();
        $data->linkedin_id = $linkedin_profile['id'];
        $data->email = strtolower($linkedin_profile['emailAddress']);
        $data->first_name = trim($linkedin_profile['firstName']);
        $data->last_name = trim($linkedin_profile['lastName']);
        return $data;
    }

    private function _login_with_linkedin($user, $data, $modelUsers)
    {
        if ($user->get('linkedin_id') !== $data->linkedin_id)
        {
            $user->set('linkedin_id', $data->linkedin_id);
            $this->$modelUsers->insert_update($user);
        }
        $this->dx_auth->login($user->get('email'), null, false, false, true);
        if ($this->dx_auth->is_logged_in())
        {
            return $this->response(['success' => true], 200);
        }
        return $this->response(['success' => false], 401);
    }

    private function _signup_with_linkedin($data, $modelUsers)
    {
        $user = $this->$modelUsers->get_user_by_email($data->email);
        if ($user->exists_in_db())
        {
            return $this->response('A user already exists with that email address', 400);
        }
        $user->set('linkedin_id', $data->linkedin_id);
        $signup_response = $this->_social_signup($user, $data, $modelUsers);
        if ($signup_response['status'])
        {
            return $this->_login_with_linkedin($signup_response['user'], $signup_response['data'], $modelUsers);
        }
        return $this->response('Signup failed for some reason', 401);
    }

    private function _social_signup($user, $data, $modelUsers)
    {
        $user->set('email', strtolower($data->email));
        $user->set('email_status', User::EMAILVALID);
        $newProfile = new Profile();
        $newProfile->set('first_name', trim($data->first_name));
        $newProfile->set('last_name', trim($data->last_name));
        $newUser = $this->$modelUsers->create_new_user_with_profile($user, $newProfile);
        if ($newUser->exists_in_db() && $this->dx_auth->login($user->get('email'), null, false, false, true))
        {
            $modelComms = Model__comms::class;
            $this->load->model($modelComms);
            $this->$modelComms->signup_token($user);
        }
        $this->load->helper('tracking');
        $tracking_helper = new Tracking_Helper();
        $tracking_helper->connect_user_to_current_cookie_and_return_id($user->get_id());
        return [
            'status' => true,
            'user' => $user,
            'data' => $data
        ];
    }

    public function adduser_post()
    {
        $post = $this->post();
        if (isset($post['id']) || !isset($post['email']) || !isset($post['first_name']) || !isset($post['last_name']) || !isset($post['phone_number']))
        {
            return $this->response(null, 400);
        }
        $modelUsers = Model__users::class;
        $this->load->model($modelUsers);
        $user = $this->$modelUsers->get_user_by_email($post['email'], true);
        if (!$user->exists_in_db())
        {
            $newUser = new User();
            $newUser->set('email', strtolower($post['email']));
            if (isset($post['never_bounce_status']))
            {
                $newUser->set('email_status', neverBounceStatusToEmailStatus($post['never_bounce_status']));
            }
            $newProfile = new Profile();
            $newProfile->set('first_name', trim($post['first_name']));
            $newProfile->set('last_name', trim($post['last_name']));
            $newProfile->set('phone_number', $post['phone_number']);
            $newProfile->set('phone_number_search', preg_replace('/[\s\+]/', '', $post['phone_number']));
            $user = $this->$modelUsers->create_new_user_with_profile($newUser, $newProfile);
            if ($user->exists_in_db() && $this->dx_auth->login($user->get('email'), null, false, false, true))
            {
                $modelComms = Model__comms::class;
                $this->load->model($modelComms);
                $this->$modelComms->signup_token($user);
            }
        }
        $this->load->helper('tracking');
        $tracking_helper = new Tracking_Helper();
        $tracking_helper->connect_user_to_current_cookie_and_return_id($user->get_id());
        return $this->response($user->get_as_array(), 200);
    }

    public function subscribe_put()
    {
        $put = $this->put();
        if (!isset($put['id']))
        {
            return $this->response(null, 400);
        }
        if ($this->dx_auth->get_user_id() !== $put['id'])
        {
            return $this->response("Not authorized to update user information", 401);
        }
        $modelUsers = Model__users::class;
        $this->load->model($modelUsers);
        $user = $this->$modelUsers->get_user_by_id($put['id']);
        if (!$user->exists_in_db())
        {
            return $this->response($this->lang->line('rest_no_user'), 405);
        }
        if (isset($put['marketing_subscribed']))
        {
            $user->set('marketing_subscribed', $put['marketing_subscribed']);
            $this->$modelUsers->insert_update($user);
        }
        return $this->response([], 200);
    }
}
