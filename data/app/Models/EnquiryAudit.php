<?php

namespace App\Models;

use App\LaravelExtensions\Model\LegacyModel;

class EnquiryAudit extends LegacyModel
{
    public $timestamps = false;
    public $table = 'enquiry_audits';

    protected $fillable = [
        'enquiry_id',
        'enquiryStatus_id',
        'user_id',
        'dateTime'
    ];

    public function get_id_field()
    {
        return 'enquiry_id';
    }

    public function get_status_field()
    {
        return 'enquiryStatus_id';
    }
}