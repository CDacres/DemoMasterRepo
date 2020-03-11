<?php

namespace App\Http\Controllers\VersionOne;
use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;

use App\Models\Fakes\Widget;
use App\Models\CompanyAsset;
use App\Models\RoomAsset;

use App\Helpers\RoomHelper;

use stdClass;
use DateInterval;

class Widgets extends Controller
{
    protected $defaultClass = Widget::class;

    public function get_widget($domain, $token)
    {
        if ($this->_check_domain($domain) && $this->_check_token($token))
        {
            $cache_tag = 'widget_' . $domain . '_' . $token;
            if (Cache::tags(['widget'])->has($cache_tag))
            {
                return $this->serialisedJsonResponse(Cache::tags(['widget'])->get($cache_tag));
            }
            else
            {
                $company = $this->_find_company($token);
                if (count($company) == 1)
                {
                    $rooms = $this->_find_rooms($token);
                    if (count($rooms) > 0)
                    {
                        return $this->serialisedJsonResponse($this->_find_from_cache($company->first(), $rooms, $cache_tag));
                    }
                    return response()->json(['error' => 'Not Found'], 404);
                }
                return response()->json(['error' => 'Not Found'], 404);
            }
        }
        return response()->json(['error' => 'Not Found'], 404);
    }

    private function _check_domain($domain)
    {
        return preg_match("/^([a-zA-Z]{2})$/", $domain);
    }

    private function _check_token($token)
    {
        return preg_match("/^([\p{L}\p{N}]+)$/", $token);
    }

    private function _find_from_cache($company, $rooms, $cache_tag)
    {
        return $this->_generate_cache_and_response($this->_return_widget($company, $rooms), $cache_tag);
    }

    private function _generate_cache_and_response($response, $cache_tag)
    {
        Cache::tags(['widget'])->put($cache_tag, $response, DateInterval::createFromDateString('1 day'));
        return $response;
    }

    private function _return_widget($company, $rooms)
    {
        $retWidget = new stdClass;
        $retWidget->id = $company->id;
        $retWidget->banner_img = env('SITE_URL') . '/_express/images/pages/widget/widget.jpg';
        $retWidget->banner_subtitle = trans('widget.subtitle');
        $retWidget->banner_title = $company->details->name;
        $retWidget->cards = $this->_get_cards($rooms);
        return $retWidget;
    }

    private function _find_company($token)
    {
        return CompanyAsset::where('token', $token)->get();
    }

    private function _find_rooms($token)
    {
        if (!is_null($token))
        {
            return DB::table('rooms')->join('venues', 'rooms.venue_id', 'venues.id')
                ->join('companies', 'venues.company_id', 'companies.id')
                ->join('asset_audit', 'companies.asset_id', 'asset_audit.id')
                ->where('asset_audit.token', $token)
                ->where('rooms.title', '<>', '')
                ->where('rooms.hidden', 0)
                ->where('rooms.status', 1)
                ->where('rooms.approved', 1)
                ->where('venues.approved', 1)
                ->where('rooms.enabled', 1)
                ->where('venues.enabled', 1)
                ->where('companies.enabled', 1)
                ->where('asset_audit.enabled', 1)
                ->select(DB::raw('rooms.asset_id'))
                ->get()->toArray();
        }
        return false;
    }

    private function _get_cards($rooms)
    {
        $retCardArr = [];
        $assets = $this->_get_card_assets($rooms);
        $roomHelper = new RoomHelper();
        foreach ($rooms as $room)
        {
            $asset = $assets->where('id', $room->asset_id)->first();
            $featuredImage = $asset->images->first(function($item) {
                return $item->is_featured == 1;
            });
            $vertical = $asset->primary_vertical->first();
            $price = $roomHelper->get_shown_room_price($asset);
            $retCardArr[] = [
                'id' => (string) $room->asset_id,
                'category' => (string) $vertical->name . ' · ' . $asset->venuename,
                'city' => (string) $asset->city,
                'currency' => (string) html_entity_decode($asset->details->currency_code->symbol_left),
                'image' => (string) ((!is_null($featuredImage))?$featuredImage->getMediumUrlAttribute():''),
                'link' => (string) $roomHelper->get_url($asset->details, false, false, true),
                'max_capacity' => (string) (!is_null($asset->max_capacity)?$asset->maxCapacityString:(!is_null($asset->num_of_desks)?$asset->numOfDesksString:0)),
                'price' => ((!is_null($price))?$price:''),
                'rating' => (float) $asset->review_score,
                'reviews_count' => (int) $asset->review_count,
                'title' => (string) $asset->title,
                'vertical_id' => (int) $vertical->id
            ];
        }
        return $retCardArr;
    }

    private function _get_card_assets($cards)
    {
        $assetArr = [];
        foreach ($cards as $card)
        {
            $assetArr[] = $card->asset_id;
        }
        return RoomAsset::with(['images', 'primary_vertical', 'details'])->whereIn('id', $assetArr)->get();
    }
}
