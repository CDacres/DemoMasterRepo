<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Foundation\Auth\Access\Authorizable;
use App\LaravelExtensions\Model\LegacyModel;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use App\LaravelExtensions\Contracts\Authorizable as AuthorizableContract;
use Tymon\JWTAuth\Contracts\JWTSubject;
use App\Transformers\UsersTransformer;
use App\Concerns\SaltedPasswords;

use App\Models\Profile;

use App\Helpers\ImageHelper;
use App\Helpers\AnalyticsHelper;
use App\Helpers\TokenHelper;

class User extends LegacyModel implements AuthenticatableContract, AuthorizableContract, JWTSubject
{
    use Authenticatable, Authorizable, SaltedPasswords;

    public $timestamps = false;
    protected $table = 'users';
    static protected $defaultTransformer = UsersTransformer::class;
    static protected $defaultSerialisationLabel = 'users';

//    protected $fillable = [
//        'email',
//        'first_name',
//        'ref_id',
//        'created',
//        'coupon_code',
//        'username',
//        'password',
//        'token',
//        'last_ip'
//    ];
//
//    protected $visible = [
//        'id',
//        'first_name',
//        'is_admin',
//        'avatar',
//        'is_spoof_mode',
//        'admin_spoof_id',
//        'is_venue_owner'
//    ];
//
//    protected $appends = [
//        'first_name',
//        'is_admin',
//        'avatar',
//        'is_venue_owner'
//    ];

    private $_admin_spoof_id = null;

    private $_jwt_additions = [];

    public function createFromRequestHelper($reqHelper)
    {
        parent::createFromRequestHelper($reqHelper);
    }

    public function add_to_jwt($item_array = [])
    {
        foreach ($item_array as $key => $value)
        {
            $this->_jwt_additions[$key] = $value;
        }
    }

    public function AddSpoofedByAdminToJWT($adminId)
    {
        $this->add_to_jwt(['spoof_mode' => true, 'spoof_admin_id' => $adminId]);
    }

    public function addAdminSpoofIdToUser($id)
    {
        $this->_admin_spoof_id = $id;
    }

    public function isAdmin()
    {
        return $this->is_admin;
    }

    public function isSpoofMode()
    {
        return $this->is_spoof_mode;
    }

    public function hasEagleVision()
    {
        return $this->isAdmin() || $this->isSpoofMode();
    }

    public function isUser()
    {
        return true;
    }

    public function isSelfLister()
    {
        return !$this->isSpoofMode() && (strpos($this->email, '@zipcube.com') === false);
    }

//    protected $hidden = [
//        'password',
//        'salt',
//        'ref_id',
//        'ref_id',
//        'coupon_code',
//        'remember_me_token',
//        'username',
//        'api_token',
//        'timezone',
//        'banned',
//        'ban_reason',
//        'newpass',
//        'newpass_key',
//        'newpass_time',
//        'last_login',
//        'created',
//        'modified',
//        'last_ip'
//    ];

    public function profile()
    {
        return $this->hasOne(Profile::class);
    }

    public function getIsSpoofModeAttribute()
    {
        return !is_null($this->_admin_spoof_id);
    }

    public function getAdminSpoofIdAttribute()
    {
        return $this->_admin_spoof_id;
    }

    public function getIsAdminAttribute()
    {
        return $this->role_id == 2;
    }

    public function getIsVenueOwnerAttribute()
    {
        return $this->userType_id == 1;
    }

    public function getAvatarAttribute()
    {
        $imageHelper = new ImageHelper();
        return $imageHelper->getUserAvatarThumbPath($this->id);
    }

    public function getFirstNameAttribute()
    {
        return ucfirst($this->profile->Fname);
    }

    public function getLastNameAttribute()
    {
        return ucfirst($this->profile->Lname);
    }

    public function getFullNameAttribute()
    {
        return ucfirst($this->profile->Fname) . " " . ucfirst($this->profile->Lname);
    }

    public function getPhoneAttribute()
    {
        return $this->profile->phnum;
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return array_merge(['is_admin' => $this->is_admin], $this->_jwt_additions);
    }

    public function setNewPassword($password = null)
    {
        $this->salt = $this->generateSalt();
        $this->password = $this->crypt($this->_generatePasswordIfNull($password), $this->salt);
    }

    private function _generatePasswordIfNull($password = null)
    {
        if (!is_null($password))
        {
            return $password;
        }
        return (new TokenHelper())->add_token();
    }

    public function update_user_is_enquirer($is_enquirer)
    {
        if ($this->is_enquirer != $is_enquirer)
        {
            $this->_register_deal($is_enquirer);
            $this->is_enquirer = $is_enquirer;
            $this->save();
        }
    }

    private function _register_deal($is_enquirer)
    {
        if ($is_enquirer)
        {
            AnalyticsHelper::register_step('DEAL_OPENED', $this->canonical_cookie_id, $this->language_pref, (($this->isSpoofMode())?$this->adminspoofid:null));
        }
        else
        {
            AnalyticsHelper::register_step('DEAL_CLOSED', $this->canonical_cookie_id, $this->language_pref, (($this->isSpoofMode())?$this->adminspoofid:null));
        }
    }
}
