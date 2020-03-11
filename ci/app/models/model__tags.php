<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__tags extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Tag::class);
        parent::__construct();
        $this->load->library('DataAPIWrapper');
    }

    public function get_tag_collection()
    {
        return new Tag___Collection($this->_get_tag_collection());
    }

    private function _get_tag_collection()
    {
        $this->db->select(Tag::id_column());
        $this->db->from(Tag::tableName());
        $this->db->where(Tag::enabled_column(), 1);
        return $this->_query_run(false);
    }

    public function get_tag_meta_by_id($lang_code, $tag_id)
    {
        try
        {
            $response = $this->dataapiwrapper->standard_request('GET', 'tagging/metas_by_tag_id/' . $tag_id, $lang_code);
            $statusCode = $response->getStatusCode();
            if ($statusCode >= 300)
            {
                throw new Exception('Server error: ' . $statusCode. '. Error message:' . $response->getReasonPhrase());
            }
        }
        catch (Exception $ex)
        {
            error_log(new Exception('Request get_tag_meta_by_tag_id failed with the following message: ' . $ex->getMessage()));
            return json_decode('');
        }
        $json = json_decode($response->getBody(), true);
        return new Tag($json);
    }

    public function get_tag_meta_by_slug($lang_code, $tag_slug)
    {
        try
        {
            $response = $this->dataapiwrapper->standard_request('GET', 'tagging/metas_by_slug/' . $tag_slug, $lang_code);
            $statusCode = $response->getStatusCode();
            if ($statusCode >= 300)
            {
                throw new Exception('Server error: ' . $statusCode. '. Error message:' . $response->getReasonPhrase());
            }
        }
        catch (Exception $ex)
        {
            error_log(new Exception('Request get_tag_meta_by_slug failed with the following message: ' . $ex->getMessage()));
            return json_decode('');
        }
        $json = json_decode($response->getBody(), true);
        return new Tag($json);
    }

    public function get_default_tag_by_lang($lang_code)
    {
        try
        {
            $response = $this->dataapiwrapper->standard_request('GET', 'tagging/default_label', $lang_code);
            $statusCode = $response->getStatusCode();
            if ($statusCode >= 300)
            {
                throw new Exception('Server error: ' . $statusCode. '. Error message:' . $response->getReasonPhrase());
            }
        }
        catch (Exception $ex)
        {
            error_log(new Exception('Request get_default_tag_by_lang failed with the following message: ' . $ex->getMessage()));
            return json_decode('');
        }
        $json = json_decode($response->getBody(), true);
        return new Tag($json);
    }

    public function get_default_tags_by_lang($lang_code)
    {
        try
        {
            $response = $this->dataapiwrapper->standard_request('GET', 'tagging/default_labels', $lang_code);
            $statusCode = $response->getStatusCode();
            if ($statusCode >= 300)
            {
                throw new Exception('Server error: ' . $statusCode. '. Error message:' . $response->getReasonPhrase());
            }
        }
        catch (Exception $ex)
        {
            error_log(new Exception('Request get_default_tags_by_lang failed with the following message: ' . $ex->getMessage()));
            return json_decode('');
        }
        $json = json_decode($response->getBody(), true);
        return new Tag___Collection($json);
    }

    public function get_all_tags_by_lang($lang_code)
    {
        try
        {
            $response = $this->dataapiwrapper->standard_request('GET', 'tagging/all_labels', $lang_code);
            $statusCode = $response->getStatusCode();
            if ($statusCode >= 300)
            {
                throw new Exception('Server error: ' . $statusCode. '. Error message:' . $response->getReasonPhrase());
            }
        }
        catch (Exception $ex)
        {
            error_log(new Exception('Request get_all_tags_by_lang failed with the following message: ' . $ex->getMessage()));
            return json_decode('');
        }
        $json = json_decode($response->getBody(), true);
        return new Tag___Collection($json);
    }

    public function get_home_sub_tags_by_lang($lang_code)
    {
        try
        {
            $response = $this->dataapiwrapper->standard_request('GET', 'tagging/home_sub_tags', $lang_code);
            $statusCode = $response->getStatusCode();
            if ($statusCode >= 300)
            {
                throw new Exception('Server error: ' . $statusCode. '. Error message:' . $response->getReasonPhrase());
            }
        }
        catch (Exception $ex)
        {
            error_log(new Exception('Request get_home_sub_tags_by_lang failed with the following message: ' . $ex->getMessage()));
            return json_decode('');
        }
        $json = json_decode($response->getBody(), true);
        return new Tag___Collection($json);
    }

    public function get_tag_label_by_id($lang_code, $id)
    {
        try
        {
            $response = $this->dataapiwrapper->standard_request('GET', 'tagging/label_by_id/' . $id, $lang_code);
            $statusCode = $response->getStatusCode();
            if ($statusCode >= 300)
            {
                throw new Exception('Server error: ' . $statusCode. '. Error message:' . $response->getReasonPhrase());
            }
        }
        catch (Exception $ex)
        {
            error_log(new Exception('Request get_tag_label_by_id failed with the following message: ' . $ex->getMessage()));
            return json_decode('');
        }
        $json = json_decode($response->getBody(), true);
        return new Tag___Collection($json);
    }

    public function get_tag_labels_by_vertical_id($lang_code, $vertical_id)
    {
        try
        {
            $response = $this->dataapiwrapper->standard_request('GET', 'tagging/label_by_vertical_id/' . $vertical_id, $lang_code);
            $statusCode = $response->getStatusCode();
            if ($statusCode >= 300)
            {
                throw new Exception('Server error: ' . $statusCode. '. Error message:' . $response->getReasonPhrase());
            }
        }
        catch (Exception $ex)
        {
            error_log(new Exception('Request get_tag_labels_by_vertical_id failed with the following message: ' . $ex->getMessage()));
            return json_decode('');
        }
        $json = json_decode($response->getBody(), true);
        return new Tag___Collection($json);
    }
}