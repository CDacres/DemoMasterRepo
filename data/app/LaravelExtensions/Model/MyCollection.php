<?php

namespace App\LaravelExtensions\Model;

use \Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Exception;

use App\Helpers\ChunkHelper;

class MyCollection extends Collection
{
    protected static $_staticObjectType = null;
    protected $_objectType = null;

    public function __construct($items = [])
    {
        $objectType = $this->get_static_object_type();
        if ($objectType === null && count($items) > 0)
        {
            $item = reset($items);
            if ($item instanceof Model)
            {
                $objectType = get_class($item);
            }
        }
        $this->_objectType = $objectType;
        parent::__construct($items);
    }

    static public function static_object_type()
    {
        return static::$_staticObjectType;
    }

    public function get_static_object_type()
    {
        return static::static_object_type();
    }

    public function get_object_type()
    {
        return $this->_objectType;
    }

    public function set_object_type($objectType)
    {
        $this->_objectType = $objectType;
    }

    public function saveAll()
    {
        $objectType = $this->get_object_type();
        if ($objectType === null)
        {
            throw new Exception("No associated model for Collection to perform saveAll.");
        }
        if (!is_subclass_of($objectType, 'Illuminate\Database\Eloquent\Model'))
        {
            throw new Exception("The model in this collection has no database equivalent, so can't be saved!");
        }
        $insertArray = [];
        foreach ($this as $item)
        {
            $insertArray[] = $item->attributesToArray();
        }
        (new ChunkHelper())->chunkInsert($objectType, $insertArray);
    }

    static public function best_collection($items = [])
    {
        if (count($items) > 0)
        {
            $item_rep = reset($items);
            $itemClass = get_class($item_rep);
            if (method_exists($itemClass, 'newCollection'))
            {
                return $item_rep->newCollection($items);
            }
        }
        return new MyCollection($items);
    }
}