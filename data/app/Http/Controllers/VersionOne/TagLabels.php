<?php

namespace App\Http\Controllers\VersionOne;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use App\Models\Tags\TagLabel;

use DateInterval;

class TagLabels extends Controller
{
    public function get_all_labels_and_defaults_for_search()
    {
        $object = [];
        $object['defaultTags'] = $this->get_default_labels();
        $object['tags'] = $this->get_all_labels();
        return $object;
    }

    public function get_default_labels()
    {
        $lang = $this->locale();
        return Cache::tags(['tags'])->remember('default_tag_labels_' . $lang, DateInterval::createFromDateString('1 day'), function() use ($lang) {
            return TagLabel::hasQuickSlug()
                ->fromLang($lang)
                ->defaultsOrdered()
                ->get()->toArray();
        });
    }

    public function get_all_labels()
    {
        $lang = $this->locale();
        return Cache::tags(['tags'])->remember('all_tag_labels_' . $lang, DateInterval::createFromDateString('1 day'), function() use ($lang) {
            return TagLabel::with('metas.keywords')
                ->hasQuickSlug()
                ->fromLang($lang)
                ->get()->toArray();
        });
    }

    public function get_default(Request $request)
    {
        $lang = $this->locale();
        return Cache::tags(['tags'])->remember('default_tag_label_' . $lang, DateInterval::createFromDateString('1 day'), function() use ($lang) {
            return TagLabel::hasQuickSlug()
                ->fromLang($lang)
                ->defaultsOrdered()
                ->get()->first()->toArray();
        });
    }

    public function get_home_sub_tags()
    {
        $lang = $this->locale();
        return Cache::tags(['tags'])->remember('home_sub_tag_labels_' . $lang, DateInterval::createFromDateString('1 day'), function() use ($lang) {
            return TagLabel::hasQuickSlug()
                ->hasHomeLabel()
                ->fromLang($lang)
                ->homeLabelOrdered()
                ->get()->toArray();
        });
    }

    public function get_by_id(Request $request, $id)
    {
        $lang = $this->locale();
        return Cache::tags(['tags'])->remember('tag_labels_' . $lang . '_' . $id, DateInterval::createFromDateString('1 day'), function() use ($lang, $id) {
            return TagLabel::with('metas.keywords')
                ->fromLang($lang)
                ->fromId($id)
                ->get()->makeVisible('enabled')->toArray();
        });
    }

    public function get_by_vertical_id(Request $request, $vertical_id)
    {
        $lang = $this->locale();
        return Cache::tags(['tags'])->remember('tag_labels_by_vertical_' . $lang . '_' . $vertical_id, DateInterval::createFromDateString('1 day'), function() use ($lang, $vertical_id) {
            return TagLabel::with('metas.keywords')
                ->fromLang($lang)
                ->fromVertical($vertical_id)
                ->get()->makeVisible('enabled')->toArray();
        });
    }
}