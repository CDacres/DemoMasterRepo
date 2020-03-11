<?php

namespace App\Helpers;

class TokenHelper
{
    public function add_token($length = 32)
    {
        if ($length == 32)
        {
            srand((double) microtime() * 1000000);
            return md5(uniqid(rand(), true));
        }
        else
        {
            $pool = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            $str = '';
            for ($i = 0; $i < $length; $i++)
            {
                $str .= substr($pool, mt_rand(0, strlen($pool) -1), 1);
            }
            return $str;
        }
    }
}