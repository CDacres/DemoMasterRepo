<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model_Base__Auditor extends Model_Base__Object
{
    public function audit(Interface__Auditable $auditItem)
    {
        $objectType = $this->_get_base_class();
        $auditObject = new $objectType();
        $auditObject->set_item_id($auditItem->get_id());
        $auditObject->set_status_id($auditItem->get_status_id());
        $auditObject->set('user_id', $this->get_user_id());
        $auditObject->set('date_time', date("Y-m-d H:i:s"));
        $this->insert_update($auditObject);
    }
}