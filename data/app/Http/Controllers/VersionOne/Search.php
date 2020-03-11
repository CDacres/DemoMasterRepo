<?php

namespace App\Http\Controllers\VersionOne;

use Illuminate\Http\Request;
use App\Helpers\Search\{SearchOptions, SearchHelper};
use App\Helpers\AnalyticsHelper;
use Illuminate\Support\Facades\Cache;
use \App\Models\Search\Search as SearchModel;
use Illuminate\Routing\Controller as BaseController;

use \Illuminate\Validation\ValidationException;
use DateInterval;

class Search extends BaseController
{
    private $_options;

    public function __construct(Request $request)
    {
        $this->_options = new SearchOptions();
    }

    private function _non_cached_search($request)
    {
        $s_tag = $request->query('s_tag', null);
        if (!is_null($s_tag))
        {
            $search = SearchModel::where('token', $s_tag)->first();
            if (!is_null($search))
            {
                return $search;
            }
        }
        return $this->_generate_new_search_and_save($request);
    }

    private function _get_cache_tag($s_tag, $page)
    {
        return 'search_' . $s_tag . '_' . $page;
    }

    public function get(Request $request)
    {
        if ($this->_detects_limitless_request($request))
        {
            return $this->_limitless_get($request);
        }
        else
        {
            return $this->_limited_get($request);
        }
    }

    private function _detects_limitless_request($request)
    {
        return $request->query('admin_mode_id', false);
    }

    private function _limited_get($request)
    {
        $s_tag = $request->query('s_tag', null);
        $page = $request->query('page', 1);
        $cache_tag = $this->_get_cache_tag($s_tag, $page);
        if (Cache::tags(['search'])->has($cache_tag))
        {
            $cache_data = Cache::tags(['search'])->get($cache_tag);
        }
        else
        {
            $search = $this->_non_cached_search($request);
            $s_tag = $search->token;
            $hydrated_results = $this->_hydrate_results_from_search($search);
            $cache_tag = $this->_get_cache_tag($s_tag, $page);
            $cache_data = new \stdClass();
            $cache_data->search = $search;
            $cache_data->results = $hydrated_results;
            Cache::tags(['search'])->put($cache_tag, $cache_data, DateInterval::createFromDateString('1 hour'));
        }
        $this->_register_search($request, $cache_data->search->id, $page);
        return response((array)$cache_data, 200);
    }

    private function _limitless_get(Request $request)
    {
        $helper = $this->_generate_new_search_helper($request, true);
        $helper->generate_results();
        $search = new SearchModel();
        $search->generate_from_helper($helper);
        $response_data = new \stdClass();
        $response_data->search = $search;
        $response_data->results = $this->_hydrate_results_from_helper($helper);
        return response((array)$response_data, 200);
    }

    private function _hydrate_results_from_helper($helper)
    {
        $id_array = $helper->get_results_asset_id_array();
        $result_object = \App\Models\RoomAsset::withDetails()
            ->withIsFavouriteForUser(18)
            ->orderByNewest()
            ->fromIdArray($id_array)
            ->paginate($this->_options->items_per_page);
        return $result_object;
    }

    private function _hydrate_results_from_search($search)
    {
        $search_id = $search->id;
        $result_object = \App\Models\Search\RoomResult::withAssetDetails()
            ->withIsFavouriteForUser(18)
            ->where('search_id', $search_id)
            ->paginate($this->_options->items_per_page);
        return $result_object;
    }

    private function _generate_new_search_and_save($request)
    {
        $helper = $this->_generate_new_search_helper($request);
        $helper->generate_results();
        $search = new SearchModel();
        $search->save_from_helper($helper);
        return $search;
    }

    private function _generate_new_search_helper($request, $admin = false)
    {
        $helper = new SearchHelper($request, $this->_options, $admin);
        if (!$helper->is_valid_search())
        {
            throw new ValidationException("The terms of the search make no sense.");
        }
        return $helper;
    }

    private function _register_search($request, $search_id, $page)
    {
        $ana_helper = new AnalyticsHelper();
        $tracking_cookie_id = $request->get('tracking_cookie_id');
        $language = app('translator')->getLocale();
        $admin_id = $request->get('admin_id');
        $ana_helper->register_step('SEARCH_INTERACTION', $tracking_cookie_id, $language, $admin_id, $search_id, $page);
    }
}
