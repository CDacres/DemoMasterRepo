<?php

namespace App\Http\Controllers\VersionOne;
use App\Http\Controllers\Controller;

use App\Models\Mirror;

class Mirrors extends Controller
{
    protected $_attributeValidation = [];
    protected $_relationshipValidation = [];

    protected $defaultClass = Mirror::class;
}