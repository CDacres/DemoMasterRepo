<?php

namespace App\Helpers;

use App\Models\Booking\ReservationStatus;

class ReservationHelper
{
    protected static $_usersMove = [
        ReservationStatus::CREATED,
        ReservationStatus::ACCEPTED,
        ReservationStatus::CHECKIN,
        ReservationStatus::AWAITINGUSERREVIEW
    ];

    protected static $_venuesMove = [
        ReservationStatus::BLOCKED,
        ReservationStatus::CREATED,
        ReservationStatus::ACCEPTED,
        ReservationStatus::CHECKIN
    ];

    protected static $_switchable = [
        ReservationStatus::CREATED,
        ReservationStatus::EXPIRED,
        ReservationStatus::DECLINE,
        ReservationStatus::ACCEPTED,
        ReservationStatus::CHECKIN
    ];

    protected static $_progressingNaturally = [
        ReservationStatus::CREATED,
        ReservationStatus::ACCEPTED,
        ReservationStatus::CHECKIN,
        ReservationStatus::AWAITINGHOSTREVIEW,
        ReservationStatus::AWAITINGUSERREVIEW,
        ReservationStatus::COMPLETED
    ];

    protected static $_requiresPayment = [
        ReservationStatus::CANCELLEDBYHOST,
        ReservationStatus::CANCELLEDBYUSER,
        ReservationStatus::CHECKIN,
        ReservationStatus::AWAITINGHOSTREVIEW,
        ReservationStatus::AWAITINGUSERREVIEW,
        ReservationStatus::COMPLETED
    ];

    protected static $_hiddenfromStats = [
        ReservationStatus::BLOCKED,
        ReservationStatus::DELETED
    ];

    protected static $_usuableStatuses = [
        ReservationStatus::CREATED,
        ReservationStatus::ACCEPTED,
        ReservationStatus::DECLINE,
        ReservationStatus::CANCELLEDBYHOST,
        ReservationStatus::CANCELLEDBYUSER,
        ReservationStatus::CHECKIN,
        ReservationStatus::AWAITINGHOSTREVIEW,
        ReservationStatus::AWAITINGUSERREVIEW,
        ReservationStatus::COMPLETED
    ];

    protected static $_bookingPrevious = [
        ReservationStatus::AWAITINGHOSTREVIEW,
        ReservationStatus::AWAITINGUSERREVIEW,
        ReservationStatus::COMPLETED
    ];

    protected static $_voidPayment = [
        ReservationStatus::EXPIRED,
        ReservationStatus::DECLINE
    ];

    protected static $_settlePayment = [
        ReservationStatus::ACCEPTED,
        ReservationStatus::CHECKIN,
        ReservationStatus::AWAITINGHOSTREVIEW,
        ReservationStatus::AWAITINGUSERREVIEW,
        ReservationStatus::COMPLETED
    ];

    protected static $_refundPayment = [
        ReservationStatus::CANCELLEDBYHOST,
        ReservationStatus::CANCELLEDBYUSER
    ];

    protected static $_reservationsEndedGood = [
        ReservationStatus::BLOCKED,
        ReservationStatus::AWAITINGHOSTREVIEW,
        ReservationStatus::AWAITINGUSERREVIEW,
        ReservationStatus::COMPLETED
    ];

    protected static $_reservationsEndedBad = [
        ReservationStatus::EXPIRED,
        ReservationStatus::DECLINE,
        ReservationStatus::DELETED
    ];

    protected static $_reservationsEndedCancel = [
        ReservationStatus::CANCELLEDBYHOST,
        ReservationStatus::CANCELLEDBYUSER
    ];

    protected static $_disallowAdminCancel = [
        ReservationStatus::CREATED,
        ReservationStatus::DELETED,
        ReservationStatus::CANCELLEDBYHOST,
        ReservationStatus::CANCELLEDBYUSER
    ];

    protected static $_hubspotClosedWon = [
        ReservationStatus::ACCEPTED,
        ReservationStatus::CHECKIN,
        ReservationStatus::AWAITINGHOSTREVIEW,
        ReservationStatus::AWAITINGUSERREVIEW,
        ReservationStatus::COMPLETED
    ];

    protected static $_hubspotClosedLost = [
        ReservationStatus::EXPIRED,
        ReservationStatus::DECLINE,
        ReservationStatus::CANCELLEDBYHOST,
        ReservationStatus::CANCELLEDBYUSER
    ];

    protected static $_resendAcceptEmail = [
        ReservationStatus::ACCEPTED,
        ReservationStatus::CHECKIN,
        ReservationStatus::AWAITINGHOSTREVIEW,
        ReservationStatus::AWAITINGUSERREVIEW
    ];

    protected static $_resendDeclineEmail = [ReservationStatus::DECLINE];

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

    public function waiting_on_user($reservation)
    {
        return in_array($reservation->get_status_id(), static::$_usersMove);
    }

    public function waiting_on_venue($reservation)
    {
        return in_array($reservation->get_status_id(), static::$_venuesMove);
    }

    public function booking_is_complete($reservation)
    {
        return $this->has_closed_badly($reservation) || $this->has_closed_well($reservation);
    }

    public function is_pending_response($reservation)
    {
        return ($reservation->get_status_id() === ReservationStatus::CREATED);
    }

    public function is_upcoming($reservation)
    {
        return ($reservation->get_status_id() === ReservationStatus::ACCEPTED);
    }

    public function has_checked_in($reservation)
    {
        return ($reservation->get_status_id() === ReservationStatus::CHECKIN);
    }

    public function has_expired($reservation)
    {
        return ($reservation->get_status_id() === ReservationStatus::EXPIRED);
    }
    
    public function needs_review_reminder($reservation)
    {
        return ($reservation->get_status_id() === ReservationStatus::AWAITINGUSERREVIEW);
    }

    public function has_been_declined($reservation)
    {
        return ($reservation->get_status_id() === ReservationStatus::DECLINE);
    }

    public function has_closed_badly($reservation)
    {
        return in_array($reservation->get_status_id(), static::$_reservationsEndedBad);
    }

    public function should_void_payment($reservation)
    {
        return in_array($reservation->get_status_id(), static::$_voidPayment);
    }

    public function should_settle_payment($reservation)
    {
        return in_array($reservation->get_status_id(), static::$_settlePayment);
    }

    public function should_refund_payment($reservation)
    {
        return in_array($reservation->get_status_id(), static::$_refundPayment);
    }

    public function has_closed_well($reservation)
    {
        return in_array($reservation->get_status_id(), static::$_reservationsEndedGood);
    }

    public function has_been_cancelled($reservation)
    {
        return in_array($reservation->get_status_id(), static::$_reservationsEndedCancel);
    }

    public function can_be_deleted($reservation)
    {
        return ($reservation->get_status_id() === ReservationStatus::BLOCKED);
    }

    public function has_been_deleted($reservation)
    {
        return ($reservation->get_status_id() === ReservationStatus::DELETED);
    }

    public function is_blocked($reservation)
    {
        return $reservation->get_status_id() === ReservationStatus::BLOCKED;
    }

    public function is_progressing_naturally($reservation)
    {
        return in_array($reservation->get_status_id(), static::$_progressingNaturally);
    }

    public function hubspot_closed_won($reservation)
    {
        return in_array($reservation->get_status_id(), static::$_hubspotClosedWon);
    }

    public function hubspot_closed_lost($reservation)
    {
        return in_array($reservation->get_status_id(), static::$_hubspotClosedLost);
    }

    public function resend_request_emails($reservation, $status_id = null)
    {
        $ret = false;
        if ($status_id != null)
        {
            $ret = in_array($reservation->get_status_id(), static::$_usuableStatuses) && in_array($status_id, static::$_usuableStatuses);
        }
        else
        {
            $ret = in_array($reservation->get_status_id(), static::$_usuableStatuses);
        }
        return $ret;
    }

    public function resend_accept_emails($reservation, $status_id = null)
    {
        $ret = false;
        if ($status_id != null)
        {
            $ret = in_array($reservation->get_status_id(), static::$_resendAcceptEmail) && in_array($status_id, static::$_resendAcceptEmail);
        }
        else
        {
            $ret = in_array($reservation->get_status_id(), static::$_resendAcceptEmail);
        }
        return $ret;
    }

    public function resend_decline_emails($reservation, $status_id = null)
    {
        $ret = false;
        if ($status_id != null)
        {
            $ret = in_array($reservation->get_status_id(), static::$_resendDeclineEmail) && in_array($status_id, static::$_resendDeclineEmail);
        }
        else
        {
            $ret = in_array($reservation->get_status_id(), static::$_resendDeclineEmail);
        }
        return $ret;
    }

    public function resend_cancel_emails($reservation, $status_id = null)
    {
        $ret = false;
        if ($status_id != null)
        {
            $ret = in_array($reservation->get_status_id(), static::$_reservationsEndedCancel) && in_array($status_id, static::$_reservationsEndedCancel);
        }
        else
        {
            $ret = in_array($reservation->get_status_id(), static::$_reservationsEndedCancel);
        }
        return $ret;
    }

    public static function get_paymentStatuses()
    {
        return static::$_requiresPayment;
    }

    public static function get_hiddenfromStats()
    {
        return static::$_hiddenfromStats;
    }

    public static function get_usuableStatuses()
    {
        return static::$_usuableStatuses;
    }

    public static function get_bookingPrevious()
    {
        return static::$_bookingPrevious;
    }

    public static function get_progressingNaturally()
    {
        return static::$_progressingNaturally;
    }

    public function get_calendar_colour($reservation)
    {
        $colour = '#cccccc';
        if ($this->is_progressing_naturally($reservation))
        {
            if ($this->is_pending_response($reservation))
            {
                $colour = '#daeffd';
            }
            else
            {
                $colour = '#cff5f2';
            }
        }
        elseif ($this->is_blocked($reservation))
        {
            $colour = '#fddddd';
        }
        return $colour;
    }

    public function shows_on_calendar($reservation)
    {
        return $this->is_progressing_naturally($reservation) || $this->is_blocked($reservation);
    }

    public function can_be_switched($reservation)
    {
        return in_array($reservation->get_status_id(), static::$_switchable);
    }

    public function can_be_cancelled($reservation)
    {
        return !in_array($reservation->get_status_id(), static::$_disallowAdminCancel);
    }

    public function get_relevant_switch_closure_status($reservation)
    {
        $retVal = null;
        switch ($reservation->get_status_id())
        {
            case ReservationStatus::CREATED:
            case ReservationStatus::DECLINE:

                $retVal = ReservationStatus::DECLINE;
            break;

            case ReservationStatus::EXPIRED:

                $retVal = ReservationStatus::EXPIRED;
            break;

            case ReservationStatus::ACCEPTED:
            case ReservationStatus::CHECKIN:

                $retVal = ReservationStatus::CANCELLEDBYHOST;
            break;

            default:
            break;
        }
        return $retVal;
    }

    public function handle_commission($reservation)
    {
        $toVenue = $reservation->toVenue;
        if ($toVenue === null)
        {
            $toVenue = 0;
        }
        $reservation->toZipcube = $reservation->price - $toVenue;
    }

    public function get_commission_rate($reservation)
    {
        $payOut = $reservation->toVenue;
        $price = $reservation->price;
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

    public function get_total_price($reservation)
    {
        $total = $reservation->price;
        if (!is_null($reservation->flexible_fee))
        {
            $total += $this->get_flexible_fee($reservation);
        }
        if (!is_null($reservation->extra_fee))
        {
            $total += $this->get_extra_fee($reservation);
        }
        if (!is_null($reservation->price_control_fee))
        {
            $total += $this->get_price_control_fee($reservation);
        }
        return $total;
    }

    public function get_revenue_price($reservation)
    {
        $revenue = $reservation->toZipcube;
        if (!is_null($reservation->flexible_fee))
        {
            $revenue += $reservation->flexible_fee;
        }
        if (!is_null($reservation->extra_fee))
        {
            $revenue += $reservation->extra_fee;
        }
        if (!is_null($reservation->price_control_fee))
        {
            $revenue += $reservation->price_control_fee;
        }
        return $revenue;
    }

    public function get_extra_fee($reservation)
    {
        $extra_fee = $reservation->extra_fee;
        if (!is_null($reservation->extra_fee_vat))
        {
            $extra_fee += $reservation->extra_fee_vat;
        }
        return $extra_fee;
    }

    public function get_flexible_fee($reservation)
    {
        $flex_fee = $reservation->flexible_fee;
        if (!is_null($reservation->flexible_fee_vat))
        {
            $flex_fee += $reservation->flexible_fee_vat;
        }
        return $flex_fee;
    }

    public function get_price_control_fee($reservation)
    {
        $price_control_fee = $reservation->price_control_fee;
        if (!is_null($reservation->price_control_fee_vat))
        {
            $price_control_fee += $reservation->price_control_fee_vat;
        }
        return $price_control_fee;
    }

    public function _get_display_price($reservation)
    {
        $display_price = $this->get_total_price($reservation);
        if (!is_null($reservation->add_on_price))
        {
            $display_price -= $reservation->add_on_price;
        }
        if (!is_null($reservation->extra_fee))
        {
            $display_price -= $this->get_extra_fee($reservation);
        }
        if (!is_null($reservation->flexible_fee))
        {
            $display_price -= $this->get_flexible_fee($reservation);
        }
        return $display_price;
    }

    public function get_base_venue_price($reservation)
    {
        $base_venue_price = $reservation->price;
        if (!is_null($reservation->add_on_price))
        {
            $base_venue_price -= $reservation->add_on_price;
        }
        return $base_venue_price;
    }

    public function get_payout($reservation)
    {
        $payout = $reservation->toVenue;
        if (!is_null($reservation->toVenue_vat))
        {
            $payout -= $reservation->toVenue_vat;
        }
        return $payout;
    }

    public function append_note($reservation, $message)
    {
        $reservation->zipcube_notes = $reservation->zipcube_notes . "; " . $message;
    }

    public function get_status_label_colour($reservation)
    {
        if ($this->is_pending_response($reservation))
        {
            $retStatus = [
                'name' => 'warning',
                'value' => 1
            ];
        }
        elseif ($this->has_closed_well($reservation) || $this->is_progressing_naturally($reservation))
        {
            $retStatus = [
                'name' => 'success',
                'value' => 2
            ];
        }
        elseif ($this->has_closed_badly($reservation) || $this->has_been_cancelled($reservation))
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