<?php

namespace App\Helpers;
use GuzzleHttp\Client;
use Exception;

use App\Contracts\Facades\ChannelLog as Log;

class AnalyticsHelper
{
    static function register_step($type, $cookie_id, $lang, $admin_id = null, $cf1v = null, $cf2v = null, $cf3v = null, $cf4v = null)
    {
        $endpoint = env('ANALYTICS_API_URL') . "/user_journeys/events/" . $type;
        $body = [
            'json' => ['api_token' => env('ANALYTICS_API_KEY'),
                'tracking_cookie_id' => $cookie_id,
                'language' => $lang,
                'admin_id' => $admin_id,
                'context_field_1_value' => $cf1v,
                'context_field_2_value' => $cf2v,
                'context_field_3_value' => $cf3v,
                'context_field_4_value' => $cf4v
            ]
        ];
        static::_ping_api('POST', $endpoint, $body);
    }

    static function get_recent_events($user_id, $events = 'ALL', $sort = 'DESC', $limit = "")
    {
        $endpoint = env('ANALYTICS_API_URL') . '/user_journeys/stories/' . $user_id . '/' . $events. '/' . $sort . '/' . $limit . '?api_token=' . env('ANALYTICS_API_KEY');
        $return_array = static::_ping_api('GET', $endpoint, []);
        return $return_array;
    }

    static function get_cohort($cohort_label)
    {
        $endpoint = env('ANALYTICS_API_URL') . '/cohorts/' . $cohort_label . '?api_token=' . env('ANALYTICS_API_KEY');
        $cohort_array = static::_ping_api('GET', $endpoint, []);
        return $cohort_array;
    }

    static function _ping_api($type, $endpoint, $body)
    {
        try {
            $options = [];
            $env = new EnvHelper();
            if ($env->acceptsInsecureCertificates())
            {
                $options['verify'] = false;
            }
            $client = new Client($options);
            $response = $client->request($type, $endpoint, $body);
            $statusCode = $response->getStatusCode();
            if ($statusCode >= 300)
            {
                throw new Exception('Server error: ' . $statusCode. '. Error message:' . $response->getReasonPhrase());
            }
            return json_decode($response->getBody());
        }
        catch (Exception $ex)
        {
            Log::error('The analytics API request failed with the following message: ' . $ex->getMessage(), 'default', ['type' => $type, 'endpoint' => $endpoint, 'body' => $body]);
            return json_decode("");
        }
    }
}