<?php

namespace App\Events;

use App\Models\Enquiry;

class EnquiryCreatingEvent extends Event
{
    public function __construct(Enquiry $enquiry)
    {
        $enquiry->created = date("Y-m-d H:i:s");
    }
}