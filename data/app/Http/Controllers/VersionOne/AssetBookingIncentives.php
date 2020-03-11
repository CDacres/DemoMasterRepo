<?php

namespace App\Http\Controllers\VersionOne;
use App\Models\Booking\AssetBookingIncentive;

class AssetBookingIncentives extends AssetDependentController
{
    protected $defaultClass = AssetBookingIncentive::class;
}