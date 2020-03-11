<?php

namespace App\Models;

use App\LaravelExtensions\Model\LegacyModel;

class EnquiryStatus extends LegacyModel
{
    const PENDING = 1;
    const WON = 2;
    const LOST = 3;
    const ALTERNATIVE = 4;
    const OFFER = 5;
    const VIEWING = 6;
    const SALVAGE = 7;

    public $timestamps = false;
    public $table = 'enquiries_status';
}