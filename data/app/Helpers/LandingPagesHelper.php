<?php

namespace App\Helpers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;

use App\Models\Landing\BLP_LandingUrl;
use App\Models\Landing\BLP_Landing;
use App\Models\Landing\BLP_LandingCardType;
use App\Models\Landing\BLP_LandingUrlCache;
use App\Models\Landing\Location;
use App\Models\Attribute;
use App\Models\VenueType;
use App\Models\RoomAsset;

use App\Helpers\DomainHelper;
use App\Helpers\LandingHelper;
use App\Helpers\RoomHelper;

use stdClass;
use DateInterval;

class LandingPagesHelper
{
    public function reset_cached_landing_pages()
    {
        $landing_pages = $this->_get_oldest_cached_landing_pages();
        $this->_reset_cached_pages($landing_pages);
    }

    private function _get_oldest_cached_landing_pages()
    {
        return BLP_LandingUrlCache::oldest('last_cached')
            ->limit(10)
            ->get();
    }

    private function _reset_cached_pages($pages)
    {
        if (count($pages) > 0)
        {
            foreach ($pages as $page)
            {
                $url_parts = explode('/', $page->url);
                $domain = $url_parts[0];
                $vertical = $url_parts[1];
                $location = $url_parts[2];
                $this->get_landing($domain, $vertical, $location, true);
            }
        }
    }

    public function get_landing($domain, $vertical, $location, $resetCache = false)
    {
        $cache_tag = 'landing_' . $domain . '/' . $vertical . '/' . $location;
        if (Cache::tags(['landing'])->has($cache_tag) && !$resetCache)
        {
            return [
                'type' => 'success',
                'payload' => Cache::tags(['landing'])->get($cache_tag)
            ];
        }
        else
        {
            $landingHelper = new LandingHelper();
            if ($landingHelper->check_domain($domain) && $landingHelper->check_vertical($vertical) && $landingHelper->check_location($location))
            {
                $locale_id = (new DomainHelper())->find_locale_id_by_domain($domain);
                if ($locale_id === false)
                {
                    return ['type' => '404'];
                }
                $path = '/' . $vertical . '/' . $location;
                $lp_url = BLP_LandingUrl::where('locale_id', $locale_id)->where('url', $path)->first();
                if (!is_null($lp_url))
                {
                    $url = $domain . $path;
                    return $this->_find_from_cache($url, $path, $lp_url->lp_id, $cache_tag);
                }
                return ['type' => '404'];
            }
            return ['type' => '404'];
        }
    }

    private function _find_from_cache($url, $path, $landingId, $cache_tag)
    {
        $landingHelper = new LandingHelper();
        $landing = BLP_Landing::find($landingId);
        if (!is_null($landing->redirect_lp_id))
        {
            $this->_remove_cached_url($url);
            return $this->_return_redirect($landing, $landingId, $landingHelper);
        }
        else
        {
            $this->_insert_update_cached_url($url);
            return $this->_generate_cache_and_response($this->_return_landing($landing, $landingId, $url, $path, $landingHelper), $cache_tag);
        }
    }

    private function _remove_cached_url($url)
    {
        BLP_LandingUrlCache::where('url', $url)->delete();
    }

    private function _insert_update_cached_url($url)
    {
        BLP_LandingUrlCache::updateOrInsert(['url' => $url], ['last_cached' => date("Y-m-d H:i:s")]);
    }

    private function _generate_cache_and_response($response, $cache_tag)
    {
        Cache::tags(['landing'])->put($cache_tag, $response, DateInterval::createFromDateString('1 day'));
        return [
            'type' => 'success',
            'payload' => $response
        ];
    }

    private function _return_redirect($landing, $landingId, $landingHelper)
    {
        $retLanding = new stdClass;
        $retLanding->id = (string) $landingId;
        return [
            'type' => 'redirect',
            'redirect_url' => $landingHelper->create_url($landingHelper->find_preferred_url($landing->redirect->landing_urls), false),
            'payload' => $retLanding
        ];
    }

    private function _return_landing($landing, $landingId, $url, $path, $landingHelper)
    {
        $language = $landing->tag_label->language_code;
        $location = $landing->location;
        $locationDesc = trim($location->human_desc);
        $locationCategory = $location->locationcategorie_id;
        $parent_location = $location->parent_location;
        $parentLocationDesc = trim($parent_location->human_desc);
        $locationId = $location->id;
        $tagLabelId = $landing->tag_label->id;
        $attributes = $landing->landing_attributes;
        $attribute = null;
        foreach ($attributes as $attribute)
        {
            $attribute = $attribute->attribute->attr_language->first(function($item) use ($language) {
                return $item->lang_code == $language;
            });
        }
        $info = $landing->landing_info;
        $meta_override = $landing->landing_meta;
        $vertical = $landing->tag_label->vertical;
        $tag_meta = $landing->tag_label->metas->first();
        $tagMetaLabel = $tag_meta->browse_link_label;
        $tagMetaDesc = $tag_meta->lp_meta_desc_new;
        $tagMetaTitle = $tag_meta->lp_title_new;
        $link_location_label = __($tag_meta->lp_link_label_new, ['location_desc' => $locationDesc]);
        $langCode = explode("_", $language)[0];
        $cards = $this->_get_cards($landingId, $locationId, $tagLabelId, $attribute, $langCode);
        $retLanding = new stdClass;
        $retLanding->banner_button = (string) $info->banner_button;
        $retLanding->banner_img = (!is_null($info->banner_image)?$info->banner_image->getBannerUrlAttribute():null);
        $retLanding->banner_text = (string) $info->banner_text;
        $retLanding->banner_text_color = (string) $info->banner_text_color;
        $retLanding->banner_title = (string) $info->banner_title;
//        $retLanding->bounds_ne_lat = (string) $location->bounds_ne_lat;
//        $retLanding->bounds_ne_lon = (string) $location->bounds_ne_lon;
//        $retLanding->bounds_sw_lat = (string) $location->bounds_sw_lat;
//        $retLanding->bounds_sw_lon = (string) $location->bounds_sw_lon;
        $retLanding->breadcrumbs = $this->_get_breadcrumbs($url, $path, $tagLabelId, $locationDesc, $tagMetaLabel, $parent_location, $langCode, $landingHelper);
        $retLanding->canonical_url = (string) $landingHelper->find_canonical_url($landing->landing_urls, $tag_meta, $url);
        $retLanding->cards = $cards['cards'];
        $retLanding->country = (string) $location->country;
        $retLanding->favourite_card_subtitle = (string) $this->_find_info_subtitle($info->favourite_card_subtitle, $tagMetaLabel, 'favourite_subtitle', $langCode);
        $retLanding->favourite_card_title = (string) $this->_find_info_title($info->favourite_card_title, $link_location_label, 'favourite_title', $langCode);
        $retLanding->help_subtitle = (string) $info->help_subtitle;
        $retLanding->help_title = (string) $info->help_title;
        $retLanding->html_text_bottom = (string) $info->html_bottom;
        $retLanding->html_text_top = (string) $info->html_top;
        $retLanding->id = (string) $landingId;
        $retLanding->item_cards = $cards['itemlist'];
        $retLanding->lat = (string) $location->lat;
        $retLanding->location_desc = (string) $locationDesc;
        $retLanding->long = (string) $location->long;
//        $retLanding->map_pointers = $this->_get_location_pointers($locationId, $tagLabelId);
//        $retLanding->map_title = (string) $this->_find_map_title($info->map_title, $langCode);
        $retLanding->meta_desc = (string) $this->_find_desc($meta_override, $attribute, $tagMetaDesc, $tagMetaLabel, $locationDesc, $parentLocationDesc, 'meta', $langCode);
        $retLanding->meta_keyword = (string) $this->_find_meta_keywords($meta_override, $attribute, $tag_meta->keywords, $tagMetaLabel, $locationDesc, $langCode);
        $retLanding->meta_title = (string) $this->_find_title($meta_override, $attribute, $tagMetaTitle, $tagMetaLabel, $locationDesc, 'meta', $langCode);
        $retLanding->nearby_locations = $this->_get_nearby_locations($landingId, $locationCategory, $tagMetaLabel, $langCode);
        $retLanding->nearby_title = (string) $this->_find_nearby_title($info, $locationCategory, $locationDesc, $langCode);
        $retLanding->page_subtitle = (string) $this->_find_page_subtitle($meta_override, $attribute, $tag_meta->lp_h2_title_new, $tagMetaLabel, $locationDesc, $parentLocationDesc, $langCode);
        $retLanding->page_title = (string) $this->_find_page_title($meta_override, $attribute, $tag_meta->lp_h1_title_new, $tagMetaLabel, $locationDesc, $langCode);
        $retLanding->parent_location_desc = (string) $parentLocationDesc;
        $retLanding->popular_card_subtitle = (string) $this->_find_info_subtitle($info->popular_card_subtitle, $tagMetaLabel, 'popular_subtitle', $langCode);
        $retLanding->popular_card_title = (string) $this->_find_info_title($info->popular_card_title, $link_location_label, 'popular_title', $langCode);
        $retLanding->recent_card_subtitle = (string) $this->_find_info_subtitle($info->recent_card_subtitle, $tagMetaLabel, 'recent_subtitle', $langCode);
        $retLanding->recent_card_title = (string) $this->_find_info_title($info->recent_card_title, $link_location_label, 'recent_title', $langCode);
        $retLanding->related_links = $this->_get_related_links($landingId, $tagLabelId, $parent_location->id, $langCode);
        $retLanding->related_title = (string) $this->_find_info_title($info->related_title, $link_location_label, 'related_title', $langCode);
        $retLanding->review_card_subtitle = (string) $this->_find_info_subtitle($info->review_card_subtitle, $tagMetaLabel, 'review_subtitle', $langCode);
        $retLanding->review_card_title = (string) $this->_find_info_title($info->review_card_title, $link_location_label, 'review_title', $langCode);
        $retLanding->schema_desc = (string) $this->_find_desc($meta_override, $attribute, $tagMetaDesc, $tagMetaLabel, $locationDesc, $parentLocationDesc, 'schema', $langCode);
        $retLanding->schema_name = (string) $this->_find_title($meta_override, $attribute, $tagMetaTitle, $tagMetaLabel, $locationDesc, 'schema', $langCode);
        $retLanding->search_url_full = (string) '/s/' . $tag_meta->slug . '/' . $location->search_url;
        $retLanding->search_url_location = (string) $location->search_url;
        $retLanding->tag_label_id = (string) $landing->tag_label_id;
        $retLanding->vertical_id = (string) $vertical->id;
        return $retLanding;
    }

    private function _find_page_title($meta_override, $attribute, $tagH1Title, $tagMetaLabel, $locationDesc, $langCode)
    {
        if (!is_null($meta_override->page_title))
        {
            $retTitle = $meta_override->page_title;
        }
        elseif ($attribute != null)
        {
            $retTitle = trans('blp.attr_h1_title', ['attribute_desc' => $attribute->desc, 'link_label' => $tagMetaLabel, 'location_desc' => $locationDesc], $langCode);
        }
        elseif (!is_null($tagH1Title))
        {
            $retTitle = __($tagH1Title, ['location_desc' => $locationDesc]);
        }
        else
        {
            $retTitle = trans('blp.h1_title', ['link_label' => $tagMetaLabel, 'location_desc' => $locationDesc], $langCode);
        }
        return $retTitle;
    }

    private function _find_page_subtitle($meta_override, $attribute, $tagH2Title, $tagMetaLabel, $locationDesc, $parentLocationDesc, $langCode)
    {
        if (!is_null($meta_override->page_subtitle))
        {
            $retSubtitle = $meta_override->page_subtitle;
        }
        elseif ($attribute != null)
        {
            $retSubtitle = trans('blp.attr_h2_title', ['attribute_desc' => $attribute->desc, 'link_label' => $tagMetaLabel, 'location_desc' => $locationDesc, 'parent_desc' => ', ' . $parentLocationDesc], $langCode);
        }
        elseif (!is_null($tagH2Title))
        {
            $retSubtitle = __($tagH2Title, ['location_desc' => $locationDesc, 'parent_desc' => ', ' . $parentLocationDesc]);
        }
        else
        {
            $retSubtitle = trans('blp.h2_title', ['link_label' => $tagMetaLabel, 'location_desc' => $locationDesc, 'parent_desc' => ', ' . $parentLocationDesc], $langCode);
        }
        return $retSubtitle;
    }

    private function _find_meta_keywords($meta_override, $attribute, $tagMetaKeywords, $tagMetaLabel, $locationDesc, $langCode)
    {
        if (!is_null($meta_override->meta_keyword))
        {
            $retMetaKeywords = $meta_override->meta_keyword;
        }
        elseif ($attribute != null)
        {
            $retMetaKeywords = trans('blp.attr_meta_keyword', ['attribute_desc' => $attribute->desc, 'link_label' => $tagMetaLabel, 'location_desc' => $locationDesc], $langCode);
        }
        elseif (count($tagMetaKeywords) > 0)
        {
            $keywordArr = [];
            foreach ($tagMetaKeywords as $keyword)
            {
                if (!$keyword->browse)
                {
                    $keywordArr[] = $keyword->keyword_new;
                }
            }
            $retMetaKeywords = __(implode(", ", $keywordArr), ['location_desc' => $locationDesc]);
        }
        else
        {
            $retMetaKeywords = trans('blp.meta_keyword', ['link_label' => $tagMetaLabel, 'location_desc' => $locationDesc], $langCode);
        }
        return $retMetaKeywords;
    }

    private function _find_desc($meta_override, $attribute, $tagMetaDesc, $tagMetaLabel, $locationDesc, $parentLocationDesc, $type, $langCode)
    {
        if ($type == 'meta' && !is_null($meta_override->meta_desc))
        {
            $retDesc = $meta_override->meta_desc;
        }
        elseif ($type == 'schema' && !is_null($meta_override->schema_desc))
        {
            $retDesc = $meta_override->schema_desc;
        }
        elseif ($attribute != null)
        {
            $retDesc = trans('blp.attr_meta_desc', ['attribute_desc' => $attribute->desc, 'link_label' => $tagMetaLabel, 'location_desc' => $locationDesc, 'parent_desc' => ', ' . $parentLocationDesc], $langCode);
        }
        elseif (!is_null($tagMetaDesc))
        {
            $retDesc = __($tagMetaDesc, ['location_desc' => $locationDesc, 'parent_desc' => ', ' . $parentLocationDesc]);
        }
        else
        {
            $retDesc = trans('blp.meta_desc', ['link_label' => $tagMetaLabel, 'location_desc' => $locationDesc, 'parent_desc' => ', ' . $parentLocationDesc], $langCode);
        }
        return $retDesc;
    }

    private function _find_title($meta_override, $attribute, $tagMetaTitle, $tagMetaLabel, $locationDesc, $type, $langCode)
    {
        if ($type == 'meta' && !is_null($meta_override->meta_title))
        {
            $retTitle = $meta_override->meta_title;
        }
        elseif ($type == 'schema' && !is_null($meta_override->schema_name))
        {
            $retTitle = $meta_override->schema_name;
        }
        elseif ($attribute != null)
        {
            $retTitle = trans('blp.attr_meta_title', ['attribute_desc' => $attribute->desc, 'link_label' => $tagMetaLabel, 'location_desc' => $locationDesc], $langCode);
        }
        elseif (!is_null($tagMetaTitle))
        {
            $retTitle = __($tagMetaTitle, ['location_desc' => $locationDesc]);
        }
        else
        {
            $retTitle = trans('blp.meta_title', ['link_label' => $tagMetaLabel, 'location_desc' => $locationDesc], $langCode);
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

    private function _find_info_title($infoTitle, $linkLocationLabel, $type, $langCode)
    {
        if (!is_null($infoTitle))
        {
            $retTitle = $infoTitle;
        }
        else
        {
            $retTitle = trans('blp.' . $type, ['link_location_label' => $linkLocationLabel], $langCode);
        }
        return $retTitle;
    }

    private function _find_info_subtitle($infoSubTitle, $tagMetaLabel, $type, $langCode)
    {
        if (!is_null($infoSubTitle))
        {
            $retSubTitle = $infoSubTitle;
        }
        else
        {
            $retSubTitle = trans('blp.' . $type, ['link_label' => $tagMetaLabel], $langCode);
        }
        return $retSubTitle;
    }

//    private function _find_map_title($infoMapTitle, $langCode)
//    {
//        if (!is_null($infoMapTitle))
//        {
//            $retMapTitle = $infoMapTitle;
//        }
//        else
//        {
//            $retMapTitle = trans('blp.map_title', [], $langCode);
//        }
//        return $retMapTitle;
//    }

    private function _get_breadcrumbs($url, $path, $tagLabelId, $locationDesc, $tagMetaLabel, $parent_location, $langCode, $landingHelper)
    {
        $home_breadcrumb = $landingHelper->create_home_breadcrumb($tagMetaLabel, $langCode);
        $browse_breadcrumb = $this->_assign_browse_breadcrumb_details($this->_get_browse_breadcrumb($tagLabelId), $tagMetaLabel, $langCode, $landingHelper);
        $parent_lp_breadcrumb = $this->_assign_parent_lp_breadcrumb_details($this->_get_parent_lp_breadcrumb($tagLabelId, $parent_location->id), $tagMetaLabel, $parent_location, $langCode, $landingHelper);
        $current_bread = $this->_create_current_breadcrumb($url, $path, $locationDesc, $tagMetaLabel, $langCode);
        $breadcrumbs = array_merge($home_breadcrumb, $browse_breadcrumb, $parent_lp_breadcrumb, $current_bread);
        return $landingHelper->get_breadcrumbs($breadcrumbs);
    }

    private function _get_browse_breadcrumb($tagLabelId)
    {
        return DB::table('blp_browse')->join('blp_browse_urls', function($join) {
                $join->on('blp_browse.id', 'blp_browse_urls.browse_id')
                    ->where('blp_browse_urls.preferred', 1);
            })->where('blp_browse.tag_label_id', $tagLabelId)
            ->select(DB::raw('blp_browse_urls.url, blp_browse_urls.locale_id'))->get()->toArray();
    }

    private function _assign_browse_breadcrumb_details($browse, $tagMetaLabel, $langCode, $landingHelper)
    {
        $browse = $landingHelper->add_fake_breadcrumb($browse);
        if (isset($browse[0]->url))
        {
            $browse[0]->full_url = $landingHelper->create_url($browse[0], true, true);
        }
        $browse[0]->id = 2;
        $browse[0]->text = $tagMetaLabel;
        $browse[0]->title = trans('blp.home_breadcrumb_title', ['link_label' => $tagMetaLabel], $langCode);
        return $browse;
    }

    private function _get_parent_lp_breadcrumb($tagLabelId, $parentLocationId)
    {
        return DB::table('blp_landing')->join('blp_landing_urls', function($join) {
                $join->on('blp_landing.id', 'blp_landing_urls.lp_id')
                    ->where('blp_landing_urls.preferred', 1);
            })->whereNotExists(function ($query) {
                $query->from('blp_landing_attributes')->whereRaw('blp_landing_attributes.lp_id = blp_landing.id');
            })->where('blp_landing.tag_label_id', $tagLabelId)
            ->where('blp_landing.location_id', $parentLocationId)
            ->select(DB::raw('blp_landing_urls.url, blp_landing_urls.locale_id'))->get()->toArray();
    }

    private function _assign_parent_lp_breadcrumb_details($parentLp, $tagMetaLabel, $parent_location, $langCode, $landingHelper)
    {
        if ($parent_location->parent_id != 0)
        {
            // don't create a fake parent landing page for a country location (ie. a browse page)
            $parentLp = $landingHelper->add_fake_breadcrumb($parentLp);
            if (isset($parentLp[0]->url))
            {
                $parentLp[0]->full_url = $landingHelper->create_url($parentLp[0], true, true);
            }
            $parentLp[0]->id = 3;
            $parentLp[0]->text = $parent_location->human_desc;
            $parentLp[0]->title = trans('blp.home_landing_breadcrumb_title', ['link_label' => $tagMetaLabel, 'location_desc' => $parent_location->human_desc], $langCode);
        }
        return $parentLp;
    }

    private function _create_current_breadcrumb($url, $path, $locationDesc, $tagMetaLabel, $langCode)
    {
        $current_page = [];
        $current_bread = new stdClass;
        $current_bread->full_url = env('SITE_URL') . '/' . $url;
        $current_bread->id = 4;
        $current_bread->text = $locationDesc;
        $current_bread->title = trans('blp.home_landing_breadcrumb_title', ['link_label' => $tagMetaLabel, 'location_desc' => $locationDesc], $langCode);
        $current_bread->url = $path;
        $current_page[] = $current_bread;
        return $current_page;
    }

    private function _get_cards($landingId, $locationId, $tagLabelId, $attribute, $langCode)
    {
        $retCardArr = [
            'cards' => [],
            'itemlist' => []
        ];
        $cards = [];
        $cardLimits = [
            BLP_LandingCardType::FAVOURITE => 8,
            BLP_LandingCardType::POPULAR => 8,
            BLP_LandingCardType::REVIEW => 9,
            BLP_LandingCardType::RECENT => 9
        ];
        $chosenCards = $this->_get_chosen_cards($landingId);
        foreach ($chosenCards as $chosenCard)
        {
            $typeId = $chosenCard->type_id;
            if ($cardLimits[$typeId] > 0)
            {
                $cards[] = $chosenCard;
                --$cardLimits[$typeId];
            }
        }
        $cards = $this->_check_repeated_card_asset($cards, $this->_find_cards_by_query($locationId, $tagLabelId, $attribute, $cardLimits, BLP_LandingCardType::FAVOURITE));
        $cards = $this->_check_repeated_card_asset($cards, $this->_find_cards_by_query($locationId, $tagLabelId, $attribute, $cardLimits, BLP_LandingCardType::POPULAR));
        $cards = $this->_check_repeated_card_asset($cards, $this->_find_cards_by_query($locationId, $tagLabelId, $attribute, $cardLimits, BLP_LandingCardType::REVIEW));
        $cards = $this->_check_repeated_card_asset($cards, $this->_find_cards_by_query($locationId, $tagLabelId, $attribute, $cardLimits, BLP_LandingCardType::RECENT));
        $assets = $this->_get_card_assets($cards);
        $roomHelper = new RoomHelper();
        foreach ($cards as $cardAsset)
        {
            $asset = $assets->where('id', $cardAsset->asset_id)->first();
            $featuredImage = $asset->images->first(function($item) {
                return $item->is_featured == 1;
            });
            $vertical = $asset->primary_vertical->first();
            $price = $roomHelper->get_shown_room_price($asset);
            $retCardArr['cards'][] = [
                'id' => (string) $cardAsset->asset_id . '_' . $cardAsset->type_id,
                'category' => (string) $vertical->name . ' · ' . $asset->venuename,
                'currency' => (string) html_entity_decode($asset->details->currency_code->symbol_left),
                'image' => (string) ((!is_null($featuredImage))?$featuredImage->getMediumUrlAttribute():''),
                'link' => (string) $asset->url,
                'max_capacity' => (string) (!is_null($asset->max_capacity)?$asset->maxCapacityString:(!is_null($asset->num_of_desks)?$asset->numOfDesksString:0)),
                'price' => ((!is_null($price))?$price:''),
                'rating' => (float) $asset->review_score,
                'reviews_count' => (int) $asset->review_count,
                'text' => (string) strip_tags($asset->details->venuedescription),
                'title' => (string) $asset->title,
                'type_id' => (string) $cardAsset->type_id,
                'vertical_id' => (string) $vertical->id
            ];
            if (array_search($cardAsset->asset_id, array_column($retCardArr['itemlist'], 'id')) === false)
            {
                $retCardArr['itemlist'][] = [
                    'id' => (string) $cardAsset->asset_id,
                    'full_link' => (string) $roomHelper->get_url($asset->details)
                ];
            }
        }
        return $retCardArr;
    }

    private function _get_chosen_cards($landingId)
    {
        return DB::table('blp_landing')->join('tag_language_labels', 'blp_landing.tag_label_id', 'tag_language_labels.id')
            ->join('blp_landing_card_chosen_assets', 'blp_landing.id', 'blp_landing_card_chosen_assets.lp_id')
            ->join('rooms', 'blp_landing_card_chosen_assets.asset_id', 'rooms.asset_id')
            ->join('asset_photos', 'rooms.asset_id', 'asset_photos.asset_id')
            ->join('venues', 'rooms.venue_id', 'venues.id')
            ->where('blp_landing.id', $landingId)
            ->whereRaw('tag_language_labels.quick_vertical_id = rooms.primary_vertical_id')
            ->where('rooms.title', '<>', '')
            ->where('rooms.hidden', 0)
            ->where('rooms.status', 1)
            ->where('rooms.approved', 1)
            ->where('venues.approved', 1)
            ->where('asset_photos.is_featured', 1)
            ->where('rooms.enabled', 1)
            ->where('venues.enabled', 1)
            ->where('asset_photos.enabled', 1)
            ->groupBy('venues.id')
            ->orderBy('blp_landing_card_chosen_assets.ordering', 'ASC')
            ->select(DB::raw('rooms.asset_id, blp_landing_card_chosen_assets.type_id'))->get()->toArray();
    }

    private function _find_cards_by_query($locationId, $tagLabelId, $attribute, $cardLimits, $typeId)
    {
        $retArr = [];
        if ($cardLimits[$typeId] > 0)
        {
            $query = $this->_get_queried_cards($locationId, $tagLabelId, $cardLimits[$typeId], $typeId);
            switch ($typeId)
            {
                case BLP_LandingCardType::FAVOURITE:

                    $this->_get_favourite_cards($query);
                break;

                case BLP_LandingCardType::POPULAR:

                    $this->_get_popular_cards($query);
                break;

                case BLP_LandingCardType::REVIEW:

                    $this->_get_review_cards($query);
                break;

                case BLP_LandingCardType::RECENT:

                    $this->_get_recent_cards($query);
                break;
            }
            $this->_get_attribute_clause($query, $attribute);
            $retArr = $query->get()->toArray();
        }
        return $retArr;
    }

    private function _get_queried_cards($locationId, $tagLabelId, $limit, $typeId)
    {
        return DB::table('venues')->join('rooms', 'venues.id', 'rooms.venue_id')
            ->join('asset_photos', 'rooms.asset_id', 'asset_photos.asset_id')
            ->join('asset_tag', 'rooms.asset_id', 'asset_tag.asset_id')
            ->join('tags', 'asset_tag.tag_id', 'tags.id')
            ->join('tag_language_labels', 'tags.id', 'tag_language_labels.tag_id')
            ->join('locations', function($join) {
                $join->on('venues.country_code', 'locations.country')
                    ->on('venues.long', '>', 'locations.bounds_sw_lon')
                    ->on('venues.long', '<', 'locations.bounds_ne_lon')
                    ->on('venues.lat', '>', 'locations.bounds_sw_lat')
                    ->on('venues.lat', '<', 'locations.bounds_ne_lat');
            })->where('locations.id', $locationId)
            ->where('tag_language_labels.id', $tagLabelId)
            ->whereRaw('tag_language_labels.quick_vertical_id = rooms.primary_vertical_id')
            ->where('rooms.title', '<>', '')
            ->where('rooms.hidden', 0)
            ->where('rooms.status', 1)
            ->where('rooms.approved', 1)
            ->where('venues.approved', 1)
            ->where('asset_photos.is_featured', 1)
            ->where('locations.in_sitemap', 1)
            ->where('rooms.enabled', 1)
            ->where('venues.enabled', 1)
            ->where('asset_photos.enabled', 1)
            ->where('asset_tag.suppressed', 0)
            ->where('asset_tag.enabled', 1)
            ->where('tags.enabled', 1)
            ->where('tag_language_labels.enabled', 1)
            ->where('locations.enabled', 1)
            ->limit($limit)
            ->groupBy('venues.id')
            ->select(DB::raw('rooms.asset_id, ' . $typeId . ' AS type_id'));
    }

    private function _get_good_review($query)
    {
        $query->where('venues.review_score', '>=', 3.5);
    }

    private function _get_none_or_good_review($query)
    {
        $query->where(function ($query) {
            $this->_get_good_review($query);
            $query->orWhere(function ($query) {
                $query->whereNull('venues.review_score');
            });
        });
    }

    private function _get_favourite_cards($query)
    {
        $this->_get_none_or_good_review($query);
        $query->orderBy('asset_tag.ranking', 'DESC');
    }

    private function _get_popular_cards($query)
    {
        $this->_get_none_or_good_review($query);
        $query->whereNotNull('rooms.page_viewed')
            ->orderBy('rooms.page_viewed', 'DESC');
    }

    private function _get_review_cards($query)
    {
        $this->_get_good_review($query);
        $query->orderBy('venues.review_score', 'DESC')
            ->orderBy('venues.review_count', 'DESC');
    }

    private function _get_recent_cards($query)
    {
        $this->_get_none_or_good_review($query);
        $query->whereNotNull('rooms.last_booked')
            ->orderBy('rooms.last_booked', 'DESC');
    }

    private function _get_attribute_clause($query, $attribute)
    {
        if ($attribute != null)
        {
            switch ($attribute->id)
            {
                case Attribute::CHEAP:

                    $query->join('opening_periods', 'rooms.asset_id', 'opening_periods.asset_id')
                        ->leftJoin('hour_rates', 'opening_periods.id', 'hour_rates.openingPeriod_id')
                        ->leftJoin('day_rates', 'rooms.asset_id', 'day_rates.asset_id')
                        ->where(function ($query) {
                            $query->where('hour_rates.enabled', 1)
                                ->orWhere(function ($query) {
                                    $query->whereNull('hour_rates.enabled');
                                });
                        })->where(function ($query) {
                            $query->where('day_rates.enabled', 1)
                                ->orWhere(function ($query) {
                                    $query->whereNull('day_rates.enabled');
                                });
                        })->where(function ($query) {
                            $query->where('hour_rates.price_per_hour', '<=', 50)
                                ->orWhere('day_rates.standard_day_rate', '<=', 300)
                                ->orWhere('day_rates.daily_delegate_rate', '<=', 300)
                                ->orWhere('day_rates.monthly_price', '<=', 6000);
                        })->where('opening_periods.enabled', 1);
                break;

                case Attribute::HOTEL:

                    $query->where('venues.venue_type_id', VenueType::HOTELS);
                break;

                case Attribute::COOL:

                    $query->join('asset_attribute', 'rooms.asset_id', 'asset_attribute.asset_id')
                        ->where('asset_attribute.attribute_id', Attribute::COOL)
                        ->where('asset_attribute.enabled', 1);
                break;
            }
        }
    }

    private function _check_repeated_card_asset($cards, $cardArr)
    {
        if (isset($cardArr))
        {
            foreach ($cardArr as $cardValues)
            {
                if (!in_array($cardValues, $cards))
                {
                    $cards[] = $cardValues;
                }
            }
        }
        return $cards;
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

    private function _get_nearby_locations($landingId, $locationCategory, $tagMetaLabel, $langCode)
    {
        $retNearbyArr = [];
        if ($locationCategory == Location::CITY)
        {
            $nearby_locations = $this->_get_nearby_as_parent($landingId);
        }
        else
        {
            $nearby_locations = $this->_get_nearby_as_child($landingId);
        }
        foreach ($nearby_locations as $nearby_location)
        {
            $retNearbyArr[] = [
                'id' => (string) $nearby_location->id,
                'link' => (string) $nearby_location->url,
                'subtitle' => (string) $nearby_location->approved_room_count . ' ' . $tagMetaLabel,
                'text' => (string) $nearby_location->human_desc,
                'title' => (string) trans('blp.nearby_location_related_title_' . $nearby_location->locationcategorie_id, ['link_label' => $tagMetaLabel, 'location_desc' => $nearby_location->human_desc], $langCode)
            ];
        }
        return $retNearbyArr;
    }

    private function _get_nearby_as_parent($landingId)
    {
        return DB::table('blp_landing')->join('tag_language_labels', 'blp_landing.tag_label_id', 'tag_language_labels.id')
            ->join('locations', 'blp_landing.location_id', 'locations.parent_id')
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
            })->where('blp_landing.id', $landingId)
            ->where('location_rooms.approved_room_count', '>', 0)
            ->whereIn('locations.locationcategorie_id', [Location::DISTRICT, Location::LANDMARK, Location::AIRPORT])
            ->where('locations.in_sitemap', 1)
            ->where('locations.enabled', 1)
            ->where('tag_language_labels.enabled', 1)
            ->limit(50)
            ->orderBy('location_rooms.approved_room_count', 'DESC')
            ->orderBy('locations.human_desc', 'ASC')
            ->orderBy('blp_landing_urls.url', 'ASC')
            ->select(DB::raw('nearby_lp.id, blp_landing_urls.url, locations.human_desc, locations.locationcategorie_id, location_rooms.approved_room_count'))->get();
    }

    private function _get_nearby_as_child($landingId)
    {
        return DB::table('blp_landing')->join('tag_language_labels', 'blp_landing.tag_label_id', 'tag_language_labels.id')
            ->join('locations', 'blp_landing.location_id', 'locations.id')
            ->join('locations AS child_location', 'locations.parent_id', 'child_location.parent_id')
            ->join('blp_landing AS nearby_lp', function($join) {
                $join->on('child_location.id', 'nearby_lp.location_id')
                    ->on('tag_language_labels.id', 'nearby_lp.tag_label_id')
                    ->whereNotExists(function ($query) {
                        $query->from('blp_landing_attributes')->whereRaw('blp_landing_attributes.lp_id = nearby_lp.id');
                    });
            })->join('blp_landing_urls', function($join) {
                $join->on('nearby_lp.id', 'blp_landing_urls.lp_id')
                    ->where('blp_landing_urls.preferred', 1);
            })->join('location_rooms', function($join) {
                $join->on('child_location.id', 'location_rooms.location_id')
                    ->on('tag_language_labels.tag_id', 'location_rooms.tag_id');
            })->where('blp_landing.id', $landingId)
            ->where('location_rooms.approved_room_count', '>', 0)
            ->whereIn('child_location.locationcategorie_id', [Location::DISTRICT, Location::LANDMARK, Location::AIRPORT])
            ->where('child_location.in_sitemap', 1)
            ->where('child_location.enabled', 1)
            ->where('locations.in_sitemap', 1)
            ->where('locations.enabled', 1)
            ->where('tag_language_labels.enabled', 1)
            ->whereRaw('child_location.id <> blp_landing.location_id')
            ->limit(50)
            ->orderBy('location_rooms.approved_room_count', 'DESC')
            ->orderBy('locations.human_desc', 'ASC')
            ->orderBy('blp_landing_urls.url', 'ASC')
            ->select(DB::raw('nearby_lp.id, blp_landing_urls.url, child_location.human_desc, child_location.locationcategorie_id, location_rooms.approved_room_count'))->get();
    }

//    private function _get_location_pointers($locationId, $tagLabelId)
//    {
//        $retPointerArr = [];
//        $pointers = $this->_get_pointers($locationId, $tagLabelId);
//        foreach ($pointers as $pointer)
//        {
//            $retPointerArr[] = [
//                'id' => (string) $pointer->id,
//                'lat' => (string) $pointer->lat,
//                'long' => (string) $pointer->long
//            ];
//        }
//        return $retPointerArr;
//    }

//    private function _get_pointers($locationId, $tagLabelId)
//    {
//        return DB::table('venues')->join('rooms', 'venues.id', 'rooms.venue_id')
//            ->join('asset_tag', 'rooms.asset_id', 'asset_tag.asset_id')
//            ->join('tags', 'asset_tag.tag_id', 'tags.id')
//            ->join('tag_language_labels', 'tags.id', 'tag_language_labels.tag_id')
//            ->join('locations', function($join) {
//                $join->on('venues.country_code', 'locations.country')
//                    ->on('venues.long', '>', 'locations.bounds_sw_lon')
//                    ->on('venues.long', '<', 'locations.bounds_ne_lon')
//                    ->on('venues.lat', '>', 'locations.bounds_sw_lat')
//                    ->on('venues.lat', '<', 'locations.bounds_ne_lat');
//            })->where('locations.id', $locationId)
//            ->where('tag_language_labels.id', $tagLabelId)
//            ->whereRaw('tag_language_labels.quick_vertical_id = rooms.primary_vertical_id')
//            ->where('rooms.title', '<>', '')
//            ->where('rooms.hidden', 0)
//            ->where('rooms.status', 1)
//            ->where('rooms.approved', 1)
//            ->where('venues.approved', 1)
//            ->where('locations.in_sitemap', 1)
//            ->where('rooms.enabled', 1)
//            ->where('venues.enabled', 1)
//            ->where('asset_tag.enabled', 1)
//            ->where('tags.enabled', 1)
//            ->where('tag_language_labels.enabled', 1)
//            ->where('locations.enabled', 1)
//            ->select(DB::raw('DISTINCT venues.id, venues.lat, venues.long'))->get();
//    }

    private function _get_related_links($landingId, $tagLabelId, $parentLocationId, $langCode)
    {
        $retRelatedArr = [];
        $relatedLinks = [];
        $relatedLinks = $this->_check_repeated_related_links($relatedLinks, $this->_get_attribute_landings($landingId));
        $relatedLinks = $this->_check_repeated_related_links($relatedLinks, $this->_get_similar_tag_labels($landingId));
        $relatedLinks = $this->_check_repeated_related_links($relatedLinks, $this->_get_similar_landings($landingId));
        $relatedLinks = $this->_check_repeated_related_links($relatedLinks, $this->_get_main_link($tagLabelId, $parentLocationId));
        foreach ($relatedLinks as $relatedLink)
        {
            $locationDesc = trim($relatedLink->human_desc);
            if (isset($relatedLink->attribute_id))
            {
                $link = trans('blp.related_attribute_link', ['link_location_label' => __($relatedLink->lp_link_label_new, ['location_desc' => $locationDesc]), 'attribute_desc' => $relatedLink->desc], $langCode);
                $title = trans('blp.related_attribute_title_' . $relatedLink->locationcategorie_id, ['link_label' => $relatedLink->browse_link_label, 'attribute_desc' => $relatedLink->desc, 'location_desc' => $locationDesc], $langCode);
            }
            else
            {
                $link = __($relatedLink->lp_link_label_new, ['location_desc' => $locationDesc]);
                $title = trans('blp.nearby_location_related_title_' . $relatedLink->locationcategorie_id, ['link_label' => $relatedLink->browse_link_label, 'location_desc' => $locationDesc], $langCode);
            }
            $retRelatedArr[] = [
                'id' => (string) $relatedLink->id,
                'link' => (string) $relatedLink->url,
                'text' => (string) $link,
                'title' => (string) $title
            ];
        }
        return $retRelatedArr;
    }

    private function _get_attribute_landings($landingId)
    {
        return DB::table('blp_landing')->join('blp_landing AS linked_lp', function($join) {
            $join->on('blp_landing.location_id', 'linked_lp.location_id')
                ->whereRaw('blp_landing.id <> linked_lp.id');
            })->join('blp_landing_urls', function($join) {
                $join->on('linked_lp.id', 'blp_landing_urls.lp_id')
                    ->where('blp_landing_urls.preferred', 1);
            })->join('blp_landing_attributes', 'linked_lp.id', 'blp_landing_attributes.lp_id')
            ->join('locations', 'linked_lp.location_id', 'locations.id')
            ->join('tag_language_labels', 'linked_lp.tag_label_id', 'tag_language_labels.id')
            ->join('tag_language_label_meta', 'tag_language_labels.id', 'tag_language_label_meta.tag_language_label_id')
            ->join('attribute_types', 'blp_landing_attributes.attribute_id', 'attribute_types.id')
            ->join('attribute_language', function($join) {
                $join->on('attribute_types.id', 'attribute_language.attribute_id')
                    ->on('tag_language_labels.language_code', 'attribute_language.lang_code');
            })->where('blp_landing.id', $landingId)
            ->where('tag_language_labels.preferred', 1)
            ->where('tag_language_label_meta.preferred', 1)
            ->where('locations.enabled', 1)
            ->where('tag_language_labels.enabled', 1)
            ->where('tag_language_label_meta.enabled', 1)
            ->where('attribute_types.enabled', 1)
            ->where('attribute_language.enabled', 1)
            ->orderBy('blp_landing_urls.url', 'ASC')
            ->select(DB::raw('linked_lp.id, blp_landing_urls.url, blp_landing_attributes.attribute_id, locations.human_desc, locations.locationcategorie_id, tag_language_label_meta.browse_link_label, tag_language_label_meta.lp_link_label_new, attribute_language.desc'))->get();
    }

    private function _get_similar_tag_labels($landingId)
    {
        return DB::table('blp_landing')->join('landing_page_similar_tag_labels', 'blp_landing.tag_label_id', 'landing_page_similar_tag_labels.tag_language_label_id')
            ->join('blp_landing AS linked_lp', function($join) {
                $join->on('landing_page_similar_tag_labels.linked_tag_language_label_id', 'linked_lp.tag_label_id')
                    ->on('blp_landing.location_id', 'linked_lp.location_id')
                    ->whereRaw('blp_landing.id <> linked_lp.id')
                    ->whereNotExists(function ($query) {
                        $query->from('blp_landing_attributes')->whereRaw('blp_landing_attributes.lp_id = linked_lp.id');
                    });
            })->join('blp_landing_urls', function($join) {
                $join->on('linked_lp.id', 'blp_landing_urls.lp_id')
                    ->where('blp_landing_urls.preferred', 1);
            })->join('locations', 'linked_lp.location_id', 'locations.id')
            ->join('tag_language_labels', 'linked_lp.tag_label_id', 'tag_language_labels.id')
            ->join('tag_language_label_meta', 'tag_language_labels.id', 'tag_language_label_meta.tag_language_label_id')
            ->where('blp_landing.id', $landingId)
            ->where('tag_language_labels.preferred', 1)
            ->where('tag_language_label_meta.preferred', 1)
            ->where('locations.enabled', 1)
            ->where('tag_language_labels.enabled', 1)
            ->where('tag_language_label_meta.enabled', 1)
            ->orderBy('landing_page_similar_tag_labels.search_volume', 'DESC')
            ->orderBy('blp_landing_urls.url', 'ASC')
            ->select(DB::raw('linked_lp.id, blp_landing_urls.url, locations.human_desc, locations.locationcategorie_id, tag_language_label_meta.browse_link_label, tag_language_label_meta.lp_link_label_new'))->get();
    }

    private function _get_similar_landings($landingId)
    {
        return DB::table('blp_landing')->join('blp_landing_linked', 'blp_landing.id', 'blp_landing_linked.lp_id')
            ->join('blp_landing AS linked_lp', function($join) {
                $join->on('blp_landing_linked.linked_lp_id', 'linked_lp.id')
                ->whereRaw('blp_landing.id <> linked_lp.id');
            })->join('blp_landing_urls', function($join) {
                $join->on('linked_lp.id', 'blp_landing_urls.lp_id')
                    ->where('blp_landing_urls.preferred', 1);
            })->leftJoin('blp_landing_attributes', 'linked_lp.id', 'blp_landing_attributes.lp_id')
            ->join('locations', 'linked_lp.location_id', 'locations.id')
            ->join('tag_language_labels', 'linked_lp.tag_label_id', 'tag_language_labels.id')
            ->join('tag_language_label_meta', 'tag_language_labels.id', 'tag_language_label_meta.tag_language_label_id')
            ->leftJoin('attribute_types', 'blp_landing_attributes.attribute_id', 'attribute_types.id')
            ->leftJoin('attribute_language', function($join) {
                $join->on('attribute_types.id', 'attribute_language.attribute_id')
                    ->on('tag_language_labels.language_code', 'attribute_language.lang_code');
            })->where('blp_landing.id', $landingId)
            ->where('tag_language_labels.preferred', 1)
            ->where('tag_language_label_meta.preferred', 1)
            ->where('locations.enabled', 1)
            ->where('tag_language_labels.enabled', 1)
            ->where('tag_language_label_meta.enabled', 1)
            ->where(function ($query) {
                $query->where('attribute_types.enabled', '=', 1)
                ->orWhere(function ($query) {
                    $query->whereNull('attribute_types.enabled');
                });
            })->where(function ($query) {
                $query->where('attribute_language.enabled', '=', 1)
                ->orWhere(function ($query) {
                    $query->whereNull('attribute_language.enabled');
                });
            })->orderBy('blp_landing_urls.url', 'ASC')
            ->select(DB::raw('linked_lp.id, blp_landing_urls.url, blp_landing_attributes.attribute_id, locations.human_desc, locations.locationcategorie_id, tag_language_label_meta.browse_link_label, tag_language_label_meta.lp_link_label_new, attribute_language.desc'))->get();
    }

    private function _get_main_link($tagLabelId, $parentLocationId)
    {
        return DB::table('blp_landing')->join('blp_landing_urls', function($join) {
                $join->on('blp_landing.id', 'blp_landing_urls.lp_id')
                    ->where('blp_landing_urls.preferred', 1);
            })->whereNotExists(function ($query) {
                $query->from('blp_landing_attributes')->whereRaw('blp_landing_attributes.lp_id = blp_landing.id');
            })->join('locations', 'blp_landing.location_id', 'locations.id')
            ->join('tag_language_labels', 'blp_landing.tag_label_id', 'tag_language_labels.id')
            ->join('tag_language_label_meta', 'tag_language_labels.id', 'tag_language_label_meta.tag_language_label_id')
            ->where('blp_landing.tag_label_id', $tagLabelId)
            ->where('blp_landing.location_id', $parentLocationId)
            ->where('tag_language_labels.preferred', 1)
            ->where('tag_language_label_meta.preferred', 1)
            ->where('locations.enabled', 1)
            ->where('tag_language_labels.enabled', 1)
            ->where('tag_language_label_meta.enabled', 1)
            ->orderBy('blp_landing_urls.url', 'ASC')
            ->select(DB::raw('blp_landing.id, blp_landing_urls.url, locations.human_desc, locations.locationcategorie_id, tag_language_label_meta.browse_link_label, tag_language_label_meta.lp_link_label_new'))->get();
    }

    private function _check_repeated_related_links($relatedLinks, $linkedArr)
    {
        foreach ($linkedArr as $linkedValues)
        {
            if (array_search($linkedValues->id, array_column($relatedLinks, 'id')) === false)
            {
                $relatedLinks[] = $linkedValues;
            }
        }
        return $relatedLinks;
    }
}