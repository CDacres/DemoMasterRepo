<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Payment___Collection extends Base__Collection
{
    private $_has_been_consolidated = false;
    private $_voidObjects;
    private $_continuingObjects;
    private $_refundObjects;
    private $_newPaymentRequest = null;

    static protected $_staticObjectType = Payment::class;

    public function get_total_amount()
    {
        $runningTotal = 0;
        foreach ($this->object(true) as $payment)
        {
            if ($payment->is_valid())
            {
                $runningTotal += $payment->get('amount');
            }
            elseif ($payment->is_refund())
            {
                $runningTotal -= $payment->get('amount');
            }
        }
        return $runningTotal;
    }

    public function get_representative_payment()
    {
        $this->order_by('amount', 'desc');
        return $this->get_first();
    }

    public function consolidate_to_price($targetPrice)
    {
        $reachedTarget = false;
        $this->order_by('amount', 'desc');
        $this->_voidObjects = new Payment___Collection();
        $this->_continuingObjects = new Payment___Collection();
        $this->_refundObjects = new Payment___Collection();
        $runningTotal = 0;
        $debits = new Payment___Collection;
        $credits = new Payment___Collection;
        foreach ($this->object() as $rawPayment)
        {
            if ($rawPayment->is_valid())
            {
                $debits->add_object($rawPayment);
            }
            elseif ($rawPayment->is_refund())
            {
                $credits->add_object($rawPayment);
            }
            $runningTotal += $credits->get_total_amount();
        }
        foreach ($debits->object() as $payment)
        {
            $runningTotal += $payment->get('amount');
            if ($reachedTarget)
            {
                if ($payment->is_complete())
                {
                    $this->_refundObjects->add_object($payment);
                }
                else
                {
                    $this->_voidObjects->add_object($payment);
                }
            }
            elseif ($runningTotal >= $targetPrice)
            {
                $reachedTarget = true;
                $difference = $runningTotal - $targetPrice;
                $oldAmount = $payment->get('amount');
                if ($payment->is_complete())
                {
                    $payment->set('amount', $difference);
                    $this->_refundObjects->add_object($payment);
                }
                elseif (!$payment->is_submitted())
                {
                    $payment->set('amount', ($oldAmount - $difference));
                    $this->_continuingObjects->add_object($payment);
                }
                else
                {
                    $this->_newPaymentRequest = $payment->as_cloned_request($oldAmount - $difference);
                    $this->_voidObjects->add_object($payment);
                }
            }
            else
            {
                if ($payment->is_submitted())
                {
                    $payment->set_complete();
                }
                $this->_continuingObjects->add_object($payment);
            }
        }
        $this->_has_been_consolidated = true;
    }

    public function get_new_payment_request()
    {
        if ($this->ensure_consolidation())
        {
            return $this->_newPaymentRequest;
        }
    }

    public function get_payments_to_refund()
    {
        if ($this->ensure_consolidation())
        {
            return $this->_refundObjects;
        }
    }

    public function get_payments_to_void()
    {
        if ($this->ensure_consolidation())
        {
            return $this->_voidObjects;
        }
    }

    public function get_continuing_valid_payments()
    {
        if ($this->ensure_consolidation())
        {
            return $this->_continuingObjects;
        }
    }

    public function ensure_consolidation()
    {
        if (!$this->_has_been_consolidated)
        {
            throw new Exception("Payments must be consolidated before update.");
        }
        else
        {
            return true;
        }
    }
}

class Payment extends Base__Item implements Interface__Auditable
{
    private $_suppress_audit = false;

    protected static $_tableName = 'payments';
    protected static $_columns = [
        'booking_id' => [
            'pointer' => 'booking_id',
            'validations' => 'is_natural|required'
        ],
        'payment_type_id' => [
            'pointer' => 'paymentType_id',
            'validations' => 'is_natural|required'
        ],
        'external_reference' => [
            'pointer' => 'external_reference',
            'validations' => 'required'
        ],
        'amount' => [
            'pointer' => 'amount',
            'validations' => 'is_numeric_positive|required'
        ],
        'currency' => [
            'pointer' => 'currency',
            'validations' => 'alpha|required'
        ],
        'notes' => [
            'pointer' => 'notes',
            'validations' => ''
        ],
        'payment_status_id' => [
            'pointer' => 'paymentStatus_id',
            'validations' => 'is_natural'
        ],
        'paid_date' => [
            'pointer' => 'paid_date',
            'validations' => 'is_date'
        ],
        'account' => [
            'pointer' => 'account',
            'validations' => ''
        ]
    ];
    protected static $_aliases = [
        'status_name' => [
            'pointer' => 'name',
            'validations' => ''
        ],
        'pay_currency_symbol_left' => [
            'pointer' => 'pay_currency_symbol_left',
            'validations' => 'alpha'
        ],
        'pay_currency_symbol_right' => [
            'pointer' => 'pay_currency_symbol_right',
            'validations' => 'alpha'
        ]
    ];
    protected static $_wranglers = [
        'price' => [
            'object' => 'Wrangler__Price',
            'data_bindings' => [
                'price' => 'amount',
                'currency_symbol_left' => 'pay_currency_symbol_left',
                'currency_symbol_right' => 'pay_currency_symbol_right'
            ]
        ]
    ];

    protected static $_valid = [
        Payment_Status::CREATED,
        Payment_Status::COMPLETE,
        Payment_Status::SUBMITTED
    ];

    public function get_status_id()
    {
        return (int)$this->get('payment_status_id');
    }

    public function as_cloned_request($amount)
    {
        $paymentRequest = new Payment_Request();
        $paymentRequest->set('amount', $amount);
        $paymentRequest->set('booking_id', $this->get('booking_id'));
        $paymentRequest->set('payment_type_id', $this->get('payment_type_id'));
        $paymentRequest->set('currency', $this->get('currency'));
        $paymentRequest->set('clone_payment_ref', $this->get('external_reference'));
        if (!$this->is_pending())
        {
            $paymentRequest->requires_instant_settlement();
        }
        return $paymentRequest;
    }

    public function is_pending()
    {
        return ($this->get_status_id() == Payment_Status::CREATED);
    }

    public function is_submitted()
    {
        return ($this->get_status_id() == Payment_Status::SUBMITTED);
    }

    public function is_refund()
    {
        return ($this->get_status_id() == Payment_Status::REFUND);
    }

    public function is_valid()
    {
        return in_array($this->get_status_id(), static::$_valid);
    }

    public function set_complete()
    {
        $this->set('payment_status_id', Payment_Status::COMPLETE);
    }

    public function is_complete()
    {
        return ($this->get_status_id() == Payment_Status::COMPLETE);
    }

    public function suppress_audit_on_update($bool = true)
    {
        $this->_suppress_audit = $bool;
    }

    public function audit_is_suppressed()
    {
        return $this->_suppress_audit;
    }
}