<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Enquiry___Collection extends Base__Collection
{
    static protected $_staticObjectType = Enquiry::class;
}

class Enquiry extends Base__Item implements Interface__Auditable
{
    private $_suppress_audit = false;

    protected static $_modelName = Model__enquiries::class;
    protected static $_tableName = 'enquiries';
    protected static $_columns = [
        'user_id' => [
            'pointer' => 'user_id',
            'validations' => 'is_natural'
        ],
        'user_phone' => [
            'pointer' => 'user_phone',
            'validations' => 'required'
        ],
        'creator' => [
            'pointer' => 'creator',
            'validations' => 'is_natural'
        ],
        'assignedAdmin' => [
            'pointer' => 'assignedAdmin',
            'validations' => 'is_natural|empty_null'
        ],
        'description' => [
            'pointer' => 'description',
            'validations' => ''
        ],
        'hubspot_id' => [
            'pointer' => 'hubspot_id',
            'validations' => 'is_natural'
        ],
        'budget' => [
            'pointer' => 'budget',
            'validations' => 'is_numeric'
        ],
        'potentialValue' => [
            'pointer' => 'potentialValue',
            'validations' => 'is_numeric'
        ],
        'eventDate' => [
            'pointer' => 'eventDate',
            'validations' => 'is_date'
        ],
        'eventTime' => [
            'pointer' => 'eventTime',
            'validations' => 'is_time'
        ],
        'duration' => [
            'pointer' => 'duration',
            'validations' => 'is_natural'
        ],
        'location' => [
            'pointer' => 'location',
            'validations' => ''
        ],
        'guests' => [
            'pointer' => 'guests',
            'validations' => 'is_natural'
        ],
        'tourDate' => [
            'pointer' => 'tourDate',
            'validations' => 'is_date'
        ],
        'flexible' => [
            'pointer' => 'flexible',
            'validations' => 'is_boolean'
        ],
        'dateFlexible' => [
            'pointer' => 'dateFlexible',
            'validations' => 'is_boolean'
        ],
        'timeDurationFlexible' => [
            'pointer' => 'timeDurationFlexible',
            'validations' => 'is_boolean'
        ],
        'locationFlexible' => [
            'pointer' => 'locationFlexible',
            'validations' => 'is_boolean'
        ],
        'multipleDates' => [
            'pointer' => 'multipleDates',
            'validations' => 'is_boolean'
        ],
        'message' => [
            'pointer' => 'message',
            'validations' => ''
        ],
        'deskCount' => [
            'pointer' => 'deskCount',
            'validations' => 'is_natural'
        ],
        'roomsViewed' => [
            'pointer' => 'roomsViewed',
            'validations' => 'is_natural'
        ],
        'status' => [
            'pointer' => 'status',
            'validations' => 'is_natural'
        ],
        'notes' => [
            'pointer' => 'notes',
            'validations' => ''
        ],
        'lost_notes' => [
            'pointer' => 'lost_notes',
            'validations' => ''
        ],
        'reservation_id' => [
            'pointer' => 'reservation_id',
            'validations' => 'is_natural'
        ],
        'source' => [
            'pointer' => 'source',
            'validations' => ''
        ],
        'quality_score' => [
            'pointer' => 'quality_score',
            'validations' => 'is_natural'
        ],
        'created' => [
            'pointer' => 'created',
            'validations' => 'is_date_time'
        ]
    ];
    protected static $_aliases = [
        'user_hubspot_id' => [
            'pointer' => 'user_hubspot_id',
            'validations' => ''
        ],
        'user_email' => [
            'pointer' => 'user_email',
            'validations' => ''
        ],
        'user_email_status' => [
            'pointer' => 'user_email_status',
            'validations' => ''
        ],
        'user_phone_number' => [
            'pointer' => 'user_phone_number',
            'validations' => ''
        ],
        'user_first_name' => [
            'pointer' => 'user_first_name',
            'validations' => ''
        ],
        'user_last_name' => [
            'pointer' => 'user_last_name',
            'validations' => ''
        ],
        'user_role_id' => [
            'pointer' => 'user_role_id',
            'validations' => ''
        ],
        'user_enabled' => [
            'pointer' => 'user_enabled',
            'validations' => 'is_boolean'
        ],
        'potential_revenue' => [
            'pointer' => 'potential_revenue',
            'validations' => ''
        ],
        'status_desc' => [
            'pointer' => 'status_desc',
            'validations' => ''
        ],
        'duration_desc' => [
            'pointer' => 'duration_desc',
            'validations' => ''
        ],
        'duration_desc_lang_key' => [
            'pointer' => 'duration_desc_lang_key',
            'validations' => ''
        ],
        'duration_hide_email' => [
            'pointer' => 'duration_hide_email',
            'validations' => ''
        ],
        'tracking_cookie_id' => [
            'pointer' => 'tracking_cookie_id',
            'validations' => 'is_natural'
        ]
    ];
    protected static $_wranglers = [
        'event_date' => [
            'object' => 'Wrangler__Date',
            'data_bindings' => ['date' => 'eventDate']
        ],
        'tour_date' => [
            'object' => 'Wrangler__Date',
            'data_bindings' => ['date' => 'tourDate']
        ],
        'created_date' => [
            'object' => 'Wrangler__Date_Time',
            'data_bindings' => ['datetime' => 'created']
        ],
        'event_time' => [
            'object' => 'Wrangler__Date_Time',
            'data_bindings' => ['datetime' => 'eventTime']
        ],
        'full_name' => [
            'object' => 'Wrangler__Name',
            'data_bindings' => [
                'first_name' => 'user_first_name',
                'last_name' => 'user_last_name'
            ]
        ],
        'potential_revenue' => [
            'object' => 'Wrangler__Price',
            'data_bindings' => ['price' => 'potential_revenue']
        ],
        'user_phone_number' => [
            'object' => 'Wrangler__Link',
            'data_bindings' => [
                'phone' => 'user_phone_number',
                'hubspot_id' => 'user_hubspot_id'
            ]
        ],
        'user_phone' => [
            'object' => 'Wrangler__Link',
            'data_bindings' => [
                'phone' => 'user_phone',
                'hubspot_id' => 'user_hubspot_id'
            ]
        ],
        'user_email' => [
            'object' => 'Wrangler__Link',
            'data_bindings' => [
                'email' => 'user_email',
                'email_status' => 'user_email_status',
                'hubspot_id' => 'user_hubspot_id'
            ]
        ],
        'user_add_task' => [
            'object' => 'Wrangler__Link',
            'data_bindings' => ['hubspot_id' => 'user_hubspot_id']
        ]
    ];
    protected static $_objects = [
        'rooms' => Runt_Enquiry_Room___Collection::class,
        'configurations' => Runt_Enquiry_Configuration___Collection::class
    ];

    protected function _message()
    {
        return $this->get('message');
    }

    public function get_status_id()
    {
        return (int)$this->get('status');
    }

    public function suppress_audit_on_update($bool = true)
    {
        $this->_suppress_audit = $bool;
    }

    public function audit_is_suppressed()
    {
        return $this->_suppress_audit;
    }

    public function user_has_second_phone()
    {
        return ($this->get('user_phone') != $this->get('user_phone_number') && !$this->is_null('user_phone') && $this->data_not_empty('user_phone'));
    }
}