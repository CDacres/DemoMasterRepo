<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class User___Collection extends Base__Collection
{
    static protected $_staticObjectType = User::class;
}

class User extends Base__Item
{
    const STANDARDUSER = 0;
    const ADMINUSER = 2;
    const ASSETOWNER = 1;

    const EMAILDISPOSABLE = 'Disposable';
    const EMAILINVALID = 'Invalid';
    const EMAILOTHER = 'Other';
    const EMAILUNKNOWN = 'Unknown';
    const EMAILUNVERIFIABLE = 'Unverifiable';
    const EMAILVALID = 'Valid';

    private $_has_new_email = false;

    protected static $_modelName = Model__users::class;
    protected static $_tableName = 'users';
    protected static $_columns = [
        'username' => [
            'pointer' => 'username',
            'validations' => ''
        ],
        'email' => [
            'pointer' => 'email',
            'validations' => 'is_email|required',
            'pre_triggers' => ['update' => '_update_user_email']
        ],
        'email_status' => [
            'pointer' => 'email_status',
            'validations' => '',
            'access' => 'protected'
        ],
        'ref_id' => [
            'pointer' => 'ref_id',
            'validations' => 'alpha_numeric|required',
            'access' => 'protected'
        ],
        'google_id' => [
            'pointer' => 'google_id',
            'validations' => '',
            'access' => 'protected'
        ],
        'fb_id' => [
            'pointer' => 'fb_id',
            'validations' => '',
            'access' => 'protected'
        ],
        'linkedin_id' => [
            'pointer' => 'linkedin_id',
            'validations' => '',
            'access' => 'protected'
        ],
        'token' => [
            'pointer' => 'token',
            'validations' => 'alpha_numeric|empty_null',
            'access' => 'protected'
        ],
        'remember_me_token' => [
            'pointer' => 'remember_me_token',
            'validations' => 'alpha_numeric|empty_null',
            'access' => 'protected'
        ],
        'canonical_cookie_id' => [
            'pointer' => 'canonical_cookie_id',
            'validations' => 'is_natural|empty_null',
            'access' => 'protected'
        ],
        'created' => [
            'pointer' => 'created',
            'validations' => 'is_natural|required',
            'access' => 'protected'
        ],
        'coupon_code' => [
            'pointer' => 'coupon_code',
            'validations' => 'is_natural|required',
            'access' => 'protected'
        ],
        'user_type_id' => [
            'pointer' => 'userType_id',
            'validations' => '',
            'access' => 'protected'
        ],
        'password' => [
            'pointer' => 'password',
            'validations' => 'alpha_numeric',
            'triggers' => ['update' => '_clear_token'],
            'access' => 'private|protected'
        ],
        'salt' => [
            'pointer' => 'salt',
            'validations' => '',
            'access' => 'private|protected'
        ],
        'last_ip' => [
            'pointer' => 'last_ip',
            'validations' => 'required|valid_ip',
            'access' => 'private|protected'
        ],
        'role_id' => [
            'pointer' => 'role_id',
            'validations' => 'is_natural',
            'access' => 'protected'
        ],
        'language_pref' => [
            'pointer' => 'language_pref',
            'validations' => ''
        ],
        'locale_pref' => [
            'pointer' => 'locale_pref',
            'validations' => ''
        ],
        'hubspot_id' => [
            'pointer' => 'hubspot_id',
            'validations' => 'is_natural'
        ],
        'unsubscribe_token' => [
            'pointer' => 'unsubscribe_token',
            'validations' => 'alpha_numeric|empty_null',
            'access' => 'protected'
        ],
        'marketing_subscribed' => [
            'pointer' => 'marketing_subscribed',
            'validations' => 'is_boolean',
            'access' => 'protected'
        ],
        'is_enquirer' => [
            'pointer' => 'is_enquirer',
            'validations' => 'is_boolean'
        ]
    ];
    protected static $_aliases = [
        'profile_id' => [
            'pointer' => 'profile_id',
            'validations' => 'is_natural'
        ],
        'first_name' => [
            'pointer' => 'first_name',
            'validations' => ''
        ],
        'last_name' => [
            'pointer' => 'last_name',
            'validations' => ''
        ],
        'phone_number' => [
            'pointer' => 'phone_number',
            'validations' => ''
        ],
        'phone_number_search' => [
            'pointer' => 'phone_number_search',
            'validations' => ''
        ],
        'venue_name' => [
            'pointer' => 'venue_name',
            'validations' => ''
        ],
        'company_privilege' => [
            'pointer' => 'company_privilege',
            'validations' => ''
        ],
        'never_bounce_status' => [
            'pointer' => 'never_bounce_status',
            'validations' => ''
        ],
        'is_business_user' => [
            'pointer' => 'is_business_user',
            'validations' => ''
        ]
    ];
    protected static $_wranglers = [
        'full_name' => [
            'object' => 'Wrangler__Name',
            'data_bindings' => [
                'first_name' => 'first_name',
                'last_name' => 'last_name'
            ]
        ],
        'full_name_length_limited' => [
            'object' => 'Wrangler__Limiter',
            'method_bindings' => ['data' => ['method' => '_full_name']]
        ],
        'image' => [
            'object' => 'Wrangler__Image',
            'data_bindings' => ['user_id' => 'id']
        ],
        'phone_number' => [
            'object' => 'Wrangler__Link',
            'data_bindings' => [
                'phone' => 'phone_number',
                'hubspot_id' => 'hubspot_id'
            ]
        ],
        'email' => [
            'object' => 'Wrangler__Link',
            'data_bindings' => [
                'email' => 'email',
                'email_status' => 'email_status',
                'hubspot_id' => 'hubspot_id'
            ]
        ]
//        'created_date_time' => [
//            'object' => 'Wrangler__Date_Time',
//            'data_bindings' => ['datetime' => 'created']
//        ]
    ];
    protected static $_objects = [
        'info_history' => User_Info_History::class,
        'venue_privileges' => Venue___Collection::class
    ];

    protected function _full_name()
    {
        return $this->wrangle('full_name')->formatted();
    }

    public function is_logged_in()
    {
        return $this->exists_in_db();
    }

    public function is_admin()
    {
        $CI = &get_instance();
        return ($this->get('role_id') == self::ADMINUSER || $CI->dx_auth->is_spoof_mode());
    }

    public function has_admin_role()
    {
        return ($this->get('role_id') == self::ADMINUSER);
    }

    public function has_assets($asset_level = null)
    {
        $retVal = false;
        if ($asset_level != null)
        {
            $modelAssets = Model__assets::class;
            $CI = &get_instance();
            $CI->load->model($modelAssets);
            $assets = $CI->$modelAssets->get_asset_object_collection_by_user_and_type($this->get('id'), $asset_level);
            $retVal = $assets->exist() && ($this->get('user_type_id') == self::ASSETOWNER);
        }
        else
        {
            $retVal = ($this->get('user_type_id') == self::ASSETOWNER);
        }
        return $retVal;
    }

    public function set_last_ip($ip)
    {
        return $this->set('last_ip', $ip);
    }

    public function is_unspoofed_admin()
    {
        $CI = &get_instance();
        return ($this->is_admin() && !$CI->dx_auth->is_spoof_mode());
    }

    public function is_admin_in_spoofmode()
    {
        $CI = &get_instance();
        return ($this->is_admin() && $CI->dx_auth->is_spoof_mode());
    }

    public function set_password($passwordPlainText = null)
    {
        if ($passwordPlainText === null)
        {
            $passwordPlainText = $this->_generate_password();
        }
        elseif (!$this->_password_has_entropy($passwordPlainText))
        {
            throw new Exception('That password is not strong enough. It must be at least 8 characters long.');
        }
        $CI = &get_instance();
        $salt = $CI->security_auth->generateSalt();
        $passwordHash = $CI->security_auth->crypt($passwordPlainText, $salt);
        $this->set('salt', $salt);
        $this->set('password', $passwordHash);
        return $passwordPlainText;
    }

    public function check_password($password)
    {
      $CI = &get_instance();
      return $CI->security_auth->verify($password, $this->get('salt'), $this->get('password'));
    }

    public function check_token($token)
    {
        return ($this->get('token') === $token);
    }

    public function has_new_email()
    {
        return $this->_has_new_email;
    }

    protected function _update_user_email()
    {
        $userInfoHistory = new User_Info_History();
        $userInfoHistory->set('user_id', $this->get('id'));
        $userInfoHistory->set('email', $this->get('email'));
        $userInfoHistory->set('dateTime', date("Y-m-d H:i:s"));
        $this->set('info_history', $userInfoHistory);
        $this->_has_new_email = true;
    }

    protected function _clear_token()
    {
        $this->set('token');
    }

    public function generate_token()
    {
        srand((double) microtime() * 1000000);
        $this->set('token', md5(uniqid(rand(), true)));
    }

    public function has_canonical_cookie()
    {
        return !$this->is_null('canonical_cookie_id');
    }

    private function _password_has_entropy($passwordPlainText)
    {
        return (strlen($passwordPlainText) > 7);
    }

    private function _generate_password()
    {
        $pool = '123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $passwordPlainText  = '';
        for ($i = 0; $i < 8; ++$i)
        {
            $passwordPlainText .= substr($pool, mt_rand(0, strlen($pool) - 1), 1);
        }
        $this->set_password($passwordPlainText);
        return $passwordPlainText;
    }

    public function find_hubspot_type()
    {
        return (($this->get('user_type_id') == self::ASSETOWNER)? 'Venue' : 'Client');
    }
}