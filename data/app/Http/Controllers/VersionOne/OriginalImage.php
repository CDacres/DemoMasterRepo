<?php

namespace App\Http\Controllers\VersionOne;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use App\Helpers\AssetImageHelper;
//use App\Helpers\SiteImageHelper;
use App\Models\AssetImage;
//use App\Models\SiteImage;

class OriginalImage extends BaseController
{
    public function get_original_asset_image(Request $request, $token)
    {
        $helper = new AssetImageHelper();
        $image = AssetImage::where('token', $token)->get()->first();
        return $this->_get_original_image($helper, $image->name, $image->asset_id);
    }

//    public function get_original_site_image(Request $request, $token)
//    {
//        $helper = new SiteImageHelper();
//        $image = SiteImage::where('token', $token)->get()->first();
//        return $this->_get_original_image($helper, $image->name);
//    }

    private function _get_original_image($helper, $name, $pathFolder = '')
    {
        $mime = $helper->getOriginalMime($pathFolder, $name);
        if ($mime)
        {
            header("Content-Type: " . $mime);
        }
        $size = $helper->getOriginalSize($pathFolder, $name);
        if ($size)
        {
            header("Content-Length: " . $size);
        }
        header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE, PATCH");
        header("Access-Control-Allow-Headers: Content-Type, X-Auth-Token, Origin, Authorization, X-Zip-Inflection, Accept-Language");
        header("Access-Control-Allow-Origin: " . env('SITE_URL'));
        echo $helper->getOriginal($pathFolder, $name);
    }
}