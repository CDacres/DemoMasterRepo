<?php

namespace App\Helpers;

use Illuminate\Support\Facades\App;
use App\Jobs\Files\DeferredFileUpload;
use App\Jobs\Files\DeferredDirDeletion;
use App\Jobs\Files\DeferredFileDeletion;
// use App\Contracts\Facades\ChannelLog as Log; //TODO: logging. Here and everywhere

class FileHelper
{
    protected $holdingConnection = 'holding';
    protected $downloadConnection = 'download';
    protected $deepStorageConnection = null;
    protected $fileManager;

    public function fileManager($connection = null)
    {
        if (is_null($this->fileManager))
        {
            $this->fileManager = App::make('App\InjectionWrappers\FlySystem')->manager;
        }
        return $this->fileManager->connection($connection);
    }

    public function putUnique($file, $connection = null, $ext = null, $path = '')
    {
        $name = $this->generateUniqueFileName($ext, $path, $connection);
        $this->fileManager($connection)->put($this->slashedPath($path) . $name, $file);
        return $name;
    }

    public function deleteFile($connection, $tag, $async = false, $minutesDelay = 0)
    {
        if ($async || $minutesDelay !== 0)
        {
            dispatch((new DeferredFileDeletion($connection, $tag))->delay($minutesDelay * 60));
        }
        else
        {
            $this->fileManager($connection)->delete($tag);
        }
    }

    public function deleteDir($connection, $path, $async = false)
    {
        if ($async)
        {
            dispatch(new DeferredDirDeletion($connection, $path));
        }
        else
        {
            $this->fileManager($connection)->deleteDir($path);
        }
    }

    public function generateFileName($ext = null)
    {
        mt_srand();
        $extString = is_null($ext) ? '' : '.' . $ext;
        return md5(uniqid(mt_rand())) . $extString;
    }

    public function generateUniqueFileName($ext = null, $path = '', $connection = null)
    {
        if (strlen($path) > 0)
        {
            $path = rtrim($path, '/') . '/';
        }
        $filename = $this->generateFileName($ext);
        if ($this->fileManager($connection)->has($this->slashedPath($path) . $filename))
        {
            return $this->generateUniqueFileName($ext, $path, $connection);
        }
        else
        {
            return $filename;
        }
    }

    public function slashedPath($path)
    {
        if (strlen($path) > 0)
        {
            $path = rtrim($path, '/') . '/';
        }
        return $path;
    }

    public function getDeepStorageConnection()
    {
        if (is_null($this->deepStorageConnection))
        {
            $this->deepStorageConnection = env('DEEP_STORAGE_CONNECTION');
        }
        return $this->deepStorageConnection;
    }

    public function putFileInHolding($file, $lifeInMinutes = 5)
    {
        $fileWrapper = [];
        $fileWrapper['data'] = $file;
        $serialisedWrapper = serialize($fileWrapper);
        $name = $this->putUnique($serialisedWrapper, $this->holdingConnection);
        $this->deleteFile($this->holdingConnection, $name, true, $lifeInMinutes);
        return $name;
    }

    public function getFileFromHolding($holding_id)
    {
        $serialisedWrapper = $this->fileManager($this->holdingConnection)->get($holding_id)->read();
        $fileWrapper = unserialize($serialisedWrapper);
        return $fileWrapper['data'];
    }

    public function upload($connection, $tag, $item, $async = false)
    {
        if ($async)
        {
            $holding_id = $this->putFileInHolding($item);
            dispatch(new DeferredFileUpload($connection, $tag, $holding_id));
        }
        else
        {
            $this->fileManager($connection)->put($tag, $item);
        }
    }

    public function stageForDownload($file, $lifeInMinutes = 1)
    {
        $name = $this->putUnique($file, $this->downloadConnection);
        $this->deleteFile($this->downloadConnection, $name, true, $lifeInMinutes);
        return env('FILE_DOWNLOAD_URL') . $name;
    }
}