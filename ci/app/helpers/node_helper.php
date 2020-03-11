<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

use GuzzleHttp\Client;

function render_component($path, $component, $engine, $props = null)
{
    try
    {
        $client = new Client(['base_uri' => getenv('NODE_COMPONENTS_URL')]);
        $response = $client->post('/render-' . $engine, [
            'json' => [
                'component' => $component,
                'path' => $path,
                'props' => $props
            ]
        ]);
        if ($response->getStatusCode() == 200)
        {
            return $response->getBody()->getContents();
        }
        error_log("Node server failed for some reason: " . $path . " loading component: " . $component . " with props: " . print_r($props, true) . " and response body: " . $response->getBody()->getContents());
        return null;
    }
    catch (Exception $ex)
    {
        error_log("render_component failed to render component... " . $ex->getMessage());
    }
}

function render_page_component($url, $query, $tracking_cookie_id, $user_id = null, $is_admin = 0, $spoof_mode = 0)
{
    $ci = &get_instance();
    $client = new Client(['base_uri' => getenv('NODE_PAGES_URL')]);
    $query['trackingCookieId'] = $tracking_cookie_id;
    $query['isAdmin'] = $is_admin;
    $query['isSpoofMode'] = $spoof_mode;
    $query['userId'] = (string) $user_id;
    $query['bearerToken'] = get_bearer_token($user_id, $spoof_mode);
    $query['siteUrl'] = sprintf("%s://%s", ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off')?'https':'http'), $_SERVER['SERVER_NAME']);
    $query['domain'] = $ci->session->userdata('user_cctld');
    try
    {
        $response = $client->get($url, ['query' => $query]);
        if ($response->getStatusCode() == 200)
        {
            return $response->getBody()->getContents();
        }
        error_log("Node server failed for some reason: " . $url . " with query object: " . print_r($query, true) . " and response body: " . $response->getBody()->getContents());
        return null;
    }
    catch (Exception $ex)
    {
        error_log("render_page_component failed to render component for url: " . $url . " with query object: " . print_r($query, true) . " and exception message: " . $ex->getMessage());
        return null;
    }
}

function get_bearer_token($user_id, $spoof_mode = false)
{
    $retVal = null;
    if (!is_null($user_id))
    {
        $client = new Client(['base_uri' => getenv('DATA_API_URL')]);
        $json = [
            'id' => $user_id,
            'api_token' => getenv('DATA_API_KEY')
        ];
        if ($spoof_mode)
        {
            $CI = &get_instance();
            $json['spoof_admin_id'] = $CI->session->userdata('spoof_admin_userid');
        }
        try
        {
            $options = ['json' => $json];
            if (ENVIRONMENT !== 'production')
            {
                $options['verify'] = false;
            }
            $response = $client->post('/auth/token', $options);
            if ($response->getStatusCode() == 200) {
                $retVal = GuzzleHttp\json_decode($response->getBody()->getContents())->access_token;
            }
            else
            {
                error_log("Getting bearer token failed for user: " . $user_id);
            }
        }
        catch (Exception $ex)
        {
            error_log("get_bearer_token failed for user: " . $user_id . " and exception message: " . $ex->getMessage());
        }
    }
    return $retVal;
}