<?php

namespace App\Models\Booking;

use App\LaravelExtensions\Model\LegacyModel;

class PaymentAudit extends LegacyModel
{
    public $timestamps = false;
    public $table = 'payment_audits';

    protected $fillable = [
        'payment_id',
        'paymentStatus_id',
        'user_id',
        'dateTime'
    ];

    public function get_id_field()
    {
        return 'payment_id';
    }

    public function get_status_field()
    {
        return 'paymentStatus_id';
    }
}