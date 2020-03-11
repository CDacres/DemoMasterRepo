<?php

namespace App\Models\Booking;

use App\LaravelExtensions\Model\LegacyModel;

use App\Models\Booking\ReservationPeriod;

class RoomAvailability extends LegacyModel
{
    public $timestamps = false;
    public $table = 'room_availability';

    protected $fillable = [
        'start',
        'end',
        'date',
        'asset_id',
        'period_id',
        'available'
    ];

    public function update_availabilities($assetId, $bookedPeriod = null)
    {
        if (is_null($bookedPeriod))
        {
            $futurePeriods = ReservationPeriod::where('asset_id', $assetId)->where('end', '>=', (new DateTime())->format(ReservationPeriod::format_string()))->get();
            if (!is_null($futurePeriods))
            {
                $this->_update_hourly($assetId, $futurePeriods);
            }
        }
        else
        {
            $this->_update_hourly($assetId, $bookedPeriod);
        }
    }

    private function _update_hourly($assetId, $bookedPeriod)
    {
//        if (is_a($bookedPeriod, Booked_Period___Collection::class)) //?
//        {
//            foreach ($bookedPeriod->object() as $singlePeriod)
//            {
//                $this->_update_hourly($assetId, $singlePeriod);
//            }
//        }
//        else
//        {
//            $date = $bookedPeriod->get_start_date();
//            if ($date == $bookedPeriod->get_end_date())
//            {
//                $currentAvail = $this->_get_daily_availability($assetId, $date, true);
//                $currentAggregate = $this->_get_daily_availability($assetId, $date, true, true);
//                $this->_clear_availabilities($assetId, $date);
//                $bookedPeriod->available = false;
//                $currentAvail->id = null;
//                $currentAggregate->id = null;
//                $currentAvail->push_period($bookedPeriod);
//                $currentAggregate->push_period($bookedPeriod);
//                $currentAvail->filter_on_availability();
//                $currentAvail->filter_on_length();
//                $currentAggregate->filter_on_availability();
//                $currentAggregate->filter_on_length();
//                $takesAllDay = true;
//                if ($currentAvail->exist())
//                {
//                    $currentAvail->date = $date;
//                    $currentAvail->save();
//                    $takesAllDay = false;
//                }
//                if ($currentAggregate->exist())
//                {
//                    $currentAggregate->date = $date;
//                    $currentAggregate->save();
//                    $takesAllDay = false;
//                }
//                if ($takesAllDay)
//                {
//                    (new ReservationPeriod())->set_full_day($assetId, $date);
//                }
//            }
//        }
    }

    protected function _get_daily_availability($assetId, $date, $simple = false, $aggregate = false, $price_control_adjusted = false)
    {
        $dateDT = new DateTime($date);
        $dateDT->setTime(12, 0, 0); // Is an assumption - probably needs fixing. Assumes that venue must be open by 12, but not closed.
        $dtString = $dateDT->format(ReservationPeriod::format_string());
        $tuple_available = ReservationPeriod::where('asset_id', $assetId)->where('all_day', true)->where('start', '<=', $dtString)->where('end', '>=', $dtString)->get();
        if (is_null($tuple_available))
        {
//            $this->db->where(Available_Period::column('asset_id'), $assetId); //?
//            $this->db->where(Available_Period::column('date'), $date);
//            $this->db->advanced_join(Available_Period::class, Opening_Hours::class, Available_Period::column('period_id', false), Opening_Hours::id_column(false));
//            $this->_join_secondaries($aggregate);
//            if (!$simple)
//            {
//                $this->_join_prices($price_control_adjusted);
//            }
//            $this->db->order_by(Available_Period::column('start'), 'ASC');
//            $availabilities = new Available_Period___Collection($this->_get_availability_table_periods($assetId, $date, $simple, $aggregate, $price_control_adjusted));
//            if (!$availabilities->exist())
//            {
//                $modelOpeningHours = Model__opening_hours::class;
//                $this->load->model($modelOpeningHours);
//                $availabilities->populate_from_period_collection($this->$modelOpeningHours->get_daily_availability($assetId, $date, $simple, $aggregate, $price_control_adjusted));
//            }
        }
        else
        {
//            $availabilities = new Available_Period___Collection();
        }
//        return $availabilities;
    }

    private function _clear_availabilities($assetId, $date)
    {
        $currentPeriod = $this->_get_empty_period($assetId, $date);
//        $this->_delete($currentPeriod, ['asset_id', 'date']);//?
    }

    private function _get_empty_period($assetId, $date)
    {
//        $period = new Available_Period(); //?
//        $period->asset_id = $assetId;
//        $period->date = $date;
//        return $period;
    }

    public function refresh_availability($assetId, $date)
    {
        $this->_clear_availabilities($assetId, $date);
        $this->_update_hourly($assetId, (new ReservationPeriod())->get_daily_bookings($assetId, $date));
    }
}