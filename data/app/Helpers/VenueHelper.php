<?php

namespace App\Helpers;

class VenueHelper
{
    public function get_url($venue, $withDomain = true, $fullUrl = true)
    {
        $retUrl = '';
        if ($fullUrl)
        {
            $retUrl = env('SITE_URL');
        }
        if ($withDomain)
        {
            $venueLocale = $venue->locale;
            $retUrl .= '/' . ((!is_null($venueLocale))?$venueLocale->domain_code:'uk');
        }
        $retUrl .= '/venues/' . (new UrlHelper())->seo_url($venue->name) . '/' . $venue->id;
        return $retUrl;
    }

    public function get_uncompleted_stages($venue, $lang)
    {
        $steps = [
            'todo' => 0,
            'stages' => '',
            'trans_stages' => ''
        ];
        if (!$venue->ready_for_approval)
        {
            $uncompletedSteps = 0;
            $uncompletedStages = [];
            if ($this->is_null('name'))
            {
                ++$uncompletedSteps;
                $uncompletedStages[] = trans('assets.name', [], $lang);
            }
            if ($this->is_null('description'))
            {
                ++$uncompletedSteps;
                $uncompletedStages[] = trans('assets.description', [], $lang);
            }
            if ($this->is_null('cancellation_days') || $this->is_null('cancellation_percent'))
            {
                ++$uncompletedSteps;
                $uncompletedStages[] = trans('assets.cancel_terms', [], $lang);
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
