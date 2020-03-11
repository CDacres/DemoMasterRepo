<?php

namespace App\Models\Fakes;

use App\Transformers\StandardTransformer;

use App\Models\Room;

class Widget extends Room
{
    static protected $defaultTransformer = StandardTransformer::class;
    static protected $defaultSerialisationLabel = 'widget';
}