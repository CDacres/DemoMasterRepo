<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__stats extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Reservation::class);
        parent::__construct();
    }

    private function _get_currency_mods()
    {
        $retMods = [
            'eurMod' => 1,
            'usdMod' => 1
        ];
        $currencyChangeModel = Model__currency_change::class;
        $this->load->model($currencyChangeModel);
        $currencies = $this->$currencyChangeModel->get_currency_change_collection();
        foreach ($currencies->object() as $currency_change)
        {
            if ($currency_change->get('currFrom') == 'eur' && $currency_change->get('currInto') == 'gbp')
            {
                $retMods['eurMod'] = $currency_change->get('rate');
            }
            if ($currency_change->get('currFrom') == 'usd' && $currency_change->get('currInto') == 'gbp')
            {
                $retMods['usdMod'] = $currency_change->get('rate');
            }
        }
        return $retMods;
    }

    private function _get_booking_created_query($bookingChannel, $type, $startDate, $endDate)
    {
        $query = "SELECT DATE_FORMAT(" . Booking::column('created') . ", '%b %Y') AS date_title, YEAR(" . Booking::column('created') . ") AS year, MONTH(" . Booking::column('created') . ") AS month, " . Reservation::column('price') . " AS price, (CASE WHEN " . Reservation::column('extra_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('extra_fee') . " END) AS extra_fee, (CASE WHEN " . Reservation::column('flexible_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('flexible_fee') . " END) AS flexible_fee, (CASE WHEN " . Reservation::column('price_control_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('price_control_fee') . " END) AS price_control_fee, " . Reservation::column('currency') . " AS currency"
            . " FROM " . Booking::tableName() . ""
            . " INNER JOIN (SELECT " . Reservation::column('booking_id') . " AS bookingid, MAX(" . Reservation::id_column() . ") AS resid FROM " . Reservation::tableName() . " WHERE " . Reservation::column('booking_id') . " IS NOT NULL AND " . Reservation::enabled_column() . " = 1 " . $this->_get_non_hidden_statuses() . " GROUP BY " . Reservation::column('booking_id') . ") alias ON " . Booking::id_column() . " = alias.bookingid"
            . " INNER JOIN " . Reservation::tableName() . " ON alias.resid = " . Reservation::id_column() . " AND " . Reservation::column('booking_id') . " = alias.bookingid"
            . "" . $this->_get_non_venue_payments_join() . ""
            . " WHERE " . $this->_get_non_venue_payments_where(false) . ""
            . "" . $this->_get_non_hidden_statuses() . ""
            . "" . $this->_get_bookingChannel_sql_where($bookingChannel, $type) . ""
            . " AND " . Booking::enabled_column() . " = 1"
            . " AND " . Reservation::enabled_column() . " = 1"
            . " AND " . Booking::column('created') . " <= '" . $startDate . "' AND " . Booking::column('created') . " >= '" . $endDate . "'";
        return $query;
    }

    private function _get_booking_revenue_query($bookingChannel, $type, $startDate, $endDate, $extraWhere = '')
    {
        $query = "SELECT DATE_FORMAT(" . Booking::column('created') . ", '%b %Y') AS date_title, YEAR(" . Booking::column('created') . ") AS year, MONTH(" . Booking::column('created') . ") AS month, alias.toZipcube, alias.extra_fee, alias.flexible_fee, alias.price_control_fee, alias.currency"
            . " FROM " . Booking::tableName() . ""
            . " INNER JOIN (SELECT " . Reservation::column('booking_id') . " AS bookingid, MAX(" . Reservation::id_column() . ") AS resid FROM " . Reservation::tableName() . " WHERE " . Reservation::column('booking_id') . " IS NOT NULL AND " . Reservation::enabled_column() . " = 1 " . $this->_get_non_hidden_statuses() . " GROUP BY " . Reservation::column('booking_id') . ") res_alias ON " . Booking::id_column() . " = res_alias.bookingid"
            . " INNER JOIN (SELECT " . Reservation::column('booking_id') . " AS bookingid, " . Reservation::id_column() . " AS reservation_id, " . Reservation::column('toZipcube') . " AS toZipcube, (CASE WHEN " . Reservation::column('extra_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('extra_fee') . " END) AS extra_fee, (CASE WHEN " . Reservation::column('flexible_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('flexible_fee') . " END) AS flexible_fee, (CASE WHEN " . Reservation::column('price_control_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('price_control_fee') . " END) AS price_control_fee, " . Reservation_Audit::column('reservation_status_id') . " AS status, " . Reservation::column('currency') . " AS currency"
            . " FROM " . Reservation::tableName() . ""
            . " INNER JOIN " . Reservation_Audit::tableName() . " ON " . Reservation::id_column() . " = " . Reservation_Audit::column('reservation_id') . ""
            . " WHERE " . Reservation::column('booking_id') . " IS NOT NULL"
            . " AND " . Reservation::enabled_column() . " = 1"
            . "" . $this->_get_non_hidden_statuses() . ""
            . " ORDER BY " . Reservation_Audit::column('date_time') . " DESC, " . Reservation_Audit::column('reservation_status_id') . " DESC) alias ON " . Booking::id_column() . " = alias.bookingid AND res_alias.resid = alias.reservation_id"
            . "" . $this->_get_non_venue_payments_join() . ""
            . " WHERE status IN (" . Reservation_Status::CREATED . "," . Reservation_Status::ACCEPTED . "," . Reservation_Status::CHECKIN . "," . Reservation_Status::AWAITINGHOSTREVIEW . "," .  Reservation_Status::AWAITINGUSERREVIEW . "," . Reservation_Status::COMPLETED . ")"
            . "" . $this->_get_non_venue_payments_where() . ""
            . "" . $this->_get_bookingChannel_sql_where($bookingChannel, $type) . ""
            . " AND " . Booking::enabled_column() . " = 1"
            . " AND " . Booking::column('created') . " <= '" . $startDate . "' AND " . Booking::column('created') . " >= '" . $endDate . "'"
            . "" . $extraWhere . ""
            . " GROUP BY " . Booking::id_column() . "";
        return $query;
    }

    public function get_monthly_totals($full = false, $bookingChannel = [], $type = null, $start, $end)
    {
        $retMods = $this->_get_currency_mods();
        $startDate = $start->format("Y-m-d");
        $endDate = $end->format("Y-m-d");
        $date_arr = [];

        $users_arr = [];
        $bookings_arr = [];
        $query = "SELECT DATE_FORMAT(" . Booking::column('created') . ", '%b %Y') AS date_title, YEAR(" . Booking::column('created') . ") AS year, MONTH(" . Booking::column('created') . ") AS month, COUNT(DISTINCT " . Booking::column('beneficiary_id') . ") AS user_number, COUNT(DISTINCT " . Booking::id_column() . ") AS book_number"
            . " FROM " . Booking::tableName() . ""
            . " INNER JOIN " . Reservation::tableName() . " ON " . Booking::id_column() . " = " . Reservation::column('booking_id') . ""
            . "" . $this->_get_non_venue_payments_join() . ""
            . " WHERE " . $this->_get_non_venue_payments_where(false) . ""
            . "" . $this->_get_non_hidden_statuses() . ""
            . "" . $this->_get_bookingChannel_sql_where($bookingChannel, $type) . ""
            . " AND " . Booking::enabled_column() . " = 1"
            . " AND " . Reservation::enabled_column() . " = 1"
            . " AND " . Booking::column('created') . " <= '" . $startDate . "' AND " . Booking::column('created') . " >= '" . $endDate . "'"
            . " GROUP BY MONTHNAME(" . Booking::column('created') . "), YEAR(" . Booking::column('created') . ")"
            . " ORDER BY YEAR(" . Booking::column('created') . ") ASC, MONTH(" . Booking::column('created') . ") ASC";
        $book_query = $this->db->query($query);
        foreach ($book_query->result_array() as $book)
        {
            $date_arr[$book['year']][$book['month']] = $book['date_title'];
            $users_arr[$book['date_title']] = $book['user_number'];
            $bookings_arr[$book['date_title']] = $book['book_number'];
        }

        $enquirers_arr = [];
        $enquiry_arr = [];
        $query = "SELECT DATE_FORMAT(" . Enquiry::column('created') . ", '%b %Y') AS date_title, YEAR(" . Enquiry::column('created') . ") AS year, MONTH(" . Enquiry::column('created') . ") AS month, COUNT(DISTINCT " . Enquiry::column('user_id') . ") AS user_number, COUNT(DISTINCT " . Enquiry::id_column() . ") AS enq_number"
            . " FROM " . Enquiry::tableName() . ""
            . " WHERE " . Enquiry::column('created') . " <= '" . $startDate . "' AND " . Enquiry::column('created') . " >= '" . $endDate . "'"
            . " AND " . Enquiry::enabled_column() . " = 1"
            . " GROUP BY MONTHNAME(" . Enquiry::column('created') . "), YEAR(" . Enquiry::column('created') . ")"
            . " ORDER BY YEAR(" . Enquiry::column('created') . ") ASC, MONTH(" . Enquiry::column('created') . ") ASC";
        $enquiry_query = $this->db->query($query);
        foreach ($enquiry_query->result_array() as $enquiry)
        {
            $date_arr[$enquiry['year']][$enquiry['month']] = $enquiry['date_title'];
            $enquirers_arr[$enquiry['date_title']] = $enquiry['user_number'];
            $enquiry_arr[$enquiry['date_title']] = $enquiry['enq_number'];
        }

        $booking_missed_arr = [];
        $query = "SELECT DATE_FORMAT(" . Booking::column('created') . ", '%b %Y') AS date_title, YEAR(" . Booking::column('created') . ") AS year, MONTH(" . Booking::column('created') . ") AS month, COUNT(DISTINCT " . Booking::id_column() . ") AS book_number"
            . " FROM " . Booking::tableName() . ""
            . " INNER JOIN " . Reservation::tableName() . " ON " . Booking::id_column() . " = " . Reservation::column('booking_id') . ""
            . "" . $this->_get_non_venue_payments_join() . ""
            . " WHERE " . $this->_get_non_venue_payments_where(false) . ""
            . "" . $this->_get_non_hidden_statuses() . ""
            . "" . $this->_get_bookingChannel_sql_where($bookingChannel, $type) . ""
            . " AND " . Booking::enabled_column() . " = 1"
            . " AND " . Reservation::enabled_column() . " = 1"
            . " AND " . Booking::column('created') . " <= '" . $startDate . "' AND " . Booking::column('created') . " >= '" . $endDate . "'"
            . " AND " . Booking::column('bookingStatus_id') . " IN (" . Booking_Status::FINISHEDBADLY . ", " . Booking_Status::CANCELLED . ")"
            . " GROUP BY MONTHNAME(" . Booking::column('created') . "), YEAR(" . Booking::column('created') . ")"
            . " ORDER BY YEAR(" . Booking::column('created') . ") ASC, MONTH(" . Booking::column('created') . ") ASC";
        $book_missed_query = $this->db->query($query);
        foreach ($book_missed_query->result_array() as $book_miss)
        {
            $date_arr[$book_miss['year']][$book_miss['month']] = $book_miss['date_title'];
            $booking_missed_arr[$book_miss['date_title']] = $book_miss['book_number'];
        }

        $booking_gmv_arr = [];
        $booking_gmv_query = $this->db->query($this->_get_booking_created_query($bookingChannel, $type, $startDate, $endDate));
        foreach ($booking_gmv_query->result_array() as $booking_gmv)
        {
            $date_arr[$booking_gmv['year']][$booking_gmv['month']] = $booking_gmv['date_title'];
            if (!isset($booking_gmv_arr[$booking_gmv['date_title']]))
            {
                $booking_gmv_arr[$booking_gmv['date_title']] = 0;
            }
            $booking_gmv_arr[$booking_gmv['date_title']] += ($booking_gmv['price'] + $booking_gmv['extra_fee'] + $booking_gmv['flexible_fee'] + $booking_gmv['price_control_fee']) * (($booking_gmv['currency'] == 'EUR')?$retMods['eurMod']:(($booking_gmv['currency'] == 'USD')?$retMods['usdMod']:1));
        }

        $booking_gmv_create_arr = [];
        $query = "SELECT DATE_FORMAT(" . Booking::column('created') . ", '%b %Y') AS date_title, YEAR(" . Booking::column('created') . ") AS year, MONTH(" . Booking::column('created') . ") AS month, alias2.amount AS amount, " . Reservation::column('currency') . " AS currency"
            . " FROM " . Booking::tableName() . ""
            . " INNER JOIN (SELECT " . Reservation::column('booking_id') . " AS bookingid, MAX(" . Reservation::id_column() . ") AS resid FROM " . Reservation::tableName() . " WHERE " . Reservation::column('booking_id') . " IS NOT NULL AND " . Reservation::enabled_column() . " = 1 " . $this->_get_non_hidden_statuses() . " GROUP BY " . Reservation::column('booking_id') . ") alias ON " . Booking::id_column() . " = alias.bookingid"
            . " INNER JOIN " . Reservation::tableName() . " ON alias.resid = " . Reservation::id_column() . " AND " . Reservation::column('booking_id') . " = alias.bookingid"
            . " INNER JOIN (SELECT " . Reservation_Gmv_History::column('reservation_id') . ", " . Reservation_Gmv_History::column('amount') . " FROM (SELECT MIN(" . Reservation_Gmv_History::column('date_time') . ") AS mindate, " . Reservation_Gmv_History::column('reservation_id') . " FROM " . Reservation_Gmv_History::tableName() . " GROUP BY " . Reservation_Gmv_History::column('reservation_id') . ") alias3 INNER JOIN " . Reservation_Gmv_History::tableName() . " ON " . Reservation_Gmv_History::column('date_time') . "=alias3.mindate AND " . Reservation_Gmv_History::column('reservation_id') . "=alias3.reservation_id) alias2 ON alias2.reservation_id=alias.resid"
            . "" . $this->_get_non_venue_payments_join() . ""
            . " WHERE " . $this->_get_non_venue_payments_where(false) . ""
            . "" . $this->_get_non_hidden_statuses() . ""
            . "" . $this->_get_bookingChannel_sql_where($bookingChannel, $type) . ""
            . " AND " . Booking::enabled_column() . " = 1"
            . " AND " . Reservation::enabled_column() . " = 1"
            . " AND " . Booking::column('created') . " <= '" . $startDate . "' AND " . Booking::column('created') . " >= '" . $endDate . "'";
        $booking_gmv_create_query = $this->db->query($query);
        foreach ($booking_gmv_create_query->result_array() as $booking_gmv_create)
        {
            $date_arr[$booking_gmv_create['year']][$booking_gmv_create['month']] = $booking_gmv_create['date_title'];
            if (!isset($booking_gmv_create_arr[$booking_gmv_create['date_title']]))
            {
                $booking_gmv_create_arr[$booking_gmv_create['date_title']] = 0;
            }
            $booking_gmv_create_arr[$booking_gmv_create['date_title']] += ($booking_gmv_create['amount']) * (($booking_gmv_create['currency'] == 'EUR')?$retMods['eurMod']:(($booking_gmv_create['currency'] == 'USD')?$retMods['usdMod']:1));
        }

//        $booking_gmv_comp_arr = [];
//        $booking_gmv_comp_query = $this->db->query($this->_get_booking_created_query($bookingChannel, $type, $startDate, $endDate) . " AND " . Booking::column('bookingStatus_id') . " = " . Booking_Status::FINISHEDHAPPILY);
//        foreach ($booking_gmv_comp_query->result_array() as $booking_gmv_comp)
//        {
//            $date_arr[$booking_gmv_comp['year']][$booking_gmv_comp['month']] = $booking_gmv_comp['date_title'];
//            if (!isset($booking_gmv_comp_arr[$booking_gmv_comp['date_title']]))
//            {
//                $booking_gmv_comp_arr[$booking_gmv_comp['date_title']] = 0;
//            }
//            $booking_gmv_comp_arr[$booking_gmv_comp['date_title']] += ($booking_gmv_comp['price'] + $booking_gmv_comp['extra_fee'] + $booking_gmv_comp['flexible_fee'] + $booking_gmv_comp['price_control_fee']) * (($booking_gmv_comp['currency'] == 'EUR')?$retMods['eurMod']:(($booking_gmv_comp['currency'] == 'USD')?$retMods['usdMod']:1));
//        }

//        $booking_gmv_unclosed_arr = [];
//        $booking_gmv_unclosed_query = $this->db->query($this->_get_booking_created_query($bookingChannel, $type, $startDate, $endDate) . " AND " . Booking::column('bookingStatus_id') . " IS NULL");
//        foreach ($booking_gmv_unclosed_query->result_array() as $booking_gmv_unclosed)
//        {
//            $date_arr[$booking_gmv_unclosed['year']][$booking_gmv_unclosed['month']] = $booking_gmv_unclosed['date_title'];
//            if (!isset($booking_gmv_unclosed_arr[$booking_gmv_unclosed['date_title']]))
//            {
//                $booking_gmv_unclosed_arr[$booking_gmv_unclosed['date_title']] = 0;
//            }
//            $booking_gmv_unclosed_arr[$booking_gmv_unclosed['date_title']] += ($booking_gmv_unclosed['price'] + $booking_gmv_unclosed['extra_fee'] + $booking_gmv_unclosed['flexible_fee'] + $booking_gmv_unclosed['price_control_fee']) * (($booking_gmv_unclosed['currency'] == 'EUR')?$retMods['eurMod']:(($booking_gmv_unclosed['currency'] == 'USD')?$retMods['usdMod']:1));
//        }

        $booking_gmv_closed_badly_arr = [];
        $booking_gmv_closed_badly_query = $this->db->query($this->_get_booking_created_query($bookingChannel, $type, $startDate, $endDate) . " AND " . Booking::column('bookingStatus_id') . " = " . Booking_Status::FINISHEDBADLY);
        foreach ($booking_gmv_closed_badly_query->result_array() as $booking_gmv_closed_badly)
        {
            $date_arr[$booking_gmv_closed_badly['year']][$booking_gmv_closed_badly['month']] = $booking_gmv_closed_badly['date_title'];
            if (!isset($booking_gmv_closed_badly_arr[$booking_gmv_closed_badly['date_title']]))
            {
                $booking_gmv_closed_badly_arr[$booking_gmv_closed_badly['date_title']] = 0;
            }
            $booking_gmv_closed_badly_arr[$booking_gmv_closed_badly['date_title']] += ($booking_gmv_closed_badly['price'] + $booking_gmv_closed_badly['extra_fee'] + $booking_gmv_closed_badly['flexible_fee'] + $booking_gmv_closed_badly['price_control_fee']) * (($booking_gmv_closed_badly['currency'] == 'EUR')?$retMods['eurMod']:(($booking_gmv_closed_badly['currency'] == 'USD')?$retMods['usdMod']:1));
        }

        $booking_gmv_cancel_arr = [];
        $booking_gmv_cancel_query = $this->db->query($this->_get_booking_created_query($bookingChannel, $type, $startDate, $endDate) . " AND " . Booking::column('bookingStatus_id') . " = " . Booking_Status::CANCELLED);
        foreach ($booking_gmv_cancel_query->result_array() as $booking_gmv_cancel)
        {
            $date_arr[$booking_gmv_cancel['year']][$booking_gmv_cancel['month']] = $booking_gmv_cancel['date_title'];
            if (!isset($booking_gmv_cancel_arr[$booking_gmv_cancel['date_title']]))
            {
                $booking_gmv_cancel_arr[$booking_gmv_cancel['date_title']] = 0;
            }
            $booking_gmv_cancel_arr[$booking_gmv_cancel['date_title']] += ($booking_gmv_cancel['price'] + $booking_gmv_cancel['extra_fee'] + $booking_gmv_cancel['flexible_fee'] + $booking_gmv_cancel['price_control_fee']) * (($booking_gmv_cancel['currency'] == 'EUR')?$retMods['eurMod']:(($booking_gmv_cancel['currency'] == 'USD')?$retMods['usdMod']:1));
        }

//        $booking_gmv_actual_arr = [];
//        $query = "SELECT DATE_FORMAT(" . Booking::column('closed') . ", '%b %Y') AS date_title, YEAR(" . Booking::column('closed') . ") AS year, MONTH(" . Booking::column('closed') . ") AS month, " . Reservation::column('price') . " AS price, (CASE WHEN " . Reservation::column('extra_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('extra_fee') . " END) AS extra_fee, (CASE WHEN " . Reservation::column('flexible_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('flexible_fee') . " END) AS flexible_fee, (CASE WHEN " . Reservation::column('price_control_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('price_control_fee') . " END) AS price_control_fee, " . Reservation::column('currency') . " AS currency"
//            . " FROM " . Booking::tableName() . ""
//            . " INNER JOIN " . Reservation::tableName() . " ON " . Booking::id_column() . " = " . Reservation::column('booking_id') . ""
//            . "" . $this->_get_non_venue_payments_join() . ""
//            . " WHERE " . Reservation::column('venuePaymentDateTime') . " IS NOT NULL AND " . Booking::column('bookingStatus_id') . " = " . Booking_Status::FINISHEDHAPPILY . ""
//            . "" . $this->_get_non_venue_payments_where() . ""
//            . "" . $this->_get_non_hidden_statuses() . ""
//            . "" . $this->_get_bookingChannel_sql_where($bookingChannel, $type) . ""
//            . " AND " . Booking::enabled_column() . " = 1"
//            . " AND " . Reservation::enabled_column() . " = 1"
//            . " GROUP BY MONTHNAME(" . Booking::column('closed') . "), YEAR(" . Booking::column('closed') . ")"
//            . " ORDER BY YEAR(" . Booking::column('closed') . ") ASC, MONTH(" . Booking::column('closed') . ") ASC";
//        $booking_gmv_actual_query = $this->db->query($query);
//        foreach ($booking_gmv_actual_query->result_array() as $booking_gmv_actual)
//        {
//            $date_arr[$booking_gmv_actual['year']][$booking_gmv_actual['month']] = $booking_gmv_actual['date_title'];
//            if (!isset($booking_gmv_actual_arr[$booking_gmv_actual['date_title']]))
//            {
//                $booking_gmv_actual_arr[$booking_gmv_actual['date_title']] = 0;
//            }
//            $booking_gmv_actual_arr[$booking_gmv_actual['date_title']] += ($booking_gmv_actual['price'] + $booking_gmv_actual['extra_fee'] + $booking_gmv_actual['flexible_fee'] + $booking_gmv_actual['price_control_fee']) * (($booking_gmv_actual['currency'] == 'EUR')?$retMods['eurMod']:(($booking_gmv_actual['currency'] == 'USD')?$retMods['usdMod']:1));
//        }

        $booking_revenue_arr = [];
        $booking_extra_fee_arr = [];
        $booking_flexible_fee_arr = [];
        $booking_price_control_fee_arr = [];
        $booking_revenue_query = $this->db->query($this->_get_booking_revenue_query($bookingChannel, $type, $startDate, $endDate));
        foreach ($booking_revenue_query->result_array() as $booking_revenue)
        {
            $date_arr[$booking_revenue['year']][$booking_revenue['month']] = $booking_revenue['date_title'];
            if (!isset($booking_revenue_arr[$booking_revenue['date_title']]))
            {
                $booking_revenue_arr[$booking_revenue['date_title']] = 0;
            }
            $booking_revenue_arr[$booking_revenue['date_title']] += ($booking_revenue['toZipcube'] + $booking_revenue['extra_fee'] + $booking_revenue['flexible_fee'] + $booking_revenue['price_control_fee']) * (($booking_revenue['currency'] == 'EUR')?$retMods['eurMod']:(($booking_revenue['currency'] == 'USD')?$retMods['usdMod']:1));
            if (!isset($booking_extra_fee_arr[$booking_revenue['date_title']]))
            {
                $booking_extra_fee_arr[$booking_revenue['date_title']] = 0;
            }
            $booking_extra_fee_arr[$booking_revenue['date_title']] += $booking_revenue['extra_fee'] * (($booking_revenue['currency'] == 'EUR')?$retMods['eurMod']:(($booking_revenue['currency'] == 'USD')?$retMods['usdMod']:1));
            if (!isset($booking_flexible_fee_arr[$booking_revenue['date_title']]))
            {
                $booking_flexible_fee_arr[$booking_revenue['date_title']] = 0;
            }
            $booking_flexible_fee_arr[$booking_revenue['date_title']] += $booking_revenue['flexible_fee'] * (($booking_revenue['currency'] == 'EUR')?$retMods['eurMod']:(($booking_revenue['currency'] == 'USD')?$retMods['usdMod']:1));
            if (!isset($booking_price_control_fee_arr[$booking_revenue['date_title']]))
            {
                $booking_price_control_fee_arr[$booking_revenue['date_title']] = 0;
            }
            $booking_price_control_fee_arr[$booking_revenue['date_title']] += $booking_revenue['price_control_fee'] * (($booking_revenue['currency'] == 'EUR')?$retMods['eurMod']:(($booking_revenue['currency'] == 'USD')?$retMods['usdMod']:1));
        }

        $booking_revenue_comp_arr = [];
        $booking_revenue_comp_query = $this->db->query($this->_get_booking_revenue_query($bookingChannel, $type, $startDate, $endDate, 'AND ' . Booking::column('bookingStatus_id') . ' = ' . Booking_Status::FINISHEDHAPPILY));
        foreach ($booking_revenue_comp_query->result_array() as $booking_revenue_comp)
        {
            $date_arr[$booking_revenue_comp['year']][$booking_revenue_comp['month']] = $booking_revenue_comp['date_title'];
            if (!isset($booking_revenue_comp_arr[$booking_revenue_comp['date_title']]))
            {
                $booking_revenue_comp_arr[$booking_revenue_comp['date_title']] = 0;
            }
            $booking_revenue_comp_arr[$booking_revenue_comp['date_title']] += ($booking_revenue_comp['toZipcube'] + $booking_revenue_comp['extra_fee'] + $booking_revenue_comp['flexible_fee'] + $booking_revenue_comp['price_control_fee']) * (($booking_revenue_comp['currency'] == 'EUR')?$retMods['eurMod']:(($booking_revenue_comp['currency'] == 'USD')?$retMods['usdMod']:1));
        }

        $booking_revenue_unclosed_arr = [];
        $booking_revenue_unclosed_query = $this->db->query($this->_get_booking_revenue_query($bookingChannel, $type, $startDate, $endDate, 'AND ' . Booking::column('bookingStatus_id') . ' IS NULL'));
        foreach ($booking_revenue_unclosed_query->result_array() as $booking_revenue_unclosed)
        {
            $date_arr[$booking_revenue_unclosed['year']][$booking_revenue_unclosed['month']] = $booking_revenue_unclosed['date_title'];
            if (!isset($booking_revenue_unclosed_arr[$booking_revenue_unclosed['date_title']]))
            {
                $booking_revenue_unclosed_arr[$booking_revenue_unclosed['date_title']] = 0;
            }
            $booking_revenue_unclosed_arr[$booking_revenue_unclosed['date_title']] += ($booking_revenue_unclosed['toZipcube'] + $booking_revenue_unclosed['extra_fee'] + $booking_revenue_unclosed['flexible_fee'] + $booking_revenue_unclosed['price_control_fee']) * (($booking_revenue_unclosed['currency'] == 'EUR')?$retMods['eurMod']:(($booking_revenue_unclosed['currency'] == 'USD')?$retMods['usdMod']:1));
        }

        $booking_revenue_closed_badly_arr = [];
        $booking_revenue_closed_badly_query = $this->db->query($this->_get_booking_revenue_query($bookingChannel, $type, $startDate, $endDate, 'AND ' . Booking::column('bookingStatus_id') . ' = ' . Booking_Status::FINISHEDBADLY));
        foreach ($booking_revenue_closed_badly_query->result_array() as $booking_revenue_closed_badly)
        {
            $date_arr[$booking_revenue_closed_badly['year']][$booking_revenue_closed_badly['month']] = $booking_revenue_closed_badly['date_title'];
            if (!isset($booking_revenue_closed_badly_arr[$booking_revenue_closed_badly['date_title']]))
            {
                $booking_revenue_closed_badly_arr[$booking_revenue_closed_badly['date_title']] = 0;
            }
            $booking_revenue_closed_badly_arr[$booking_revenue_closed_badly['date_title']] += ($booking_revenue_closed_badly['toZipcube'] + $booking_revenue_closed_badly['extra_fee'] + $booking_revenue_closed_badly['flexible_fee'] + $booking_revenue_closed_badly['price_control_fee']) * (($booking_revenue_closed_badly['currency'] == 'EUR')?$retMods['eurMod']:(($booking_revenue_closed_badly['currency'] == 'USD')?$retMods['usdMod']:1));
        }

        $booking_revenue_cancel_arr = [];
        $booking_revenue_cancel_query = $this->db->query($this->_get_booking_revenue_query($bookingChannel, $type, $startDate, $endDate, 'AND ' . Booking::column('bookingStatus_id') . ' = ' . Booking_Status::CANCELLED));
        foreach ($booking_revenue_cancel_query->result_array() as $booking_revenue_cancel)
        {
            $date_arr[$booking_revenue_cancel['year']][$booking_revenue_cancel['month']] = $booking_revenue_cancel['date_title'];
            if (!isset($booking_revenue_cancel_arr[$booking_revenue_cancel['date_title']]))
            {
                $booking_revenue_cancel_arr[$booking_revenue_cancel['date_title']] = 0;
            }
            $booking_revenue_cancel_arr[$booking_revenue_cancel['date_title']] += ($booking_revenue_cancel['toZipcube'] + $booking_revenue_cancel['extra_fee'] + $booking_revenue_cancel['flexible_fee'] + $booking_revenue_cancel['price_control_fee']) * (($booking_revenue_cancel['currency'] == 'EUR')?$retMods['eurMod']:(($booking_revenue_cancel['currency'] == 'USD')?$retMods['usdMod']:1));
        }

        $booking_revenue_actual_arr = [];
        $booking_extra_fee_actual_arr = [];
        $booking_flexible_fee_actual_arr = [];
        $booking_price_control_fee_actual_arr = [];
        $booking_revenue_eom_arr = [];
        $query = "SELECT DATE_FORMAT(" . Booking::column('closed') . ", '%b %Y') AS date_title, YEAR(" . Booking::column('closed') . ") AS year, MONTH(" . Booking::column('closed') . ") AS month, " . Reservation::column('toZipcube') . " AS toZipcube, (CASE WHEN " . Reservation::column('extra_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('extra_fee') . " END) AS extra_fee, (CASE WHEN " . Reservation::column('flexible_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('flexible_fee') . " END) AS flexible_fee, (CASE WHEN " . Reservation::column('price_control_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('price_control_fee') . " END) AS price_control_fee, " . Reservation::column('currency') . " AS currency"
            . " FROM " . Booking::tableName() . ""
            . " INNER JOIN " . Reservation::tableName() . " ON " . Booking::id_column() . " = " . Reservation::column('booking_id') . ""
            . " INNER JOIN (SELECT " . Reservation::column('booking_id') . " AS bookingid, MAX(" . Reservation::id_column() . ") AS resid FROM " . Reservation::tableName() . " WHERE " . Reservation::column('booking_id') . " IS NOT NULL AND " . Reservation::enabled_column() . " = 1 " . $this->_get_non_hidden_statuses() . " GROUP BY " . Reservation::column('booking_id') . ") alias ON " . Booking::id_column() . " = alias.bookingid AND " . Reservation::id_column() . " = alias.resid"
            . "" . $this->_get_non_venue_payments_join() . ""
            . " WHERE " . Reservation::column('reservationStatus_id') . " NOT IN (" . Reservation_Status::EXPIRED . "," . Reservation_Status::DECLINE . ")"
            . "" . $this->_get_non_venue_payments_where() . ""
            . "" . $this->_get_non_hidden_statuses() . ""
            . "" . $this->_get_bookingChannel_sql_where($bookingChannel, $type) . ""
            . " AND " . Booking::enabled_column() . " = 1"
            . " AND " . Reservation::enabled_column() . " = 1"
            . " AND " . Booking::column('closed') . " <= '" . $startDate . "' AND " . Booking::column('closed') . " >= '" . $endDate . "'";
        $booking_revenue_actual_query = $this->db->query($query);
        foreach ($booking_revenue_actual_query->result_array() as $booking_revenue_actual)
        {
            $date_arr[$booking_revenue_actual['year']][$booking_revenue_actual['month']] = $booking_revenue_actual['date_title'];
            if (!isset($booking_revenue_actual_arr[$booking_revenue_actual['date_title']]))
            {
                $booking_revenue_actual_arr[$booking_revenue_actual['date_title']] = 0;
            }
            $booking_revenue_actual_arr[$booking_revenue_actual['date_title']] += ($booking_revenue_actual['toZipcube'] + $booking_revenue_actual['extra_fee'] + $booking_revenue_actual['flexible_fee'] + $booking_revenue_actual['price_control_fee']) * (($booking_revenue_actual['currency'] == 'EUR')?$retMods['eurMod']:(($booking_revenue_actual['currency'] == 'USD')?$retMods['usdMod']:1));
            if (!isset($booking_extra_fee_actual_arr[$booking_revenue_actual['date_title']]))
            {
                $booking_extra_fee_actual_arr[$booking_revenue_actual['date_title']] = 0;
            }
            $booking_extra_fee_actual_arr[$booking_revenue_actual['date_title']] += $booking_revenue_actual['extra_fee'] * (($booking_revenue_actual['currency'] == 'EUR')?$retMods['eurMod']:(($booking_revenue_actual['currency'] == 'USD')?$retMods['usdMod']:1));
            if (!isset($booking_flexible_fee_actual_arr[$booking_revenue_actual['date_title']]))
            {
                $booking_flexible_fee_actual_arr[$booking_revenue_actual['date_title']] = 0;
            }
            $booking_flexible_fee_actual_arr[$booking_revenue_actual['date_title']] += $booking_revenue_actual['flexible_fee'] * (($booking_revenue_actual['currency'] == 'EUR')?$retMods['eurMod']:(($booking_revenue_actual['currency'] == 'USD')?$retMods['usdMod']:1));
            if (!isset($booking_price_control_fee_actual_arr[$booking_revenue_actual['date_title']]))
            {
                $booking_price_control_fee_actual_arr[$booking_revenue_actual['date_title']] = 0;
            }
            $booking_price_control_fee_actual_arr[$booking_revenue_actual['date_title']] += $booking_revenue_actual['price_control_fee'] * (($booking_revenue_actual['currency'] == 'EUR')?$retMods['eurMod']:(($booking_revenue_actual['currency'] == 'USD')?$retMods['usdMod']:1));
            if (!isset($booking_revenue_eom_arr[$booking_revenue_actual['date_title']]))
            {
                $booking_revenue_eom_arr[$booking_revenue_actual['date_title']] = 0;
            }
            $booking_revenue_eom_arr[$booking_revenue_actual['date_title']] += ($booking_revenue_actual['toZipcube'] + $booking_revenue_actual['extra_fee'] + $booking_revenue_actual['flexible_fee'] + $booking_revenue_actual['price_control_fee']) * (($booking_revenue_actual['currency'] == 'EUR')?$retMods['eurMod']:(($booking_revenue_actual['currency'] == 'USD')?$retMods['usdMod']:1));
        }

        $booking_vat_actual_arr = [];
        $query = "SELECT DATE_FORMAT(" . Booking::column('closed') . ", '%b %Y') AS date_title, YEAR(" . Booking::column('closed') . ") AS year, MONTH(" . Booking::column('closed') . ") AS month, " . Reservation::column('toVenue_vat') . " AS toVenue_vat, (CASE WHEN " . Reservation::column('extra_fee_vat') . " IS NULL THEN 0 ELSE " . Reservation::column('extra_fee_vat') . " END) AS extra_fee_vat, (CASE WHEN " . Reservation::column('flexible_fee_vat') . " IS NULL THEN 0 ELSE " . Reservation::column('flexible_fee_vat') . " END) AS flexible_fee_vat, (CASE WHEN " . Reservation::column('price_control_fee_vat') . " IS NULL THEN 0 ELSE " . Reservation::column('price_control_fee_vat') . " END) AS price_control_fee_vat, " . Reservation::column('currency') . " AS currency"
            . " FROM " . Booking::tableName() . ""
            . " INNER JOIN " . Reservation::tableName() . " ON " . Booking::id_column() . " = " . Reservation::column('booking_id') . ""
            . " INNER JOIN (SELECT " . Reservation::column('booking_id') . " AS bookingid, MAX(" . Reservation::id_column() . ") AS resid FROM " . Reservation::tableName() . " WHERE " . Reservation::column('booking_id') . " IS NOT NULL AND " . Reservation::enabled_column() . " = 1 " . $this->_get_non_hidden_statuses() . " GROUP BY " . Reservation::column('booking_id') . ") alias ON " . Booking::id_column() . " = alias.bookingid AND " . Reservation::id_column() . " = alias.resid"
            . "" . $this->_get_non_venue_payments_join() . ""
            . " WHERE " . Reservation::column('reservationStatus_id') . " NOT IN (" . Reservation_Status::EXPIRED . "," . Reservation_Status::DECLINE . ")"
            . "" . $this->_get_non_venue_payments_where() . ""
            . "" . $this->_get_non_hidden_statuses() . ""
            . "" . $this->_get_bookingChannel_sql_where($bookingChannel, $type) . ""
            . " AND " . Booking::enabled_column() . " = 1"
            . " AND " . Reservation::enabled_column() . " = 1"
            . " AND " . Booking::column('closed') . " <= '" . $startDate . "' AND " . Booking::column('closed') . " >= '" . $endDate . "'";
        $booking_vat_actual_query = $this->db->query($query);
        foreach ($booking_vat_actual_query->result_array() as $booking_vat_actual)
        {
            $date_arr[$booking_vat_actual['year']][$booking_vat_actual['month']] = $booking_vat_actual['date_title'];
            if (!isset($booking_vat_actual_arr[$booking_vat_actual['date_title']]))
            {
                $booking_vat_actual_arr[$booking_vat_actual['date_title']] = 0;
            }
            $booking_vat_actual_arr[$booking_vat_actual['date_title']] += ($booking_vat_actual['toVenue_vat'] + $booking_vat_actual['extra_fee_vat'] + $booking_vat_actual['flexible_fee_vat'] + $booking_vat_actual['price_control_fee_vat']) * (($booking_vat_actual['currency'] == 'EUR')?$retMods['eurMod']:(($booking_vat_actual['currency'] == 'USD')?$retMods['usdMod']:1));
        }

        $query = "SELECT DATE_FORMAT(" . Booked_Period::column('end') . ", '%b %Y') AS date_title, YEAR(" . Booked_Period::column('end') . ") AS year, MONTH(" . Booked_Period::column('end') . ") AS month, " . Reservation::column('toZipcube') . " AS toZipcube, (CASE WHEN " . Reservation::column('extra_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('extra_fee') . " END) AS extra_fee, (CASE WHEN " . Reservation::column('flexible_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('flexible_fee') . " END) AS flexible_fee, (CASE WHEN " . Reservation::column('price_control_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('price_control_fee') . " END) AS price_control_fee, " . Reservation::column('currency') . " AS currency"
            . " FROM " . Booking::tableName() . ""
            . " INNER JOIN " . Reservation::tableName() . " ON " . Booking::id_column() . " = " . Reservation::column('booking_id') . ""
            . " INNER JOIN (SELECT " . Reservation::column('booking_id') . " AS bookingid, MAX(" . Reservation::id_column() . ") AS resid FROM " . Reservation::tableName() . " WHERE " . Reservation::column('booking_id') . " IS NOT NULL AND " . Reservation::enabled_column() . " = 1 " . $this->_get_non_hidden_statuses() . " GROUP BY " . Reservation::column('booking_id') . ") alias ON " . Booking::id_column() . " = alias.bookingid AND " . Reservation::id_column() . " = alias.resid"
            . " INNER JOIN " . Booked_Period::tableName() . " ON " . Reservation::id_column() . " = " . Booked_Period::column('reservation_id') . ""
            . "" . $this->_get_non_venue_payments_join() . ""
            . " WHERE " . Reservation::column('reservationStatus_id') . " NOT IN (" . Reservation_Status::EXPIRED . "," . Reservation_Status::DECLINE . ")"
            . " AND " . Booking::column('closed') . " IS NULL"
            . "" . $this->_get_non_venue_payments_where() . ""
            . "" . $this->_get_non_hidden_statuses() . ""
            . "" . $this->_get_bookingChannel_sql_where($bookingChannel, $type) . ""
            . " AND " . Booking::enabled_column() . " = 1"
            . " AND " . Reservation::enabled_column() . " = 1"
            . " AND " . Booked_Period::column('end') . " <= '" . $startDate . "' AND " . Booked_Period::column('end') . " >= '" . $endDate . "'";
        $booking_revenue_eom_query = $this->db->query($query);
        foreach ($booking_revenue_eom_query->result_array() as $booking_revenue_eom)
        {
            $date_arr[$booking_revenue_eom['year']][$booking_revenue_eom['month']] = $booking_revenue_eom['date_title'];
            if (!isset($booking_revenue_eom_arr[$booking_revenue_eom['date_title']]))
            {
                $booking_revenue_eom_arr[$booking_revenue_eom['date_title']] = 0;
            }
            $booking_revenue_eom_arr[$booking_revenue_eom['date_title']] += ($booking_revenue_eom['toZipcube'] + $booking_revenue_eom['extra_fee'] + $booking_revenue_eom['flexible_fee'] + $booking_revenue_eom['price_control_fee']) * (($booking_revenue_eom['currency'] == 'EUR')?$retMods['eurMod']:(($booking_revenue_eom['currency'] == 'USD')?$retMods['usdMod']:1));
        }

        $booking_invoice_arr = [];
        $query = "SELECT DATE_FORMAT(" . Booked_Period::column('start') . ", '%b %Y') AS date_title, YEAR(" . Booked_Period::column('start') . ") AS year, MONTH(" . Booked_Period::column('start') . ") AS month, validpayments.amount, (CASE WHEN refundpayments.amount IS NULL THEN 0 ELSE refundpayments.amount END) AS refund, " . Reservation::column('currency') . " AS currency"
            . " FROM " . Booking::tableName() . ""
            . " INNER JOIN " . Reservation::tableName() . " ON " . Booking::id_column() . " = " . Reservation::column('booking_id') . ""
            . " INNER JOIN " . Booked_Period::tableName() . " ON " . Reservation::id_column() . " = " . Booked_Period::column('reservation_id') . ""
            . " LEFT JOIN (SELECT " . Payment::column('amount') . " AS amount, " . Payment::column('booking_id') . " AS booking_id FROM " . Payment::tableName() . " WHERE " . Payment::column('payment_type_id') . " = " . Payment_Type::INVOICE . " AND " . Payment::enabled_column() . " = 1 AND " . Payment::column('external_reference') . " <> 'STRIPE' AND " . Payment::column('external_reference') . " <> 'paypal' AND " . Payment::column('payment_status_id') . " IN (" . Payment_Status::CREATED . "," . Payment_Status::COMPLETE . "," . Payment_Status::SUBMITTED . ")) AS validpayments ON " . Booking::id_column() . " = validpayments.booking_id"
            . " LEFT JOIN (SELECT " . Payment::column('amount') . " AS amount, " . Payment::column('booking_id') . " AS booking_id FROM " . Payment::tableName() . " WHERE " . Payment::column('payment_type_id') . " = " . Payment_Type::INVOICE . " AND " . Payment::enabled_column() . " = 1 AND " . Payment::column('external_reference') . " <> 'STRIPE' AND " . Payment::column('external_reference') . " <> 'paypal' AND " . Payment::column('payment_status_id') . " = " . Payment_Status::REFUND . ") AS refundpayments ON " . Booking::id_column() . " = refundpayments.booking_id"
            . " WHERE validpayments.amount IS NOT NULL"
            . "" . $this->_get_bookingChannel_sql_where($bookingChannel, $type) . ""
            . " AND " . Booking::enabled_column() . " = 1"
            . " AND " . Reservation::enabled_column() . " = 1"
            . " AND " . Reservation::column('reservationStatus_id') . " IN (" . Reservation_Status::CREATED . "," . Reservation_Status::ACCEPTED . "," . Reservation_Status::CHECKIN . "," . Reservation_Status::AWAITINGHOSTREVIEW . "," .  Reservation_Status::AWAITINGUSERREVIEW . "," . Reservation_Status::COMPLETED . ")"
            . " AND " . Booked_Period::column('start') . " <= '" . $startDate . "' AND " . Booked_Period::column('start') . " >= '" . $endDate . "'";
        $booking_invoice_query = $this->db->query($query);
        foreach ($booking_invoice_query->result_array() as $booking_invoice)
        {
            $date_arr[$booking_invoice['year']][$booking_invoice['month']] = $booking_invoice['date_title'];
            if (!isset($booking_invoice_arr[$booking_invoice['date_title']]))
            {
                $booking_invoice_arr[$booking_invoice['date_title']] = 0;
            }
            $booking_invoice_arr[$booking_invoice['date_title']] += ($booking_invoice['amount'] - $booking_invoice['refund']) * (($booking_invoice['currency'] == 'EUR')?$retMods['eurMod']:(($booking_invoice['currency'] == 'USD')?$retMods['usdMod']:1));
        }

        $booking_non_refund_revenue_actual_arr = [];
        $booking_non_refund_extra_fee_actual_arr = [];
        $booking_non_refund_flexible_fee_actual_arr = [];
        $booking_non_refund_price_control_fee_actual_arr = [];
        $query = "SELECT DATE_FORMAT(date_title, '%b %Y') AS date_title, YEAR(date_title) AS year, MONTH(date_title) AS month, alias2.toZipcube, alias2.extra_fee, alias2.flexible_fee, alias2.price_control_fee, currency"
            . " FROM (SELECT (CASE WHEN " . Booking::column('closed') . " IS NOT NULL THEN " . Booking::column('closed') . " ELSE " . Booking::column('created') . " END) AS date_title, alias.toZipcube, alias.extra_fee, alias.flexible_fee, alias.price_control_fee, alias.currency AS currency"
            . " FROM (SELECT " . Booking::id_column() . " AS booking_id, " . Reservation::column('toZipcube') . " AS toZipcube, (CASE WHEN " . Reservation::column('extra_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('extra_fee') . " END) AS extra_fee, (CASE WHEN " . Reservation::column('flexible_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('flexible_fee') . " END) AS flexible_fee, (CASE WHEN " . Reservation::column('price_control_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('price_control_fee') . " END) AS price_control_fee, " . Reservation::column('currency') . " AS currency"
            . " FROM " . Booking::tableName() . ""
            . " INNER JOIN " . Reservation::tableName() . " ON " . Booking::id_column() . " = " . Reservation::column('booking_id') . ""
            . " INNER JOIN (SELECT " . Reservation::column('booking_id') . " AS bookingid, MAX(" . Reservation::id_column() . ") AS resid FROM " . Reservation::tableName() . " WHERE " . Reservation::column('booking_id') . " IS NOT NULL AND " . Reservation::enabled_column() . " = 1 " . $this->_get_non_hidden_statuses() . " GROUP BY " . Reservation::column('booking_id') . ") alias ON " . Booking::id_column() . " = alias.bookingid AND " . Reservation::id_column() . " = alias.resid"
            . "" . $this->_get_non_venue_payments_join() . ""
            . " WHERE " . Reservation::column('reservationStatus_id') . " NOT IN (" . Reservation_Status::EXPIRED . "," . Reservation_Status::DECLINE . ")"
            . "" . $this->_get_non_venue_payments_where() . ""
            . "" . $this->_get_non_hidden_statuses() . ""
            . "" . $this->_get_bookingChannel_sql_where($bookingChannel, $type) . ""
            . " AND " . Booking::enabled_column() . " = 1"
            . " AND " . Reservation::enabled_column() . " = 1"
            . " AND " . Booking::column('created') . " <= '" . $startDate . "' AND " . Booking::column('created') . " >= '" . $endDate . "'"
            . " AND NOT (" . Reservation::column('flexible_applied') . " = 1 AND " . Reservation::column('flexible_fee') . " IS NOT NULL AND " . Reservation::column('flexible_fee') . " > 0)"
            . " UNION"
            . " SELECT " . Booking::id_column() . " AS booking_id, " . Reservation::column('toZipcube') . " AS toZipcube, (CASE WHEN " . Reservation::column('extra_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('extra_fee') . " END) AS extra_fee, (CASE WHEN " . Reservation::column('flexible_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('flexible_fee') . " END) AS flexible_fee, (CASE WHEN " . Reservation::column('price_control_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('price_control_fee') . " END) AS price_control_fee, " . Reservation::column('currency') . " AS currency"
            . " FROM " . Booking::tableName() . ""
            . " INNER JOIN " . Reservation::tableName() . " ON " . Booking::id_column() . " = " . Reservation::column('booking_id') . ""
            . " INNER JOIN (SELECT " . Reservation::column('booking_id') . " AS bookingid, MAX(" . Reservation::id_column() . ") AS resid FROM " . Reservation::tableName() . " WHERE " . Reservation::column('booking_id') . " IS NOT NULL AND " . Reservation::enabled_column() . " = 1 " . $this->_get_non_hidden_statuses() . " GROUP BY " . Reservation::column('booking_id') . ") alias ON " . Booking::id_column() . " = alias.bookingid AND " . Reservation::id_column() . " = alias.resid"
            . "" . $this->_get_non_venue_payments_join() . ""
            . " WHERE " . Reservation::column('reservationStatus_id') . " NOT IN (" . Reservation_Status::EXPIRED . "," . Reservation_Status::DECLINE . ")"
            . "" . $this->_get_non_venue_payments_where() . ""
            . "" . $this->_get_non_hidden_statuses() . ""
            . "" . $this->_get_bookingChannel_sql_where($bookingChannel, $type) . ""
            . " AND " . Booking::enabled_column() . " = 1"
            . " AND " . Reservation::enabled_column() . " = 1"
            . " AND " . Booking::column('closed') . " <= '" . $startDate . "' AND " . Booking::column('closed') . " >= '" . $endDate . "'"
            . ") alias"
            . " INNER JOIN " . Booking::tableName() . " ON alias.booking_id=" . Booking::id_column() . ") alias2";
        $booking_non_refund_revenue_actual_query = $this->db->query($query);
        foreach ($booking_non_refund_revenue_actual_query->result_array() as $booking_non_refund_revenue_actual)
        {
            $date_arr[$booking_non_refund_revenue_actual['year']][$booking_non_refund_revenue_actual['month']] = $booking_non_refund_revenue_actual['date_title'];
            if (!isset($booking_non_refund_revenue_actual_arr[$booking_non_refund_revenue_actual['date_title']]))
            {
                $booking_non_refund_revenue_actual_arr[$booking_non_refund_revenue_actual['date_title']] = 0;
            }
            $booking_non_refund_revenue_actual_arr[$booking_non_refund_revenue_actual['date_title']] += ($booking_non_refund_revenue_actual['toZipcube'] + $booking_non_refund_revenue_actual['extra_fee'] + $booking_non_refund_revenue_actual['flexible_fee'] + $booking_non_refund_revenue_actual['price_control_fee']) * (($booking_non_refund_revenue_actual['currency'] == 'EUR')?$retMods['eurMod']:(($booking_non_refund_revenue_actual['currency'] == 'USD')?$retMods['usdMod']:1));
            if (!isset($booking_non_refund_extra_fee_actual_arr[$booking_non_refund_revenue_actual['date_title']]))
            {
                $booking_non_refund_extra_fee_actual_arr[$booking_non_refund_revenue_actual['date_title']] = 0;
            }
            $booking_non_refund_extra_fee_actual_arr[$booking_non_refund_revenue_actual['date_title']] += $booking_non_refund_revenue_actual['extra_fee'] * (($booking_non_refund_revenue_actual['currency'] == 'EUR')?$retMods['eurMod']:(($booking_non_refund_revenue_actual['currency'] == 'USD')?$retMods['usdMod']:1));
            if (!isset($booking_non_refund_flexible_fee_actual_arr[$booking_non_refund_revenue_actual['date_title']]))
            {
                $booking_non_refund_flexible_fee_actual_arr[$booking_non_refund_revenue_actual['date_title']] = 0;
            }
            $booking_non_refund_flexible_fee_actual_arr[$booking_non_refund_revenue_actual['date_title']] += $booking_non_refund_revenue_actual['flexible_fee'] * (($booking_non_refund_revenue_actual['currency'] == 'EUR')?$retMods['eurMod']:(($booking_non_refund_revenue_actual['currency'] == 'USD')?$retMods['usdMod']:1));
            if (!isset($booking_non_refund_price_control_fee_actual_arr[$booking_non_refund_revenue_actual['date_title']]))
            {
                $booking_non_refund_price_control_fee_actual_arr[$booking_non_refund_revenue_actual['date_title']] = 0;
            }
            $booking_non_refund_price_control_fee_actual_arr[$booking_non_refund_revenue_actual['date_title']] += $booking_non_refund_revenue_actual['price_control_fee'] * (($booking_non_refund_revenue_actual['currency'] == 'EUR')?$retMods['eurMod']:(($booking_non_refund_revenue_actual['currency'] == 'USD')?$retMods['usdMod']:1));
        }

        if ($full)
        {
            $booking_cancel_arr = [];
            $query = "SELECT DATE_FORMAT(meeting_date, '%b %Y') AS date_title, YEAR(meeting_date) AS year, MONTH(meeting_date) AS month, ((cancel_count / COUNT(DISTINCT alias.bookingid)) * 100) AS number"
                . " FROM (SELECT " . Booking::id_column() . " AS bookingid, MAX(" . Booked_Period::column('start') . ") AS meeting_date"
                . " FROM " . Booking::tableName() . ""
                . " INNER JOIN " . Reservation::tableName() . " ON " . Booking::id_column() . " = " . Reservation::column('booking_id') . ""
                . " INNER JOIN " . Booked_Period::tableName() . " ON " . Reservation::id_column() . " = " . Booked_Period::column('reservation_id') . ""
                . "" . $this->_get_non_venue_payments_join() . ""
                . " WHERE " . $this->_get_non_venue_payments_where(false) . ""
                . "" . $this->_get_non_hidden_statuses() . ""
                . " AND " . Booking::enabled_column() . " = 1"
                . " AND " . Reservation::enabled_column() . " = 1"
                . " GROUP BY " . Booking::id_column() . ") alias"
                . " INNER JOIN " . Booking::tableName() . " ON alias.bookingid=" . Booking::id_column() . ""
                . " LEFT JOIN (SELECT COUNT(DISTINCT alias.bookingid) AS cancel_count, MONTH(meeting_date) AS cancel_month, YEAR(meeting_date) AS cancel_year"
                . " FROM (SELECT " . Booking::id_column() . " AS bookingid, MAX(" . Booked_Period::column('start') . ") AS meeting_date"
                . " FROM " . Booking::tableName() . ""
                . " INNER JOIN " . Reservation::tableName() . " ON " . Booking::id_column() . " = " . Reservation::column('booking_id') . ""
                . " INNER JOIN " . Booked_Period::tableName() . " ON " . Reservation::id_column() . " = " . Booked_Period::column('reservation_id') . ""
                . "" . $this->_get_non_venue_payments_join() . ""
                . " WHERE " . $this->_get_non_venue_payments_where(false) . ""
                . "" . $this->_get_non_hidden_statuses() . ""
                . " AND " . Booking::enabled_column() . " = 1"
                . " AND " . Reservation::enabled_column() . " = 1"
                . " GROUP BY " . Booking::id_column() . ") alias"
                . " INNER JOIN " . Booking::tableName() . " ON alias.bookingid=" . Booking::id_column() . ""
                . " WHERE " . Booking::column('bookingStatus_id') . " = " . Booking_Status::CANCELLED . ""
                . "" . $this->_get_bookingChannel_sql_where($bookingChannel, $type) . ""
                . " AND " . Booking::column('closed') . " IS NOT NULL"
                . " AND meeting_date < now()"
                . " AND " . Booking::enabled_column() . " = 1"
                . " GROUP BY MONTHNAME(meeting_date), YEAR(meeting_date)"
                . ") cancelled ON MONTH(meeting_date)=cancelled.cancel_month AND YEAR(meeting_date)=cancelled.cancel_year"
                . " WHERE " . Booking::column('closed') . " IS NOT NULL"
                . "" . $this->_get_bookingChannel_sql_where($bookingChannel, $type) . ""
                . " AND " . Booking::enabled_column() . " = 1"
                . " AND meeting_date < now() AND meeting_date <= '" . $startDate . "' AND meeting_date >= '" . $endDate . "'"
                . " GROUP BY MONTHNAME(meeting_date), YEAR(meeting_date)"
                . " ORDER BY YEAR(meeting_date) ASC, MONTH(meeting_date) ASC";
            $booking_cancel_query = $this->db->query($query);
            foreach ($booking_cancel_query->result_array() as $booking_cancel)
            {
                $date_arr[$booking_cancel['year']][$booking_cancel['month']] = $booking_cancel['date_title'];
                $booking_cancel_arr[$booking_cancel['date_title']] = $booking_cancel['number'];
            }

            $new_users_arr = [];
            $query = "SELECT DATE_FORMAT(first_booking, '%b %Y') AS date_title, YEAR(first_booking) AS year, MONTH(first_booking) AS month, COUNT(DISTINCT user_id) AS number"
                . " FROM (SELECT " . Booking::column('beneficiary_id') . " AS user_id, MIN(" . Booking::column('created') . ") AS first_booking"
                . " FROM " . Booking::tableName() . ""
                . " INNER JOIN " . Reservation::tableName() . " ON " . Booking::id_column() . " = " . Reservation::column('booking_id') . ""
                . "" . $this->_get_non_venue_payments_join() . ""
                . " WHERE " . $this->_get_non_venue_payments_where(false) . ""
                . "" . $this->_get_non_hidden_statuses() . ""
                . "" . $this->_get_bookingChannel_sql_where($bookingChannel, $type) . ""
                . " AND " . Booking::enabled_column() . " = 1"
                . " AND " . Reservation::enabled_column() . " = 1"
                . " GROUP BY " . Booking::column('beneficiary_id') . ") alias"
                . " WHERE first_booking <= '" . $startDate . "' AND first_booking >= '" . $endDate . "'"
                . " GROUP BY MONTHNAME(first_booking), YEAR(first_booking)"
                . " ORDER BY YEAR(first_booking) ASC, MONTH(first_booking) ASC";
            $new_users_query = $this->db->query($query);
            foreach ($new_users_query->result_array() as $new_users)
            {
                $date_arr[$new_users['year']][$new_users['month']] = $new_users['date_title'];
                $new_users_arr[$new_users['date_title']] = $new_users['number'];
            }

            $booking_complete_arr = [];
            $query = "SELECT DATE_FORMAT(" . Booking::column('closed') . ", '%b %Y') AS date_title, YEAR(" . Booking::column('closed') . ") AS year, MONTH(" . Booking::column('closed') . ") AS month, COUNT(DISTINCT " . Booking::id_column() . ") AS number"
                . " FROM " . Booking::tableName() . ""
                . " INNER JOIN " . Reservation::tableName() . " ON " . Booking::id_column() . " = " . Reservation::column('booking_id') . ""
                . "" . $this->_get_non_venue_payments_join() . ""
                . " WHERE " . Reservation::column('is_paid') . " = 1 AND " . Booking::column('bookingStatus_id') . " = " . Booking_Status::FINISHEDHAPPILY . ""
                . "" . $this->_get_non_venue_payments_where() . ""
                . "" . $this->_get_non_hidden_statuses() . ""
                . "" . $this->_get_bookingChannel_sql_where($bookingChannel, $type) . ""
                . " AND " . Booking::enabled_column() . " = 1"
                . " AND " . Reservation::enabled_column() . " = 1"
                . " AND " . Booking::column('closed') . " <= '" . $startDate . "' AND " . Booking::column('closed') . " >= '" . $endDate . "'"
                . " GROUP BY MONTHNAME(" . Booking::column('closed') . "), YEAR(" . Booking::column('closed') . ")"
                . " ORDER BY YEAR(" . Booking::column('closed') . ") ASC, MONTH(" . Booking::column('closed') . ") ASC";
            $booking_complete_query = $this->db->query($query);
            foreach ($booking_complete_query->result_array() as $booking_complete)
            {
                $date_arr[$booking_complete['year']][$booking_complete['month']] = $booking_complete['date_title'];
                $booking_complete_arr[$booking_complete['date_title']] = $booking_complete['number'];
            }

            $users_complete_arr = [];
            $query = "SELECT DATE_FORMAT(" . Booking::column('closed') . ", '%b %Y') AS date_title, YEAR(" . Booking::column('closed') . ") AS year, MONTH(" . Booking::column('closed') . ") AS month, COUNT(DISTINCT " . Booking::column('beneficiary_id') . ") AS number"
                . " FROM " . Booking::tableName() . ""
                . " INNER JOIN " . Reservation::tableName() . " ON " . Booking::id_column() . " = " . Reservation::column('booking_id') . ""
                . "" . $this->_get_non_venue_payments_join() . ""
                . " WHERE " . Reservation::column('is_paid') . " = 1 AND " . Booking::column('bookingStatus_id') . " = " . Booking_Status::FINISHEDHAPPILY . ""
                . "" . $this->_get_non_venue_payments_where() . ""
                . "" . $this->_get_non_hidden_statuses() . ""
                . "" . $this->_get_bookingChannel_sql_where($bookingChannel, $type) . ""
                . " AND " . Booking::enabled_column() . " = 1"
                . " AND " . Reservation::enabled_column() . " = 1"
                . " " . Booking::column('closed') . " <= '" . $startDate . "' AND " . Booking::column('closed') . " >= '" . $endDate . "'"
                . " GROUP BY MONTHNAME(" . Booking::column('closed') . "), YEAR(" . Booking::column('closed') . ")"
                . " ORDER BY YEAR(" . Booking::column('closed') . ") ASC, MONTH(" . Booking::column('closed') . ") ASC";
            $users_complete_query = $this->db->query($query);
            foreach ($users_complete_query->result_array() as $users_complete)
            {
                $date_arr[$users_complete['year']][$users_complete['month']] = $users_complete['date_title'];
                $users_complete_arr[$users_complete['date_title']] = $users_complete['number'];
            }
        }

        $rowTitle['enquirers'] = '<b># Enquirers</b>';
        $rowTooltip['enquirers'] = 'Count of distinct number of users based on enquiry created date';
        $rowTitle['enquiries'] = '<b># Enquiries</b>';
        $rowTooltip['enquiries'] = 'Count of distinct number of enquiries based on enquiry created date';
        $rowTitle['users'] = '<b># Bookers</b>';
        $rowTooltip['users'] = 'Count of distinct number of users based on booking created date';
        $rowTitle['bookings'] = '<b># Bookings</b>';
        $rowTooltip['bookings'] = 'Count of distinct number of bookings based on booking created date';
        $rowTitle['bookings_missed'] = '&nbsp;&nbsp;# Bookings Missed';
        $rowTooltip['bookings_missed'] = 'Count of distinct number of expired, declined or cancelled bookings based on booking created date';
        $rowTitle['booking_gmv'] = '<b>GMV (£)</b>';
        $rowTooltip['booking_gmv'] = 'Sum of price, extra fee, flexible fee, price control fee based on booking created date (includes invoices)';
//        $rowTitle['booking_gmv_comp'] = '&nbsp;&nbsp;GMV Success (£)';
//        $rowTooltip['booking_gmv_comp'] = 'Sum of price, extra fee, flexible fee, price control fee in review or completed bookings based on booking created date';
//        $rowTitle['booking_gmv_unclosed'] = '&nbsp;&nbsp;GMV Pending (£)';
//        $rowTooltip['booking_gmv_unclosed'] = 'Sum of price, extra fee, flexible fee, price control fee in unfinished bookings based on booking created date';
        $rowTitle['booking_gmv_closed_badly'] = '&nbsp;&nbsp;GMV Decl/Exp (£)';
        $rowTooltip['booking_gmv_closed_badly'] = 'Sum of price, extra fee, flexible fee, price control fee in expired or declined bookings based on booking created date (includes invoices)';
        $rowTitle['booking_gmv_cancel'] = '&nbsp;&nbsp;GMV Cancelled (£)';
        $rowTooltip['booking_gmv_cancel'] = 'Sum of price, extra fee, flexible fee, price control fee in cancelled bookings based on booking created date (includes invoices)';
        $rowTitle['booking_gmv_create'] = '&nbsp;&nbsp;GMV at creation (£)';
        $rowTooltip['booking_gmv_create'] = 'Sum of price, extra fee, flexible fee, price control fee at most recent reservation creation based on booking created date (includes invoices)';
//        $rowTitle['booking_gmv_actual'] = 'GMV Completed (£)';
//        $rowTooltip['booking_gmv_actual'] = 'Sum of price, extra fee, flexible fee, price control fee in finished bookings based on booking closed date';
        $rowTitle['booking_revenue'] = '<b>Expected Revenue (£)</b>';
        $rowTooltip['booking_revenue'] = 'Net expected revenue all cost and loss are deducted based on booking created date (includes invoices)';
        $rowClass['booking_revenue'] = 'bg-table-grey';
        $rowTitle['booking_revenue_comp'] = '&nbsp;&nbsp;Expected Revenue Success (£)';
        $rowTooltip['booking_revenue_comp'] = 'Sum of commission, extra fee, flexible fee, price control fee in review or completed bookings based on booking created date (includes invoices)';
        $rowTitle['booking_revenue_unclosed'] = '&nbsp;&nbsp;Revenue Upcoming Bookings (£)';
        $rowTooltip['booking_revenue_unclosed'] = 'Sum of commission, extra fee, flexible fee, price control fee in unfinished bookings based on booking created date (includes invoices)';
        $rowTitle['booking_revenue_closed_badly'] = '&nbsp;&nbsp;Missed Revenue Decl/Exp (£)';
        $rowTooltip['booking_revenue_closed_badly'] = 'Sum of commission, extra fee, flexible fee, price control fee in expired or declined bookings based on booking created date (includes invoices)';
        $rowTitle['booking_revenue_cancel'] = '&nbsp;&nbsp;Expected Revenue Cancelled (£)';
        $rowTooltip['booking_revenue_cancel'] = 'Sum of commission, extra fee, flexible fee, price control fee in cancelled bookings based on booking created date (includes invoices)';
        $rowTitle['booking_extra_fee'] = '&nbsp;&nbsp;Expected Extra Fee (£)';
        $rowTooltip['booking_extra_fee'] = 'Sum of extra fee in pending, accepted, checkin, review or completed bookings based on booking created date (includes invoices)';
        $rowTitle['booking_flexible_fee'] = '&nbsp;&nbsp;Expected Flexible Fee (£)';
        $rowTooltip['booking_flexible_fee'] = 'Sum of flexible fee in pending, accepted, checkin, review or completed bookings based on booking created date (includes invoices)';
        $rowTitle['booking_price_control_fee'] = '&nbsp;&nbsp;Expected Price Control Fee (£)';
        $rowTooltip['booking_price_control_fee'] = 'Sum of price control fee in pending, accepted, checkin, review or completed bookings based on booking created date (includes invoices)';
        $rowTitle['booking_revenue_actual'] = '<b>Revenue (£)</b>';
        $rowClass['booking_revenue_actual'] = 'bg-table-blue-electric';
        $rowTooltip['booking_revenue_actual'] = 'Sum of commission, extra fee, flexible fee, price control fee in non expired and non declined finished bookings based on booking closed date (includes invoices)';
        $rowTitle['booking_extra_fee_actual'] = '&nbsp;&nbsp;Extra Fee (£)';
        $rowTooltip['booking_extra_fee_actual'] = 'Sum of extra fee in non expired and non declined finished bookings based on booking closed date (includes invoices)';
        $rowTitle['booking_flexible_fee_actual'] = '&nbsp;&nbsp;Flexible Fee (£)';
        $rowTooltip['booking_flexible_fee_actual'] = 'Sum of flexible fee in non expired and non declined finished bookings based on booking closed date (includes invoices)';
        $rowTitle['booking_price_control_fee_actual'] = '&nbsp;&nbsp;Price Control Fee (£)';
        $rowTooltip['booking_price_control_fee_actual'] = 'Sum of price control fee in non expired and non declined finished bookings based on booking closed date (includes invoices)';
        $rowTitle['booking_vat_actual'] = '&nbsp;&nbsp;VAT (£)';
        $rowClass['booking_vat_actual'] = 'bg-table-grey';
        $rowTooltip['booking_vat_actual'] = 'Sum of commission vat, extra fee vat, flexible fee vat and price control fee vat in non expired and non declined finished bookings based on booking closed date (includes invoices)';
        $rowTitle['booking_revenue_eom'] = '<b>Estimated Revenue (not for accounting) (£)</b>';
        $rowTooltip['booking_revenue_eom'] = 'Sum of commission, extra fee, flexible fee, price control fee in non expired and non declined bookings based on meeting date (includes invoices)';
        $rowTitle['booking_invoice'] = '<b>Invoice (£)</b>';
        $rowTooltip['booking_invoice'] = 'Sum of invoice amount in pending, accepted, checkin, review or completed bookings based on meeting date';
        $rowTitle['booking_non_refund_revenue_actual'] = '<b>Revised Revenue (non refundable) (£)</b>';
        $rowTooltip['booking_non_refund_revenue_actual'] = 'Sum of commission, extra fee, flexible fee, price control fee in non expired and non declined flexible bookings (based on booking created date) and all closed bookings (based on booking closed date) (includes invoices)';
        $rowTitle['booking_non_refund_extra_fee_actual'] = '&nbsp;&nbsp;Revised Extra Fee (non refundable) (£)';
        $rowTooltip['booking_non_refund_extra_fee_actual'] = 'Sum of extra fee in non expired and non declined flexible bookings (based on booking created date) and all closed bookings (based on booking closed date) (includes invoices)';
        $rowTitle['booking_non_refund_flexible_fee_actual'] = '&nbsp;&nbsp;Revised Flexible Fee (non refundable) (£)';
        $rowTooltip['booking_non_refund_flexible_fee_actual'] = 'Sum of flexible fee in non expired and non declined flexible bookings (based on booking created date) and all closed bookings (based on booking closed date) (includes invoices)';
        $rowTitle['booking_non_refund_price_control_fee_actual'] = '&nbsp;&nbsp;Revised Price Control Fee (non refundable) (£)';
        $rowTooltip['booking_non_refund_price_control_fee_actual'] = 'Sum of price control fee in non expired and non declined flexible bookings (based on booking created date) and all closed bookings (based on booking closed date) (includes invoices)';
        if ($full)
        {
            $rowTitle['booking_cancel'] = '<b>Percentage Cancelled (num)</b>';
            $rowTooltip['booking_cancel'] = 'Percentage cancelled of bookings based on meeting date';
            $rowTitle['new_users'] = '<b>New Users (num)</b>';
            $rowTooltip['new_users'] = 'Count of distinct users based on first booking date';
            $rowTitle['booking_complete'] = '<b>Total Bookings Completed (num)</b>';
            $rowTooltip['booking_complete'] = 'Count of distinct review or completed bookings based on booking closed date';
            $rowTitle['users_complete'] = '<b>Total Users Completed (num)</b>';
            $rowTooltip['users_complete'] = 'Count of distinct users with review or completed bookings based on booking closed date';
        }

        $resultArr = [];
        ksort($date_arr);
        foreach ($date_arr as $year)
        {
            ksort($year);
            foreach ($year as $month => $dateKey)
            {
                $resultArr[$dateKey]['enquirers'] = ((isset($enquirers_arr[$dateKey]))?$enquirers_arr[$dateKey]:0);
                $resultArr[$dateKey]['enquiries'] = ((isset($enquiry_arr[$dateKey]))?$enquiry_arr[$dateKey]:0);
                $resultArr[$dateKey]['users'] = ((isset($users_arr[$dateKey]))?$users_arr[$dateKey]:0);
                if ($full)
                {
                    $resultArr[$dateKey]['new_users'] = ((isset($new_users_arr[$dateKey]))?$new_users_arr[$dateKey]:0);
                }
                $resultArr[$dateKey]['bookings'] = ((isset($bookings_arr[$dateKey]))?$bookings_arr[$dateKey]:0);
                $resultArr[$dateKey]['bookings_missed'] = ((isset($booking_missed_arr[$dateKey]))?$booking_missed_arr[$dateKey]:0);
                $resultArr[$dateKey]['booking_gmv'] = ((isset($booking_gmv_arr[$dateKey]))?round($booking_gmv_arr[$dateKey]):0);
    //            $resultArr[$dateKey]['booking_gmv_comp'] = ((isset($booking_gmv_comp_arr[$dateKey]))?round($booking_gmv_comp_arr[$dateKey]):0);
    //            $resultArr[$dateKey]['booking_gmv_unclosed'] = ((isset($booking_gmv_unclosed_arr[$dateKey]))?round($booking_gmv_unclosed_arr[$dateKey]):0);
                $resultArr[$dateKey]['booking_gmv_closed_badly'] = ((isset($booking_gmv_closed_badly_arr[$dateKey]))?round($booking_gmv_closed_badly_arr[$dateKey]):0);
                $resultArr[$dateKey]['booking_gmv_cancel'] = ((isset($booking_gmv_cancel_arr[$dateKey]))?round($booking_gmv_cancel_arr[$dateKey]):0);
                $resultArr[$dateKey]['booking_gmv_create'] = ((isset($booking_gmv_create_arr[$dateKey]))?round($booking_gmv_create_arr[$dateKey]):0);
    //            $resultArr[$dateKey]['booking_gmv_actual'] = ((isset($booking_gmv_actual_arr[$dateKey]))?round($booking_gmv_actual_arr[$dateKey]):0);
                if ($full)
                {
                    $resultArr[$dateKey]['booking_cancel'] = ((isset($booking_cancel_arr[$dateKey]))?round($booking_cancel_arr[$dateKey], 2):0);
                }
                $resultArr[$dateKey]['booking_revenue'] = ((isset($booking_revenue_arr[$dateKey]))?round($booking_revenue_arr[$dateKey]):0) - ((isset($booking_revenue_closed_badly_arr[$dateKey]))?round($booking_revenue_closed_badly_arr[$dateKey]):0);
                $resultArr[$dateKey]['booking_revenue_comp'] = ((isset($booking_revenue_comp_arr[$dateKey]))?round($booking_revenue_comp_arr[$dateKey]):0);
                $resultArr[$dateKey]['booking_revenue_unclosed'] = ((isset($booking_revenue_unclosed_arr[$dateKey]))?round($booking_revenue_unclosed_arr[$dateKey]):0);
                $resultArr[$dateKey]['booking_revenue_closed_badly'] = ((isset($booking_revenue_closed_badly_arr[$dateKey]))?round($booking_revenue_closed_badly_arr[$dateKey]):0);
                $resultArr[$dateKey]['booking_revenue_cancel'] = ((isset($booking_revenue_cancel_arr[$dateKey]))?round($booking_revenue_cancel_arr[$dateKey]):0);
                $resultArr[$dateKey]['booking_extra_fee'] = ((isset($booking_extra_fee_arr[$dateKey]))?round($booking_extra_fee_arr[$dateKey]):0);
                $resultArr[$dateKey]['booking_flexible_fee'] = ((isset($booking_flexible_fee_arr[$dateKey]))?round($booking_flexible_fee_arr[$dateKey]):0);
                $resultArr[$dateKey]['booking_price_control_fee'] = ((isset($booking_price_control_fee_arr[$dateKey]))?round($booking_price_control_fee_arr[$dateKey]):0);
                $resultArr[$dateKey]['booking_revenue_actual'] = ((isset($booking_revenue_actual_arr[$dateKey]))?round($booking_revenue_actual_arr[$dateKey]):0);
                $resultArr[$dateKey]['booking_extra_fee_actual'] = ((isset($booking_extra_fee_actual_arr[$dateKey]))?round($booking_extra_fee_actual_arr[$dateKey]):0);
                $resultArr[$dateKey]['booking_flexible_fee_actual'] = ((isset($booking_flexible_fee_actual_arr[$dateKey]))?round($booking_flexible_fee_actual_arr[$dateKey]):0);
                $resultArr[$dateKey]['booking_price_control_fee_actual'] = ((isset($booking_price_control_fee_actual_arr[$dateKey]))?round($booking_price_control_fee_actual_arr[$dateKey]):0);
                $resultArr[$dateKey]['booking_vat_actual'] = ((isset($booking_vat_actual_arr[$dateKey]))?round($booking_vat_actual_arr[$dateKey], 2):0);
                $resultArr[$dateKey]['booking_revenue_eom'] = ((isset($booking_revenue_eom_arr[$dateKey]))?round($booking_revenue_eom_arr[$dateKey]):0);
                $resultArr[$dateKey]['booking_invoice'] = ((isset($booking_invoice_arr[$dateKey]))?round($booking_invoice_arr[$dateKey]):0);
                $resultArr[$dateKey]['booking_non_refund_revenue_actual'] = ((isset($booking_non_refund_revenue_actual_arr[$dateKey]))?round($booking_non_refund_revenue_actual_arr[$dateKey]):0);
                $resultArr[$dateKey]['booking_non_refund_extra_fee_actual'] = ((isset($booking_non_refund_extra_fee_actual_arr[$dateKey]))?round($booking_non_refund_extra_fee_actual_arr[$dateKey]):0);
                $resultArr[$dateKey]['booking_non_refund_flexible_fee_actual'] = ((isset($booking_non_refund_flexible_fee_actual_arr[$dateKey]))?round($booking_non_refund_flexible_fee_actual_arr[$dateKey]):0);
                $resultArr[$dateKey]['booking_non_refund_price_control_fee_actual'] = ((isset($booking_non_refund_price_control_fee_actual_arr[$dateKey]))?round($booking_non_refund_price_control_fee_actual_arr[$dateKey]):0);
                if ($full)
                {
                    $resultArr[$dateKey]['booking_complete'] = ((isset($booking_complete_arr[$dateKey]))?$booking_complete_arr[$dateKey]:0);
                    $resultArr[$dateKey]['users_complete'] = ((isset($users_complete_arr[$dateKey]))?$users_complete_arr[$dateKey]:0);
                }
            }
        }
        $retArr = [];
        foreach ($resultArr as $months => $rows)
        {
            $retArr['head'][] = $months;
            foreach (array_keys($rows) as $rowkey)
            {
                $retArr[$rowkey]['row_title'] = $rowTitle[$rowkey];
                if (isset($rowClass[$rowkey]))
                {
                    $retArr[$rowkey]['row_class'] = $rowClass[$rowkey];
                }
                if (isset($rowTooltip[$rowkey]))
                {
                    $retArr[$rowkey]['row_tooltip'] = $rowTooltip[$rowkey];
                }
                $retArr[$rowkey][$months] = $rows[$rowkey];
            }
        }
        return $retArr;
    }

//    public function get_monthly_widget_calendar_totals()
//    {
//        return $this->get_monthly_totals(true, [Booking_Channel::VENUECALENDAR, Booking_Channel::WIDGET], "OR");
//    }
//
//    public function get_monthly_website_totals()
//    {
//        return $this->get_monthly_totals(true, [Booking_Channel::FRONTEND]);
//    }

    public function get_monthly_flexible($start, $end)
    {
        $retMods = $this->_get_currency_mods();
        $startDate = $start->format("Y-m-d");
        $endDate = $end->format("Y-m-d");
        $date_arr = [];

        $flex_arr = [];
        $query = "SELECT DATE_FORMAT(" . Booking::column('created') . ", '%b %Y') AS date_title, YEAR(" . Booking::column('created') . ") AS year, MONTH(" . Booking::column('created') . ") AS month, COUNT(DISTINCT " . Booking::id_column() . ") AS flex_number"
            . " FROM " . Booking::tableName() . ""
            . " INNER JOIN " . Reservation::tableName() . " ON " . Booking::id_column() . " = " . Reservation::column('booking_id') . ""
            . "" . $this->_get_non_venue_payments_join() . ""
            . " WHERE " . $this->_get_non_venue_payments_where(false) . ""
            . "" . $this->_get_non_hidden_statuses() . ""
            . "" . $this->_get_flexible_where() . ""
            . " AND " . Booking::enabled_column() . " = 1"
            . " AND " . Reservation::enabled_column() . " = 1"
            . " AND " . Booking::column('created') . " <= '" . $startDate . "' AND " . Booking::column('created') . " >= '" . $endDate . "'"
            . " GROUP BY MONTHNAME(" . Booking::column('created') . "), YEAR(" . Booking::column('created') . ")"
            . " ORDER BY YEAR(" . Booking::column('created') . ") ASC, MONTH(" . Booking::column('created') . ") ASC";
        $flex_query = $this->db->query($query);
        foreach ($flex_query->result_array() as $flex)
        {
            $date_arr[$flex['year']][$flex['month']] = $flex['date_title'];
            $flex_arr[$flex['date_title']] = $flex['flex_number'];
        }

        $flex_gmv_arr = [];
        $query = "SELECT DATE_FORMAT(" . Booking::column('created') . ", '%b %Y') AS date_title, YEAR(" . Booking::column('created') . ") AS year, MONTH(" . Booking::column('created') . ") AS month, " . Reservation::column('price') . " AS price, (CASE WHEN " . Reservation::column('extra_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('extra_fee') . " END) AS extra_fee, (CASE WHEN " . Reservation::column('flexible_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('flexible_fee') . " END) AS flexible_fee, (CASE WHEN " . Reservation::column('price_control_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('price_control_fee') . " END) AS price_control_fee, " . Reservation::column('currency') . " AS currency"
            . " FROM " . Booking::tableName() . ""
            . " INNER JOIN (SELECT " . Reservation::column('booking_id') . " AS bookingid, MAX(" . Reservation::id_column() . ") AS resid FROM " . Reservation::tableName() . " WHERE " . Reservation::column('booking_id') . " IS NOT NULL AND " . Reservation::enabled_column() . " = 1 " . $this->_get_non_hidden_statuses() . " GROUP BY " . Reservation::column('booking_id') . ") alias ON " . Booking::id_column() . " = alias.bookingid"
            . " INNER JOIN " . Reservation::tableName() . " ON alias.resid = " . Reservation::id_column() . " AND " . Reservation::column('booking_id') . " = alias.bookingid"
            . "" . $this->_get_non_venue_payments_join() . ""
            . " WHERE " . $this->_get_non_venue_payments_where(false) . ""
            . "" . $this->_get_non_hidden_statuses() . ""
            . "" . $this->_get_flexible_where() . ""
            . " AND " . Booking::enabled_column() . " = 1"
            . " AND " . Reservation::enabled_column() . " = 1"
            . " AND " . Booking::column('created') . " <= '" . $startDate . "' AND " . Booking::column('created') . " >= '" . $endDate . "'";
        $flex_gmv_query = $this->db->query($query);
        foreach ($flex_gmv_query->result_array() as $flex_gmv)
        {
            $date_arr[$flex_gmv['year']][$flex_gmv['month']] = $flex_gmv['date_title'];
            if (!isset($flex_gmv_arr[$flex_gmv['date_title']]))
            {
                $flex_gmv_arr[$flex_gmv['date_title']] = 0;
            }
            $flex_gmv_arr[$flex_gmv['date_title']] += ($flex_gmv['price'] + $flex_gmv['extra_fee'] + $flex_gmv['flexible_fee'] + $flex_gmv['price_control_fee']) * (($flex_gmv['currency'] == 'EUR')?$retMods['eurMod']:(($flex_gmv['currency'] == 'USD')?$retMods['usdMod']:1));
        }

        $flex_revenue_arr = [];
        $query = "SELECT DATE_FORMAT(" . Booking::column('created') . ", '%b %Y') AS date_title, YEAR(" . Booking::column('created') . ") AS year, MONTH(" . Booking::column('created') . ") AS month, alias.toZipcube, alias.extra_fee, alias.flexible_fee, alias.price_control_fee, alias.currency"
            . " FROM " . Booking::tableName() . ""
            . " INNER JOIN (SELECT " . Reservation::column('booking_id') . " AS bookingid, MAX(" . Reservation::id_column() . ") AS resid FROM " . Reservation::tableName() . " WHERE " . Reservation::column('booking_id') . " IS NOT NULL AND " . Reservation::enabled_column() . " = 1 " . $this->_get_non_hidden_statuses() . " GROUP BY " . Reservation::column('booking_id') . ") res_alias ON " . Booking::id_column() . " = res_alias.bookingid"
            . " INNER JOIN (SELECT " . Reservation::column('booking_id') . " AS bookingid, " . Reservation::id_column() . " AS reservation_id, " . Reservation::column('toZipcube') . " AS toZipcube, (CASE WHEN " . Reservation::column('extra_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('extra_fee') . " END) AS extra_fee, (CASE WHEN " . Reservation::column('flexible_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('flexible_fee') . " END) AS flexible_fee, (CASE WHEN " . Reservation::column('price_control_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('price_control_fee') . " END) AS price_control_fee, " . Reservation_Audit::column('reservation_status_id') . " AS status, " . Reservation::column('currency') . " AS currency"
            . " FROM " . Reservation::tableName() . ""
            . " INNER JOIN " . Reservation_Audit::tableName() . " ON " . Reservation::id_column() . " = " . Reservation_Audit::column('reservation_id') . ""
            . " WHERE " . Reservation::column('booking_id') . " IS NOT NULL"
            . "" . $this->_get_non_hidden_statuses() . ""
            . "" . $this->_get_flexible_where() . ""
            . " AND " . Reservation::enabled_column() . " = 1"
            . " ORDER BY " . Reservation_Audit::column('date_time') . " DESC, " . Reservation_Audit::column('reservation_status_id') . " DESC) alias ON " . Booking::id_column() . " = alias.bookingid AND res_alias.resid = alias.reservation_id"
            . "" . $this->_get_non_venue_payments_join() . ""
            . " WHERE status IN (" . Reservation_Status::CREATED . "," . Reservation_Status::ACCEPTED . "," . Reservation_Status::CHECKIN . "," . Reservation_Status::AWAITINGHOSTREVIEW . "," .  Reservation_Status::AWAITINGUSERREVIEW . "," . Reservation_Status::COMPLETED . ")"
            . "" . $this->_get_non_venue_payments_where() . ""
            . " AND " . Booking::enabled_column() . " = 1"
            . " AND " . Booking::column('created') . " <= '" . $startDate . "' AND " . Booking::column('created') . " >= '" . $endDate . "'"
            . " GROUP BY " . Booking::id_column() . "";
        $flex_revenue_query = $this->db->query($query);
        foreach ($flex_revenue_query->result_array() as $flex_revenue)
        {
            $date_arr[$flex_revenue['year']][$flex_revenue['month']] = $flex_revenue['date_title'];
            if (!isset($flex_revenue_arr[$flex_revenue['date_title']]))
            {
                $flex_revenue_arr[$flex_revenue['date_title']] = 0;
            }
            $flex_revenue_arr[$flex_revenue['date_title']] += ($flex_revenue['toZipcube'] + $flex_revenue['extra_fee'] + $flex_revenue['flexible_fee'] + $flex_revenue['price_control_fee']) * (($flex_revenue['currency'] == 'EUR')?$retMods['eurMod']:(($flex_revenue['currency'] == 'USD')?$retMods['usdMod']:1));
        }

        $flex_cancel_arr = [];
        $query = "SELECT DATE_FORMAT(" . Booking::column('closed') . ", '%b %Y') AS date_title, YEAR(" . Booking::column('closed') . ") AS year, MONTH(" . Booking::column('closed') . ") AS month, COUNT(DISTINCT " . Booking::id_column() . ") AS flex_number"
            . " FROM " . Booking::tableName() . ""
            . " INNER JOIN " . Reservation::tableName() . " ON " . Booking::id_column() . " = " . Reservation::column('booking_id') . ""
            . "" . $this->_get_non_venue_payments_join() . ""
            . " WHERE " . $this->_get_non_venue_payments_where(false) . ""
            . "" . $this->_get_non_hidden_statuses() . ""
            . "" . $this->_get_flexible_where() . ""
            . " AND " . Booking::enabled_column() . " = 1"
            . " AND " . Reservation::enabled_column() . " = 1"
            . " AND " . Booking::column('closed') . " <= '" . $startDate . "' AND " . Booking::column('closed') . " >= '" . $endDate . "'"
            . " AND " . Booking::column('bookingStatus_id') . " = " . Booking_Status::CANCELLED . ""
            . " GROUP BY MONTHNAME(" . Booking::column('closed') . "), YEAR(" . Booking::column('closed') . ")"
            . " ORDER BY YEAR(" . Booking::column('closed') . ") ASC, MONTH(" . Booking::column('closed') . ") ASC";
        $flex_cancel_query = $this->db->query($query);
        foreach ($flex_cancel_query->result_array() as $flex_cancel)
        {
            $date_arr[$flex_cancel['year']][$flex_cancel['month']] = $flex_cancel['date_title'];
            $flex_cancel_arr[$flex_cancel['date_title']] = $flex_cancel['flex_number'];
        }

        $flex_loss_arr = [];
        $query = "SELECT DATE_FORMAT(" . Booking::column('closed') . ", '%b %Y') AS date_title, YEAR(" . Booking::column('closed') . ") AS year, MONTH(" . Booking::column('closed') . ") AS month, " . Reservation::column('toVenue') . " AS toVenue, " . Reservation::column('currency') . " AS currency"
            . " FROM " . Booking::tableName() . ""
            . " INNER JOIN (SELECT " . Reservation::column('booking_id') . " AS bookingid, MAX(" . Reservation::id_column() . ") AS resid FROM " . Reservation::tableName() . " WHERE " . Reservation::column('booking_id') . " IS NOT NULL AND " . Reservation::enabled_column() . " = 1 " . $this->_get_non_hidden_statuses() . " GROUP BY " . Reservation::column('booking_id') . ") alias ON " . Booking::id_column() . " = alias.bookingid"
            . " INNER JOIN " . Reservation::tableName() . " ON alias.resid = " . Reservation::id_column() . " AND " . Reservation::column('booking_id') . " = alias.bookingid"
            . "" . $this->_get_non_venue_payments_join() . ""
            . " WHERE " . $this->_get_non_venue_payments_where(false) . ""
            . "" . $this->_get_non_hidden_statuses() . ""
            . "" . $this->_get_flexible_where() . ""
            . " AND " . Booking::enabled_column() . " = 1"
            . " AND " . Reservation::enabled_column() . " = 1"
            . " AND " . Booking::column('closed') . " <= '" . $startDate . "' AND " . Booking::column('closed') . " >= '" . $endDate . "'"
            . " AND " . Booking::column('bookingStatus_id') . " = " . Booking_Status::CANCELLED . "";
        $flex_loss_query = $this->db->query($query);
        foreach ($flex_loss_query->result_array() as $flex_loss)
        {
            $date_arr[$flex_loss['year']][$flex_loss['month']] = $flex_loss['date_title'];
            if (!isset($flex_loss_arr[$flex_loss['date_title']]))
            {
                $flex_loss_arr[$flex_loss['date_title']] = 0;
            }
            $flex_loss_arr[$flex_loss['date_title']] += $flex_loss['toVenue'] * (($flex_loss['currency'] == 'EUR')?$retMods['eurMod']:(($flex_loss['currency'] == 'USD')?$retMods['usdMod']:1));
        }

        $flex_non_refund_rev_arr = [];
        $query = "SELECT DATE_FORMAT(" . Booking::column('closed') . ", '%b %Y') AS date_title, YEAR(" . Booking::column('closed') . ") AS year, MONTH(" . Booking::column('closed') . ") AS month, " . Reservation::column('toZipcube') . " AS toZipcube, (CASE WHEN " . Reservation::column('extra_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('extra_fee') . " END) AS extra_fee, (CASE WHEN " . Reservation::column('flexible_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('flexible_fee') . " END) AS flexible_fee, (CASE WHEN " . Reservation::column('price_control_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('price_control_fee') . " END) AS price_control_fee, " . Reservation::column('currency') . " AS currency"
            . " FROM " . Booking::tableName() . ""
            . " INNER JOIN " . Reservation::tableName() . " ON " . Booking::id_column() . " = " . Reservation::column('booking_id') . ""
            . " INNER JOIN (SELECT " . Reservation::column('booking_id') . " AS bookingid, MAX(" . Reservation::id_column() . ") AS resid FROM " . Reservation::tableName() . " WHERE " . Reservation::column('booking_id') . " IS NOT NULL AND " . Reservation::enabled_column() . " = 1 " . $this->_get_non_hidden_statuses() . " GROUP BY " . Reservation::column('booking_id') . ") alias ON " . Booking::id_column() . " = alias.bookingid AND " . Reservation::id_column() . " = alias.resid"
            . "" . $this->_get_non_venue_payments_join() . ""
            . " WHERE " . $this->_get_non_venue_payments_where(false) . ""
            . "" . $this->_get_non_hidden_statuses() . ""
            . "" . $this->_get_non_flexible_where() . ""
            . " AND " . Booking::enabled_column() . " = 1"
            . " AND " . Reservation::enabled_column() . " = 1"
            . " AND " . Booking::column('closed') . " <= '" . $startDate . "' AND " . Booking::column('closed') . " >= '" . $endDate . "'"
            . " AND " . Booking::column('bookingStatus_id') . " = " . Booking_Status::CANCELLED . "";
        $flex_non_refund_rev_query = $this->db->query($query);
        foreach ($flex_non_refund_rev_query->result_array() as $flex_non_refund_rev)
        {
            $date_arr[$flex_non_refund_rev['year']][$flex_non_refund_rev['month']] = $flex_non_refund_rev['date_title'];
            if (!isset($flex_non_refund_rev_arr[$flex_non_refund_rev['date_title']]))
            {
                $flex_non_refund_rev_arr[$flex_non_refund_rev['date_title']] = 0;
            }
            $flex_non_refund_rev_arr[$flex_non_refund_rev['date_title']] += ($flex_non_refund_rev['toZipcube'] + $flex_non_refund_rev['extra_fee'] + $flex_non_refund_rev['flexible_fee'] + $flex_non_refund_rev['price_control_fee']) * (($flex_non_refund_rev['currency'] == 'EUR')?$retMods['eurMod']:(($flex_non_refund_rev['currency'] == 'USD')?$retMods['usdMod']:1));
        }

        $rowTitle['flex_gmv'] = 'GMV (£)';
        $rowTitle['flex_revenue'] = 'Expected Revenue (£)';
        $rowTitle['flexs'] = '# Flexible Bookings';
        $rowTitle['flex_cancel'] = '# Cancelled';
        $rowTitle['flex_loss'] = 'Loss (£)';
        $rowTitle['flex_non_refund_rev'] = 'Non Refund Revenue (£)';

        $resultArr = [];
        ksort($date_arr);
        foreach ($date_arr as $year)
        {
            ksort($year);
            foreach ($year as $month => $dateKey)
            {
                $resultArr[$dateKey]['flexs'] = ((isset($flex_arr[$dateKey]))?round($flex_arr[$dateKey]):0);
                $resultArr[$dateKey]['flex_gmv'] = ((isset($flex_gmv_arr[$dateKey]))?round($flex_gmv_arr[$dateKey]):0);
                $resultArr[$dateKey]['flex_revenue'] = ((isset($flex_revenue_arr[$dateKey]))?round($flex_revenue_arr[$dateKey]):0);
                $resultArr[$dateKey]['flex_cancel'] = ((isset($flex_cancel_arr[$dateKey]))?$flex_cancel_arr[$dateKey]:0);
                $resultArr[$dateKey]['flex_loss'] = ((isset($flex_loss_arr[$dateKey]))?round($flex_loss_arr[$dateKey]):0);
                $resultArr[$dateKey]['flex_non_refund_rev'] = ((isset($flex_non_refund_rev_arr[$dateKey]))?round($flex_non_refund_rev_arr[$dateKey]):0);
            }
        }
        $retArr = [];
        foreach ($resultArr as $months => $rows)
        {
            $retArr['head'][] = $months;
            foreach (array_keys($rows) as $rowkey)
            {
                $retArr[$rowkey]['row_title'] = $rowTitle[$rowkey];
                $retArr[$rowkey][$months] = $rows[$rowkey];
            }
        }
        return $retArr;
    }

    public function get_monthly_booking_split($start, $end)
    {
        $retMods = $this->_get_currency_mods();
        $startDate = $start->format("Y-m-d");
        $endDate = $end->format("Y-m-d");

        $rowTitle = [];
        $rowquery = "SELECT " . UsageSuperset::id_column() . " AS superset_id, " . UsageSuperset::column('desc') . " AS superset_desc"
            . " FROM " . UsageSuperset::tableName() . ""
            . " WHERE " . UsageSuperset::enabled_column() . " = 1 AND " . UsageSuperset::column('hidden') . " = 0"
            . " ORDER BY " . UsageSuperset::column('order') . " ASC";
        $row_arr_query = $this->db->query($rowquery);
        foreach ($row_arr_query->result_array() as $row)
        {
            $rowTitle[$row['superset_id']] = $row['superset_desc'];
        }

        $superset_split_arr = [];
        $query = "SELECT DATE_FORMAT(" . Booking::column('created') . ", '%b %Y') AS date_title, " . Reservation::column('price') . " AS price, " . Reservation::column('toZipcube') . " AS toZipcube, (CASE WHEN " . Reservation::column('extra_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('extra_fee') . " END) AS extra_fee, (CASE WHEN " . Reservation::column('flexible_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('flexible_fee') . " END) AS flexible_fee, (CASE WHEN " . Reservation::column('price_control_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('price_control_fee') . " END) AS price_control_fee, " . UsageSuperset::id_column() . " AS superset_id, " . Reservation::column('currency') . " AS currency"
            . " FROM " . Booking::tableName() . ""
            . " INNER JOIN " . Reservation::tableName() . " ON " . Booking::id_column() . " = " . Reservation::column('booking_id') . ""
            . " INNER JOIN (SELECT " . Reservation::column('booking_id') . " AS bookingid, MAX(" . Reservation::id_column() . ") AS resid FROM " . Reservation::tableName() . " WHERE " . Reservation::column('booking_id') . " IS NOT NULL AND " . Reservation::enabled_column() . " = 1 " . $this->_get_non_hidden_statuses() . " GROUP BY " . Reservation::column('booking_id') . ") alias ON " . Booking::id_column() . " = alias.bookingid AND " . Reservation::id_column() . " = alias.resid"
            . " INNER JOIN " . Room_Skeleton::tableName() . " ON " . Reservation::column('asset_id') . " = " . Room_Skeleton::asset_id_column() . ""
            . " INNER JOIN " . Usage::tableName() . " ON " . Room_Skeleton::column('usage_id') . " = " . Usage::id_column() . ""
            . " INNER JOIN " . Runt_Usage_UsageSuperset::tableName() . " ON " . Usage::id_column() . " = " . Runt_Usage_UsageSuperset::column('usage_id') . ""
            . " INNER JOIN " . UsageSuperset::tableName() . " ON " . Runt_Usage_UsageSuperset::column('usage_superset_id') . " = " . UsageSuperset::id_column() . ""
            . "" . $this->_get_non_venue_payments_join() . ""
            . " WHERE " . $this->_get_non_venue_payments_where(false) . ""
            . "" . $this->_get_non_hidden_statuses() . ""
            . " AND " . Booking::enabled_column() . " = 1"
            . " AND " . Reservation::enabled_column() . " = 1"
            . " AND " . Booking::column('created') . " <= '" . $startDate . "' AND " . Booking::column('created') . " >= '" . $endDate . "'"
            . " AND " . Usage::enabled_column() . " = 1 AND " . Runt_Usage_UsageSuperset::enabled_column() . " = 1 AND " . UsageSuperset::enabled_column() . " = 1 AND " . UsageSuperset::column('hidden') . " = 0"
            . " ORDER BY YEAR(" . Booking::column('created') . ") ASC, MONTH(" . Booking::column('created') . ") ASC";
        $superset_split_arr_query = $this->db->query($query);
        foreach ($superset_split_arr_query->result_array() as $superset_split)
        {
            if ($superset_split['date_title'] != null)
            {
                if (!isset($superset_split_arr[$superset_split['date_title']][$superset_split['superset_id']]))
                {
                    $superset_split_arr[$superset_split['date_title']][$superset_split['superset_id']]['book_number'] = 0;
                    $superset_split_arr[$superset_split['date_title']][$superset_split['superset_id']]['revenue_total'] = 0;
                    $superset_split_arr[$superset_split['date_title']][$superset_split['superset_id']]['gmv_total'] = 0;
                }
                $superset_split_arr[$superset_split['date_title']][$superset_split['superset_id']]['book_number'] += 1;
                $superset_split_arr[$superset_split['date_title']][$superset_split['superset_id']]['revenue_total'] += ($superset_split['toZipcube'] + $superset_split['extra_fee'] + $superset_split['flexible_fee'] + $superset_split['price_control_fee']) * (($superset_split['currency'] == 'EUR')?$retMods['eurMod']:(($superset_split['currency'] == 'USD')?$retMods['usdMod']:1));
                $superset_split_arr[$superset_split['date_title']][$superset_split['superset_id']]['gmv_total'] += ($superset_split['price'] + $superset_split['extra_fee'] + $superset_split['flexible_fee'] + $superset_split['price_control_fee']) * (($superset_split['currency'] == 'EUR')?$retMods['eurMod']:(($superset_split['currency'] == 'USD')?$retMods['usdMod']:1));
            }
        }

        $subRowTitles['book_number'] = '# Bookings';
        $subRowTitles['gmv_total'] = 'GMV (£)';
        $subRowTitles['revenue_total'] = 'Expected Revenue (£)';

        $cols = [];
        $data = [];
        foreach ($superset_split_arr as $dateKey => $bookingTypes)
        {
            $cols[] = $dateKey;
            foreach ($bookingTypes as $superset_id => $nums)
            {
                if (isset($rowTitle[$superset_id]))
                {
                    foreach ($nums as $num_type => $value)
                    {
                        $data[$dateKey][$superset_id][$num_type] = round($value);
                    }
                }
            }
        }
        return ['cols' => $cols, 'data' => $data, 'row_titles' => $rowTitle, 'sub_row_titles' => $subRowTitles];
    }

    public function get_venue_control($date)
    {
        $formattedDate = $date->format("Y-m-d");

        $retArr = [];
        $query = "SELECT SUM(" . Reservation::column('toVenue') . " - (CASE WHEN " . Reservation::column('toVenue_vat') . " IS NOT NULL THEN " . Reservation::column('toVenue_vat') . " ELSE 0 END)) AS payout_total, SUM(CASE WHEN " . Reservation::column('toVenue_vat') . " IS NOT NULL THEN " . Reservation::column('toVenue_vat') . " ELSE 0 END) AS venue_vat_total, SUM((CASE WHEN " . Reservation::column('extra_fee_vat') . " IS NOT NULL THEN " . Reservation::column('extra_fee_vat') . " ELSE 0 END) + (CASE WHEN " . Reservation::column('flexible_fee_vat') . " IS NOT NULL THEN " . Reservation::column('flexible_fee_vat') . " ELSE 0 END) + (CASE WHEN " . Reservation::column('price_control_fee_vat') . " IS NOT NULL THEN " . Reservation::column('price_control_fee_vat') . " ELSE 0 END)) AS client_vat_total, " . Reservation::column('currency') . " AS currency"
            . " FROM " . Booking::tableName() . ""
            . " INNER JOIN " . Reservation::tableName() . " ON " . Booking::id_column() . " = " . Reservation::column('booking_id') . ""
            . " INNER JOIN " . Booked_Period::tableName() . " ON " . Booked_Period::column('reservation_id') . " = " . Reservation::id_column() . ""
            . " INNER JOIN (SELECT " . Reservation::column('booking_id') . " AS bookingid, MAX(" . Reservation::id_column() . ") AS resid FROM " . Reservation::tableName() . " WHERE " . Reservation::column('booking_id') . " IS NOT NULL AND " . Reservation::enabled_column() . " = 1 " . $this->_get_non_hidden_statuses() . " GROUP BY " . Reservation::column('booking_id') . ") alias ON " . Booking::id_column() . " = alias.bookingid AND " . Reservation::id_column() . " = alias.resid"
            . " WHERE " . Reservation::column('booking_id') . " IS NOT NULL"
            . " AND " . Reservation::enabled_column() . " = 1"
            . " AND " . Reservation::column('is_paid') . " = 0"
            . " AND " . Reservation::column('reservationStatus_id') . " IN (" . Reservation_Status::CANCELLEDBYHOST . "," . Reservation_Status::CANCELLEDBYUSER . "," . Reservation_Status::CHECKIN . "," . Reservation_Status::AWAITINGHOSTREVIEW . "," .  Reservation_Status::AWAITINGUSERREVIEW . "," . Reservation_Status::COMPLETED . ")"
            . "" . $this->_get_non_hidden_statuses() . ""
            . " AND " . Booking::enabled_column() . " = 1"
            . " AND " . Booked_Period::column('start') . " < '" . $formattedDate . "'"
            . " AND " . Reservation::column('toVenue') . " > 0"
            . " AND NOT EXISTS (SELECT " . Payment::column('booking_id') . " FROM " . Payment::tableName() . " WHERE " . Payment::column('payment_type_id') . " IN (" . Payment_Type::INVOICE . "," . Payment_Type::VENUEINVOICE . ") AND " . Payment::enabled_column() . " = 1 AND " . Booking::id_column() . "=" . Payment::column('booking_id') . ")"
            . " GROUP BY " . Reservation::column('currency') . "";
        $past_query = $this->db->query($query);
        foreach ($past_query->result_array() as $past)
        {
            $retArr[$past['currency']] = [
                'payout_total' => $past['payout_total'],
                'venue_vat_total' => $past['venue_vat_total'],
                'client_vat_total' => $past['client_vat_total'],
                'payment_amo' => 0,
                'total' => (round($past['payout_total'], 2) + round($past['venue_vat_total'], 2) + round($past['client_vat_total'], 2))
            ];
        }
        $query = "SELECT SUM(payment_amo) AS payment_amo, " . Reservation::column('currency') . " AS currency"
            . " FROM " . Booking::tableName() . ""
            . " INNER JOIN " . Reservation::tableName() . " ON " . Booking::id_column() . " = " . Reservation::column('booking_id') . ""
            . " INNER JOIN " . Booked_Period::tableName() . " ON " . Booked_Period::column('reservation_id') . " = " . Reservation::id_column() . ""
            . " INNER JOIN (SELECT " . Reservation::column('booking_id') . " AS bookingid, MAX(" . Reservation::id_column() . ") AS resid FROM " . Reservation::tableName() . " WHERE " . Reservation::column('booking_id') . " IS NOT NULL AND " . Reservation::enabled_column() . " = 1 " . $this->_get_non_hidden_statuses() . " GROUP BY " . Reservation::column('booking_id') . ") alias ON " . Booking::id_column() . " = alias.bookingid AND " . Reservation::id_column() . " = alias.resid"
            . " LEFT JOIN (SELECT (CASE WHEN payment_count IS NOT NULL THEN SUM((CASE WHEN " . Payment::column('payment_status_id') . " = " . Payment_Status::REFUND . " THEN -1 ELSE 1 END) * payments.amount)/payment_count ELSE SUM((CASE WHEN " . Payment::column('payment_status_id') . " = " . Payment_Status::REFUND . " THEN -1 ELSE 1 END) * payments.amount) END) AS payment_amo, " . Payment::column('booking_id') . " AS booking_id FROM " . Payment::tableName() . " LEFT JOIN (SELECT COUNT(" . Payment::column('external_reference') . ") AS payment_count, " . Payment::column('external_reference') . " AS external_reference FROM " . Payment::tableName() . " WHERE " . Payment::column('payment_type_id') . " = " . Payment_Type::BRAINTREE . " AND " . Payment::enabled_column() . " = 1 AND " . Payment::column('payment_status_id') . " IN (" . Payment_Status::COMPLETE . "," . Payment_Status::REFUND . "," . Payment_Status::SUBMITTED . ") GROUP BY " . Payment::column('external_reference') . " HAVING COUNT(" . Payment::column('external_reference') . ") > 1) multi_payment ON multi_payment.external_reference = " . Payment::column('external_reference') . " WHERE " . Payment::column('payment_type_id') . " NOT IN (" . Payment_Type::INVOICE . "," . Payment_Type::VENUEINVOICE . ") AND " . Payment::enabled_column() . " = 1 AND " . Payment::column('payment_status_id') . " IN (" . Payment_Status::COMPLETE . "," . Payment_Status::REFUND . "," . Payment_Status::SUBMITTED . ") GROUP BY " . Payment::column('booking_id') . ") pay_alias ON pay_alias.booking_id=" . Booking::id_column() . ""
            . " WHERE " . Reservation::column('booking_id') . " IS NOT NULL"
            . " AND " . Reservation::enabled_column() . " = 1"
            . " AND " . Reservation::column('is_paid') . " = 0"
            . " AND " . Reservation::column('reservationStatus_id') . " NOT IN (" . Reservation_Status::EXPIRED . "," . Reservation_Status::DECLINE . ")"
            . "" . $this->_get_non_hidden_statuses() . ""
            . " AND " . Booking::enabled_column() . " = 1"
            . " AND " . Booked_Period::column('start') . " >= '" . $formattedDate . "'"
            . " AND " . Reservation::column('toVenue') . " > 0"
            . " GROUP BY " . Reservation::column('currency') . "";
        $future_query = $this->db->query($query);
        foreach ($future_query->result_array() as $future)
        {
            if (!isset($retArr[$future['currency']]))
            {
                $retArr[$future['currency']]['payout_total'] = 0;
                $retArr[$future['currency']]['venue_vat_total'] = 0;
                $retArr[$future['currency']]['client_vat_total'] = 0;
                $retArr[$future['currency']]['total'] = 0;
            }
            $retArr[$future['currency']]['payment_amo'] = $future['payment_amo'];
            $retArr[$future['currency']]['total'] += round($future['payment_amo'], 2);
        }
        return $retArr;
    }

    public function get_monthly_assets($asset_type, $start, $end)
    {
        $startDate = $start->format("Y-m-d");
        $endDate = $end->format("Y-m-d");
        switch ($asset_type)
        {
            case Asset_Type::COMPANY:
            break;

            case Asset_Type::VENUE:

//                $totalquery = "SELECT DATE_FORMAT(" . Venue::column('created') . ", '%b %Y') AS date_title, COUNT(DISTINCT " . Venue::id_column() . ") as count, " . Location::id_column() . " AS country_id, " . Location::column('human_desc') . " AS country"
//                    . " FROM " . Venue::tableName() . ""
//                    . " LEFT JOIN " . Location::tableName() . " ON " . Venue::column('country_code') . " = " . Location::column('country') . " AND " . Location::column('category_type') . " = " . Location_Category::COUNTRY . ""
//                    . " WHERE " . Venue::enabled_column() . " = 1"
//                    . " GROUP BY MONTH(" . Venue::column('created') . "), YEAR(" . Venue::column('created') . ")"
//                    . " ORDER BY YEAR(" . Venue::column('created') . ") ASC, MONTH(" . Venue::column('created') . ") ASC";

                $query = "SELECT DATE_FORMAT(" . Venue::column('created') . ", '%b %Y') AS date_title, YEAR(" . Venue::column('created') . ") as year, MONTH(" . Venue::column('created') . ") as monthnum, COUNT(DISTINCT " . Venue::id_column() . ") as count, " . Location::id_column() . " AS country_id, " . Location::column('human_desc') . " AS country, 'created' as type, 0 as ordering"
                    . " FROM " . Venue::tableName() . ""
                    . " LEFT JOIN " . Location::tableName() . " ON " . Venue::column('country_code') . " = " . Location::column('country') . " AND " . Location::column('category_type') . " = " . Location_Category::COUNTRY . ""
                    . " WHERE " . Venue::enabled_column() . " = 1 AND " . Venue::column('created') . " <= '" . $startDate . "' AND " . Venue::column('created') . " >= '" . $endDate . "'"
                    . " GROUP BY MONTH(" . Venue::column('created') . "), YEAR(" . Venue::column('created') . "), country_id, country"
                    . " UNION"
                    . " SELECT DATE_FORMAT(" . Venue::column('approved_datetime') . ", '%b %Y') AS date_title, YEAR(" . Venue::column('approved_datetime') . ") as year, MONTH(" . Venue::column('approved_datetime') . ") as monthnum, COUNT(DISTINCT " . Venue::id_column() . ") as count, " . Location::id_column() . " AS country_id, " . Location::column('human_desc') . " AS country, 'approved' as type, 1 as ordering"
                    . " FROM " . Venue::tableName() . ""
                    . " LEFT JOIN " . Location::tableName() . " ON " . Venue::column('country_code') . " = " . Location::column('country') . " AND " . Location::column('category_type') . " = " . Location_Category::COUNTRY . ""
                    . " WHERE " . Venue::enabled_column() . " = 1 AND " . Venue::column('approved_datetime') . " <= '" . $startDate . "' AND " . Venue::column('approved_datetime') . " >= '" . $endDate . "'"
                    . " GROUP BY MONTH(" . Venue::column('approved_datetime') . "), YEAR(" . Venue::column('approved_datetime') . "), country_id, country"
                    . "" . $this->_get_monthly_selling_venues('overview_selling', 2, [], null, false, $startDate, $endDate) . ""
                    . "" . $this->_get_monthly_selling_venues('widget/calendar_selling', 3, [Booking_Channel::VENUECALENDAR, Booking_Channel::WIDGET], "OR", true, $startDate, $endDate) . ""
                    . "" . $this->_get_monthly_selling_venues('website_selling', 4, [Booking_Channel::FRONTEND], "AND", true, $startDate, $endDate) . ""
                    . " ORDER BY year ASC, monthnum ASC, country, ordering ASC";
            break;

            case Asset_Type::ROOM:

                $query = "SELECT DATE_FORMAT(" . Room_Skeleton::column('created') . ", '%b %Y') AS date_title, YEAR(" . Room_Skeleton::column('created') . ") as year, MONTH(" . Room_Skeleton::column('created') . ") as monthnum, COUNT(DISTINCT " . Room_Skeleton::id_column() . ") as count, " . Location::id_column() . " AS country_id, " . Location::column('human_desc') . " AS country, 'created' as type, 0 as ordering"
                    . " FROM " . Room_Skeleton::tableName() . ""
                    . " INNER JOIN " . Venue::tableName() . " ON " . Room_Skeleton::column('venue_id') . " = " . Venue::id_column() . ""
                    . " LEFT JOIN " . Location::tableName() . " ON " . Venue::column('country_code') . " = " . Location::column('country') . " AND " . Location::column('category_type') . " = " . Location_Category::COUNTRY . ""
                    . " WHERE " . Room_Skeleton::enabled_column() . " = 1 AND " . Room_Skeleton::column('created') . " <= '" . $startDate . "' AND " . Room_Skeleton::column('created') . " >= '" . $endDate . "'"
                    . " GROUP BY MONTH(" . Room_Skeleton::column('created') . "), YEAR(" . Room_Skeleton::column('created') . "), country_id, country"
                    . " UNION"
                    . " SELECT DATE_FORMAT(" . Room_Skeleton::column('approved_datetime') . ", '%b %Y') AS date_title, YEAR(" . Room_Skeleton::column('approved_datetime') . ") as year, MONTH(" . Room_Skeleton::column('approved_datetime') . ") as monthnum, COUNT(DISTINCT " . Room_Skeleton::id_column() . ") as count, " . Location::id_column() . " AS country_id, " . Location::column('human_desc') . " AS country, 'approved' as type, 1 as ordering"
                    . " FROM " . Room_Skeleton::tableName() . ""
                    . " INNER JOIN " . Venue::tableName() . " ON " . Room_Skeleton::column('venue_id') . " = " . Venue::id_column() . ""
                    . " LEFT JOIN " . Location::tableName() . " ON " . Venue::column('country_code') . " = " . Location::column('country') . " AND " . Location::column('category_type') . " = " . Location_Category::COUNTRY . ""
                    . " WHERE " . Room_Skeleton::enabled_column() . " = 1 AND " . Room_Skeleton::column('approved_datetime') . " <= '" . $startDate . "' AND " . Room_Skeleton::column('approved_datetime') . " >= '" . $endDate . "'"
                    . " GROUP BY MONTH(" . Room_Skeleton::column('approved_datetime') . "), YEAR(" . Room_Skeleton::column('approved_datetime') . "), country_id, country"
                    . "" . $this->_get_monthly_selling_rooms('overview_selling', 2, [], null, false, $startDate, $endDate) . ""
                    . "" . $this->_get_monthly_selling_rooms('widget/calendar_selling', 3, [Booking_Channel::VENUECALENDAR, Booking_Channel::WIDGET], "OR", true, $startDate, $endDate) . ""
                    . "" . $this->_get_monthly_selling_rooms('website_selling', 4, [Booking_Channel::FRONTEND], "AND", true, $startDate, $endDate) . ""
                    . " ORDER BY year ASC, monthnum ASC, country, ordering ASC";
            break;
        }
        $asset_query = $this->db->query($query);
        $assets_arr = [];
        $subRowTitles = [];
        foreach ($asset_query->result_array() as $assets)
        {
            if ($assets['date_title'] != null)
            {
                $assets_arr[$assets['date_title']][$assets['country_id']][$assets['type']] = $assets['count'];
                $subRowTitles[$assets['country_id']] = ((!isset($assets['country']))?'Unknown':$assets['country']);
                if (!isset($assets_arr[$assets['date_title']][$assets['country_id']]['created']))
                {
                    $assets_arr[$assets['date_title']][$assets['country_id']]['created'] = 0;
                }
            }
        }
        asort($subRowTitles);
//        $rowTitle['total'] = '# All';
        $rowTitle['created'] = '# Created';
        $rowTitle['approved'] = '# Approved';
        $rowTitle['overview_selling'] = '# Selling';
        $rowTitle['widget/calendar_selling'] = '# Widget/Calendar Selling Only';
        $rowTitle['website_selling'] = '# Website Selling Only';

        $cols = [];
        $data = [];
//        $total = [];
//        $total_asset_query = $this->db->query($totalquery);
//        foreach ($total_asset_query->result_array() as $totalassets)
//        {
//            if ($totalassets['date_title'] != null)
//            {
//                if (isset($total[$totalassets['country_id']]))
//                {
//                    $total[$totalassets['country_id']] += $totalassets['count'];
//                }
//                else
//                {
//                    $total[$totalassets['country_id']] = $totalassets['count'];
//                }
//                $data[$totalassets['date_title']]['total'][$totalassets['country_id']] = $total[$totalassets['country_id']];
//            }
//        }
        foreach ($assets_arr as $dateKey => $countries)
        {
            $cols[] = $dateKey;
            foreach ($countries as $country => $rowTypes)
            {
                foreach ($rowTypes as $rowType => $value)
                {
                    if (isset($rowTitle[$rowType]))
                    {
                        $data[$dateKey][$rowType][$country] = $value;
                    }
                }
            }
        }
        return ['cols' => $cols, 'data' => $data, 'row_titles' => $rowTitle, 'sub_row_titles' => $subRowTitles];
    }

    private function _get_monthly_selling_venues($alias, $ordering, $bookingChannel = [], $type = null, $channelOnly = false, $startDate, $endDate)
    {
        $query = " UNION SELECT DATE_FORMAT(" . Booking::column('created') . ", '%b %Y') AS date_title, YEAR(" . Booking::column('created') . ") as year, MONTH(" . Booking::column('created') . ") as monthnum, COUNT(DISTINCT " . Venue::id_column() . ") as count, " . Location::id_column() . " AS country_id, " . Location::column('human_desc') . " AS country, '" . $alias . "' as type, " . $ordering . " as ordering"
            . " FROM " . Venue::tableName() . ""
            . " INNER JOIN " . Room_Skeleton::tableName() . " ON " . Venue::id_column() . " = " . Room_Skeleton::column('venue_id') . ""
            . " INNER JOIN " . Reservation::tableName() . " ON " . Room_Skeleton::asset_id_column() . " = " . Reservation::column('asset_id') . ""
            . " INNER JOIN " . Booking::tableName() . " ON " . Booking::id_column() . " = " . Reservation::column('booking_id') . ""
            . "" . $this->_get_non_venue_payments_join() . ""
            . " LEFT JOIN " . Location::tableName() . " ON " . Venue::column('country_code') . " = " . Location::column('country') . " AND " . Location::column('category_type') . " = " . Location_Category::COUNTRY . "";
            if ($channelOnly)
            {
                $query .= " LEFT JOIN (SELECT YEAR(" . Booking::column('created') . ") as year, MONTH(" . Booking::column('created') . ") as monthnum, " . Venue::id_column() . " as venue_id"
                    . " FROM " . Venue::tableName() . ""
                    . " INNER JOIN " . Room_Skeleton::tableName() . " ON " . Venue::id_column() . " = " . Room_Skeleton::column('venue_id') . ""
                    . " INNER JOIN " . Reservation::tableName() . " ON " . Room_Skeleton::asset_id_column() . " = " . Reservation::column('asset_id') . ""
                    . " INNER JOIN " . Booking::tableName() . " ON " . Booking::id_column() . " = " . Reservation::column('booking_id') . ""
                    . "" . $this->_get_non_venue_payments_join() . ""
                    . " WHERE " . Venue::column('approved') . " = 1 AND " . Venue::enabled_column() . " = 1"
                    . "" . $this->_get_non_venue_payments_where() . ""
                    . "" . $this->_get_non_hidden_statuses() . ""
                    . "" . $this->_get_bookingChannel_sql_where($bookingChannel, "AND", '<>') . ""
                    . " AND " . Booking::enabled_column() . " = 1"
                    . " AND " . Reservation::enabled_column() . " = 1"
                    . ") alias ON " . Venue::id_column() . " = alias.venue_id AND YEAR(" . Booking::column('created') . ")=alias.year AND MONTH(" . Booking::column('created') . ")=alias.monthnum";
            }
            $query .= " WHERE " . Venue::column('approved') . " = 1 AND " . Venue::enabled_column() . " = 1 AND " . Booking::column('created') . " <= '" . $startDate . "' AND " . Booking::column('created') . " >= '" . $endDate . "'"
            . "" . $this->_get_non_venue_payments_where() . ""
            . "" . $this->_get_non_hidden_statuses() . ""
            . "" . $this->_get_bookingChannel_sql_where($bookingChannel, $type) . ""
            . " AND " . Booking::enabled_column() . " = 1"
            . " AND " . Reservation::enabled_column() . " = 1";
            if ($channelOnly)
            {
                $query .= " AND alias.venue_id IS NULL AND alias.year IS NULL AND alias.monthnum IS NULL";
            }
            $query .= " GROUP BY MONTH(" . Booking::column('created') . "), YEAR(" . Booking::column('created') . "), country_id, country";
        return $query;
    }

    private function _get_monthly_selling_rooms($alias, $ordering, $bookingChannel = [], $type = null, $channelOnly = false, $startDate, $endDate)
    {
        $query = " UNION SELECT DATE_FORMAT(" . Booking::column('created') . ", '%b %Y') AS date_title, YEAR(" . Booking::column('created') . ") as year, MONTH(" . Booking::column('created') . ") as monthnum, COUNT(DISTINCT " . Room_Skeleton::id_column() . ") as count, " . Location::id_column() . " AS country_id, " . Location::column('human_desc') . " AS country, '" . $alias . "' as type, " . $ordering . " as ordering"
            . " FROM " . Room_Skeleton::tableName() . ""
            . " INNER JOIN " . Reservation::tableName() . " ON " . Room_Skeleton::asset_id_column() . " = " . Reservation::column('asset_id') . ""
            . " INNER JOIN " . Booking::tableName() . " ON " . Booking::id_column() . " = " . Reservation::column('booking_id') . ""
            . "" . $this->_get_non_venue_payments_join() . ""
            . " INNER JOIN " . Venue::tableName() . " ON " . Room_Skeleton::column('venue_id') . " = " . Venue::id_column() . ""
            . " LEFT JOIN " . Location::tableName() . " ON " . Venue::column('country_code') . " = " . Location::column('country') . " AND " . Location::column('category_type') . " = " . Location_Category::COUNTRY . "";
            if ($channelOnly)
            {
                $query .= " LEFT JOIN (SELECT YEAR(" . Booking::column('created') . ") as year, MONTH(" . Booking::column('created') . ") as monthnum, " . Room_Skeleton::id_column() . " as room_id"
                    . " FROM " . Room_Skeleton::tableName() . ""
                    . " INNER JOIN " . Reservation::tableName() . " ON " . Room_Skeleton::asset_id_column() . " = " . Reservation::column('asset_id') . ""
                    . " INNER JOIN " . Booking::tableName() . " ON " . Booking::id_column() . " = " . Reservation::column('booking_id') . ""
                    . "" . $this->_get_non_venue_payments_join() . ""
                    . " WHERE " . Room_Skeleton::column('approved') . " = 1 AND " . Room_Skeleton::enabled_column() . " = 1"
                    . "" . $this->_get_non_venue_payments_where() . ""
                    . "" . $this->_get_non_hidden_statuses() . ""
                    . "" . $this->_get_bookingChannel_sql_where($bookingChannel, "AND", '<>') . ""
                    . " AND " . Booking::enabled_column() . " = 1"
                    . " AND " . Reservation::enabled_column() . " = 1"
                    . ") alias ON " . Room_Skeleton::id_column() . " = alias.room_id AND YEAR(" . Booking::column('created') . ")=alias.year AND MONTH(" . Booking::column('created') . ")=alias.monthnum";
            }
            $query .= " WHERE " . Room_Skeleton::column('approved') . " = 1 AND " . Room_Skeleton::enabled_column() . " = 1 AND " . Booking::column('created') . " <= '" . $startDate . "' AND " . Booking::column('created') . " >= '" . $endDate . "'"
            . "" . $this->_get_non_venue_payments_where() . ""
            . "" . $this->_get_non_hidden_statuses() . ""
            . "" . $this->_get_bookingChannel_sql_where($bookingChannel, $type) . ""
            . " AND " . Booking::enabled_column() . " = 1"
            . " AND " . Reservation::enabled_column() . " = 1";
            if ($channelOnly)
            {
                $query .= " AND alias.room_id IS NULL AND alias.year IS NULL AND alias.monthnum IS NULL";
            }
            $query .= " GROUP BY MONTH(" . Booking::column('created') . "), YEAR(" . Booking::column('created') . "), country_id, country";
        return $query;
    }

    private function _get_non_venue_payments_join()
    {
        return " INNER JOIN (SELECT " . Payment::column('booking_id') . ", MAX(" . Payment::column('payment_type_id') . ") AS paymentType FROM " . Payment::tableName() . " WHERE " . Payment::enabled_column() . " = 1 GROUP BY " . Payment::column('booking_id') . ") pay_alias ON " . Booking::id_column() . " = pay_alias.booking_id";
    }

    private function _get_non_venue_payments_where($withAnd = true)
    {
        $retStr = "";
        if ($withAnd)
        {
            $retStr = " AND ";
        }
        $retStr .= "paymentType <> " . Payment_Type::VENUEINVOICE;
        return $retStr;
    }

//    private function _get_non_invoice_payments_where($withAnd = true)
//    {
//        $retStr = "";
//        if ($withAnd)
//        {
//            $retStr = " AND ";
//        }
//        $retStr .= "paymentType <> " . Payment_Type::INVOICE;
//        return $retStr;
//    }

    private function _get_non_hidden_statuses()
    {
        return " AND " . Reservation::column('reservationStatus_id') . " NOT IN (" . implode(",", Reservation::get_hiddenfromStats()) . ")";
    }

    private function _get_flexible_where($withAnd = true)
    {
        $retStr = "";
        if ($withAnd)
        {
            $retStr = " AND ";
        }
        $retStr .= Reservation::column('flexible_fee') . " IS NOT NULL AND " . Reservation::column('flexible_applied') . " = 1";
        return $retStr;
    }

    private function _get_non_flexible_where($withAnd = true)
    {
        $retStr = "";
        if ($withAnd)
        {
            $retStr = " AND ";
        }
        $retStr .= Reservation::column('flexible_applied') . " = 0";
        return $retStr;
    }

    private function _get_bookingChannel_sql_where($bookingChannel, $type, $comparator = null)
    {
        $retStr = "";
        if (count($bookingChannel) > 0)
        {
            $first = true;
            foreach ($bookingChannel as $where)
            {
                if (!$first)
                {
                    if ($type == "OR")
                    {
                        $retStr .= " OR ";
                    }
                    else
                    {
                        $retStr .= " AND ";
                    }
                    $retStr .= Booking::column('bookingChannel_id') . " " . (($comparator != null)?$comparator:'=') . " " . $where;
                }
                else
                {
                    $retStr .= " AND (" . Booking::column('bookingChannel_id') . " " . (($comparator != null)?$comparator:'=') . " " . $where;
                    $first = false;
                }
            }
            $retStr .= ")";
        }
        return $retStr;
    }

    public function get_all_reservations($start, $end)
    {
        $retMods = $this->_get_currency_mods();
        $startDate = $start->format("Y-m-d");
        $endDate = $end->format("Y-m-d");

        $date_arr = [];
        $query = "SELECT DATE(" . Booking::column('created') . ") AS date_created, " . Reservation::column('price') . " AS price, " . Reservation::column('toZipcube') . " AS toZipcube, (CASE WHEN " . Reservation::column('extra_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('extra_fee') . " END) AS extra_fee, (CASE WHEN " . Reservation::column('flexible_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('flexible_fee') . " END) AS flexible_fee, (CASE WHEN " . Reservation::column('price_control_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('price_control_fee') . " END) AS price_control_fee, " . Reservation::column('source') . " AS source, " . Reservation::column('currency') . " AS currency"
            . " FROM " . Reservation::tableName() . ""
            . " INNER JOIN " . Booking::tableName() . " ON " . Booking::id_column() . " = " . Reservation::column('booking_id') . ""
            . "" . $this->_get_non_venue_payments_join() . ""
            . " INNER JOIN (SELECT MAX(" . Reservation::id_column() . ") AS currID, " . Reservation::column('booking_id') . " AS bookingid FROM " . Reservation::tableName() . " WHERE " . Reservation::column('booking_id') . " IS NOT NULL AND " . Reservation::enabled_column() . " = 1 GROUP BY " . Reservation::column('booking_id') . ") AS currRes ON currRes.currId = " . Reservation::id_column() . " AND currRes.bookingid = " . Booking::id_column() . ""
            . " WHERE " . Booking::column('created') . " <= '" . $startDate . "' AND " . Booking::column('created') . " >= '" . $endDate . "'"
            . "" . $this->_get_non_venue_payments_where() . ""
            . "" . $this->_get_non_hidden_statuses() . ""
            . " AND " . Booking::enabled_column() . " = 1"
            . " AND " . Reservation::enabled_column() . " = 1"
            . " ORDER BY DATE(" . Booking::column('created') . ") DESC";
        $reservation_query = $this->db->query($query);
        foreach ($reservation_query->result_array() as $reservation)
        {
            if (!isset($date_arr[$reservation['date_created']]))
            {
                $date_arr[$reservation['date_created']]['number'] = 0;
                $date_arr[$reservation['date_created']]['price'] = 0;
                $date_arr[$reservation['date_created']]['revenue'] = 0;
                $date_arr[$reservation['date_created']]['accept_number'] = 0;
                $date_arr[$reservation['date_created']]['accept_revenue'] = 0;
                $date_arr[$reservation['date_created']]['accept_extra_fee'] = 0;
                $date_arr[$reservation['date_created']]['accept_flexible_fee'] = 0;
                $date_arr[$reservation['date_created']]['accept_price_control_fee'] = 0;
                $date_arr[$reservation['date_created']]['closed_rev'] = 0;
            }
            if (!isset($date_arr[$reservation['date_created']]['source'][$reservation['source']]))
            {
                $date_arr[$reservation['date_created']]['source'][$reservation['source']] = 0;
            }
            if (!isset($date_arr['sources'][$reservation['source']]))
            {
                $date_arr['sources'][$reservation['source']] = '';
            }
            $date_arr[$reservation['date_created']]['number'] += 1;
            $date_arr[$reservation['date_created']]['price'] += ($reservation['price'] + $reservation['extra_fee'] + $reservation['flexible_fee'] + $reservation['price_control_fee']) * (($reservation['currency'] == 'EUR')?$retMods['eurMod']:(($reservation['currency'] == 'USD')?$retMods['usdMod']:1));
            $date_arr[$reservation['date_created']]['revenue'] += ($reservation['toZipcube'] + $reservation['extra_fee'] + $reservation['flexible_fee'] + $reservation['price_control_fee']) * (($reservation['currency'] == 'EUR')?$retMods['eurMod']:(($reservation['currency'] == 'USD')?$retMods['usdMod']:1));
            $date_arr[$reservation['date_created']]['source'][$reservation['source']] += 1;
        }

        $acceptquery = "SELECT MAX(DATE(" . Reservation_Audit::column('date_time') . ")) AS date_accepted, " . Reservation::column('toZipcube') . " AS toZipcube, (CASE WHEN " . Reservation::column('extra_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('extra_fee') . " END) AS extra_fee, (CASE WHEN " . Reservation::column('flexible_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('flexible_fee') . " END) AS flexible_fee, (CASE WHEN " . Reservation::column('price_control_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('price_control_fee') . " END) AS price_control_fee, " . Reservation::column('currency') . " AS currency"
            . " FROM " . Reservation::tableName() . ""
            . " INNER JOIN " . Booking::tableName() . " ON " . Booking::id_column() . " = " . Reservation::column('booking_id') . ""
            . "" . $this->_get_non_venue_payments_join() . ""
            . " INNER JOIN (SELECT MAX(" . Reservation::id_column() . ") AS currID, " . Reservation::column('booking_id') . " AS bookingid FROM " . Reservation::tableName() . " WHERE " . Reservation::column('booking_id') . " IS NOT NULL AND " . Reservation::enabled_column() . " = 1 GROUP BY " . Reservation::column('booking_id') . ") AS currRes ON currRes.currId = " . Reservation::id_column() . " AND currRes.bookingid = " . Booking::id_column() . ""
            . " INNER JOIN " . Reservation_Audit::tableName() . " ON " . Reservation_Audit::column('reservation_id') . " = " . Reservation::id_column() . ""
            . " WHERE " . Reservation_Audit::column('date_time') . " <= '" . $startDate . "' AND " . Reservation_Audit::column('date_time') . " >= '" . $endDate . "' AND " . Reservation_Audit::column('reservation_status_id') . " = " . Reservation_Status::ACCEPTED . ""
            . "" . $this->_get_non_venue_payments_where() . ""
            . "" . $this->_get_non_hidden_statuses() . ""
            . " AND " . Booking::enabled_column() . " = 1"
            . " AND " . Reservation::enabled_column() . " = 1"
            . " GROUP BY " . Reservation::id_column() . ""
            . " ORDER BY MAX(DATE(" . Reservation_Audit::column('date_time') . ")) DESC";
        $reservation_accept_query = $this->db->query($acceptquery);
        foreach ($reservation_accept_query->result_array() as $reservation_accept)
        {
            if (!isset($date_arr[$reservation_accept['date_accepted']]))
            {
                $date_arr[$reservation_accept['date_accepted']]['number'] = 0;
                $date_arr[$reservation_accept['date_accepted']]['price'] = 0;
                $date_arr[$reservation_accept['date_accepted']]['revenue'] = 0;
                $date_arr[$reservation_accept['date_accepted']]['accept_number'] = 0;
                $date_arr[$reservation_accept['date_accepted']]['accept_revenue'] = 0;
                $date_arr[$reservation_accept['date_accepted']]['accept_extra_fee'] = 0;
                $date_arr[$reservation_accept['date_accepted']]['accept_flexible_fee'] = 0;
                $date_arr[$reservation_accept['date_accepted']]['accept_price_control_fee'] = 0;
                $date_arr[$reservation_accept['date_accepted']]['closed_rev'] = 0;
            }
            $date_arr[$reservation_accept['date_accepted']]['accept_number'] += 1;
            $date_arr[$reservation_accept['date_accepted']]['accept_revenue'] += ($reservation_accept['toZipcube'] + $reservation_accept['extra_fee'] + $reservation_accept['flexible_fee'] + $reservation_accept['price_control_fee']) * (($reservation_accept['currency'] == 'EUR')?$retMods['eurMod']:(($reservation_accept['currency'] == 'USD')?$retMods['usdMod']:1));
            $date_arr[$reservation_accept['date_accepted']]['accept_extra_fee'] += $reservation_accept['extra_fee'] * (($reservation_accept['currency'] == 'EUR')?$retMods['eurMod']:(($reservation_accept['currency'] == 'USD')?$retMods['usdMod']:1));
            $date_arr[$reservation_accept['date_accepted']]['accept_flexible_fee'] += $reservation_accept['flexible_fee'] * (($reservation_accept['currency'] == 'EUR')?$retMods['eurMod']:(($reservation_accept['currency'] == 'USD')?$retMods['usdMod']:1));
            $date_arr[$reservation_accept['date_accepted']]['accept_price_control_fee'] += $reservation_accept['price_control_fee'] * (($reservation_accept['currency'] == 'EUR')?$retMods['eurMod']:(($reservation_accept['currency'] == 'USD')?$retMods['usdMod']:1));
        }

        $switchquery = "SELECT DATE(" . Reservation::column('switch_datetime') . ") AS date_switched, COUNT(DISTINCT " . Reservation::column('booking_id') . ") AS number"
            . " FROM " . Reservation::tableName() . ""
            . " INNER JOIN " . Booking::tableName() . " ON " . Booking::id_column() . " = " . Reservation::column('booking_id') . ""
            . "" . $this->_get_non_venue_payments_join() . ""
            . " WHERE " . Reservation::column('switch_datetime') . " <= '" . $startDate . "' AND " . Reservation::column('switch_datetime') . " >= '" . $endDate . "' AND " . Reservation::column('needed_switch') . " = 1"
            . "" . $this->_get_non_venue_payments_where() . ""
            . "" . $this->_get_non_hidden_statuses() . ""
            . " AND " . Booking::enabled_column() . " = 1"
            . " AND " . Reservation::enabled_column() . " = 1"
            . " GROUP BY DATE(" . Reservation::column('switch_datetime') . ")"
            . " ORDER BY DATE(" . Reservation::column('switch_datetime') . ") DESC";
        $reservation_switch_query = $this->db->query($switchquery);
        foreach ($reservation_switch_query->result_array() as $reservation_switch)
        {
            if (!isset($date_arr[$reservation_switch['date_switched']]))
            {
                $date_arr[$reservation_switch['date_switched']]['number'] = 0;
                $date_arr[$reservation_switch['date_switched']]['price'] = 0;
                $date_arr[$reservation_switch['date_switched']]['revenue'] = 0;
                $date_arr[$reservation_switch['date_switched']]['accept_number'] = 0;
                $date_arr[$reservation_switch['date_switched']]['accept_revenue'] = 0;
                $date_arr[$reservation_switch['date_switched']]['accept_extra_fee'] = 0;
                $date_arr[$reservation_switch['date_switched']]['accept_flexible_fee'] = 0;
                $date_arr[$reservation_switch['date_switched']]['accept_price_control_fee'] = 0;
                $date_arr[$reservation_switch['date_switched']]['closed_rev'] = 0;
            }
            $date_arr[$reservation_switch['date_switched']]['switch_number'] = $reservation_switch['number'];
        }

        $switchcomquery = "SELECT DATE(currRes.created) AS date_created, COUNT(DISTINCT currRes.ID) AS number"
            . " FROM " . Reservation::tableName() . ""
            . " INNER JOIN " . Booking::tableName() . " ON " . Booking::id_column() . " = " . Reservation::column('booking_id') . ""
            . "" . $this->_get_non_venue_payments_join() . ""
            . " INNER JOIN (SELECT " . Reservation::id_column() . " AS ID, " . Reservation::column('booking_id') . " AS bookingid, " . Reservation::column('created') . " AS created"
            . " FROM " . Reservation::tableName() . " WHERE " . Reservation::column('needed_switch') . " = 0 "
            . " AND " . Reservation::column('reservationStatus_id') . " IN (" . Reservation_Status::ACCEPTED . "," . Reservation_Status::CHECKIN . "," . Reservation_Status::AWAITINGHOSTREVIEW . "," .  Reservation_Status::AWAITINGUSERREVIEW . "," . Reservation_Status::COMPLETED . ""
            . " AND " . Reservation::column('created') . " <= '" . $startDate . "' AND " . Reservation::column('created') . " >= '" . $endDate . "')"
            . " AND " . Reservation::enabled_column() . " = 1"
            . " GROUP BY " . Reservation::column('booking_id') . ", " . Reservation::column('created') . ") AS currRes ON currRes.bookingid = " . Booking::id_column() . ""
            . " WHERE " . Reservation::column('switch_datetime') . " <= '" . $startDate . "' AND " . Reservation::column('switch_datetime') . " >= '" . $endDate . "' AND " . Reservation::column('needed_switch') . " = 1 "
            . "" . $this->_get_non_venue_payments_where() . ""
            . "" . $this->_get_non_hidden_statuses() . ""
            . " AND " . Booking::enabled_column() . " = 1"
            . " AND " . Reservation::enabled_column() . " = 1"
            . " GROUP BY DATE(currRes.created)"
            . " ORDER BY DATE(currRes.created) DESC";
        $reservation_switchcom_query = $this->db->query($switchcomquery);
        foreach ($reservation_switchcom_query->result_array() as $reservation_switchcom)
        {
            if (!isset($date_arr[$reservation_switchcom['date_created']]))
            {
                $date_arr[$reservation_switchcom['date_created']]['number'] = 0;
                $date_arr[$reservation_switchcom['date_created']]['price'] = 0;
                $date_arr[$reservation_switchcom['date_created']]['revenue'] = 0;
                $date_arr[$reservation_switchcom['date_created']]['accept_number'] = 0;
                $date_arr[$reservation_switchcom['date_created']]['accept_revenue'] = 0;
                $date_arr[$reservation_switchcom['date_created']]['accept_extra_fee'] = 0;
                $date_arr[$reservation_switchcom['date_created']]['accept_flexible_fee'] = 0;
                $date_arr[$reservation_switchcom['date_created']]['accept_price_control_fee'] = 0;
                $date_arr[$reservation_switchcom['date_created']]['closed_rev'] = 0;
            }
            $date_arr[$reservation_switchcom['date_created']]['switchcom_number'] = $reservation_switchcom['number'];
        }

        $revquery = "SELECT DATE(" . Booking::column('closed') . ") AS date_closed, " . Reservation::column('toZipcube') . " AS toZipcube, (CASE WHEN " . Reservation::column('extra_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('extra_fee') . " END) AS extra_fee, (CASE WHEN " . Reservation::column('flexible_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('flexible_fee') . " END) AS flexible_fee, (CASE WHEN " . Reservation::column('price_control_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('price_control_fee') . " END) AS price_control_fee, " . Reservation::column('currency') . " AS currency"
            . " FROM " . Reservation::tableName() . ""
            . " INNER JOIN " . Booking::tableName() . " ON " . Booking::id_column() . " = " . Reservation::column('booking_id') . ""
            . "" . $this->_get_non_venue_payments_join() . ""
            . " INNER JOIN (SELECT MAX(" . Reservation::id_column() . ") AS currID, " . Reservation::column('booking_id') . " AS bookingid FROM " . Reservation::tableName() . " WHERE " . Reservation::column('booking_id') . " IS NOT NULL AND " . Reservation::enabled_column() . " = 1 GROUP BY " . Reservation::column('booking_id') . ") AS currRes ON currRes.currId = " . Reservation::id_column() . " AND currRes.bookingid = " . Booking::id_column() . ""
            . " WHERE " . Booking::column('closed') . " <= '" . $startDate . "' AND " . Booking::column('closed') . " >= '" . $endDate . "'"
            . " AND " . Booking::column('bookingStatus_id') . " = " . Booking_Status::FINISHEDHAPPILY . ""
            . "" . $this->_get_non_venue_payments_where() . ""
            . "" . $this->_get_non_hidden_statuses() . ""
            . " AND " . Booking::enabled_column() . " = 1"
            . " AND " . Reservation::enabled_column() . " = 1"
            . " ORDER BY DATE(" . Booking::column('closed') . ") DESC";
        $reservation_rev_query = $this->db->query($revquery);
        foreach ($reservation_rev_query->result_array() as $reservation_rev)
        {
            if (!isset($date_arr[$reservation_rev['date_closed']]))
            {
                $date_arr[$reservation_rev['date_closed']]['number'] = 0;
                $date_arr[$reservation_rev['date_closed']]['price'] = 0;
                $date_arr[$reservation_rev['date_closed']]['revenue'] = 0;
                $date_arr[$reservation_rev['date_closed']]['accept_number'] = 0;
                $date_arr[$reservation_rev['date_closed']]['accept_revenue'] = 0;
                $date_arr[$reservation_rev['date_closed']]['accept_extra_fee'] = 0;
                $date_arr[$reservation_rev['date_closed']]['accept_flexible_fee'] = 0;
                $date_arr[$reservation_rev['date_closed']]['accept_price_control_fee'] = 0;
                $date_arr[$reservation_rev['date_closed']]['closed_rev'] = 0;
            }
            $date_arr[$reservation_rev['date_closed']]['closed_rev'] += ($reservation_rev['toZipcube'] + $reservation_rev['extra_fee'] + $reservation_rev['flexible_fee'] + $reservation_rev['price_control_fee']) * (($reservation_rev['currency'] == 'EUR')?$retMods['eurMod']:(($reservation_rev['currency'] == 'USD')?$retMods['usdMod']:1));
        }
        return $date_arr;
    }

    public function get_reservation_performance($start, $end)
    {
        $retMods = $this->_get_currency_mods();

        $date_arr = [];
        $query = "SELECT " . User::column('email') . " AS user_email, DATE(" . Booking::column('created') . ") AS date_created, " . Reservation::column('price') . " AS price, " . Reservation::column('toZipcube') . " AS toZipcube, (CASE WHEN " . Reservation::column('extra_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('extra_fee') . " END) AS extra_fee, (CASE WHEN " . Reservation::column('flexible_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('flexible_fee') . " END) AS flexible_fee, (CASE WHEN " . Reservation::column('price_control_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('price_control_fee') . " END) AS price_control_fee, (CASE WHEN " . Reservation::column('source') . " LIKE 'Enquiry%' THEN 'Enquiries' ELSE " . Reservation::column('source') . " END) AS source, " . Reservation::column('currency') . " AS currency"
            . " FROM " . Reservation::tableName() . ""
            . " INNER JOIN " . Booking::tableName() . " ON " . Booking::id_column() . " = " . Reservation::column('booking_id') . ""
            . "" . $this->_get_non_venue_payments_join() . ""
            . " INNER JOIN (SELECT MAX(" . Reservation::id_column() . ") AS currID, " . Reservation::column('booking_id') . " AS bookingid FROM " . Reservation::tableName() . " WHERE " . Reservation::column('booking_id') . " IS NOT NULL AND " . Reservation::enabled_column() . " = 1 GROUP BY " . Reservation::column('booking_id') . ") AS currRes ON currRes.currId = " . Reservation::id_column() . " AND currRes.bookingid = " . Booking::id_column() . ""
            . " LEFT JOIN " . User::tableName() . " ON " . Reservation::column('assigned_user') . "=" . User::id_column() . ""
            . " WHERE " . Booking::column('created') . " <= '" . $start->format("Y-m-d") . "' AND " . Booking::column('created') . " >= '" . $end->format("Y-m-d") . "'"
            . " AND " . Reservation::column('reservationStatus_id') . " IN (" . Reservation_Status::ACCEPTED . "," . Reservation_Status::CHECKIN . "," . Reservation_Status::AWAITINGHOSTREVIEW . "," .  Reservation_Status::AWAITINGUSERREVIEW . "," . Reservation_Status::COMPLETED . ")"
            . "" . $this->_get_non_venue_payments_where() . ""
            . "" . $this->_get_non_hidden_statuses() . ""
            . " AND " . Booking::enabled_column() . " = 1"
            . " AND " . Reservation::enabled_column() . " = 1"
            . " ORDER BY DATE(" . Booking::column('created') . ") DESC";
        $reservation_query = $this->db->query($query);
        foreach ($reservation_query->result_array() as $reservation)
        {
            if (!isset($date_arr[(($reservation['user_email'] != '')?$reservation['user_email']:'Website Unassigned')][$reservation['source']][$reservation['date_created']]))
            {
                $date_arr[(($reservation['user_email'] != '')?$reservation['user_email']:'Website Unassigned')][$reservation['source']][$reservation['date_created']]['number'] = 0;
                $date_arr[(($reservation['user_email'] != '')?$reservation['user_email']:'Website Unassigned')][$reservation['source']][$reservation['date_created']]['price'] = 0;
                $date_arr[(($reservation['user_email'] != '')?$reservation['user_email']:'Website Unassigned')][$reservation['source']][$reservation['date_created']]['revenue'] = 0;
                $date_arr[(($reservation['user_email'] != '')?$reservation['user_email']:'Website Unassigned')][$reservation['source']][$reservation['date_created']]['rev_extra_fee'] = 0;
                $date_arr[(($reservation['user_email'] != '')?$reservation['user_email']:'Website Unassigned')][$reservation['source']][$reservation['date_created']]['rev_flexible_fee'] = 0;
                $date_arr[(($reservation['user_email'] != '')?$reservation['user_email']:'Website Unassigned')][$reservation['source']][$reservation['date_created']]['rev_price_control_fee'] = 0;
            }
            $date_arr[(($reservation['user_email'] != '')?$reservation['user_email']:'Website Unassigned')][$reservation['source']][$reservation['date_created']]['number'] += 1;
            $date_arr[(($reservation['user_email'] != '')?$reservation['user_email']:'Website Unassigned')][$reservation['source']][$reservation['date_created']]['price'] += ($reservation['price'] + $reservation['extra_fee'] + $reservation['flexible_fee'] + $reservation['price_control_fee']) * (($reservation['currency'] == 'EUR')?$retMods['eurMod']:(($reservation['currency'] == 'USD')?$retMods['usdMod']:1));
            $date_arr[(($reservation['user_email'] != '')?$reservation['user_email']:'Website Unassigned')][$reservation['source']][$reservation['date_created']]['revenue'] += ($reservation['toZipcube'] + $reservation['extra_fee'] + $reservation['flexible_fee'] + $reservation['price_control_fee']) * (($reservation['currency'] == 'EUR')?$retMods['eurMod']:(($reservation['currency'] == 'USD')?$retMods['usdMod']:1));
            $date_arr[(($reservation['user_email'] != '')?$reservation['user_email']:'Website Unassigned')][$reservation['source']][$reservation['date_created']]['rev_extra_fee'] += $reservation['extra_fee'] * (($reservation['currency'] == 'EUR')?$retMods['eurMod']:(($reservation['currency'] == 'USD')?$retMods['usdMod']:1));
            $date_arr[(($reservation['user_email'] != '')?$reservation['user_email']:'Website Unassigned')][$reservation['source']][$reservation['date_created']]['rev_flexible_fee'] += $reservation['flexible_fee'] * (($reservation['currency'] == 'EUR')?$retMods['eurMod']:(($reservation['currency'] == 'USD')?$retMods['usdMod']:1));
            $date_arr[(($reservation['user_email'] != '')?$reservation['user_email']:'Website Unassigned')][$reservation['source']][$reservation['date_created']]['rev_price_control_fee'] += $reservation['price_control_fee'] * (($reservation['currency'] == 'EUR')?$retMods['eurMod']:(($reservation['currency'] == 'USD')?$retMods['usdMod']:1));
        }
        return $date_arr;
    }

    public function get_reservation_switch_amounts($start, $end)
    {
        $date_arr = [];
        $query = "SELECT user_email, DATE(created) AS date_created, COUNT(id) AS number"
            . " FROM (SELECT " . User::column('email') . " AS user_email, " . Reservation::column('created') . " AS created, " . Reservation::id_column() . " AS id"
            . " FROM " . Reservation::tableName() . ""
            . " INNER JOIN " . Booking::tableName() . " ON " . Booking::id_column() . " = " . Reservation::column('booking_id') . ""
            . "" . $this->_get_non_venue_payments_join() . ""
            . " INNER JOIN (SELECT MAX(" . Reservation::id_column() . ") AS currID, " . Reservation::column('booking_id') . " AS bookingid FROM " . Reservation::tableName() . " WHERE " . Reservation::column('booking_id') . " IS NOT NULL AND " . Reservation::enabled_column() . " = 1 GROUP BY " . Reservation::column('booking_id') . ") AS currRes ON currRes.currId = " . Reservation::id_column() . " AND currRes.bookingid = " . Booking::id_column() . ""
            . " LEFT JOIN " . User::tableName() . " ON " . Reservation::column('assigned_user') . "=" . User::id_column() . ""
            . " WHERE " . Reservation::column('created') . " <= '" . $start->format("Y-m-d") . "' AND " . Reservation::column('created') . " >= '" . $end->format("Y-m-d") . "'"
            . "" . $this->_get_non_venue_payments_where() . ""
            . "" . $this->_get_non_hidden_statuses() . ""
            . " AND " . Booking::enabled_column() . " = 1"
            . " AND " . Reservation::enabled_column() . " = 1) alias"
            . " GROUP BY user_email, DATE(created)"
            . " ORDER BY DATE(created) DESC, user_email";
        $reservation_query = $this->db->query($query);
        foreach ($reservation_query->result_array() as $reservation)
        {
            $date_arr[(($reservation['user_email'] != '')?$reservation['user_email']:'Website Unassigned')][$reservation['date_created']] = $reservation['number'];
        }
        return $date_arr;
    }

    public function get_all_enquiries($start, $end)
    {
        $this->db->select('DATE(' . Enquiry::column('created') . ') AS date_created, COUNT(' . Enquiry::id_column() . ') AS number');
        $this->db->where(Enquiry::enabled_column(), 1);
        $this->db->where(Enquiry::column('created') . ' <=', $start->format("Y-m-d"));
        $this->db->where(Enquiry::column('created') . ' >=', $end->format("Y-m-d"));
        $this->db->group_by('DATE(' . Enquiry::column('created') . ')');
        $this->db->order_by('DATE(' . Enquiry::column('created') . ')', 'DESC');
        $this->db->from(Enquiry::tableName());
        return $this->db->get();
    }
}