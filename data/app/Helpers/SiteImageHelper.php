<?php

namespace App\Helpers;

use App\Jobs\Images\DeferredImageHandler;

class SiteImageHelper extends ImageHelper
{
    protected $deepStorageImagesFolder = 'site_images';

    public function __construct()
    {
        $this->imageConnection = env('SITE_IMAGES_CONNECTION');
        $this->imageContainer = env('SITE_IMAGES_URL');
    }

    public function handleNewSiteImageFromHoldingId($holding_id, $meta = [])
    {
        return $this->_handleNewSiteImageWrapper(static::HOLDING, $holding_id, $meta);
    }

    public function handleNewSiteImageFromUrl($url, $meta = [])
    {
        return $this->_handleNewSiteImageWrapper(static::URL, $url, $meta);
    }

    private function _handleNewSiteImageWrapper($type, $indicator, $meta)
    {
        $path = '';
        $name = $this->generateFileName($this->imageType, $path, $this->getDeepStorageConnection());
        if ($this->_checkForAsync($meta))
        {
            dispatch(new DeferredImageHandler($type, $indicator, $name, $path, $meta));
        }
        else
        {
            $this->handleNewImageByType($type, $indicator, $name, $path, $meta);
        }
        return $name;
    }

    public function generateSiteUrl($imageName, $size = '')
    {
        return parent::generateUrl($this->imageContainer, $imageName, $size);
    }
}