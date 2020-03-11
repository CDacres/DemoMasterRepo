<?php

namespace App\Models;
use App\LaravelExtensions\Model\LegacyModel;
use App\Helpers\AssetImageHelper;
use App\Transformers\AssetImageTransformer;
use App\Models\Configuration;
use App\Models\Pivots\ImageTag;
use Dingo\Api\Exception\ValidationHttpException;

use App\Events\AssetImageCreatingEvent;

class AssetImage extends LegacyModel
{
    public $timestamps = false;
    public $table = 'asset_photos';
    static protected $defaultTransformer = AssetImageTransformer::class;
    static protected $defaultSerialisationLabel = 'asset_images';
    private $_imageHelper;
    protected $fillable = ['is_featured'];

    protected $dispatchesEvents = ['creating' => AssetImageCreatingEvent::class];

    public function __construct(array $attributes = [])
    {
        $this->addFillableRelationship('configuration', 'configuration_id');
        $this->addFillableRelationship('type', 'image_type_id');
        parent::__construct($attributes);
    }

    public function asset()
    {
        return $this->belongsTo(Asset::class);
    }

    public function type()
    {
        return $this->belongsTo(ImageType::class, 'image_type_id', 'id');
    }

    public function configuration()
    {
        return $this->belongsTo(Configuration::class, 'configuration_id', 'id');
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

    private function _imageHelper()
    {
        if ($this->_imageHelper === null)
        {
            $this->_imageHelper = new AssetImageHelper();
        }
        return $this->_imageHelper;
    }

    private function _generate_url($size = '')
    {
        return $this->_imageHelper()->generateAssetUrl($this->asset_id, $this->name, $size);
    }

    protected $casts = [
        'flagged' => 'boolean',
        'cosmetic' => 'boolean'
    ];

    protected $appends = [
        'url',
        'huge_url',
        'large_url',
        'medium_url',
        'small_url'
    ];

    public function createFromRequestHelper($reqHelper)
    {
        $asset_id = $reqHelper->getJSONRelationshipId('asset');
        $helper = new AssetImageHelper();
        if ($reqHelper->requestHasAttribute('file_id'))
        {
            $name = $helper->handleNewAssetImageFromHoldingId($reqHelper->getJSONAttribute('file_id'), $asset_id, $reqHelper->getJSONMetaArray());
        }
        elseif ($reqHelper->requestHasAttribute('url'))
        {
            $name = $helper->handleNewAssetImageFromUrl($reqHelper->getJSONAttribute('url'), $asset_id, $reqHelper->getJSONMetaArray());
        }
        else
        {
            throw new ValidationHttpException(['No image hook given. Please include either a file id or url']);
        }
        $this->fillFromRequestHelper($reqHelper);
        $this->asset_id = $asset_id;
        $this->name = $name;
        $this->save();
        $this->_ensureFeaturedSingletonExists($asset_id);
        $asset = Asset::findOrFail($asset_id);
        $asset->images()->save($this);
        return AssetImage::findOrFail($this->id);
    }

    public function save(array $options = [], $checkSingleton = true)
    {
        $needsChecking = $this->isDirty('is_featured');
        parent::save($options);
        if ($checkSingleton && $needsChecking)
        {
            $this->_ifFeaturedEnsureSingleton();
        }
    }

    public function delete()
    {
        $this->is_featured = false;
        $this->save([], false);
        parent::delete();
        $this->_ensureFeaturedSingletonExists($this->asset_id);
    }

    private function _ifFeaturedEnsureSingleton()
    {
        if ($this->is_featured)
        {
            AssetImage::where('asset_id', $this->asset_id)
                ->where('id', '!=', $this->id)
                ->update(["is_featured" => false]);
        }
        else
        {
            $this->_ensureFeaturedSingletonExists($this->asset_id);
        }
    }

    private function _ensureFeaturedSingletonExists($asset_id)
    {
        $imageCollection = AssetImage::where('asset_id', $asset_id)->where('image_type_id', ImageType::ASSET)->get();
        if ($imageCollection->count() > 0 && !$imageCollection->contains('is_featured', true))
        {
            $chosenImage = $imageCollection->first();
            $chosenImage->is_featured = true;
            $chosenImage->save([], false);
        }
    }

    public function image_tags()
    {
        return $this->hasMany(ImageTag::class, 'image_id', 'id');
    }
}
