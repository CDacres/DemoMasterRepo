<?php

namespace App\Http\Controllers\VersionOne;
use App\Models\Booking\AssetDiscount;

class AssetDiscounts extends AssetDependentController
{
    protected $defaultClass = AssetDiscount::class;
}