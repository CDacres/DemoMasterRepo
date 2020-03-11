<?php

namespace App\Helpers;

use Intervention\Image\Facades\Image;

class ImageHelper extends FileHelper
{
    const HOLDING = "HOLDING";
    const URL = "URL";

    protected $imageType = 'jpg';
    private $saveQuality = 75;
    protected $imageConnection;
    protected $imageContainer;
    private $localImageConnection = 'images_local'; //this is temporary during transition phase. Remove if found, and the refereced if statement below.

    protected $sizes = [          //as width, height in pixels
        'small' => [190, 120],
        'medium' => [300, 200],
        'large' => [639, 428],
        'huge' => [870, 450],
        'banner' => [1056, 300]
    ];

    private function _handleNewImageFromSource($source, $name, $path, $meta)
    {
        ini_set('memory_limit', '2048M');
        $async = $this->_checkForAsync($meta);
        $interImage = Image::make($source);
        $this->_putOriginal($interImage, $name, $path, $async);
        $this->_applyMeta($interImage, $meta);
        $this->_putThumbnails($interImage, $name, $path, $async);
        return $name;
    }

    public function handleNewImageByType($type, $indicator, $name, $path, $meta)
    {
        switch ($type)
        {
            case static::HOLDING:
                return $this->_handleNewImageFromHoldingId($indicator, $name, $path, $meta);
            break;

            case static::URL:
                return $this->_handleNewImageFromUrl($indicator, $name, $path, $meta);
            break;

            default:
                throw new Exception("Unknown image upload type");
            break;
        }
    }

    private function _handleNewImageFromHoldingId($holding_id, $name, $path, $meta)
    {
        $data = $this->getFileFromHolding($holding_id);
        return $this->_handleNewImageFromSource($data, $name, $path, $meta);
    }

    private function _handleNewImageFromUrl($url, $name, $path, $meta)
    {
        $data = file_get_contents(str_replace(' ', '%20', $url));
        return $this->_handleNewImageFromSource($data, $name, $path, $meta);
    }

    protected function _checkForAsync($meta)
    {
        return isset($meta['async']) && $meta['async'];
    }

    public function getUserAvatarThumbPath($userId)
    {
        // $pot_path = "/users/" . $userId . "/userpic_thumb.jpg";
        // if ($this->fileManager($this->imageConnection)->has($pot_path))
        // {
        //     $retPath = '/images' . $pot_path;
        // }
        // else
        // {
            $retPath = "/images/no_avatar_thumb.jpg";
        // }
        return env("SITE_URL") . $retPath;
    }

    public function generateUrl($container, $imageName, $size = '', $pathFolder = '')
    {
        $prefix = '';
        if ($size != '' && isset($this->sizes[$size]))
        {
            $prefix = $this->sizes[$size][0] . "_" . $this->sizes[$size][1] . "_";
        }
        $path = "/" . (($pathFolder != '')?$pathFolder . '/':'') . $prefix . $imageName;
        if ($this->fileManager($this->localImageConnection)->has($path))
        {
            $url = env("SITE_URL") .  "/images" . $path;
        }
        else
        {
            $url = $container . $path;
        }
        return $url;
    }

    private function _applyMeta($interImage, $metaArray)
    {
        foreach ($metaArray as $task => $data)
        {
            switch ($task)
            {
                case 'crop':
                    $this->_crop($interImage, $data);
                break;
            }
        }
    }

    private function _crop($interImage, $data)
    {
        $height = $interImage->height();
        $width = $interImage->width();
        $cropHeight = floor($data['height'] * $height);
        $cropWidth = floor($data['width'] * $width);
        $interImage->crop($cropWidth, $cropHeight, 0, 0);
    }

    public function getOriginalMime($pathFolder, $name)
    {
        return $this->fileManager($this->getDeepStorageConnection())->getMimetype($this->_getDeepStoragePath($pathFolder) . "/" . $name);
    }

    public function getOriginalSize($pathFolder, $name)
    {
        return $this->fileManager($this->getDeepStorageConnection())->getSize($this->_getDeepStoragePath($pathFolder) . "/" . $name);
    }

    public function getOriginal($pathFolder, $name)
    {
        return $this->fileManager($this->getDeepStorageConnection())->read($this->_getDeepStoragePath($pathFolder) . "/" . $name);
    }

    private function _putOriginal($interImage, $name, $pathFolder, $async = false)
    {
        $path = $this->_getDeepStoragePath($pathFolder);
        $interImage->backup();
        $encodedImage = $interImage->encode($this->imageType, $this->saveQuality);
        $this->upload($this->getDeepStorageConnection(), $path . $name, $encodedImage, $async);
        $interImage->reset();
    }

    protected function _getDeepStoragePath($path)
    {
        return $this->slashedPath($this->deepStorageImagesFolder . (($path != '')?'/' . $path:''));
    }

    private function _putThumbnails($interImage, $name, $path, $async = false)
    {
        foreach ($this->sizes as $dimsArray)
        {
            $interImage->backup();
            $location = $this->_generateThumbLocation($name, $dimsArray, $path);
            $rawThumb = $this->_generateThumbImage($interImage, $dimsArray);
            $encodedThumb = $rawThumb->encode($this->imageType, $this->saveQuality);
            $this->upload($this->imageConnection, $location, $encodedThumb, $async);
            $interImage->reset();
        }
    }

    private function _generateThumbLocation($name, $dimsArray, $path)
    {
        return $path . '/' . implode('_', $dimsArray) . '_' . $name;
    }

    private function _generateThumbImage($interImage, $dimsArray)
    {
        $interImage->fit($dimsArray[0], $dimsArray[1], function ($constraint) {
            $constraint->upsize();
        });
        return $interImage;
    }
}