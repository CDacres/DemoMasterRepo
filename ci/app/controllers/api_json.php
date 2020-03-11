<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

/**
 * Zipcube API JSON Controller Class
 *
 * Central point for standard api calls
 *
 * @package		Zipcube
 * @subpackage          Controllers
 * @category            API
 * @author		Will
 * @version		Version 2.0
 * @link		www.zipcube.com

 */

class api_json extends Controller_Base__Public
{
    public function index($rawClassName, $id = null)
    {
        try
        {
            $className = ucfirst($rawClassName);
            if (!class_exists($className))
            {
                throw new Exception("Invalid class name - " . $className);
            }
            $modelName = $className::modelName();
            $this->load->model($modelName);
            $postData = $this->input->post();
            $getData = $this->input->get();
            if ($id !== null)
            {
                $userRequested = true;
                $objectName = new $className();
                if (method_exists($objectName, 'getUserRequest'))
                {
                    $userRequested = $objectName->getUserRequest();
                }
                $this->_validate_model_input($className, 'id', $id);
                $object = $this->$modelName->get_base_object_by_id($id, $userRequested);
            }
            elseif ($getData)
            {
                $this->_validate_model_input($className, $getData);
                $object = $this->$modelName->get_base_object_collection_by_constraints($getData, true);
            }
            else
            {
                $object = new $className();
            }
            if ($postData)
            {
                $object->set($postData, null, false);
                $retObj = $this->$modelName->insert_update($object, true);
            }
            else
            {
                //throw new Exception("This API is not currently serving standalone GET requests.");
                if ($object->exists_in_db())
                {
                    $retObj = $object;
                }
                else
                {
                    $retObj = new Base__Null();
                }
            }
            echo $retObj->get_as_ajax_response("API call failed. Please check the documentation and try again.");
        }
        catch (Exception $ex)
        {
            $errorMessage = $ex->getMessage() . ' Please call our support team on ' . $this->get_phone_number_display() . '.';
            if (defined('ENVIRONMENT') && ENVIRONMENT === 'development')
            {
                $errorMessage .= " " . $this->db->last_query();
            }
            echo $this->_generate_ajax_error($errorMessage);
        }
    }
}