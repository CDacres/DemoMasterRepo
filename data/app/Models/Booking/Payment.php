<?php

namespace App\Models\Booking;

use App\LaravelExtensions\Model\LegacyModel;
use App\Events\PaymentAuditEvent;
use App\Events\PaymentUpdatedEvent;

class Payment extends LegacyModel
{
    public $timestamps = false;
    public $table = 'payments';

    protected $fillable = [
        'booking_id',
        'paymentType_id',
        'external_reference',
        'amount',
        'currency',
        'notes',
        'paymentStatus_id',
        'paid_date',
        'account'
    ];

    protected $dispatchesEvents = [
        'created' => PaymentAuditEvent::class,
        'updated' => PaymentUpdatedEvent::class
    ];

    private $_suppress_audit = false;
    private $_instant_settlement = false;
    private $_audit_user_id;

    public function get_status_id()
    {
        return (int)$this->paymentStatus_id;
    }

    public function get_audit_user_id()
    {
        return $this->_audit_user_id;
    }

    public function set_audit_user_id($userId)
    {
        $this->_audit_user_id = $userId;
    }

    public function suppress_audit_on_update($bool = true)
    {
        $this->_suppress_audit = $bool;
    }

    public function audit_is_suppressed()
    {
        return $this->_suppress_audit;
    }

    public function requires_instant_settlement()
    {
        $this->_instant_settlement = true;
    }

    public function has_instant_settlement()
    {
        return $this->_instant_settlement;
    }

    public function update_payment_status($status)
    {
        $this->payment_status_id = $status;
        $this->save();
    }
}