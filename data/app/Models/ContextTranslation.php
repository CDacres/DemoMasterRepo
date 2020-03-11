<?php

namespace App\Models;

use App\LaravelExtensions\Model\MyModel;

class ContextTranslation extends MyModel
{
    use \Waavi\Translation\Traits\Translatable;

    protected $translatableAttributes = ['text'];

    public $table = 'context_translations';
}