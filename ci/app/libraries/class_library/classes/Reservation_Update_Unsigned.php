<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Reservation_Update_Unsigned extends Reservation_Update
{
    public function getUserRequest()
    {
        return false;
    }
}