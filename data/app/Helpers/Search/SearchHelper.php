<?php

namespace App\Helpers\Search;
use \App\LaravelExtensions\Model\LegacyModel;
use App\Models\Tags\{Tag, TagLabelMeta};

class SearchHelper extends LegacyModel
{
    private $_request;
    private $_options;
    private $_location_helper;
    private $_filter_helper;
    private $_tag;
    private $_results = [];
    private $_lang;
    private $_unlimited = false;
    private $_is_admin_request = false;
    private $_is_fallback_penalisation = 30;

    public function __construct($request, $options, $is_admin_request = false)
    {
        $this->_request = $request;
        $this->_options = $options;
        $this->_is_admin_request = $is_admin_request;
        $this->_lang = app('translator')->getLocale();
        $this->_generate_location_helper();
        $this->_generate_tag_object_from_request();
        $this->_generate_filter_helper();
        parent::__construct();
    }

    public function get_limit()
    {
        return (($this->_unlimited)?null:($this->_options->max_pages * $this->_options->items_per_page));
    }

    public function get_asset_type()
    {
        return $this->_tag->asset_type;
    }

    public function get_day_rate_multiplier()
    {
        return $this->_options->day_rate_multiplier;
    }

    public function get_filter_helper()
    {
        return $this->_filter_helper;
    }

    public function get_location_helper()
    {
        return $this->_location_helper;
    }

    public function get_tag()
    {
        return $this->_tag;
    }

    public function get_amenities($removeFakes = true)
    {
        return $this->_filter_helper->get_amenities($removeFakes);
    }

    public function get_configurations()
    {
        return $this->_filter_helper->get_configurations();
    }

    public function get_atts()
    {
        return $this->_filter_helper->get_atts();
    }

    public function asset_id_results_array()
    {
        if ($this->_results === null)
        {
            $this->_populate_results();
        }
        return $this->_results;
    }

    public function is_valid_search()
    {
        return $this->has_usable_bounds() && $this->has_usable_tag();
    }

    public function has_usable_bounds()
    {
        return $this->_location_helper->has_usable_bounds();
    }

    public function has_usable_tag()
    {
        return $this->_tag !== null && is_integer($this->_tag->lft) && is_integer($this->_tag->rgt);
    }

    public function get_search_attributes()
    {
        $attributes = [
            'location' => $this->_location_helper->name,
            'lat' => $this->_location_helper->lat,
            'long' => $this->_location_helper->long,
            'ne_lon' => $this->_location_helper->ne_long,
            'ne_lat' => $this->_location_helper->ne_lat,
            'sw_lon' => $this->_location_helper->sw_long,
            'sw_lat' => $this->_location_helper->sw_lat,
            'date' => $this->_request->query('date'),
            'time' => $this->_request->query('time'),
            'lang' => $this->_lang,
            'requested_tag_label' => $this->_request->query('tag'),
            'actual_tag_id' => $this->_tag->id,
            'duration' => $this->_request->query('duration'),
            'guests' => $this->_get_min_capacity(),
            'no_of_desks' => $this->_request->query('no_of_desks'),
            'minimum_duration' => $this->_request->query('minimum_duration'),
            'min_price' => $this->_request->query('min_price'),
            'max_price' => $this->_request->query('max_price'),
            'live_bookings' => $this->_request->query('live_bookings'),
            'page' => $this->_request->query('page'),
            'zoom' => $this->_request->query('zoom'),
            'widget_token' => $this->_request->query('widget_token'),
            'num_rooms' => $this->_results->count(),
            'suppressed_filters' => $this->_filter_helper->has_suppressed_filters(),
            'currency_symbol_left' => $this->_location_helper->currency_symbol_left
        ];
        return array_merge($attributes, $this->_location_helper->get_geocode_data());
    }

    public function generate_results()
    {
        if ($this->_is_admin_request())
        {
            $this->_results = $this->_generate_results_for_admin();
        }
        else
        {
            $this->_results = $this->_generate_results(true, []);
        }
    }

    private function _is_admin_request()
    {
        return $this->_is_admin_request;
    }

    private function _generate_results_for_admin()
    {
        $this->_remove_limit();
        $qb = new SearchQueryBuilder($this);
        return $qb->get_raw_results(true); //admins don't care about sponsorship
    }

    private function _generate_results($fallback_to_tag_parent = true, $results_array = [])
    {
        $qb = new SearchQueryBuilder($this);
        $ignore_sponsorship = ((count($results_array) > 0)?true:false);
        $raw_results = $qb->get_raw_results($ignore_sponsorship); // if there're already results sponsorship is meaningless, so don't waste CPU querying it
        $results_array = $this->_organise_results($raw_results, $results_array);
        $unacceptable_count = $this->_count_results($results_array) < $this->_options->acceptable_result_count;
        if ($unacceptable_count && $fallback_to_tag_parent && $this->_tag->allows_fallback())
        {
            $this->_tag = $this->_generate_tag_object_by_id($this->_tag->get_parent_id());
            return $this->_generate_results(true, $results_array);
        }
        elseif ($unacceptable_count && $this->_can_suppress_filters())
        {
            $this->_suppress_filters();
            return $this->_generate_results(false, $results_array);
        }
        else
        {
            return $this->_sort_results_array($results_array);
        }
    }

    public function get_results_as_array()
    {
        $filtered = $this->_results->map(function ($item) {
            return [
                'asset_id' => $item->asset_id,
                'hourly_rate' => $item->hourly_rate,
                'daily_rate' => $item->daily_rate,
                'max_capacity' => (!is_null($item->max_capacity)?$item->max_capacity:(!is_null($item->num_of_desks)?$item->num_of_desks:0)),
                'sponsored' => $item->sponsored,
                'ranking' => $item->ranking
            ];
        });
        return json_decode($filtered->toJson(), true);
    }

    public function get_results_asset_id_array()
    {
        $filtered = $this->_results->map(function ($item) {
            return $item->asset_id;
        });
        return json_decode($filtered->values()->toJson(), true);
    }

    private function _can_suppress_filters()
    {
        return $this->_filter_helper->has_amenities() || $this->_filter_helper->has_atts();
    }

    private function _suppress_filters()
    {
        $this->_filter_helper->suppress_filters();
    }

    private function _organise_results($raw_results, $results_array = [])
    {
        $filtered_results = $this->_filter_for_previous_results($raw_results, $results_array);
        if ($filtered_results->count() > 0)
        {
            $results_array[] = $filtered_results;
        }
        return $results_array;
    }

    private function _filter_for_previous_results($raw_results, $results_array)
    {
        $previous_keys = collect();
        foreach ($results_array as $results_collection)
        {
            $previous_keys = $previous_keys->merge($results_collection->pluck('asset_id'));
        }
        return $raw_results->whereNotIn('asset_id', $previous_keys->toArray());
    }

    private function _count_results($results_array = [])
    {
        $count = 0;
        foreach ($results_array as $results_collection)
        {
            $count += $results_collection->count();
        }
        return $count;
    }

    private function _sort_results_array($results_array)
    {
        $result_set_count = count($results_array);
        if ($result_set_count === 0)
        {
            return collect(); //there were no results - return empty collection
        }
        elseif ($result_set_count === 1)
        {
            return $this->_sort_for_sponsorship($results_array[0]);
        }
        else
        {
            return $this->_sort_for_fallback($results_array);
        }
    }

    private function _sort_for_fallback($results_array)
    {
        $sorted_results = $results_array[0]->map(function ($item) {
            $item->sponsored = 0;
            return $item;
        });
        for ($i = 1; $i < count($results_array); ++$i)
        {
            $penalised_results = $results_array[$i]->map(function ($item) use ($i) {
                $item->ranking -= ($i * $this->_is_fallback_penalisation);
                return $item;
            });
            $sorted_results = $sorted_results->merge($penalised_results);
        }
        return $this->_sort_results_collection($sorted_results, 2);
    }

    private function _sort_for_sponsorship($results_collection)
    {
        $max_count = $this->_options->get_max_ads($results_collection->count());
        list($sponsored_collection, $non_sponsored_collection) = $results_collection->partition(function ($item) {
            return $this->_partition_sponsored_item($item);
        });
        $shuffled_sponsored_collection = $this->_sort_results_collection($sponsored_collection, 10);
        $chosen_sponsored_coll = $shuffled_sponsored_collection->splice(0, $max_count);
        $non_chosen_sponsored_collection = $shuffled_sponsored_collection->map(function ($item) {
            $item->sponsored = 0;
            return $item;
        });
        $regular_collection = $non_sponsored_collection->merge($non_chosen_sponsored_collection);
        $sorted_regular_coll = $this->_sort_results_collection($regular_collection, 2);
        $sorted_results = $this->_build_results($chosen_sponsored_coll, $sorted_regular_coll);
        return $sorted_results;
    }

    private function _partition_sponsored_item($item)
    {
        $min_capacity = $this->_get_min_capacity();
        $meets_guest_criteria = true;
        if (!is_null($min_capacity) && (int)$min_capacity !== 0)
        {
            $meets_guest_criteria = ($item->max_capacity <= $min_capacity * 2);
        }
        return $meets_guest_criteria && $item->sponsored == 1;
    }

    private function _sort_results_collection($collection, $entropy = null)
    {
        return $collection->sortBy(function ($item) use ($entropy) {
            $min_capacity = $this->_get_min_capacity();
            $penalisation = 0;
            if (!is_null($min_capacity) && (int)$min_capacity !==0)
            {
                $ranking_detriment_by_capacity_diff_ratio = 30;
                $multiplier = ($item->max_capacity - $min_capacity)/$min_capacity;
                $penalisation = $multiplier * $ranking_detriment_by_capacity_diff_ratio;
            }
            if (!is_null($entropy) && is_numeric($entropy))
            {
                $penalisation += rand(0,$entropy);
            }
            return (($penalisation + 100) - $item->ranking);
        });
    }

    private function _build_results($sponsored_rooms, $regular_rooms)
    {
        $available_ad_pages = ceil($sponsored_rooms->count() / $this->_options->ads_per_page);
        $final_result = collect();
        for ($i = 0; $i < $available_ad_pages; ++$i)
        {
            $sponsored_slice = $sponsored_rooms->splice(0, $this->_options->ads_per_page);
            $regular_slice = $regular_rooms->splice(0, ($this->_options->items_per_page - $sponsored_slice->count()));
            $final_result = $final_result->merge($sponsored_slice)->merge($regular_slice);
        }
        return $final_result->merge($regular_rooms);
    }

    private function _generate_tag_object_from_request()
    {
        $tag_slug = $this->_request->query('tag');
        $meta = TagLabelMeta::with('tag_label.tag')->fromSlugAndLang($tag_slug, $this->_lang)->first();
        $this->_tag = ((is_null($meta))?null:$meta->tag_label->tag);
    }

    private function _generate_tag_object_by_id($tag_id)
    {
        return Tag::find($tag_id);
    }

    public function items_per_page()
    {
        return $this->_options->items_per_page;
    }

    private function _get_min_capacity()
    {
        $potential = $this->_request->query('guests');
        return ((!is_null($potential) && is_numeric($potential))?$potential:null);
    }

    private function _remove_limit()
    {
        $this->_unlimited = true;
    }

    private function _generate_location_helper()
    {
        $should_expand_bounds = !$this->_is_admin_request;
        $this->_location_helper = new SearchLocationHelper($this->_request, $should_expand_bounds);
    }

    private function _generate_filter_helper()
    {
        $this->_filter_helper = new SearchFilterHelper($this->_request);
    }
}
