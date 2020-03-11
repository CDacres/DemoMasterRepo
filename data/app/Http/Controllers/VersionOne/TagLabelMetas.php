<?php

namespace App\Http\Controllers\VersionOne;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use App\Models\Tags\TagLabelMeta;
use App\Contracts\Facades\ChannelLog as Log;

use DateInterval;

class TagLabelMetas extends Controller
{
    public function get_by_slug(Request $request, $tag_slug)
    {
        $lang = $this->locale();
        $decoded_slug = urldecode($tag_slug);
        return Cache::tags(['tags'])->remember('tag_' . $lang . '_' . $decoded_slug, DateInterval::createFromDateString('1 day'), function() use ($lang, $decoded_slug) {
            $tag_label_meta = TagLabelMeta::fromSlugAndLang($decoded_slug, $lang)
                ->with(['keywords' => function ($query) {
                    $query->orderBy('search_volume', 'desc');
                }])->get()
                ->each(function($item)
                {
                    $item->keywords->makeVisible('enabled');
                })->first();
            if (!is_null($tag_label_meta))
            {
                return $tag_label_meta->toArray();
            }
            else
            {
                Log::warning("Get tag meta by slug failed.", 'default', ['slug' => $decoded_slug]);
                return null;
            }
        });
    }

    public function get_by_tag_id(Request $request, $tag_id)
    {
        $lang = $this->locale();
        return Cache::tags(['tags'])->remember('tag_meta_' . $lang . '_' . $tag_id, DateInterval::createFromDateString('1 day'), function() use ($lang, $tag_id) {
            return TagLabelMeta::fromIdAndLang($tag_id, $lang)
                ->preferred()->with(['keywords' => function ($query) {
                    $query->orderBy('search_volume', 'desc');
                }])->get()
                ->each(function($item)
                {
                    $item->keywords->makeVisible('enabled');
                })->first()->toArray();
        });
    }
}