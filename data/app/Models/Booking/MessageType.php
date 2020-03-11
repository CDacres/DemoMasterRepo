<?php

namespace App\Models\Booking;

use App\LaravelExtensions\Model\LegacyModel;

class MessageType extends LegacyModel
{
    const REQUEST = 1;
    const VENUEMADE = 2;
    const CONVERSATION = 3;
    const REVIEW = 5;
    const INQUIRY = 6;

    public $timestamps = false;
    public $table = 'message_type';
}