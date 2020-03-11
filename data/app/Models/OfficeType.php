<?php

namespace App\Models;

use App\LaravelExtensions\Model\MyModel;
use App\Transformers\OfficeTypeTransformer;

class OfficeType extends MyModel
{
    static protected $defaultTransformer = OfficeTypeTransformer::class;
    static protected $defaultSerialisationLabel = 'office_type';
    public $timestamps = false;
    public $table = 'office_types';

    const HOTDESK = 1;
    const DEDICATEDDESK = 2;
    const PRIVATEOFFICE = 3;
}