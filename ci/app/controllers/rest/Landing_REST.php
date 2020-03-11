<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');
require_once APPPATH . 'libraries/REST_Controller.php';

class Landing_REST extends REST_Controller
{
    function __construct()
    {
        parent::__construct();
    }

    public function vertical_get()
    {
        if (!$this->dx_auth->is_admin())
        {
            return $this->response($this->lang->line('rest_wrong_perm'), 403);
        }
        $get = $this->get();
        if (!isset($get['id']))
        {
            return $this->response(null, 400);
        }
        $modelLandingPageLang = Model__landing_page_language::class;
        $this->load->model($modelLandingPageLang);
        $landing_pages = $this->$modelLandingPageLang->get_all_landing_pages_by_lang($this->session->userdata('user_lang'), $get['id']);
        if (!$landing_pages->exists_in_db())
        {
            return $this->response('No landing pages', 405);
        }
        return $this->response($landing_pages->get_as_ajax_response(), 200);
    }

    public function adminlanding_get()
    {
        $get = $this->get();
        if (!isset($get['tag_label_id']))
        {
            return $this->response(null, 400);
        }
        $modelLandingPages = Model__landing_pages::class;
        $this->load->model($modelLandingPages);
        $landing_pages = $this->$modelLandingPages->get_landing_pages_by_tag_label_id($this->session->userdata('user_lang'), $get['tag_label_id']);
        if (!$landing_pages->exists_in_db())
        {
            return $this->response('No landing pages', 405);
        }
        return $this->response($landing_pages->get_as_ajax_response(), 200);
    }

    public function index_put()
    {
        if (!$this->dx_auth->is_admin())
        {
            return $this->response($this->lang->line('rest_wrong_perm'), 403);
        }
        $put = $this->put();
        if (!isset($put['id']))
        {
            return $this->response(null, 400);
        }
        $modelLandingPageLang = Model__landing_page_language::class;
        $this->load->model($modelLandingPageLang);
        $landing_page_lang = $this->$modelLandingPageLang->get_landing_page_lang_by_id($put['id']);
        if (!$landing_page_lang->exists_in_db())
        {
            return $this->response('No landing page', 405);
        }
        $dataToChange = false;
        $fieldArr = [
            'desc_text',
            'desc_text_top',
            'h1',
            'h2',
            'meta_title',
            'carousel_title',
            'meta_desc',
            'meta_keyword'
        ];
        foreach ($fieldArr as $field)
        {
            if (isset($put[$field]))
            {
                $landing_page_lang->set($field, $put[$field]);
                $dataToChange = true;
            }
        }
        if ($dataToChange)
        {
            $this->$modelLandingPageLang->insert_update($landing_page_lang);
        }
        return $this->response($landing_page_lang->get_as_ajax_response(), 200);
    }

    public function carousel_post()
    {
        if (!$this->dx_auth->is_admin())
        {
            return $this->response($this->lang->line('rest_wrong_perm'), 403);
        }
        $post = $this->post();
        if (isset($post['id']) || !isset($post['landing_page_id']) || !isset($post['reference_id']) || !isset($post['carousel_attribute_id']))
        {
            return $this->response(null, 400);
        }
        $modelLandingPages = Model__landing_pages::class;
        $this->load->model($modelLandingPages);
        $landing_page = $this->$modelLandingPages->get_landing_page_object_by_id($post['landing_page_id']);
        if (!$landing_page->exists_in_db())
        {
            return $this->response('That landing page doesn\'t exist', 405);
        }
        $modelAssets = Model__assets::class;
        $this->load->model($modelAssets);
        $asset = $this->$modelAssets->get_asset_object_by_reference_id_and_type($post['reference_id'], Asset_Type::ROOM);
        if (!$asset->exists_in_db())
        {
            return $this->response('That asset doesn\'t exist', 405);
        }
        $modelRooms = Model__simple_rooms::class;
        $this->load->model($modelRooms);
        $room = $this->$modelRooms->get_room_object_by_asset_id($asset->get_id(), true, false);
        if (!$room->exists_in_db())
        {
            return $this->response($this->lang->line('rest_no_room'), 405);
        }
        $modelAttributes = Model__attribute_types::class;
        $this->load->model($modelAttributes);
        $carousel_attribute = $this->$modelAttributes->get_attribute_object_by_id($post['carousel_attribute_id']);
        if (!$carousel_attribute->exists_in_db())
        {
            return $this->response('That attribute doesn\'t exist', 405);
        }
        $modelLandingCarouselAssets = Model__landing_page_carousel_assets::class;
        $this->load->model($modelLandingCarouselAssets);
        $existing_carousel_assets = $this->$modelLandingCarouselAssets->get_existing_landing_carousel_asset_by_ids($landing_page->get_id(), $carousel_attribute->get_id(), $asset->get_id());
        if ($existing_carousel_assets->exists_in_db())
        {
            return $this->response('That room is already in the chosen carousel for the landing page', 405);
        }
        $existing_carousel_venues = $this->$modelLandingCarouselAssets->get_existing_landing_carousel_asset_by_venue($landing_page->get_id(), $carousel_attribute->get_id(), $room->get('venue_id'));
        if ($existing_carousel_venues->exists_in_db())
        {
            return $this->response('That venue already has one room in the chosen carousel for the landing page', 405);
        }
        $LandingCarouselAsset = new Runt_Landing_Page_Carousel_Asset();
        $LandingCarouselAsset->set('landing_page_id', $landing_page->get_id());
        $LandingCarouselAsset->set('carousel_attribute_id', $carousel_attribute->get_id());
        $LandingCarouselAsset->set('asset_id', $room->get_asset_id());
        $newLandingCarouselAsset = $this->$modelLandingCarouselAssets->insert_update($LandingCarouselAsset);
        return $this->response($newLandingCarouselAsset->get_id(), 201);
    }

    public function carousel_put()
    {
        if (!$this->dx_auth->is_admin())
        {
            return $this->response($this->lang->line('rest_wrong_perm'), 403);
        }
        $put = $this->put();
        if (!isset($put['id']) || !isset($put['landing_page_id']) || !isset($put['reference_id']) || !isset($put['carousel_attribute_id']))
        {
            return $this->response(null, 400);
        }
        $modelLandingPages = Model__landing_pages::class;
        $this->load->model($modelLandingPages);
        $landing_page = $this->$modelLandingPages->get_landing_page_object_by_id($put['landing_page_id']);
        if (!$landing_page->exists_in_db())
        {
            return $this->response('That landing page doesn\'t exist', 405);
        }
        $modelAssets = Model__assets::class;
        $this->load->model($modelAssets);
        $asset = $this->$modelAssets->get_asset_object_by_reference_id_and_type($put['reference_id'], Asset_Type::ROOM);
        if (!$asset->exists_in_db())
        {
            return $this->response('That asset doesn\'t exist', 405);
        }
        $modelRooms = Model__simple_rooms::class;
        $this->load->model($modelRooms);
        $room = $this->$modelRooms->get_room_object_by_asset_id($asset->get_id(), true, false);
        if (!$room->exists_in_db())
        {
            return $this->response($this->lang->line('rest_no_room'), 405);
        }
        $modelAttributes = Model__attribute_types::class;
        $this->load->model($modelAttributes);
        $carousel_attribute = $this->$modelAttributes->get_attribute_object_by_id($put['carousel_attribute_id']);
        if (!$carousel_attribute->exists_in_db())
        {
            return $this->response('That attribute doesn\'t exist', 405);
        }
        $modelLandingCarouselAssets = Model__landing_page_carousel_assets::class;
        $this->load->model($modelLandingCarouselAssets);
        $existing_carousel_assets = $this->$modelLandingCarouselAssets->get_existing_landing_carousel_asset_by_ids($landing_page->get_id(), $carousel_attribute->get_id(), $asset->get_id());
        if ($existing_carousel_assets->exists_in_db())
        {
            return $this->response('That room is already in the chosen carousel for the landing page', 405);
        }
        $existing_carousel_venues = $this->$modelLandingCarouselAssets->get_existing_landing_carousel_asset_by_venue($landing_page->get_id(), $carousel_attribute->get_id(), $room->get('venue_id'), $put['id']);
        if ($existing_carousel_venues->exists_in_db())
        {
            return $this->response('That venue already has one room in the chosen carousel for the landing page', 405);
        }
        $changed_carousel_asset = $this->$modelLandingCarouselAssets->get_existing_landing_carousel_asset_by_id($put['id']);
        if ($changed_carousel_asset->exists_in_db())
        {
            $changed_carousel_asset->set('carousel_attribute_id', $carousel_attribute->get_id());
            $changed_carousel_asset->set('asset_id', $room->get_asset_id());
            $this->$modelLandingCarouselAssets->insert_update($changed_carousel_asset);
        }
        return $this->response([], 200);
    }

    public function carousel_delete()
    {
        if (!$this->dx_auth->is_admin())
        {
            return $this->response($this->lang->line('rest_wrong_perm'), 403);
        }
        $delete = $this->delete();
        if (!isset($delete['id']))
        {
            return $this->response(null, 400);
        }
        $modelLandingCarouselAssets = Model__landing_page_carousel_assets::class;
        $this->load->model($modelLandingCarouselAssets);
        $carousel_asset = $this->$modelLandingCarouselAssets->get_existing_landing_carousel_asset_by_id($delete['id']);
        if ($carousel_asset->exists_in_db())
        {
            $this->$modelLandingCarouselAssets->delete($carousel_asset);
        }
        return $this->response([], 200);
    }

    public function similar_post()
    {
        if (!$this->dx_auth->is_admin())
        {
            return $this->response($this->lang->line('rest_wrong_perm'), 403);
        }
        $post = $this->post();
        if (isset($post['id']) || !isset($post['landing_page_id']) || !isset($post['linked_landing_page_id']))
        {
            return $this->response(null, 400);
        }
        if ($post['landing_page_id'] == $post['linked_landing_page_id'])
        {
            return $this->response('Cannot link related search to itself', 405);
        }
        $modelLandingPages = Model__landing_pages::class;
        $this->load->model($modelLandingPages);
        $landing_page = $this->$modelLandingPages->get_landing_page_object_by_id($post['landing_page_id']);
        if (!$landing_page->exists_in_db())
        {
            return $this->response('That landing page doesn\'t exist', 405);
        }
        $linked_landing_page = $this->$modelLandingPages->get_landing_page_object_by_id($post['linked_landing_page_id']);
        if (!$linked_landing_page->exists_in_db())
        {
            return $this->response('That opposite related landing page doesn\'t exist', 405);
        }
        $modelSimilarLinks = Model__landing_page_similar_links::class;
        $this->load->model($modelSimilarLinks);
        $similar_loc = $this->$modelSimilarLinks->get_landing_page_similar_link_object_by_ids($landing_page->get_id(), $linked_landing_page->get_id());
        if ($similar_loc->exists_in_db())
        {
            return $this->response('That related search link already exists', 405);
        }
        if (isset($post['reciprocal']) && $post['reciprocal'])
        {
            $reciprocal_similar_loc = $this->$modelSimilarLinks->get_landing_page_similar_link_object_by_ids($linked_landing_page->get_id(), $landing_page->get_id());
            if ($reciprocal_similar_loc->exists_in_db())
            {
                return $this->response('The opposite related search link already exists', 405);
            }
        }
        $similarLandingPage = new Runt_Landing_Page_Similar_Link();
        $similarLandingPage->set('landing_page_id', $landing_page->get_id());
        $similarLandingPage->set('linked_landing_page_id', $linked_landing_page->get_id());
        $this->$modelSimilarLinks->insert_update($similarLandingPage);
        if (isset($post['reciprocal']) && $post['reciprocal'])
        {
            $reciprocalLandingPage = new Runt_Landing_Page_Similar_Link();
            $reciprocalLandingPage->set('landing_page_id', $linked_landing_page->get_id());
            $reciprocalLandingPage->set('linked_landing_page_id', $landing_page->get_id());
            $this->$modelSimilarLinks->insert_update($reciprocalLandingPage);
        }
        $returnSimLoc = $this->$modelSimilarLinks->get_extended_landing_page_similar_link_by_id($similarLandingPage->get_id(), $this->session->userdata('user_lang'));
        return $this->response($returnSimLoc->get_as_ajax_response(), 201);
    }

    public function similar_delete()
    {
        if (!$this->dx_auth->is_admin())
        {
            return $this->response($this->lang->line('rest_wrong_perm'), 403);
        }
        $delete = $this->delete();
        if (!isset($delete['id']))
        {
            return $this->response(null, 400);
        }
        $modelSimilarLinks = Model__landing_page_similar_links::class;
        $this->load->model($modelSimilarLinks);
        $similar_loc = $this->$modelSimilarLinks->get_landing_page_similar_link_by_id($delete['id']);
        if ($similar_loc->exists_in_db())
        {
            $this->$modelSimilarLinks->delete($similar_loc);
        }
        return $this->response([], 200);
    }

    public function nearby_get()
    {
        $get = $this->get();
        if (!isset($get['country']) || !isset(config_item('supported_cctlds')[$get['country']]))
        {
            return $this->response(null, 400);
        }
        $country_code = config_item('supported_cctlds')[$get['country']]['locale'];
        $language = config_item('supported_cctlds')[$get['country']]['lang'];
        $this->lang->load('home', $language);
        $modelTags = Model__tags::class;
        $this->load->model($modelTags);
        $default_tags_coll = $this->$modelTags->get_home_sub_tags_by_lang($language);
        if (!$default_tags_coll->exists_in_db())
        {
            return $this->response('No tag data', 405);
        }
        $nearbyArr = [];
        $modelLandingPageLang = Model__landing_page_language::class;
        $this->load->model($modelLandingPageLang);
        $nearby_locations = $this->$modelLandingPageLang->get_home_nearby_locations($language, $country_code);
        if ($nearby_locations->exists_in_db())
        {
            foreach ($nearby_locations->object() as $nearby_location)
            {
                $nearbyArr[$nearby_location->get('landing_page_tag_id')][] = [
                    'url' => base_url() . $get['country'] . '/' . (($nearby_location->is_true('landing_page_search_redirect'))?'s/' . $nearby_location->get('landing_page_tag_slug') . '/' . $nearby_location->get('landing_page_location_search_url'):$nearby_location->get('landing_page_tag_slug') . '/' . $nearby_location->get('landing_page_location_url')),
                    'title' => $this->lang->line('home_nearby_locations_location_title_' . $nearby_location->get('landing_page_location_category'), $nearby_location->get('landing_page_tag_link_label'), (($nearby_location->is_true('landing_page_location_requires_determiner'))?$this->lang->line('common_determiner') . ' ':'') . trim($nearby_location->get('landing_page_location_desc'))),
                    'link' => trim($nearby_location->get('landing_page_location_desc')),
                    'subtext' => ((!$nearby_location->is_null('room_count') && $nearby_location->data_not_empty('room_count'))?$nearby_location->get('room_count') . ' ' . $nearby_location->get('landing_page_tag_link_label'):'')
                ];
            }
        }
        $retArr = [];
        $modelLocations = Model__locations::class;
        $this->load->model($modelLocations);
        $location = $this->$modelLocations->get_country_location_object($country_code);
        if ($location->exists_in_db())
        {
            $retArr['title'] = $this->lang->line('home_nearby_locations_' . $location->get('category_type'), (($location->is_true('requires_determiner'))?$this->lang->line('common_determiner') . ' ':'') . trim($location->get('human_desc')));
        }
        foreach ($default_tags_coll->object() as $default_tags)
        {
            foreach ($default_tags->object() as $default_tag)
            {
                if (isset($nearbyArr[$default_tag->get('tag_id')]))
                {
                    $retArr['data'][$default_tag->get('home_label')] = $nearbyArr[$default_tag->get('tag_id')];
                }
            }
        }
        return $this->response($retArr, 200);
    }

    public function landingpages_get()
    {
        $get = $this->get();
        $max_results = 9;
        if ((!isset($get['id']) && !isset($get['location_id'])) || (isset($get['id']) && isset($get['location_id'])))
        {
            return $this->response(null, 204);
        }
        if (isset($get['id']))
        {
            $modelLandingPages = Model__landing_pages::class;
            $this->load->model($modelLandingPages);
            $landing_page = $this->$modelLandingPages->get_landing_page_object_by_id($get['id']);
            if (!$landing_page->exists_in_db())
            {
                return $this->response(null, 204);
            }
            else
            {
                $attribute_id = $landing_page->get('attribute_id');
                $location_id = $landing_page->get('location_id');
                $tag_id = $landing_page->get('tag_id');
            }
        }
        elseif (isset($get['location_id']))
        {
            $attribute_id = null;
            $location_id = $get['location_id'];
            $tag_id = Tag::MEETING;
        }
        $modelLocations = Model__locations::class;
        $this->load->model($modelLocations);
        $location = $this->$modelLocations->get_base_object_by_id($location_id);
        if (!$location->exists_in_db())
        {
            return $this->response(null, 204);
        }
        $rooms['favourite'] = [];
        $rooms['top'] = [];
        $rooms['review'] = [];
        $rooms['recent'] = [];
        $rooms['popular'] = [];
        $rooms['pointers'] = [];
        $rooms['bounds'] = [];
        $limit = ((isset($get['limit']))?intval($get['limit']):$max_results);
        if ($limit <= 0 || $limit > $max_results)
        {
            return $this->response($this->lang->line('rest_wrong_limit'), 400);
        }
        $modelRooms = Model__simple_rooms::class;
        $this->load->model($modelRooms);
        if (isset($get['id']))
        {
            $count = [];
            $carousel_rooms = $this->$modelRooms->get_chosen_landing_page_rooms($landing_page->get_id());
            foreach ($carousel_rooms->object() as $carousel)
            {
                if (!isset($count[strtolower($carousel->get('carousel_title'))]))
                {
                    $count[strtolower($carousel->get('carousel_title'))] = 1;
                }
                if ($count[strtolower($carousel->get('carousel_title'))] < ($limit + 1))
                {
                    $rooms[strtolower($carousel->get('carousel_title'))][] = $this->_get_room_fields($carousel);
                }
                ++$count[strtolower($carousel->get('carousel_title'))];
            }
            if (count($rooms['favourite']) < $limit)
            {
                $chosen_favs = [];
                foreach ($rooms['favourite'] as $chosen_fav)
                {
                    $chosen_favs['rooms'][] = $chosen_fav['id'];
                    $chosen_favs['venues'][] = $chosen_fav['venue_id'];
                }
                $fav_venues = [];
                $fav_dynamic_rooms = [];
                $fav_rooms = $this->$modelRooms->get_landing_page_rooms('favourite', $this->session->userdata('user_lang'), $tag_id, $location, $attribute_id, $chosen_favs);
                foreach ($fav_rooms->object() as $fav)
                {
                    if (count($fav_venues) < ($limit - count($rooms['favourite'])) && !isset($fav_venues[$fav->get('venue_id')]))
                    {
                        $fav_venues[$fav->get('venue_id')] = 1;
                        $fav_dynamic_rooms[] = $this->_get_room_fields($fav);
                    }
                }
                $rooms['favourite'] = array_merge($rooms['favourite'], $fav_dynamic_rooms);
            }
        }
        $top_venues = [];
        $top_rooms = $this->$modelRooms->get_landing_page_rooms('top', $this->session->userdata('user_lang'), $tag_id, $location, $attribute_id);
        foreach ($top_rooms->object() as $top)
        {
            if (count($top_venues) < $limit && !isset($top_venues[$top->get('venue_id')]))
            {
                $top_venues[$top->get('venue_id')] = 1;
                $rooms['top'][] = $this->_get_room_fields($top);
            }
        }
        $review_venues = [];
        $review_rooms = $this->$modelRooms->get_landing_page_rooms('review', $this->session->userdata('user_lang'), $tag_id, $location, $attribute_id);
        foreach ($review_rooms->object() as $review)
        {
            if (count($review_venues) < $limit && !isset($review_venues[$review->get('venue_id')]))
            {
                $review_venues[$review->get('venue_id')] = 1;
                $rooms['review'][] = $this->_get_room_fields($review);
            }
        }
        $recent_venues = [];
        $recent_rooms = $this->$modelRooms->get_landing_page_rooms('recent', $this->session->userdata('user_lang'), $tag_id, $location, $attribute_id);
        foreach ($recent_rooms->object() as $recent)
        {
            if (count($recent_venues) < $limit && !isset($recent_venues[$recent->get('venue_id')]))
            {
                $recent_venues[$recent->get('venue_id')] = 1;
                $rooms['recent'][] = $this->_get_room_fields($recent);
            }
        }
        $this->lang->load('home', $this->session->userdata('user_lang'));
        $modelPopularLocations = Model__popular_locations::class;
        $this->load->model($modelPopularLocations);
        $popLocation = $this->$modelPopularLocations->get_popular_location_collection($this->session->userdata('user_lang'), $tag_id, $location->get_id());
        foreach ($popLocation->object() as $popLoc)
        {
            $ret = [];
            $ret['id'] = $popLoc->get_id();
            $ret['locality'] = $popLoc->get('location_desc');
            $ret['desc_text'] = $popLoc->get('desc_text');
            $ret['city_short_desc'] = $this->lang->line('home_landing_room_title_' . $popLoc->get('location_category'), $popLoc->get('tag_link_label'), $popLoc->get('location_desc'));
            $ret['city_url'] = '/' . $this->session->userdata('user_country_lang_url') . '/s/' . $popLoc->get('tag_slug') . '/' . $popLoc->get('location_url') . '/';
            $ret['image'] = $popLoc->get('img');
            $ret['collective_title'] = $popLoc->get('tag_link_label');
            $rooms['popular'][] = $ret;
        }
        if ($location->get('parent_id') != 0)
        {
            $modelVenues = Model__venues::class;
            $this->load->model($modelVenues);
            $venues = $this->$modelVenues->get_venue_locations($tag_id, $location->get('country'), $location->get('bounds_sw_lon'), $location->get('bounds_ne_lon'), $location->get('bounds_sw_lat'), $location->get('bounds_ne_lat'));
            $retVenue = [];
            if ($venues->exists_in_db())
            {
                foreach ($venues->object() as $venue)
                {
                    $retVenue[] = [
                        'lat' => $venue->get('lat'),
                        'long' => $venue->get('long')
                    ];
                }
            }
            $rooms['pointers'] = $retVenue;
            $rooms['bounds'] = [
                'lat' => $location->get('lat'),
                'lon' => $location->get('long'),
                'sw_lat' => $location->get('bounds_sw_lat'),
                'sw_lon' => $location->get('bounds_sw_lon'),
                'ne_lat' => $location->get('bounds_ne_lat'),
                'ne_lon' => $location->get('bounds_ne_lon')
            ];
        }
        return $this->response($rooms, 200);
    }

    private function _get_room_fields($roomObj)
    {
        return [
            'id' => $roomObj->get_id(),
            'venue_id' => $roomObj->get('venue_id'),
            'name' => $roomObj->wrangle('defaulted_name')->value(),
            'address' => $roomObj->get_venue_address(false),
            'parent_name' => (($roomObj->data_exists('company_name') && $roomObj->data_not_empty('company_name'))?$roomObj->get('company_name'):$roomObj->get('venue_name')),
            'currency' => html_entity_decode($roomObj->get('currency_symbol_left')),
            'room_url' => get_room_url($roomObj),
            'edit_room_url' => get_room_url($roomObj, '', true),
            'venue_url' => get_venue_url($roomObj),
            'edit_venue_url' => get_venue_url($roomObj, true),
            'image' => $roomObj->wrangle('image')->get_url('large'),
            'price' => floatval($roomObj->get('hourly_rate')) ?: floatval($roomObj->get('daily_rate')) ?: floatval($roomObj->get('daily_delegate_rate')) ?: floatval($roomObj->get('monthly_rate')),
            'venue_review_score' => floatval($roomObj->get('review_score')),
            'venue_review_count' => floatval($roomObj->get('review_count')),
            'desc' => strip_tags($roomObj->get('venue_desc'))
        ];
    }
}
