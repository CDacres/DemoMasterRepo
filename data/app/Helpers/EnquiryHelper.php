<?php

namespace App\Helpers;

class EnquiryHelper
{
    public function user_has_second_phone($enquiry, $user)
    {
        return ($enquiry->user_phone != $user->phone && !is_null($enquiry->user_phone) && $enquiry->user_phone != '');
    }
}