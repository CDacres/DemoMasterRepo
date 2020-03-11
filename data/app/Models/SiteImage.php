<?php

namespace App\Models;
use App\LaravelExtensions\Model\MyModel;
use App\Helpers\SiteImageHelper;
use App\Transformers\SiteImageTransformer;
use Dingo\Api\Exception\ValidationHttpException;

class SiteImage extends MyModel
{
    public $table = 'site_images';
    static protected $defaultTransformer = SiteImageTransformer::class;
    static protected $defaultSerialisationLabel = 'site_images';
    private $_imageHelper;

    public function __construct(array $attributes = [])
    {
        $this->addFillableRelationship('type', 'image_type_id');
        parent::__construct($attributes);
    }

    public function type()
    {
        return $this->belongsTo(ImageType::class, 'image_type_id', 'id');
    }

    public function getUrlAttribute()
    {
        return $this->_generate_url();
    }

    public function getLargeUrlAttribute()
    {
        return $this->_generate_url('large');
    }

    public function getMediumUrlAttribute()
    {
        return $this->_generate_url('medium');
    }

    public function getSmallUrlAttribute()
    {
        return $this->_generate_url('small');
    }

    public function getHugeUrlAttribute()
    {
        return $this->_generate_url('huge');
    }

    public function getBannerUrlAttribute()
    {
        return $this->_generate_url('banner');
    }

    private function _imageHelper()
    {
        if ($this->_imageHelper === null)
        {
            $this->_imageHelper = new SiteImageHelper();
        }
        return $this->_imageHelper;
    }

    private function _generate_url($size = '')
    {
        return $this->_imageHelper()->generateSiteUrl($this->name, $size);
    }

    protected $appends = [
        'url',
        'banner_url',
        'huge_url',
        'large_url',
        'medium_url',
        'small_url'
    ];

    public function createFromRequestHelper($reqHelper)
    {
        $helper = new SiteImageHelper();
        if ($reqHelper->requestHasAttribute('file_id'))
        {
            $name = $helper->handleNewSiteImageFromHoldingId($reqHelper->getJSONAttribute('file_id'), $reqHelper->getJSONMetaArray());
        }
        elseif ($reqHelper->requestHasAttribute('url'))
        {
            $name = $helper->handleNewSiteImageFromUrl($reqHelper->getJSONAttribute('url'), $reqHelper->getJSONMetaArray());
        }
        else
        {
            throw new ValidationHttpException(['No image hook given. Please include either a file id or url']);
        }
        $this->fillFromRequestHelper($reqHelper);
        $this->name = $name;
        $this->save();
        return SiteImage::findOrFail($this->id);
    }
}