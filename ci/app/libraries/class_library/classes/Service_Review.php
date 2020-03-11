<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Service_Review extends Base__Item
{
    protected static $_tableName = 'net_promoter_score';
    protected static $_modelName = Model__service_reviews::class;
    protected static $_columns = [
        'user_id' => [
            'pointer' => 'user_id',
            'validations' => 'is_natural|required'
        ],
        'reservation_id' => [
            'pointer' => 'reservation_id',
            'validations' => 'is_natural|required'
        ],
        'rating' => [
            'pointer' => 'rating',
            'validations' => 'is_natural|required'
        ],
        'comment' => [
            'pointer' => 'comment',
            'validations' => ''
        ],
        'site_version' => [
            'pointer' => 'site_version',
            'validations' => ''
        ],
        'created' => [
            'pointer' => 'created',
            'validations' => 'is_date_time'
        ]
    ];
}