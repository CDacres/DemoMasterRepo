<?php

namespace App\Models;

use App\LaravelExtensions\Model\LegacyModel;

use App\Helpers\CommHelper;

use App\Events\EnquiryCreatingEvent;
use App\Events\EnquiryCreatedEvent;
use App\Events\EnquiryUpdatedEvent;

class Enquiry extends LegacyModel
{
    public $timestamps = false;
    public $table = 'enquiries';

    protected $fillable = [
        'user_id',
        'user_phone',
        'creator',
        'assignedAdmin',
        'description',
        'hubspot_id',
        'budget',
        'potentialValue',
        'eventDate',
        'eventTime',
        'duration',
        'location',
        'guests',
        'tourDate',
        'flexible',
        'dateFlexible',
        'timeDurationFlexible',
        'locationFlexible',
        'multipleDates',
        'message',
        'deskCount',
        'roomsViewed',
        'notes',
        'status',
        'lost_notes',
        'reservation_id',
        'source',
        'created'
    ];

    protected $dispatchesEvents = [
        'creating' => EnquiryCreatingEvent::class,
        'created' => EnquiryCreatedEvent::class,
        'updated' => EnquiryUpdatedEvent::class
    ];

    private $_suppress_audit = false;
    private $_request_rooms = [];
    private $_request_configs = [];
    private $_audit_user_id;
    private $_enquiring_user;

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function room()
    {
        return $this->hasMany(EnquiryRoom::class);
    }

    public function configuration()
    {
        return $this->hasMany(EnquiryConfiguration::class);
    }

    public function durations()
    {
        return $this->belongsTo(EnquiryDuration::class, 'duration');
    }

    public function get_status_id()
    {
        return (int)$this->reservationStatus_id;
    }

    public function get_audit_user_id()
    {
        return $this->_audit_user_id;
    }

    public function set_audit_user_id($userId)
    {
        $this->_audit_user_id = $userId;
    }

    public function get_enquiring_user()
    {
        return $this->_enquiring_user;
    }

    public function set_enquiring_user($userId)
    {
        $this->_enquiring_user = $userId;
    }

    public function suppress_audit_on_update($bool = true)
    {
        $this->_suppress_audit = $bool;
    }

    public function audit_is_suppressed()
    {
        return $this->_suppress_audit;
    }

    public function getClientIdAttribute()
    {
        return $this->user->id;
    }

    public function getClientNameAttribute()
    {
        return $this->user->fullname;
    }

    public function getClientFirstNameAttribute()
    {
        return $this->user->firstname;
    }

    public function getClientLastNameAttribute()
    {
        return $this->user->lastname;
    }

    public function getClientEmailAttribute()
    {
        return $this->user->email;
    }

    public function getClientPhoneAttribute()
    {
        return $this->user->phone;
    }

    public function getClientTokenAttribute()
    {
        return $this->user->token;
    }

    public function set_request_rooms($rooms)
    {
        $this->_request_rooms = $rooms;
    }

    public function get_request_rooms()
    {
        return $this->_request_rooms;
    }

    public function set_request_configs($configs)
    {
        $this->_request_configs = $configs;
    }

    public function get_request_configs()
    {
        return $this->_request_configs;
    }

    public function handle_comms()
    {
        $commHelper = new CommHelper();
        $commHelper->enquiry_notification($this);
    }
}