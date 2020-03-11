<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__booked_periods extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Booked_Period::class);
        parent::__construct();
    }

    public function get_daily_bookings($assetId, $date)
    {
        return new Booked_Period___Collection($this->_get_daily_bookings($assetId, $date));
    }

    private function _get_daily_bookings($assetId, $date)
    {
        $startDate = new DateTime($date);
        $endDate = clone $startDate;
        $endDate->modify('+1day');
        $this->db->where(Booked_Period::column('asset_id'), $assetId);
        $this->db->where(Booked_Period::column('start') ." >=", $startDate->format(Booked_Period::format_string()));
        $this->db->where(Booked_Period::column('end') . " <=", $endDate->format(Booked_Period::format_string()));
        return $this->_query_init_and_run(false);
    }

    protected function _post_insert($object)
    {
        if (!$object->is_daily() && $object->requires_availability_update())
        {
            $modelAvailabilities = Model__availabilities::class;
            $this->load->model($modelAvailabilities);
            $this->$modelAvailabilities->update_availabilities($object->get('asset_id'), $object);
        }
    }

    protected function _post_update($object)
    {
        if ($object->releases_full_day())
        {
            $this->unset_full_day($object->get('asset_id'), $object->get_start_date());
        }
        if ($object->requires_availability_update())
        {
            $modelAvailabilities = Model__availabilities::class;
            $this->load->model($modelAvailabilities);
            $date = $object->get_start_date();
            $assetId = $object->get('asset_id');
            $this->$modelAvailabilities->refresh_availability($assetId, $date);
        }
    }

    public function get_full_dates_array_by_asset($assetId, $completelyFull = false)
    {
        $now = new DateTime();
        $this->db->where(Booked_Period::column('asset_id'), $assetId);
        $nowString = $now->format(Booked_Period::format_string());
        $this->db->where(Booked_Period::column('end') . " >=", $nowString);
        if ($completelyFull)
        {
            $this->db->where(Booked_Period::column('all_day'), true);
        }
        $resultArray = $this->_query_init_and_run(false);
        $returnArray = [];
        foreach ($resultArray as $line)
        {
            $startDateTime = new DateTime($line[Booked_Period::column('start', false)]);
            $endDateTime = new DateTime($line[Booked_Period::column('end', false)]);
            while ($startDateTime < $endDateTime)
            {
                $returnArray[] = $startDateTime->format("Y-m-d");
                $startDateTime->modify("+1day");
            }
        }
        return $returnArray;
    }

    public function set_full_day($assetId, $date)
    {
        $bookedPeriods = $this->get_daily_bookings($assetId, $date);
        foreach ($bookedPeriods->object() as $bookedPeriod)
        {
            $bookedPeriod->set('all_day', true);
            $bookedPeriod->suppress_availability_update();
            $this->insert_update($bookedPeriod);
        }
    }

    public function unset_full_day($assetId, $date)
    {
        $bookedPeriods = $this->get_daily_bookings($assetId, $date);
        foreach ($bookedPeriods->object() as $bookedPeriod)
        {
            $bookedPeriod->set('all_day', false);
            $bookedPeriod->suppress_availability_update();
            $this->insert_update($bookedPeriod);
        }
    }

    public function check_valid_dates($assetId, $startDate, $endDate)
    {
        $startDT = new DateTime($startDate);
        $endDT = new DateTime($endDate);
        $endDT->modify("+1day");
        $formatString = Booked_Period::format_string();
        $reqStart = $startDT->format($formatString);
        $reqEnd = $endDT->format($formatString);
        $response = $this->_booked_dates($assetId, $reqStart, $reqEnd);
        $retVal = false;
        if (empty($response))
        {
            $retVal = true;
        }
        return $retVal;
    }

    public function check_booked_dates_with_reservation($assetId, $startDate, $endDate, $reservationId)
    {
        $formatString = Booked_Period::format_string();
        $reqStart = (new DateTime($startDate))->format($formatString);
        $reqEnd = (new DateTime($endDate))->format($formatString);
        $periods = new Booked_Period___Collection($this->_booked_dates($assetId, $reqStart, $reqEnd, $reservationId));
        if ($periods->exists_in_db())
        {
            $blockArr = [];
            foreach ($periods->object() as $blocked_period)
            {
                $blockArr[] = $blocked_period->get('reservation_id');
            }
            return implode(",", $blockArr);
        }
        return false;
    }

    private function _booked_dates($assetId, $reqStart, $reqEnd, $reservationId = null)
    {
        $this->db->where(Booked_Period::column('asset_id'), $assetId);
        if ($reservationId != null)
        {
            $this->db->where(Booked_Period::column('reservation_id') . ' <>', $reservationId);
        }
        $this->db->open_where_bracket();
        $this->db->open_where_bracket('');
        $this->db->start_group_where(Booked_Period::column('start') . " >=", $reqStart, true, '');
        $this->db->where(Booked_Period::column('start') . " <", $reqEnd);
        $this->db->close_group_where();
        $this->db->start_group_where(Booked_Period::column('end') . " >", $reqStart, true, 'OR');
        $this->db->where(Booked_Period::column('end') . " <=", $reqEnd);
        $this->db->close_group_where();
        $this->db->close_where_bracket();
        $this->db->start_group_where(Booked_Period::column('start') . " <=", $reqStart, true, 'OR');
        $this->db->where(Booked_Period::column('end') . " >", $reqEnd);
        $this->db->close_group_where();
        $this->db->close_where_bracket();
        return $this->_query_init_and_run(false);
    }

    public function date_asset_tuple_is_available($date, $assetId)
    {
        $dateDT = new DateTime($date);
        $dateDT->setTime(12, 0, 0); // Is an assumption - probably needs fixing. Assumes that venue must be open by 12, but not closed.
        $this->db->where(Booked_Period::column('asset_id'), $assetId);
        $this->db->where(Booked_Period::column('all_day'), true);
        $dtString = $dateDT->format(Booked_Period::format_string());
        $this->db->where(Booked_Period::column('start') . " <=", $dtString);
        $this->db->where(Booked_Period::column('end') . " >=", $dtString);
        $resultArray = $this->_query_init_and_run(false);
        return !(count($resultArray) > 0);
    }

    public function get_future_booked_periods_by_asset($assetId)
    {
        return new Booked_Period___Collection($this->_get_future_booked_periods_by_asset($assetId));
    }

    private function _get_future_booked_periods_by_asset($assetId)
    {
        $now = new DateTime();
        $nowString = $now->format(Booked_Period::format_string());
        $this->db->where(Booked_Period::column('asset_id'), $assetId);
        $this->db->where(Booked_Period::column('end') . " >=", $nowString);
        return $this->_query_init_and_run(false);
    }
}