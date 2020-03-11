<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

use GuzzleHttp\Client;

class DataAPIWrapper
{
    protected $domain;
    protected $client;
    protected $version = 'v1';

    public function __construct()
    {
        $this->domain = getenv('DATA_API_URL');
    }

    public function standard_request($method, $uri = '', $lang = 'en', $options = [])
    {
        $url = $this->domain . '/api/' . $uri;
        return $this->client($lang)->request($method, $url, $options);
    }

    public function client($lang, $auth_token = null)
    {
        $options = [
            'headers' => [
                'Accept'     => 'application/vnd.zip_api.' . $this->version . '+json',
                'Accept-Language'      => $lang
            ]
        ];
        if ($auth_token !== null)
        {
            $options['headers']['Authorization'] = 'Bearer ' . $auth_token;
        }
        if (getenv('ENVIRONMENT') !== 'production')
        {
            $options['verify'] = false;
        }
        return new Client($options);
    }
}
