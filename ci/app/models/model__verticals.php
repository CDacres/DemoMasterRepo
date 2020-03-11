<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__verticals extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Vertical::class);
        parent::__construct();
        $this->load->library('DataAPIWrapper');
    }

    public function get_all_vertical_collection($lang_code)
    {
        try
        {
            $response = $this->dataapiwrapper->standard_request('GET', 'verticals', $lang_code);
            $statusCode = $response->getStatusCode();
            if ($statusCode >= 300)
            {
                throw new Exception('Server error: ' . $statusCode. '. Error message:' . $response->getReasonPhrase());
            }
        }
        catch (Exception $ex)
        {
            error_log(new Exception('Request get_all_verticals failed with the following message: ' . $ex->getMessage()));
            return json_decode('');
        }
        $json = json_decode($response->getBody(), true);
        return new Vertical___Collection($json);
    }
}