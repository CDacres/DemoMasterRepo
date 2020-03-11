<?php

namespace App\Concerns;

trait SaltedPasswords
{
    public function crypt($password = '', $salt = '')
    {
        return hash_hmac('sha512', $password, $salt);
    }

    public function generateSalt()
    {
        return crypt(uniqid(mt_rand(), true), date('Y-m-d H:i:s'));
    }

    public function verify($password = '', $salt = '', $hashedPassword = '')
    {
        if (empty($password) || empty($salt) || empty($hashedPassword))
        {
            return false;
        }
        return $this->crypt($password, $salt) === $hashedPassword;
    }
}