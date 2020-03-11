<?php

namespace App\Http\Controllers\VersionOne;
use App\Http\Controllers\Controller;

use App\Models\CompanyAsset;

class Companies extends Controller
{
    protected $_relationshipValidation = [];

    protected $defaultClass = CompanyAsset::class;
}