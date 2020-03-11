<?php

namespace App\LaravelExtensions\Transformers;

use League\Fractal;
use Illuminate\Contracts\Auth\Access\Authorizable;
use App\Models\Fakes\ImpotentUser;
use App\Helpers\CastHelper;
use App\Exceptions\CastingException;

class ExtendedTransformer extends Fractal\TransformerAbstract
{
    protected $contextUser;

    public function __construct(Authorizable $user = null)
    {
        $this->contextUser = $user ?: new ImpotentUser();
        $this->castHelper = new CastHelper();
    }

    protected function _nullableValue($value, $type)
    {
        if (!$this->castHelper->checkCast($type))
        {
            throw new CastingException("Unsuitable casting type: " . $type);
        }
        if (is_null($value))
        {
            return null;
        }
        settype($value, $type);
        return $value;
    }

    protected function item($data, $transformer, $resourceKey = null)
    {
        if (is_null($data))
        {
            return null;
        }
        return parent::item($data, $transformer, $resourceKey);
    }

    protected function quickItem($data)
    {
        if (is_null($data))
        {
            return null;
        }
        $staticClass = get_class($data);
        $transformerClass = $staticClass::defaultTransformer();
        $transformer = new $transformerClass($this->contextUser);
        $resourceKey = $staticClass::defaultSerialisationLabel();
        return $this->item($data, $transformer, $resourceKey);
    }
}