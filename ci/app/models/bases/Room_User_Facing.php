<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');
/**
 * Zipcube Rooms Class
 *
 * Room information in database - booking types, amenities, configurations, etc
 *
 * @package		Zipcube
 * @subpackage          Models
 * @category            Data
 * @author		Will
 * @version		Version 2.0
 * @link		www.zipcube.com
 */

abstract class Model_Base__Room_User_Facing extends Model__room_skeletons
{
    private $_minCapacityFactor = '2/3'; //Make sure this is a string - an integer breaks the query

    function check_valid_slots($assetId, Slot___Collection $slots, $date)
    {
        return $this->_check_valid_hour_level_bookings($assetId, $date, $slots->start_time(), $slots->duration_minutes());
    }

    private function _check_valid_hour_level_bookings($assetId, $date, $start, $duration)
    {
        $baseClass = $this->_get_base_class();
        $this->db->where($baseClass::asset_id_column(), $assetId);
        $this->_query_join_opening_hours();
        $this->_query_filter_availability($duration, $date, $start);
        $result = $this->_query_init_and_run();
        if (!empty($result))
        {
            $retVal = true;
        }
        else
        {
            $retVal = false;
        }
        return $retVal;
    }

    protected function _query_join_secondaries($hide_subcol)
    {
        parent::_query_join_secondaries($hide_subcol);
        $baseClass = $this->_get_base_class();
        $this->_query_join_currencies($baseClass, $baseClass::column('currency_code', false), [
            'left' => 'currency_symbol_left',
            'right' => 'currency_symbol_right'
        ]);
        $this->_query_select_prices();
        $this->_query_join_configurations();
        $this->_query_join_usages();
    }

    protected function _query_select_prices()
    {
        $baseClass = $this->_get_base_class();
        $this->_query_join_opening_hours();
        $this->db->advanced_join($baseClass, Daily_Price::class, $baseClass::asset_id_column(false), Daily_Price::column('asset_id', false));
        $this->db->advanced_join(Opening_Hours::class, Hourly_Price::class, Opening_Hours::id_column(false), Hourly_Price::column('period_id', false));
        if ($this->dx_auth->is_logged_in())
        {
            $this->db->join(Runt_User_Asset_Member::tableName(), $baseClass::asset_id_column() . "=" . Runt_User_Asset_Member::column('asset_id') . " AND " . Runt_User_Asset_Member::column('user_id') . "=" . $this->get_user_id(), "LEFT");
            $this->db->select_alias(Runt_User_Asset_Member::column('discount'), $baseClass::alias('user_discount'));
            $this->_calculate_price([
                "MIN(" . Hourly_Price::column('hourly_rate') . ") * (100 - " . Runt_User_Asset_Member::column('discount') . ")/100" => $baseClass::alias('discount_hourly_rate'),
                Daily_Price::column('daily_rate') . " * (100 - " . Runt_User_Asset_Member::column('discount') . ")/100" => $baseClass::alias('discount_daily_rate'),
                Daily_Price::column('daily_delegate_rate') . " * (100 - " . Runt_User_Asset_Member::column('discount') . ")/100" => $baseClass::alias('discount_daily_delegate_rate'),
                Daily_Price::column('monthly_rate') . " * (100 - " . Runt_User_Asset_Member::column('discount') . ")/100" => $baseClass::alias('discount_monthly_rate'),
                "(MIN(" . Hourly_Price::column('hourly_rate') . ") * (100 - " . Runt_User_Asset_Member::column('discount') . ")/100) * 9" => $baseClass::alias('discount_daily_deal_hourly_rate'),
            ]);
        }
        $this->db->select_min(Opening_Hours::column('minimum_minutes'), $baseClass::alias('minimum_hourly_stay'));
        $this->db->select_alias(Daily_Price::column('minimum_delegates'), $baseClass::alias('minimum_delegates'));
        $this->db->select_alias(Daily_Price::column('minimum_spend'), $baseClass::alias('minimum_spend'));
        $this->_calculate_price([
            "MIN((CASE WHEN " . $baseClass::column('price_control_percent') . " IS NOT NULL THEN ROUND((1 + (" . $baseClass::column('price_control_percent') . " / 100)) * " . Hourly_Price::column('hourly_rate') . ") ELSE " . Hourly_Price::column('hourly_rate') . " END))" => $baseClass::alias('hourly_rate'),
            "(CASE WHEN " . $baseClass::column('price_control_percent') . " IS NOT NULL THEN ROUND((1 + (" . $baseClass::column('price_control_percent') . " / 100)) * " . Daily_Price::column('daily_rate') . ") ELSE " . Daily_Price::column('daily_rate') . " END)" => $baseClass::alias('daily_rate'),
            "(CASE WHEN " . $baseClass::column('price_control_percent') . " IS NOT NULL THEN ROUND((1 + (" . $baseClass::column('price_control_percent') . " / 100)) * " . Daily_Price::column('daily_delegate_rate') . ") ELSE " . Daily_Price::column('daily_delegate_rate') . " END)" => $baseClass::alias('daily_delegate_rate'),
            "(CASE WHEN " . $baseClass::column('price_control_percent') . " IS NOT NULL THEN ROUND((1 + (" . $baseClass::column('price_control_percent') . " / 100)) * " . Daily_Price::column('monthly_rate') . ") ELSE " . Daily_Price::column('monthly_rate') . " END)" => $baseClass::alias('monthly_rate'),
            "MIN((CASE WHEN " . $baseClass::column('price_control_percent') . " IS NOT NULL THEN ROUND((1 + (" . $baseClass::column('price_control_percent') . " / 100)) * " . Hourly_Price::column('hourly_rate') . ") ELSE " . Hourly_Price::column('hourly_rate') . " END)) * 9" => $baseClass::alias('daily_deal_hourly_rate'),
            "MIN(" . Hourly_Price::column('hourly_rate') . ")" => $baseClass::alias('venue_hourly_rate'),
            Daily_Price::column('daily_rate') => $baseClass::alias('venue_daily_rate'),
            Daily_Price::column('daily_delegate_rate') => $baseClass::alias('venue_daily_delegate_rate'),
            Daily_Price::column('monthly_rate') => $baseClass::alias('venue_monthly_rate')
        ]);
    }

    protected function _query_join_configurations()
    {
        $baseClass = $this->_get_base_class();
        $this->db->advanced_join($baseClass, Runt_Room_Configuration::class, $baseClass::asset_id_column(false), Runt_Room_Configuration::column('asset_id', false));
        $this->db->advanced_join(Runt_Room_Configuration::class, Configuration::class, Runt_Room_Configuration::column('configuration_id', false), Configuration::id_column(false));
        $this->db->select_max(Runt_Room_Configuration::column('max_capacity'), $baseClass::alias('max_capacity'));
        $this->db->select_min('CEILING(' . $this->_minCapacityFactor . ' * ' . Runt_Room_Configuration::column('max_capacity') . ')', $baseClass::alias('min_capacity'), false);
    }

    protected function _query_join_usages()
    {
        $baseClass = $this->_get_base_class();
        $this->db->advanced_join($baseClass, Usage::class, $baseClass::column('usage_id', false), Usage::id_column(false));
        $this->db->advanced_join(Usage::class, Runt_Usage_UsageSuperset::class, Usage::id_column(false), Runt_Usage_UsageSuperset::column('usage_id', false));
        $this->db->advanced_join(Runt_Usage_UsageSuperset::class, UsageSuperset::class, Runt_Usage_UsageSuperset::column('usage_superset_id', false), UsageSuperset::id_column(false));
        $this->db->advanced_join(UsageSuperset::class, Runt_UsageSuperset_Language::class, UsageSuperset::id_column(false), Runt_UsageSuperset_Language::column('usage_superset_id', false));
        $this->db->select_alias(Usage::column('desc'), $baseClass::alias('usage_name'));
        $this->db->select_alias(UsageSuperset::id_column(), $baseClass::alias('usage_superset'));
        $this->db->select_alias(Runt_UsageSuperset_Language::column('item_name'), $baseClass::alias('usage_superset_itemname'));
        $this->db->select_alias(Runt_UsageSuperset_Language::column('desc'), $baseClass::alias('usage_superset_desc'));
        $this->db->select_alias(Runt_UsageSuperset_Language::column('short_desc'), $baseClass::alias('usage_superset_short_desc'));
        $this->db->select_alias(Runt_UsageSuperset_Language::column('alias'), $baseClass::alias('usage_superset_alias'));
        $this->db->where(Runt_UsageSuperset_Language::column('lang_code'), config_item('language_code'));
        $this->db->nullable_where(UsageSuperset::column('hidden'), 0);
    }

    protected function _query_join_tags($lang_code)
    {
        $baseClass = $this->_get_base_class();
        $this->db->advanced_join($baseClass, Asset_Tag::class, $baseClass::asset_id_column(false), Asset_Tag::column('asset_id', false));
        $this->db->advanced_join(Asset_Tag::class, Tag::class, Asset_Tag::column('tag_id', false), Tag::id_column(false));
        $this->db->advanced_join(Tag::class, Tag_Language_Label::class, Tag::id_column(false), Tag_Language_Label::column('tag_id', false));
        $this->db->advanced_join(Tag_Language_Label::class, Tag_Language_Label_Meta::class, Tag_Language_Label::id_column(false), Tag_Language_Label_Meta::column('tag_language_label_id', false));
        $this->db->select_alias(Tag_Language_Label_Meta::column('slug'), $baseClass::alias('tag_slug'));
        $this->db->where(Tag_Language_Label::column('language_code'), $lang_code);
        $this->db->where(Tag_Language_Label::column('preferred'), 1);
        $this->db->where(Tag_Language_Label_Meta::column('preferred'), 1);
    }

    protected function _query_filter_availability($duration, $date, $time)
    {
        if (!($duration == 0 && $date == '' && ($time < 0 || $time >= 1440)))
        {
            $this->_query_filter_opening_times($duration, $date, $time);
            if ($date != '')
            {
                $this->_query_filter_opening_hours_by_date($date);
                $this->_query_filter_available_periods($duration, $date, $time);
                $this->_query_filter_booked_periods($date);
            }
        }
    }

    private function _query_filter_opening_times($duration, $date, $startTime)
    {
        $start = ($startTime * 1); //force to number for SQL
        if ($start >= 0 && $start < 1440)
        {
            $this->db->start_group_where(Opening_Hours::column('start') . ' <=', $start);
            //$this->db->where("(" . $start . " - " . Opening_Hours::column('start') . ')%' . Opening_Hours::column('slot_length_minutes'), "0");
            if ($duration != 0)
            {
                $end = ($start + $duration);
                $this->db->where(Opening_Hours::column('end') . ' >=', $end);
                //$this->db->where($duration . '%' . Opening_Hours::column('slot_length_minutes'), "0", false);
                $this->db->where(Opening_Hours::column('minimum_minutes') . ' <=', $duration);
            }
            else
            {
                $this->db->where(Opening_Hours::column('end') . ' >=', "(" . $start . " + " . Opening_Hours::column('minimum_minutes') . ")", false);
            }
            $this->db->close_group_where();
        }
        elseif ($duration != 0)
        {
            //$this->db->where($duration . '%' . Opening_Hours::column('slot_length_minutes'), "0", false);
            $this->db->where(Opening_Hours::column('minimum_minutes') . ' <=', $duration);
        }
    }

    private function _query_filter_booked_periods($date)
    {
        $this->_query_join_booked_periods($date, true);
        $this->db->where(Booked_Period::column('asset_id'));
    }

    private function _query_filter_available_periods($duration, $date, $startTime)
    {
        $this->db->join(Available_Period::tableName(), Opening_Hours::column('asset_id') . "=" . Available_Period::column('asset_id') . " AND "
                . Available_Period::column('date') . "='" . $date . "' AND " .
                "( " . Opening_Hours::id_column() . " = " . Available_Period::column('period_id')
            . " OR " . Available_Period::column('period_id') . " IS NULL)" ,'LEFT');
        $start = ($startTime * 1);
        $this->db->open_where_bracket();
        $this->db->start_group_where(Available_Period::column('period_id') . ' IS NOT NULL', null, false, '');
        if ($start >= 0 && $start < 1440)
        {
            $this->db->where(Available_Period::column('start') . " <=", $start, false);
            if ($duration != 0)
            {
                $end = ($start + $duration);
                $this->db->where(Available_Period::column('end') . ' >=', $end);
            }
            else
            {
                $this->db->where(Available_Period::column('end') . ' >=', "(" . $start . " + " . Opening_Hours::column('minimum_minutes') . ")", false);
            }
        }
        else
        {
            if ($duration != 0)
            {
                $this->db->where(Available_Period::column('end') . ' - ' . Available_Period::column('start') . ' >=', $duration, false);
            }
            else
            {
                $this->db->where(Available_Period::column('end') . ' - ' . Available_Period::column('start') . ' >=', Opening_Hours::column('minimum_minutes'), false);
            }
        }
        $this->db->close_group_where();
        $this->db->or_where(Available_Period::column('date'));
        $this->db->close_where_bracket();
    }
}