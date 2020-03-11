<?php

namespace App\Models;
use App\LaravelExtensions\Model\MyModel;
use App\Transformers\DiningPeriodTransformer;
use Waavi\Translation\Traits\Translatable;

class DiningPeriod extends MyModel
{
    use Translatable;
    protected $translatableAttributes = ['name'];

    static protected $defaultTransformer = DiningPeriodTransformer::class;
    static protected $defaultSerialisationLabel = 'dining_periods';
    public $table = 'dining_periods';
    public $timestamps = false;
}