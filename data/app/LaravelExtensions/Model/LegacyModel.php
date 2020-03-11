<?php

namespace App\LaravelExtensions\Model;

use App\LaravelExtensions\Model\MyModel;
use App\Scopes\EnabledScope;

abstract class LegacyModel extends MyModel
{
    protected $hidden = ['enabled'];
    protected $guarded = ['enabled'];
    protected $usesHardDeletes = false;

    protected static function boot()
    {
        parent::boot();
        static::addGlobalScope(new EnabledScope());
    }

    protected function performDeleteOnModel()
    {
        if ($this->usesHardDeletes)
        {
            return $this->newQueryWithoutScopes()->where($this->getKeyName(), $this->getKey())->forceDelete();
        }
        return $this->runSoftDelete();
    }

    protected function runSoftDelete()
    {
        $query = $this->newQueryWithoutScopes()->where($this->getKeyName(), $this->getKey());
        $query->update(['enabled' => 0]);
    }
}