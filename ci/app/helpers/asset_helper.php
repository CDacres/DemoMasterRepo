<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

function generate_seo_title($venue_name, $usages)
{
    $CI = &get_instance();
    $limit = 80;
    $venue_string = $CI->lang->line('venues_seo_title', $venue_name);
    $reordered_usages = reorder_usages($usages);
    $usages_string = concatenate_usages($reordered_usages);
    $final_string = $usages_string . $venue_string;
    if (mb_strlen($final_string, 'UTF-8') > $limit)
    {
        $final_string = concatenate_usages(shorten_array($reordered_usages, mb_strlen($usages_string, 'UTF-8') - $limit - mb_strlen($venue_string, 'UTF-8'))) . $venue_string;
    }
    return $final_string;
}

function reorder_usages($usages)
{
    $CI = &get_instance();
    $modelUsageSupersetLang = Model__usagesuperset_language::class;
    $CI->load->model($modelUsageSupersetLang);
    $usagesupersets = $CI->$modelUsageSupersetLang->get_usage_superset_language_collection_by_lang($CI->session->userdata('user_lang'));
    $usage_supersets = [];
    if ($usagesupersets->exists_in_db())
    {
        foreach ($usagesupersets->object() as $usagesuperset)
        {
            $usage_supersets[$usagesuperset->get('usage_superset_id')] = $usagesuperset->get('short_desc');
        }
    }
    return array_intersect_key($usage_supersets, $usages);
}

function shorten_array($arr, $trim_count)
{
    $last_item = end($arr);
    $check_length = strlen($last_item);
    if ($check_length === $trim_count)
    {
        return array_slice($arr, 0, -1);
    }
    elseif ($check_length > $trim_count)
    {
        if (strpos($last_item, "/") !== false)
        {
            $pieces = explode("/", $last_item);
            if (strlen($pieces[1]) >= $trim_count)
            {
                $array = array_slice($arr, 0, -1);
                array_push($array, $pieces[0]);
                return $array;
            }
            return array_slice($arr, 0, -1);
        }
        return array_slice($arr, 0, -1);
    }
    return shorten_array(array_slice($arr, 0, -1), $trim_count - $check_length);
}

function concatenate_usages($usages_array)
{
    return join(' & ', array_filter(array_merge([join(', ', array_slice($usages_array, 0, -1))], array_slice($usages_array, -1)), 'strlen'));
}

function get_venue_url($object, $editLink = false)
{
    $CI = &get_instance();
    $user_country = '';
    if ($CI->session->userdata('user_cctld') != null && isset(config_item('supported_cctlds')[$CI->session->userdata('user_cctld')]))
    {
        $user_country = $CI->session->userdata('user_cctld');
    }
    $url = base_url() . (($user_country != '')?$user_country . '/':'') . 'venues/';
    if ($editLink)
    {
        if (!$object->is_null('venue_asset_id'))
        {
            $assetId = $object->get('venue_asset_id');
        }
        elseif (!$object->is_null('subject_id'))
        {
            $assetId = $object->get('subject_id');
        }
        else
        {
            $assetId = $object->get('asset_id');
        }
        if (!$object->is_null('venue_name'))
        {
            $url .= seo_url($object->get('venue_name')) . '/' . $assetId . '/edit';
        }
        else
        {
            $url .= seo_url($object->get('name')) . '/' . $assetId . '/edit';
        }
    }
    else
    {
        if (!$object->is_null('venue_name'))
        {
            $url .= seo_url($object->get('venue_name')) . '/' . $object->get('venue_id');
        }
        else
        {
            $url .= seo_url($object->get('name')) . '/' . $object->get_id();
        }
    }
    return $url;
}

function get_room_url($object, $template_url = '', $editLink = false, $widgetLink = false)
{
    $CI = &get_instance();
    $user_country = '';
    if ($CI->session->userdata('user_cctld') != null && isset(config_item('supported_cctlds')[$CI->session->userdata('user_cctld')]))
    {
        $user_country = $CI->session->userdata('user_cctld');
    }
    $url = base_url() . (($user_country != '')?$user_country . '/':'') . $object->get('usage_superset_alias') . ((!$object->is_null('venue_city'))?'/' . seo_url($object->get('venue_city')):'') . '/' . (($template_url != '')?$template_url . '/':'');
    if ($editLink)
    {
        if (!$object->is_null('room_asset_id'))
        {
            $assetId = $object->get('room_asset_id');
        }
        elseif (!$object->is_null('subject_id'))
        {
            $assetId = $object->get('subject_id');
        }
        else
        {
            $assetId = $object->get('asset_id');
        }
        $url .= $assetId . '/edit';
    }
    else
    {
        if (!$object->is_null('room_id'))
        {
            $url .= $object->get('room_id');
        }
        else
        {
            $url .= $object->get_id();
        }
        if ($widgetLink)
        {
            $url .= '?widget=1';
        }
    }
    return $url;
}