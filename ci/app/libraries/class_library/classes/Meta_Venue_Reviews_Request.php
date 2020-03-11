<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Meta_Venue_Reviews_Request extends Base__Ghost_Object
{
    protected static $_modelName = Model__meta_venue_reviews_requests::class;
    protected static $_aliases = [
        'asset_id' => [
            'pointer' => 'asset_id',
            'validations' => 'is_natural_no_zero'
        ],
        'recipient_count' => [
            'pointer' => 'recipient_count',
            'validations' => 'is_natural'
        ],
        'existing_count' => [
            'pointer' => 'existing_count',
            'validations' => 'is_natural'
        ]
    ];
    protected static $_objects = ['users' => User___Collection::class];
}