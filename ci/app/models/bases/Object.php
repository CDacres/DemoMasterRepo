<?php

abstract class Model_Base__Object extends Model_Base__View
{
    private $_can_write = true;

    protected function _set_read_only()
    {
        $this->_can_write = false;
    }

    public function delete($deletable)
    {
        $this->_delete($deletable);
    }

    protected function _delete($deletable, $criteriaArray = [])
    {
        if ($this->_can_write)
        {
            if (is_a($deletable, Base__Collection::class))
            {
                $retVal = $this->_delete_collection($deletable, $criteriaArray);
            }
            elseif (is_a($deletable, $this->_get_base_class()))
            {
                $retVal = $this->_delete_object($deletable, $criteriaArray);
            }
            else
            {
                throw new Exception(get_called_class() . ' - Model can not delete objects of type ' . get_class($deletable));
            }
        }
        else
        {
            throw new Exception(get_called_class() . ' - Model can not write to the db.');
        }
        return $retVal;
    }

    private function _delete_collection($collection, $criteriaArray = [])
    {
        if ($collection::handles($this->_get_base_class()))
        {
            foreach ($collection->object() as $deletee)
            {
                $this->_delete($deletee, $criteriaArray);
            }
        }
        else
        {
            throw new Exception(get_called_class() . ' - Model can not delete ' . get_class($collection));
        }
    }

    private function _insert_update_collection($collection, $userRequested)
    {
        $collectionType = get_class($collection);
        $newCollection = new $collectionType();
        foreach ($collection->object() as $object)
        {
            $retObj = $this->insert_update($object, $userRequested);
            if (!$retObj->is_null_object())
            {
                $newCollection->add_object($retObj);
            }
            else
            {
                $newCollection->add_failed_object($object);
            }
        }
        return $newCollection;
    }

    private function _insert_update_object($object, $userRequested)
    {
        if (!$object->has_key())
        {
            $retObj = $this->_insert_object($object, $userRequested);
        }
        else
        {
            $retObj = $this->_update_object($object, $userRequested);
        }
        return $retObj;
    }

    protected function _insert_object(Base__Bound_Object $object, $userRequested)
    {
        if (!$userRequested || $this->_user_can_insert($object))
        {
            $this->_pre_insert($object);
            $this->db->insert($object->tableName(), $object->get_insert_array());
            $newId = $this->db->insert_id();
            $object->set('id', $newId);
            $object->set_enabled(true);
            $this->_post_insert($object);
        }
        else
        {
            $object = new Base__Null();
        }
        return $object;
    }

    protected function _update_object($object, $userRequested)
    {
        if (($userRequested && !$this->_user_can_update($object)))
        {
            $object = new Base__Null();
        }
        else
        {
            $this->_pre_update($object);
            $this->db->update($object->tableName(), $object->get_insert_array(), $object->get_key_array());
            $this->_post_update($object);
        }
        return $object;
    }

    protected function _pre_insert($object)
    {

    }

    protected function _post_insert($object)
    {

    }

    protected function _pre_update($object)
    {

    }

    protected function _post_update($object)
    {

    }

    protected function _pre_delete($object)
    {

    }

    protected function _post_delete($object)
    {

    }

    protected function _delete_object($deletee, $criteriaArray = [])
    {
        $this->_pre_delete($deletee);
        if (empty($criteriaArray))
        {
            $criteriaArray = ['id'];
        }
        foreach ($criteriaArray as $criterion)
        {
            $this->db->where($deletee->column($criterion,false), $deletee->get($criterion));
        }
        $this->db->delete($deletee->tableName());
        $this->_post_delete($deletee);
    }

    public function insert_update($insertable, $userRequested = false)
    {
        if ($this->_can_write)
        {
             if (is_a($insertable, Base__Collection::class) && $insertable::handles($this->_get_base_class()))
            {
                $retObj = $this->_insert_update_collection($insertable, $userRequested);
            }
            elseif (is_a($insertable, $this->_get_base_class()))
            {
                $retObj = $this->_insert_update_object($insertable, $userRequested);
            }
            else
            {
                throw new Exception(get_called_class() . ' - Model can not insert objects of type ' . get_class($insertable));
            }
        }
        else
        {
            throw new Exception(get_called_class() . ' - Model can not write to the db.');
        }
        return $retObj;
    }

    protected function _user_can_insert($object)
    {
        return false;
    }

    protected function _user_can_update($object)
    {
        return false;
    }
}