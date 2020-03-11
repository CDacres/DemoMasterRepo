<?php

namespace App\Helpers;

use App\Models\Booking\PaymentStatus;

class PaymentHelper
{
    protected static $_valid = [
        PaymentStatus::CREATED,
        PaymentStatus::COMPLETE,
        PaymentStatus::SUBMITTED
    ];

    public function is_pending($payment)
    {
        return ($payment->get_status_id() == PaymentStatus::CREATED);
    }

    public function is_submitted($payment)
    {
        return ($payment->get_status_id() == PaymentStatus::SUBMITTED);
    }

    public function is_refund($payment)
    {
        return ($payment->get_status_id() == PaymentStatus::REFUND);
    }

    public function is_valid($payment)
    {
        return in_array($payment->get_status_id(), static::$_valid);
    }

    public function set_complete($payment)
    {
        $payment->payment_status_id = PaymentStatus::COMPLETE;
    }

    public function is_complete($payment)
    {
        return ($payment->get_status_id() == PaymentStatus::COMPLETE);
    }
}