<?php

namespace App\Http\Controllers\VersionOne;

use App\Models\Pivots\AssetAttribute;

class AssetAttributes extends AssetDependentController
{
    protected $defaultClass = AssetAttribute::class;
}