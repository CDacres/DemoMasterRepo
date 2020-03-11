<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Enquiry_Audit___Collection extends Abstract__Auditor___Collection
{
    static protected $_staticObjectType = Enquiry_Audit::class;
}

class Enquiry_Audit extends Abstract__Auditor
{
    protected static $_tableName = 'enquiry_audits';

    protected $_itemIdIdentifier = 'enquiry_id';
    protected $_statusIdIdentifier = 'enquiry_status_id';

    protected static $_columns = [
        'enquiry_id' => [
            'pointer' => 'enquiry_id',
            'validations' => 'is_natural|required'
        ],
        'enquiry_status_id' => [
            'pointer' => 'enquiryStatus_id',
            'validations' => 'is_natural|required'
        ]
    ];
}