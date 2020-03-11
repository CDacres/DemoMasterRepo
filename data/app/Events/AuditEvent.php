<?php

namespace App\Events;

class AuditEvent extends Event
{
    public function __construct($auditItem)
    {
        $objectType = $this->_baseClass;
        $audit = new $objectType();
        $this->_set_item_id($audit, $auditItem);
        $this->_set_status_id($audit, $auditItem);
        $audit->user_id = $auditItem->get_audit_user_id();
        $audit->dateTime = date("Y-m-d H:i:s");
        $audit->save();
    }

    private function _set_item_id($audit, $auditItem)
    {
        $auditField = $audit->get_id_field();
        $audit->$auditField = $auditItem->id;
    }

    private function _set_status_id($audit, $auditItem)
    {
        $auditField = $audit->get_status_field();
        $audit->$auditField = $auditItem->get_status_id();
    }
}