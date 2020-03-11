<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Reservation___Collection extends Base__Collection
{
    static protected $_staticObjectType = Reservation::class;
}

class Reservation extends Base__Item implements Interface__Auditable
{
    private $_suppress_client_email = false;
    private $_suppress_venue_email = false;
    private $_suppress_finances = false;

    protected static $_usersMove = [
        Reservation_Status::CREATED,
        Reservation_Status::ACCEPTED,
        Reservation_Status::CHECKIN,
        Reservation_Status::AWAITINGUSERREVIEW
    ];
    protected static $_venuesMove = [
        Reservation_Status::BLOCKED,
        Reservation_Status::CREATED,
        Reservation_Status::ACCEPTED,
        Reservation_Status::CHECKIN
    ];
    protected static $_switchable = [
        Reservation_Status::CREATED,
        Reservation_Status::EXPIRED,
        Reservation_Status::DECLINE,
        Reservation_Status::ACCEPTED,
        Reservation_Status::CHECKIN
    ];
    protected static $_progressingNaturally = [
        Reservation_Status::CREATED,
        Reservation_Status::ACCEPTED,
        Reservation_Status::CHECKIN,
        Reservation_Status::AWAITINGHOSTREVIEW,
        Reservation_Status::AWAITINGUSERREVIEW,
        Reservation_Status::COMPLETED
    ];
    protected static $_requiresPayment = [
        Reservation_Status::CANCELLEDBYHOST,
        Reservation_Status::CANCELLEDBYUSER,
        Reservation_Status::CHECKIN,
        Reservation_Status::AWAITINGHOSTREVIEW,
        Reservation_Status::AWAITINGUSERREVIEW,
        Reservation_Status::COMPLETED
    ];
    protected static $_requiresFuturePayment = [
        Reservation_Status::ACCEPTED,
        Reservation_Status::CANCELLEDBYHOST,
        Reservation_Status::CANCELLEDBYUSER,
        Reservation_Status::CHECKIN,
        Reservation_Status::AWAITINGHOSTREVIEW,
        Reservation_Status::AWAITINGUSERREVIEW,
        Reservation_Status::COMPLETED
    ];
    protected static $_hiddenfromStats = [
        Reservation_Status::BLOCKED,
        Reservation_Status::DELETED
    ];
    protected static $_usableStatuses = [
        Reservation_Status::CREATED,
        Reservation_Status::ACCEPTED,
        Reservation_Status::DECLINE,
        Reservation_Status::CANCELLEDBYHOST,
        Reservation_Status::CANCELLEDBYUSER,
        Reservation_Status::CHECKIN,
        Reservation_Status::AWAITINGHOSTREVIEW,
        Reservation_Status::AWAITINGUSERREVIEW,
        Reservation_Status::COMPLETED
    ];
    protected static $_bookingPrevious = [
        Reservation_Status::AWAITINGHOSTREVIEW,
        Reservation_Status::AWAITINGUSERREVIEW,
        Reservation_Status::COMPLETED
    ];
    protected static $_reservationsEndedGood = [
        Reservation_Status::BLOCKED,
        Reservation_Status::AWAITINGHOSTREVIEW,
        Reservation_Status::AWAITINGUSERREVIEW,
        Reservation_Status::COMPLETED
    ];
    protected static $_reservationsEndedBad = [
        Reservation_Status::EXPIRED,
        Reservation_Status::DECLINE,
        Reservation_Status::DELETED
    ];
    protected static $_reservationsEndedCancel = [
        Reservation_Status::CANCELLEDBYHOST,
        Reservation_Status::CANCELLEDBYUSER
    ];
    protected static $_showBookingChannelPercent = [
        Booking_Channel::WIDGET,
        Booking_Channel::VENUECALENDAR
    ];
    protected static $_disallowAdminCancel = [
        Reservation_Status::CREATED,
        Reservation_Status::DELETED,
        Reservation_Status::CANCELLEDBYHOST,
        Reservation_Status::CANCELLEDBYUSER
    ];
    protected static $_hubspotClosedWon = [
        Reservation_Status::ACCEPTED,
        Reservation_Status::CHECKIN,
        Reservation_Status::AWAITINGHOSTREVIEW,
        Reservation_Status::AWAITINGUSERREVIEW,
        Reservation_Status::COMPLETED
    ];
    protected static $_hubspotClosedLost = [
        Reservation_Status::EXPIRED,
        Reservation_Status::DECLINE,
        Reservation_Status::CANCELLEDBYHOST,
        Reservation_Status::CANCELLEDBYUSER
    ];
    protected static $_resendAcceptEmail = [
        Reservation_Status::ACCEPTED,
        Reservation_Status::CHECKIN,
        Reservation_Status::AWAITINGHOSTREVIEW,
        Reservation_Status::AWAITINGUSERREVIEW
    ];
    protected static $_resendDeclineEmail = [
        Reservation_Status::DECLINE
    ];

    protected static $_tableName = 'reservations';
    protected static $_modelName = Model__reservations::class;
    protected static $_columns = [
        'booking_id' => [
            'pointer' => 'booking_id',
            'validations' => 'is_natural'
        ],
        'asset_id' => [
            'pointer' => 'asset_id',
            'validations' => 'is_natural|required'
        ],
        'guests' => [
            'pointer' => 'guests',
            'validations' => 'is_natural'
        ],
        'title' => [
            'pointer' => 'title',
            'validations' => ''
        ],
        'currency' => [
            'pointer' => 'currency',
            'validations' => ''
        ],
        'price' => [
            'pointer' => 'price',
            'validations' => 'is_numeric_positive',
            'triggers' => ['update' => '_handle_commission']
        ],
        'toZipcube' => [
            'pointer' => 'toZipcube',
            'validations' => 'is_numeric'
        ],
        'toVenue' => [
            'pointer' => 'toVenue',
            'validations' => 'is_numeric_positive',
            'triggers' => ['update' => '_handle_commission']
        ],
        'toVenue_vat' => [
            'pointer' => 'toVenue_vat',
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
        'discount_applied' => [
            'pointer' => 'discount_applied',
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
        'add_on_price' => [
            'pointer' => 'add_on_price',
            'validations' => 'is_numeric_positive|empty_null'
        ],
        'reservationStatus_id' => [
            'pointer' => 'reservationStatus_id',
            'validations' => 'integer'
        ],
        'comments' => [
            'pointer' => 'comments',
            'validations' => ''
        ],
        'addOns' => [
            'pointer' => 'addOns',
            'validations' => ''
        ],
        'configuration' => [
            'pointer' => 'configuration',
            'validations' => ''
        ],
        'is_paid' => [
            'pointer' => 'is_paid',
            'validations' => 'is_boolean'
        ],
        'zipcube_notes' => [
            'pointer' => 'zipcube_notes',
            'validations' => ''
        ],
        'legacy_reservation_id' => [
            'pointer' => 'legacy_reservation_id',
            'validations' => 'is_natural'
        ],
        'batch_id' => [
            'pointer' => 'batch_id',
            'validations' => 'alpha_dash'
        ],
        'review_token' => [
            'pointer' => 'review_token',
            'validations' => 'alpha_numeric|empty_null'
        ],
        'assigned_user' => [
            'pointer' => 'assigned_user',
            'validations' => 'is_natural|empty_null',
            'access' => 'private'
        ],
        'hubspot_id' => [
            'pointer' => 'hubspot_id',
            'validations' => 'is_natural',
            'access' => 'protected'
        ],
        'source' => [
            'pointer' => 'source',
            'validations' => ''
        ],
        'created' => [
            'pointer' => 'created',
            'validations' => 'is_date_time'
        ],
        'token' => [
            'pointer' => 'token',
            'validations' => 'alpha_numeric|empty_null'
        ],
        'needed_switch' => [
            'pointer' => 'needed_switch',
            'validations' => 'is_boolean'
        ],
        'requires_switch' => [
            'pointer' => 'requires_switch',
            'validations' => 'is_boolean'
        ],
        'switch_datetime' => [
            'pointer' => 'switch_datetime',
            'validations' => 'is_date_time|empty_null'
        ]
    ];
    protected static $_aliases = [
        'start_date_time' => [
            'pointer' => 'start_date_time',
            'validations' => 'is_date_time'
        ],
        'end_date_time' => [
            'pointer' => 'end_date_time',
            'validations' => 'is_date_time'
        ],
        'all_day' => [
            'pointer' => 'all_day',
            'validations' => 'is_boolean'
        ],
        'currency_symbol_left' => [
            'pointer' => 'currency_symbol_left',
            'validations' => 'alpha'
        ],
        'currency_symbol_right' => [
            'pointer' => 'currency_symbol_right',
            'validations' => 'alpha'
        ],
        'current_status_id' => [
            'pointer' => 'current_status_id',
            'validations' => 'is_natural'
        ],
        'booking_closure_status' => [
            'pointer' => 'booking_closure_status',
            'validations' => 'is_natural'
        ],
        'flexible_percent' => [
            'pointer' => 'flexible_percent',
            'validations' => 'is_numeric_positive'
        ],
        'total_price' => [
            'pointer' => 'total_price',
            'validations' => 'is_numeric_positive'
        ],
        'display_price' => [
            'pointer' => 'display_price',
            'validations' => 'is_numeric_positive'
        ],
        'commissionable_amount' => [
            'pointer' => 'commissionable_amount',
            'validations' => 'is_numeric_positive'
        ]
    ];
    protected static $_objects = [
        'period' => Booked_Period::class,
        'payment_details' => Payment___Collection::class,
        'venue_payments' => Reservation_Venue_Payment___Collection::class
    ];
    protected static $_wranglers = [
        'price' => [
            'object' => 'Wrangler__Price',
            'data_bindings' => [
                'price' => 'price',
                'currency_symbol_left' => 'currency_symbol_left',
                'currency_symbol_right' => 'currency_symbol_right'
            ]
        ],
        'extra_fee' => [
            'object' => 'Wrangler__Price',
            'method_bindings' => ['price' => ['method' => '_get_extra_fee']],
            'data_bindings' => [
                'currency_symbol_left' => 'currency_symbol_left',
                'currency_symbol_right' => 'currency_symbol_right'
            ]
        ],
        'flexible_fee' => [
            'object' => 'Wrangler__Price',
            'method_bindings' => ['price' => ['method' => '_get_flexible_fee']],
            'data_bindings' => [
                'currency_symbol_left' => 'currency_symbol_left',
                'currency_symbol_right' => 'currency_symbol_right'
            ]
        ],
        'price_control_fee' => [
            'object' => 'Wrangler__Price',
            'method_bindings' => ['price' => ['method' => '_get_price_control_fee']],
            'data_bindings' => [
                'currency_symbol_left' => 'currency_symbol_left',
                'currency_symbol_right' => 'currency_symbol_right'
            ]
        ],
        'add_on_price' => [
            'object' => 'Wrangler__Price',
            'data_bindings' => [
                'price' => 'add_on_price',
                'currency_symbol_left' => 'currency_symbol_left',
                'currency_symbol_right' => 'currency_symbol_right'
            ]
        ],
        'display_price' => [
            'object' => 'Wrangler__Price',
            'method_bindings' => ['price' => ['method' => '_get_display_price']],
            'data_bindings' => [
                'currency_symbol_left' => 'currency_symbol_left',
                'currency_symbol_right' => 'currency_symbol_right'
            ]
        ],
        'base_venue_price' => [
            'object' => 'Wrangler__Price',
            'method_bindings' => ['price' => ['method' => '_get_base_venue_price']],
            'data_bindings' => [
                'currency_symbol_left' => 'currency_symbol_left',
                'currency_symbol_right' => 'currency_symbol_right'
            ]
        ],
        'total_price' => [
            'object' => 'Wrangler__Price',
            'method_bindings' => ['price' => ['method' => '_get_total_price']],
            'data_bindings' => [
                'currency_symbol_left' => 'currency_symbol_left',
                'currency_symbol_right' => 'currency_symbol_right'
            ]
        ],
        'total_revenue' => [
            'object' => 'Wrangler__Price',
            'method_bindings' => ['price' => ['method' => '_get_revenue_price']],
            'data_bindings' => [
                'currency_symbol_left' => 'currency_symbol_left',
                'currency_symbol_right' => 'currency_symbol_right'
            ]
        ],
        'pay_out' => [
            'object' => 'Wrangler__Price',
            'method_bindings' => ['price' => ['method' => '_get_payout']],
            'data_bindings' => [
                'currency_symbol_left' => 'currency_symbol_left',
                'currency_symbol_right' => 'currency_symbol_right'
            ]
        ],
        'pay_out_without_vat' => [
            'object' => 'Wrangler__Price',
            'data_bindings' => [
                'price' => 'toVenue',
                'currency_symbol_left' => 'currency_symbol_left',
                'currency_symbol_right' => 'currency_symbol_right'
            ]
        ],
        'payout_vat' => [
            'object' => 'Wrangler__Price',
            'data_bindings' => [
                'price' => 'toVenue_vat',
                'currency_symbol_left' => 'currency_symbol_left',
                'currency_symbol_right' => 'currency_symbol_right'
            ]
        ],
        'admin_commission' => [
            'object' => 'Wrangler__Price',
            'data_bindings' => [
                'price' => 'toZipcube',
                'currency_symbol_left' => 'currency_symbol_left',
                'currency_symbol_right' => 'currency_symbol_right'
            ]
        ],
        'reservation_start_date_time' => [
            'object' => 'Wrangler__Date_Time',
            'data_bindings' => ['datetime' => 'start_date_time']
        ],
        'reservation_end_date_time' => [
            'object' => 'Wrangler__Date_Time',
            'data_bindings' => ['datetime' => 'end_date_time']
        ],
        'reservation_duration' => [
            'object' => 'Wrangler__Duration',
            'data_bindings' => [
                'start_date_time' => 'start_date_time',
                'end_date_time' => 'end_date_time'
            ]
        ],
        'reservation_guests' => [
            'object' => 'Wrangler__Guest',
            'data_bindings' => ['number' => 'guests']
        ]
    ];

    public function get_status_id()
    {
        return (int)$this->get('reservationStatus_id');
    }

    public function get_booking_channel_id()
    {
        return (int)$this->get('booking_channel_id');
    }

    protected function _handle_commission()
    {
        $toVenue = $this->get('toVenue');
        if ($toVenue === null)
        {
            $toVenue = 0;
        }
        $this->set('toZipcube', ($this->get('price') - $toVenue));
    }

    public function get_commission_rate()
    {
        $payOut = $this->get('toVenue');
        $price = $this->get('price');
        if ($price > 0)
        {
            $commission = 100 * (($price - $payOut) / $price);
        }
        else
        {
            $commission = 0;
        }
        return $commission;
    }

    public function get_default_commission_rates()
    {
        return [
            5,
            8,
            10,
            12,
            12.4,
            15,
            20,
            25,
            30
        ];
    }

    public function get_transaction_price_total()
    {
        return $this->_get_total_price();
    }

    protected function _get_total_price()
    {
        return $this->get('price') + $this->_get_calculated_prices(true);
    }

    public function get_transaction_gmv_total()
    {
        return $this->_get_gmv_price();
    }

    protected function _get_gmv_price()
    {
        return $this->get('price') + $this->_get_calculated_prices();
    }

    protected function _get_revenue_price()
    {
        return $this->get('toZipcube') + $this->_get_calculated_prices();
    }

    private function _get_calculated_prices($withVAT = false)
    {
        $total = 0;
        if (!$this->is_null('flexible_fee'))
        {
            if ($withVAT)
            {
                $total += $this->_get_flexible_fee();
            }
            else
            {
                $total += $this->get('flexible_fee');
            }
        }
        if (!$this->is_null('extra_fee'))
        {
            if ($withVAT)
            {
                $total += $this->_get_extra_fee();
            }
            else
            {
                $total += $this->get('extra_fee');
            }
        }
        if (!$this->is_null('price_control_fee'))
        {
            if ($withVAT)
            {
                $total += $this->_get_price_control_fee();
            }
            else
            {
                $total += $this->get('price_control_fee');
            }
        }
        return $total;
    }

    public function get_price_update_extra_fee()
    {
        return $this->_get_extra_fee();
    }

    protected function _get_extra_fee()
    {
        $extra_fee = $this->get('extra_fee');
        if (!$this->is_null('extra_fee_vat'))
        {
            $extra_fee += $this->get('extra_fee_vat');
        }
        return $extra_fee;
    }

    public function get_price_update_flexible_fee()
    {
        return $this->_get_flexible_fee();
    }

    protected function _get_flexible_fee()
    {
        $flex_fee = $this->get('flexible_fee');
        if (!$this->is_null('flexible_fee_vat'))
        {
            $flex_fee += $this->get('flexible_fee_vat');
        }
        return $flex_fee;
    }

    public function get_price_update_price_control_fee()
    {
        return $this->_get_price_control_fee();
    }

    protected function _get_price_control_fee()
    {
        $price_control_fee = $this->get('price_control_fee');
        if (!$this->is_null('price_control_fee_vat'))
        {
            $price_control_fee += $this->get('price_control_fee_vat');
        }
        return $price_control_fee;
    }

    protected function _get_display_price()
    {
        $display_price = $this->_get_total_price();
        if (!$this->is_null('add_on_price'))
        {
            $display_price -= $this->get('add_on_price');
        }
        if (!$this->is_null('extra_fee'))
        {
            $display_price -= $this->_get_extra_fee();
        }
        if (!$this->is_null('flexible_fee'))
        {
            $display_price -= $this->_get_flexible_fee();
        }
        return $display_price;
    }

    protected function _get_base_venue_price()
    {
        $base_venue_price = $this->get('price');
        if (!$this->is_null('add_on_price'))
        {
            $base_venue_price -= $this->get('add_on_price');
        }
        return $base_venue_price;
    }

    public function get_payout_amount()
    {
        return $this->_get_payout();
    }

    protected function _get_payout()
    {
        $payout = $this->get('toVenue');
        if (!$this->is_null('toVenue_vat'))
        {
            $payout -= $this->get('toVenue_vat');
        }
        return $payout;
    }

    public function append_note($message)
    {
        $this->set('zipcube_notes', $this->get('zipcube_notes') . "; " . $message);
    }

    public function waiting_on_user()
    {
        return in_array($this->get_status_id(), static::$_usersMove);
    }

    public function waiting_on_venue()
    {
        return in_array($this->get_status_id(), static::$_venuesMove);
    }

    public function booking_is_complete()
    {
        return $this->has_closed_badly() || $this->has_closed_well();
    }

    public function is_pending_response()
    {
        return ($this->get_status_id() === Reservation_Status::CREATED);
    }

    public function is_upcoming()
    {
        return ($this->get_status_id() === Reservation_Status::ACCEPTED);
    }

    public function has_checked_in()
    {
        return ($this->get_status_id() === Reservation_Status::CHECKIN);
    }

    public function has_expired()
    {
        return ($this->get_status_id() === Reservation_Status::EXPIRED);
    }

    public function needs_review_reminder()
    {
        return ($this->get_status_id() === Reservation_Status::AWAITINGUSERREVIEW);
    }

    public function has_closed_badly($setClosureStatus = true)
    {
        if ($setClosureStatus)
        {
            $this->set('booking_closure_status', Booking_Status::FINISHEDBADLY);
        }
        return in_array($this->get_status_id(), static::$_reservationsEndedBad);
    }

    public function has_closed_well($setClosureStatus = true)
    {
        if ($setClosureStatus)
        {
            $this->set('booking_closure_status', Booking_Status::FINISHEDHAPPILY);
        }
        return in_array($this->get_status_id(), static::$_reservationsEndedGood);
    }

    public function has_been_cancelled($setClosureStatus = true)
    {
        if ($setClosureStatus)
        {
            $this->set('booking_closure_status', Booking_Status::CANCELLED);
        }
        return in_array($this->get_status_id(), static::$_reservationsEndedCancel);
    }

    public function can_be_deleted()
    {
        return ($this->get_status_id() === Reservation_Status::BLOCKED);
    }

    public function has_been_deleted()
    {
        return ($this->get_status_id() === Reservation_Status::DELETED);
    }

    public function is_blocked()
    {
        return $this->get_status_id() === Reservation_Status::BLOCKED;
    }

    public function is_progressing_naturally()
    {
        return in_array($this->get_status_id(), static::$_progressingNaturally);
    }

    public function hubspot_closed_won()
    {
        return in_array($this->get_status_id(), static::$_hubspotClosedWon);
    }

    public function hubspot_closed_lost()
    {
        return in_array($this->get_status_id(), static::$_hubspotClosedLost);
    }

    public function resend_request_emails($status_id = null)
    {
        $ret = false;
        if ($status_id != null)
        {
            $ret = in_array($this->get_status_id(), static::$_usableStatuses) && in_array($status_id, static::$_usableStatuses);
        }
        else
        {
            $ret = in_array($this->get_status_id(), static::$_usableStatuses);
        }
        return $ret;
    }

    public function resend_accept_emails($status_id = null)
    {
        $ret = false;
        if ($status_id != null)
        {
            $ret = in_array($this->get_status_id(), static::$_resendAcceptEmail) && in_array($status_id, static::$_resendAcceptEmail);
        }
        else
        {
            $ret = in_array($this->get_status_id(), static::$_resendAcceptEmail);
        }
        return $ret;
    }

    public function resend_decline_emails($status_id = null)
    {
        $ret = false;
        if ($status_id != null)
        {
            $ret = in_array($this->get_status_id(), static::$_resendDeclineEmail) && in_array($status_id, static::$_resendDeclineEmail);
        }
        else
        {
            $ret = in_array($this->get_status_id(), static::$_resendDeclineEmail);
        }
        return $ret;
    }

    public function resend_cancel_emails($status_id = null)
    {
        $ret = false;
        if ($status_id != null)
        {
            $ret = in_array($this->get_status_id(), static::$_reservationsEndedCancel) && in_array($status_id, static::$_reservationsEndedCancel);
        }
        else
        {
            $ret = in_array($this->get_status_id(), static::$_reservationsEndedCancel);
        }
        return $ret;
    }

    public static function get_paymentStatuses()
    {
        return static::$_requiresPayment;
    }

     public static function get_futurePaymentStatuses()
    {
        return static::$_requiresFuturePayment;
    }

    public static function get_hiddenfromStats()
    {
        return static::$_hiddenfromStats;
    }

    public static function get_usableStatuses()
    {
        return static::$_usableStatuses;
    }

    public static function get_bookingPrevious()
    {
        return static::$_bookingPrevious;
    }

    public static function get_progressingNaturally()
    {
        return static::$_progressingNaturally;
    }

    public function get_shownBookingChannels()
    {
        return in_array($this->get_booking_channel_id(), static::$_showBookingChannelPercent);
    }

    public function get_calendar_colour()
    {
        $colour = '#cccccc';
        if ($this->is_progressing_naturally())
        {
            if ($this->is_pending_response())
            {
                $colour = '#daeffd';
            }
            else
            {
                $colour = '#cff5f2';
            }
        }
        elseif ($this->is_blocked())
        {
            $colour = '#fddddd';
        }
        return $colour;
    }

    public function shows_on_calendar()
    {
        return $this->is_progressing_naturally() || $this->is_blocked();
    }

    public function can_be_switched()
    {
        return in_array($this->get_status_id(), static::$_switchable);
    }

    public function can_be_cancelled()
    {
        return !in_array($this->get_status_id(), static::$_disallowAdminCancel);
    }

    public function get_relevant_switch_closure_status()
    {
        $retVal = null;
        switch ($this->get_status_id())
        {
            case Reservation_Status::CREATED:
            case Reservation_Status::DECLINE:

                $retVal = Reservation_Status::DECLINE;
            break;

            case Reservation_Status::EXPIRED:

                $retVal = Reservation_Status::EXPIRED;
            break;

            case Reservation_Status::ACCEPTED:
            case Reservation_Status::CHECKIN:

                $retVal = Reservation_Status::CANCELLEDBYHOST;
            break;

            default:
            break;
        }
        return $retVal;
    }

    public function suppress_emails_on_insert_update($clientbool = true, $venuebool = true)
    {
        $this->_suppress_client_email = $clientbool;
        $this->_suppress_venue_email = $venuebool;
    }

    public function suppress_finances_on_insert_update($bool = true)
    {
        $this->_suppress_finances = $bool;
    }

    public function finances_are_suppressed()
    {
        return $this->_suppress_finances;
    }

    public function client_emails_are_suppressed()
    {
        return $this->_suppress_client_email;
    }

    public function venue_emails_are_suppressed()
    {
        return $this->_suppress_venue_email;
    }

    public function get_status_label_colour()
    {
        if ($this->is_pending_response())
        {
            $retStatus = [
                'name' => 'warning',
                'value' => 1
            ];
        }
        elseif ($this->has_closed_well(false) || $this->is_progressing_naturally())
        {
            $retStatus = [
                'name' => 'success',
                'value' => 2
            ];
        }
        elseif ($this->has_closed_badly(false) || $this->has_been_cancelled(false))
        {
            $retStatus = [
                'name' => 'danger',
                'value' => 3
            ];
        }
        else
        {
            $retStatus = [
                'name' => 'danger',
                'value' => 3
            ];
        }
        return $retStatus;
    }
}
