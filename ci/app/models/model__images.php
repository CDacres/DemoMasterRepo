<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');
/**
 * Zipcube Images Model
 *
 * images in database
 *
 * @package		Zipcube
 * @subpackage          Models
 * @category            Data
 * @author		Will
 * @version		Version 2.0
 * @link		www.zipcube.com
 */
class Model__images extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Image::class);
        parent::__construct();
    }

    public function get_images_object_collection_by_subject_id($assetId, $remove_id = null)
    {
        return new Image___Collection($this->_get_images_array_by_subject_id($assetId, $remove_id));
    }

    private function _get_images_array_by_subject_id($assetId, $remove_id)
    {
        $this->db->where(Image::column('image_type_id'), Image::ASSET);
        $this->db->where(Image::column('subject_id'), $assetId);
        if ($remove_id != null)
        {
            $this->db->where(Image::id_column() . ' <> ' . $remove_id);
        }
        $this->db->order_by(Image::column('represents'), 'DESC');
        return $this->_query_init_and_run(false);
    }

    public function get_image_object_by_asset_and_id($asset_id, $id)
    {
        return new Image($this->_get_image_object_by_asset_and_id($asset_id, $id));
    }

    private function _get_image_object_by_asset_and_id($asset_id, $id)
    {
        $this->db->where(Image::column('image_type_id'), Image::ASSET);
        $this->db->where(Image::column('subject_id'), $asset_id);
        $this->db->where(Image::id_column(), $id);
        return $this->_query_init_and_run();
    }

    public function get_image_object_by_id($id)
    {
        return new Image($this->_get_image_object_by_id($id));
    }

    private function _get_image_object_by_id($id)
    {
        $this->db->where(Image::column('image_type_id'), Image::ASSET);
        $this->db->where(Image::id_column(), $id);
        return $this->_query_init_and_run();
    }

    public function get_all_room_image_details_collection($limit, $offset, $sort_by, $sort_order, $status = '', $keyword = '')
    {
        $venueUserAlias = "main_contact_user";
        $venueProfileAlias = "main_contact_profile";
        $this->db->count_rows(true);
        $this->db->limit($limit, $offset);
        $this->db->allow_join_disabled();
        $this->db->advanced_join(Image::class, Room_Skeleton::class, Image::column('subject_id', false), Room_Skeleton::asset_id_column(false), "INNER");
        $this->db->advanced_join(Room_Skeleton::class, Venue::class, Room_Skeleton::column('venue_id', false), Venue::id_column(false));
        $this->db->advanced_join(Venue::class, User::class, Venue::column('main_contact', false), User::id_column(false), "LEFT", NULL, $venueUserAlias);
        $this->db->advanced_join(User::class, Profile::class, User::id_column(false), Profile::column('user_id', false), "LEFT", $venueUserAlias, $venueProfileAlias);
        $this->db->disallow_join_disabled();
        $this->db->advanced_join(Image::class, Configuration::class, Image::column('configuration_id', false), Configuration::id_column(false));
        $this->db->advanced_join(Room_Skeleton::class, Usage::class, Room_Skeleton::column('usage_id', false), Usage::id_column(false));
        $this->db->advanced_join(Usage::class, Runt_Usage_UsageSuperset::class, Usage::id_column(false), Runt_Usage_UsageSuperset::column('usage_id', false));
        $this->db->advanced_join(Runt_Usage_UsageSuperset::class, UsageSuperset::class, Runt_Usage_UsageSuperset::column('usage_superset_id', false), UsageSuperset::id_column(false));
        $this->db->advanced_join(UsageSuperset::class, Runt_UsageSuperset_Language::class, UsageSuperset::id_column(false), Runt_UsageSuperset_Language::column('usage_superset_id', false));
        $this->db->select_alias(Runt_UsageSuperset_Language::column('alias'), Image::alias('usage_superset_alias'));
        $this->db->select_alias(Room_Skeleton::id_column(), Image::alias('room_id'));
        $this->db->select_alias(Room_Skeleton::column('title'), Image::alias('room_name'));
        $this->db->select_alias(Room_Skeleton::enabled_column(), Image::alias('room_enabled'));
        $this->db->select_alias(Venue::id_column(), Image::alias('venue_id'));
        $this->db->select_alias(Venue::asset_id_column(), Image::alias('venue_asset_id'));
        $this->db->select_alias(Venue::column('name'), Image::alias('venue_name'));
        $this->db->select_alias(Venue::column('city'), Image::alias('venue_city'));
        $this->db->select_alias(Venue::column('country_code'), Image::alias('venue_country_code'));
        $this->db->select_alias(Venue::enabled_column(), Image::alias('venue_enabled'));
        $this->db->select_alias(User::id_column(false, $venueUserAlias), Image::alias('main_user_id'));
        $this->db->select_alias(User::column('hubspot_id', false, $venueUserAlias), Image::alias('main_user_hubspot_id'));
        $this->db->select_alias(Profile::column('first_name', false, $venueProfileAlias), Image::alias('main_user_firstname'));
        $this->db->select_alias(Profile::column('last_name', false, $venueProfileAlias), Image::alias('main_user_lastname'));
        $this->db->select_alias(User::column('email', false, $venueUserAlias), Image::alias('main_user_email'));
        $this->db->select_alias(User::column('email_status', false, $venueUserAlias), Image::alias('main_user_email_status'));
        $this->db->select_alias(Profile::column('phone_number', false, $venueProfileAlias), Image::alias('main_user_phone'));
        $this->db->select_alias(User::column('role_id', false, $venueUserAlias), Image::alias('main_user_role_id'));
        $this->db->select_alias(Configuration::column('desc'), Image::alias('configuration_name'));
        $this->db->where(Runt_UsageSuperset_Language::column('lang_code'), config_item('language_code'));
        $this->db->nullable_where(UsageSuperset::column('hidden'), 0);
        $this->db->where(Image::column('image_type_id'), Image::ASSET);
        $this->db->order_by(Image::sort_by_token($sort_by), $sort_order);
        $splitStatus = explode('_', $status);
        if ($status == 'live')
        {
            $this->db->where(Room_Skeleton::column('approved'), 1);
            $this->db->where(Room_Skeleton::column('status'), 1);
            $this->db->where(Venue::column('approved'), 1);
        }
        elseif ($status == 'nonlive')
        {
            $this->db->start_group_where(Room_Skeleton::column('approved'), 0);
            $this->db->or_where(Room_Skeleton::column('status'), 0);
            $this->db->or_where(Venue::column('approved'), 0);
            $this->db->close_group_where();
        }
        elseif ($status == 'without_config')
        {
            $this->db->where(Configuration::id_column());
        }
        elseif ($status == 'flagged')
        {
            $this->db->where(Image::column('flagged'), 1);
        }
        elseif ($status == 'cosmetic')
        {
            $this->db->where(Image::column('cosmetic'), 1);
        }
        elseif (isset($splitStatus[0]) && ($splitStatus[0] == 'flagged' || $splitStatus[0] == 'cosmetic'))
        {
            if ($splitStatus[0] == 'flagged')
            {
                $this->db->where(Image::column('flagged'), 1);
            }
            elseif ($splitStatus[0] == 'cosmetic')
            {
                $this->db->where(Image::column('cosmetic'), 1);
            }
            if (isset($splitStatus[1]))
            {
                if (empty($splitStatus[1]))
                {
                    $this->db->where(Venue::column('city'));
                }
                else
                {
                    $this->db->where(Venue::column('city'), urldecode($splitStatus[1]));
                }
            }
            if (isset($splitStatus[2]))
            {
                $this->db->where(Venue::column('country_code'), urldecode($splitStatus[2]));
            }
        }
        if ($keyword != '')
        {
            $this->db->start_group_like(Room_Skeleton::id_column(), $keyword);
            $this->db->or_like(Room_Skeleton::column('title'), $keyword);
            $this->db->or_like(Venue::id_column(), $keyword);
            $this->db->or_like(Venue::column('name'), $keyword);
            $this->db->or_like(Configuration::column('desc'), $keyword);
            $this->db->or_like(Profile::column('first_name', true, $venueProfileAlias), $keyword);
            $this->db->or_like(Profile::column('last_name', true, $venueProfileAlias), $keyword);
            $this->db->or_like("CONCAT(" . Profile::column('first_name', true, $venueProfileAlias) . ", ' ', " . Profile::column('last_name', true, $venueProfileAlias) . ")", $keyword);
            $this->db->or_like("LOWER(" . User::column('email', true, $venueUserAlias) . ")", $keyword);
            $this->db->or_like("REPLACE(LOWER(" . User::column('email', true, $venueUserAlias) . "), '_', '\\_')", $keyword);
            $this->db->or_like(Profile::column('phone_number', true, $venueProfileAlias), $keyword);
            $this->db->close_group_like();
        }
        return new Image___Collection($this->_query_init_and_run(false));
    }

    public function get_all_venue_image_details_collection($limit, $offset, $sort_by, $sort_order, $status = '', $keyword = '')
    {
        $venueUserAlias = "main_contact_user";
        $venueProfileAlias = "main_contact_profile";
        $this->db->count_rows(true);
        $this->db->limit($limit, $offset);
        $this->db->allow_join_disabled();
        $this->db->advanced_join(Image::class, Venue::class, Image::column('subject_id', false), Venue::asset_id_column(false), "INNER");
        $this->db->advanced_join(Venue::class, User::class, Venue::column('main_contact', false), User::id_column(false), "LEFT", NULL, $venueUserAlias);
        $this->db->advanced_join(User::class, Profile::class, User::id_column(false), Profile::column('user_id', false), "LEFT", $venueUserAlias, $venueProfileAlias);
        $this->db->disallow_join_disabled();
        $this->db->select_alias(Venue::id_column(), Image::alias('venue_id'));
        $this->db->select_alias(Venue::asset_id_column(), Image::alias('venue_asset_id'));
        $this->db->select_alias(Venue::column('name'), Image::alias('venue_name'));
        $this->db->select_alias(Venue::column('city'), Image::alias('venue_city'));
        $this->db->select_alias(Venue::column('country_code'), Image::alias('venue_country_code'));
        $this->db->select_alias(Venue::enabled_column(), Image::alias('venue_enabled'));
        $this->db->select_alias(User::id_column(false, $venueUserAlias), Image::alias('main_user_id'));
        $this->db->select_alias(User::column('hubspot_id', false, $venueUserAlias), Image::alias('main_user_hubspot_id'));
        $this->db->select_alias(Profile::column('first_name', false, $venueProfileAlias), Image::alias('main_user_firstname'));
        $this->db->select_alias(Profile::column('last_name', false, $venueProfileAlias), Image::alias('main_user_lastname'));
        $this->db->select_alias(User::column('email', false, $venueUserAlias), Image::alias('main_user_email'));
        $this->db->select_alias(User::column('email_status', false, $venueUserAlias), Image::alias('main_user_email_status'));
        $this->db->select_alias(Profile::column('phone_number', false, $venueProfileAlias), Image::alias('main_user_phone'));
        $this->db->select_alias(User::column('role_id', false, $venueUserAlias), Image::alias('main_user_role_id'));
        $this->db->where(Image::column('image_type_id'), Image::ASSET);
        $this->db->order_by(Image::sort_by_token($sort_by), $sort_order);
        $splitStatus = explode('_', $status);
        if ($status == 'live')
        {
            $this->db->where(Venue::column('approved'), 1);
        }
        elseif ($status == 'nonlive')
        {
            $this->db->where(Venue::column('approved'), 0);
        }
        elseif ($status == 'flagged')
        {
            $this->db->where(Image::column('flagged'), 1);
        }
        elseif ($status == 'cosmetic')
        {
            $this->db->where(Image::column('cosmetic'), 1);
        }
        elseif (isset($splitStatus[0]) && ($splitStatus[0] == 'flagged' || $splitStatus[0] == 'cosmetic'))
        {
            if ($splitStatus[0] == 'flagged')
            {
                $this->db->where(Image::column('flagged'), 1);
            }
            elseif ($splitStatus[0] == 'cosmetic')
            {
                $this->db->where(Image::column('cosmetic'), 1);
            }
            if (isset($splitStatus[1]))
            {
                if (empty($splitStatus[1]))
                {
                    $this->db->where(Venue::column('city'));
                }
                else
                {
                    $this->db->where(Venue::column('city'), urldecode($splitStatus[1]));
                }
            }
            if (isset($splitStatus[2]))
            {
                $this->db->where(Venue::column('country_code'), urldecode($splitStatus[2]));
            }
        }
        if ($keyword != '')
        {
            $this->db->start_group_like(Venue::id_column(), $keyword);
            $this->db->or_like(Venue::column('name'), $keyword);
            $this->db->or_like(Profile::column('first_name', true, $venueProfileAlias), $keyword);
            $this->db->or_like(Profile::column('last_name', true, $venueProfileAlias), $keyword);
            $this->db->or_like("CONCAT(" . Profile::column('first_name', true, $venueProfileAlias) . ", ' ', " . Profile::column('last_name', true, $venueProfileAlias) . ")", $keyword);
            $this->db->or_like("LOWER(" . User::column('email', true, $venueUserAlias) . ")", $keyword);
            $this->db->or_like("REPLACE(LOWER(" . User::column('email', true, $venueUserAlias) . "), '_', '\\_')", $keyword);
            $this->db->or_like(Profile::column('phone_number', true, $venueProfileAlias), $keyword);
            $this->db->close_group_like();
        }
        return new Image___Collection($this->_query_init_and_run(false));
    }
}