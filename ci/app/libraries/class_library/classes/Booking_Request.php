<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Booking_Request___Collection extends Base__Collection
{
    static protected $_staticObjectType = Booking_Request::class;
}

class Booking_Request extends Base__Ghost_Object
{
    private $_priceWiggleFactor = 0.05;
    private $_commissionPercentage = null;
    private $_commissionVAT = null;

    protected static $_modelName = Model__booking_request::class;
    protected static $_aliases = [
        'email' => [
            'pointer' => 'email',
            'validations' => 'is_email|required'
        ],
        'first_name' => [
            'pointer' => 'first_name',
            'validations' => 'required'
        ],
        'last_name' => [
            'pointer' => 'last_name',
            'validations' => 'required'
        ],
        'phone_number' => [
            'pointer' => 'phone_number',
            'validations' => 'required'
        ],
        'beneficiary_email' => [
            'pointer' => 'beneficiary_email',
            'validations' => 'is_email|required'
        ],
        'beneficiary_first_name' => [
            'pointer' => 'beneficiary_first_name',
            'validations' => 'required'
        ],
        'beneficiary_last_name' => [
            'pointer' => 'beneficiary_last_name',
            'validations' => 'required'
        ],
        'beneficiary_phone_number' => [
            'pointer' => 'beneficiary_phone_number',
            'validations' => 'required'
        ],
        'start_date' => [
            'pointer' => 'start_date',
            'validations' => 'is_date'
        ],
        'end_date' => [
            'pointer' => 'end_date',
            'validations' => 'is_date'
        ],
        'asset_id' => [
            'pointer' => 'asset_id',
            'validations' => 'is_natural_no_zero'
        ],
        'discount' => [
            'pointer' => 'discount',
            'validations' => 'is_numeric_positive|empty_null'
        ],
        'price_control_applied' => [
            'pointer' => 'price_control_applied',
            'validations' => 'is_numeric_positive|empty_null'
        ],
        'price_control_fee' => [
            'pointer' => 'price_control_fee',
            'validations' => 'is_numeric_positive|empty_null'
        ],
        'price_control_fee_vat' => [
            'pointer' => 'price_control_fee_vat',
            'validations' => 'is_numeric_positive|empty_null'
        ],
        'given_price' => [
            'pointer' => 'given_price',
            'validations' => 'is_numeric_positive'
        ],
        'base_price' => [
            'pointer' => 'base_price',
            'validations' => 'is_numeric_positive'
        ],
        'flexible_percent' => [
            'pointer' => 'flexible_percent',
            'validations' => 'is_numeric_positive|empty_null'
        ],
        'flexible_fee' => [
            'pointer' => 'flexible_fee',
            'validations' => 'is_numeric_positive|empty_null'
        ],
        'flexible_fee_vat' => [
            'pointer' => 'flexible_fee_vat',
            'validations' => 'is_numeric_positive|empty_null'
        ],
        'flexible_applied' => [
            'pointer' => 'flexible_applied',
            'validations' => 'is_boolean'
        ],
        'cancel_price' => [
            'pointer' => 'cancel_price',
            'validations' => 'is_numeric_positive|empty_null'
        ],
        'cancel_applied' => [
            'pointer' => 'cancel_applied',
            'validations' => 'is_boolean'
        ],
        'add_on_price' => [
            'pointer' => 'add_on_price',
            'validations' => 'is_numeric_positive'
        ],
        'extra_fee' => [
            'pointer' => 'extra_fee',
            'validations' => 'is_numeric|empty_null'
        ],
        'extra_fee_vat' => [
            'pointer' => 'extra_fee_vat',
            'validations' => 'is_numeric|empty_null'
        ],
        'booking_type' => [
            'pointer' => 'booking_type',
            'validations' => 'is_natural'
        ],
        'payment_type' => [
            'pointer' => 'payment_type',
            'validations' => 'alpha'
        ],
        'payment_nonce' => [
            'pointer' => 'payment_nonce',
            'validations' => 'alpha_dash'
        ],
        'guests' => [
            'pointer' => 'guests',
            'validations' => 'is_natural'
        ],
        'comments' => [
            'pointer' => 'comments',
            'validations' => ''
        ],
        'addOns' => [
            'pointer' => 'addOns',
            'validations' => ''
        ],
        'configuration_id' => [
            'pointer' => 'configuration_id',
            'validations' => 'is_natural'
        ],
        'configuration' => [
            'pointer' => 'configuration',
            'validations' => ''
        ],
        'room_currency_code' => [
            'pointer' => 'room_currency_code',
            'validations' => 'alpha'
        ],
        'currency_symbol_left' => [
            'pointer' => 'currency_symbol_left',
            'validations' => ''
        ],
        'currency_symbol_right' => [
            'pointer' => 'currency_symbol_right',
            'validations' => ''
        ],
        'reservation_id' => [
            'pointer' => 'reservation_id',
            'validations' => 'is_natural_no_zero'
        ],
        'scheduler_event_color' => [
            'pointer' => 'scheduler_event_color',
            'validations' => ''
        ],
        'title' => [
            'pointer' => 'title',
            'validations' => ''
        ],
        'start_moment' => [
            'pointer' => 'start_moment',
            'validations' => ''
        ],
        'end_moment' => [
            'pointer' => 'end_moment',
            'validations' => ''
        ],
        'external_reference' => [
            'pointer' => 'external_reference',
            'validations' => ''
        ],
        'bookingChannel_id' => [
            'pointer' => 'bookingChannel_id',
            'validations' => 'is_natural_no_zero|required'
        ],
        'user_requires_password' => [
            'pointer' => 'user_requires_password',
            'validations' => ''
        ],
        'never_bounce_status' => [
            'pointer' => 'never_bounce_status',
            'validations' => ''
        ]
    ];
    protected static $_wranglers = [
        'price' => [
            'object' => 'Wrangler__Price',
            'data_bindings' => [
                'price' => 'base_price',
                'currency_symbol_left' => 'currency_symbol_left',
                'currency_symbol_right' => 'currency_symbol_right'
            ]
        ],
        'extra_fee' => [
            'object' => 'Wrangler__Price',
            'data_bindings' => [
                'price' => 'extra_fee',
                'currency_symbol_left' => 'currency_symbol_left',
                'currency_symbol_right' => 'currency_symbol_right'
            ]
        ],
        'flexible_fee' => [
            'object' => 'Wrangler__Price',
            'data_bindings' => [
                'price' => 'flexible_fee',
                'currency_symbol_left' => 'currency_symbol_left',
                'currency_symbol_right' => 'currency_symbol_right'
            ]
        ],
        'guests' => [
            'object' => 'Wrangler__Plural',
            'data_bindings' => ['number' => 'guests'],
            'hard_bindings' => [
                'singular' => 'common_guest',
                'plural' => 'common_guests'
            ]
        ],
        'start_date_time' => [
            'object' => 'Wrangler__Date_Time',
            'method_bindings' => [
                'date' => ['method' => 'start_date'],
                'time' => ['method' => 'start_time']
            ]
        ],
        'end_date_time' => [
            'object' => 'Wrangler__Date_Time',
            'method_bindings' => [
                'date' => ['method' => 'end_date'],
                'time' => ['method' => 'end_time']
            ]
        ],
        'duration' => [
            'object' => 'Wrangler__Duration',
            'data_bindings' => [
                'start_date_time' => 'start_date_time',
                'end_date_time' => 'end_date_time'
            ]
        ]
    ];
    protected static $_objects = [
        'slots' => Slot___Collection::class,
        'period' => Booked_Period::class,
        'extras' => Extras___Collection::class,
        'booker' => User::class,
        'beneficiary' => User::class,
        'reservation' => Reservation::class
    ];
    protected static $_immediatelyAccepted = [
        Booking_Channel::WIDGET,
        Booking_Channel::VENUECALENDAR,
        Booking_Channel::ADMIN
    ];

    public function set_commission_percentage($commissionPercentage)
    {
        $this->_commissionPercentage = $commissionPercentage;
    }

    public function set_commission_vat($commissionVAT)
    {
        $this->_commissionVAT = $commissionVAT;
    }

    public function goes_straight_to_accepted()
    {
        return in_array($this->get_booking_channel_id(), static::$_immediatelyAccepted);
    }

    public function get_booking_channel_id()
    {
        return (int)$this->get('bookingChannel_id');
    }

    public function set_room_currency($room)
    {
        $this->set('currency_symbol_left', $room->get('currency_symbol_left'));
        $this->set('currency_symbol_right', $room->get('currency_symbol_right'));
    }

    public function is_daily()
    {
        $bookingType = $this->get('booking_type');
        return ($bookingType == 1 || $bookingType == 2);
    }

    public function get_payment_type_id()
    {
        /*
         * Make sure that any additional payment types get reflected in the 'needs_commission_percentage' method
         */
        $paymentType = $this->get('payment_type');
        $paymentTypeId = null;
        switch ($paymentType)
        {
            case 'invoice':
                $paymentTypeId = Payment_Type::INVOICE;
            break;

            case 'braintree':
            case 'paypal':
                $paymentTypeId = Payment_Type::BRAINTREE;
            break;

            case 'venue':
                $paymentTypeId = Payment_Type::VENUEINVOICE;
            break;

            default:
            break;
        }
        return $paymentTypeId;
    }

    public function start_time()
    {
        return ((!$this->get('period')->is_null_object())?$this->get('period')->get_start():null);
    }

    public function end_time()
    {
        return ((!$this->get('period')->is_null_object())?$this->get('period')->get_end():null);
    }

    public function start_date()
    {
        $period = $this->get('period');
        $startDate = ((!$period->is_null_object())?$period->get_start_date(false):null);
        return (($startDate !== null)?$startDate:$this->get('start_date'));
    }

    public function end_date()
    {
        $period = $this->get('period');
        $endDate = ((!$period->is_null_object())?$period->get_end_date(false):null);
        return (($endDate !== null)?$endDate:$this->get('end_date'));
    }

    public function is_valid()
    {
        return $this->_has_asset_id() && $this->_periods_conform_to_booking_type() && $this->_booking_dates_make_sense();
    }

    public function check_price()
    {
        if ($this->is_true('cancel_applied'))
        {
            $price = $this->get_cancel_price();
            $promisedPrice = $this->get_cancel_price();
        }
        else
        {
            $price = $this->get_price();
            $promisedPrice = ($this->get('given_price') - $this->get_price_control_fee());
        }
        $retVal = true;
        if ($price === null || $price < ($promisedPrice * (1 - $this->_priceWiggleFactor)) || $price < 0 || $price > ($promisedPrice * (1 + $this->_priceWiggleFactor)))
        {
            $retVal = false;
        }
        return $retVal;
    }

    public function get_price()
    {
        return round(($this->get('base_price') + $this->get('add_on_price')), 2);
    }

    public function get_price_with_extra_fee()
    {
        return round(($this->get('base_price') + $this->get('add_on_price') + $this->get('extra_fee') + $this->get('extra_fee_vat')), 2);
    }

    public function get_cancel_price()
    {
        return round(($this->get('cancel_price') + $this->get('add_on_price')), 2);
    }

    public function get_cancel_price_with_extra_fee()
    {
        return round(($this->get('cancel_price') + $this->get('add_on_price') + $this->get('extra_fee') + $this->get('extra_fee_vat')), 2);
    }

    public function get_price_control_fee()
    {
        return round(($this->get('price_control_fee') + $this->get('price_control_fee_vat')), 2);
    }

    public function convert_slots_to_booked_period()
    {
        $retObj = null;
        $slots = $this->get('slots');
        if ($slots->exist())
        {
            $retObj = $slots->as_booked_period($this->get('start_date'), $this->get('asset_id'));
        }
        else
        {
            $retObj = new Base__Null();
        }
        $this->set('period', $retObj);
    }

    public function needs_commission_percentage()
    {
        $retVal = false;
        if ($this->get_payment_type_id() !== Payment_Type::VENUEINVOICE)
        {
            $retVal = true;
        }
        else
        {
            $this->set_commission_percentage(0);
            $this->set_commission_vat(0);
        }
        return $retVal;
    }

    public function get_commission()
    {
        if ($this->_commissionPercentage === null)
        {
            throw new Exception('No commission set. Please alert the Zipcube team.');
        }
        return (ceil($this->get_price() * $this->_commissionPercentage * 1000))/100000;
    }

    public function get_pay_out()
    {
        return ($this->get_price() - $this->get_commission());
    }

    public function get_venue_vat()
    {
        if ($this->_commissionVAT === null)
        {
            throw new Exception('No commission VAT set. Please alert the Zipcube team.');
        }
        $retVat = 0;
        if ($this->_commissionVAT > 0)
        {
            $retVat = $this->_commissionVAT;
        }
        return $retVat;
    }

    public function generate_new_user_profile($beneficiary = false)
    {
        $retObj = new Base__Null();
        if ($beneficiary)
        {
            $retObj = $this->_generate_new_beneficiary_profile();
        }
        else
        {
            $retObj = $this->_generate_new_booker_profile();
        }
        return $retObj;
    }

    public function has_beneficiary()
    {
        return ($this->data_exists('beneficiary_email') && $this->get('beneficiary_email') != $this->get('email'));
    }

    public function has_period()
    {
        $period = $this->get('period');
        return ($period !== null && $period->data_exists('start') && $period->data_exists('end'));
    }

    public function has_slots()
    {
        return ($this->data_exists('start_date') && $this->data_exists('slots'));
    }

    public function generate_booking()
    {
        $booking = new Booking();
        $booking->set('booker_id', $this->get('booker')->get('id'));
        $booking->set('beneficiary_id', $this->get('beneficiary')->get('id'));
        $booking->set('bookingChannel_id', $this->get('bookingChannel_id'));
        $booking->set('created', date("Y-m-d H:i:s"));
        return $booking;
    }

    public function generate_payment_request($bookingId, $transferReference = false)
    {
        $paymentRequest = new Payment_Request();
        $paymentRequest->set('booking_id', $bookingId);
        $paymentRequest->set('payment_type_id', $this->get_payment_type_id());
        if (!$this->is_null('extra_fee') && $this->get('extra_fee') != 0)
        {
            if ($this->is_true('cancel_applied'))
            {
                $paymentRequest->set('amount', ($this->get_cancel_price_with_extra_fee() + $this->get_price_control_fee()));
            }
            else
            {
                $paymentRequest->set('amount', ($this->get_price_with_extra_fee() + $this->get_price_control_fee()));
            }
        }
        else
        {
            if ($this->is_true('cancel_applied'))
            {
                $paymentRequest->set('amount', ($this->get_cancel_price() + $this->get_price_control_fee()));
            }
            else
            {
                $paymentRequest->set('amount', ($this->get_price() + $this->get_price_control_fee()));
            }
        }
        $paymentRequest->set('payment_nonce', $this->get('payment_nonce'));
        $paymentRequest->set('currency', $this->get('room_currency_code'));
        if ($transferReference)
        {
            $paymentRequest->set('external_reference', $this->get('external_reference'));
        }
        return $paymentRequest;
    }

    public function generate_reservation()
    {
        $reservation = new Reservation();
        $reservation->set('reservationStatus_id', Reservation_Status::CREATED);
        $reservation->set('asset_id', $this->get('asset_id'));
        $reservation->set('guests', $this->get('guests'));
        $reservation->set('currency', $this->get('room_currency_code'));
        $reservation->set('comments', $this->get('comments'));
        $reservation->set('configuration', $this->get('configuration'));
        $reservation->set('price', $this->get_price());
        $reservation->set('flexible_applied', $this->is_true('flexible_applied'));
        if ($this->is_true('cancel_applied'))
        {
            $reservation->set('flexible_fee', $this->get('flexible_fee'));
            $reservation->set('flexible_fee_vat', $this->get('flexible_fee_vat'));
        }
        if (!$this->is_null('price_control_applied'))
        {
            $reservation->set('price_control_applied', $this->get('price_control_applied'));
            $reservation->set('price_control_fee', $this->get('price_control_fee'));
            $reservation->set('price_control_fee_vat', $this->get('price_control_fee_vat'));
        }
        // The order of this and the next two lines is important so that commission is calculated correctly. Make more robust.
        $commission = $this->get_commission();
        $reservation->set('toZipcube', $commission);
        $reservation->set('toVenue', $this->get_pay_out());
        $venue_vat = $this->get_venue_vat();
        $reservation->set('toVenue_vat', (($venue_vat > 0)?$commission * ($venue_vat / 100):0));
        $reservation->set('extra_fee', $this->get('extra_fee'));
        $reservation->set('extra_fee_vat', $this->get('extra_fee_vat'));
        $reservation->set('add_on_price', $this->get('add_on_price'));
        $reservation->set('discount_applied', $this->get('discount'));
        $reservation->set('addOns', $this->get('addOns'));
        $reservation->set('period', $this->get('period'));
        return $reservation;
    }

    private function _generate_new_beneficiary_profile()
    {
        $profile = new Profile();
        $profile->set('first_name', $this->get('beneficiary_first_name'));
        $profile->set('last_name', $this->get('beneficiary_last_name'));
        $profile->set('phone_number', $this->get('beneficiary_phone_number'));
        $profile->set('phone_number_search', preg_replace('/[\s\+]/', '', $this->get('beneficiary_phone_number')));
        return $profile;
    }

    private function _generate_new_booker_profile()
    {
        $profile = new Profile();
        $profile->set('first_name', $this->get('first_name'));
        $profile->set('last_name', $this->get('last_name'));
        $profile->set('phone_number', $this->get('phone_number'));
        $profile->set('phone_number_search', preg_replace('/[\s\+]/', '', $this->get('phone_number')));
        return $profile;
    }

    private function _has_asset_id()
    {
        return is_numeric($this->get('asset_id'));
    }

    private function _booking_dates_make_sense()
    {
        $startDate = $this->start_date();
        return ($startDate >= date("Y-m-d") && $this->end_date() >= $startDate);
    }

    private function _periods_conform_to_booking_type()
    {
        return ($this->is_daily() || $this->get('slots')->exist());
    }
}

class Extras___Collection extends Base__Collection
{
    static protected $_staticObjectType = Extra::class;
}

class Extra extends Base__Unbound_Object
{
     protected static $_aliases = [
        'id' => [
            'pointer' => 'id',
            'validations' => 'is_natural|required'
        ],
        'desc' => [
            'pointer' => 'desc',
            'validations' => ''
        ],
        'quantity' => [
            'pointer' => 'quantity',
            'validations' => 'is_natural|required'
        ],
        'price' => [
            'pointer' => 'price',
            'validations' => 'is_numeric'
        ]
    ];
}