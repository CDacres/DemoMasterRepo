<?php

namespace App\Transformers;

use App\Models\User;
use App\LaravelExtensions\Transformers\ExtendedTransformer;

class UsersTransformer extends ExtendedTransformer
{
    protected $availableIncludes = ['profile'];

    public function transform(User $user)
    {
        $standardResponse = [
            'id' => (string) $user->id,
            'first_name' => (string) $user->first_name,
            'is_admin' => $user->is_admin,
            'avatar' => $user->avatar,
            'is_venue_owner' => $user->is_venue_owner
        ];
        if ($this->contextUser->can('view', $user))
        {
            $standardResponse = array_merge($standardResponse, ['email' => (string) $user->email]);
            if ($user->is_spoof_mode)
            {
                $standardResponse = array_merge($standardResponse, [
                    'is_spoof_mode' => true,
                    'admin_spoof_id' => (string) $user->admin_spoof_id
                ]);
            }
        }
        return $standardResponse;
    }

    public function includeProfile(User $user)
    {
        $profile = $user->profile;
        return $this->item($profile, new ProfilesTransformer($this->contextUser), 'profiles');
    }
}