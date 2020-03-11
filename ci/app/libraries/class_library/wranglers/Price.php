<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Wrangler__Price extends Base__Wrangler
{
    /*
     * data:
     *
     * price
     * currency_symbol_left
     * currency_symbol_right
     */

    function _yield_wrangled_data()
    {
        yield "_formatted" => $this->formatted();
        yield "_formatted_to_quantum" => $this->formatted(true);
        yield "_rounded" => $this->round_up();
    }

    function formatted($toQuantum = false)
    {
        return $this->_formatted_price_string($this->_total_price(), $toQuantum);
    }

    function multiple_formatted($multiplier = 1, $toQuantum = false)
    {
        return $this->_formatted_price_string($this->_total_price($multiplier), $toQuantum);
    }

    function round_to_currency_quantum()
    {
        return $this->_round_to_currency_quantum($this->_total_price());
    }

    function multiple_round_to_currency_quantum($multiplier = 1)
    {
        return $this->_round_to_currency_quantum($this->_total_price($multiplier));
    }

    function round_up()
    {
        return $this->_round_up($this->_total_price());
    }

    function multiple_round_up($multiplier = 1)
    {
        return $this->_round_up($this->_total_price($multiplier));
    }

    function left_symbol()
    {
        return $this->get('currency_symbol_left');
    }

    function right_symbol()
    {
        return $this->get('currency_symbol_right');
    }

    function symbols()
    {
        return $this->left_symbol() . $this->right_symbol();
    }

    private function _total_price($multiplier = 1)
    {
        $price = $this->get('price');
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
            $returnString = $this->left_symbol() . $this->_round_to_currency_quantum($price) . $this->right_symbol();
        }
        else
        {
            $returnString = $this->left_symbol() . $this->_round_up($price) . $this->right_symbol();
        }
        return $returnString;
    }

    private function _round_to_currency_quantum($price)
    {
        if ($price !== null)
        {
            $retVal = format_price($price);
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
}