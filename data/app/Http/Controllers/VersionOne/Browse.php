<?php

namespace App\Http\Controllers\VersionOne;
use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Request;

use App\Models\Landing\BLP_BrowseUrl;
use App\Models\Landing\BLP_Browse;
use App\Models\Landing\Location;

use App\Helpers\DomainHelper;
use App\Helpers\LandingHelper;

use stdClass;
use DateInterval;

class Browse extends Controller
{
    protected $defaultClass = BLP_Browse::class;

    public function get_browse(Request $request)
    {
        $domain = $request->input('domain');
        $vertical = $request->input('vertical');
        $landingHelper = new LandingHelper();
        if ($landingHelper->check_domain($domain) && $landingHelper->check_vertical($vertical))
        {
            $cache_tag = 'browse_' . $domain . '/' . $vertical;
            if (Cache::tags(['browse'])->has($cache_tag))
            {
                return $this->serialisedJsonResponse(Cache::tags(['browse'])->get($cache_tag));
            }
            else
            {
                $locale_id = (new DomainHelper())->find_locale_id_by_domain($domain);
                if ($locale_id === false)
                {
                    return response()->json(['error' => 'Not Found'], 404);
                }
                $path = '/' . $vertical;
                $browse_url = BLP_BrowseUrl::where('locale_id', $locale_id)->where('url', $path)->first();
                if (!is_null($browse_url))
                {
                    $url = $domain . $path;
                    return $this->serialisedJsonResponse($this->_find_from_cache($url, $path, $browse_url->browse_id, $cache_tag));
                }
                return response()->json(['error' => 'Not Found'], 404);
            }
        }
        return response()->json(['error' => 'Not Found'], 404);
    }

    private function _find_from_cache($url, $path, $browseId, $cache_tag)
    {
        $browse = BLP_Browse::find($browseId);
        return $this->_generate_cache_and_response($this->_return_browse($browse, $browseId, $url, $path), $cache_tag);
    }

    private function _generate_cache_and_response($response, $cache_tag)
    {
        Cache::tags(['browse'])->put($cache_tag, $response, DateInterval::createFromDateString('1 day'));
        return $response;
    }

    private function _return_browse($browse, $browseId, $url, $path)
    {
        $landingHelper = new LandingHelper();
        $location = $browse->location;
        $locationDesc = trim($location->human_desc);
        $info = $browse->browse_info;
        $meta_override = $browse->browse_meta;
        $vertical = $browse->tag_label->vertical;
        $tag_meta = $browse->tag_label->metas->first();
        $tagMetaLabel = $tag_meta->browse_link_label;
        $tagMetaDesc = $tag_meta->browse_meta_desc;
        $tagMetaTitle = $tag_meta->browse_title;
        $langCode = explode("_", $browse->tag_label->language_code)[0];
        $retBrowse = new stdClass;
        $retBrowse->banner_button = (string) $info->banner_button;
        $retBrowse->banner_img = (!is_null($info->banner_image)?$info->banner_image->getBannerUrlAttribute():null);
        $retBrowse->banner_text = (string) $info->banner_text;
        $retBrowse->banner_text_color = (string) $info->banner_text_color;
        $retBrowse->banner_title = (string) $info->banner_title;
        $retBrowse->breadcrumbs = $this->_get_breadcrumbs($url, $path, $tagMetaLabel, $langCode, $landingHelper);
        $retBrowse->canonical_url = (string) $landingHelper->find_canonical_url($browse->browse_urls, $tag_meta, $url);
        $retBrowse->card_subtitle = (string) $info->card_subtitle;
        $retBrowse->card_title = (string) $info->card_title;
        $retBrowse->cards = $this->_find_cards($browse, $landingHelper);
        $retBrowse->category = (string) $vertical->title;
        $retBrowse->help_subtitle = (string) $info->help_subtitle;
        $retBrowse->help_title = (string) $info->help_title;
        $retBrowse->html_text_bottom = (string) $info->html_bottom;
        $retBrowse->html_text_top = (string) $info->html_top;
        $retBrowse->id = (string) $browseId;
        $retBrowse->location_desc = (string) $locationDesc;
        $retBrowse->meta_desc = (string) $this->_find_desc($meta_override, $tagMetaDesc, $tagMetaLabel, 'meta', $langCode);
        $retBrowse->meta_keyword = (string) $this->_find_meta_keywords($meta_override, $tag_meta->keywords, $tagMetaLabel, $langCode);
        $retBrowse->meta_title = (string) $this->_find_title($meta_override, $tagMetaTitle, $tagMetaLabel, 'meta', $langCode);
        $retBrowse->nearby_locations = $this->_get_nearby_locations($browseId, $tagMetaLabel, $langCode);
        $retBrowse->nearby_title = (string) $this->_find_nearby_title($info, $location->locationcategorie_id, $locationDesc, $langCode);
        $retBrowse->page_subtitle = (string) $this->_find_page_subtitle($meta_override, $tag_meta->browse_h2_title, $tagMetaLabel, $langCode);
        $retBrowse->page_title = (string) $this->_find_page_title($meta_override, $tag_meta->browse_h1_title, $tagMetaLabel, $langCode);
        $retBrowse->schema_desc = (string) $this->_find_desc($meta_override, $tagMetaDesc, $tagMetaLabel, 'schema', $langCode);
        $retBrowse->schema_name = (string) $this->_find_title($meta_override, $tagMetaTitle, $tagMetaLabel, 'schema', $langCode);
        $retBrowse->search_url_full = (string) '/s/' . $tag_meta->slug;
        $retBrowse->tag_label_id = (string) $browse->tag_label_id;
        $retBrowse->vertical_id = (string) $vertical->id;
        return $retBrowse;
    }

    private function _find_cards($browse, $landingHelper)
    {
        $retCardArr = [];
        $cards = $browse->cards;
        foreach ($cards as $card)
        {
            $preferredUrl = $landingHelper->find_preferred_url($card->landing_url);
            $retCardArr[] = [
                'id' => (string) $card->id,
                'image' => (!is_null($card->card_image)?$card->card_image->getLargeUrlAttribute():null),
                'link' => (string) ((!is_null($preferredUrl))?$landingHelper->create_url($preferredUrl, false):''),
                'text' => (string) $card->card_text,
                'title' => (string) $card->card_title
            ];
        }
        return $retCardArr;
    }

    private function _find_page_title($meta_override, $tagH1Title, $tagMetaLabel, $langCode)
    {
        if (!is_null($meta_override->page_title))
        {
            $retTitle = $meta_override->page_title;
        }
        elseif (!is_null($tagH1Title))
        {
            $retTitle = $tagH1Title;
        }
        else
        {
            $retTitle = trans('blp.browse_h1_title', ['link_label' => $tagMetaLabel], $langCode);
        }
        return $retTitle;
    }

    private function _find_page_subtitle($meta_override, $tagH2Title, $tagMetaLabel, $langCode)
    {
        if (!is_null($meta_override->page_subtitle))
        {
            $retSubtitle = $meta_override->page_subtitle;
        }
        elseif (!is_null($tagH2Title))
        {
            $retSubtitle = $tagH2Title;
        }
        else
        {
            $retSubtitle = trans('blp.browse_h2_title', ['link_label' => $tagMetaLabel], $langCode);
        }
        return $retSubtitle;
    }

    private function _find_meta_keywords($meta_override, $tagMetaKeywords, $tagMetaLabel, $langCode)
    {
        if (!is_null($meta_override->meta_keyword))
        {
            $retMetaKeywords = $meta_override->meta_keyword;
        }
        elseif (count($tagMetaKeywords) > 0)
        {
            $keywordArr = [];
            foreach ($tagMetaKeywords as $keyword)
            {
                if ($keyword->browse)
                {
                    $keywordArr[] = $keyword->keyword_new;
                }
            }
            $retMetaKeywords = implode(", ", $keywordArr);
        }
        else
        {
            $retMetaKeywords = trans('blp.browse_meta_keyword', ['link_label' => $tagMetaLabel], $langCode);
        }
        return $retMetaKeywords;
    }

    private function _find_desc($meta_override, $tagMetaDesc, $tagMetaLabel, $type, $langCode)
    {
        if ($type == 'meta' && !is_null($meta_override->meta_desc))
        {
            $retDesc = $meta_override->meta_desc;
        }
        elseif ($type == 'schema' && !is_null($meta_override->schema_desc))
        {
            $retDesc = $meta_override->schema_desc;
        }
        elseif (!is_null($tagMetaDesc))
        {
            $retDesc = $tagMetaDesc;
        }
        else
        {
            $retDesc = trans('blp.browse_meta_desc', ['link_label' => $tagMetaLabel], $langCode);
        }
        return $retDesc;
    }

    private function _find_title($meta_override, $tagMetaTitle, $tagMetaLabel, $type, $langCode)
    {
        if ($type == 'meta' && !is_null($meta_override->meta_title))
        {
            $retTitle = $meta_override->meta_title;
        }
        elseif ($type == 'schema' && !is_null($meta_override->schema_name))
        {
            $retTitle = $meta_override->schema_name;
        }
        elseif (!is_null($tagMetaTitle))
        {
            $retTitle = $tagMetaTitle;
        }
        else
        {
            $retTitle = trans('blp.browse_meta_title', ['link_label' => $tagMetaLabel], $langCode);
        }
        return $retTitle;
    }

    private function _find_nearby_title($info, $locationCategory, $locationDesc, $langCode)
    {
        if (!is_null($info->nearby_title))
        {
            $retNearbyTitle = $info->nearby_title;
        }
        else
        {
            $retNearbyTitle = trans('blp.nearby_title_' . $locationCategory, ['location_desc' => $locationDesc], $langCode);
        }
        return $retNearbyTitle;
    }

    private function _get_breadcrumbs($url, $path, $tagMetaLabel, $langCode, $landingHelper)
    {
        $home_breadcrumb = $landingHelper->create_home_breadcrumb($tagMetaLabel, $langCode);
        $current_bread = $this->_create_current_breadcrumb($url, $path, $tagMetaLabel, $langCode);
        $breadcrumbs = array_merge($home_breadcrumb, $current_bread);
        return $landingHelper->get_breadcrumbs($breadcrumbs);
    }

    private function _create_current_breadcrumb($url, $path, $tagMetaLabel, $langCode)
    {
        $current_page = [];
        $current_bread = new stdClass;
        $current_bread->full_url = env('SITE_URL') . '/' . $url;
        $current_bread->id = 2;
        $current_bread->text = $tagMetaLabel;
        $current_bread->title = trans('blp.home_breadcrumb_title', ['link_label' => $tagMetaLabel], $langCode);
        $current_bread->url = $path;
        $current_page[] = $current_bread;
        return $current_page;
    }

    private function _get_nearby_locations($browseId, $tagMetaLabel, $langCode)
    {
        $retNearbyArr = [];
        $nearby_locations = $this->_get_nearby($browseId);
        foreach ($nearby_locations as $nearby_location)
        {
            $retNearbyArr[] = [
                'id' => (string) $nearby_location->id,
                'link' => (string) $nearby_location->url,
                'subtitle' => (string) $nearby_location->approved_room_count . ' ' . $tagMetaLabel,
                'text' => (string) $tagMetaLabel . ' ' . $nearby_location->human_desc,
                'title' => (string) trans('blp.nearby_location_related_title_' . Location::CITY, ['link_label' => $tagMetaLabel, 'location_desc' => $nearby_location->human_desc], $langCode)
            ];
        }
        return $retNearbyArr;
    }

    private function _get_nearby($browseId)
    {
        return DB::table('blp_browse')->join('tag_language_labels', 'blp_browse.tag_label_id', 'tag_language_labels.id')
            ->join('locations', 'blp_browse.location_id', 'locations.parent_id')
            ->join('blp_landing AS nearby_lp', function($join) {
                $join->on('locations.id', 'nearby_lp.location_id')
                    ->on('tag_language_labels.id', 'nearby_lp.tag_label_id')
                    ->whereNotExists(function ($query) {
                        $query->from('blp_landing_attributes')->whereRaw('blp_landing_attributes.lp_id = nearby_lp.id');
                    });
            })->join('blp_landing_urls', function($join) {
                $join->on('nearby_lp.id', 'blp_landing_urls.lp_id')
                    ->where('blp_landing_urls.preferred', 1);
            })->join('location_rooms', function($join) {
                $join->on('locations.id', 'location_rooms.location_id')
                    ->on('tag_language_labels.tag_id', 'location_rooms.tag_id');
            })->where('blp_browse.id', $browseId)
            ->where('location_rooms.approved_room_count', '>', 0)
            ->where('locations.locationcategorie_id', Location::CITY)
            ->where('locations.in_sitemap', 1)
            ->where('locations.enabled', 1)
            ->where('tag_language_labels.enabled', 1)
            ->limit(50)
            ->orderBy('location_rooms.approved_room_count', 'DESC')
            ->orderBy('locations.human_desc', 'ASC')
            ->orderBy('blp_landing_urls.url', 'ASC')
            ->select(DB::raw('nearby_lp.id, blp_landing_urls.url, locations.human_desc, location_rooms.approved_room_count'))->get();
    }
}