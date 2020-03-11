<?php

namespace App\Models\Booking;

use App\LaravelExtensions\Model\LegacyModel;

use DateTime;

use App\Events\ReservationPeriodCreatedEvent;
use App\Events\ReservationPeriodUpdatedEvent;

class ReservationPeriod extends LegacyModel
{
    protected static $_formatString = 'Y-m-d H:i:s';

    public $timestamps = false;
    public $table = 'reservation_periods';

    protected $fillable = [
        'reservation_id',
        'asset_id',
        'start',
        'end',
        'allDay'
    ];

    protected $dispatchesEvents = [
        'created' => ReservationPeriodCreatedEvent::class,
        'updated' => ReservationPeriodUpdatedEvent::class
    ];

    private $_suppress_availability_update = false;
    private $_releases_full_day = false;

    static public function format_string()
    {
        return static::$_formatString;
    }

    public function releases_full_day()
    {
        return $this->_releases_full_day;
    }

    public function should_release_full_day()
    {
        $this->_releases_full_day = true;
    }

    public function suppress_availability_update()
    {
        $this->_suppress_availability_update = true;
    }

    public function requires_availability_update()
    {
        return !$this->_suppress_availability_update;
    }

    public function is_daily()
    {
        if (is_null($this->all_day))
        {
            $this->set_appropriate_all_day_flag();
        }
        return $this->all_day;
    }

    public function set_appropriate_all_day_flag()
    {
        $date = $this->get_start_date();
        if ($date != $this->get_end_date())
        {
            $this->all_day = true;
        }
        else
        {
            $this->all_day = false;
        }
    }

    public function get_start_date()
    {
        $dateTime = new DateTime($this->start);
        return $dateTime->format("Y-m-d");
    }

    public function get_end_date()
    {
        $dateTime = new DateTime($this->end);
        return $dateTime->format("Y-m-d");
    }

    public function release()
    {
        $this->should_release_full_day();
        $this->enabled = false;
        $this->save();
    }

    public function set_full_day($assetId, $date)
    {
        $this->_set_unset_full_day($assetId, $date, true);
    }

    public function unset_full_day($assetId, $date)
    {
        $this->_set_unset_full_day($assetId, $date, false);
    }

    private function _set_unset_full_day($assetId, $date, $allDay)
    {
        $bookedPeriods = $this->get_daily_bookings($assetId, $date);
        foreach ($bookedPeriods as $bookedPeriod)
        {
            $bookedPeriod->all_day = $allDay;
            $bookedPeriod->suppress_availability_update();
            $bookedPeriod->save();
        }
    }

    public function get_daily_bookings($assetId, $date)
    {
        $startDate = new DateTime($date);
        $endDate = clone $startDate;
        $endDate->modify('+1day');
        return $this->where('asset_id', $assetId)->where('start', '>=', $startDate->format($this->_formatString))->where('end', '<=', $endDate->format($this->_formatString))->get();
    }
}