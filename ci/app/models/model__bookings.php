<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__bookings extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Booking::class);
        parent::__construct();
    }

    protected function _user_can_select($object)
    {
        return $this->user_is_admin();
    }

    protected function _user_can_update($object)
    {
        return $this->user_is_admin();
    }

    public function complete_booking_by_id($id, $status)
    {
        $booking = $this->get_base_object_by_id($id);
        if ($booking->exists_in_db() && $booking->is_null('closed'))
        {
            $booking->set('bookingStatus_id', $status);
            $booking->set('closed', date("Y-m-d H:i:s"));
            $this->insert_update($booking);
        }
    }
}