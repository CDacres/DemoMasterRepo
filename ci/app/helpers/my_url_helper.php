<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

/**
 * Admin URL
 *
 * Create a admin URL based on the admin folder path mentioned in config file. Segments can be passed via the
 * first parameter either as a string or an array.
 *

 * @access	public
 * @param	string
 * @return	string
 */

if (!function_exists('admin_url'))
{
    function admin_url($uri = '')
    {
        $CI = &get_instance();
        $uri = 'administrator/' . $uri ;
        return $CI->config->site_url($uri);
    }
}

/**

 * Header Redirect Admin
 *

 * Header redirect in two flavors
 * For very fine grained control over headers, you could use the Output
 * Library's set_header() function.
 *

 * @access	public
 * @param	string	the URL
 * @param	string	the method: location or redirect
 * @return	string
 */

if (!function_exists('redirect_admin'))
{
    function redirect_admin($uri = '', $method = 'location', $http_response_code = 302)
    {
        switch($method)
        {
            case 'refresh':
                header("Refresh:0;url=" . admin_url($uri));
            break;

            default:
                header("Location: " . admin_url($uri), TRUE, $http_response_code);
            break;
        }
        exit;
    }
}

if (!function_exists('seo_url'))
{
    function seo_url($str)
    {
        return urlencode(mb_strtolower(str_replace([',', ' ', '_', '/ ', '/', ' /', '(', ')', ':', '%', '..', '\\'], ['-', '-', '-'], trim($str)), 'UTF-8'));
    }
}

if (!function_exists('search_url_encode'))
{
    function search_url_encode($str)
    {
        return str_replace(['-', ', ', ' ', '/ ', '/', ' /', '(', ')'], ['~', '--', '-'], trim($str));
    }
}

if (!function_exists('search_url_decode'))
{
    function search_url_decode($str)
    {
        return urldecode(str_replace(['--', '-', '~'], [', ', ' ', '-'], trim($str)));
    }
}

if (!function_exists('landing_page_url'))
{
    function landing_page_url($tag_slug, $location_url = '', $attr_url = '')
    {
        return (($attr_url != '')?$attr_url . '--':'') . $tag_slug . (($location_url != '')?'/' . $location_url:'');
    }
}

/* End of file MY_url_helper.php */
/* Location: ./app/helpers/MY_url_helper.php */