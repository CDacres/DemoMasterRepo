<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__availabilities extends Model_Base__Object
{
    use Trait__Currency_Handler;

    function __construct()
    {
        $this->_set_base_class(Available_Period::class);
        parent::__construct();
    }

    public function update_availabilities($assetId, $bookedPeriod)
    {
        if ($bookedPeriod->is_null_object())
        {
            $bookedPeriodModel = Model__booked_periods::class;
            $this->load->model($bookedPeriodModel);
            $futurePeriods = $this->$bookedPeriodModel->get_future_booked_periods_by_asset($assetId);
            if ($futurePeriods->exists_in_db())
            {
                $this->_update_hourly($assetId, $futurePeriods);
            }
        }
        else
        {
            $this->_update_hourly($assetId, $bookedPeriod);
        }
    }

    public function get_daily_availability($assetId, $date, $price_control_adjusted = false)
    {
        return $this->_get_daily_availability($assetId, $date, false, false, $price_control_adjusted);
    }

    protected function _get_daily_availability($assetId, $date, $simple = false, $aggregate = false, $price_control_adjusted = false)
    {
        $modelBookedPeriods = Model__booked_periods::class;
        $this->load->model($modelBookedPeriods);
        if ($this->$modelBookedPeriods->date_asset_tuple_is_available($date, $assetId))
        {
            $availabilities = new Available_Period___Collection($this->_get_availability_table_periods($assetId, $date, $simple, $aggregate, $price_control_adjusted));
            if (!$availabilities->exist())
            {
                $modelOpeningHours = Model__opening_hours::class;
                $this->load->model($modelOpeningHours);
                $availabilities->populate_from_period_collection($this->$modelOpeningHours->get_daily_availability($assetId, $date, $simple, $aggregate, $price_control_adjusted));
            }
        }
        else
        {
            $availabilities = new Available_Period___Collection();
        }
        return $availabilities;
    }

    public function clear_availabilities($assetId, $date)
    {
        $currentPeriod = $this->_get_empty_period($assetId, $date);
        $this->_delete($currentPeriod, [
            'asset_id',
            'date'
        ]);
    }

    public function refresh_availability($assetId, $date)
    {
        $this->clear_availabilities($assetId, $date);
        $bookedPeriodModel = Model__booked_periods::class;
        $this->load->model($bookedPeriodModel);
        $bookedPeriods = $this->$bookedPeriodModel->get_daily_bookings($assetId, $date);
        $this->_update_hourly($assetId, $bookedPeriods);
    }

    private function _update_hourly($assetId, $bookedPeriod)
    {
        if (is_a($bookedPeriod, Booked_Period___Collection::class))
        {
            foreach ($bookedPeriod->object() as $singlePeriod)
            {
                $this->_update_hourly($assetId, $singlePeriod);
            }
        }
        else
        {
            $date = $bookedPeriod->get_start_date();
            if ($date == $bookedPeriod->get_end_date())
            {
                $currentAvail = $this->_get_daily_availability($assetId, $date, true);
                $currentAggregate = $this->_get_daily_availability($assetId, $date, true, true);
                $this->clear_availabilities($assetId, $date);
                $bookedPeriod->set('available', false);
                $currentAvail->set('id', null);
                $currentAggregate->set('id', null);
                $currentAvail->push_period($bookedPeriod);
                $currentAggregate->push_period($bookedPeriod);
                $currentAvail->filter_on_availability();
                $currentAvail->filter_on_length();
                $currentAggregate->filter_on_availability();
                $currentAggregate->filter_on_length();
                $takesAllDay = true;
                if ($currentAvail->exist())
                {
                    $currentAvail->set('date', $date);
                    $this->insert_update($currentAvail);
                    $takesAllDay = false;
                }
                if ($currentAggregate->exist())
                {
                    $currentAggregate->set('date', $date);
                    $this->insert_update($currentAggregate);
                    $takesAllDay = false;
                }
                $bookedPeriodModel = Model__booked_periods::class;
                $this->load->model($bookedPeriodModel);
                if ($takesAllDay)
                {
                    $this->$bookedPeriodModel->set_full_day($assetId, $date);
                }
            }
        }
    }

    private function _get_empty_period($assetId, $date)
    {
        $period = new Available_Period();
        $period->set('asset_id', $assetId);
        $period->set('date', $date);
        return $period;
    }

    private function _get_availability_table_periods($assetId, $date, $simple, $aggregate, $price_control_adjusted)
    {
        $this->db->where(Available_Period::column('asset_id'), $assetId);
        $this->db->where(Available_Period::column('date'), $date);
        $this->db->advanced_join(Available_Period::class, Opening_Hours::class, Available_Period::column('period_id', false), Opening_Hours::id_column(false));
        $this->_join_secondaries($aggregate);
        if (!$simple)
        {
            $this->_join_prices($price_control_adjusted);
        }
        $this->db->order_by(Available_Period::column('start'), 'ASC');
        return $this->_query_init_and_run(false);
    }

    private function _join_secondaries($aggregate = false)
    {
        $this->db->where(Opening_Hours::column('aggregate'), $aggregate);
        $this->db->select_alias(Opening_Hours::column('minimum_minutes'), Available_Period::alias('minimum_minutes'));
        $this->db->select_alias(Opening_Hours::column('slot_length_minutes'), Available_Period::alias('slot_length_minutes'));
        $this->db->select_alias(Opening_Hours::column('aggregate'), Available_Period::alias('aggregate'));
    }

    private function _join_prices($price_control_adjusted)
    {
        $this->db->advanced_join(Opening_Hours::class, Hourly_Price::class, Opening_Hours::id_column(false), Hourly_Price::column('period_id', false));
        $this->db->advanced_join(Opening_Hours::class, Full_Room::class, Opening_Hours::column('asset_id', false), Full_Room::asset_id_column(false));
        if ($this->dx_auth->is_logged_in())
        {
            $this->db->join(Runt_User_Asset_Member::tableName(), Full_Room::asset_id_column() . "=" . Runt_User_Asset_Member::column('asset_id') . " AND " . Runt_User_Asset_Member::column('user_id') . "=" . $this->get_user_id(), "LEFT");
            $this->db->select_alias(Runt_User_Asset_Member::column('discount'), Available_Period::alias('user_discount'));
        }
        if ($price_control_adjusted)
        {
            $this->_query_join_currencies_and_calculate_price(Full_Room::class, Full_Room::column('currency_code', false),
                [
                    'left' => 'currency_symbol_left',
                    'right' => 'currency_symbol_right'
                ],
                ['ROUND((CASE WHEN ' . Full_Room::column('price_control_percent') . ' IS NOT NULL THEN (1 + (' . Full_Room::column('price_control_percent') . ' / 100)) ELSE 1 END) * ' . Hourly_Price::column('hourly_rate') . ')' => Opening_Hours::alias('hourly_rate')]
            );
        }
        else
        {
            $this->_query_join_currencies_and_calculate_price(Full_Room::class, Full_Room::column('currency_code', false),
                [
                    'left' => 'currency_symbol_left',
                    'right' => 'currency_symbol_right'
                ],
                [Hourly_Price::column('hourly_rate') => Available_Period::alias('hourly_rate')]
            );
        }
    }
}