<?php

namespace App\Events;

use App\Models\Company;

class CompanyCreatingEvent extends Event
{
    public function __construct(Company $company)
    {
        $company->approved = 1;
        $company->approved_datetime = date("Y-m-d H:i:s");
    }
}