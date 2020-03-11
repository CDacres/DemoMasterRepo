<?php

namespace App\ORM;

use App\Helpers\AssetImageHelper;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
  public $timestamps = false;
  public $table = 'asset_photos';
  public $guarded = [];

  private $_imageHelper;

  public function asset()
  {
    return $this->belongsTo(Asset::class);
  }

  public function type()
  {
    return $this->belongsTo(ImageType::class, 'image_type_id', 'id');
  }

  public function tags() {
    return $this->hasManyThrough(Tag::class, ImageTag::class, 'image_id', 'id', 'id', 'tag_id');
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
}
