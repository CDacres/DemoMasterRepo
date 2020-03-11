<?php
namespace App\Concerns;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use InvalidArgumentException;

trait CanCompare
{
    public function differsFrom($comparator)
    {
        if (is_null($comparator))
        {
            return true;
        }
        if (!($comparator instanceof Model))
        {
            throw new InvalidArgumentException('differsFrom requires an Elqouent model');
        }
        if (!$this->is($comparator))
        {
            return true;
        }
        return $this->attributesDiffer($comparator) || $this->relationsDiffer($comparator);
    }

    public function attributesDiffer(Model $comparator)
    {
        return $this->_arraysDiffer($this->attributes, $comparator->attributes);
    }

    public function relationsDiffer(Model $comparator)
    {
        $differs = false;
        $relations = array_unique(array_merge(array_keys($this->relations), array_keys($comparator->relations)));
        foreach ($relations as $relation)
        {
            if (isset($this->relations[$relation]) && isset($comparator->relations[$relation]))
            {
                $differs = $this->relationGroupDiffers($this->relations[$relation], $comparator->relations[$relation]);
            }
            else
            {
                $differs = true;
            }
            if ($differs)
            {
                break;
            }
        }
        return $differs;
    }

    public function relationGroupDiffers($first, $second)
    {
        if ($first instanceof Collection)
        {
            if (!($second instanceof Collection))
            {
                return true;
            }
            return $first->contains(function ($model, $key) use ($second) {
                return $model->differsFrom($second->get($key));
            });
        }
        else
        {
            if (method_exists($first, 'differsFrom'))
            {
                return $first->differsFrom($second);
            }
            else
            {
                return $this->_arraysDiffer($first->toArray(), $second->toArray());
            }
        }
        return false;
    }

    private function _arraysDiffer($first = [], $second = [])
    {
        return (count(array_diff($first, $second)) > 0);
    }
}