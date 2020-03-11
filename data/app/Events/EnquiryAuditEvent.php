<?php

namespace App\Events;

use App\Models\Enquiry;
use App\Models\EnquiryAudit;

class EnquiryAuditEvent extends AuditEvent
{
    public function __construct(Enquiry $enquiry)
    {
        $this->_baseClass = EnquiryAudit::class;
        parent::__construct($enquiry);
    }
}