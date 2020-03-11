<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__locations extends Model_Base__Object
{
    use Trait__Currency_Handler;

    private $_default_id=2;

    function __construct()
    {
        $this->_set_base_class(Location::class);
        parent::__construct();
    }

    protected function _user_can_select($object)
    {
        return $this->user_is_admin();
    }

    protected function _user_can_update($object)
    {
        return $this->user_is_admin();
    }

    protected function _user_can_insert($object)
    {
        return $this->user_is_admin();
    }

    public function get_location_from_url_desc($urlDesc, $parentUrlDesc = null)
    {
        return new Location($this->_get_location_from_url_desc($urlDesc, $parentUrlDesc));
    }

    private function _get_location_from_url_desc($urlDesc, $parentUrlDesc)
    {
        $parent_location = $this->_join_parent_location();
        $this->_join_location_category();
        $this->_join_currency();
        $this->db->where(Location::column('url_desc'), $urlDesc);
        $this->db->where(Location::column('is_crawlable'), 1);
        if ($parentUrlDesc != null && $parentUrlDesc != false)
        {
            $this->db->nullable_where(Location::column('url_desc', true, $parent_location), $parentUrlDesc);
        }
        return $this->_query_init_and_run();
    }

    public function get_country_location_object($country_code, $tag_id = null)
    {
        return new Location($this->_get_country_location_object($country_code, $tag_id));
    }

    private function _get_country_location_object($country_code, $tag_id)
    {
        if ($tag_id != null)
        {
            $this->db->join(Runt_Location_Room::tableName(), Location::id_column() . "=" . Runt_Location_Room::column('location_id') . " AND " . Runt_Location_Room::column('tag_id') . " = " . $tag_id, "LEFT");
            $this->db->select_alias(Runt_Location_Room::column('approved_room_count'), Location::alias('child_room_count'));
        }
        $this->_join_location_asset();
        $this->db->where(Location::column('parent_id'), 0);
        $this->db->where(Location::column('is_crawlable'), 1);
        $this->db->where(Location::column('country'), $country_code);
        return $this->_query_init_and_run();
    }

    public function get_nearby_locations($location, $tag_id, $category_id, $by_parent = false, $by_country = false, $remove_self = false)
    {
        return new Location___Collection($this->_get_nearby_locations($location, $tag_id, $category_id, $by_parent, $by_country, $remove_self));
    }

    private function _get_nearby_locations($location, $tag_id, $category_id, $by_parent, $by_country, $remove_self)
    {
        $this->_join_location_category();
        $this->_join_location_asset();
        $this->db->join(Landing_Page::tableName(), Location::id_column() . "=" . Landing_Page::column('location_id') . " AND " . Landing_Page::column('tag_id') . " = " . $tag_id . " AND " . Landing_Page::column('attribute_id') . " IS NULL", "INNER");
        $this->db->join(Runt_Location_Room::tableName(), Location::id_column() . "=" . Runt_Location_Room::column('location_id') . " AND " . Runt_Location_Room::column('tag_id') . " = " . $tag_id, "LEFT");
        $this->db->select_alias(Runt_Location_Room::column('approved_room_count'), Location::alias('child_room_count'));
        $this->db->select_alias(Landing_Page::column('search_redirect'), Location::alias('landing_page_search_redirect'));
        if ($by_parent)
        {
            if ($location->get('category_type') == Location_Category::DISTRICT || $location->get('category_type') == Location_Category::LANDMARK || $location->get('category_type') == Location_Category::AIRPORT)
            {
                $this->db->where(Location::column('parent_id'), $location->get('parent_id'));
            }
            else
            {
                $this->db->where(Location::column('parent_id'), $location->get_id());
            }
        }
        elseif (!$by_parent && !$by_country && $category_id == Location_Category::CITY)
        {
            $this->db->where(Location::id_column(), $location->get('parent_id'));
        }
        if ($by_country)
        {
            $this->db->where(Location::column('country'), $location->get('country'));
        }
        if ($remove_self)
        {
            $this->db->where(Location::id_column() . ' <> ' . $location->get_id());
        }
        $this->db->where(Location::column('category_type'), $category_id);
        $this->db->where(Location::column('is_crawlable'), 1);
        $this->db->where(Runt_Location_Room::column('approved_room_count') . ' > 0');
        $this->db->order_by(Runt_Location_Room::column('approved_room_count'), 'DESC');
        $this->db->order_by(Location::column('human_desc'), 'ASC');
        $this->db->limit(50);
        return $this->_query_init_and_run(false);
    }

    public function get_location_from_search_url($search_url)
    {
        return new Location($this->_get_location_from_search_url($search_url));
    }

    private function _get_location_from_search_url($search_url)
    {
        $this->_join_parent_location();
        $this->_join_location_category();
        $this->_join_location_asset();
        $this->_join_currency();
        $this->db->where(Location::column('is_crawlable'), 1);
        $this->db->where(Location::column('search_url'), $search_url);
        $this->db->or_where(Location::column('human_desc'), $search_url);
        $this->db->or_where(Location::column('url_desc'), $search_url);
        return $this->_query_init_and_run();
    }

    public function get_parent_location_from_desc_and_country($desc, $country_code)
    {
        return new Location($this->_get_parent_location_from_desc_and_country($desc, $country_code));
    }

    private function _get_parent_location_from_desc_and_country($desc, $country_code)
    {
        $this->db->where(Location::column('human_desc'), $desc);
        if ($country_code != null && $country_code != false)
        {
            $this->db->where(Location::column('country'), $country_code);
        }
        return $this->_query_init_and_run();
    }

    public function get_default_location()
    {
        $location = $this->get_location_by_id($this->_default_id);
        if (!$location->exists_in_db())
        {
            throw new Exception('The database seems to have become corrupted. Please come back later.');
        }
        return $location;
    }

    public function get_location_by_id($id)
    {
        return new Location($this->_get_location_by_id($id));
    }

    private function _get_location_by_id($id)
    {
        $this->_join_parent_location();
        $this->_join_location_category();
        $this->_join_location_asset();
        $this->_join_currency();
        $this->db->where(Location::id_column(), $id);
        return $this->_query_init_and_run();
    }

    public function get_all_location_details_collection($limit, $offset, $sort_by, $sort_order, $keyword = '')
    {
        $this->db->count_rows(true);
        $this->db->limit($limit, $offset);
        $parent_location = $this->_join_parent_location();
        $this->_join_location_category();
        $this->_join_location_asset();
        $this->db->advanced_join(Location::class, Runt_Location_Room::class, Location::id_column(false), Runt_Location_Room::column('location_id', false));
        $this->db->advanced_join(Runt_Location_Room::class, Tag::class, Runt_Location_Room::column('tag_id', false), Tag::id_column(false));
        $this->_select_sub_collection_alias(Tag::column('name'), 'rooms', Runt_Location_Room::alias('tag_name'));
        $this->_select_sub_collection(Runt_Location_Room::class, 'rooms');
        $this->_set_sub_collection_ordering(Tag::column('name'), 'rooms', 'ASC');
        $this->db->select_alias(Runt_Location_Room::column('approved_room_count'), Location::alias('approved_room_count'));
        $this->db->order_by(Location::sort_by_token($sort_by), $sort_order);
        if ($keyword != '')
        {
            $this->db->start_group_like(Location::id_column(), $keyword);
            $this->db->or_like(Location::column('human_desc'), $keyword);
            $this->db->or_like(Location::column('human_desc', true, $parent_location), $keyword);
            $this->db->or_like(Location::column('url_desc'), $keyword);
            $this->db->close_group_like();
        }
        return new Location___Collection($this->_query_init_and_run(false));
    }

    public function get_location_objects_collection($crawlable = false, $country_code = null, $tag_id = null)
    {
        return new Location___Collection($this->_get_location_objects_collection($crawlable, $country_code, $tag_id));
    }

    private function _get_location_objects_collection($crawlable, $country_code, $tag_id)
    {
        $this->_join_parent_location();
        $this->_join_location_category();
        $this->_join_location_asset();
        if ($crawlable)
        {
            $this->db->where(Location::column('is_crawlable'), 1);
        }
        if ($country_code != null)
        {
            $this->db->where(Location::column('country'), $country_code);
        }
        if ($tag_id != null)
        {
            $this->db->join(Runt_Location_Room::tableName(), Location::id_column() . "=" . Runt_Location_Room::column('location_id') . " AND " . Runt_Location_Room::column('tag_id') . " = " . $tag_id, "LEFT");
            $this->db->select_alias(Runt_Location_Room::column('approved_room_count'), Location::alias('child_room_count'));
        }
        $this->db->order_by(Location::column('human_desc'), 'ASC');
        return $this->_query_init_and_run(false);
    }

    private function _join_parent_location()
    {
        $parent_location = 'parent_location';
        $this->db->advanced_join(Location::class, Location::class, Location::column('parent_id', false), Location::id_column(false), "LEFT", null, $parent_location);
        $this->db->select_alias(Location::column('human_desc', true, $parent_location), Location::alias('parent_desc'));
        $this->db->select_alias(Location::column('url_desc', true, $parent_location), Location::alias('parent_url'));
        $this->db->select_alias(Location::column('requires_determiner', true, $parent_location), Location::alias('parent_determiner'));
        $this->db->select_alias(Location::column('parent_id', true, $parent_location), Location::alias('parent_parent_id'));
        return $parent_location;
    }

    private function _join_location_category()
    {
        $this->db->advanced_join(Location::class, Location_Category::class, Location::column('category_type', false), Location_Category::id_column(false));
        $this->db->select_alias(Location_Category::column('location_category'), Location::alias('category_desc'));
    }

    private function _join_location_asset()
    {
        $this->db->advanced_join(Location::class, Runt_Location_Asset::class, Location::id_column(false), Runt_Location_Asset::column('location_id', false));
        $this->db->select_alias(Runt_Location_Asset::column('approved_venue_count'), Location::alias('approved_venue_count'));
        $this->db->select_alias(Runt_Location_Asset::column('unapproved_venue_count'), Location::alias('unapproved_venue_count'));
    }

    private function _join_currency()
    {
        $this->db->advanced_join(Location::class, Runt_Currency_Location::class, Location::column('country', false), Runt_Currency_Location::column('country_code', false));
        $this->_query_join_currencies(Runt_Currency_Location::class, Runt_Currency_Location::column('currency_code', false), [
            'left' => 'currency_symbol_left',
            'right' => 'currency_symbol_right'
        ]);
        $this->db->select_alias(Runt_Currency_Location::column('currency_code'), Location::alias('currency_code'));
    }

    public function get_footer_locations_by_country_and_tag($country_code, $tag_id)
    {
        return new Location___Collection($this->_get_footer_locations_by_country_and_tag($country_code, $tag_id));
    }

    private function _get_footer_locations_by_country_and_tag($country_code, $tag_id)
    {
        $this->_join_location_asset();
        $this->db->advanced_join(Location::class, Runt_Location_Room::class, Location::id_column(false), Runt_Location_Room::column('location_id', false));
        $this->db->select_alias(Runt_Location_Room::column('approved_room_count'), Location::alias('child_room_count'));
        $this->db->where(Runt_Location_Room::column('tag_id'), $tag_id);
        $this->db->where(Location::column('is_crawlable'), 1);
        $this->db->where(Location::column('country'), $country_code);
        $this->db->start_group_where(Location::column('category_type'), Location_Category::CITY);
        $this->db->or_where(Location::column('category_type'), Location_Category::DISTRICT);
        $this->db->close_group_where();
        $this->db->where(Runt_Location_Room::column('approved_room_count') . ' > 0');
        $this->db->order_by(Location::column('category_type'), 'ASC');
        $this->db->order_by(Runt_Location_Room::column('approved_room_count'), 'DESC');
        $this->db->limit(26);
        return $this->_query_init_and_run(false);
    }

    public function get_human_sitemap_location_collection($country_code, $parent_url = null)
    {
        return new Location___Collection($this->_get_human_sitemap_location_collection($country_code, $parent_url));
    }

    private function _get_human_sitemap_location_collection($country_code, $parent_url)
    {
        $this->db->advanced_join(Location::class, Landing_Page::class, Location::id_column(false), Landing_Page::column('location_id', false));
        $this->_join_location_category();
        $this->_join_location_asset();
        $this->db->where(Location::column('parent_id') . ' <> 0');
        $this->db->where(Location::column('is_crawlable'), 1);
        $this->db->where(Runt_Location_Asset::column('approved_venue_count') . ' > 0');
        $this->db->where(Location::column('country'), $country_code);
        if ($parent_url == null)
        {
            $this->db->where(Location::column('category_type'), Location_Category::CITY);
        }
        else
        {
            $parent_location = $this->_join_parent_location();
            $this->db->where(Location::column('url_desc', true, $parent_location), $parent_url);
            $this->db->where(Location::column('is_crawlable', true, $parent_location), 1);
            $this->db->where(Location::column('country', true, $parent_location), $country_code);
            $this->db->start_group_where(Location::column('category_type'), Location_Category::DISTRICT);
            $this->db->or_where(Location::column('category_type'), Location_Category::LANDMARK);
            $this->db->or_where(Location::column('category_type'), Location_Category::AIRPORT);
            $this->db->close_group_where();
        }
        $this->db->where(Landing_Page::id_column() . ' IS NOT NULL');
        $this->db->group_by(Location::id_column());
        $this->db->order_by(Location::column('human_desc'), 'ASC');
        return $this->_query_init_and_run(false);
    }

    public function get_wrong_places()
    {
        return new Location___Collection($this->_get_wrong_places());
    }

    private function _get_wrong_places()
    {
        $this->db->where(Location::column('place_id') . ' IS NULL');
        $this->db->or_where('LENGTH(' . Location::column('place_id') . ') > 27');
        return $this->_query_init_and_run(false);
    }
}
