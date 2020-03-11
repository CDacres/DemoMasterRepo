<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Base__Null
{
    function __construct()
    {
    }

    public function exist()
    {
        return false;
    }

    public function exists_in_db()
    {
        return false;
    }

    public function is_null_object()
    {
        return true;
    }

    public function is_empty()
    {
        return true;
    }

    public function object()
    {
        yield $this->identifier() => $this;
    }

    public function get_as_ajax_response($message = false, $forceSuccess = false, $overrideData = []) // Empty is only an error if an error message is included. Otherwise assumed to be expected contingency.
    {
        if (!empty($overrideData))
        {
            $data = $overrideData;
        }
        else
        {
            $data = $this->get_as_array();
        }
        if ($forceSuccess)
        {
            $errorArray = [
                'occurred' => false,
                'message' => $message
            ];
        }
        elseif (empty($data) && $message !== false)
        {
            $errorArray = [
                'occurred' => true,
                'message' => $message
            ];
        }
        else
        {
            $errorArray = [
                'occurred' => false,
                'message' => null
            ];
        }
        return json_encode([
            'error' => $errorArray,
            'data' => $data
        ]);
    }

    public function get_as_array($data = [])
    {
        return $data;
    }

    public function identifier()
    {
        return null;
    }
}