<?php

namespace App\Events;

use App\Models\Booking\Payment;

class PaymentUpdatedEvent extends Event
{
    public function __construct(Payment $payment)
    {
        if (!$payment->audit_is_suppressed())
        {
            $this->_run_audit_event($payment);
        }
    }

    private function _run_audit_event($payment)
    {
        return new PaymentAuditEvent($payment);
    }
}