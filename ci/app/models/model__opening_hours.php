<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__opening_hours extends Model_Base__Object
{
    use Trait__Currency_Handler;

    function __construct()
    {
        $this->_set_base_class(Opening_Hours::class);
        parent::__construct();
    }

    public function get_weekly_opening_object_collection_by_asset_id($assetId)
    {
        return new Opening_Hours___Collection_Collection($this->_get_weekly_opening_data_by_asset_id($assetId));
    }

    public function get_daily_availability($assetId, $date, $simple = false, $aggregate = false, $price_control_adjusted = false)
    {
        return new Opening_Hours___Collection($this->_get_opening_periods_as_availability($assetId, $date, $simple, $aggregate, $price_control_adjusted));
    }

//    public function get_total_collection_collection_collection()  //This could well be redundant post-refactor
//    {
//        $this->db->where(Opening_Hours::column('aggregate'), 0);
//        $this->_join_prices();
//        $this->db->order_by(Opening_Hours::column('day_id', false), 'ASC');
//        $this->db->order_by(Opening_Hours::column('start'), 'ASC');
//        $this->_wrap_in_collection(Opening_Hours::column('day_id', false));
//        $this->_wrap_in_collection(Opening_Hours::column('asset_id', false));
//        return new Opening_Hours___Collection_Collection_Collection($this->_query_init_and_run(false));
//    }

    private function _get_opening_periods_as_availability($assetId, $date, $simple, $aggregate, $price_control_adjusted)
    {
        $dayId = date('w', strtotime($date));
        $this->db->where(Opening_Hours::column('asset_id'), $assetId);
        if (is_array($dayId))
        {
            $this->db->where_in(Opening_Hours::column('day_id'), $dayId);
        }
        else
        {
            $this->db->where(Opening_Hours::column('day_id'), $dayId);
        }
        if (!$simple)
        {
            $this->_join_prices($price_control_adjusted);
        }
        $this->db->where(Opening_Hours::column('aggregate'), $aggregate);
        $this->db->order_by(Opening_Hours::column('start'), 'ASC');
        return $this->_query_init_and_run(false);
    }

    private function _join_prices($price_control_adjusted)
    {
        $this->db->advanced_join(Opening_Hours::class, Hourly_Price::class, Opening_Hours::id_column(false), Hourly_Price::column('period_id', false));
        $this->db->advanced_join(Opening_Hours::class, Full_Room::class, Opening_Hours::column('asset_id', false), Full_Room::asset_id_column(false));
        if ($this->dx_auth->is_logged_in())
        {
            $this->db->join(Runt_User_Asset_Member::tableName(), Full_Room::asset_id_column() . "=" . Runt_User_Asset_Member::column('asset_id') . " AND " . Runt_User_Asset_Member::column('user_id') . "=" . $this->get_user_id(), "LEFT");
            $this->db->select_alias(Runt_User_Asset_Member::column('discount'), Opening_Hours::alias('user_discount'));
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
                [Hourly_Price::column('hourly_rate') => Opening_Hours::alias('hourly_rate')]
            );
        }
    }

    private function _get_weekly_opening_data_by_asset_id($assetId)
    {
        $this->_allow_disabled_override();
        $this->db->join(Day::tableName(), Opening_Hours::column('day_id') . " = " . Day::id_column() . " AND " . Opening_Hours::column('asset_id') . " = " . $assetId, 'RIGHT');
        $this->db->where(Day::enabled_column(), 1);
        $this->db->nullable_where(Opening_Hours::column('aggregate'), 0);
        $this->db->order_by(Day::id_column(), 'ASC');
        $this->db->order_by(Opening_Hours::column('start'), 'ASC');
        $this->db->select_alias(Day::column('name'), Opening_Hours::alias('day'));
        $this->db->select_alias(Day::id_column(), Opening_Hours::alias('wrapping_day_id'));
        $this->_wrap_in_collection(Opening_Hours::alias('wrapping_day_id'));
        return $this->_query_init_and_run(false);
    }
}