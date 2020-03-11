<?php

namespace App\Http\Controllers\VersionOne;

use App\Models\Booking\CancellationTerm;

class CancellationTerms extends AssetDependentController
{
    protected $defaultClass = CancellationTerm::class;
}