<?php

namespace App\Events;

use App\Models\UserAssetMember;

class UserAssetMemberCreatingEvent extends Event
{
    public function __construct(UserAssetMember $member)
    {
        $member->created = date("Y-m-d H:i:s");
    }
}