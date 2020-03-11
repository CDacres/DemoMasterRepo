<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Payment_Request___Collection extends Base__Collection
{
    static protected $_staticObjectType = Payment_Request::class;
}

class Payment_Request extends Base__Unbound_Object
{
    private static $_instant_settlement = false;

    protected static $_aliases = [
        'booking_id' => [
            'pointer' => 'booking_id',
            'validations' => 'is_natural_no_zero|required'
        ],
        'payment_type_id' => [
            'pointer' => 'payment_type_id',
            'validations' => 'is_natural_no_zero|required'
        ],
        'amount' => [
            'pointer' => 'amount',
            'validations' => 'is_numeric_positive|required'
        ],
        'payment_nonce' => [
            'pointer' => 'payment_nonce',
            'validations' => 'alpha_dash'
        ],
        'clone_payment_ref' => [
            'pointer' => 'clone_payment_ref',
            'validations' => 'alpha_numeric'
        ],
        'currency' => [
            'pointer' => 'currency',
            'validations' => 'alpha|required'
        ],
        'external_reference' => [
            'pointer' => 'external_reference',
            'validations' => ''
        ],
        'paid_date' => [
            'pointer' => 'paid_date',
            'validations' => 'is_date'
        ],
        'account' => [
            'pointer' => 'account',
            'validations' => ''
        ],
        'notes' => [
            'pointer' => 'notes',
            'validations' => ''
        ]
    ];

    public function generate_payment($externalReference)
    {
        $payment = new Payment();
        $payment->set('booking_id', $this->get('booking_id'));
        $payment->set('payment_type_id', $this->get('payment_type_id'));
        $payment->set('external_reference', $externalReference);
        $payment->set('amount', $this->get('amount'));
        $payment->set('currency', $this->get('currency'));
        $payment->set('payment_status_id', Payment_Status::CREATED);
        $payment->set('notes', $this->get('notes'));
        if ($this->get('payment_type_id') == Payment_Type::BACS)
        {
            $payment->set('paid_date', $this->get('paid_date'));
            $payment->set('account', $this->get('account'));
        }
        return $payment;
    }

    public function has_nonce()
    {
        return $this->data_exists('payment_nonce');
    }

    public function can_be_cloned()
    {
        return $this->data_exists('clone_payment_ref');
    }

    public function requires_instant_settlement()
    {
        $this->_instant_settlement = true;
    }

    public function has_instant_settlement()
    {
        return static::$_instant_settlement;
    }
}