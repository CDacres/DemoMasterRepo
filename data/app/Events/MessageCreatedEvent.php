<?php

namespace App\Events;

use App\Models\Booking\Message;
use App\Models\Booking\MessageType;

use App\Helpers\CommHelper;
use App\Helpers\AnalyticsHelper;

class MessageCreatedEvent extends Event
{
    public function __construct(Message $message)
    {
        if ($message->is_conversation() && $message->message_type_id == MessageType::CONVERSATION)
        {
            $commHelper = new CommHelper();
            $commHelper->new_conversation_message($message);
            $currentUser = $message->get_sending_user();
            AnalyticsHelper::register_step('VOLUNTARY_INTERACTION', $message->sender->canonical_cookie_id, $message->sender->language_pref, (($currentUser->isSpoofMode())?$currentUser->adminspoofid:null), 'User added message');
        }
    }
}