<?php

namespace App\Helpers;

class RolesAndPrivilegesHelper
{
    const APPROVAL = 1;
    const MAKE_BOOKING = 1;
    const UPDATE = 2;
    const INSERTCHILD = 4;
    const NOTIFY = 8;
    const DELETE = 16;

    const STANDARDUSER = 0;
    const ADMINUSER = 2;
    const ASSETOWNER = 1;

    static public function get_top_privilege()
    {
        return self::APPROVAL | self::MAKE_BOOKING | self::UPDATE | self::INSERTCHILD | self::NOTIFY | self::DELETE;
    }
}