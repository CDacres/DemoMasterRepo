<?php

namespace App\Http\Controllers\VersionOne;
use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\Cache;
use App\Models\Landing\LandingPage;

//use App\Transformers\LandingPageTransformer;

use DateInterval;

class LandingPages extends Controller
{
    protected $defaultClass = LandingPage::class;

    public function get_landing_page_by_id($landing_page_id)
    {
        $lang = $this->locale();
        return Cache::tags(['landingpage'])->remember('landing_page_' . $lang . '_' . $landing_page_id, DateInterval::createFromDateString('1 day'), function() use ($lang, $landing_page_id) {
            return LandingPage::with(['redirect' => function ($query) use ($lang) {
                $query->withLang($lang)->whereLang($lang);
            }])->withLang($lang)->whereLang($lang)->findOrFail($landing_page_id)->toArray();
        });
    }

    public function get_browse_pages_by_tag_id($tag_id)
    {
        $lang = $this->locale();
        return Cache::tags(['landingpage'])->remember('landing_page_browse_' . $lang . '_' . $tag_id, DateInterval::createFromDateString('1 day'), function() use ($lang, $tag_id) {
            return LandingPage::with(['redirect' => function ($query) use ($lang) {
                $query->withLang($lang)->whereLang($lang);
            }])->withLang($lang)->whereLang($lang)->whereBrowse()->whereTag($tag_id)->get()->toArray();
        });
    }

    public function get_landing_pages_by_tag_label_id($tag_label_id)
    {
        $lang = $this->locale();
        return Cache::tags(['landingpage'])->remember('all_landing_pages_by_tag_label_' . $lang . '_' . $tag_label_id, DateInterval::createFromDateString('1 day'), function() use ($lang, $tag_label_id) {
            return LandingPage::with(['redirect' => function ($query) use ($lang) {
                $query->withLang($lang)->whereLang($lang);
            }])->withLang($lang)->whereLang($lang)->whereLocation()->withTagLabel($lang, $tag_label_id)->whereTagLabel($lang, $tag_label_id)->withAttrLang($lang)->get()
            ->sort(function ($a, $b) {
                return strnatcmp($a->location->human_desc, $b->location->human_desc);
            })->values()->each(function($item) {
                $item->landing_page_lang->makeVisible('enabled');
                $item->landing_page_lang->each(function($item)
                {
                    $item->landing_page_url->makeVisible('enabled');
                });
                $item->tag->labels->makeVisible('enabled');
                if ($item->attribute != null)
                {
                    $item->attribute->makeVisible('enabled');
                    $item->attribute->attr_language->makeVisible('enabled');
                }
            })->toArray();
        });
    }

    public function get_landing_pages_by_location_id($location_id)
    {
        $lang = $this->locale();
        return Cache::tags(['landingpage'])->remember('all_landing_pages_by_location_' . $lang . '_' . $location_id, DateInterval::createFromDateString('1 day'), function() use ($lang, $location_id) {
            return LandingPage::with(['redirect' => function ($query) use ($lang) {
                $query->withLang($lang)->whereLang($lang);
            }])->withLang($lang)->whereLang($lang)->whereLocation($location_id)->withTagLabel($lang, null, true)->whereTagLabel($lang, null, true)->withAttrLang($lang)->get()
            ->each(function($item) {
                $item->landing_page_lang->makeVisible('enabled');
                $item->landing_page_lang->each(function($item) {
                    $item->landing_page_url->makeVisible('enabled');
                });
                $item->tag->labels->makeVisible('enabled');
                if ($item->attribute != null)
                {
                    $item->attribute->makeVisible('enabled');
                    $item->attribute->attr_language->makeVisible('enabled');
                }
            })->toArray();
        });
    }

    public function get_landing_pages_by_tag_label_and_location_ids($tag_label_id, $location_id)
    {
        $lang = $this->locale();
        return Cache::tags(['landingpage'])->remember('landing_pages_by_tag_label_location_' . $lang . '_' . $tag_label_id . '_' . $location_id, DateInterval::createFromDateString('1 day'), function() use ($lang, $tag_label_id, $location_id) {
            return LandingPage::with(['redirect' => function ($query) use ($lang) {
                $query->withLang($lang)->whereLang($lang);
            }])->withLang($lang)->whereLang($lang)->whereLocation($location_id)->withTagLabel($lang, $tag_label_id, true)->whereTagLabel($lang, $tag_label_id, true)->withAttrLang($lang)->get()
            ->each(function($item) {
                $item->landing_page_lang->makeVisible('enabled');
                $item->landing_page_lang->each(function($item) {
                    $item->landing_page_url->makeVisible('enabled');
                });
                $item->tag->labels->makeVisible('enabled');
                if ($item->attribute != null)
                {
                    $item->attribute->makeVisible('enabled');
                    $item->attribute->attr_language->makeVisible('enabled');
                }
            })->toArray();
        });
    }
}