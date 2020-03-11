<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

abstract class Model_Base__Unbound extends MY_Model
{
    abstract function get_base_object_by_id($id, $userRequested = false);
    abstract function get_base_object_by_constraints($constraintArray);
    abstract function insert_update($object, $userRequested = false);
}