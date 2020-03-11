<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');
require_once APPPATH . 'libraries/REST_Controller.php';

class Location_REST extends REST_Controller
{
    function __construct()
    {
        parent::__construct();
    }

    public function index_get()
    {
        if (!$this->dx_auth->is_admin())
        {
            return $this->response($this->lang->line('rest_wrong_perm'), 403);
        }
        $get = $this->get();
        $modelLocations = Model__locations::class;
        $this->load->model($modelLocations);
        if (isset($get['id']))
        {
            $location = $this->$modelLocations->get_location_by_id($get['id']);
            if (!$location->exists_in_db())
            {
                return $this->response($this->lang->line('rest_no_location'), 405);
            }
            return $this->response($location->get_as_ajax_response(), 200);
        }
        elseif (isset($get['human_desc']) && isset($get['country']))
        {
            $location = $this->$modelLocations->get_parent_location_from_desc_and_country($get['human_desc'], $get['country']);
            if ($location->exists_in_db())
            {
                return $this->response($location->get_as_ajax_response(), 200);
            }
        }
        return $this->response([], 200);
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
        $modelLocations = Model__locations::class;
        $this->load->model($modelLocations);
        $location = $this->$modelLocations->get_location_by_id($put['id']);
        if (!$location->exists_in_db())
        {
            return $this->response($this->lang->line('rest_no_location'), 405);
        }
        $oldDistance = $location->get('bounds_distance');
        $oldLat = $location->get('lat');
        $oldLong = $location->get('long');
        $oldHumanDesc = $location->get('human_desc');
        $dataToChange = false;
        $fieldArr = [
            'search_url',
            'human_desc',
            'url_desc'
        ];
        foreach ($fieldArr as $field)
        {
            if (isset($put[$field]))
            {
                $location->set($field, $put[$field]);
                $dataToChange = true;
            }
        }
        if (isset($put['in_sitemap']))
        {
            $location->set('is_crawlable', $put['in_sitemap']);
            $dataToChange = true;
        }
        if (isset($put['parent_id']))
        {
            if ($put['parent_id'] == $put['id'])
            {
                return $this->response('Parent location cannot be itself', 405);
            }
            $location->set('parent_id', $put['parent_id']);
            $dataToChange = true;
        }
        if (isset($put['locationcategorie_id']))
        {
            $location->set('category_type', $put['locationcategorie_id']);
            $dataToChange = true;
        }
        if (isset($put['lat']) && $put['lat'] != '' && isset($put['long']) && $put['long'] != '' && ($put['lat'] != $oldLat || $put['long'] != $oldLong))
        {
            if (isset($put['bounds_distance']) && $put['bounds_distance'] != $oldDistance)
            {
                $this->_location_geocode($location, $put['lat'], $put['long'], '', $put['bounds_distance']);
            }
            else
            {
                $this->_location_geocode($location, $put['lat'], $put['long'], '', $oldDistance);
            }
            $dataToChange = true;
        }
        elseif (isset($put['human_desc']) && $put['human_desc'] != '' && $put['human_desc'] != $oldHumanDesc)
        {
            $locStr = $put['human_desc'];
            if (isset($put['parent_desc']))
            {
                $locStr .= ", " . $put['parent_desc'];
            }
            if (isset($put['bounds_distance']) && $put['bounds_distance'] != $oldDistance)
            {
                $this->_location_geocode($location, '', '', $locStr, $put['bounds_distance']);
            }
            else
            {
                $this->_location_geocode($location, '', '', $locStr, $oldDistance);
            }
            $dataToChange = true;
        }
        elseif (isset($put['bounds_distance']) && $put['bounds_distance'] != $oldDistance)
        {
            $this->_location_geocode($location, $oldLat, $oldLong, '', $put['bounds_distance']);
            $dataToChange = true;
        }
        if ($dataToChange)
        {
            $this->$modelLocations->insert_update($location);
            $this->_location_assets($modelLocations, $location);
        }
        return $this->response($location->get_as_ajax_response(), 200);
    }

    public function index_post()
    {
        if (!$this->dx_auth->is_admin())
        {
            return $this->response($this->lang->line('rest_wrong_perm'), 403);
        }
        $post = $this->post();
        if (isset($post['id']))
        {
            return $this->response(null, 400);
        }
        $modelLocations = Model__locations::class;
        $this->load->model($modelLocations);
        $location = new Location();
        $dataToAdd = false;
        $fieldArr = [
            'search_url',
            'human_desc',
            'url_desc',
            'parent_id'
        ];
        foreach ($fieldArr as $field)
        {
            if (isset($post[$field]))
            {
                $location->set($field, $post[$field]);
                $dataToAdd = true;
            }
        }
        if (isset($post['in_sitemap']))
        {
            $location->set('is_crawlable', $post['in_sitemap']);
            $dataToAdd = true;
        }
        if (isset($post['locationcategorie_id']))
        {
            $location->set('category_type', $post['locationcategorie_id']);
            $dataToAdd = true;
        }
        if (isset($post['lat']) && $post['lat'] != '' && isset($post['long']) && $post['long'] != '')
        {
            if (isset($post['bounds_distance']) && $post['bounds_distance'] != '')
            {
                $this->_location_geocode($location, $post['lat'], $post['long'], '', $post['bounds_distance']);
            }
            else
            {
                $this->_location_geocode($location, $post['lat'], $post['long']);
            }
            $dataToAdd = true;
        }
        elseif (isset($post['human_desc']))
        {
            $locStr = $post['human_desc'];
            if (isset($post['parent_desc']))
            {
                $locStr .= ", " . $post['parent_desc'];
            }
            if (isset($post['bounds_distance']) && $post['bounds_distance'] != '')
            {
                $this->_location_geocode($location, '', '', $locStr, $post['bounds_distance']);
            }
            else
            {
                $this->_location_geocode($location, '', '', $locStr);
            }
            $dataToAdd = true;
        }
        if ($dataToAdd)
        {
            $this->$modelLocations->insert_update($location);
            $this->_location_assets($modelLocations, $location);
        }
        return $this->response($location->get_as_ajax_response(), 201);
    }

    private function _location_geocode($location, $lat = '', $long = '', $address = '', $distance = '')
    {
        $this->load->library('GoogleGeocodeAPI');
        if ($lat != '' && $long != '')
        {
            $response = $this->googlegeocodeapi->latlng_geocode($lat, $long);
        }
        elseif ($address != '')
        {
            $response = $this->googlegeocodeapi->address_geocode($address);
        }
        elseif ($distance != '' && $distance > 0)
        {
            $bounds_sw_lat = $location->get('bounds_sw_lat');
            $bounds_sw_lon = $location->get('bounds_sw_lon');
            $bounds_ne_lat = $location->get('bounds_ne_lat');
            $bounds_ne_lon = $location->get('bounds_ne_lon');
            $bearing = (rad2deg(atan2(sin(deg2rad($bounds_ne_lon) - deg2rad($bounds_sw_lon)) * cos(deg2rad($bounds_ne_lat)), cos(deg2rad($bounds_sw_lat)) * sin(deg2rad($bounds_ne_lat)) - sin(deg2rad($bounds_sw_lat)) * cos(deg2rad($bounds_ne_lat)) * cos(deg2rad($bounds_ne_lon) - deg2rad($bounds_sw_lon)))) + 360) % 360;
            $this->_distanceCalc($location, $bearing, $distance);
        }
        if (isset($response['results']) && count($response['results']) > 0)
        {
            $constituancy_units = [
                'airport',
                'point_of_interest',
                'colloquial_area',
                'route',
                'neighborhood',
                'sublocality',
                'postal_code',
                'administrative_area_level_3'
            ];
            $retLocation = $response['results'][0];
            if (isset($retLocation['address_components']))
            {
                foreach ($retLocation['address_components'] as $address_component)
                {
                    $types = $address_component['types'];
                    if (in_array('country', $types))
                    {
                        $location->set('country', $location->sanitise_location_string($address_component['short_name']));
                    }
                    elseif (in_array('locality', $types))
                    {
                        $location->set('locality', $location->sanitise_location_string($address_component['short_name']));
                    }
                    if ($location->is_null('constituancy_unit') || $location->get('constituancy_unit') == '')
                    {
                        $intersect = array_intersect($constituancy_units, $types);
                        if (count($intersect) > 0)
                        {
                            $location->set('constituancy_unit', $location->sanitise_location_string($address_component['short_name']));
                        }
                    }
                }
            }
            $location->set('lat', $retLocation['geometry']['location']['lat']);
            $location->set('long', $retLocation['geometry']['location']['lng']);
            $location->set('location_type', $retLocation['geometry']['location_type']);
            $bounds_sw_lat = $retLocation['geometry']['viewport']['southwest']['lat'];
            $bounds_sw_lon = $retLocation['geometry']['viewport']['southwest']['lng'];
            $bounds_ne_lat = $retLocation['geometry']['viewport']['northeast']['lat'];
            $bounds_ne_lon = $retLocation['geometry']['viewport']['northeast']['lng'];
            $bearing = (rad2deg(atan2(sin(deg2rad($bounds_ne_lon) - deg2rad($bounds_sw_lon)) * cos(deg2rad($bounds_ne_lat)), cos(deg2rad($bounds_sw_lat)) * sin(deg2rad($bounds_ne_lat)) - sin(deg2rad($bounds_sw_lat)) * cos(deg2rad($bounds_ne_lat)) * cos(deg2rad($bounds_ne_lon) - deg2rad($bounds_sw_lon)))) + 360) % 360;
            if ($distance != '' && $distance > 0)
            {
                $this->_distanceCalc($location, $bearing, $distance);
            }
            else
            {
                $bounds_distance = (rad2deg(acos(sin(deg2rad($bounds_sw_lat)) * sin(deg2rad($bounds_ne_lat)) + cos(deg2rad($bounds_sw_lat)) * cos(deg2rad($bounds_ne_lat)) * cos(deg2rad($bounds_sw_lon - $bounds_ne_lon)))) * 111.18957696) / 2;
                $modelLocationCategories = Model__location_categories::class;
                $this->load->model($modelLocationCategories);
                $locCategory = $this->$modelLocationCategories->get_location_category_default_bounds($location->get('category_type'), $bounds_distance);
                if ($locCategory->exists_in_db())
                {
                    //find bearing and increase by default distance from lat/long point
                    $newSWPoint = $this->_destinationPoint(deg2rad($location->get('lat')), deg2rad($location->get('long')), deg2rad(($bearing > 180)?$bearing - 180:$bearing + 180), $locCategory->get('default_bounds_distance'));
                    $location->set('bounds_sw_lat', rad2deg($newSWPoint['lat']));
                    $location->set('bounds_sw_lon', rad2deg($newSWPoint['long']));
                    $newNEPoint = $this->_destinationPoint(deg2rad($location->get('lat')), deg2rad($location->get('long')), deg2rad($bearing), $locCategory->get('default_bounds_distance'));
                    $location->set('bounds_ne_lat', rad2deg($newNEPoint['lat']));
                    $location->set('bounds_ne_lon', rad2deg($newNEPoint['long']));
                    $location->set('bounds_distance', $locCategory->get('default_bounds_distance'));
                }
                else
                {
                    $location->set('bounds_sw_lat', $bounds_sw_lat);
                    $location->set('bounds_sw_lon', $bounds_sw_lon);
                    $location->set('bounds_ne_lat', $bounds_ne_lat);
                    $location->set('bounds_ne_lon', $bounds_ne_lon);
                    $location->set('bounds_distance', $bounds_distance);
                }
            }
        }
    }

    private function _distanceCalc($location, $bearing, $distance)
    {
        //find bearing and increase distance from lat/long point
        $newSWPoint = $this->_destinationPoint(deg2rad($location->get('lat')), deg2rad($location->get('long')), deg2rad(($bearing > 180)?$bearing - 180:$bearing + 180), $distance);
        $location->set('bounds_sw_lat', rad2deg($newSWPoint['lat']));
        $location->set('bounds_sw_lon', rad2deg($newSWPoint['long']));
        $newNEPoint = $this->_destinationPoint(deg2rad($location->get('lat')), deg2rad($location->get('long')), deg2rad($bearing), $distance);
        $location->set('bounds_ne_lat', rad2deg($newNEPoint['lat']));
        $location->set('bounds_ne_lon', rad2deg($newNEPoint['long']));
        $location->set('bounds_distance', $distance);
    }

    private function _destinationPoint($lat, $lng, $brng, $newDist)
    {
        $dist = $newDist/6378.137; // convert dist to angular distance in radians
        $retLat = asin(sin($lat) * cos($dist) + cos($lat) * sin($dist) * cos($brng));
        $retLon = fmod($lng + atan2(sin($brng) * sin($dist) * cos($lat), cos($dist) - sin($lat) * sin($retLat)) + 3 * M_PI, 2 * M_PI) - M_PI;
        return ['lat' => $retLat, 'long' => $retLon];
    }

    private function _location_assets($modelLocations, $location)
    {
        $modelTags = Model__tags::class;
        $this->load->model($modelTags);
        $tags = $this->$modelTags->get_tag_collection();
        if ($tags->exists_in_db())
        {
            $modelLocationRooms = Model__location_rooms::class;
            $this->load->model($modelLocationRooms);
            $modelLocationAssets = Model__location_assets::class;
            $this->load->model($modelLocationAssets);
            $modelRooms = Model__room_skeletons::class;
            $this->load->model($modelRooms);
            $approved_venues_arr = [];
            $unapproved_venues_arr = [];
            foreach ($tags->object() as $tag)
            {
                $approved_room_count = 0;
                $unapproved_room_count = 0;
                $rooms = $this->$modelRooms->get_room_locations($tag->get_id(), $location->get('country'), $location->get('bounds_sw_lon'), $location->get('bounds_ne_lon'), $location->get('bounds_sw_lat'), $location->get('bounds_ne_lat'));
                if ($rooms->exists_in_db())
                {
                    foreach ($rooms->object() as $room)
                    {
                        if ($room->is_true('venue_approved'))
                        {
                            if ($room->is_approved())
                            {
                                ++$approved_room_count;
                            }
                            else
                            {
                                ++$unapproved_room_count;
                            }
                            $approved_venues_arr[$room->get('venue_id')] = '';
                        }
                        else
                        {
                            ++$unapproved_room_count;
                            $unapproved_venues_arr[$room->get('venue_id')] = '';
                        }
                    }
                }
                if ($approved_room_count > 0 || $unapproved_room_count > 0)
                {
                    $locationRoom = $this->$modelLocationRooms->get_location_room_object_by_ids($location->get_id(), $tag->get_id());
                    if (!$locationRoom->exists_in_db())
                    {
                        $locationRoom->set('location_id', $location->get_id());
                        $locationRoom->set('tag_id', $tag->get_id());
                    }
                    $locationRoom->set('approved_room_count', $approved_room_count);
                    $locationRoom->set('unapproved_room_count', $unapproved_room_count);
                    $this->$modelLocationRooms->insert_update($locationRoom);
                }
            }
            $locationAsset = $this->$modelLocationAssets->get_location_asset_object_by_id($location->get_id());
            if (!$locationAsset->exists_in_db())
            {
                $locationAsset->set('location_id', $location->get_id());
            }
            $locationAsset->set('approved_venue_count', count($approved_venues_arr));
            $locationAsset->set('unapproved_venue_count', count($unapproved_venues_arr));
            $this->$modelLocationAssets->insert_update($locationAsset);
            $location->set('updated_date', date("Y-m-d H:i:s"));
            $this->$modelLocations->insert_update($location);
        }
    }
}