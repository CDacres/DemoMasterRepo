<?php

namespace App\Events;

use App\Models\Booking\Payment;
use App\Models\Booking\PaymentAudit;

class PaymentAuditEvent extends AuditEvent
{
    public function __construct(Payment $payment)
    {
        $this->_baseClass = PaymentAudit::class;
        parent::__construct($payment);
    }
}