<?php

namespace App\LaravelExtensions\Model;

use Illuminate\Database\Eloquent\Model;
use App\LaravelExtensions\Query\MyQueryBuilder;
use App\LaravelExtensions\Model\MyCollection;
use App\Transformers\DefaultTransformer;
use App\Concerns\CanCompare;

abstract class MyModel extends Model
{
    static protected $defaultTransformer = DefaultTransformer::class;
    static protected $defaultSerialisationLabel = null;

    use CanCompare;

    private $_protoDependenciesArray = [];
    private $_protoDependencies = [];
    protected $fillableRelationships = [];
    /**
     * Get a new query builder instance for the connection.
     *
     * @return \App\LaravelExtensions\Query\MyQueryBuilder
     */
    protected function newBaseQueryBuilder()
    {
        $connection = $this->getConnection();
        return new MyQueryBuilder(
            $connection, $connection->getQueryGrammar(), $connection->getPostProcessor()
        );
    }

    protected function addFillableRelationship($relationshipName, $relationshipIdAttribute)
    {
        $this->fillableRelationships[$relationshipIdAttribute] = $relationshipName;
        $this->fillable[] = $relationshipIdAttribute;
    }

    protected function hasEmptyRelationship($relationName)
    {
        $relationObject = $this->$relationName;
        return is_null($relationObject) || $relationObject->isEmpty();
    }

    public function getFillableRelationships()
    {
        return $this->fillableRelationships;
    }

    public function newCollection(array $models = [])
    {
        $thisClass = get_class($this);
        $collClass = $thisClass . 'Collection';
        $newCollection = null;
        $parentClass = get_parent_class($thisClass);
        if (class_exists($collClass))
        {
            $newCollection = new $collClass($models);
        }
        elseif ($parentClass !== __CLASS__ && method_exists($parentClass, 'collection'))
        {
            $newCollection = $parentClass::collection($models);
        }
        else
        {
            $newCollection = new MyCollection($models);
        }
        $newCollection->set_object_type($thisClass);
        return $newCollection;
    }

    static public function defaultTransformer()
    {
        return static::$defaultTransformer;
    }

    static public function defaultSerialisationLabel()
    {
        return static::$defaultSerialisationLabel;
    }

    static public function keyName()
    {
        return (new static)->getKeyName();
    }

    static public function tableName()
    {
        return (new static)->getTable();
    }

    static public function collection(array $models = [])
    {
        $class = new \ReflectionClass(static::class);
        if (!$class->isAbstract())
        {
            return (new static)->newCollection($models);
        }
        $parentClass = get_parent_class(static::class);
        if ($parentClass !== __CLASS__ && method_exists($parentClass, 'collection'))
        {
            return $parentClass::collection($models);
        }
        else
        {
            return new MyCollection($models);
        }
    }

    static public function collectionFromArray(array $array_of_arrays = [])
    {
        $models = [];
        foreach ($array_of_arrays as $item_array)
        {
            $models[] = (new static($item_array));
        }
        return (new static)->newCollection($models);
    }

    public function createFromRequestHelper($reqHelper)
    {
        $this->fillFromRequestHelper($reqHelper);
        $this->save();
        return $this;
    }

    public function fillFromRequestHelper($reqHelper)
    {
        $fillArray = $reqHelper->requestAttributes($this->fillableRelationships);
        $this->fill($fillArray);
        return $this;
    }

    public function patchMerge($patchArray)
    {
        $patchArray = $patchArray ?: [];
        $this->_patchMerge($patchArray);
        return $this;
    }

    private function _patchMerge($patchArray = [])
    {
        $permittedPatch = array_intersect_key($patchArray, array_flip($this->_getFillableAttributes()));
        foreach ($permittedPatch as $key => $value)
        {
            $this->$key = $value;
        }
    }

    static public function staticallyCreateFromRequestHelper($reqHelper)
    {
        return (new static)->createFromRequestHelper($reqHelper);
    }

    protected function _getFillableAttributes()
    {
        return array_merge($this->fillable, array_flip($this->fillableRelationships));
    }

    protected function _clearProtoDependencies()
    {
        $this->_protoDependenciesArray = [];
    }

    protected function _clearProtoDependency($dependency)
    {
        unset($this->_protoDependenciesArray[$dependency]);
    }

    protected function _setDependency($dependency)
    {
        $this->with = array_merge([$dependency], $this->with);
        $this->_protoDependencies = array_merge([$dependency], $this->_protoDependencies);
    }

    protected function _getProtoDependency($dependency)
    {
        return isset($this->_protoDependenciesArray[$dependency]) ? $this->_protoDependenciesArray[$dependency] : null;
    }

    protected function hasDirtyDependencyAttribute($dependency, $attribute)
    {
        return !is_null($this->$dependency) && $this->$dependency->isDirty($attribute);
    }

    public function getAttribute($key)
    {
        if (in_array($key, $this->_protoDependencies) && isset($this->_protoDependenciesArray[$key]))
        {
            return $this->_protoDependenciesArray[$key];
        }
        return parent::getAttribute($key);
    }

    public function setAttribute($key, $value)
    {
        if (in_array($key, $this->_protoDependencies))
        {
            $this->_protoDependenciesArray[$key] = $value;
        }
        else
        {
            parent::setAttribute($key, $value);
        }
    }
}