<?php

namespace App\Helpers\Formatting;

class PriceHelper
{
    public $currency_symbol_left;
    public $currency_symbol_right;
    public $price;

    private $_type;

    public function __construct($type = 'generic')
    {
        $this->_type = $type;
    }

    public function formatted($toQuantum = false, $multiplier = 1)
    {
        switch ($this->_type)
        {
            case 'round_to_currency_quantum':

                $retString = $this->_round_to_currency_quantum($this->_total_price($multiplier));
            break;

            case 'round_up':

                $retString = $this->_round_up($this->_total_price($multiplier));
            break;

            default:

                $retString = $this->_formatted_price_string($this->_total_price($multiplier), $toQuantum);
            break;
        }
        return $retString;
    }

    private function _left_symbol()
    {
        if (isset($this->currency_symbol_left))
        {
            return $this->currency_symbol_left;
        }
    }

    private function _right_symbol()
    {
        if (isset($this->currency_symbol_right))
        {
            return $this->currency_symbol_right;
        }
    }

    private function _total_price($multiplier = 1)
    {
        $price = null;
        if (isset($this->price))
        {
            $price = $this->price;
        }
        return ((is_numeric($price) && is_numeric($multiplier))?($price * $multiplier):null);
    }

    private function _formatted_price_string($price, $toQuantum = false)
    {
        if ($price === null || $price === 0)
        {
            $returnString = "N/A";
        }
        elseif ($toQuantum)
        {
            $returnString = $this->_left_symbol() . $this->_round_to_currency_quantum($price) . $this->_right_symbol();
        }
        else
        {
            $returnString = $this->_left_symbol() . $this->_round_up($price) . $this->_right_symbol();
        }
        return $returnString;
    }

    private function _round_to_currency_quantum($price)
    {
        if ($price !== null)
        {
            $retVal = $this->_format_price($price);
        }
        else
        {
            $retVal = $price;
        }
        return $retVal;
    }

    private function _round_up($price)
    {
        $retVal = "-";
        if ($price !== null && $price !== 0)
        {
            $retVal = ceil($price);
        }
        return $retVal;
    }

    private function _format_price($price)
    {
        $value = (ceil(100000 * $price) / 100000);
        if ($value == (int)$value)
        {
            $retVal = $value;
        }
        else
        {
            $retVal = number_format($value, 2);
        }
        return $retVal;
    }
}