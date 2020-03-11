<?php

use Illuminate\Database\Seeder;

use App\Models\User;
use App\Models\Profile;

class UserTableSeeder extends Seeder
{
    private $_data = [
        [
            //admin
            'id' => 1,
            'email' => 'yoobnb@gmail.com',
            'firstName' => 'Zipcube Admin',
            'lastName' => 'Account',
            'phone_number' => '+44 (0)20 7183 2212',
            'password' => 'AdminPass!',
            'role_id' => 2
        ],
        [
            //venue_admin
            'id' => 2,
            'email' => 'prestonjohns123@gmail.com',
            'firstName' => 'Preston',
            'lastName' => 'Johns',
            'phone_number' => '01948 228194',
            'password' => 'PrestonPass!',
            'userType_id' => 1
        ],
        [
            //english_user
            'id' => 3,
            'email' => 'williamdassault@gmail.com',
            'firstName' => 'William',
            'lastName' => 'Dassault',
            'phone_number' => '+44 7932 467525',
            'password' => 'WilliamPass!'
        ],
        [
            //french_enquirer
            'id' => 4,
            'email' => 'jean@zipcube.com',
            'firstName' => 'Jean',
            'lastName' => 'Dupont',
            'phone_number' => '+33 9 74 59 20 00',
            'password' => 'JeanPass!',
            'is_enquirer' => 1,
            'language_pref' => 'fr',
            'locale_pref' => 'fr'
        ],
        [
            //german_user
            'id' => 5,
            'email' => 'otto@zipcube.com',
            'firstName' => 'Otto',
            'lastName' => 'Normalverbraucher',
            'phone_number' => '+4932211121730',
            'password' => 'OttoPass!',
            'language_pref' => 'de',
            'locale_pref' => 'de'
        ]
    ];

    public function run()
    {
        $userArr = [];
        $profileArr = [];
        foreach ($this->_data as $user_data) {
            $userArr[] = $this->_add_to_user_array($user_data);
            $profileArr[] = $this->_add_to_profile_array($user_data);
        }
        User::insert($userArr);
        Profile::insert($profileArr);
//        factory(App\Models\User::class, 3)->create()->each(function ($user) {
//            $user->profile()->save(factory(App\Models\Profile::class)->make());
//        });
    }

    private function _add_to_user_array($user_data)
    {
        srand((double)microtime() * 1000000);
        $tempUser = new User();
        $salt = $tempUser->generateSalt();
        $passwordHash = $tempUser->crypt($user_data['password'], $salt);
        return [
            'id' => $user_data['id'],
            'ref_id' => md5($user_data['email']),
            'coupon_code' => rand(10000, 99999),
            'token' => md5(uniqid(rand(), true)),
            'unsubscribe_token' => md5(uniqid(rand(), true)),
            'username' => $user_data['firstName'],
            'salt' => $salt,
            'password' => $passwordHash,
            'email' => $user_data['email'],
            'last_ip' => '10.0.0.32',
            'created' => time(),
            'role_id' => ((isset($user_data['role_id']))?$user_data['role_id']:1),
            'userType_id' => ((isset($user_data['userType_id']))?$user_data['userType_id']:0),
            'is_enquirer' => ((isset($user_data['is_enquirer']))?$user_data['is_enquirer']:0),
            'language_pref' => ((isset($user_data['language_pref']))?$user_data['language_pref']:'en'),
            'locale_pref' => ((isset($user_data['locale_pref']))?$user_data['locale_pref']:'gb')
        ];
    }

    private function _add_to_profile_array($user_data)
    {
        return [
            'user_id' => $user_data['id'],
            'Fname' => $user_data['firstName'],
            'Lname' => $user_data['lastName'],
            'phnum' => $user_data['phone_number'],
            'phnum_search' => preg_replace('/[\s\+]/', '', $user_data['phone_number'])
        ];
    }
}