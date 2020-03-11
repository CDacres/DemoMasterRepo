<?php

namespace App\Models\Booking;

use App\LaravelExtensions\Model\LegacyModel;
use App\Models\User;
use App\Models\Booking\MessageType;
use App\Models\Booking\Reservation;

use App\Events\MessageCreatingEvent;
use App\Events\MessageCreatedEvent;

class Message extends LegacyModel
{
    public $timestamps = false;
    public $table = 'messages';

    protected $fillable = [
        'reservation_id',
        'conversation_id',
        'userby',
        'userto',
        'message',
        'message_type_id',
        'created',
        'is_read',
        'is_starred'
    ];

    protected $dispatchesEvents = [
        'creating' => MessageCreatingEvent::class,
        'created' => MessageCreatedEvent::class
    ];

    private $_sending_user;
    private $_is_conversation = false;

    public function sender()
    {
        return $this->belongsTo(User::class, 'userby', 'id');
    }

    public function reciever()
    {
        return $this->belongsTo(User::class, 'userto', 'id');
    }

    public function type()
    {
        return $this->hasOne(MessageType::class, 'id', 'message_type_id');
    }

    public function reservation()
    {
        return $this->belongsTo(Reservation::class, 'reservation_id', 'id');
    }

    public function set_as_conversation()
    {
        $this->_is_conversation = true;
    }

    public function is_conversation()
    {
        return $this->_is_conversation;
    }

    public function get_sending_user()
    {
        return $this->_sending_user;
    }

    public function set_sending_user($user)
    {
        $this->_sending_user = $user;
    }
}