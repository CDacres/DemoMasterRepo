<?php

namespace App\Http\Controllers\VersionOne;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use App\Helpers\AssetImageHelper;
use App\Helpers\SiteImageHelper;
use App\Helpers\FileHelper;
use App\Models\AssetImage;
use App\Models\SiteImage;

class FileBucket extends BaseController
{
    public function upload_file(Request $request)
    {
        $helper = new FileHelper();
        $name = $helper->putFileInHolding(file_get_contents('php://input'));
        $retArray = [
            'data' => [
                'type' => 'file',
                'id' => $name
            ]
        ];
        return $retArray;
    }

    public function get_original_asset_image(Request $request, $image_id)
    {
        $helper = new AssetImageHelper();
        $image = AssetImage::findOrFail($image_id);
        return $this->_get_original_image($helper, $image->name, $image->asset_id);
    }

    public function get_original_site_image(Request $request, $image_id)
    {
        $helper = new SiteImageHelper();
        $image = SiteImage::findOrFail($image_id);
        return $this->_get_original_image($helper, $image->name);
    }

    private function _get_original_image($helper, $name, $pathFolder = '')
    {
        $file = $helper->getOriginal($pathFolder, $name);
        $path = $helper->stageForDownload($file, 1);
        $retArray = [
            'data' => [
                'type' => 'file',
                'path' => $path
            ]
        ];
        return $retArray;
    }
}
