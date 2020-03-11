<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Message___Collection extends Base__Collection
{
    static protected $_staticObjectType = Message::class;
}

class Message extends Base__Item
{
    protected static $_modelName = Model__message::class;
    protected static $_tableName = 'messages';
    protected static $_columns = [
        'reservation_id' => [
            'pointer' => 'reservation_id',
            'validations' => 'is_natural|required'
        ],
        'conversation_id' => [
            'pointer' => 'conversation_id',
            'validations' => 'is_natural'
        ],
        'sending_user_id' => [
            'pointer' => 'userby',
            'validations' => 'is_natural|required'
        ],
        'receiving_user_id' => [
            'pointer' => 'userto',
            'validations' => 'is_natural|required'
        ],
        'message' => [
            'pointer' => 'message',
            'validations' => 'required'
        ],
        'created' => [
            'pointer' => 'created',
            'validations' => 'is_date_time|required'
        ],
        'is_read' => [
            'pointer' => 'is_read',
            'validations' => 'is_boolean'
        ],
        'is_starred' => [
            'pointer' => 'is_starred',
            'validations' => 'is_boolean'
        ],
        'message_type' => [
            'pointer' => 'message_type_id',
            'validations' => 'is_natural'
        ]
    ];
    protected static $_aliases = [
        'asset_id' => [
            'pointer' => 'asset_id',
            'validations' => ''
        ],
        'room_id' => [
            'pointer' => 'room_id',
            'validations' => ''
        ],
        'room_name' => [
            'pointer' => 'room_name',
            'validations' => ''
        ],
        'room_approved' => [
            'pointer' => 'room_approved',
            'validations' => 'is_boolean'
        ],
        'room_enabled' => [
            'pointer' => 'room_enabled',
            'validations' => 'is_boolean'
        ],
        'venue_name' => [
            'pointer' => 'venue_name',
            'validations' => ''
        ],
        'venue_city' => [
            'pointer' => 'venue_city',
            'validations' => ''
        ],
        'venue_country' => [
            'pointer' => 'venue_country',
            'validations' => ''
        ],
        'venue_country_code' => [
            'pointer' => 'venue_country_code',
            'validations' => ''
        ],
        'venue_approved' => [
            'pointer' => 'venue_approved',
            'validations' => 'is_boolean'
        ],
        'venue_agree_to_list' => [
            'pointer' => 'venue_agree_to_list',
            'validations' => 'is_boolean'
        ],
        'venue_enabled' => [
            'pointer' => 'venue_enabled',
            'validations' => 'is_boolean'
        ],
        'name' => [
            'pointer' => 'name',
            'validations' => ''
        ],
        'url' => [
            'pointer' => 'url',
            'validations' => ''
        ],
        'start_date_time' => [
            'pointer' => 'start_date_time',
            'validations' => 'is_date_time'
        ],
        'end_date_time' => [
            'pointer' => 'end_date_time',
            'validations' => 'is_date_time'
        ],
        'toVenue' => [
            'pointer' => 'toVenue',
            'validations' => ''
        ],
        'toVenue_vat' => [
            'pointer' => 'toVenue_vat',
            'validations' => ''
        ],
        'price' => [
            'pointer' => 'price',
            'validations' => ''
        ],
        'extra_fee' => [
            'pointer' => 'extra_fee',
            'validations' => 'is_numeric|empty_null'
        ],
        'extra_fee_vat' => [
            'pointer' => 'extra_fee_vat',
            'validations' => 'is_numeric|empty_null'
        ],
        'flexible_fee' => [
            'pointer' => 'flexible_fee',
            'validations' => 'is_numeric_positive|empty_null'
        ],
        'flexible_fee_vat' => [
            'pointer' => 'flexible_fee_vat',
            'validations' => 'is_numeric_positive|empty_null'
        ],
        'price_control_fee' => [
            'pointer' => 'price_control_fee',
            'validations' => 'is_numeric_positive|empty_null'
        ],
        'price_control_fee_vat' => [
            'pointer' => 'price_control_fee_vat',
            'validations' => 'is_numeric_positive|empty_null'
        ],
        'discount_applied' => [
            'pointer' => 'discount_applied',
            'validations' => 'is_numeric_positive|empty_null'
        ],
        'client_discount' => [
            'pointer' => 'client_discount',
            'validations' => 'is_numeric_positive'
        ],
        'guests' => [
            'pointer' => 'guests',
            'validations' => ''
        ],
        'currency_symbol_left' => [
            'pointer' => 'currency_symbol_left',
            'validations' => 'alpha'
        ],
        'currency_symbol_right' => [
            'pointer' => 'currency_symbol_right',
            'validations' => 'alpha'
        ],
        'sending_user_first_name' => [
            'pointer' => 'sending_user_first_name',
            'validations' => ''
        ],
        'sending_user_last_name' => [
            'pointer' => 'sending_user_last_name',
            'validations' => ''
        ],
        'receiving_user_first_name' => [
            'pointer' => 'receiving_user_first_name',
            'validations' => ''
        ],
        'receiving_user_last_name' => [
            'pointer' => 'receiving_user_last_name',
            'validations' => ''
        ],
        'is_conversation' => [
            'pointer' => 'is_conversation',
            'validations' => 'is_boolean'
        ],
        'max_conversation_id' => [
            'pointer' => 'max_conversation_id',
            'validations' => 'is_natural'
        ],
        'usage_superset_alias' => [
            'pointer' => 'usage_superset_alias',
            'validations' => ''
        ]
    ];
    protected static $_wranglers = [
        'reservation_price' => [
            'object' => 'Wrangler__Price',
            'method_bindings' => ['price' => ['method' => '_get_total_price']],
            'data_bindings' => [
                'currency_symbol_left' => 'currency_symbol_left',
                'currency_symbol_right' => 'currency_symbol_right'
            ]
        ],
        'reservation_pay_out' => [
            'object' => 'Wrangler__Price',
            'method_bindings' => ['price' => ['method' => '_get_payout']],
            'data_bindings' => [
                'currency_symbol_left' => 'currency_symbol_left',
                'currency_symbol_right' => 'currency_symbol_right'
            ]
        ],
        'reservation_start_date_time' => [
            'object' => 'Wrangler__Date_Time',
            'data_bindings' => ['datetime' => 'start_date_time']
        ],
        'reservation_end_date_time' => [
            'object' => 'Wrangler__Date_Time',
            'data_bindings' => ['datetime' => 'end_date_time']
        ],
        'created_date' => [
            'object' => 'Wrangler__Date',
            'data_bindings' => ['date' => 'created']
        ],
        'created_date_time' => [
            'object' => 'Wrangler__Date_Time',
            'data_bindings' => ['datetime' => 'created']
        ],
        'reservation_guests' => [
            'object' => 'Wrangler__Guest',
            'data_bindings' => ['number' => 'guests']
        ],
        'sending_user_full_name' => [
            'object' => 'Wrangler__Name',
            'data_bindings' => [
                'first_name' => 'sending_user_first_name',
                'last_name' => 'sending_user_last_name'
            ]
        ],
        'sending_user_full_name_length_limited' => [
            'object' => 'Wrangler__Limiter',
            'method_bindings' => ['data' => ['method' => '_sending_user_full_name']]
        ],
        'sending_user_image' => [
            'object' => 'Wrangler__Image',
            'data_bindings' => ['user_id' => 'sending_user_id']
        ],
        'receiving_user_full_name' => [
            'object' => 'Wrangler__Name',
            'data_bindings' => [
                'first_name' => 'receiving_user_first_name',
                'last_name' => 'receiving_user_last_name'
            ]
        ],
        'receiving_user_full_name_length_limited' => [
            'object' => 'Wrangler__Limiter',
            'method_bindings' => ['data' => ['method' => '_receiving_user_full_name']]
        ],
        'receiving_user_image' => [
            'object' => 'Wrangler__Image',
            'data_bindings' => ['user_id' => 'receiving_user_id']
        ],
        'message_length_limited' => [
            'object' => 'Wrangler__Limiter',
            'method_bindings' => [
                'data' => ['method' => '_message']]
        ],
        'room_name_length_limited' => [
            'object' => 'Wrangler__Limiter',
            'method_bindings' => ['data' => ['method' => '_room_name']]
        ]
    ];

    public function set_as_conversation()
    {
        $this->set('is_conversation', true);
    }

    public function is_conversation()
    {
        $retVal = $this->set('is_conversation');
        return (($retVal === true)?true:false);
    }

    protected function _message()
    {
        return $this->get('message');
    }

    protected function _room_name()
    {
        return $this->get('room_name');
    }

    protected function _sending_user_full_name()
    {
        return $this->wrangle('sending_user_full_name')->formatted();
    }

    protected function _receiving_user_full_name()
    {
        return $this->wrangle('receiving_user_full_name')->formatted();
    }

    protected function _get_total_price()
    {
        $total = $this->get('price');
        if (!$this->is_null('flexible_fee'))
        {
            $total += $this->get('flexible_fee');
        }
        if (!$this->is_null('flexible_fee_vat'))
        {
            $total += $this->get('flexible_fee_vat');
        }
        if (!$this->is_null('extra_fee'))
        {
            $total += $this->get('extra_fee');
        }
        if (!$this->is_null('extra_fee_vat'))
        {
            $total += $this->get('extra_fee_vat');
        }
        if (!$this->is_null('price_control_fee'))
        {
            $total += $this->get('price_control_fee');
        }
        if (!$this->is_null('price_control_fee_vat'))
        {
            $total += $this->get('price_control_fee_vat');
        }
        return $total;
    }

    protected function _get_payout()
    {
        $payout = $this->get('toVenue');
        if (!$this->is_null('toVenue_vat'))
        {
            $payout -= $this->get('toVenue_vat');
        }
        return $payout;
    }
}