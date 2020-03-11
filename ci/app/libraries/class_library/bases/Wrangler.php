<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

abstract class Base__Wrangler extends Base__Black_Box_Object
{
    private $_label;

    function __construct($label = null, $populationArray = [])
    {
        $this->_label = $label;
        parent::__construct($populationArray);
    }

    public function yield_wrangled_data()
    {
        if ($this->_label !== null)
        {
            foreach ($this->_yield_wrangled_data() as $suffix => $value)
            {
                if ($suffix !== null)
                {
                    yield $this->_label . $suffix => $value;
                }
                else
                {
                    yield null => null;
                }
            }
        }
        else
        {
            yield null => null;
        }
    }

    abstract function _yield_wrangled_data();
}