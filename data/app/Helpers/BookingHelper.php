<?php

namespace App\Helpers;

use App\Models\Booking\BookingChannel;

class BookingHelper
{
    protected static $_immediatelyAccepted = [
        BookingChannel::WIDGET,
        BookingChannel::VENUECALENDAR,
        BookingChannel::ADMIN
    ];

    protected static $_showBookingChannelPercent = [
        BookingChannel::WIDGET,
        BookingChannel::VENUECALENDAR
    ];

    public function goes_straight_to_accepted($booking)
    {
        return in_array($booking->bookingChannel_id, static::$_immediatelyAccepted);
    }

    public function get_shownBookingChannels($booking)
    {
        return in_array($booking->bookingChannel_id, static::$_showBookingChannelPercent);
    }
}