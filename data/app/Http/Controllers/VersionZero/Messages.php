<?php

namespace App\Http\Controllers\VersionZero;
use App\Http\Controllers\Controller;

use Dingo\Api\Http\Request;
use App\Models\Booking\Message;
use App\Models\Booking\MessageType;

class Messages extends Controller
{
    protected $defaultClass = Message::class;

    public function create_conversation_message(Request $request)
    {
        $message = new Message();
        $message->reservation_id = $request->reservation_id;
        $message->userto = $request->userto;
        $message->userby = $request->userby;
        $message->message = $request->message;
        $message->message_type_id = MessageType::CONVERSATION;
        $message->set_as_conversation();
        $message->set_sending_user($this->authority());
        $message->save();
    }
}