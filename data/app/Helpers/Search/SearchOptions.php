<?php

namespace App\Helpers\Search;

class SearchOptions
{
    public $items_per_page = 24;
    public $max_pages = 10;
    public $ads_per_page = 6;
    public $ad_pages = 3;
    public $day_rate_multiplier = 6;
    public $acceptable_result_count = 75;

    public function get_max_ads($raw_result_count)
    {
        return $this->ads_per_page * $this->get_ad_pages($raw_result_count);
    }

    public function get_max_results()
    {
        return $this->max_pages * $this->items_per_page;
    }

    public function get_ad_pages($raw_result_count)
    {
        $result_count = min($raw_result_count, $this->get_max_results());
        $max_available_pages = ceil($result_count/$this->items_per_page);
        return min($max_available_pages, $this->ad_pages);
    }
}