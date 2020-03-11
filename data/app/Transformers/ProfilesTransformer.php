<?php

namespace App\Transformers;

use App\Models\Profile;
use App\LaravelExtensions\Transformers\ExtendedTransformer;

class ProfilesTransformer extends ExtendedTransformer
{
    public function transform(Profile $profile)
    {
        return [
            'id' => (string) $profile->id,
            'first_name' => $profile->Fname,
            'last_name' => $profile->Lname
        ];
    }
}