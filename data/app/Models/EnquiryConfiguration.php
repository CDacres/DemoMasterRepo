<?php

namespace App\Models;

use App\LaravelExtensions\Model\LegacyModel;

class EnquiryConfiguration extends LegacyModel
{
    public $timestamps = false;
    public $table = 'enquiries_configurations';

    protected $fillable = [
        'enquiry_id',
        'configuration_id'
    ];

    public function configuration()
    {
        return $this->belongsTo(Configuration::class);
    }
}