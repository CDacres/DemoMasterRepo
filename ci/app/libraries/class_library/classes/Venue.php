<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Venue___Collection extends Abstract__Asset___Collection
{
    static protected $_staticObjectType = Venue::class;
}

class Venue extends Abstract__Asset
{
    const PROSPECT = 'Prospect';
    const PROSPECTURL = 'prospect';
    const NEWLISTING = 'New Listing';
    const NEWLISTINGURL = 'newlisting';
    const PENDING = 'Pending';
    const PENDINGURL = 'pending';
    const PICTURE = 'Picture';
    const PICTUREURL = 'picture';
    const SALVAGE = 'Salvage';
    const SALVAGEURL = 'salvage';
    const PREAPPROVED = 'Pre-approved';
    const PREAPPROVEDURL = 'preapproved';
    const LIVE = 'Live';
    const LIVEURL = 'live';
    const REJECTED = 'Rejected';
    const REJECTEDURL = 'rejected';

    protected static $_parentClass = Company::class;
    protected static $_modelName = Model__venues::class;
    protected static $_tableName = 'venues';
    protected static $_columns = [
        'company_id' => [
            'pointer' => 'company_id',
            'validations' => 'is_natural'
        ],
        'name' => [
            'pointer' => 'name',
            'validations' => ''
        ],
        'agree_to_list' => [
            'pointer' => 'agree_to_list',
            'validations' => 'is_boolean'
        ],
        'address' => [
            'pointer' => 'address',
            'validations' => ''
        ],
        'city' => [
            'pointer' => 'city',
            'validations' => 'empty_null'
        ],
        'country' => [
            'pointer' => 'country',
            'validations' => 'empty_null'
        ],
        'country_code' => [
            'pointer' => 'country_code',
            'validations' => 'empty_null'
        ],
        'lat' => [
            'pointer' => 'lat',
            'validations' => 'is_numeric|empty_null'
        ],
        'long' => [
            'pointer' => 'long',
            'validations' => 'is_numeric|empty_null'
        ],
        'currency_code' => [
            'pointer' => 'currency',
            'validations' => ''
        ],
        'phone' => [
            'pointer' => 'phone',
            'validations' => ''
        ],
        'venue_type' => [
            'pointer' => 'venue_type_id',
            'validations' => 'is_natural'
        ],
        'description' => [
            'pointer' => 'description',
            'validations' => ''
        ],
        'non_original_desc' => [
            'pointer' => 'non_original_desc',
            'validations' => 'is_boolean'
        ],
        'address_extras' => [
            'pointer' => 'address_extras',
            'validations' => ''
        ],
        'transport' => [
            'pointer' => 'transport',
            'validations' => ''
        ],
        'website' => [
            'pointer' => 'website',
            'validations' => ''
        ],
        'vat_rate_id' => [
            'pointer' => 'vat_rate_id',
            'validations' => 'is_natural'
        ],
        'financial_entity_id' => [
            'pointer' => 'financial_entity_id',
            'validations' => 'is_natural'
        ],
        'minimum_minutes' => [
            'pointer' => 'minimum_minutes',
            'validations' => 'is_natural'
        ],
        'review_count' => [
            'pointer' => 'review_count',
            'validations' => 'is_natural'
        ],
        'review_score' => [
            'pointer' => 'review_score',
            'validations' => 'is_numeric_positive'
        ],
        'ready_for_approval' => [
            'pointer' => 'ready_for_approval',
            'validations' => 'is_boolean'
        ],
        'uses_live_bookings' => [
            'pointer' => 'uses_live_bookings',
            'validations' => 'is_boolean'
        ],
        'street_number' => [
            'pointer' => 'street_number',
            'validations' => 'empty_null'
        ],
        'road' => [
            'pointer' => 'road',
            'validations' => 'empty_null'
        ],
        'town' => [
            'pointer' => 'town',
            'validations' => 'empty_null'
        ],
        'county' => [
            'pointer' => 'county',
            'validations' => 'empty_null'
        ],
        'post_code' => [
            'pointer' => 'post_code',
            'validations' => 'empty_null'
        ],
        'notes' => [
            'pointer' => 'notes',
            'validations' => ''
        ],
        'source' => [
            'pointer' => 'source',
            'validations' => ''
        ],
        'stage' => [
            'pointer' => 'stage',
            'validations' => ''
        ],
        'assignedAdmin' => [
            'pointer' => 'assignedAdmin',
            'validations' => 'is_natural|empty_null'
        ],
        'sponsored' => [
            'pointer' => 'sponsored',
            'validations' => 'is_boolean',
            'access' => 'private'
        ]
    ];
    protected static $_aliases = [
        'email' => [
            'pointer' => 'email',
            'validations' => ''
        ],
        'email_status' => [
            'pointer' => 'email_status',
            'validations' => ''
        ],
        'hubspot_id' => [
            'pointer' => 'hubspot_id',
            'validations' => ''
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
        'vat_rate' => [
            'pointer' => 'vat_rate',
            'validations' => 'is_numeric'
        ],
        'parent_id' => ['pointer' => 'company_id'],
        'company_name' => [
            'pointer' => 'company_name',
            'validations' => 'alpha_dash'
        ],
        'company_token' => ['pointer' => 'company_token'],
        'currency_symbol_left' => ['pointer' => 'currency_symbol_left'],
        'currency_symbol_right' => ['pointer' => 'currency_symbol_right'],
        'commission_percent_frontend' => ['pointer' => 'commission_percent_frontend'],
        'overall_review_count' => ['pointer' => 'overall_review_count'],
        'overall_review_score' => ['pointer' => 'overall_review_score'],
        'flagged_image_count' => ['pointer' => 'flagged_image_count'],
        'cosmetic_image_count' => ['pointer' => 'cosmetic_image_count'],
        'usage_superset_alias' => ['pointer' => 'usage_superset_alias'],
        'cancellation_days' => ['pointer' => 'cancellation_days'],
        'cancellation_percent' => ['pointer' => 'cancellation_percent']
    ];
    protected static $_wranglers = [
        'website' => [
            'object' => 'Wrangler__Link',
            'data_bindings' => ['website' => 'website']
        ],
        'phone' => [
            'object' => 'Wrangler__Link',
            'data_bindings' => [
                'phone' => 'phone',
                'hubspot_id' => 'hubspot_id'
            ]
        ],
        'email' => [
            'object' => 'Wrangler__Link',
            'data_bindings' => [
                'email' => 'email',
                'email_status' => 'email_status',
                'hubspot_id' => 'hubspot_id'
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
        'map' => [
            'object' => 'Wrangler__Map',
            'data_bindings' => [
                'long' => 'long',
                'lat' => 'lat'
            ]
        ],
        'defaulted_name' => [
            'object' => 'Wrangler__Default',
            'data_bindings' => ['data' => 'name'],
            'hard_bindings' => ['default' => 'common_new_venue']
        ],
        'defaulted_name_length_limited' => [
            'object' => 'Wrangler__Limiter',
            'method_bindings' => ['data' => ['method' => '_defaulted_name']]
        ],
        'address_length_limited' => [
            'object' => 'Wrangler__Limiter',
            'method_bindings' => ['data' => ['method' => '_address']]
        ],
        'review_count' => [
            'object' => 'Wrangler__Plural',
            'data_bindings' => ['number' => 'review_count'],
            'hard_bindings' => [
                'singular' => 'common_person_upper',
                'plural' => 'common_people_upper'
            ]
        ]
    ];
    protected static $_objects = [
        'contact_details' => Profile___Collection::class,
        'rooms' => Simple_Room___Collection::class
    ];

    protected static $_assetType = Asset_Type::VENUE;

    protected function _defaulted_name()
    {
        return $this->wrangle('defaulted_name')->value();
    }

    protected function _address()
    {
        return $this->get('address');
    }

    public function get_venue_address()
    {
        $post_code = '';
        if (!$this->is_null('post_code'))
        {
            $pC = explode(" ", $this->get('post_code'));
            $post_code = $pC[0];
        }
        return ((!$this->is_null('road'))?$this->get('road') . ', ':'') . (($this->get('country_code') == 'GB')?((!$this->is_null('town'))?$this->get('town') . ', ':''):((!$this->is_null('city'))?$this->get('city') . ', ':'')) . ((!$this->is_null('country'))?$this->get('country') . ', ':'') . $post_code;
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
            if ($this->is_null('name'))
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

    public function get_venue_vat()
    {
        $retVat = 0;
        if (!$this->is_null('vat_rate') && $this->get('vat_rate') > 0)
        {
            $retVat = $this->get('vat_rate');
        }
        return $retVat;
    }
}