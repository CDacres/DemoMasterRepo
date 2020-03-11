<?php

namespace App\Models;

abstract class DetailsAsset extends Asset
{
    protected $_detailsType;

    public function __construct(array $attributes = [])
    {
        $this->_setDependency('details');
        parent::__construct($attributes);
    }

    public function details()
    {
        return $this->hasOne($this->_detailsType, 'asset_id', 'id');
    }

    public function getNameAttribute()
    {
        return $this->details->name;
    }

    public function getDetailsIdAttribute()
    {
        return $this->details->id;
    }

    public function getUrlAttribute()
    {
        return $this->details->url;
    }

    public function scopeWithDetails($query)
    {
        return parent::scopeWithDetails($query)->with([
            'details',
            'details.venue'
        ]);
    }

    public function save(array $options = [])
    {
        $saved = parent::save($options) && $this->saveDetails();
        $this->_clearProtoDependency('details');
        return $saved;
    }

    public function saveDetails()
    {
        $details = $this->details;
        $saved = $this->details()->save($details);
        if ($saved && is_null($this->reference_id) && !is_null($details) && !is_null($details->id))
        {
            $this->reference_id = $details->id;
            $saved = parent::save();
        }
        return $saved;
    }

    public function fill(array $fillArray)
    {
        parent::fill($fillArray);
        if (!empty($fillArray))
        {
            $this->details = (new $this->_detailsType)->fill($fillArray);
        }
        return $this;
    }

    public function patchMerge($patchArray)
    {
        $this->details->patchMerge($patchArray);
        return parent::patchMerge($patchArray);
    }
}