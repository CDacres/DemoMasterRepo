<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Invoice_Note extends Base__Item
{
    protected static $_modelName = Model__invoice_notes::class;
    protected static $_tableName = 'invoice_notes';
    protected static $_columns = [
        'period_id' => [
            'pointer' => 'period_id',
            'validations' => 'is_natural'
        ],
        'financial_entity_id' => [
            'pointer' => 'financial_entity_id',
            'validations' => 'is_natural'
        ],
        'country_code' => [
            'pointer' => 'country_code',
            'validations' => ''
        ],
        'notes' => [
            'pointer' => 'notes',
            'validations' => ''
        ],
        'created' => [
            'pointer' => 'created',
            'validations' => 'is_date_time'
        ]
    ];
}