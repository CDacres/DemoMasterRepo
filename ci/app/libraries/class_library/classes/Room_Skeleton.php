<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Room_Skeleton___Collection extends Abstract__Asset___Collection
{
    static protected $_staticObjectType = Room_Skeleton::class;
}

class Room_Skeleton extends Abstract__Asset
{
    protected static $_parentClass = Venue::class;
    protected static $_tableName = 'rooms';
    protected static $_modelName = Model__room_skeletons::class;
    protected static $_columns = [
        'title' => [
            'pointer' => 'title',
            'validations' => ''
        ],
        'venue_id' => [
            'pointer' => 'venue_id',
            'validations' => 'is_natural'
        ],
        'status' => [ //0 = banned
            'pointer' => 'status',
            'validations' => '',
            'access' => 'private'
        ],
        'ready_for_approval' => [
            'pointer' => 'ready_for_approval',
            'validations' => 'is_boolean',
            'access' => 'private'
        ],
        'hidden' => [
            'pointer' => 'hidden',
            'validations' => 'is_boolean',
            'access' => 'private'
        ],
        'description' => [
            'pointer' => 'desc',
            'validations' => ''
        ],
        'non_original_desc' => [
            'pointer' => 'non_original_desc',
            'validations' => 'is_boolean',
            'access' => 'private'
        ],
        'page_views' => [
            'pointer' => 'page_viewed',
            'validations' => 'is_natural'
        ],
        'ranking' => [
            'pointer' => 'ranking',
            'validations' => 'is_natural'
        ],
        'listing_hourly_rate' => [
            'pointer' => 'listing_hourly_rate',
            'validations' => 'is_numeric_positive|empty_null'
        ],
        'currency_code' => [
            'pointer' => 'currency',
            'validations' => ''
        ],
        'usage_id' => [
            'pointer' => 'usage_id',
            'validations' => 'is_natural'
        ],
        'primary_vertical_id' => [
            'pointer' => 'primary_vertical_id',
            'validations' => 'is_natural'
        ],
        'num_of_desks' => [
            'pointer' => 'num_of_desks',
            'validations' => 'is_natural'
        ],
        'office_type_id' => [
            'pointer' => 'office_type_id',
            'validations' => 'is_natural'
        ],
        'office_size' => [
            'pointer' => 'office_size',
            'validations' => 'is_natural'
        ],
        'office_size_unit' => [
            'pointer' => 'office_size_unit',
            'validations' => ''
        ],
        'flexible_percent' => [
            'pointer' => 'flexible_percent',
            'validations' => 'is_numeric_positive|empty_null',
            'access' => 'private'
        ],
        'flexible_enabled' => [
            'pointer' => 'flexible_enabled',
            'validations' => 'is_boolean',
            'access' => 'private'
        ],
        'price_control_percent' => [
            'pointer' => 'price_control_percent',
            'validations' => 'is_numeric_positive|empty_null',
            'access' => 'private'
        ],
        'last_booked' => [
            'pointer' => 'last_booked',
            'validations' => 'is_date_time'
        ],
        'sponsored' => [
            'pointer' => 'sponsored',
            'validations' => 'is_boolean',
            'access' => 'private'
        ],
        'minimum_term' => [
            'pointer' => 'monthly_minimum_months',
            'validations' => 'is_numeric_positive'
        ]
    ];
    protected static $_aliases = [
        'lat' => ['pointer' => 'latitude'],
        'long' => ['pointer' => 'longitude'],
        'venue_name' => ['pointer' => 'venue_name'],
        'venue_desc' => ['pointer' => 'venue_desc'],
        'company_name' => ['pointer' => 'company_name'],
        'company_token' => ['pointer' => 'company_token'],
        'review' => ['pointer' => 'review'],
        'review_count' => ['pointer' => 'review_count'],
        'review_score' => ['pointer' => 'review_score'],
        'website' => [
            'pointer' => 'website',
            'access' => 'private'
        ],
        'address' => [
            'pointer' => 'address',
            'access' => 'private'
        ],
        'venue_city' => ['pointer' => 'venue_city'],
        'venue_country' => ['pointer' => 'venue_country'],
        'venue_country_code' => ['pointer' => 'venue_country_code'],
        'venue_road' => ['pointer' => 'venue_road'],
        'venue_town' => ['pointer' => 'venue_town'],
        'venue_post_code' => [
            'pointer' => 'venue_post_code',
            'access' => 'private'
        ],
        'phone' => [
            'pointer' => 'phone',
            'access' => 'private'
        ],
        'uses_live_bookings' => ['pointer' => 'uses_live_bookings'],
        'venue_agree_to_list' => ['pointer' => 'venue_agree_to_list'],
        'venue_approved' => ['pointer' => 'venue_approved'],
        'venue_enabled' => ['pointer' => 'venue_enabled'],
        'venue_vat_rate' => ['pointer' => 'venue_vat_rate'],
        'company_id' => ['pointer' => 'company_id'],
        'parent_id' => ['pointer' => 'venue_id'],
        'venue_asset_id' => ['pointer' => 'venue_asset_id'],
        'hourly_rate' => ['pointer' => 'hourly_rate'],
        'daily_rate' => ['pointer' => 'daily_rate'],
        'daily_delegate_rate' => ['pointer' => 'daily_delegate_rate'],
        'minimum_spend' => ['pointer' => 'minimum_spend'],
        'monthly_rate' => ['pointer' => 'monthly_rate'],
        'user_discount' => ['pointer' => 'user_discount'],
        'daily_deal_hourly_rate' => ['pointer' => 'daily_deal_hourly_rate'],
        'venue_hourly_rate' => ['pointer' => 'venue_hourly_rate'],
        'venue_daily_rate' => ['pointer' => 'venue_daily_rate'],
        'venue_daily_delegate_rate' => ['pointer' => 'venue_daily_delegate_rate'],
        'venue_monthly_rate' => ['pointer' => 'venue_monthly_rate'],
        'discount_hourly_rate' => ['pointer' => 'discount_hourly_rate'],
        'discount_daily_rate' => ['pointer' => 'discount_daily_rate'],
        'discount_daily_delegate_rate' => ['pointer' => 'discount_daily_delegate_rate'],
        'discount_monthly_rate' => ['pointer' => 'discount_monthly_rate'],
        'discount_daily_deal_hourly_rate' => ['pointer' => 'discount_daily_deal_hourly_rate'],
        'currency_symbol_left' => ['pointer' => 'currency_symbol_left'],
        'currency_symbol_right' => ['pointer' => 'currency_symbol_right'],
        'tag_slug' => ['pointer' => 'tag_slug'],
        'usage_name' => ['pointer' => 'usage_name'],
        'usage_superset' => ['pointer' => 'usage_superset'],
        'usage_superset_itemname' => ['pointer' => 'usage_superset_itemname'],
        'usage_superset_desc' => ['pointer' => 'usage_superset_desc'],
        'usage_superset_short_desc' => ['pointer' => 'usage_superset_short_desc'],
        'usage_superset_alias' => ['pointer' => 'usage_superset_alias'],
        'carousel_title' => ['pointer' => 'carousel_title'],
        'main_venue_user_id' => [
            'pointer' => 'main_venue_user_id',
            'validations' => '',
            'access' => 'private'
        ],
        'main_venue_user_hubspot_id' => [
            'pointer' => 'main_venue_user_hubspot_id',
            'validations' => '',
            'access' => 'private'
        ],
        'main_venue_user_firstname' => [
            'pointer' => 'main_venue_user_firstname',
            'validations' => '',
            'access' => 'private'
        ],
        'main_venue_user_lastname' => [
            'pointer' => 'main_venue_user_lastname',
            'validations' => '',
            'access' => 'private'
        ],
        'main_venue_user_email' => [
            'pointer' => 'main_venue_user_email',
            'validations' => '',
            'access' => 'private'
        ],
        'main_venue_user_email_status' => [
            'pointer' => 'main_venue_user_email_status',
            'validations' => '',
            'access' => 'private'
        ],
        'main_venue_user_phone' => [
            'pointer' => 'main_venue_user_phone',
            'validations' => '',
            'access' => 'private'
        ],
        'main_venue_user_role_id' => [
            'pointer' => 'main_venue_user_role_id',
            'validations' => '',
            'access' => 'private'
        ]
    ];
    protected static $_wranglers = [
        'map' => [
            'object' => 'Wrangler__Map',
            'data_bindings' => [
                'long' => 'long',
                'lat' => 'lat'
            ]
        ],
        'hourly_rate' => [
            'object' => 'Wrangler__Price',
            'method_bindings' => ['price' => ['method' => '_get_hourly_rate']],
            'data_bindings' => [
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
            'method_bindings' => ['price' => ['method' => '_get_daily_rate']],
            'data_bindings' => [
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
        'daily_delegate_rate' => [
            'object' => 'Wrangler__Price',
            'method_bindings' => ['price' => ['method' => '_get_daily_delegate_rate']],
            'data_bindings' => [
                'currency_symbol_left' => 'currency_symbol_left',
                'currency_symbol_right' => 'currency_symbol_right'
            ]
        ],
        'venue_daily_delegate_rate' => [
            'object' => 'Wrangler__Price',
            'data_bindings' => [
                'price' => 'venue_daily_delegate_rate',
                'currency_symbol_left' => 'currency_symbol_left',
                'currency_symbol_right' => 'currency_symbol_right'
            ]
        ],
        'minimum_spend' => [
            'object' => 'Wrangler__Price',
            'data_bindings' => [
                'price' => 'minimum_spend',
                'currency_symbol_left' => 'currency_symbol_left',
                'currency_symbol_right' => 'currency_symbol_right'
            ]
        ],
        'monthly_rate' => [
            'object' => 'Wrangler__Price',
            'method_bindings' => ['price' => ['method' => '_get_monthly_rate']],
            'data_bindings' => [
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
        'daily_deal_hourly_rate' => [
            'object' => 'Wrangler__Price',
            'data_bindings' => [
                'price' => 'daily_deal_hourly_rate',
                'currency_symbol_left' => 'currency_symbol_left',
                'currency_symbol_right' => 'currency_symbol_right'
            ]
        ],
        'discount_hourly_rate' => [
            'object' => 'Wrangler__Price',
            'data_bindings' => [
                'price' => 'discount_hourly_rate',
                'currency_symbol_left' => 'currency_symbol_left',
                'currency_symbol_right' => 'currency_symbol_right'
            ]
        ],
        'discount_daily_rate' => [
            'object' => 'Wrangler__Price',
            'data_bindings' => [
                'price' => 'discount_daily_rate',
                'currency_symbol_left' => 'currency_symbol_left',
                'currency_symbol_right' => 'currency_symbol_right'
            ]
        ],
        'discount_daily_delegate_rate' => [
            'object' => 'Wrangler__Price',
            'data_bindings' => [
                'price' => 'discount_daily_delegate_rate',
                'currency_symbol_left' => 'currency_symbol_left',
                'currency_symbol_right' => 'currency_symbol_right'
            ]
        ],
        'discount_monthly_rate' => [
            'object' => 'Wrangler__Price',
            'data_bindings' => [
                'price' => 'discount_monthly_rate',
                'currency_symbol_left' => 'currency_symbol_left',
                'currency_symbol_right' => 'currency_symbol_right'
            ]
        ],
        'listing_hourly_rate' => [
            'object' => 'Wrangler__Price',
            'data_bindings' => [
                'price' => 'listing_hourly_rate',
                'currency_symbol_left' => 'currency_symbol_left',
                'currency_symbol_right' => 'currency_symbol_right'
            ]
        ],
        'page_views' => [
            'object' => 'Wrangler__Plural',
            'data_bindings' => ['number' => 'page_views'],
            'hard_bindings' => [
                'singular' => 'common_view',
                'plural' => 'common_views'
            ]
        ],
        'venue_review_count' => [
            'object' => 'Wrangler__Plural',
            'data_bindings' => ['number' => 'review_count'],
            'hard_bindings' => [
                'singular' => 'common_person_upper',
                'plural' => 'common_people_upper'
            ]
        ],
        'defaulted_name' => [
            'object' => 'Wrangler__Default',
            'data_bindings' => ['data' => 'title'],
            'hard_bindings' => ['default' => 'common_new_room']
        ],
        'defaulted_name_length_limited' => [
            'object' => 'Wrangler__Limiter',
            'method_bindings' => ['data' => ['method' => '_defaulted_name']]
        ],
        'defaulted_venue_name' => [
            'object' => 'Wrangler__Default',
            'data_bindings' => ['data' => 'venue_name'],
            'hard_bindings' => ['default' => 'common_new_venue']
        ],
        'defaulted_venue_name_length_limited' => [
            'object' => 'Wrangler__Limiter',
            'method_bindings' => ['data' => ['method' => '_defaulted_venue_name']]
        ],
        'address_length_limited' => [
            'object' => 'Wrangler__Limiter',
            'method_bindings' => ['data' => ['method' => '_address']]
        ],
        'review_length_limited' => [
            'object' => 'Wrangler__Limiter',
            'method_bindings' => ['data' => ['method' => '_review']]
        ],
        'main_venue_contact_name' => [
            'object' => 'Wrangler__Name',
            'data_bindings' => [
                'first_name' => 'main_venue_user_firstname',
                'last_name' => 'main_venue_user_lastname'
            ]
        ],
        'main_venue_user_phone' => [
            'object' => 'Wrangler__Link',
            'data_bindings' => [
                'phone' => 'main_venue_user_phone',
                'hubspot_id' => 'main_venue_user_hubspot_id'
            ]
        ],
        'main_venue_user_email' => [
            'object' => 'Wrangler__Link',
            'data_bindings' => [
                'email' => 'main_venue_user_email',
                'email_status' => 'main_venue_user_email_status',
                'hubspot_id' => 'main_venue_user_hubspot_id'
            ]
        ]
    ];

    protected static $_assetType = Asset_Type::ROOM;

    protected function _defaulted_name()
    {
        return $this->wrangle('defaulted_name')->value();
    }

    protected function _defaulted_venue_name()
    {
        return $this->wrangle('defaulted_venue_name')->value();
    }

    protected function _address()
    {
        return $this->get('address');
    }

    protected function _review()
    {
        return $this->get('review');
    }

    public function get_venue_address($showCountry = true)
    {
        $post_code = '';
        if (!$this->is_null('venue_post_code'))
        {
            $pC = explode(" ", $this->get('venue_post_code'));
            $post_code = $pC[0];
        }
        return ((!$this->is_null('venue_road'))?$this->get('venue_road') . ', ':'') . (($this->get('venue_country_code') == 'GB')?((!$this->is_null('venue_town'))?$this->get('venue_town') . ', ':''):((!$this->is_null('venue_city'))?$this->get('venue_city') . ', ':'')) . (($showCountry && !$this->is_null('venue_country'))?$this->get('venue_country') . ', ':'') . $post_code;
    }

    public function get_uncompleted_stages($lang = false)
    {
        $steps = [
            'todo' => 0,
            'stages' => '',
            'trans_stages' => ''
        ];
        if ($lang)
        {
            $CI = &get_instance();
            $CI->lang->load('common', config_item('language_code'));
        }
        if (!$this->is_true('ready_for_approval'))
        {
            $uncompletedSteps = 0;
            $uncompletedStages = [];
            $uncompletedTransStages = [];
            if ($this->is_null('title'))
            {
                ++$uncompletedSteps;
                $uncompletedStages[] = 'Name';
                if ($lang)
                {
                    $uncompletedTransStages[] = $CI->lang->line('common.common_name');
                }
            }
            if ($this->is_null('description'))
            {
                ++$uncompletedSteps;
                $uncompletedStages[] = 'Description';
                if ($lang)
                {
                    $uncompletedTransStages[] = $CI->lang->line('common.common_description');
                }
            }
            if ($uncompletedSteps > 0)
            {
                $steps['todo'] = $uncompletedSteps;
                $steps['stages'] = implode(', ', $uncompletedStages);
                $steps['trans_stages'] = implode(', ', $uncompletedTransStages);
            }
        }
        return $steps;
    }

    protected function _get_hourly_rate()
    {
        $retHour = $this->get('hourly_rate');
        if (!$this->is_null('price_control_percent'))
        {
            $retHour = round($retHour);
        }
        return $retHour;
    }

    protected function _get_daily_rate()
    {
        $retDay = $this->get('daily_rate');
        if (!$this->is_null('price_control_percent'))
        {
            $retDay = round($retDay);
        }
        return $retDay;
    }

    protected function _get_daily_delegate_rate()
    {
        $retDayDelegate = $this->get('daily_delegate_rate');
        if (!$this->is_null('price_control_percent'))
        {
            $retDayDelegate = round($retDayDelegate);
        }
        return $retDayDelegate;
    }

    protected function _get_monthly_rate()
    {
        $retMonth = $this->get('monthly_rate');
        if (!$this->is_null('price_control_percent'))
        {
            $retMonth = round($retMonth);
        }
        return $retMonth;
    }
}
