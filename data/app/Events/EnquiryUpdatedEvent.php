<?php

namespace App\Events;

use App\Models\Enquiry;

class EnquiryUpdatedEvent extends Event
{
    public function __construct(Enquiry $enquiry)
    {
        if (!$enquiry->audit_is_suppressed())
        {
            $this->_run_audit_event($enquiry);
        }
    }

    private function _run_audit_event($enquiry)
    {
        return new EnquiryAuditEvent($enquiry);
    }
}