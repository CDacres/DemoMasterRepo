<?php

namespace App\Models;

use App\LaravelExtensions\Model\MyModel;
use App\Transformers\ContextTransformer;

class Context extends MyModel
{
    public $table = 'contexts';
    public $incrementing = false;
    static protected $defaultTransformer = ContextTransformer::class;
    static protected $defaultSerialisationLabel = 'contexts';

    public function translations()
    {
        return $this->hasMany(ContextTranslation::class, 'context_id', 'id');
    }
}