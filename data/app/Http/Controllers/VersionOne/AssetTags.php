<?php

namespace App\Http\Controllers\VersionOne;

use App\Models\Pivots\AssetTag;

class AssetTags extends AssetDependentController
{
    protected $defaultClass = AssetTag::class;
}