<?php

namespace App\Helpers;

use App\Helpers\Formatting\PriceHelper;

use App\Models\Verticals\Vertical;

use stdClass;

class RoomHelper
{
    public function get_url($room, $withDomain = true, $fullUrl = true, $widgetLink = false)
    {
        $roomLocale = $room->venue->locale;
        if (is_null($roomLocale))
        {
            $roomLocale = new stdClass();
            $roomLocale->domain_code = 'uk';
            $roomLocale->ci_language_code = 'en';
        }
        $retUrl = '';
        if ($fullUrl)
        {
            $retUrl = env('SITE_URL');
        }
        if ($withDomain)
        {
            $retUrl .= '/' . $roomLocale->domain_code;
        }
        $retUrl .= '/' . (new UsageHelper())->get_usage_alias($room->usage_id, $roomLocale->ci_language_code);
        if (!is_null($room->city))
        {
            $retUrl .= '/' . (new UrlHelper())->seo_url($room->city);
        }
        $retUrl .= '/' . $room->id;
        if ($widgetLink)
        {
            $retUrl .= '?widget=1';
        }
        return $retUrl;
    }

    public function get_shown_room_price($room, $priceType = 'generic')
    {
        $priceHelper = new PriceHelper($priceType);
        $priceControlPercent = $room->price_control_percent;
        $priceControlMultiplier = ((!is_null($priceControlPercent))?1 + ($priceControlPercent / 100):1);
        $hourly_price = round($priceControlMultiplier * $room->hourly_price);
        if (!is_null($room->day_rate_details))
        {
            $daily_price = round($priceControlMultiplier * $room->day_rate_details->daily_price);
            $monthly_price = round($priceControlMultiplier * $room->day_rate_details->monthly_price);
        }
        else
        {
            $daily_price = null;
            $monthly_price = null;
        }
        if ($room->primary_vertical->first()->id == Vertical::OFFICE)
        {
            if (!is_null($monthly_price) && $monthly_price > 0)
            {
                $priceType = 'monthly';
                $priceHelper->price = $monthly_price;
            }
            else if (!is_null($daily_price) && $daily_price > 0)
            {
                $priceType = 'daily';
                $priceHelper->price = $daily_price;
            }
        }
        else
        {
            if (!is_null($hourly_price) && $hourly_price > 0)
            {
                $priceType = 'hourly';
                $priceHelper->price = $hourly_price;
            }
            else if (!is_null($daily_price) && $daily_price > 0)
            {
                $priceType = 'daily';
                $priceHelper->price = $daily_price;
            }
        }
        if (isset($priceType))
        {
            return [$priceType => $priceHelper->formatted()];
        }
        return null;
    }

    public function get_uncompleted_stages($room, $lang)
    {
        $steps = [
            'todo' => 0,
            'stages' => '',
            'trans_stages' => ''
        ];
        if (!$room->ready_for_approval)
        {
            $uncompletedSteps = 0;
            $uncompletedStages = [];
            if ($this->is_null('title'))
            {
                ++$uncompletedSteps;
                $uncompletedStages[] = trans('assets.name', [], $lang);
            }
            if ($this->is_null('description'))
            {
                ++$uncompletedSteps;
                $uncompletedStages[] = trans('assets.description', [], $lang);
            }
            if ($uncompletedSteps > 0)
            {
                $steps['todo'] = $uncompletedSteps;
                $steps['stages'] = implode(', ', $uncompletedStages);
            }
        }
        return $steps;
    }
}
