<?php

namespace App\Events;

use Illuminate\Support\Facades\DB;
use App\Models\Booking\Message;

class MessageCreatingEvent extends Event
{
    public function __construct(Message $message)
    {
        $message->created = date("Y-m-d H:i:s");
        if ($message->is_conversation())
        {
            $conversationId = $this->_get_message_conversation_id($message);
            if ($conversationId == 0)
            {
                $conversationId = $this->_get_next_conversation_id();
            }
            $message->conversation_id = $conversationId;
        }
    }

    private function _get_message_conversation_id($message)
    {
        $sendingUserId = $message->userby;
        $receivingUserId = $message->userto;
        $max_conversation = DB::table('messages')->where('enabled', 1)->where(function ($query) use ($sendingUserId, $receivingUserId) {
            $query->where(function ($query) use ($sendingUserId, $receivingUserId) {
                $query->where('messages.userby', $sendingUserId)->where('messages.userto', $receivingUserId);
            })->orWhere(function ($query) use ($sendingUserId, $receivingUserId) {
                $query->where('messages.userby', $receivingUserId)->where('messages.userto', $sendingUserId);
            });
        })->max('conversation_id');
        if (!is_null($max_conversation))
        {
            $conversationId = $max_conversation;
        }
        else
        {
            $conversationId = 0;
        }
        return $conversationId;
    }

    private function _get_next_conversation_id()
    {
        $max_conversation = DB::table('messages')->where('enabled', 1)->max('conversation_id');
        if (!is_null($max_conversation))
        {
            $conversationId = $max_conversation + 1;
        }
        else
        {
            $conversationId = 0;
        }
        return $conversationId;
    }
}