<?php

namespace App\Helpers\Search;

use Illuminate\Support\Facades\DB;

class SearchQueryBuilder
{
    private $_qb;
    private $_helper;

    public function __construct(SearchHelper $helper)
    {
        $this->_helper = $helper;
        $this->_qb = DB::table('asset_audit')->select('asset_audit.id as asset_id');
    }

    public function other_filters()
    {
        $this->_handle_array_filters();
        $this->_handle_string_filters($this->_helper->get_filter_helper());
    }

   private function _handle_amenities($ams)
    {
       $count = count($ams);
       if (!($count === 0))
       {
           $this->_join_for_amenities();
           $this->_filter_for_amenities_array($ams);
           $this->_qb->having('amenity_count', '=', $count);
       }
    }

    private function _handle_configurations($cons)
    {
        $count = count($cons);
        if (!($count === 0))
        {
            $this->_filter_for_configs_array($cons);
        }
    }

    private function _handle_atts($atts)
    {
        $count = count($atts);
        if (!($count === 0))
        {
            $this->_join_for_atts();
            $this->_filter_for_atts_array($atts);
        }
    }

    private function _handle_string_filters($filter_helper)
    {
        $this->_handle_capacity_filters($filter_helper);
        $this->_handle_price_filters($filter_helper);
        $this->_handle_time_filters($filter_helper);
    }

    private function _handle_time_filters($filter_helper)
    {
        if ($filter_helper->has_time_date_or_duration())
        {
            $this->_handle_time_duration_filters($filter_helper->get_time(), $filter_helper->get_duration());
            $this->_handle_date_filters($filter_helper->get_time(), $filter_helper->get_duration(), $filter_helper->get_date());
        }
    }

    private function _handle_time_duration_filters($time, $duration)
    {
        if (!is_null($time))
        {
            $this->_qb->where('opening_periods.start', '<=', $time);
            if (!is_null($duration))
            {
                $this->_qb->where('opening_periods.end', '>=', $time + $duration);
            }
            else
            {
                $this->_qb->whereRaw('opening_periods.end >= ? + opening_periods.minimum_minutes', [$time]);
            }
        }
        elseif (!is_null($duration))
        {
            $this->_qb->where('opening_periods.minimum_minutes', '<=', $duration);
        }
    }

    private function _handle_date_filters($time, $duration, $date)
    {
        if (!is_null($date))
        {
            $this->_handle_basic_date_filters($date);
            $this->_add_time_duration_for_date_filters_handler($time, $duration);
        }
    }

    private function _add_time_duration_for_date_filters_handler($time, $duration)
    {
        $this->_qb->where(function($query) use ($time, $duration) {
            $query->where(function($query) use ($time, $duration) {
                $query->whereNotNull('room_availability.openingPeriod_id');
                $this->_add_time_duration_for_date_filters($query, $time, $duration);
            })->orWhere(function($query) {
                $query->whereNull('room_availability.date');
            });
        });
    }

    private function _add_time_duration_for_date_filters($query, $time, $duration)
    {
        if (!is_null($time))
        {
            $query->where('room_availability.start', '<=', $time);
            if (!is_null($duration))
            {
                $query->where('room_availability.end', '>=', $time + $duration);
            }
            else
            {
                $query->whereRaw('room_availability.end >= ? + opening_periods.minimum_minutes', [$time]);
            }
        }
        else
        {
            if (!is_null($duration))
            {
                $query->whereRaw('room_availability.end - room_availability.start >= ?', [$duration]);
            }
            else
            {
                $query->whereRaw('room_availability.end - room_availability.start >= opening_periods.minimum_minutes');
            }
        }
    }

    private function _handle_basic_date_filters($date)
    {
        $query_date = new \DateTime($date);
        $short_date = $query_date->format('Y-m-d');
        $full_date = $query_date->format('Y-m-d H:i:s');
        $next_day = new \DateTime($date);
        $next_day->setTime(24,0,0);
        $this->_join_availability_for_date($short_date);
        $this->_join_reservations_for_date($full_date, $next_day);
        $this->_qb->whereRaw('opening_periods.day_id = (DAYOFWEEK(?) - 1)', [$short_date]);
    }

    private function _join_availability_for_date($short_date)
    {
        $this->_qb->leftJoin('room_availability', function ($join) use ($short_date) {
            $join->on('opening_periods.asset_id', '=', 'room_availability.asset_id')
            ->where('room_availability.date', '=', $short_date)
            ->on(function($join) {
                $join->on('opening_periods.id', '=', 'room_availability.openingPeriod_id')->orWhere(function ($query) {
                    $query->whereNull('room_availability.openingPeriod_id');
                });
            });
        });
    }

    private function _join_reservations_for_date($full_date, $next_day)
    {
        $this->_qb->leftJoin('reservation_periods', function ($join) use ($full_date, $next_day) {
            $join->on('asset_audit.id', '=', 'reservation_periods.asset_id')->where('reservation_periods.enabled', '=', 1)->where('reservation_periods.allDay', '=', 1)
            ->where(function($query) use ($full_date, $next_day) {
                $query->where(function ($query) use ($full_date, $next_day) {
                    $query->where(function ($query) use ($full_date, $next_day) {
                        $query->where('reservation_periods.start', '>=', $full_date)->where('reservation_periods.start', '<', $next_day);
                    })->orWhere(function ($query) use ($full_date, $next_day) {
                        $query->where('reservation_periods.end', '>', $full_date)->where('reservation_periods.end', '<=', $next_day);
                    });
                })->orWhere(function ($query) use ($full_date, $next_day) {
                    $query->where('reservation_periods.start', '<=', $full_date)->where('reservation_periods.end', '>', $next_day);
                });
            });
        })->whereNull('reservation_periods.asset_id');
    }

    private function _handle_price_filters($filter_helper)
    {
        if ($filter_helper->has_prices())
        {
            $this->_handle_price_having_clause($filter_helper->get_prices());
        }
    }

    private function _handle_capacity_filters($filter_helper)
    {
        if ($filter_helper->has_max_capacity())
        {
            $this->_handle_max_capacity($filter_helper->get_min_capacity());
        }
    }

    private function _handle_max_capacity($max_capacity)
    {
        $this->_qb->having('max_capacity', '>', ($max_capacity - 1));
    }

    private function _handle_array_filters()
    {
        $this->_handle_amenities($this->_helper->get_amenities());
        $this->_handle_configurations($this->_helper->get_configurations());
        $this->_handle_atts($this->_helper->get_atts());
    }

    public function set_up_asset_specific_join()
    {
        switch ($this->_helper->get_asset_type())
        {
            default:
                $this->set_up_asset_specific_join_for_rooms();
            break;
        }
    }

    public function prepare_sponsored_ads($ignore_sponsorship = false)
    {
        switch ($this->_helper->get_asset_type())
        {
            default:
                $this->_prepare_sponsored_ads_for_rooms($ignore_sponsorship);
            break;
        }
    }

    public function join_essentials()
    {
        $this->_join_for_prices();
        $this->_join_for_configs();
    }

    private function _join_for_prices()
    {
        $this->_join_for_periods();
        $this->_qb->addSelect(DB::raw('MIN((CASE WHEN `price_control_percent` IS NOT NULL THEN ROUND((1 + (`price_control_percent` / 100)) * `hour_rates`.`price_per_hour`) ELSE `hour_rates`.`price_per_hour` END)) AS hourly_rate'))
            ->addSelect(DB::raw('(CASE WHEN `price_control_percent` IS NOT NULL THEN ROUND((1 + (`price_control_percent` / 100)) * `day_rates`.`standard_day_rate`) ELSE `day_rates`.`standard_day_rate` END) AS daily_rate'))
            ->leftJoin('hour_rates', 'opening_periods.id', '=', 'hour_rates.openingPeriod_id')
            ->leftJoin('day_rates', 'asset_audit.id', '=', 'day_rates.asset_id')
            ->where(function ($query) {
                $query->where('hour_rates.enabled', '=', 1)
                ->orWhere(function ($query) {
                    $query->whereNull('hour_rates.enabled');
                });
            })->where(function ($query) {
                $query->where('day_rates.enabled', '=', 1)
                ->orWhere(function ($query) {
                    $query->whereNull('day_rates.enabled');
                });
            });
    }

    public function filter_by_location()
    {
        $location_helper = $this->_helper->get_location_helper();
        switch ($this->_helper->get_asset_type())
        {
            default:
                $this->_filter_by_location_for_rooms($location_helper);
            break;
        }
    }

    public function filter_by_tag()
    {
        $this->_join_for_tags();
        $this->_filter_for_tag($this->_helper->get_tag());
    }

    public function ordering()
    {
        switch ($this->_helper->get_asset_type())
        {
            default:
                $this->_ordering_for_rooms();
            break;
        }
    }

    public function limiting()
    {
        $limit = $this->_helper->get_limit();
        if (!is_null($limit))
        {
            $this->_qb->limit($limit);
        }
    }

    private function _join_for_tags()
    {
        $this->_qb->leftJoin('asset_tag', function($join) {
                $join->on('asset_audit.id', '=', 'asset_tag.asset_id')
                    ->where('asset_tag.suppressed', '=', 0);
            })
            ->where(function ($query) {
                $query->where('asset_tag.enabled', '=', 1)
                    ->orWhere(function ($query) {
                        $query->whereNull('asset_tag.enabled');
                    });
            });
        $this->_qb->leftJoin('tags', 'asset_tag.tag_id', '=', 'tags.id')
            ->where(function ($query) {
                $query->where('tags.enabled', '=', 1)
                    ->orWhere(function ($query) {
                        $query->whereNull('tags.enabled');
                    });
            });
    }

    private function _filter_for_tag($tag)
    {
        $this->_qb->whereBetween('tags.lft', [$tag->lft, $tag->rgt]);
    }

    private function _filter_for_atts_array($atts)
    {
        $this->_qb->where(function ($query) use ($atts) {
            $first = array_pop($atts);
            $query->where('asset_attribute.attribute_id', '=', $first);
            if (count($atts) > 0)
            {
                foreach ($atts as $value)
                {
                    $query->orWhere('asset_attribute.attribute_id', '=', $value);
                }
            }
        });
    }

    private function _join_for_atts()
    {
        $this->_qb->leftJoin('asset_attribute', 'asset_audit.id', '=', 'asset_attribute.asset_id')
            ->where(function ($query) {
                $query->where('asset_attribute.enabled', '=', 1)
                    ->orWhere(function ($query) {
                        $query->whereNull('asset_attribute.enabled');
                    });
            });
    }

    private function _filter_for_configs_array($cons)
    {
        $this->_qb->where(function ($query) use ($cons) {
            $first = array_pop($cons);
            $query->where('room_configuration.configuration_id', '=', $first);
            if (count($cons) > 0)
            {
                foreach ($cons as $value)
                {
                    $query->orWhere('room_configuration.configuration_id', '=', $value);
                }
            }
        });
    }

    private function _join_for_periods()
    {
        $this->_qb->leftJoin('opening_periods', 'asset_audit.id', '=', 'opening_periods.asset_id')
            ->where(function ($query) {
                $query->where('opening_periods.enabled', '=', 1)
                    ->orWhere(function ($query) {
                        $query->whereNull('opening_periods.enabled');
                    });
            });
    }

    private function _join_for_configs()
    {
        $this->_qb->leftJoin('room_configuration', 'asset_audit.id', '=', 'room_configuration.asset_id')
            ->addSelect(DB::raw('MAX(`room_configuration`.`max_capacity`) as max_capacity'))
            ->addSelect('rooms.num_of_desks as num_of_desks')
            ->where(function ($query) {
                $query->where('room_configuration.enabled', '=', 1)
                    ->orWhere(function ($query) {
                        $query->whereNull('room_configuration.enabled');
                    });
            });
    }

    private function _filter_for_amenities_array($ams)
    {
        $this->_qb->where(function ($query) use ($ams) {
            $first = array_pop($ams);
            $query->where('amenities.id', '=', $first);
            if (count($ams) > 0)
            {
                foreach ($ams as $value)
                {
                    $query->orWhere('amenities.id', '=', $value);
                }
            }
        });
    }

    private function _join_for_amenities()
    {
        $this->_qb->leftJoin('asset_amenity', 'asset_audit.id', '=', 'asset_amenity.asset_id')
            ->leftJoin('amenities', 'asset_amenity.amenity_id', '=', 'amenities.id')
            ->addSelect(DB::raw('COUNT(DISTINCT `amenities`.`id`) as amenity_count'))
            ->where(function ($query) {
                $query->where('asset_amenity.enabled', '=', 1)
                    ->orWhere(function ($query) {
                        $query->whereNull('asset_amenity.enabled');
                    });
            })
            ->where(function ($query) {
                $query->where('amenities.enabled', '=', 1)
                    ->orWhere(function ($query) {
                        $query->whereNull('amenities.enabled');
                    });
            })
            ->where('asset_amenity.available', '=', 1);
    }

    /*
     * BEGIN ------ ROOM SPECIFIC BUILDS
     */

    private function _ordering_for_rooms()
    {
        // tag will be used for more intelligent ranking against tag with various data points:
        // impressions, clicks, revenue, bookings
        $this->_qb->addSelect('rooms.ranking as ranking')
            ->orderBy('rooms.ranking', 'DESC');
    }

    private function _prepare_sponsored_ads_for_rooms($ignore_sponsorship = false)
    {
        if ($ignore_sponsorship)
        {
            $this->_qb->addSelect(DB::raw('0 as sponsored'));
        }
        else
        {
            $this->_qb->addSelect('rooms.sponsored as sponsored')
                ->orderBy('rooms.sponsored', 'DESC');
        }
    }

    private function set_up_asset_specific_join_for_rooms()
    {
        $this->_qb->leftJoin('rooms', 'asset_audit.id', '=', 'rooms.asset_id')
            ->leftJoin('venues', 'rooms.venue_id', '=', 'venues.id')
            ->where('rooms.approved', '=', 1)
            ->where('rooms.enabled', '=', 1)
            ->where('venues.approved', '=', 1)
            ->where('rooms.title', '<>', '')
            ->where('rooms.hidden', '=', 0);
    }

    private function _filter_by_location_for_rooms($location_helper)
    {
        $this->_qb
            ->where('venues.lat', '<', $location_helper->ne_lat)
            ->where('venues.lat', '>', $location_helper->sw_lat)
            ->where('venues.long', '<', $location_helper->ne_long)
            ->where('venues.long', '>', $location_helper->sw_long);
    }

    private function _handle_price_having_clause($prices)
    {
        $day_rate_multiplier = $this->_helper->get_day_rate_multiplier();
        $first = array_pop($prices);
        $this->_qb
            ->havingRaw('(')->having('hourly_rate', $this->_get_price_filter_comparator($first), $first->amount, '')        // <-- start - all a bit hacky to get
            ->orHaving('daily_rate', $this->_get_price_filter_comparator($first), ($first->amount * $day_rate_multiplier))  // nested 'or' in the having clause.
            ->havingRaw(')', [], '');                                                                                    // <-- end
        if (!empty($prices))
        {
            $next = array_pop($prices);
            $this->_qb->havingRaw('(')->having('hourly_rate', $this->_get_price_filter_comparator($next), $next->amount, '')    //<-- start
                ->orHaving('daily_rate', $this->_get_price_filter_comparator($next), ($next->amount * $day_rate_multiplier))    //Same as above
                ->havingRaw(')', [], '');                                                                                    //<--- end TODO: add closure handler to having?
        }
    }

    private function _get_price_filter_comparator($filter)
    {
        if ($filter->type == 'min')
        {
            return ">";
        }
        else
        {
            return "<";
        }
    }

    /*
     * END ----- ROOM SPECIFIC BUILDS
     */

    public function get_raw_results($ignore_sponsorship = false)
    {
        $this->join_essentials();
        $this->set_up_asset_specific_join();
        $this->prepare_sponsored_ads($ignore_sponsorship);
        $this->filter_by_location();
        $this->filter_by_tag();
        $this->other_filters();
        $this->ordering();
        $this->limiting();
        $this->_qb->groupBy('asset_id');
//        echo $this->_qb->toSql();
//        $query = vsprintf(str_replace(array('?'), array('\'%s\''), $this->_qb->toSql()), $this->_qb->getBindings());
//        echo $query;
        $result = $this->_qb->get();
        return $result;
    }
}