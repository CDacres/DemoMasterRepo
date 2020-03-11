<?php

namespace App\Helpers;

use App\Jobs\Images\DeferredImageHandler;

class AssetImageHelper extends ImageHelper
{
    protected $deepStorageImagesFolder = 'asset_images';

    public function __construct()
    {
        $this->imageConnection = env('IMAGES_CONNECTION');
        $this->imageContainer = env('IMAGES_URL');
    }

    public function handleNewAssetImageFromHoldingId($holding_id, $assetId, $meta = [])
    {
        return $this->_handleNewAssetImageWrapper(static::HOLDING, $holding_id, $assetId, $meta);
    }

    public function handleNewAssetImageFromUrl($url, $assetId, $meta = [])
    {
        return $this->_handleNewAssetImageWrapper(static::URL, $url, $assetId, $meta);
    }

    private function _handleNewAssetImageWrapper($type, $indicator, $path, $meta)
    {
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

    public function purgeAssetImages($assetId, $async = false)
    {
        $this->deleteDir($this->getDeepStorageConnection(), $this->_getDeepStoragePath($assetId), $async);
        $this->deleteDir($this->imageConnection, $assetId, $async);
    }

    public function generateAssetUrl($pathFolder, $imageName, $size = '')
    {
        return parent::generateUrl($this->imageContainer, $imageName, $size, $pathFolder);
    }
}