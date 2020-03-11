<?php

namespace App\Http\Controllers\VersionOne;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\SiteImage;

class SiteImages extends Controller
{
    protected $defaultClass = SiteImage::class;

    public function find(Request $request, $image_id)
    {
        $image = SiteImage::find($image_id);
        return $this->serialisedJsonResponse($image);
    }
}