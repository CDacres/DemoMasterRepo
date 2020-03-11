<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Extended_Reservation___Collection extends Reservation___Collection
{
    static protected $_staticObjectType = Extended_Reservation::class;
}

class Extended_Reservation extends Reservation
{
    protected static $_aliases = [
        'venue_id' => [
            'pointer' => 'venue_id',
            'validations' => 'is_natural'
        ],
        'venue_asset_id' => [
            'pointer' => 'venue_asset_id',
            'validations' => 'is_natural'
        ],
        'venue_name' => [
            'pointer' => 'venue_name',
            'validations' => ''
        ],
        'venue_phone' => [
            'pointer' => 'venue_phone',
            'validations' => ''
        ],
        'venue_website' => [
            'pointer' => 'venue_website',
            'validations' => ''
        ],
        'venue_address' => [
            'pointer' => 'venue_address',
            'validations' => ''
        ],
        'venue_road' => [
            'pointer' => 'venue_road',
            'validations' => ''
        ],
        'venue_town' => [
            'pointer' => 'venue_town',
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
        'venue_post_code' => [
            'pointer' => 'venue_post_code',
            'validations' => ''
        ],
        'venue_address_extras' => [
            'pointer' => 'venue_address_extras',
            'validations' => ''
        ],
        'venue_transport' => [
            'pointer' => 'venue_transport',
            'validations' => ''
        ],
        'venue_long' => [
            'pointer' => 'venue_long',
            'validations' => 'is_numeric'
        ],
        'venue_lat' => [
            'pointer' => 'venue_lat',
            'validations' => 'is_numeric'
        ],
        'venue_live_bookings' => [
            'pointer' => 'venue_live_bookings',
            'validations' => 'is_boolean'
        ],
        'venue_agree_to_list' => [
            'pointer' => 'venue_agree_to_list',
            'validations' => 'is_boolean'
        ],
        'venue_vat' => [
            'pointer' => 'venue_vat',
            'validations' => 'is_numeric_positive'
        ],
        'venue_approved' => [
            'pointer' => 'venue_approved',
            'validations' => 'is_boolean'
        ],
        'venue_enabled' => [
            'pointer' => 'venue_enabled',
            'validations' => 'is_boolean'
        ],
        'client_hubspot_id' => [
            'pointer' => 'client_hubspot_id',
            'validations' => 'is_natural'
        ],
        'client_id' => [
            'pointer' => 'client_id',
            'validations' => 'is_natural'
        ],
        'client_first_name' => [
            'pointer' => 'client_first_name',
            'validations' => ''
        ],
        'client_last_name' => [
            'pointer' => 'client_last_name',
            'validations' => ''
        ],
        'client_email' => [
            'pointer' => 'client_email',
            'validations' => 'is_email'
        ],
        'client_email_status' => [
            'pointer' => 'client_email_status',
            'validations' => 'is_email'
        ],
        'client_phone' => [
            'pointer' => 'client_phone',
            'validations' => ''
        ],
        'client_role_id' => [
            'pointer' => 'client_role_id',
            'validations' => ''
        ],
        'client_token' => [
            'pointer' => 'client_token',
            'validations' => ''
        ],
        'client_discount' => [
            'pointer' => 'client_discount',
            'validations' => 'is_numeric_positive'
        ],
        'client_enabled' => [
            'pointer' => 'client_enabled',
            'validations' => 'is_boolean'
        ],
        'room_name' => [
            'pointer' => 'room_name',
            'validations' => ''
        ],
        'room_id' => [
            'pointer' => 'room_id',
            'validations' => 'is_natural'
        ],
        'room_approved' => [
            'pointer' => 'room_approved',
            'validations' => 'is_boolean'
        ],
        'room_enabled' => [
            'pointer' => 'room_enabled',
            'validations' => 'is_boolean'
        ],
        'booking_date_time' => [
            'pointer' => 'booking_date_time',
            'validations' => 'is_date_time'
        ],
        'booker_id' => [
            'pointer' => 'booker_id',
            'validations' => 'is_natural'
        ],
        'booking_channel_id' => [
            'pointer' => 'booking_channel_id',
            'validations' => 'is_natural'
        ],
        'booking_channel_desc' => [
            'pointer' => 'booking_channel_desc',
            'validations' => ''
        ],
        'hourly_rate' => [
            'pointer' => 'hourly_rate',
            'validations' => ''
        ],
        'daily_rate' => [
            'pointer' => 'daily_rate',
            'validations' => ''
        ],
        'daily_delegate_rate' => [
            'pointer' => 'daily_delegate_rate',
            'validations' => ''
        ],
        'monthly_rate' => [
            'pointer' => 'monthly_rate',
            'validations' => ''
        ],
        'venue_hourly_rate' => [
            'pointer' => 'venue_hourly_rate',
            'validations' => ''
        ],
        'venue_daily_rate' => [
            'pointer' => 'venue_daily_rate',
            'validations' => ''
        ],
        'venue_daily_delegate_rate' => [
            'pointer' => 'venue_daily_delegate_rate',
            'validations' => ''
        ],
        'venue_monthly_rate' => [
            'pointer' => 'venue_monthly_rate',
            'validations' => ''
        ],
        'status_name' => [
            'pointer' => 'status_name',
            'validations' => ''
        ],
        'status_change_comment' => [
            'pointer' => 'status_change_comment',
            'validations' => ''
        ],
        'company_id' => [
            'pointer' => 'company_id',
            'validations' => 'is_natural'
        ],
        'company_name' => [
            'pointer' => 'company_name',
            'validations' => 'alpha_dash'
        ],
        'company_token' => [
            'pointer' => 'company_token',
            'validations' => ''
        ],
        'image_thumbnail' => [
            'pointer' => 'image_thumbnail',
            'validations' => ''
        ],
        'usage_superset_desc' => [
            'pointer' => 'usage_superset_desc',
            'validations' => ''
        ],
        'usage_superset_alias' => [
            'pointer' => 'usage_superset_alias',
            'validations' => ''
        ],
        'enquiry_id' => [
            'pointer' => 'enquiry_id',
            'validations' => ''
        ],
        'main_user_id' => [
            'pointer' => 'main_user_id',
            'validations' => '',
            'access' => 'private'
        ],
        'main_user_hubspot_id' => [
            'pointer' => 'main_user_hubspot_id',
            'validations' => '',
            'access' => 'private'
        ],
        'main_user_firstname' => [
            'pointer' => 'main_user_firstname',
            'validations' => '',
            'access' => 'private'
        ],
        'main_user_lastname' => [
            'pointer' => 'main_user_lastname',
            'validations' => '',
            'access' => 'private'
        ],
        'main_user_email' => [
            'pointer' => 'main_user_email',
            'validations' => '',
            'access' => 'private'
        ],
        'main_user_email_status' => [
            'pointer' => 'main_user_email_status',
            'validations' => '',
            'access' => 'private'
        ],
        'main_user_phone' => [
            'pointer' => 'main_user_phone',
            'validations' => '',
            'access' => 'private'
        ],
        'main_user_role_id' => [
            'pointer' => 'main_user_role_id',
            'validations' => '',
            'access' => 'private'
        ],
        'financial_entity_id' => [
            'pointer' => 'financial_entity_id',
            'validations' => ''
        ],
        'financial_entity_name' => [
            'pointer' => 'financial_entity_name',
            'validations' => ''
        ],
        'financial_entity_address' => [
            'pointer' => 'financial_entity_address',
            'validations' => ''
        ],
        'financial_entity_financial_data' => [
            'pointer' => 'financial_entity_financial_data',
            'validations' => ''
        ],
        'financial_entity_vat_number' => [
            'pointer' => 'financial_entity_vat_number',
            'validations' => ''
        ],
        'financial_account_user_id' => [
            'pointer' => 'financial_account_user_id',
            'validations' => '',
            'access' => 'private'
        ],
        'financial_account_user_hubspot_id' => [
            'pointer' => 'financial_account_user_hubspot_id',
            'validations' => ''
        ],
        'financial_account_user_firstname' => [
            'pointer' => 'financial_account_user_firstname',
            'validations' => ''
        ],
        'financial_account_user_lastname' => [
            'pointer' => 'financial_account_user_lastname',
            'validations' => ''
        ],
        'financial_account_user_email' => [
            'pointer' => 'financial_account_user_email',
            'validations' => ''
        ],
        'financial_account_user_email_status' => [
            'pointer' => 'financial_account_user_email_status',
            'validations' => ''
        ],
        'financial_account_user_phone' => [
            'pointer' => 'financial_account_user_phone',
            'validations' => ''
        ],
        'financial_account_user_role_id' => [
            'pointer' => 'financial_account_user_role_id',
            'validations' => '',
            'access' => 'private'
        ],
        'payment_amount' => [
            'pointer' => 'payment_amount',
            'validations' => ''
        ],
        'invoice_notes' => [
            'pointer' => 'invoice_notes',
            'validations' => ''
        ],
        'to_pay_EUR_count' => [
            'pointer' => 'to_pay_EUR_count',
            'validations' => ''
        ],
        'to_pay_GBP_count' => [
              'pointer' => 'to_pay_GBP_count',
              'validations' => ''
          ],
        'to_pay_USD_count' => [
              'pointer' => 'to_pay_USD_count',
              'validations' => ''
          ],
        'attention_count' => [
            'pointer' => 'attention_count',
            'validations' => ''
        ]
    ];
    protected static $_wranglers = [
        'venue_website' => [
            'object' => 'Wrangler__Link',
            'data_bindings' => ['website' => 'venue_website']
        ],
        'client_name' => [
            'object' => 'Wrangler__Name',
            'data_bindings' => [
                'first_name' => 'client_first_name',
                'last_name' => 'client_last_name'
            ]
        ],
        'client_phone' => [
            'object' => 'Wrangler__Link',
            'data_bindings' => [
                'phone' => 'client_phone',
                'hubspot_id' => 'client_hubspot_id'
            ]
        ],
        'client_email' => [
            'object' => 'Wrangler__Link',
            'data_bindings' => [
                'email' => 'client_email',
                'email_status' => 'client_email_status',
                'hubspot_id' => 'client_hubspot_id'
            ]
        ],
        'client_add_task' => [
            'object' => 'Wrangler__Link',
            'data_bindings' => ['hubspot_id' => 'client_hubspot_id']
        ],
        'booking_date_time' => [
            'object' => 'Wrangler__Date_Time',
            'data_bindings' => ['datetime' => 'booking_date_time']
        ],
        'expiry_booking_date_time' => [
            'object' => 'Wrangler__Date_Time',
            'method_bindings' => ['datetime' => ['method' => '_expiry_date_time']]
        ],
        'booking_reference' => [
            'object' => 'Wrangler__Dynamic',
            'method_bindings' => ['data' => ['method' => 'get_booking_reference']]
        ],
        'hourly_rate' => [
            'object' => 'Wrangler__Price',
            'data_bindings' => [
                'price' => 'hourly_rate',
                'currency_symbol_left' => 'currency_symbol_left',
                'currency_symbol_right' => 'currency_symbol_right'
            ]
        ],
        'venue_hourly_rate' => [
            'object' => 'Wrangler__Price',
            'data_bindings' => [
                'price' => 'venue_hourly_rate',
                'currency_symbol_left' => 'currency_symbol_left',
                'currency_symbol_right' => 'currency_symbol_right'
            ]
        ],
        'daily_rate' => [
            'object' => 'Wrangler__Price',
            'data_bindings' => [
                'price' => 'daily_rate',
                'currency_symbol_left' => 'currency_symbol_left',
                'currency_symbol_right' => 'currency_symbol_right'
            ]
        ],
        'venue_daily_rate' => [
            'object' => 'Wrangler__Price',
            'data_bindings' => [
                'price' => 'venue_daily_rate',
                'currency_symbol_left' => 'currency_symbol_left',
                'currency_symbol_right' => 'currency_symbol_right'
            ]
        ],
        'monthly_rate' => [
            'object' => 'Wrangler__Price',
            'data_bindings' => [
                'price' => 'monthly_rate',
                'currency_symbol_left' => 'currency_symbol_left',
                'currency_symbol_right' => 'currency_symbol_right'
            ]
        ],
        'venue_monthly_rate' => [
            'object' => 'Wrangler__Price',
            'data_bindings' => [
                'price' => 'venue_monthly_rate',
                'currency_symbol_left' => 'currency_symbol_left',
                'currency_symbol_right' => 'currency_symbol_right'
            ]
        ],
        'map' => [
            'object' => 'Wrangler__Map',
            'data_bindings' => [
                'long' => 'venue_long',
                'lat' => 'venue_lat'
            ]
        ],
        'image' => [
            'object' => 'Wrangler__Image',
            'data_bindings' => [
                'name' => 'image_thumbnail',
                'subject_id' => 'asset_id'
            ]
        ],
        'main_contact_name' => [
            'object' => 'Wrangler__Name',
            'data_bindings' => [
                'first_name' => 'main_user_firstname',
                'last_name' => 'main_user_lastname'
            ]
        ],
        'main_user_phone' => [
            'object' => 'Wrangler__Link',
            'data_bindings' => [
                'phone' => 'main_user_phone',
                'hubspot_id' => 'main_user_hubspot_id'
            ]
        ],
        'main_user_email' => [
            'object' => 'Wrangler__Link',
            'data_bindings' => [
                'email' => 'main_user_email',
                'email_status' => 'main_user_email_status',
                'hubspot_id' => 'main_user_hubspot_id'
            ]
        ],
        'main_user_add_task' => [
            'object' => 'Wrangler__Link',
            'data_bindings' => ['hubspot_id' => 'main_user_hubspot_id']
        ],
        'financial_data' => [
            'object' => 'Wrangler__Json',
            'data_bindings' => ['data' => 'financial_entity_financial_data']
        ],
        'financial_account_user_name' => [
            'object' => 'Wrangler__Name',
            'data_bindings' => [
                'first_name' => 'financial_account_user_firstname',
                'last_name' => 'financial_account_user_lastname'
            ]
        ],
        'financial_account_user_phone' => [
            'object' => 'Wrangler__Link',
            'data_bindings' => [
                'phone' => 'financial_account_user_phone',
                'hubspot_id' => 'financial_account_user_hubspot_id'
            ]
        ],
        'financial_account_user_email' => [
            'object' => 'Wrangler__Link',
            'data_bindings' => [
                'email' => 'financial_account_user_email',
                'email_status' => 'financial_account_user_email_status',
                'hubspot_id' => 'financial_account_user_hubspot_id'
            ]
        ],
        'total_payment' => [
            'object' => 'Wrangler__Price',
            'data_bindings' => [
                'price' => 'payment_amount',
                'currency_symbol_left' => 'currency_symbol_left',
                'currency_symbol_right' => 'currency_symbol_right'
            ]
        ]
    ];

    public function get_booking_reference()
    {
        return 'ZCUBE' . $this->get_id() . $this->get('room_id') . $this->wrangle('reservation_start_date_time')->formatted('admin_ref_date');
    }

    public function get_venue_vat()
    {
        $retVat = 0;
        if (!$this->is_null('venue_vat') && $this->get('venue_vat') > 0)
        {
            $retVat = $this->get('venue_vat');
        }
        return $retVat;
    }

    public function get_venue_address()
    {
        $post_code = '';
        if (!$this->is_null('venue_post_code'))
        {
            $pC = explode(" ", $this->get('venue_post_code'));
            $post_code = $pC[0];
        }
        return ((!$this->is_null('venue_road'))?$this->get('venue_road') . ', ':'') . (($this->get('venue_country_code') == 'GB')?((!$this->is_null('venue_town'))?$this->get('venue_town') . ', ':''):((!$this->is_null('venue_city'))?$this->get('venue_city') . ', ':'')) . ((!$this->is_null('venue_country'))?$this->get('venue_country') . ', ':'') . $post_code;
    }

    protected function _expiry_date_time()
    {
        $expiry = (new DateTime($this->get('booking_date_time')))->add(new DateInterval('PT24H'));
        return $expiry->format("Y-m-d H:i:s");
    }
}